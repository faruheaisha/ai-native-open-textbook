---
title: "11. 常见问题 (FAQ)"
sourceId: "07-coding/ai-coding-guide-zh"
sourceTitle: "Claude Code & OpenClaw & Codex & WorkBuddy 中文教程"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中文"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/KimYx0207/AI-Coding-Guide-Zh"
entryUrl: "https://github.com/KimYx0207/AI-Coding-Guide-Zh/blob/7a7c21b8e7dc976e8ade33b79ee000a172e63daf/README.md"
zh: ""
---

# 11. 常见问题 (FAQ)

> **课程信息**
>
> - **作者**：老金
> - **GitHub**：https://github.com/KimYx0207
> - **公众号**：老金带你玩AI
> - **X（Twitter）**：老金带你玩AI
> - **个人博客**：https://aiking.dev
> - **难度等级**：🟢 入门
> - **前置知识**：无
>
> **遇到问题？** 这里收集了社区最常见的问题和解决方案。用 `Ctrl+F`（或 `Cmd+F`）搜索关键词，快速定位你的问题
>
> **最常见的 5 个问题：** [Q1: 命令找不到](#q1-openclaw-命令找不到command-not-found) | [Q2: Node.js 版本不兼容](#q2-nodejs-版本不兼容) | [Q26: API Key 无效](#q26-api-调用报错-401-unauthorized) | [Q12: Gateway 启动失败](#q12-windows-上安装后-gateway-启动失败) | [Q16: WhatsApp 连接问题](#q16-whatsapp-扫码后频繁断开)

这篇 FAQ 收集了 OpenClaw 社区中最常见的问题和解决方案。按类别组织，方便你快速定位问题。

如果这里没有你遇到的问题，可以到 [GitHub Issues](https://github.com/openclaw/openclaw/issues) 提问，或加入 Discord 社区寻求帮助。

---

## 一、安装和配置问题

这份 FAQ 是老金按真实卡点整理的，不是为了凑问题数；能定位问题，比背答案更重要。

> **2026-06-18 排障口径**：当前稳定基线为 v2026.6.8。升级优先用 `openclaw update`，再用 `openclaw doctor` 和 channel / gateway 日志定位问题；`repair` 可修复插件、payload、registry 和部分本地状态，但不会替你重新安装 core 或重启 Gateway。

> 📌 **本节包含 15 个问题：**
> [Q1: 命令找不到](#q1-openclaw-命令找不到command-not-found) | [Q2: Node.js 版本不兼容](#q2-nodejs-版本不兼容) | [Q3: npm 权限错误](#q3-npm-install-报权限错误eacces) | [Q4: 中国网络安装慢](#q4-中国网络环境安装慢或失败) | [Q5: node-gyp 编译错误](#q5-安装时报-node-gyp-编译错误) | [Q6: onboard 报错](#q6-openclaw-onboard-引导向导报错) | [Q7: 配置文件位置](#q7-配置文件在哪里怎么手动编辑) | [Q8: 多 API Key 配置](#q8-多个-api-key-怎么配置) | [Q9: 配置优先级](#q9-环境变量和配置文件哪个优先) | [Q10: 升级后配置丢失](#q10-升级-openclaw-后配置丢失了) | [Q11: 版本回滚](#q11-升级后功能异常怎么回滚) | [Q12: Windows Gateway 失败](#q12-windows-上安装后-gateway-启动失败) | [Q13: macOS 安全提示](#q13-macos-上安装提示无法验证开发者) | [Q14: 端口被占用](#q14-安装完成但-openclaw-gateway-start-提示端口被占用) | [Q15: 完全卸载](#q15-怎么完全卸载-openclaw)

### Q1: `openclaw` 命令找不到（command not found）

**现象：** 安装完成后执行 `openclaw` 提示 `command not found` 或 `不是内部或外部命令`。

**原因：** npm 全局安装的 bin 目录没有加入系统 PATH 环境变量。

**解决方案：**

```bash
# 第一步：确认是否真的安装了
npm list -g openclaw

# 第二步：找到 npm 全局 bin 目录
npm config get prefix
# 输出类似 /usr/local 或 /home/user/.npm-global

# 第三步：把 bin 目录加入 PATH
# Linux / macOS
echo 'export PATH="$(npm config get prefix)/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc

# Windows PowerShell
# 把 npm prefix 路径加到系统环境变量 Path 中
# 或者直接用 npx openclaw 代替
npx openclaw --version
```

如果你用的是 `pnpm`，全局 bin 路径不同：

```bash
pnpm config get global-bin-dir
# 把输出的路径加入 PATH
```

### Q2: Node.js 版本不兼容

**现象：** 安装时报错 `engine "node" is incompatible` 或运行时出现语法错误。

**原因：** OpenClaw 当前官方建议使用 Node.js 24.x；22.19+ 仍然兼容。低于兼容线时，常见报错就是 `engine incompatible`、运行时语法错误或部分 API 不可用。

**解决方案：**

```bash
# 检查当前版本
node --version

# 如果低于 v22，用 nvm 升级
# 安装 nvm（如果还没装）
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash

# 重新打开终端，然后：
nvm install 24
nvm use 24
nvm alias default 24  # 设为默认版本

# 验证
node --version  # 应该显示 v24.x.x
```

Windows 用户推荐用 [nvm-windows](https://github.com/coreybutler/nvm-windows)：

```powershell
nvm install 24
nvm use 24
```

### Q3: npm install 报权限错误（EACCES）

**现象：** `npm install -g openclaw` 时报 `EACCES: permission denied`。

**原因：** npm 全局目录的权限不对，当前用户没有写入权限。

**解决方案：**

```bash
# 方案一：修改 npm 全局目录（推荐）
mkdir -p ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH="~/.npm-global/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
npm install -g openclaw

# 方案二：用 sudo（不推荐，但能快速解决）
sudo npm install -g openclaw

# 方案三：用 nvm 管理 Node.js（最佳实践）
# nvm 安装的 Node.js 不需要 sudo
```

### Q4: 中国网络环境安装慢或失败

**现象：** `npm install` 卡住不动，或者下载速度极慢，最终超时失败。

**原因：** npm 默认从 `registry.npmjs.org` 下载，国内访问速度不稳定。

**解决方案：**

```bash
# 方案一：临时使用镜像（推荐）
npm install -g openclaw --registry=https://registry.npmmirror.com

# 方案二：永久切换镜像
npm config set registry https://registry.npmmirror.com
npm install -g openclaw

# 方案三：使用 cnpm
npm install -g cnpm --registry=https://registry.npmmirror.com
cnpm install -g openclaw

# 验证镜像是否生效
npm config get registry
```

如果连 npm 镜像都访问不了，可以考虑 Docker 安装方式，提前拉取镜像：

```bash
# 使用 Docker Hub 镜像加速
docker pull openclaw/openclaw:latest
```

### Q5: 安装时报 `node-gyp` 编译错误

**现象：** 安装过程中出现 `gyp ERR!` 或 `node-gyp rebuild` 失败。

**原因：** 某些依赖包含原生 C++ 模块，需要编译工具链。

**解决方案：**

```bash
# Linux (Ubuntu/Debian)
sudo apt-get install -y build-essential python3

# macOS
xcode-select --install

# Windows
# 以管理员身份运行 PowerShell
npm install -g windows-build-tools
# 或者安装 Visual Studio Build Tools
```

### Q6: `openclaw onboard` 引导向导报错

**现象：** 运行 `openclaw onboard` 后，终端卡在某一步不动了（光标闪烁但没有输出），或者直接报错退出并显示 `Error: network timeout` 或 `TypeError: Cannot read properties of undefined`。

**原因：** 可能是终端不支持交互式输入，或者网络问题导致无法验证 API Key。

**解决方案：**

```bash
# 方案一：确保用的是交互式终端（不是 IDE 内置终端）
# 打开系统自带的终端应用

# 方案二：跳过引导，手动配置
export OPENAI_API_KEY="sk-proj-xxxxx"
openclaw config set agents.defaults.model "openai/gpt-5.2"
openclaw gateway --port 18789

# 方案三：检查配置文件是否损坏
cat ~/.openclaw/openclaw.json
# 如果内容异常，删除后重新引导
rm ~/.openclaw/openclaw.json
openclaw onboard
```

### Q7: 配置文件在哪里？怎么手动编辑？

**现象：** 想直接编辑配置文件，但不知道在哪。

**说明：** OpenClaw 的所有配置都在 `~/.openclaw/` 目录下。

```bash
# 查看配置目录结构
ls -la ~/.openclaw/

# 主要文件：
# ~/.openclaw/openclaw.json    — 主配置文件（JSON5 格式）
# ~/.openclaw/workspace/      — 工作空间（记忆、技能等）
# ~/.openclaw/gateway/        — Gateway 运行时数据

# 用命令查看当前配置
openclaw config get

# 用命令修改配置（推荐，会自动验证格式）
openclaw config set <key> <value>

# 也可以直接编辑 JSON5 文件
nano ~/.openclaw/openclaw.json
```

### Q8: 多个 API Key 怎么配置？

**现象：** 想同时配置 OpenAI 和 Anthropic 的 Key，不知道怎么操作。

**解决方案：**

```bash
# 推荐：通过环境变量配置（优先级高于配置文件，更安全）
export OPENAI_API_KEY="sk-proj-xxxxx"
export ANTHROPIC_API_KEY="sk-ant-xxxxx"
export GEMINI_API_KEY="AIzaSy-xxxxx"

# 设置默认模型
openclaw config set agents.defaults.model "openai/gpt-5.2"

# OpenClaw 会自动读取环境变量，不需要在配置文件中写 Key
```

### Q9: 环境变量和配置文件哪个优先？

**说明：** 优先级从高到低：

```
命令行参数 > 环境变量 > ~/.openclaw/openclaw.json > 默认值
```

也就是说，如果你同时在环境变量和配置文件里设了 API Key，环境变量的值会生效。

### Q10: 升级 OpenClaw 后配置丢失了

**现象：** 更新到新版本后，之前的配置好像不见了。

**原因：** 正常情况下升级不会覆盖配置。但如果你用 Docker 部署且没有挂载数据卷，容器重建后数据会丢失。

**解决方案：**

```bash
# 升级前先备份
cp -r ~/.openclaw ~/.openclaw.backup

# npm 升级（配置不会丢）
npm update -g openclaw

# Docker 升级（确保挂载了数据卷）
# docker-compose.yml 中必须有：
# volumes:
#   - ./data:/root/.openclaw

# 如果配置真的丢了，从备份恢复
cp -r ~/.openclaw.backup ~/.openclaw
```

### Q11: 升级后功能异常怎么回滚？

**现象：** 执行 `npm update -g openclaw` 升级到新版本后，之前正常的功能出现报错、崩溃或行为异常，需要退回旧版本。

**解决方案：**

```bash
# 查看当前版本
openclaw --version

# 查看所有可用版本
npm view openclaw versions --json

# 回滚到指定版本
npm install -g openclaw@2026.3.28

# Docker 回滚
docker pull openclaw/openclaw:v2026.3.28
# 修改 docker-compose.yml 中的 image tag 后重启
```

### Q12: Windows 上安装后 Gateway 启动失败

**现象：** Windows 上执行 `openclaw gateway start` 后，终端窗口闪一下就关闭了（闪退），或者报错 `EADDRINUSE`、`EACCES` 等错误信息，Gateway 无法正常启动。

**原因：** Windows 的端口占用、防火墙或 WSL 兼容性问题。

**解决方案：**

```powershell
# 检查端口是否被占用
netstat -an | findstr 18789

# 如果被占用，换一个端口
openclaw config set gateway.port 18790

# 检查防火墙是否放行
# Windows Defender 防火墙 → 高级设置 → 入站规则 → 新建规则 → 端口 18789

# 推荐：在 WSL2 中运行 OpenClaw
wsl --install
# 在 WSL 中按 Linux 方式安装
```

### Q13: macOS 上安装提示"无法验证开发者"

**现象：** macOS 上首次运行 `openclaw` 命令时，系统弹出对话框提示「无法验证开发者」或「无法打开，因为 Apple 无法检查其是否包含恶意软件」，命令被阻止执行。

**解决方案：**

```bash
# 方案一：在系统偏好设置中允许
# 系统偏好设置 → 隐私与安全性 → 仍然允许

# 方案二：通过命令行移除隔离属性
xattr -d com.apple.quarantine $(which openclaw)
```

### Q14: 安装完成但 `openclaw gateway start` 提示端口被占用

**现象：** 报错 `EADDRINUSE: address already in use :::18789`。

**原因：** 端口 18789 已经被其他进程占用，或者上一次 Gateway 没有正常关闭。

**解决方案：**

```bash
# 找到占用端口的进程
# Linux / macOS
lsof -i :18789
# 记下 PID，然后 kill
kill -9 <PID>

# Windows
netstat -ano | findstr 18789
taskkill /PID <PID> /F

# 或者换一个端口
openclaw config set gateway.port 18790
openclaw gateway start
```

### Q15: 怎么完全卸载 OpenClaw？

**现象：** 不再使用 OpenClaw，想彻底从系统中移除所有相关文件（包括程序、配置和数据）。

**解决方案：**

```bash
# 停止 Gateway
openclaw gateway stop

# 卸载 npm 包
npm uninstall -g openclaw

# 删除配置和数据（谨慎操作，不可恢复）
rm -rf ~/.openclaw

# Docker 方式
docker compose down -v
docker rmi openclaw/openclaw:latest
```

---

## 二、消息平台问题

> 📌 **本节包含 10 个问题：**
> [Q16: WhatsApp 频繁断开](#q16-whatsapp-扫码后频繁断开) | [Q17: Telegram Bot 不响应](#q17-telegram-bot-不响应消息) | [Q18: Telegram 群组不回复](#q18-telegram-bot-在群组中不回复) | [Q19: Discord Bot 无法加入](#q19-discord-bot-无法加入服务器) | [Q20: 消息延迟严重](#q20-消息延迟严重发了好久才回复) | [Q21: rate limited](#q21-消息发送失败提示-rate-limited) | [Q22: 飞书收不到消息](#q22-飞书feishulark接入后收不到消息) | [Q23: 控制面板打不开](#q23-控制面板dashboard打不开) | [Q24: 多账号接入](#q24-同一个平台能接入多个账号吗) | [Q25: 图片文件处理](#q25-消息中的图片文件-ai-能处理吗)

### Q1: WhatsApp 扫码后频繁断开

**现象：** 扫码配对成功，但过一会儿就断开，需要反复扫码。

**原因：** WhatsApp Web 协议要求手机端保持在线。如果手机网络不稳定或 WhatsApp 应用被系统杀后台，连接就会断。

**解决方案：**

```bash
# 第一步：把 Gateway 安装为系统服务，保持持续运行
openclaw daemon

# 第二步：检查连接状态
openclaw channels status whatsapp

# 第三步：如果断开了，重新连接
openclaw channels logout whatsapp
openclaw channels login whatsapp

# 第四步：查看断开原因
openclaw logs --limit 50 | grep whatsapp
```

其他注意事项：
- 确保手机上的 WhatsApp 没有被省电模式限制后台运行
- 一个 WhatsApp 账号只能同时连接一个 Web 客户端，如果你在浏览器里也开了 WhatsApp Web，会冲突
- 建议用一个专门的手机号来跑 OpenClaw

### Q2: Telegram Bot 不响应消息

**现象：** 给 Telegram Bot 发消息，没有任何回复。

**原因：** 可能是 Bot Token 配置错误、Bot 没有接收消息的权限、或者 Gateway 没有正常运行。

**解决方案：**

```bash
# 第一步：确认 Gateway 在运行
openclaw status

# 第二步：确认 Bot Token 正确
openclaw config get channels.telegram.botToken
# 去 @BotFather 核对 Token 是否一致

# 第三步：确认 Bot 的隐私模式
# 在 @BotFather 中：
# /mybots → 选择你的 Bot → Bot Settings → Group Privacy → Turn off
# 关闭隐私模式后，Bot 才能接收群组中的所有消息

# 第四步：检查日志
openclaw logs --limit 50 | grep telegram

# 第五步：重新连接
openclaw channels logout telegram
openclaw channels login telegram
```

### Q3: Telegram Bot 在群组中不回复

**现象：** Bot 在私聊中正常回复，但在群组中不响应。

**原因：** Telegram Bot 默认开启隐私模式，在群组中只能收到 @提及 和 /命令。

**解决方案：**

1. 在 @BotFather 中关闭隐私模式（见 Q17）
2. 或者在群组中 @提及 Bot 来触发回复
3. 在群组配置中设置激活模式（通过聊天命令 `/activation mention` 或 `/activation always` 切换）

### Q4: Discord Bot 无法加入服务器

**现象：** 用邀请链接添加 Bot 时报错 `Missing Permissions`。

**原因：** Bot 的 OAuth2 权限配置不完整。

**解决方案：**

1. 去 [Discord Developer Portal](https://discord.com/developers/applications)
2. 选择你的应用 → OAuth2 → URL Generator
3. 勾选以下权限：
   - `bot`
   - `applications.commands`
   - `Send Messages`
   - `Read Message History`
   - `Embed Links`
   - `Attach Files`
4. 用生成的新链接重新邀请 Bot

```bash
# 配置 Discord Bot Token（注意：Discord 用的字段是 token，不是 botToken）
openclaw config set channels.discord.token "your-discord-bot-token"
openclaw channels logout discord
openclaw channels login discord
```

### Q5: 消息延迟严重（发了好久才回复）

**现象：** 发消息后要等 10 秒甚至更久才收到回复。

**原因：** 延迟可能来自多个环节 — 网络、模型 API 响应时间、消息队列积压。

**解决方案：**

```bash
# 第一步：排查是哪个环节慢
openclaw logs --limit 20
# 看日志中的时间戳，判断延迟发生在哪里

# 第二步：测试模型 API 延迟
openclaw health
# 如果 API 延迟高，考虑换模型或换提供商

# 第三步：检查是否有消息积压
openclaw sessions list

# 第四步：优化措施
# 使用更快的模型
openclaw config set agents.defaults.model "openai/gpt-5.2-mini"
# 减少系统提示词长度（Token 越少，响应越快）
# 精简 ~/.openclaw/workspace/SOUL.md 的内容
```

### Q6: 消息发送失败，提示 "rate limited"

**现象：** 发消息时报错 `429 Too Many Requests` 或 `rate limited`。

**原因：** 消息平台有发送频率限制。WhatsApp 尤其严格，短时间内发太多消息会被限流。

**解决方案：**

```bash
# 消息平台的限流是平台侧限制，OpenClaw 没有内置速率限制配置
# 解决方案：
# 1. 减少消息发送频率，避免触发平台限流
# 2. 等待限流解除后自动重试
# 3. 如果是 API 限流（429），参考 Q27 配置模型故障转移
```

### Q7: 飞书（Feishu/Lark）接入后收不到消息

**现象：** 飞书 Bot 配置完成，但收不到用户消息。

**原因：** 飞书的事件订阅配置不完整，或者回调地址不可达。

**解决方案：**

```bash
# 第一步：确认 Gateway 的公网地址可达
curl https://your-domain.com:18789/health

# 第二步：在飞书开放平台配置事件订阅
# 事件订阅 URL：https://your-domain.com:18789/webhook/feishu
# 需要订阅的事件：im.message.receive_v1

# 第三步：检查日志
openclaw logs --limit 50 | grep feishu

# 第四步：确认 Bot 权限
# 飞书开放平台 → 应用权限 → 确保开启了：
# - 获取与发送单聊、群组消息
# - 读取用户信息
```

### Q8: 控制面板（Dashboard）打不开

**现象：** 浏览器访问 `http://localhost:18789` 显示无法连接。

**原因：** Gateway 没有运行，或者端口被防火墙拦截。

**解决方案：**

```bash
# 第一步：确认 Gateway 在运行
openclaw status

# 如果没运行，启动它
openclaw gateway --port 18789

# 第二步：检查端口
# Linux / macOS
lsof -i :18789
# Windows
netstat -an | findstr 18789

# 第三步：如果是远程服务器，检查防火墙
# Ubuntu
sudo ufw allow 18789
# CentOS
sudo firewall-cmd --add-port=18789/tcp --permanent
sudo firewall-cmd --reload

# 第四步：重启 Gateway（停止后重新启动，或使用聊天命令 /restart）
openclaw gateway --port 18789
```

### Q9: 同一个平台能接入多个账号吗？

**说明：** 可以。OpenClaw 支持同一平台的多个 Channel 实例。

```bash
# 添加第二个 WhatsApp 账号
openclaw channels add whatsapp --name "work-whatsapp"
openclaw channels add whatsapp --name "personal-whatsapp"

# 查看所有 Channel
openclaw channels list
```

每个 Channel 独立运行，有自己的配对状态和消息队列。

### Q10: 消息中的图片/文件 AI 能处理吗？

**说明：** 取决于你使用的模型和当前 provider 目录。支持多模态的模型可以处理图片；具体型号不要背教程，以 `openclaw` 当前 models / onboarding 显示为准。

```bash
# 多模态能力取决于你使用的模型，不需要额外配置
# 支持多模态的模型会自动处理图片；具体型号以当前模型目录为准
# 文件大小限制取决于消息平台本身的限制
```

不支持多模态的模型收到图片时，会提示用户发送文字。

---

## 三、模型和 AI 问题

> 📌 **本节包含 10 个问题：**
> [Q26: API 401 报错](#q26-api-调用报错-401-unauthorized) | [Q27: API 429 限流](#q27-报错-429-too-many-requestsapi-限流) | [Q28: 模型回复慢](#q28-模型回复很慢) | [Q29: Token 超限](#q29-token-超限报错context-length-exceeded) | [Q30: Ollama 连不上](#q30-ollama-本地模型连不上) | [Q31: 本地模型质量差](#q31-本地模型回复质量差) | [Q32: 国产模型配置](#q32-怎么使用国产模型通义千问kimi智谱等) | [Q33: 模型故障转移](#q33-怎么配置模型故障转移fallback) | [Q34: 控制 API 费用](#q34-api-费用太高怎么控制成本) | [Q35: 不同对话用不同模型](#q35-怎么让不同的对话用不同的模型)

### Q1: API 调用报错 401 Unauthorized

**现象：** 发消息后 AI 不回复，日志中出现 `401 Unauthorized` 或 `Invalid API Key`。

**原因：** API Key 无效、过期、或者余额不足。

**解决方案：**

```bash
# 第一步：检查 Key 是否配置正确
# 推荐通过环境变量设置：
echo $OPENAI_API_KEY
# 确认 Key 没有多余的空格或换行

# 第二步：测试 Key 是否有效
openclaw health
# 如果报错，说明 Key 有问题

# 第三步：去提供商后台检查
# OpenAI: https://platform.openai.com/account/api-keys
# Anthropic: https://console.anthropic.com/settings/keys
# 确认 Key 没有被撤销，账户余额充足

# 第四步：重新设置 Key
export OPENAI_API_KEY="sk-proj-new-key-here"
# 然后重启 Gateway
```

### Q2: 报错 429 Too Many Requests（API 限流）

**现象：** 高频使用时出现 `429` 错误，AI 间歇性不回复。

**原因：** 超过了模型提供商的 API 调用频率限制（RPM/TPM）。

**解决方案：**

```bash
# 方案一：启用模型故障转移（推荐）
# 在 ~/.openclaw/openclaw.json 中配置：
# {
#   "agents": {
#     "defaults": {
#       "model": {
#         "primary": "openai/gpt-5.2",
#         "fallbacks": ["anthropic/claude-sonnet-5", "openai/gpt-5.2-mini"]
#       }
#     }
#   }
# }

# 方案二：使用 OpenRouter（聚合多个提供商，限流更宽松）
export OPENROUTER_API_KEY="sk-or-xxxxx"
openclaw config set agents.defaults.model "openrouter/openai/gpt-5.2"

# 方案三：升级 API 账户等级（更高的 RPM/TPM 限制）
# 去各提供商控制台升级
```

### Q3: 模型回复很慢

**现象：** 发送消息后，AI 要等 10-30 秒甚至更久才开始回复。在终端日志中可以看到请求已发出，但响应迟迟不返回。

**原因：** 大模型本身推理就需要时间，加上网络延迟，响应时间会更长。

**解决方案：**

```bash
# 方案一：换用更快的小模型
openclaw config set agents.defaults.model "openai/gpt-5.2-mini"
# gpt-5.2-mini 速度是 gpt-5.2 的 3-5 倍，日常对话足够用

# 方案二：流式响应默认已启用
# OpenClaw 默认使用流式输出（边生成边发送），无需额外配置

# 方案三：减少系统提示词长度
# 精简 SOUL.md 中不必要的指令，精简 MEMORY.md 内容
openclaw agents list
# 查看当前 Agent 列表

# 方案四：使用本地模型（延迟最低）
ollama pull llama3.1:8b
openclaw config set models.providers.ollama.baseUrl "http://127.0.0.1:11434"
openclaw config set agents.defaults.model "ollama/llama3.1:8b"

# 方案五：检查网络延迟
ping api.openai.com
# 如果延迟高，考虑使用代理或换区域更近的提供商
```

### Q4: Token 超限报错（context length exceeded）

**现象：** 对话到一定长度后报错 `maximum context length exceeded` 或 `token limit`。

**原因：** 每个模型都有上下文窗口限制。对话历史 + 系统提示 + 记忆文件的总 Token 数超过了模型限制。

**解决方案：**

```bash
# 查看当前会话的 Token 使用情况
openclaw sessions list

# 方案一：使用 /compact 命令手动压缩上下文
# 在聊天界面中发送 /compact，OpenClaw 会自动压缩旧消息
# 也可以配置自动压缩阈值：
# 在 ~/.openclaw/openclaw.json 中设置：
# {
#   "agents": {
#     "defaults": {
#       "compaction": {
#         "reserveTokensFloor": 20000
#       }
#     }
#   }
# }
# reserveTokensFloor 越大，压缩越激进

# 方案二：使用上下文窗口更大的模型
# 不同 provider 的上下文窗口会随版本变化，先查当前 models 目录再设置
