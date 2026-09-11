---
title: "Claude Code & OpenClaw & Codex & WorkBuddy 中文教程"
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

# Claude Code & OpenClaw & Codex & WorkBuddy 中文教程


  
  
  
  
  
  
  
  

**AI Coding / Agent 工作流中文实战教程**



> 🎯 **从个人上手到团队落地：Claude Code + OpenClaw + Codex + WorkBuddy**
>
> 老金基于 **15+ 年游戏研发、项目管理、多部门协同、里程碑制定与数据分析经验** 整理本教程，面向 **中小企业 AI 赋能、高校培训、开发团队 AI Coding 落地、国内办公场景**。

> Codex 主线以 **Codex App** 为核心；CLI / Web / SDK / GitHub Action 等只作为 App 生态补充。WorkBuddy 主线面向**办公人和国内团队**，跟另外三条开发者主线互补不冲突。

> 📚 50 篇完整教程 + 1 张速查卡 | 80万+ Markdown 内容量 | 1500+ 代码块 / 命令 / 配置示例 | 250+ 问答条目

> 🔗 **GitHub 仓库**：[https://github.com/KimYx0207/AI-Coding-Guide-Zh](https://github.com/KimYx0207/AI-Coding-Guide-Zh)

---

## 📖 项目简介

这是一套**系统化、适合循序学习、也能进入团队落地**的 AI Coding 与 Agent 工作流中文教程，覆盖三类代表性工具：

| | Claude Code | OpenClaw | Codex | WorkBuddy |
|--|-------------|----------|-------|---------|
| **是什么** | Anthropic 官方 AI 编程 CLI 工具 | 开源 AI 私人助手框架 | OpenAI 编程 Agent 平台 | 腾讯 AI 办公助手桌面 App |
| **干什么** | 终端里写代码、调Bug、做架构 | 消息平台上管邮件、排日程、自动化一切 | App / CLI / Web / IDE / SDK 分层协作的编程 Agent | 专家/专家团/技能/自动化/腾讯生态，办公出活 |
| **谁出的** | Anthropic 官方 | Peter Steinberger（原名 Clawdbot，因 Claude 商标被迫改名） | OpenAI 官方（CLI 开源 Apache-2.0） | 腾讯云（与 CodeBuddy 同根生） |
| **教程数** | 13 篇 + 1 速查卡 | 12 篇完整教程 | 14 篇完整教程 | 11 篇完整教程 |

### 👤 作者定位

老金是合伙创业游戏研发公司出身，15 余年一线项目经验：从策划到整体项目负责人，长期处理多部门协同、团队管理、研发里程碑、版本节奏、数据分析和交付风险。

这套教程的目标不是堆命令，而是把 AI Coding / Agent 工具转成企业和高校都能理解、能训练、能验收的实战体系：先跑起来，再接入真实工作流，最后建立团队规范和安全边界。

### 🧬 为什么放在一起？

**因为真实落地时，企业和个人不会只用一个工具：**

1. **编程生产力** — Claude Code 适合深入本地项目、改代码、跑测试、做架构分析
2. **日常自动化** — OpenClaw 适合把 AI 接到消息平台、个人助理和企业流程里
3. **多入口协作** — Codex 适合 App / CLI / Web / Cloud / GitHub 等分层协作
4. **培训与管理** — 三者放在一起，才能讲清楚工具选择、权限边界、团队规范和落地路径

### ✨ 核心特色

- **🎓 三线学习路径**：Claude Code 编程线 + OpenClaw 助手线 + Codex Agent 线，按目标选择
- **🧭 清晰路径**：从安装、第一轮任务到团队规范，按主线逐步推进
- **📚 分层阅读**：新手看路线图，开发者看实操，团队负责人看规范和安全
- **💻 实战导向**：1500+ 个代码块、命令片段、配置模板和提示词示例，边学边练
- **📊 质量保证**：关键版本号与 App / CLI 行为优先对照 **官方 Release / 文档** 修订；细节仍可能随上游快速变化，请以你本机版本为准
- **🔄 持续更新**：适配最新稳定版（Claude Code v2.1.222 / OpenClaw v2026.7.1-2 / Codex App 26.727；Codex CLI 辅助基线 0.146.1，实际以 App 更新日志和本机 App 信息为准）

---

## 🎯 按身份选择路线

| 你是谁 | 先解决什么问题 | 推荐入口 |
|--------|----------------|----------|
| **刚入门的读者** | 看懂核心概念，完成第一个低风险任务 | README 快速开始 → Claude Code 01 / OpenClaw OC-03 / Codex CX-01 |
| **开发者** | 把 AI 接进真实项目，提高写代码和排障效率 | Claude Code 02 / 04 / 05，Codex CX-02 / CX-04 / CX-05 |
| **团队负责人 / PM** | 建立协作规范、里程碑检查、Review 和安全边界 | Claude Code 10 / 11，Codex CX-10 / CX-13 / CX-14 |
| **企业培训 / 高校课程** | 设计可讲、可练、可验收的课程路径 | 三线快速上手 + 企业安全章节 + FAQ / 检查清单 |

---

## 📚 教程目录

### 🤖 Part 1：Claude Code — Anthropic 官方编程 CLI

| 序号 | 教程名称 | 学时 | 难度 | 必学度 | 说明 |
|------|---------|------|------|--------|------|

**速查**：[Claude Code 快速导航卡](/lib/07-coding/ai-coding-guide-zh/docs-claude-code-快速导航卡)

### 🦞 Part 2：OpenClaw — 开源 AI 助手

| 序号 | 教程名称 | 难度 | 说明 |
|------|---------|------|------|
| OC-00 | [阅读指南](/lib/07-coding/ai-coding-guide-zh/docs-openclaw-00-阅读指南) | 🟢 | 术语表、文档地图、4条阅读路线 |
| OC-01 | [项目介绍](/lib/07-coding/ai-coding-guide-zh/docs-openclaw-01-OpenClaw项目介绍) | 🟢 | OpenClaw 是什么、发展历史、核心架构 |
| OC-02 | [安装部署](/lib/07-coding/ai-coding-guide-zh/docs-openclaw-02-安装部署指南) | 🟢 | macOS / Linux / Windows 全平台安装 |
| OC-03 | [快速开始](/lib/07-coding/ai-coding-guide-zh/docs-openclaw-03-快速开始指南) | 🟢 | 完成第一个本地对话和基础检查 |
| OC-04 | [AI 模型配置](/lib/07-coding/ai-coding-guide-zh/docs-openclaw-04-模型配置指南) | 🟡 | 接入 OpenAI / Claude / Ollama 等模型 |
| OC-05 | [消息平台接入](/lib/07-coding/ai-coding-guide-zh/docs-openclaw-05-消息平台接入指南) | 🟡 | 连接 WhatsApp / Telegram / Discord / 飞书等平台 |
| OC-06 | [技能系统](/lib/07-coding/ai-coding-guide-zh/docs-openclaw-06-技能系统指南) | 🟡 | 技能生态与自定义技能开发 |
| OC-07 | [记忆系统](/lib/07-coding/ai-coding-guide-zh/docs-openclaw-07-记忆系统指南) | 🟡 | AI 如何记住你的偏好和上下文 |
| OC-08 | [多 Agent 协作](/lib/07-coding/ai-coding-guide-zh/docs-openclaw-08-多Agent协作指南) | 🔴 | 一个网关跑多个独立 AI 助手 |
| OC-09 | [Docker 部署](/lib/07-coding/ai-coding-guide-zh/docs-openclaw-09-Docker部署指南) | 🔴 | 容器化部署与 VPS 远程访问 |
| OC-10 | [安全配置](/lib/07-coding/ai-coding-guide-zh/docs-openclaw-10-安全配置指南) | 🔴 | 安全配置、CVE 防护、权限管理 |
| OC-11 | [常见问题](/lib/07-coding/ai-coding-guide-zh/docs-openclaw-11-常见问题FAQ) | 🟢 | 踩坑指南与解决方案 |

### 🤖 Part 3：Codex — OpenAI 编程 Agent 平台

Codex 学习主线：**只有 Codex App 一条主线**。先看 CX-01 安装认证和 CX-02 App 桌面工作流；CX-03 到 CX-10 按功能拆开讲 Commands、项目指令、MCP、Skills、Plugins、Subagents、Automations、Review / GitHub；CX-11 和 CX-12 分别是 Web / Cloud、CLI 辅助；CX-13 安全企业；CX-14 为 Claude Code 对比附录。

| 序号 | 教程名称 | 学时 | 难度 | 说明 |
|------|---------|------|------|------|

### 🐧 Part 4：WorkBuddy — 腾讯 AI 办公助手

WorkBuddy 主线面向**办公人和国内团队**：会用电脑但不会命令行的人、用企业微信/腾讯文档的团队、想给非技术同事一个 AI 工具的人。跟另外三条开发者主线互补，不冲突。先看 WB-00 阅读指南找到学习路径，再按需学 WB-01~WB-10。

| 序号 | 教程名称 | 学时 | 难度 | 说明 |
|------|---------|------|------|------|
| WB-00 | [阅读指南](/lib/07-coding/ai-coding-guide-zh/docs-workbuddy-WB-00-阅读指南) | 5 分钟 | 🟢 | 五大核心概念、文档地图、阅读路线 |

---

## 📋 环境要求
### Claude Code

- **操作系统**：Windows 10+、macOS 10.15+、Linux
- **安装方式**：支持标准安装（`npm install -g @anthropic-ai/claude-code`，需 Node.js 18+）和原生二进制安装（beta / 改进安装路径）
- **认证方式**：可用 Claude 订阅登录，也可用 Anthropic Console / 第三方兼容提供商配置
- **IDE**：VS Code、Cursor、Windsurf 或其他支持的编辑器

> ⚠️ **2026年更新**：Claude Code 已提供原生二进制安装，但 **Node.js 18+ 的标准 npm 安装路径仍然受支持**。本仓库安装指南现同时覆盖两条路径，并明确各自适用场景。

### OpenClaw

- **Node.js**：24.x 推荐，22.19+ 兼容
- **AI 模型 API Key**：OpenAI / Anthropic / Google 等（或使用 Ollama 本地模型免 Key）
- **操作系统**：macOS / Linux / Windows（推荐 WSL2）

### Codex

- **Codex App**：当前主线按 App 26.727（2026-07-30 官方 changelog）复核；Codex 已并入 ChatGPT 桌面 App（26.707 起），macOS 从官方入口安装，Windows 以 Microsoft Store / `winget -s msstore` 等官方安装入口为准
- **CLI / Web / Cloud 辅助**：CLI 仅用于终端排查、CI、MCP / plugin 管理等辅助场景；Web / Cloud 用于远程仓库和长任务接力，版本以官方文档和当前账号能力为准
- **认证方式**：ChatGPT 账户登录 或 OpenAI API Key

### WorkBuddy

- **WorkBuddy 桌面 App**：腾讯云出品，与 CodeBuddy 同账号同团队、积分共享；Windows 10/11、macOS（Apple Silicon / Intel）都支持
- **多端**：桌面 App + 微信公众号/小程序 + 企业微信，同一微信账号打通
- **认证方式**：微信扫码（推荐）、QQ 扫码、手机号验证码、腾讯云账号密码
- **网络**：国内服务器直连，正常办公网络不用代理

---

## 🚀 快速开始

### 克隆仓库

```bash
git clone https://github.com/KimYx0207/AI-Coding-Guide-Zh.git
cd AI-Coding-Guide-Zh
```

### Claude Code 路线（3小时上手）

```
Step 1（60分钟）：01-安装指南 → 路径A快速上手
Step 2（30分钟）：04-MCP集成 → 第2部分快速开始
Step 3（30分钟）：05-Hooks系统 → 第2部分快速开始
完成 ✅ 能用Claude Code + 能用MCP + 能用Hook
```

### OpenClaw 路线（1小时上手）

```
Step 1（15分钟）：OC-01 项目介绍 → 了解全局
Step 2（20分钟）：OC-02 环境安装 → 装好环境
Step 3（10分钟）：OC-03 快速开始 → 跑起第一个对话
Step 4（15分钟）：OC-04 模型配置 → 接入 AI 模型
完成 ✅ 能用OpenClaw + 能和AI对话
```

### Codex 路线（20分钟上手）

```
Step 1（10分钟）：CX-01 安装与认证 → 装好 Codex + 配好认证
Step 2（10分钟）：CX-02 App 桌面工作流 → 跑起第一个 App 线程
完成 ✅ 能用Codex + 能让AI写代码
```

### WorkBuddy 路线（30 分钟上手）

```
Step 1（10 分钟）：WB-02 安装登录 → 装好 WorkBuddy、微信扫码
Step 2（20 分钟）：WB-01 项目介绍 → 召唤第一个专家、跑通周报任务
完成 ✅ 能用 WorkBuddy + 能让 AI 帮你出办公产物
```

### 完整掌握路径

```
Week 1-2：Claude Code 安装 + 基础使用 + MCP
Week 3-4：Claude Code Hooks + Skills + Plugins
Week 5  ：Claude Code 模型配置 + Remote Control + Channels/计划任务
Week 6  ：Claude Code Agent-SDK + 综合实战
Week 7  ：OpenClaw 安装 + 快速开始 + 模型配置
Week 8  ：OpenClaw 消息平台 + 技能系统 + 记忆系统
Week 9  ：OpenClaw 多Agent + Docker部署 + 安全
Week 10 ：Codex App 安装 + App 桌面工作流 + Commands
Week 11 ：项目指令 + MCP + Skills + Plugins / Connectors + Subagents
Week 12 ：Automations + Review / GitHub / PR + Web/Cloud/CLI 辅助 + 安全
Week 13：WorkBuddy 安装 + 项目介绍 + 专家与专家团
Week 14：WorkBuddy 技能 + 连接器 + 知识库 + 自动化 + 多端 + 企业安全
```

---

## 📊 项目统计

| 指标 | 数值 |
|------|------|
| **教程总数** | 50 篇完整教程（Claude Code 13 / OpenClaw 12 / Codex 14 / WorkBuddy 11）+ 1 速查卡 |
| **内容体量** | 80万+ Markdown 内容量（含正文、命令、代码、配置、提示词和 FAQ） |
| **中文核心内容** | 20万+ 中文字 |
| **代码 / 命令 / 配置示例** | 1500+ 个代码块与实操片段（核心示例按当前版本持续校验） |
| **FAQ / 问答条目** | 250+ 个 |
| **覆盖AI模型** | OpenClaw 支持多个主流模型提供商，具体目录以当前安装版本和官方 Models / Onboarding 为准 |
| **覆盖消息平台** | WhatsApp、Telegram、Slack、Discord、Signal、Google Chat、iMessage、Microsoft Teams、Matrix、飞书、LINE、Mattermost、Nextcloud Talk、Nostr、Synology Chat、Twitch、Zalo、WeChat、QQ 等 |
| **Claude Code版本** | v2.1.222（2026-08-06 对照 [GitHub Releases](https://github.com/anthropics/claude-code/releases) 与官方 changelog） |
| **OpenClaw版本** | v2026.7.1-2（2026-08-06 对照 [Releases](https://github.com/openclaw/openclaw/releases)）；v2026.7.2-beta.7 为预发布线，不作为本教程默认稳定基线 |
| **Codex版本** | Codex App 26.727（2026-07-30 官方 changelog）；Codex CLI 0.146.1（2026-08-05，辅助路径）；实际以 App 更新日志、系统应用信息和官方文档为准 |
| **WorkBuddy版本** | 2026.08 基线（与 CodeBuddy 同账号同团队，积分共享）；App 无 semver，版本以本机"关于"页和官网当前显示为准 |

---

## 🔖 版本说明

> **版本校验方法**：本仓库教程中的版本号和 App / CLI 行为，优先对照 **官方 Release / 官方文档** 修订。上游产品迭代很快，部分细节可能在你阅读时已发生变化。
>
> **遇到版本不一致时**：以你本机 App About / Settings、系统应用信息、`claude --version`、CLI `codex --version` 或 `npm list -g` 的输出为准，教程示例按官方最新文档调整。

| 产品 | 当前验证版本 | 本轮复核 | 官方来源 |
|------|-------------|---------|---------|
| Claude Code | v2.1.222 | 2026-08-06 | [Claude Code changelog](https://code.claude.com/docs/en/changelog) / [GitHub Releases](https://github.com/anthropics/claude-code/releases) |
| OpenClaw | v2026.7.1-2 | 2026-08-06 | [GitHub Releases](https://github.com/openclaw/openclaw/releases) |
| Codex App | 26.727 | 2026-08-06 | [Codex changelog](https://developers.openai.com/codex/changelog) |
| Codex CLI | 0.146.1 | 2026-08-06 | [Codex changelog](https://developers.openai.com/codex/changelog) / [GitHub Releases](https://github.com/openai/codex/releases) |
| WorkBuddy | 2026.08 基线 | 2026-08-06 | App 内"关于"页 / workbuddy.ai / codebuddy.cn/work（无 semver，以本机和官网为准） |

### 本轮版本差异速览

| 产品 | 从旧基线到当前基线 | 对教程的影响 |
|------|------------------|--------------|
| Claude Code v2.1.181 → v2.1.222 | **Sonnet 5 成默认**（v2.1.197，1M 上下文）、**Opus 5 成默认**（v2.1.219）、"Default" 权限模式改名 **"Manual"**（v2.1.200）、**ultraplan 移除**（v2.1.222）、subagent 默认后台 + 嵌套深度 3、新 `/doctor` / `/commit-push-pr` / `/fork` / `/code-review`、性能 79× transcript 缩小 / 7× 工具回合提速（v2.1.208）、Remote Control 不再允许仓库级开启、新 hooks（DirectoryAdded / EndConversation / Notification）、OTel `OTEL_LOG_USER_PROMPTS=1` 现也记录响应文本 | 基础使用（权限模式重命名）、Commands（新命令 + ultraplan 移除）、Subagents（后台默认 + 嵌套3）、Hooks（新事件 + OTel 行为变化）、Remote Control（仓库级禁用）、综合实战（性能）、企业（沙盒强化）章节按 v2.1.222 更新 |
| OpenClaw v2026.6.8 → v2026.7.1-2 | **State safety & recovery**（quarantine store、SQLite 崩溃可恢复快照、schema 升级拒丢数据）、**durable channel delivery**（Telegram/Slack 跨崩溃保消息、Discord/iMessage/WhatsApp 跨崩溃保流量）、session rewind and branching、interactive MCP Apps、structured agent questions、meeting plugins（Teams/Zoom）、Wear OS companion；修复 Memory Core 启动冲突 fatal restart loop、Codex progress replies 中途停、WSL state permissions、npm 插件更新 singleton-array metadata | 安装升级、消息平台、技能系统、记忆系统、多 Agent、Docker、安全章节按 v2026.7.1-2 更新；预发布线 v2026.7.2-beta.7 不作为稳定基线 |
| Codex App 26.609 → 26.727 | **Codex 并入 ChatGPT 桌面 App**（26.707，可设为默认视图）、**PR Chat**（在 ChatGPT 桌面内审 PR）、**多仓库 diff 审查**（26.727）、本地项目多文件夹（26.715）、Activity view（26.727）、Chrome 扩展（提及打开标签页 / 高亮文本）、Markdown 行内编辑、内置浏览器更智能 | CX-01 安装认证（并入 ChatGPT 桌面）、CX-02 桌面工作流（多文件夹 + 多仓库 diff + Activity view）、CX-10 Review/PR（PR Chat）、CX-11 Web/Cloud（浏览器 + Chrome 扩展）章节按 26.727 更新 |
| Codex CLI 0.141.0 → 0.146.1 | **GPT-5.6 Sol/Terra/Luna 全系**（272K 上下文）、**多 Agent V2 稳定**（可配置 subagent 模型/推理等级/并发）、`/import` 扩展到 **Claude Code + Cursor**、`/new` + `/clear` 命名/置顶线程、线程分叉、**远程插件默认开**（npm marketplace）、**MCP 交互式认证默认**（非实验）、新 `writes` 审批模式、Agent Plugins manifest + workspace 发布、新市场 Amazon Bedrock + Claude Code、系统代理 PAC/WPAD、企业 in-app 更新管控 | CX-03 Commands（/new /clear /import）、CX-05 MCP（交互式认证默认）、CX-07 Plugins（远程默认 + 新市场）、CX-08 Subagents（V2 稳定）、CX-12 CLI（代理 + Bedrock）、CX-13 安全（writes 模式 + 网络能力模型自动审查）章节按 0.146.1 更新 |

> ⚠️ **版本号会随上游更新而失效**。教程中标注的版本号是编写/验证时的快照，不代表实时最新。遇到界面、命令或参数不一致时，优先查 App 更新日志、官方文档和 CLI 帮助（`--help`）。

---

## 🔌 第三方模型配置说明

三大工具均支持多种模型接入方式，具体配置见各教程：

| 产品 | 支持方式 | 配置入口 |
|------|---------|---------|
| **Claude Code** | Anthropic Console / Claude 订阅 / 第三方兼容提供商（`ANTHROPIC_BASE_URL`） | [01-安装指南：API中转站配置](/lib/07-coding/ai-coding-guide-zh/docs-claude-code-01-Claude-Code完整安装指南) |
| **OpenClaw** | 多个主流提供商（OpenAI / Claude / Gemini / Ollama / 本地模型等，实际以当前模型目录为准） | [04-模型配置指南](/lib/07-coding/ai-coding-guide-zh/docs-openclaw-04-模型配置指南) |
| **Codex** | ChatGPT 账户登录 / OpenAI API Key | [CX-01 App 安装与认证](/lib/07-coding/ai-coding-guide-zh/docs-codex-CX-01-Codex-App安装与认证完整指南) |

> ⚠️ **第三方模型注意事项**：
> - 第三方兼容提供商的 API 行为可能不完全等同于官方（速率限制、模型列表、功能支持可能有差异）
> - 本地模型（Ollama 等）能力取决于模型本身，复杂任务可能不如旗舰模型
> - 各提供商计费方式不同，使用前请确认价格策略

---

## 🎯 适用人群

- ✅ **刚入门的读者**：从未接触过 AI 编程工具，想系统学习
- ✅ **办公人 / 业务用户 / 国内团队**：想用 AI 出周报、调研、PPT，被英文 CLI 劝退过，WorkBuddy 主线为你准备
- ✅ **开发者**：想用 Claude Code 提升编程效率 + 用 OpenClaw 自动化日常工作
- ✅ **团队负责人 / PM**：为团队制定 AI 工具使用规范、评审流程和里程碑验收方式
- ✅ **企业用户**：企业级部署、安全边界、权限管理和最佳实践
- ✅ **高校 / 培训机构**：设计 AI Coding、Agent 工作流和企业实践课程
- ✅ **AI 爱好者**：想搭建自己的 AI 私人助手

---

## 💡 学习建议

### 初学者

**想学编程 AI** → 从 Claude Code Part 1 开始（01 → 04 → 05）

**想搭建 AI 助手** → 从 OpenClaw Part 2 开始（OC-01 → OC-02 → OC-03）

**想试 Codex** → 从 Codex Part 3 开始（CX-01 → CX-02 或 CX-03）

**都想学** → 先走 Claude Code CLI 主线，再补 Codex App 桌面工作流，最后学习 OpenClaw 助手框架

### 进阶者（有基础）

- Claude Code 重点：04-MCP、05-Hooks、06-Subagent、07-Skills
- OpenClaw 重点：06-技能系统、08-多Agent路由
- Codex 重点：CX-05 配置系统、CX-06 Skills、CX-07 MCP

### 高级者（深度定制）

- Claude Code：09-Agent-SDK、10-综合实战
- OpenClaw：08-多Agent、09-Docker部署、10-安全
- Codex：CX-04 项目指令与权限、CX-08 Subagents、CX-09 Automations、CX-10 Review / PR、CX-13 安全企业
- **双工具协作**：Codex + Claude Code 的定位、边界和共存策略详见 CX-14
- 长期 Skill 治理：可参考 [SkillClaw](https://github.com/AMAP-ML/SkillClaw)（skill 演化、去重、合并、共享；论文 [arXiv:2604.08377](https://arxiv.org/abs/2604.08377)）

---

## 📞 联系方式

  <p><strong>获取更多 AI 资讯、企业赋能和高校培训支持</strong></p>
  
    👤 <strong>作者：老金</strong> | 🔗 <a href="https://github.com/KimYx0207">GitHub</a> | 🌐 <a href="https://aiking.dev/">aiking.dev</a> | 𝕏 <a href="https://x.com/KimYx0207">老金带你玩AI</a> | 📱 微信公众号：<strong>老金带你玩AI</strong>
  <p>老金的开源知识库，实时更新群二维码：https://my.feishu.cn/wiki/OhQ8wqntFihcI1kWVDlcNdpznFf</p>


### ☕ 请我喝杯咖啡

  <p><strong>如果这个教程对你有帮助，欢迎打赏支持！</strong></p>
  <table align="center">
    <tr>
      <td align="center">
        <br/>
        <strong>微信支付</strong>
      </td>
      <td align="center">
        <br/>
        <strong>支付宝</strong>
      </td>
    </tr>
  </table>

---

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

- 发现错误或过时信息，请提交 Issue
- 有改进建议，欢迎提交 PR
- 想分享使用经验，欢迎在 Discussions 讨论

---

## 📄 许可证

本项目采用 [MIT License](https://github.com/KimYx0207/AI-Coding-Guide-Zh/blob/7a7c21b8e7dc976e8ade33b79ee000a172e63daf/LICENSE/README.md) 开源协议。你可以复制、修改、分发和商用，但必须在副本或重要片段中保留版权声明与许可声明。教程作者为老金，原始仓库为 [KimYx0207/AI-Coding-Guide-Zh](https://github.com/KimYx0207/AI-Coding-Guide-Zh)，署名与原始来源见 [NOTICE](https://github.com/KimYx0207/AI-Coding-Guide-Zh/blob/7a7c21b8e7dc976e8ade33b79ee000a172e63daf/NOTICE/README.md)。

---

## 🙏 致谢

感谢所有为 Claude Code 和 OpenClaw 生态做出贡献的开发者和社区成员！

---

## 📋 更新说明

完整更新记录统一维护在 [CHANGELOG.md](https://github.com/KimYx0207/AI-Coding-Guide-Zh/blob/7a7c21b8e7dc976e8ade33b79ee000a172e63daf/CHANGELOG.md)。README 保留当前定位、目录、版本基线和阅读入口，避免同一条版本说明在多处漂移。

---

## ⚠️ 免责声明

- Claude Code 教程已按 **v2.1.222** 重新校准版本口径；OpenClaw 教程以 **v2026.7.1-2** 为稳定复核基线，预发布线 v2026.7.2-beta.7 单独标注；Codex 教程按 **Codex App 26.727 与 Codex CLI 0.146.1** 修订，CLI 仅作为 CX-12 辅助路径；WorkBuddy 教程为全新主线（2026.08 基线），与 CodeBuddy 同账号同团队，菜单名/积分/价格以本机 App 关于页和官网当前显示为准
- **预发布与 `latest` 以各项目 [Releases](https://github.com/openclaw/openclaw/releases) 与本机版本为准**（持续更新中）
- 部分功能可能随版本更新而变化，请以官方文档为准
- 本教程是学习和实践参考，重要项目请先在测试仓库 / 测试环境验证，再进入生产流程

---

  <p>也欢迎把它转给正在学习 AI 编程和 Agent 工作流的朋友。</p>
