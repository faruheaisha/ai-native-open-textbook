---
title: "Awesome OpenClaw Tutorial（中文）"
sourceId: "11-personal-agents/awesome-openclaw-tutorial"
sourceTitle: "Awesome OpenClaw Tutorial（中文）"
sourceKind: "清单与速查"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "11-personal-agents"
sourceUrl: "https://github.com/xianyu110/awesome-openclaw-tutorial"
entryUrl: "https://github.com/xianyu110/awesome-openclaw-tutorial/blob/0b0943dc41725e80d64f7f8d745d185e7752be4d/docs/01-basics/02-installation.md"
sourceRel: "docs/01-basics/02-installation.md"
rawUrl: "/raw/11-personal-agents/awesome-openclaw-tutorial/docs/01-basics/02-installation.md"
sourceSha256: "ad38987b0e0a4f1aa9ff89c15af14b56823a0c189f58e461da221a3dd919f40b"
pageSha256: "a4e2bd161f8834e59d262204cfdcab731b53fb419f9b540176e55a97b01f9829"
contentMode: "local-full"
zh: ""
---

## Windows本地部署

> 🪟 **Windows用户**：完全可用，但部分系统集成功能受限。

![Windows系统部署架构 - WSL2+Ubuntu方案](https://upload.maynor1024.live/file/1770963301031_attachment_531c0e90-e8a2-469c-b6ec-b9811a55edfa_image.png)

### 系统要求

**硬件要求**：
- CPU：2核以上
- 内存：4GB以上（推荐8GB）
- 硬盘：10GB以上空闲空间

**操作系统**：
- Windows 10 或 Windows 11

**前置软件**：
- Node.js 24（推荐）/ 22.16+（兼容路径）

### 部署方式选择

Windows有两种部署方式：

1. **WSL2 + Ubuntu（强烈推荐）**：官方推荐方式，提供完整Linux环境支持
2. **PowerShell原生部署**：纯Windows环境，适合不想使用WSL2的用户

---

### 方式一：WSL2 + Ubuntu部署（强烈推荐）

这是官方推荐的Windows部署方式，提供最完整的Linux环境支持。

#### 第一步：启用WSL2

**以管理员身份打开PowerShell**，执行：

```powershell
# 启用WSL功能
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart

# 设置WSL 2为默认版本
wsl --set-default-version 2
```

**重启计算机**。

#### 第二步：安装Ubuntu

**方法一：Microsoft Store安装（推荐）**

1. 打开Microsoft Store
2. 搜索「Ubuntu 22.04 LTS」或「Ubuntu 24.04 LTS」
3. 点击「获取」并安装
4. 首次启动设置用户名和密码

安装完成后会自动打开Ubuntu终端，按提示设置用户名和密码。

#### 第三步：更新Ubuntu系统

在Ubuntu终端中执行：

```bash
# 更新软件包列表
sudo apt update && sudo apt upgrade -y

# 安装基础工具
sudo apt install -y curl git wget build-essential
```

#### 第四步：安装Node.js 24（推荐）

```bash
# 添加NodeSource仓库
curl -fsSL https://deb.nodesource.com/setup_24.x | sudo -E bash -

# 安装Node.js
sudo apt install -y nodejs

# 验证版本（推荐 v24.x）
node -v
npm -v
```

#### 第五步：安装 OpenClaw

**方法A：一键脚本安装**

```bash
curl -fsSL https://openclaw.ai/install.sh | bash
```

#### 第六步：验证安装

```bash
# 查看版本
openclaw --version

# 查看帮助
openclaw --help

# 查看系统状态
openclaw status
```

#### 第七步：配置Windows访问WSL2服务

由于OpenClaw运行在WSL2中，需要配置端口转发布以便Windows访问。

**创建启动脚本** `start-openclaw.bat`：

```batch
@echo off
echo Starting OpenClaw Gateway in WSL2...
wsl -d Ubuntu-22.04 -u root service openclaw start
timeout /t 3
start http://localhost:18789
```
或直接在WSL2中启动：

```bash
# 在WSL2 Ubuntu终端中
openclaw gateway run --port 18789
```
然后在Windows浏览器访问 `http://localhost:18789`

---

### 方式二：PowerShell原生部署

适合不想使用WSL2的纯Windows用户。

#### 第一步：安装Node.js 24（推荐）

**方法一：官网下载安装**

1. 访问 https://nodejs.org/zh-cn
2. 下载Windows安装包（推荐 24.x 版本）
3. 运行安装程序，勾选「自动安装必要的工具」

#### 第二步：验证Node.js安装

```powershell
# 打开PowerShell
node -v
npm -v
```

#### 第三步：以管理员身份安装 OpenClaw

**重要**：必须以**管理员身份**运行PowerShell。

```powershell
# 安装最新稳定版
npm install -g openclaw@latest --allow-scripts=openclaw

# 或安装汉化版
npm install -g @qingchencloud/openclaw-zh@latest
```

#### 第四步：解决安装权限访问题

如果遇到权限错误：

```powershell
# 方法A：启用PowerShell脚本执行
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# 方法B：修改npm安装目附录
npm config set prefix "C:\npm"
npm config set cache "C:\npm-cache"

# 将目附录添加到PATH
[Environment]::SetEnvironmentVariable("Path", $env:Path + ";C:\npm", "User")
```

#### 第五步：验证安装

```powershell
openclaw --version
openclaw --help
```

#### 第六步：解决常见访问题

**访问题：sharp模块加载失败**

```powershell
# 清理npm缓存
npm cache clean --force

# 重新安装
npm install -g openclaw@latest --allow-scripts=openclaw --force
```

**访问题：Windows Defender阻止**

将OpenClaw安装目附录添加到Windows Defender排除项：

```
C:\Users\你的用户名\AppData\Roaming\npm
C:\Users\你的用户名\.openclaw
```
---

### 初始化配置

安装完成后，需要运行初始化向导。

#### 启动初始化向导

```bash
openclaw onboard --install-daemon
```

#### 配置AI模型提供商

OpenClaw需要对接AI模型才能工作。

**以配置Anthropic Claude（推荐）为例：**

> 📖 **详细说明**: 完整的 API Key 配置方式和优先级说明请参考 [API Key 配置完整指南](/lib/11-personal-agents/awesome-openclaw-tutorial/docs-api-key-config-guide)

```bash
# WSL2或PowerShell
openclaw models auth add
# 按提示选择 anthropic
# 输入 API Key: sk-ant-xxx
```

#### 绑定消息渠道

**1. Telegram**

创建Bot：
1. 在Telegram搜索 `@BotFather`
2. 发布送 `/newbot` 创建机器人
3. 保存Bot Token

配置：

```bash
openclaw channels add telegram
openclaw config set channels.telegram.botToken "your-bot-token"
openclaw gateway restart
```

**2. WhatsApp**

```bash
# 登录WhatsApp（显示二维码）
openclaw channels login whatsapp

# 用手机WhatsApp扫码
```

**3. 企业微信（国内推荐）**

```bash
# 安装企业微信插件
openclaw plugins install @m1heng-clawd/wework

# 配置
openclaw config set channels.wework '{"enabled":true,"corpId":"xxx","agentSecret":"xxx"}' --json
```

**4. 飞书（国内推荐）**

```bash
# 安装飞书插件
openclaw plugins install @m1heng-clawd/feishu

# 配置
openclaw config set channels.feishu '{"enabled":true,"appId":"cli_xxx","appSecret":"xxx"}' --json
```

### Windows常用命令速查

**系统管理**：

| 命令 | 功能 |
|------|------|
| `openclaw --version` | 查看版本 |
| `openclaw status` | 查看系统状态 |
| `openclaw health` | 健康检查 |
| `openclaw update` | 更新OpenClaw |
| `openclaw doctor` | 诊断系统访问题 |

**配置管理**：

| 命令 | 功能 |
|------|------|
| `openclaw onboard` | 初始化向导 |
| `openclaw configure` | 交互式配置 |
| `openclaw config get <key>` | 查看配置项 |
| `openclaw config set <key> <value>` | 修改配置项 |
| `openclaw config unset <key>` | 删除配置项 |
