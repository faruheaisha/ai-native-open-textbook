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
entryUrl: "https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/33-微调显存优化与多卡训练.md"
sourceRel: "33-微调显存优化与多卡训练.md"
rawUrl: "/raw/08-agents/ai-agents-from-zero/33-微调显存优化与多卡训练.md"
sourceSha256: "4c4ffedf1d752a78d0ec78acd54c7d26c347d65d4dcbe2c3cd65be7ab086cd9a"
pageSha256: "47bc21fc7916cf6e06f105a6ff52b1d597687963c7161b6c1f4453785321d1c1"
contentMode: "local-full"
zh: ""
---

## 4、DeepSpeed 与 ZeRO

前一节问“计算怎样分工”，这里问“训练中哪些内容不必每卡都保存一整份”。先读懂 Stage 1、2、3 的存储表；只有准备做相应训练时，再展开具体配置。

### 4.1 从重复保存到分片保存

前面介绍的普通 DDP，每张卡各有一份模型；训练时，还可能重复保存梯度和优化器状态。

假设 GPU 0、1 都保存着同样一套优化器状态。训练需要这套信息，但未必需要每张卡始终各存一整套。能不能每张卡负责其中一部分，需要时协作？

**ZeRO 就利用这种分片思路减少重复存储。** DeepSpeed 是支持这种训练方式的工具之一。

“分片”可以先理解为：把一套数据分成几份，由不同 GPU 分别负责。

第 30 章已经解释了权重、梯度和优化器状态。下表对照各个 Stage 分别拆分哪些部分。

### 4.2 ZeRO Stage 1、2、3

| 方式                       | 模型参数     | 梯度         | 优化器状态   |
| -------------------------- | ------------ | ------------ | ------------ |
| 不使用 ZeRO 的普通数据并行 | 每卡完整保存 | 每卡完整保存 | 每卡完整保存 |
| Stage 1                    | 每卡完整保存 | 每卡完整保存 | 分片保存     |
| Stage 2                    | 每卡完整保存 | 分片保存     | 分片保存     |
| Stage 3                    | 分片保存     | 分片保存     | 分片保存     |

可以按顺序阅读：Stage 1 先处理优化器状态；Stage 2 再处理梯度；Stage 3 连参数也分片。

![两张GPU中不使用ZeRO与Stage 1、2、3的参数、梯度和优化器状态存放对比](/mirror/35/35ca89a479d74a62d9b38c9dc5d361549d8a394b.svg)

_图：同一套训练状态在两卡间的存放示意；图中的“状态”指优化器状态，色块不表示真实字节比例。_

**Stage 3 为什么不是张量并行？**

Stage 3 会在计算需要时聚合相关参数，算完后再按框架安排管理它们；TP 则把同一层的计算分给不同 GPU。两者都可能让权重不再完整常驻一张卡，但分工方式不同。

分片也不是没有代价。参数和状态需要跨卡交流，尤其 Stage 3 要配合计算取用参数，通信方式与开销会变化；不能只看“3 比 2 大”就认为 Stage 3 总是最好。

还要注意两个限制：

- 激活值、临时缓冲区等不会因为使用 ZeRO 就全部按卡数等比例缩小。
- LoRA 只训练少量新增参数，本来就比全参数训练少很多可训练状态；Stage 1、2 的收益不能直接照搬全参数训练的示例。

如果显存已经够用，不需要为了使用更高 Stage 增加配置。若模型权重本身放不下，才更需要考虑 Stage 3 这类参数分片方案。

