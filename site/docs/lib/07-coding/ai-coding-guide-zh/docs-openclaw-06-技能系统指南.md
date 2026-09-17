---
title: "06. 技能系统 (Skills) 完全指南"
sourceId: "07-coding/ai-coding-guide-zh"
sourceTitle: "Claude Code & OpenClaw & Codex & WorkBuddy 中文教程"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中文"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/KimYx0207/AI-Coding-Guide-Zh"
entryUrl: "https://github.com/KimYx0207/AI-Coding-Guide-Zh/blob/7a7c21b8e7dc976e8ade33b79ee000a172e63daf/docs/openclaw/06-技能系统指南.md"
sourceRel: "docs/openclaw/06-技能系统指南.md"
rawUrl: "/raw/07-coding/ai-coding-guide-zh/docs/openclaw/06-技能系统指南.md"
sourceSha256: "e40c968a211bd5824a6a617c21bde830fa2a5a57810d9372f27f64cf7a26a7c0"
pageSha256: "e40c968a211bd5824a6a617c21bde830fa2a5a57810d9372f27f64cf7a26a7c0"
contentMode: "local-full"
zh: ""
---

# 06. 技能系统 (Skills) 完全指南

> **课程信息**
>
> - **作者**：老金
> - **GitHub**：https://github.com/KimYx0207
> - **公众号**：老金带你玩AI
> - **X（Twitter）**：老金带你玩AI
> - **个人博客**：https://aiking.dev
> - **难度等级**：🟡 进阶
> - **阅读时间**：30 分钟
> - **前置知识**：已完成快速开始（[03-快速开始指南](/lib/07-coding/ai-coding-guide-zh/docs-openclaw-03-快速开始指南)）
>
> **本篇你将学会：** 理解技能和工具的区别、管理内置技能、通过 `openclaw skills` 安装技能、创建自定义技能
>
> **小白速通：** 只看前 3 节（"什么是技能"、"Skills vs Tools"、"内置技能一览"），了解概念就够了。等你想教 AI 新能力时再看后面的章节

## 先做一个小练习：看见技能如何改变助手行为

老金我讲技能系统时会把触发条件、输出和复盘放在一起，因为技能不是写出来就算完成。

> **2026-06-18 技能口径**：v2026.6.5 以后 ClawHub 技能安装加强了 resolved API、pinned GitHub commit 和 policy checks；v2026.6.8 继续补强 managed plugin installs 与依赖安全。课堂练习仍选低风险文本技能，安装外部技能前先看来源、固定版本、权限范围和是否需要账号授权。

技能不是术语表里的概念，它的作用是把一组稳定做法交给 AI。先用一个最小练习建立手感。

### 第一步：确认技能命令可用

```bash
openclaw skills search "summarize"
```

如果搜索结果里能看到摘要、笔记、文档处理相关技能，说明 skills 入口正常。不同版本和市场索引返回结果可能不同，重点是确认命令能跑通。

### 第二步：安装一个低风险技能

优先选择只处理文本、不需要外部账号授权的技能。例如搜索结果里有 `summarize` 时：

```bash
openclaw skills install summarize
```

如果你的版本里没有这个技能，就先跳过安装，继续看下面的“技能长什么样”。不要为了练习随便安装需要邮箱、网盘、密码管理器授权的技能。

### 第三步：在对话里触发它

回到 Control UI，输入一段长文本，然后要求：

```text
请把上面这段内容整理成 3 条要点，并保留行动项。
```

如果已安装摘要类技能，OpenClaw 会更倾向于按技能里的流程整理内容。即使你的环境没有对应技能，这个练习也能帮你理解：技能的价值不是"多一个按钮"，而是把可复用的处理流程写下来。

### 你应该记住

- 工具负责单个动作。
- 技能负责告诉 AI 如何组合动作。
- 新手先练低风险文本技能，不要一上来接邮箱、云盘、密码管理器。

## 什么是技能？

如果说工具 (Tools) 是 AI 的双手，那技能 (Skills) 就是教 AI 如何组合使用这些工具的教科书。

一个工具只能做一件事：读文件、发消息、搜索网页。但一个技能可以把多个工具串起来，完成一个完整的任务流程。比如"管理 GitHub Issue"这个技能，背后可能要调用搜索、读取、创建、评论等十几个工具。

OpenClaw 提供了大量内置与可安装技能，覆盖办公、开发、生活方方面面。你也可以自己创建技能，教 AI 新的能力。

