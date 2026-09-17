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
pageSha256: "3f65355e5424c238afe169fb666737d4d1479c4ae0a9269cb430b43b26bcef88"
contentMode: "local-full"
zh: ""
---

## 4、WebUI 启动与连接

### 4.1 启动 WebUI 服务

在 LLaMA-Factory 根目录执行：

```bash
cd /root/autodl-tmp/LLaMA-Factory
source .venv/bin/activate
llamafactory-cli webui
```

终端出现类似下面的信息时，说明服务已经在 AutoDL 实例中启动：

```text
Running on local URL:  http://0.0.0.0:7860
```

`0.0.0.0:7860` 表示服务在 AutoDL 实例中监听 `7860` 端口。保持这个终端运行，下一步通过 SSH 隧道从本机访问。

![WebUI启动结果：LLaMA-Factory已监听0.0.0.0:7860](/mirror/17/17a32f5e69b278fcd56b04c0834756a4e3da67d4.jpg)

### 4.2 SSH 隧道连接

**SSH 隧道**是一条转发通道：浏览器访问自己电脑的 `7860` 端口，请求经隧道到达 AutoDL 实例中的 `7860`。本章使用本地转发，不使用控制台的“自定义服务”公网入口。

![本机浏览器通过 SSH 隧道访问 AutoDL 的 WebUI，训练与文件保存在远端](/mirror/28/28198cde07038c5697323f14dd5958ff04f92b57.png)

读图时沿中间的箭头看：**本机浏览器 → 本机 7860 → SSH 隧道 → AutoDL 的 WebUI**。图中的两种终端不要混用：本机终端负责保持隧道；JupyterLab 终端虽然也在浏览器里打开，命令却在 AutoDL 中执行。

**Mac / Linux：在自己的电脑上打开终端。**

在 AutoDL 控制台找到当前实例的 SSH 登录指令。假设它的结构为 `ssh -p SSH端口 root@实例主机`，把主机和 SSH 端口替换到下面的命令中：

```bash
# 将 SSH端口 和 实例主机 替换为控制台中的真实值，再执行
ssh -N -L 127.0.0.1:7860:127.0.0.1:7860 -p SSH端口 root@实例主机
```

这条命令在**本机终端**执行，不在 JupyterLab 里执行。按提示完成登录；输入密码时终端通常不会显示字符，输入完成后按回车即可。不要把密码写进命令或分享给他人。

| 命令中的位置            | 作用                                |
| ----------------------- | ----------------------------------- |
| 第一个 `127.0.0.1:7860` | 自己电脑上供浏览器访问的入口        |
| 第二个 `127.0.0.1:7860` | AutoDL 实例中 WebUI 的地址          |
| `-p` 后的 SSH 端口      | 来自控制台登录指令，通常不是 `7860` |
| `-N`                    | 只建立转发，不打开远端命令行        |

登录后终端保持等待，没有返回命令提示符，是隧道工作的常见状态。保持它打开，再在**本机浏览器**访问：

```text
http://127.0.0.1:7860/
```

打开后确认页面是 LLaMA-Factory，并将语言切换为中文，继续配置模型和数据。

<details>
<summary>Windows：使用 AutoDL 图形化隧道工具</summary>

