---
title: "从零构建 AI Agent（didilili）"
sourceId: "08-agents/ai-agents-from-zero"
sourceTitle: "从零构建 AI Agent（didilili）"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "08-agents"
sourceUrl: "https://github.com/didilili/ai-agents-from-zero"
entryUrl: "https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/31-LLaMA-Factory环境搭建与微调实战.md"
sourceRel: "31-LLaMA-Factory环境搭建与微调实战.md"
rawUrl: "/raw/08-agents/ai-agents-from-zero/31-LLaMA-Factory环境搭建与微调实战.md"
sourceSha256: "fb7c606e81c3a2011020e8667dc25b7a5fb114073c0b86961126921812b5684f"
pageSha256: "f74ac3e560c2fd0b53d64dd23fe2fe7d984b04e20c5a95d6e840076434fe8257"
contentMode: "local-full"
zh: ""
---

## 3、LLaMA-Factory 安装

### 3.1 源码下载与版本选择

下面命令都在 **AutoDL 的 JupyterLab 终端**执行。先进入数据盘，克隆源码：

```bash
cd /root/autodl-tmp
git clone --depth 1 https://github.com/hiyouga/LLaMA-Factory.git
cd LLaMA-Factory
git fetch --depth 1 origin dced5f8804bfbf7109ef7c14401db6bd5cce7e53
git checkout --detach dced5f8804bfbf7109ef7c14401db6bd5cce7e53
```