## Skills vs Tools：概念深入对比

很多人刚接触 OpenClaw 时会搞混技能和工具，这里彻底说清楚。

### 本质区别

```
工具 (Tools) = 原子操作，做一件具体的事
技能 (Skills) = 编排方案，教 AI 如何组合工具完成复杂任务
```

打个比方：

- **工具**就像厨房里的刀、锅、铲子 — 每个都有明确的单一用途
- **技能**就像菜谱 — 告诉你先切菜、再热油、然后翻炒、最后调味

### 对比表

| 维度 | 工具 (Tools) | 技能 (Skills) |
|------|-------------|---------------|
| 粒度 | 单个动作 | 多步骤流程 |
| 定义方式 | TypeScript/Python 函数 | Markdown 指令文档 |
| 执行方式 | 直接调用 | AI 根据指令编排工具 |
| 状态 | 无状态 | 可以维护上下文 |
| 触发方式 | 模型自动选择 | 关键词触发或模型判断 |
| 复用性 | 跨技能共享 | 通常独立使用 |
| 开发难度 | 需要编程 | 写 Markdown 就行 |

### 一个具体的例子

假设你说："帮我把今天的会议纪要发到 Slack 的 #team 频道"。

AI 需要做这些事：

1. 搜索今天的日历事件（工具：`google_calendar_search`）
2. 找到会议纪要文件（工具：`file_search`）
3. 读取文件内容（工具：`file_read`）
4. 格式化为 Slack 消息（AI 自己处理）
5. 发送到指定频道（工具：`slack_send_message`）

这 5 步里，每一步都是一个工具调用。但 AI 怎么知道要按这个顺序来？答案就是技能。`gog` 技能和 `slack` 技能里的指令告诉了 AI 如何组合这些工具。

### 技能的加载机制

技能不是一直驻留在内存里的。OpenClaw 的加载策略很聪明：

```
用户消息进来
    ↓
Gateway 分析消息内容
    ↓
匹配相关技能（通过 triggers 关键词或语义匹配）
    ↓
将匹配到的技能指令注入到系统提示词中
    ↓
AI 根据技能指令 + 工具列表来执行任务
```

这意味着：
- 不是所有技能都会同时加载（那会撑爆上下文窗口）
- 只有跟当前任务相关的技能才会被激活
- 你可以通过 `triggers` 字段精确控制技能的触发条件

## 常用 Skills 命令

```bash
# 搜索技能
openclaw skills search "gog"

# 安装技能
openclaw skills install gog

# 更新技能
openclaw skills update
```

## 内置技能完整分类

### 办公效率类

| 技能 | 功能 | 使用场景 | 依赖工具 |
|------|------|----------|----------|
| `gog` | Google Workspace | 邮件、日历、文档管理 | Google API MCP |
| `notion` | Notion | 页面创建、数据库查询 | Notion API |
| `trello` | Trello | 看板管理、任务跟踪 | Trello API |
| `slack` | Slack | 工作区消息管理 | Slack API |
| `1password` | 1Password | 密码查询（只读） | 1Password CLI |

### 开发工具类

| 技能 | 功能 | 使用场景 | 依赖工具 |
|------|------|----------|----------|
| `coding-agent` | 编程助手 | 写代码、调试、重构 | 文件系统 + Shell |
| `github` | GitHub | 仓库管理、PR、Issue | GitHub CLI (gh) |
| `gh-issues` | GitHub Issues | Issue 专项管理 | GitHub CLI (gh) |
| `tmux` | 终端会话 | 管理终端会话 | tmux |

### 笔记知识类

| 技能 | 功能 | 使用场景 | 依赖工具 |
|------|------|----------|----------|
| `obsidian` | Obsidian | 笔记管理、知识库 | 文件系统 |
| `apple-notes` | Apple 备忘录 | macOS/iOS 备忘录 | AppleScript |
| `bear-notes` | Bear | Bear 笔记管理 | Bear X-Callback |
| `nano-pdf` | PDF 处理 | PDF 阅读、摘要 | PDF 解析工具 |

### 多媒体类

