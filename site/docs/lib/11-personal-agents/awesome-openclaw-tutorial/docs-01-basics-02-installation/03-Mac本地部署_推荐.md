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
pageSha256: "8c7fd06e624257fcd97368b3ea87a78f1cddb8de96dbd9f0194ee80e4d116032"
contentMode: "local-full"
zh: ""
---

## Mac本地部署（推荐）

> 🍎 **最佳体验**：如果你有Mac电脑，强烈推荐本地部署，体验最好、功能最全！

### 为什么选择Mac本地部署？

**优势**：
- ✅ **系统集成**：可操作日历、备忘附录、文件系统
- ✅ **隐私安全**：数据完全本地，不上传云端
- ✅ **响应速度快**：本地运行，无网络延迟
- ✅ **功能最全**：支持所有高级功能
- ✅ **成本低**：无需购买云服务器
- ✅ **开发布友好**：方便调试和自定义

**适合人群**：
- 有Mac电脑的用户
- 注重隐私的用户
- 需要系统集成功能的用户
- 开发布者和技术爱好者

### 系统要求

**硬件要求**：
- CPU：M系列芯片或Intel i5以上
- 内存：8GB以上（推荐16GB）
- 硬盘：10GB以上空闲空间

**系统版本**：
- macOS 12 Monterey 或更高版本
- 推荐 macOS 14 Sonoma 或 macOS 15 Sequoia

**前置软件**：
- Node.js 24（推荐）/ 22.16+（兼容路径，会自动安装）
- Homebrew（可选，用于安装依赖）

### 安装步骤

#### 第一步：打开终端

1. 按 `Command + 空格` 打开 Spotlight
2. 输入 `Terminal` 或`终端`
3. 按回车打开终端

![Mac终端打开方式 - 通过Spotlight搜索Terminal](https://upload.maynor1024.live/file/1770742238798_07-select-quickstart.png)

#### 第二步：安装 OpenClaw

在终端中执行以下命令：

```bash
curl -fsSL https://openclaw.ai/install.sh | bash
```
安装过程会自动：
- 检测系统环境
- 安装Node.js（如果未安装）
- 下载OpenClaw
- 配置环境变量

**预计时间**：2-5分钟

#### 第三步：验证安装

安装完成后，执行以下命令验证：

```bash
openclaw --version
```
如果显示版本号（如 `2026.9.3`），说明安装成功！

#### 第四步：初始化配置

运行配置向导：

```bash
openclaw onboard
```

**配置流程**：

**1. 接受风险提示**：

选择 `Yes` 继续

![安装向导 - 接受风险提示](https://upload.maynor1024.live/file/1770742238798_07-select-quickstart.png)

**2. 选择启动模式**：

推荐选择 `QuickStart` 快速启动：

![安装向导 - 选择QuickStart快速启动模式](https://upload.maynor1024.live/file/1770742238798_07-select-quickstart.png)

**3. 选择AI模型**：

选择你的AI供应商（支持国内外主流模型）：

![安装向导 - 选择AI模型供应商](https://upload.maynor1024.live/file/1770742221938_03-select-ai-provider.png)

国内推荐：
- **Kimi（Moonshot AI）**：长文本专家，200万字上下文
- **DeepSeek**：性价比之王，推理能力强
- **智谱GLM**：中文理解好，多模态支持

**4. 输入API Key**：

根据选择的模型，输入对应的API Key（参见[API配置指南](#api配置指南)）

**5. 选择聊天工具**：

- 如果要接入飞书/Telegram，选择对应选项
- 如果暂时不接入，选择 `None`（后续可配置）

![安装向导 - 选择聊天平台（飞书/企微/QQ等）](https://upload.maynor1024.live/file/1770742247561_08-select-chat-tool.png)

**6. Gateway端口设置**：

默认 `18789` 即可：

![安装向导 - Gateway端口配置（默认18789）](https://upload.maynor1024.live/file/1770742247410_09-port-setting.png)

**7. 选择Skills**：

使用空格键选择你需要的技能，也可以直接跳过：

![安装向导 - 选择需要安装的技能包](https://upload.maynor1024.live/file/1770742255849_10-select-skills.png)

**8. API Key配置**：

没有的可以选择 `no` 跳过：

![安装向导 - 配置AI模型API 密钥](https://upload.maynor1024.live/file/1770742264976_11-api-key-config.png)

**9. 启用Hooks**：

推荐启用这三个钩子（用于内内容引导、日志和会话记附录）：

![安装向导 - 启用自动化钩子功能](https://upload.maynor1024.live/file/1770742261487_12-enable-hooks.png)

**10. 完成配置**：

配置完成后，会自动启动Gateway服务并打开Web UI（`http://127.0.0.1:18789/chat`）

#### 第五步：验证安装

```bash
# 检查Gateway状态
openclaw channels status

# 应该显示：
# Gateway reachable.
```

### 日常使用

**启动OpenClaw**：

```bash
# 启动Gateway服务
openclaw gateway start

# 或使用systemd（推荐，开机自启）
openclaw gateway enable
```

**访问Web UI**：

打开浏览器访问：`http://127.0.0.1:18789/chat`

**停止服务**：

```bash
openclaw gateway stop
```

### 接入飞书（推荐）

Mac本地部署后，强烈推荐接入飞书，获得最佳体验：

1. 参考 [第9章节：飞书Bot配置](/lib/11-personal-agents/awesome-openclaw-tutorial/docs-03-advanced-09-multi-platform-integration/index#91-飞书bot配置)
2. 配置完成后，可以在飞书中随时与OpenClaw对话
3. 支持文本、图片、文件等多种消息类型

### 常见访问题

**Q1：安装时提示权限不足？**

```bash
# 使用sudo安装
curl -fsSL https://openclaw.ai/install.sh | sudo bash
```

**Q2：如何更新OpenClaw？**

```bash
openclaw update
```

**Q3：如何卸载？**

```bash
openclaw uninstall
```