最后两条命令把**新克隆的仓库**固定到课程使用的源码版本，便于对应页面、参数和示例结果。[课程源码版本](https://github.com/hiyouga/LLaMA-Factory/tree/dced5f8804bfbf7109ef7c14401db6bd5cce7e53)


<summary>源码下载很慢或出现 TLS 连接错误时</summary>

若 `git clone` 下载很慢，或出现 `GnuTLS recv error (-110)`、TLS 连接中断，在 AutoDL 的**帮助文档 → 学术资源加速**中查看当前命令，在同一终端执行后重试：

```bash
source /etc/network_turbo
```

设置会影响当前终端及它启动的程序，不会自动应用到其他终端。不再需要加速时，在同一终端关闭：

```bash
unset http_proxy https_proxy
```

支持的站点和当前命令以 [AutoDL 学术资源加速说明](https://www.autodl.com/docs/network_turbo/)为准。



### 3.2 项目目录与配置文件

克隆完成后，在 JupyterLab 左侧打开 `LLaMA-Factory/`。本章主要使用以下位置，其中课程数据、环境和训练结果会在后续步骤中创建：

```text
LLaMA-Factory/
├── data/keywords-clean/   第 6 节上传的课程数据与独立登记文件
├── .venv/                第 3.3 节创建的 Python 环境
└── saves/                训练生成的 Adapter、日志和检查点
```

**训练设置也可以保存在 YAML 文本文件中。** 打开本机课程附带的 `案例与源码-4-微调/configs/keywords_clean_train.yaml`，其中使用的是本章的 Qwen3-0.6B、关键词数据和 FP16 配置。下面摘出几项，加上中文注释：

```yaml
# 训练阶段：SFT（监督微调），用输入和参考答案训练模型
stage: sft

# 微调方式：采用 LoRA，只训练新增的少量参数
finetuning_type: lora

# LoRA 的秩：设为 8，这个值会影响新增可训练参数的数量
lora_rank: 8

# 对话模板：使用 Qwen3 的非思考模式模板组织输入
template: qwen3_nothink

# 截断长度：每条训练样本的长度上限为 2048 个 token，包含输入和答案
cutoff_len: 2048

# 梯度累积步数：累积 8 个小批次的梯度后，再更新一次参数
gradient_accumulation_steps: 8
```

例如，`lora_rank: 8` 对应 WebUI 中的“LoRA 秩 8”。第 5～7 节会在页面填写这些设置，第 8.1 节再查看它们转换成的训练参数；选择命令行方式时，第 8.3 节会上传并使用这份课程 YAML。

<details>
<summary>选读：工具源码、官方示例与依赖清单</summary>

在 JupyterLab 的项目文件面板中，`src/` 存程序源码，`examples/` 存训练、推理和合并示例，`requirements/` 存可选依赖清单：

![JupyterLab 中的 LLaMA-Factory 项目目录：蓝色选中 data、examples、requirements 和 src](/mirror/82/82019f45e9fc89f08a6f43feb68cb47ee96057dc.jpg)

下图打开的是工具自带的 `examples/train_lora/qwen3_lora_sft.yaml`。其中使用 `Qwen/Qwen3-4B-Instruct-2507`、`identity,alpaca_en_demo` 和 BF16，适合参考配置结构；本章运行时使用上面的课程 YAML。[锁定版本的官方示例](https://github.com/hiyouga/LLaMA-Factory/blob/dced5f8804bfbf7109ef7c14401db6bd5cce7e53/examples/train_lora/qwen3_lora_sft.yaml)

![JupyterLab 中的官方 qwen3_lora_sft.yaml 示例：4B 模型、SFT、LoRA 与 qwen3_nothink 模板](/mirror/48/486a2f7bd71cd1a9c8185c664b8c3665263ceb35.jpg)

安装时，`uv pip install -e .` 读取 `pyproject.toml`（[官方源码](https://github.com/hiyouga/LLaMA-Factory/blob/dced5f8804bfbf7109ef7c14401db6bd5cce7e53/pyproject.toml)）中的 `torch`、`transformers`、`peft` 等基础依赖。额外清单按用途安装：

| 清单                                                                                                                                                                | 锁定版本中的内容                 | 用途                            |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- | ------------------------------- |
| `requirements/metrics.txt`（[官方源码](https://github.com/hiyouga/LLaMA-Factory/blob/dced5f8804bfbf7109ef7c14401db6bd5cce7e53/requirements/metrics.txt)）           | `nltk`、`jieba`、`rouge-chinese` | 部分文本评估功能                |
| `requirements/bitsandbytes.txt`（[官方源码](https://github.com/hiyouga/LLaMA-Factory/blob/dced5f8804bfbf7109ef7c14401db6bd5cce7e53/requirements/bitsandbytes.txt)） | `bitsandbytes>=0.39.0`           | bitsandbytes 量化；本轮不开量化 |

</details>

### 3.3 Python 环境与依赖安装

接下来使用 **uv** 创建独立的 Python 环境并安装依赖。先检查它是否可用：

```bash
uv --version
```

如果提示 `uv: command not found`，在当前 AutoDL 终端安装后再检查：

```bash
python -m pip install uv
uv --version
```

这是 uv 支持的 pip 安装方式；已有可用的 uv 时，不必重复安装。[uv 安装说明](https://docs.astral.sh/uv/getting-started/installation/)

确认终端仍在 `/root/autodl-tmp/LLaMA-Factory`，再执行：

```bash
uv venv --python 3.12
source .venv/bin/activate
uv pip install -e .
uv pip install -r requirements/metrics.txt
```

`uv pip install -e .` 中的 `.` 表示当前目录，`-e` 表示以可编辑方式安装当前项目；因此要在仓库根目录执行，并保留这里的源码。`metrics.txt` 补充后续部分评估功能用到的依赖。

**使用 V100 跟做时，安装下面的 CUDA 12.6 构建。** 默认软件源可能选到不包含 V100 内核的包。等上面的安装结束后，在同一虚拟环境执行：

```bash
uv pip install --reinstall \
  --index-url https://download.pytorch.org/whl/cu126 \
  torch==2.14.0 torchvision==0.29.0 torchaudio==2.11.0
```

这三个包对应课程的 V100 训练环境。已有可用环境时，先检查版本，不必重复安装；准备完成后，按第 3.4 节实际执行一次小矩阵计算。

等待安装命令结束、终端重新出现可以输入命令的提示符后，再进入下一步。还在下载包时不要另外开一份安装进程。

每次新开终端时，都要重新进入项目、激活已有环境，让当前终端使用项目的 Python 和依赖：

```bash
cd /root/autodl-tmp/LLaMA-Factory
source .venv/bin/activate
```

提示符可能显示 `(LLaMA-Factory)`，不一定直接显示 `.venv`；下一节会用 Python 的实际路径确认。


<summary>下载很慢或中断时，怎样重试安装</summary>

第一次执行 `uv pip install -e .` 时，`uv` 会先解析依赖，再下载 PyTorch、NVIDIA CUDA 等较大的安装包。即使速度较慢，只要进度条、已下载大小或“Preparing packages”的数量仍在变化，就说明命令还在工作，先等待当前命令结束。

前面执行的 `source /etc/network_turbo` 主要用于 GitHub、Hugging Face 等学术资源访问，不能据此认为 PyPI 下载一定加速。[AutoDL 的说明](https://www.autodl.com/docs/network_turbo/)也明确列出了它覆盖的站点范围。

如果下载总量连续几分钟完全不再增长，或终端已经报出网络错误，再按 `Ctrl+C` 结束这一次安装。在**同一个已经激活 `.venv` 的终端**中，临时改用 PyPI 镜像后重新执行下面两条安装命令：

```bash
source /etc/network_turbo

UV_DEFAULT_INDEX="https://mirrors.tuna.tsinghua.edu.cn/pypi/web/simple/" \
  uv pip install -e .

UV_DEFAULT_INDEX="https://mirrors.tuna.tsinghua.edu.cn/pypi/web/simple/" \
  uv pip install -r requirements/metrics.txt
```

`UV_DEFAULT_INDEX` 只对紧随其后的那一条命令生效，不会改写系统的全局软件源；这是 `uv` 官方支持的默认索引环境变量。镜像在某些网络环境下可能更快，但不保证始终更快；清华镜像站也提供了对应的 PyPI 与 `uv` 配置说明。[uv 环境变量说明](https://docs.astral.sh/uv/configuration/environment/)；[清华 PyPI 镜像说明](https://mirrors.tuna.tsinghua.edu.cn/help/pypi/)。

不要为了“快一点”加 `--no-deps`，也不要删除已经创建的 `.venv`；前者会漏装训练所需依赖。更不要让两条 `uv pip install` 命令同时运行，它们会争用网络、缓存和磁盘，反而更难判断进度。



### 3.4 版本与 GPU 计算检查

先确认实例已经带卡开机。在 **AutoDL 终端**进入项目、激活环境后，执行：

```bash
llamafactory-cli version
git rev-parse HEAD
nvidia-smi
```

前两条分别查看工具版本和源码提交；第三条查看 GPU 型号、显存与当前占用。课程使用工具版本 `0.9.6.dev0`、源码提交 `dced5f8804bfbf7109ef7c14401db6bd5cce7e53`。

![带卡模式下执行 nvidia-smi：识别到 Tesla V100-PCIE-32GB，显存总量 32768 MiB，当前没有训练进程](/mirror/dc/dc9c743f2b4442431a337570873fa6ef4d9bde95.png)

图中的 `Tesla V100-PCIE-32GB` 与控制台的 V100-32GB 对应，`32768 MiB` 是显存容量。

**看见显卡以后，还要确认当前 Python 能用它计算。** 把下面整段复制到同一个终端执行。它只做一次小矩阵乘法，不加载模型，也不训练：

```bash
python - <<'PY'
import sys
import torch

print("Python 路径:", sys.executable)
print("Python 版本:", sys.version.split()[0])
print("PyTorch 版本:", torch.__version__)
print("PyTorch 构建使用的 CUDA:", torch.version.cuda)
assert torch.cuda.is_available(), "当前环境未发现可用 GPU，请先检查开机模式与安装结果"
print("GPU 型号:", torch.cuda.get_device_name(0))
print("GPU 计算能力:", torch.cuda.get_device_capability(0))
print("编译的 GPU 架构:", torch.cuda.get_arch_list())
x = torch.randn((1024, 1024), device="cuda", dtype=torch.float16)
y = x @ x
torch.cuda.synchronize()
print("计算完成，结果设备:", y.device)
PY
```

跟做时核对下面几项：

| 检查项              | 示例环境的结果               | 说明                                        |
| ------------------- | ---------------------------- | ------------------------------------------- |
| Python 路径         | 项目 `.venv/bin/python`      | 正在使用项目环境，而不是系统 Python         |
| PyTorch / CUDA 构建 | `2.14.0+cu126` / `12.6`      | 与第 3.3 节的 V100 安装配置对应             |
| GPU 计算能力        | `(7, 0)`，即 7.0             | V100 的硬件特性版本，不是 CUDA 软件版本     |
| 编译的架构          | 包含 `sm_70`                 | 当前安装包包含这类显卡的内核                |
| 最后一行            | `计算完成，结果设备: cuda:0` | 实际 FP16 运算成功；`cuda:0` 表示第一张 GPU |

![GPU计算检查结果：PyTorch为cu126构建、包含sm_70，FP16运算在cuda:0完成](/mirror/cb/cb0c49fd8dfe996592092f8f3da98ff7cf70c9d6.jpg)

结果应包含 `cu126`、`sm_70`，并以 `计算完成，结果设备: cuda:0` 确认 FP16 运算成功。

<details>
<summary>进一步理解：为什么两处 CUDA 版本号可以不同</summary>

`nvidia-smi` 顶部的 CUDA Version 是驱动支持的最高 CUDA 版本；`torch.version.cuda` 是当前 PyTorch 构建使用的版本。两者不必显示同一个数字，真正需要通过的是上面的实际运算。[AutoDL CUDA 说明](https://www.autodl.com/docs/cuda/)

</details>

<details>
<summary>GPU 检查失败或出现 OMP_NUM_THREADS 提示时</summary>

检查失败时，先核对 Python 路径、实例是否带卡开机，以及第 3.3 节安装是否完整结束。解决报错、通过 FP16 运算后再启动 WebUI。

截图首行的 `OMP_NUM_THREADS` 提示涉及 CPU 线程变量；判断 GPU 是否可用仍看矩阵运算能否完成。若提示 GPU 内核不兼容，回查 PyTorch 构建及 `sm_70` 支持。

</details>