| 技能 | 功能 | 使用场景 | 依赖工具 |
|------|------|----------|----------|
| `voice-call` | 语音通话 | AI 语音对话 | 音频 I/O |
| `spotify-player` | Spotify | 音乐播放控制 | Spotify API |
| `peekaboo` | 截图 | 屏幕截图分析 | screencapture |
| `camsnap` | 摄像头 | 拍照识别 | imagesnap |
| `video-frames` | 视频帧 | 视频内容分析 | ffmpeg |
| `songsee` | 听歌识曲 | 识别正在播放的音乐 | 音频采集 |

### 多媒体生成类（v2026.4.5 新增）

v2026.4.5 起，OpenClaw 内置了三个生成式多媒体工具，不再需要额外安装：

| 工具 | 功能 | 支持的提供商 | 运行模式 |
|------|------|-------------|---------|
| `video_generate` | 文本/图片/视频 → 视频 | xAI (Grok)、Alibaba Wan、Runway、Google Veo、OpenAI Sora、BytePlus Seedance、Qwen | generate / imageToVideo / videoToVideo |
| `music_generate` | 文本 → 音乐/音频 | Google Lyria 3、MiniMax、ComfyUI 工作流 | generate（异步任务） |
| `image_generate` | 文本 → 图片 | 多提供商 + ComfyUI 工作流 | generate |

这些工具全部异步执行：Agent 提交请求后立即返回任务 ID，生成完成后自动将结果推送到原始会话。

**快速配置示例：**

```json5
{
  "agents": {
    "defaults": {
      "videoGenerationModel": {
        "primary": "google/veo-3.1-fast-generate-preview",
        "fallbacks": ["runway/gen4.5"],
      },
      "musicGenerationModel": {
        "primary": "google/lyria-3-clip-preview",
        "fallbacks": ["minimax/music-2.6"],
      },
    },
  },
}
```

**ComfyUI 工作流支持：** 如果你有本地 ComfyUI 或 Comfy Cloud 实例，可以通过 `comfy` 插件将自定义工作流接入 `image_generate`、`video_generate` 和 `music_generate`。设置 `COMFY_API_KEY` 或 `COMFY_CLOUD_API_KEY` 环境变量即可。

### 生活工具类

| 技能 | 功能 | 使用场景 | 依赖工具 |
|------|------|----------|----------|
| `weather` | 天气 | 天气查询和预报 | 天气 API |
| `things-mac` | Things | 任务管理 (macOS) | Things URL Scheme |
| `apple-reminders` | 提醒事项 | Apple 提醒事项 | AppleScript |
| `goplaces` | 地点 | 地点搜索和导航 | 地图 API |
| `healthcheck` | 健康检查 | 系统状态监控 | 系统命令 |

### 系统管理类

| 技能 | 功能 | 使用场景 | 依赖工具 |
|------|------|----------|----------|
| `session-logs` | 会话日志 | 查看对话历史 | 文件系统 |
| `model-usage` | 模型统计 | API 使用量统计 | 内部 API |
| `summarize` | 摘要 | 长文本摘要 | AI 模型 |
| `skill-creator` | 技能创建器 | 创建自定义技能 | 文件系统 |

## 主要技能详细使用教程

### gog — Google Workspace 技能

`gog` 是 OpenClaw 最常用的技能之一，让 AI 帮你管理 Gmail、Google Calendar 和 Google Drive。

#### 前置条件

1. 在 Google Cloud Console 创建 OAuth 2.0 凭证
2. 启用 Gmail API、Calendar API、Drive API
3. 在 OpenClaw 中完成 Google 认证

```bash
# 认证 Google 账号（通过 models auth 子命令）
openclaw models auth login --provider google

# 浏览器会弹出 Google 登录页面
# 授权后，凭证自动保存到 auth-profiles.json
```

#### 邮件管理

你可以这样跟 AI 说：

```
查看我今天收到的邮件
```

AI 会调用 `gog` 技能，执行以下流程：
1. 调用 `gmail_search` 工具搜索今天的邮件
2. 调用 `gmail_read` 工具读取邮件内容
3. 整理成摘要返回给你

更多邮件操作示例：

```
帮我回复张三的邮件，告诉他周五可以开会
把所有来自 newsletter@example.com 的邮件标记为已读
搜索上周关于"项目报告"的邮件
帮我写一封邮件给客户，确认下周的交付时间
```

#### 日历管理

```
今天有什么安排？
帮我在下周三下午 2 点创建一个会议，邀请 alice@example.com
取消明天上午的会议
把周五的会议改到下周一
```

AI 会自动处理时区、冲突检测、邀请发送等细节。

#### Google Drive 操作