原理与参数聚合方式可参阅 [DeepSpeed ZeRO 官方教程](https://www.deepspeed.ai/tutorials/zero/)。

### 4.3 LLaMA-Factory 中的配置位置（选做）

页面上的 Stage 选择分片级别，offload 决定是否把相应状态或参数交给 CPU 内存分担，两者不是同一个开关。课程版本的页面提供 `none`、`2`、`3`；首次阅读无需记住 JSON 字段。

实际选做前，先确认可用 GPU 和依赖，再预览将要使用的配置。截图仅展示入口，多卡是否生效要看启动后的进程、设备日志和运行结果。


<summary>选做实操：页面入口、依赖检查与实际配置文件</summary>

回到第 31 章的 **Train** 页面，向下滚动至底部，在“开始”按钮下方找到“设备数量”“DeepSpeed stage”和“使用 offload”。

![训练页面中的设备数量、DeepSpeed stage和offload配置入口](/mirror/f4/f4d7c3421948bac2d7d3a71737b0a27ec6022a72.jpg)

本课程采用的 LLaMA-Factory 版本中，页面项目如下：

| 页面项目        | 实际含义                                        |
| --------------- | ----------------------------------------------- |
| 设备数量        | 只读的数量框；实际可用设备还需通过 GPU 检查确认 |
| DeepSpeed stage | 下拉选项为 `none`、`2`、`3`                     |
| 使用 offload    | 是否使用对应 Stage 的卸载配置                   |

打开 Stage 下拉框，可以看到实际的三个选项：

![DeepSpeed stage 的实际下拉选项：none、2、3，没有 Stage 1](/mirror/eb/eb6eb6de17a2f9f9cfed66ee23a37283e3c9b22b.jpg)

`none` 表示不启用 DeepSpeed；本页提供 Stage 2、3 两种分片选项。

_截图用于辨认配置位置。界面中的“设备数量”不能替代运行环境检查；按第 31 章确认实际可用 GPU、显存与计算能力。_

**选做前检查依赖。** DeepSpeed 是额外安装的工具，先在当前 `.venv` 中检查：

```bash
uv pip show deepspeed
```

若未安装，先看项目内的依赖清单及预计安装变化：

```bash
sed -n '1,40p' requirements/deepspeed.txt
uv pip install --dry-run -r requirements/deepspeed.txt
```

该版本的依赖清单要求 `deepspeed>=0.10.0,<=0.18.4`。版本范围只是安装约束，还需要确认具体版本与 PyTorch、CUDA 兼容，再按清单安装：

```bash
uv pip install -r requirements/deepspeed.txt
uv pip check
```

这些依赖在实际选做时安装，阅读配置可直接继续；版本要求见[该版本依赖清单](https://github.com/hiyouga/LLaMA-Factory/blob/dced5f8804bfbf7109ef7c14401db6bd5cce7e53/requirements/deepspeed.txt)。

项目的 `examples/deepspeed/` 中提供了配置示例。打开 Stage 2 的普通配置和卸载配置，可以对照看出差别：

```bash
sed -n '1,160p' examples/deepspeed/ds_z2_config.json
sed -n '1,160p' examples/deepspeed/ds_z2_offload_config.json
```

后者的核心设置包括：

```json
{
  "zero_optimization": {
    "stage": 2,
    "offload_optimizer": {
      "device": "cpu",
      "pin_memory": true
    }
  }
}
```

这只是说明卸载位置的片段，完整文件还包含批次、精度等设置。按 JSON 的层级逐项看：

| 配置字段            | 中文含义         | 本例作用                                                            |
| ------------------- | ---------------- | ------------------------------------------------------------------- |
| `zero_optimization` | ZeRO 优化设置    | 将分片级别和卸载选项放在同一组中                                    |
| `stage`             | ZeRO 分片级别    | `2` 表示对梯度和优化器状态分片；区别于训练配置中的 `stage: sft`     |
| `offload_optimizer` | 优化器卸载设置   | 将优化器相关状态及更新计算安排到 CPU                                |
| `device`            | 卸载目标设备     | `cpu` 表示使用 CPU 和系统内存                                       |
| `pin_memory`        | 是否使用锁页内存 | `true` 表示使用不会被系统换出的内存页，方便 CPU 与 GPU 间的数据传输 |

因此，这组设置改变的是优化器的存放与计算位置，模型层并没有全部搬到 CPU。

Stage 3 的卸载配置还可包含 `offload_param`，即参数卸载。具体采用哪些字段，应打开实际配置确认，而不是把所有 offload 都理解成一种动作。

**准备选做时，按下面的顺序检查：**

1. 保持当前模型、数据和 LoRA 任务，确认可见 GPU 数量。
2. 按显存问题选择 Stage，每次调整一项优化设置，便于判断效果。
3. 在 LLaMA-Factory 的 **Train 页**点击「预览命令」，找到命令中的 `deepspeed` 配置路径，再按下面的方法打开它，核对 `stage`、卸载与批次设置。预览不会启动训练。
4. 启动后查看分布式进程和设备日志，确认确实使用预期的 GPU；再观察是否进入正常训练。

例如，Stage 2 + offload 的预览命令指向 `llamaboard_cache/ds_z2_offload_config.json`，就在 **AutoDL 终端**中打开这份文件：

```bash
cd /root/autodl-tmp/LLaMA-Factory
sed -n '1,160p' llamaboard_cache/ds_z2_offload_config.json
```

以自己预览命令中的路径为准，核对实际文件中的 `stage`、卸载与批次设置。点击 Train 页的「开始」后，WebUI 才按所选配置启动训练；使用 YAML 命令行时，按[官方分布式训练说明](https://llamafactory.readthedocs.io/zh-cn/latest/advanced/distributed.html)启动，并通过日志确认参与计算的 GPU。

<details>
<summary>选读：WebUI 配置文件的来源</summary>

本课程固定版本在启动 WebUI 时，于 `LLaMA-Factory/llamaboard_cache/` 中生成配置。Stage 2 的普通配置为 `ds_z2_config.json`，勾选 offload 后使用 `ds_z2_offload_config.json`；Stage 3 对应文件名中的 `z3`。

前面的 `examples/deepspeed/` 提供阅读示例，`llamaboard_cache/` 则存放 WebUI 命令实际引用的配置。生成与选择过程可查看[配置生成实现](https://github.com/hiyouga/LLaMA-Factory/blob/dced5f8804bfbf7109ef7c14401db6bd5cce7e53/src/llamafactory/webui/common.py)、[WebUI 初始化入口](https://github.com/hiyouga/LLaMA-Factory/blob/dced5f8804bfbf7109ef7c14401db6bd5cce7e53/src/llamafactory/webui/engine.py)和[页面源码](https://github.com/hiyouga/LLaMA-Factory/blob/dced5f8804bfbf7109ef7c14401db6bd5cce7e53/src/llamafactory/webui/components/train.py)。

</details>

**进行多卡实验时，先确认环境中有多张可用 GPU，并安装匹配的依赖。** 启动后核对分布式进程、参与计算的 GPU，以及实际显存和速度；页面选项只能表达配置，不能证明多卡训练已经生效。



### 4.4 训练方式改变后，输出也要重新检查

第 31 章保存的是 LoRA Adapter。使用 DeepSpeed 后，不能仅凭目录里出现了 `checkpoint`，就认定它和之前完全一样。

先看本次训练方式：

- **LoRA：** 关注新增参数的 Adapter，以及恢复训练需要的其他状态。
- **全参数训练：** 保存目标是完整模型的参数，不是只输出一份 LoRA Adapter。
- **ZeRO 分片检查点：** 可能包含分散保存的训练状态，不一定能直接作为普通模型目录加载。

<details>
<summary>保存 Stage 3 权重时：核对参数聚合设置</summary>

Stage 3 保存完整权重时，还会涉及聚合参数的设置，例如 `stage3_gather_16bit_weights_on_model_save`。是否启用、最终保存哪些文件，要结合所用框架与训练方式确认。

</details>

确定文件含义以后，按第 32 章做重新加载与回答检查；交付时需要能够完整加载的模型文件。