1. 从 [AutoDL SSH 隧道说明](https://api.autodl.com/docs/ssh_proxy/)下载并打开工具。
2. 填入正在运行 WebUI 的那台实例的 SSH 登录信息。
3. 在“代理到本地端口”填写 `7860`，不是“代理到远程端口”。
4. 开始代理并保持工具运行，在浏览器访问 `http://127.0.0.1:7860/`。

不同实例的主机、SSH 端口和登录凭据不同，请使用自己控制台里的信息。

</details>


<summary>页面打不开或连接中断时</summary>

按这三处检查：

1. AutoDL：启动 WebUI 的终端是否还在运行，是否已经出现 `7860` 监听信息。
2. 本机终端：隧道是否还在运行，连接的是否是同一个实例；若提示端口被占用，先确认是否已有隧道，不重复启动。
3. 浏览器：地址是否为本机 `127.0.0.1:7860`，打开的是否是目标服务。

本机另开终端可检查入口是否响应：

```bash
curl -I --max-time 5 http://127.0.0.1:7860/
```

返回 `HTTP/1.1 200 OK` 表示这个本机入口能够响应 HTTP 请求。接着打开浏览器，确认页面确实是目标实例的 LLaMA-Factory；状态码本身不能区分不同服务。

如果提示 `Failed to connect` 或页面出现 `Connection errored out`，先检查连接，不要重新安装或重新训练。只关闭本机隧道会断开访问，不等于远端训练已经停止。

重新连接后，按第 5～7 节核对模型、模板、精度和数据，再做启动前检查；页面可能恢复为不同的参数。



### 4.3 后台运行（选读）


<summary>需要关闭远端终端时，再了解后台启动</summary>

前台启动便于第一次看报错；准备长时间训练时，可以改为后台运行。**如果还没有开始训练**，先在运行前台 WebUI 的远端终端按 `Ctrl+C` 停止它，确认退出后，再在同一项目目录、同一虚拟环境中执行：

```bash
mkdir -p logs
nohup llamafactory-cli webui > logs/webui-keywords.log 2>&1 < /dev/null &
WEBUI_PID=$!
ps -p "$WEBUI_PID" -o pid,ppid,lstart,args
```

这里 `nohup` 用于让进程在终端断开后继续运行，`&` 让命令在后台执行，输出和报错写入这个日志文件。若已有同名日志，要换一个新文件名，避免覆盖旧记录。查看是否启动成功：

```bash
tail -n 50 logs/webui-keywords.log
```

看到 `7860` 启动信息后，通过第 4.2 节的隧道重新打开页面。不要同时再启动第二个 WebUI，占用同一个端口。

**怎样确认终端退出后，服务确实还在？**

`$!` 是刚启动的后台进程编号。记下 `ps` 输出中的 PID 和启动时间；在远端终端执行 `exit` 退出 shell、重新打开终端后，输入刚记录的 PID，再检查进程和服务：

```bash
read -r -p "输入刚记录的 WebUI PID：" webui_pid
ps -p "$webui_pid" -o pid,ppid,lstart,args
curl -I --max-time 5 http://127.0.0.1:7860/
```

比较退出终端前后的 PID 和启动时间，确认仍是同一个 WebUI 进程；再看 HTTP 是否返回 `200 OK`。下面两张截图展示这些检查位置，具体编号以自己的输出为准：

![后台启动后的WebUI检查：查看进程编号、启动时间、日志输出位置和HTTP响应](/mirror/e3/e35d0f96cc9386c3ee137338047c365aeadaa1b5.jpg)

![重新打开终端后检查WebUI：对照进程编号与启动时间，并确认HTTP仍返回200](/mirror/b4/b4db5c0bed30c3f50419e1c179bf42165c322310.jpg)

远端服务正常后，按第 4.2 节建立本机 SSH 隧道，再从浏览器确认能打开 LLaMA-Factory 页面：

![通过本机SSH隧道访问LLaMA-Factory：确认页面中的训练与模型配置入口](/mirror/2e/2e524b9dda07f60d6a56c73a1919ab081eaf57d8.jpg)

**网页能打开，只说明服务可访问。** 训练前仍需完成第 5～7 节的模型和数据配置；如果训练已经开始，不要为了改启动方式按 `Ctrl+C`。后台运行只处理终端断开，实例关机仍会停止任务。

**怎样停止后台 WebUI？**

先确保 Train 页的训练已经结束或中断，Chat 页加载的模型也已卸载。停止 WebUI 服务与停止其中的训练是两件事；训练的中断入口见第 8.2 节。

在 **AutoDL 终端**列出 WebUI 进程：

```bash
ps -eo pid,ppid,lstart,args | grep '[l]lamafactory-cli webui'
```

核对命令包含 `llamafactory-cli webui`，启动时间与目标服务一致。在这个终端输入刚查到的 PID，再检查一次；不要照抄截图中的进程编号：

```bash
read -r -p "输入要停止的 WebUI PID：" webui_pid
ps -p "$webui_pid" -o pid,ppid,lstart,args
```

确认是目标服务后，才执行下面的停止命令。条件判断只接受大于 `1` 的进程编号，避免空值、`0` 或系统主进程被当成目标：

```bash
[[ "$webui_pid" =~ ^[1-9][0-9]*$ ]] && (( webui_pid > 1 )) && kill -TERM "$webui_pid"
ps -p "$webui_pid" -o pid,ppid,lstart,args
python - <<'PY'
import socket
with socket.socket() as s:
    s.settimeout(2)
    print("7860 连接检查：", s.connect_ex(("127.0.0.1", 7860)))
PY
```

这里用 Python 检查端口，无需额外安装网络工具。返回 `0` 表示仍可连接；非 `0` 表示连接未成功，还需结合 `ps` 判断目标进程是否退出。确认目标进程退出、端口不能连接后，再启动新的 WebUI；仍有占用时先核对遗留进程。关闭本机 SSH 隧道、退出 `tail` 或关闭网页，都不等于停止远端服务。