```
在 Google Drive 里搜索"季度报告"
帮我创建一个新的 Google Doc，标题是"会议纪要 2026-02-25"
把这个文件分享给 team@example.com
```

#### gog 技能的配置选项

在 `~/.openclaw/openclaw.json`（JSON5 格式）中可以微调 `gog` 技能的行为：

```json5
{
  "skills": {
    "entries": {
      "gog": {
        "config": {
          "defaultCalendar": "primary",
          "emailSignature": "— 发自 OpenClaw AI 助手",
          "maxSearchResults": 20,
          "timezone": "Asia/Shanghai",
          "language": "zh-CN",
        },
      },
    },
  },
}
```

### github — GitHub 技能

`github` 技能让 AI 成为你的 GitHub 助手，管理仓库、PR、Issue、Actions 等。

#### 前置条件

```bash
# 认证 GitHub（通过 models auth 子命令）
openclaw models auth login --provider github

# 或者手动设置 Token
openclaw config set github.token ghp_xxxxxxxxxxxx
```

#### 仓库管理

```
列出我的 GitHub 仓库
克隆 username/repo-name 到本地
查看 openclaw/openclaw 仓库的最新动态
```

#### Pull Request 操作

```
查看 openclaw/openclaw 仓库的待审 PR
帮我创建一个 PR，从 feature/new-skill 合并到 main
审查 PR #123 的代码变更
合并 PR #456
```

AI 处理 PR 的流程：
1. 调用 `gh_pr_list` 获取 PR 列表
2. 调用 `gh_pr_diff` 查看代码变更
3. 分析代码质量、潜在问题
4. 生成审查意见或执行合并

#### Issue 管理

```
查看 openclaw/openclaw 仓库的 open issues
创建一个新 Issue：标题是"技能系统文档需要更新"
给 Issue #789 添加评论
关闭 Issue #101，标记为已解决
给 Issue #202 打上 bug 标签
```

#### GitHub Actions

```
查看最近的 CI/CD 运行状态
重新运行失败的 workflow
查看 workflow run #12345 的日志
```

#### github 技能的配置选项

```json5
{
  "skills": {
    "entries": {
      "github": {
        "config": {
          "defaultOrg": "openclaw",
          "defaultRepo": "openclaw",
          "autoLabel": true,
          "prTemplate": "workspace/templates/pr-template.md",
        },
      },
    },
  },
}
```

### coding-agent — 编程助手技能

`coding-agent` 是开发者最爱的技能，让 AI 帮你写代码、调试、重构。

#### 工作原理

`coding-agent` 技能跟其他技能不太一样。它不是简单地调用几个工具，而是启动一个完整的编程工作流：

```
用户请求 → 分析需求 → 读取相关代码 → 制定方案 → 编写代码 → 验证结果
```

#### 常用场景

**写新代码：**

```
帮我写一个 TypeScript 函数，把 CSV 文件转换成 JSON
在 src/utils/ 下创建一个日期格式化工具
```

**调试：**

```
这段代码报错了，帮我看看：[粘贴错误信息]
为什么这个 API 返回 500？帮我排查
```

**重构：**

```
把 src/services/user.ts 重构一下，太长了
这个函数的圈复杂度太高，帮我拆分
```

**代码审查：**

```
审查一下 src/api/routes.ts 的代码质量
检查这个文件有没有安全漏洞
```

#### coding-agent 的特殊能力

1. **文件系统访问** — 可以读写项目文件
2. **Shell 命令执行** — 可以运行构建、测试命令
3. **上下文感知** — 会自动读取相关文件来理解代码结构
4. **多文件编辑** — 可以同时修改多个文件

#### 安全限制

`coding-agent` 默认运行在沙箱中：

- 文件操作限制在工作空间目录内
- Shell 命令需要用户确认（除非配置了自动批准）
- 不能访问系统敏感目录

```json5
{
  "skills": {
    "entries": {
      "coding-agent": {
        "config": {
          "workDir": "~/projects/my-app",
          "allowedCommands": ["npm", "node", "git", "tsc"],
          "autoApprove": false,
          "maxFileSize": "1MB",
        },
      },
    },
  },
}
```

### browser-automation — 浏览器自动化技能（v2026.4.24 更新）

`browser-automation` 是 OpenClaw 内置的浏览器自动化技能，让 AI 操控一个隔离的 Chrome/Brave/Edge 浏览器实例。v2026.4.24 对此技能做了重要增强。

