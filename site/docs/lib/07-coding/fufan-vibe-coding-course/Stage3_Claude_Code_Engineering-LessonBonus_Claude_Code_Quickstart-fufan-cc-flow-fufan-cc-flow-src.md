---
title: "Fufan-CC Flow"
sourceId: "07-coding/fufan-vibe-coding-course"
sourceTitle: "Vibe Coding：AI 编程实战课"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse"
entryUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage3_Claude_Code_Engineering/LessonBonus_Claude_Code_Quickstart/fufan-cc-flow/fufan-cc-flow-src/README.md"
sourceRel: "Stage3_Claude_Code_Engineering/LessonBonus_Claude_Code_Quickstart/fufan-cc-flow/fufan-cc-flow-src/README.md"
rawUrl: "/raw/07-coding/fufan-vibe-coding-course/Stage3_Claude_Code_Engineering/LessonBonus_Claude_Code_Quickstart/fufan-cc-flow/fufan-cc-flow-src/README.md"
sourceSha256: "e635335aeff9caec324924a1f40463bfc50cbd435b4f093c448815e1ce94f03c"
pageSha256: "e635335aeff9caec324924a1f40463bfc50cbd435b4f093c448815e1ce94f03c"
contentMode: "local-full"
zh: ""
---

# Fufan-CC Flow

> 基于 Web 的 Claude Code 图形化前端，让 AI 编程工作流可视化。

Fufan-CC Flow 将 Claude Code CLI 的全部能力封装为友好的 Web 界面，支持实时对话流、工具调用可视化、权限确认（HIL）、会话管理、MCP 扩展、终端集成等功能，适合个人开发者、团队协作以及 AI 编程教学场景。

---

## 功能亮点

| 功能 | 说明 |
|------|------|
| **实时对话流** | Token 级流式输出，带 Thinking 折叠展示 |
| **工具调用可视化** | 每次 Tool Call 以卡片形式展示名称、输入、结果 |
| **HIL 权限确认** | 危险操作弹出确认框，支持一次性批准/永久批准/拒绝 |
| **会话管理** | 历史会话列表、分支（Fork）、会话恢复 |
| **上下文压缩感知** | 实时显示 Token 用量，压缩事件可视化 |
| **模型切换** | 支持 Claude Opus / Sonnet / Haiku 及国产基座模型 |
| **文件树 + 代码查看** | CodeMirror 6 语法高亮，Diff 视图 |
| **集成终端** | xterm.js + node-pty，完整 Shell 体验 |
| **MCP 管理** | 图形化添加/删除 MCP Server（stdio / HTTP / SSE） |
| **Memory 管理** | Auto Memory 和 CLAUDE.md 双体系统一管理 |
| **Sub-Agent 树** | 可视化多 Agent 执行链路 |
| **Settings 向导** | 两步配置（环境检测 → API Key 设置），支持官方 + 国产基座 |

---

## 技术栈

- **前端**：React 19 · Vite · TypeScript · Tailwind CSS v4 · Zustand
- **后端**：Node.js · Express · WebSocket (ws) · TypeScript
- **AI 集成**：`@anthropic-ai/claude-agent-sdk`
- **终端**：node-pty · xterm.js
- **代码查看**：CodeMirror 6
- **包管理**：pnpm workspace（Monorepo）

---

## 环境要求

| 依赖 | 最低版本 | 说明 |
|------|----------|------|
| Node.js | 18.x LTS | 推荐 20.x 或 22.x |
| pnpm | 8.x | 包管理器 |
| Claude Code CLI | 最新版 | `npm install -g @anthropic-ai/claude-code` |
| Python | 3.x | node-pty 编译需要 |
| C++ 构建工具 | — | node-pty 编译需要（见平台说明） |

---

## 安装指南

### macOS

#### 1. 安装 Node.js

推荐通过 [nvm](https://github.com/nvm-sh/nvm) 管理 Node.js 版本：

```bash
# 安装 nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash
source ~/.bashrc   # 或 ~/.zshrc

# 安装并激活 Node.js 22 LTS
nvm install 22
nvm use 22
node -v   # 应输出 v22.x.x
```

也可直接从 [nodejs.org](https://nodejs.org) 下载 pkg 安装包。

#### 2. 安装 pnpm

```bash
npm install -g pnpm
pnpm -v
```

#### 3. 安装 C++ 构建工具（node-pty 依赖）

```bash
xcode-select --install
```

弹出安装向导后按提示完成即可（仅需命令行工具，无需安装完整 Xcode）。

#### 4. 安装 Claude Code CLI

```bash
npm install -g @anthropic-ai/claude-code
claude --version   # 确认安装成功
```

#### 5. 克隆并安装项目

```bash
