---
title: "Build with Agent Team"
sourceId: "10-context-memory/context-engineering-intro"
sourceTitle: "Context Engineering Intro"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "10-context-memory"
sourceUrl: "https://github.com/coleam00/context-engineering-intro"
entryUrl: "https://github.com/coleam00/context-engineering-intro/blob/a2d84b021cee1e2f4e77ba854bba0be8cb319035/README.md"
zh: "on"
---

# Build with Agent Team

A Claude Code skill for building projects using [Agent Teams](https://www.anthropic.com/news/claude-opus-4-6) — Anthropic's multi-agent collaboration feature where multiple Claude instances work in parallel, communicate with each other, and coordinate autonomously. Give it a plan document describing what you want to build, and it spawns a team of specialized agents in tmux split panes to build it together.

<div class="tb-zh"><p>一个用于借助 Agent Teams 构建项目的 Claude Code skill——Agent Teams 是 Anthropic 的多 agent 协作功能，多个 Claude 实例并行工作、互相通信并自主协调。给它一份描述你想构建什么的计划文档，它就会在 tmux 分屏面板中拉起一支专门的 agent 团队一起构建。</p></div>

Once set up, it's as simple as:

<div class="tb-zh"><p>搭好之后，用起来就这么简单：</p></div>

```bash
/build-with-agent-team [plan-path] [num-agents]
```

## Prerequisites

### 1. Install tmux

Agent teams use tmux for split-pane visualization so you can see all agents working simultaneously.

<div class="tb-zh"><p>Agent teams 使用 tmux 分屏可视化，你可以看到所有 agent 同时工作。</p></div>

**macOS:**

<div class="tb-zh"><p>macOS：</p></div>

```bash
brew install tmux
```

**Linux (Ubuntu/Debian):**

<div class="tb-zh"><p>Linux（Ubuntu/Debian）：</p></div>

```bash
sudo apt update && sudo apt install tmux
```

**Linux (Fedora/RHEL):**

<div class="tb-zh"><p>Linux（Fedora/RHEL）：</p></div>

```bash
sudo dnf install tmux
```

**Windows (WSL required):**

<div class="tb-zh"><p>Windows（需要 WSL）：</p></div>

Agent teams require WSL (Windows Subsystem for Linux). Native Windows is not supported.

<div class="tb-zh"><p>Agent teams 需要 WSL（Windows Subsystem for Linux）。不支持原生 Windows。</p></div>

```powershell
# 1. Install WSL from PowerShell (Admin)
wsl --install

# 2. Restart your computer

# 3. Open WSL and install tmux
sudo apt update && sudo apt install tmux
```

Verify installation:

<div class="tb-zh"><p>验证安装：</p></div>

```bash
tmux -V
```

### 2. Enable Agent Teams

Agent teams are experimental and disabled by default. Enable by adding to `~/.claude/settings.json`:

<div class="tb-zh"><p>Agent teams 是实验性功能，默认关闭。把它加到 ~/.claude/settings.json 中来启用：</p></div>

```json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
```

Or export in your shell profile (`~/.bashrc` or `~/.zshrc`):

<div class="tb-zh"><p>或者在你的 shell 配置（~/.bashrc 或 ~/.zshrc）中导出：</p></div>

```bash
export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1
```

> **tmux note:** Starting a tmux session opens a new shell that does not inherit environment variables from your current terminal. If you enable agent teams via `export`, you must run that export **inside the tmux session**, or add it to your shell profile (`~/.bashrc` / `~/.zshrc`) so it loads automatically. Enter tmux first, then set the variable and launch Claude from there. The `settings.json` approach avoids this issue entirely.

<div class="tb-zh"><p>tmux 注意事项： 启动 tmux 会话会打开一个新的 shell，它不会继承你当前终端的环境变量。如果你通过 export 启用 agent teams，必须在 tmux 会话内部执行那条 export，或者把它加到 shell 配置（~/.bashrc / ~/.zshrc）里让它们自动加载。先进入 tmux，再设置变量并从中启动 Claude。用 settings.json 的方式可以完全避开这个问题。</p></div>

## Installation

Copy the skill to your personal skills directory:

<div class="tb-zh"><p>把这个 skill 复制到你的个人 skills 目录：</p></div>

```bash
cp -r build-with-agent-team ~/.claude/skills/
```

Or for project-level use:

<div class="tb-zh"><p>或者在项目级使用：</p></div>

```bash
cp -r build-with-agent-team .claude/skills/
```

## Create Your Plan

Write a markdown document describing what you want to build. This works for:

<div class="tb-zh"><p>写一份 markdown 文档，描述你想构建什么。它适用于：</p></div>

- **Greenfield projects**: A new app, API, or system from scratch
- **Brownfield features**: A new feature in an existing codebase

<div class="tb-zh"><p>全新项目：从零开始的新应用、API 或系统；既有代码库中的新功能：在现有代码库中添加一项新功能。</p></div>

Your plan should be detailed enough that multiple agents could divide the work. Include:

<div class="tb-zh"><p>你的计划应当详细到多个 agent 可以据此分工。请包含：</p></div>

- What you're building and why
- Tech stack and architecture
- Project structure
- Key components and how they interact
- Data models or API contracts
- Acceptance criteria

<div class="tb-zh"><p>你要构建什么以及为什么；技术栈与架构；项目结构；关键组件及其交互方式；数据模型或 API 契约；验收标准。</p></div>

See `example-plan/session-manager-plan.md` for an example.

<div class="tb-zh"><p>示例见 example-plan/session-manager-plan.md。</p></div>

## Usage

```bash
/build-with-agent-team [plan-path] [num-agents]
```

**Parameters:**

<div class="tb-zh"><p>参数：</p></div>

| Parameter | Required | Description |
|-----------|----------|-------------|
| `plan-path` | Yes | Path to your plan markdown file |
| `num-agents` | No | Number of agents to spawn. If omitted, determined automatically based on the plan's complexity |

**Examples:**

<div class="tb-zh"><p>示例：</p></div>

```bash
# Let the skill determine team size
/build-with-agent-team ./plans/my-project.md

# Specify 3 agents
/build-with-agent-team ./plans/my-project.md 3

# Build a feature in existing codebase
/build-with-agent-team ./docs/new-auth-feature.md 2
```

The skill will:
1. Read your plan
2. Analyze it to determine agent roles (frontend, backend, database, etc.)
3. Spawn agents in tmux split panes
4. Coordinate collaboration between agents
5. Ensure agents communicate and challenge each other's work

<div class="tb-zh"><p>这个 skill 会：1）读取你的计划；2）分析计划以确定 agent 角色（前端、后端、数据库等）；3）在 tmux 分屏面板中拉起 agent；4）协调 agent 之间的协作；5）确保 agent 互相沟通并相互检验对方的工作。</p></div>

## Agent Teams vs Subagents

Claude Code has two ways to parallelize work. Choose based on whether your workers need to communicate:

<div class="tb-zh"><p>Claude Code 有两种并行工作的方式。根据你的工作单元是否需要通信来选择：</p></div>

| | Subagents | Agent Teams |
|---|-----------|-------------|
| **Context** | Runs within main session | Each agent has its own session |
| **Communication** | Reports back to main agent only | Agents message each other directly |
| **Coordination** | Main agent manages all work | Shared task list, self-coordination |
| **Visibility** | Results summarized to main context | Each agent visible in tmux pane |
| **Best for** | Quick, focused tasks (research, exploration) | Complex builds requiring collaboration |
| **Token cost** | Lower (results summarized) | Higher (each agent is a separate instance) |

**Use subagents when:**
- Task is quick and isolated
- You only need the result, not the process
- Cost-sensitive

<div class="tb-zh"><p>以下情况使用 subagent： 任务快速且独立；你只需要结果，而不关心过程；对成本敏感。</p></div>

**Use agent teams when:**
- Multiple components need to integrate (frontend + backend + database)
- Agents need to agree on interfaces and contracts
- You want to see parallel progress in real-time
- Building something complex enough to warrant coordination overhead

<div class="tb-zh"><p>以下情况使用 agent teams： 多个组件需要集成（前端 + 后端 + 数据库）；agent 之间需要就接口与契约达成一致；你希望实时看到并行进展；要构建的东西复杂到值得付出协调开销。</p></div>