#### 核心能力

- **坐标点击（v2026.4.24 新增）** — 支持 `click-coords` 直接按视口坐标点击，不需要快照中的元素引用
- **60 秒操作预算** — 默认 `actionTimeoutMs` 从旧值提升到 60000ms（60 秒），给复杂页面交互更多时间
- **按配置覆盖 headless 模式** — 每个浏览器 profile 可以独立设置 `headless` 选项
- **快照 → 操作 → 重快照 → 恢复** — 内置的多步骤循环，带过期引用自动恢复

#### 配置示例

```json5
{
  "browser": {
    "enabled": true,
    "defaultProfile": "openclaw",
    "actionTimeoutMs": 60000,
    "headless": false,
    "profiles": {
      "openclaw": { "cdpPort": 18800 },
      "work": {
        "cdpPort": 18801,
        "headless": true,
      },
    },
  },
}
```

#### 诊断命令

```bash
# 检查浏览器插件、进程、CDP 连接状态
openclaw browser --browser-profile openclaw doctor
```

### obsidian — Obsidian 笔记技能

`obsidian` 技能让 AI 帮你管理 Obsidian 知识库。

#### 前置条件

需要告诉 OpenClaw 你的 Obsidian Vault 路径：

```json5
{
  "skills": {
    "entries": {
      "obsidian": {
        "config": {
          "vaultPath": "~/Documents/MyVault",
          "dailyNotesFolder": "Daily",
          "templatesFolder": "Templates",
        },
      },
    },
  },
}
```

#### 笔记管理

```
在 Obsidian 里创建一篇笔记，标题是"TypeScript 泛型学习笔记"
搜索我的 Obsidian 笔记中关于"设计模式"的内容
帮我整理今天的日记
把这段内容添加到"项目计划"笔记里
```

#### 知识库操作

```
列出 Obsidian 里所有带 #todo 标签的笔记
查看"读书笔记"文件夹下的所有文件
帮我创建一个 MOC（Map of Content）页面，整理所有编程相关笔记
更新"学习路线图"笔记，添加新的学习目标
```

#### 双向链接

`obsidian` 技能理解 Obsidian 的双向链接语法：

```
创建一篇笔记"React Hooks"，并链接到已有的"React 基础"笔记
查找所有链接到"项目 A"的笔记
```

AI 会自动使用 `[[双向链接]]` 语法，保持你的知识图谱完整。

## 技能配置文件详解

每个技能的行为都可以通过配置文件来调整。

### 全局技能配置

在 `~/.openclaw/openclaw.json` 中的 `skills` 字段：

```json5
{
  "skills": {
    // 是否加载 OpenClaw 内置技能（默认 true）
    "allowBundled": true,
    // 从指定路径加载额外技能
    "load": ["~/.openclaw/workspace/skills/*"],
    // 各技能的独立配置
    "entries": {
      "gog": {
        "enabled": true,
        "config": {
          "timezone": "Asia/Shanghai"
        }
      },
      "github": {
        "enabled": true,
        "config": {
          "defaultOrg": "my-org"
        }
      },
      "voice-call": {
        "enabled": false
      }
    }
  }
}
```

### 配置字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| `allowBundled` | `boolean` | 是否加载内置技能（默认 true） |
| `load` | `string[]` | 额外技能的加载路径 |
| `install` | `object` | 从 ClawHub 安装技能的配置 |
| `limits` | `object` | 技能执行的限制配置 |
| `entries` | `object` | 各技能的独立配置（`enabled`、`apiKey`、`env`、`config`） |

要禁用某个技能，在 `entries` 中将其 `enabled` 设为 `false`。技能的自定义参数放在 `config` 子对象中。

### Agent 级别的技能配置

每个 Agent 可以有自己的技能配置，覆盖全局设置：

```json5
{
  "agents": {
    "list": [
      {
        "id": "coding",
        "workspace": "~/.openclaw/workspace-coding",
        // Agent 级别的 skills 是一个简单的字符串数组
        "skills": ["coding-agent", "github", "gh-issues", "tmux"],
      },
      {
        "id": "office",
        "workspace": "~/.openclaw/workspace-office",
        "skills": ["gog", "slack", "notion", "trello", "summarize"],
      },
    ],
  },

  // 技能的详细配置放在顶层 skills.entries 中
  "skills": {
    "entries": {
      "coding-agent": {
        "config": {
          "workDir": "~/projects",
          "autoApprove": true,
        },
      },
      "gog": {
        "config": {
          "timezone": "Asia/Shanghai",
        },
      },
    },
  },
}
```

这样，编程 Agent 只加载开发相关技能，办公 Agent 只加载办公相关技能，互不干扰。注意 Agent 级别的 `skills` 是一个简单的字符串数组，而技能的详细配置（如自定义参数）放在顶层 `skills.entries` 中。

### 技能的 SKILL.md（技能的定义文件，用 Markdown 格式编写）文件格式

每个技能目录下的核心文件是 `SKILL.md`（注意大写）。这是一个 Markdown 文件，AI 会读取它来理解如何执行任务。

`SKILL.md` 的结构：

```markdown
# 技能名称

技能的描述和用途说明。

## 触发条件

描述什么情况下应该激活这个技能。

## 执行步骤

1. 第一步操作
2. 第二步操作
3. ...

## 依赖工具

列出技能需要调用的工具。

## 注意事项

执行时需要注意的约束和边界条件。
```

OpenClaw 还会自动注入以下 prompt 文件到技能上下文中：

| 文件 | 用途 |
|------|------|
| `AGENTS.md` | Agent 角色和行为定义 |
| `SOUL.md` | AI 人格和沟通风格 |
| `TOOLS.md` | 可用工具列表和使用说明 |

这些文件与 `SKILL.md` 配合，让 AI 在执行技能时拥有完整的上下文。

> ⏭️ **小白可跳过** — 这部分面向想创建自定义技能的开发者

## 自定义技能开发完整教程

这是 OpenClaw 最强大的功能之一。你可以教 AI 新的能力，而且不需要写复杂的代码 — 大部分情况下写 Markdown 就够了。

### 方法一：用 skill-creator 技能（最简单）

直接告诉 AI：

```
帮我创建一个技能，用来管理我的读书笔记。
每次我说"记录读书笔记"，就创建一个新的 Markdown 文件，
包含书名、作者、日期、关键摘录和我的感想。
```

AI 会自动使用 `skill-creator` 技能帮你生成完整的技能文件。

### 方法二：手动创建（完全控制）

下面我们从零开始创建一个完整的自定义技能：**读书笔记管理器**。

#### 第一步：创建技能目录

```bash
mkdir -p ~/.openclaw/workspace/skills/reading-notes
mkdir -p ~/.openclaw/workspace/skills/reading-notes/tools
mkdir -p ~/.openclaw/workspace/skills/reading-notes/examples
```

目录结构：

```
~/.openclaw/workspace/skills/reading-notes/
├── SKILL.md          # 技能描述和指令（核心文件）
├── tools/            # 自定义工具（可选）
│   └── reading-stats.ts
└── examples/         # 使用示例（可选）
    └── example.md
```

#### 第二步：编写 SKILL.md（核心文件）

这是技能的灵魂。AI 会读取这个文件来理解如何执行任务。

````markdown
# 读书笔记管理

你是一个读书笔记助手。当用户要求记录读书笔记时，按以下流程操作。

## 触发条件

当用户提到以下关键词时激活：记录读书笔记、读书笔记、我读了一本书、阅读记录、读书

## 依赖工具

- file_read
- file_write
- file_search

## 创建新笔记

1. 询问用户以下信息（如果用户没有主动提供）：
   - 书名
   - 作者
   - 评分（1-5 星）
2. 在 `workspace/reading-notes/` 目录下创建 Markdown 文件
3. 文件名格式：`YYYY-MM-DD-书名.md`
4. 使用以下模板：

### 笔记模板

```
# 《{书名}》读书笔记

- **作者**：{作者}
- **阅读日期**：{日期}
- **评分**：{星级}

## 关键摘录

> （用户提供的摘录内容）

## 个人感想

（用户的感想）

## 行动项

- [ ] （从书中获得的待办事项）
```

5. 更新 `workspace/reading-notes/INDEX.md` 索引文件
6. 索引文件按评分降序排列

## 查看阅读统计

当用户问"我读了多少书"或"阅读统计"时：

1. 扫描 `workspace/reading-notes/` 目录
2. 统计总数、平均评分、按月分布
3. 返回格式化的统计信息

## 搜索笔记

当用户搜索读书笔记时：

1. 在 `workspace/reading-notes/` 目录中搜索
2. 支持按书名、作者、关键词搜索
3. 返回匹配的笔记列表和摘要
````

#### 第三步：添加自定义工具（可选）

如果你的技能需要超出内置工具能力的功能，可以写自定义工具。

创建 `tools/reading-stats.ts`：

```typescript
import { Tool, ToolInput, ToolOutput } from "@openclaw/sdk";
import * as fs from "fs/promises";
import * as path from "path";

interface StatsInput extends ToolInput {
  notesDir: string;
}

interface BookStats {
  totalBooks: number;
  averageRating: number;
  booksByMonth: Record<string, number>;
  topRated: Array<{ title: string; rating: number }>;
}

export const readingStats: Tool<StatsInput, BookStats> = {
  name: "reading_stats",
  description: "统计读书笔记数据",

  parameters: {
    type: "object",
    properties: {
      notesDir: {
        type: "string",
        description: "读书笔记目录路径",
      },
    },
    required: ["notesDir"],
  },

  async execute(input: StatsInput): Promise<ToolOutput<BookStats>> {
    const { notesDir } = input;

    const files = await fs.readdir(notesDir);
    const mdFiles = files.filter(
      (f) => f.endsWith(".md") && f !== "INDEX.md"
    );

    let totalRating = 0;
    const booksByMonth: Record<string, number> = {};
    const topRated: Array<{ title: string; rating: number }> = [];

    for (const file of mdFiles) {
      const content = await fs.readFile(
        path.join(notesDir, file),
        "utf-8"
      );

      const ratingMatch = content.match(/\*\*评分\*\*：(\d)/);
      const rating = ratingMatch ? parseInt(ratingMatch[1]) : 0;
      totalRating += rating;

      const dateMatch = file.match(/^(\d{4}-\d{2})/);
      if (dateMatch) {
        const month = dateMatch[1];
        booksByMonth[month] = (booksByMonth[month] || 0) + 1;
      }

      const titleMatch = content.match(/# 《(.+?)》/);
      if (titleMatch) {
        topRated.push({ title: titleMatch[1], rating });
      }
    }

    topRated.sort((a, b) => b.rating - a.rating);

    return {
      success: true,
      data: {
        totalBooks: mdFiles.length,
        averageRating:
          mdFiles.length > 0 ? totalRating / mdFiles.length : 0,
        booksByMonth,
        topRated: topRated.slice(0, 10),
      },
    };
  },
};
```

#### 第四步：添加使用示例（可选但推荐）

创建 `examples/example.md`：

````markdown
# 读书笔记技能使用示例

## 示例 1：记录新书

用户：我刚读完《深入理解计算机系统》，作者是 Randal Bryant，给 5 星。
关键摘录："程序员需要理解计算机系统的全貌，才能写出高效的代码。"
感想：这本书让我对底层原理有了全新的认识。

AI 操作：
1. 创建 workspace/reading-notes/2026-02-25-深入理解计算机系统.md
2. 填入模板内容
3. 更新 INDEX.md

## 示例 2：查看统计

用户：我今年读了多少书？

AI 操作：
1. 扫描 reading-notes 目录
2. 筛选今年的文件
3. 返回统计数据
````

#### 第五步：测试技能

```bash
# 检查技能是否被正确识别
openclaw skills list

# 查看技能详情
openclaw skills info reading-notes

# 检查技能就绪状态
openclaw skills check reading-notes
```

然后在对话中测试：

```
记录读书笔记：《代码整洁之道》，作者 Robert C. Martin，5 星
```

### 方法三：基于现有技能扩展

你可以复制一个现有技能，然后修改它：

```bash
# 复制 obsidian 技能作为模板
cp -r ~/.openclaw/workspace/skills/obsidian ~/.openclaw/workspace/skills/my-notes

# 编辑 SKILL.md，修改为你的需求
```

工作空间技能会覆盖同名的共享技能，所以你可以用这种方式"魔改"内置技能。

### 技能的类型与作用域

OpenClaw 的技能分为三种类型：

| 类型 | 说明 | 来源 |
|------|------|------|
| bundled（内置） | 随 OpenClaw 安装的技能，不可修改 | 安装目录 |
| managed（托管） | 从 ClawHub（OpenClaw 的官方技能市场，类似于手机的应用商店）安装的社区技能，可更新 | ClawHub |
| workspace（工作区） | 用户自己创建的技能 | `~/.openclaw/workspace/skills/` |
