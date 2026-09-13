---
title: "Agent Teams Implementation"
sourceId: "09-harness/claude-code-best-practice"
sourceTitle: "Claude Code Best Practice"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "09-harness"
sourceUrl: "https://github.com/shanraisshan/claude-code-best-practice"
entryUrl: "https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/README.md"
zh: "on"
---

# Agent Teams Implementation

<table width="100%">
<tr>
<td><a href="/lib/09-harness/claude-code-best-practice/overview">← Back to Claude Code Best Practice</a></td>
<td align="right"><img src="https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/claude-jumping.svg" alt="Claude" width="60" /></td>
</tr>
</table>

---

<a href="#time-orchestration"><img src="https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/implemented-hd.svg" alt="Implemented"></a>

  <img src="https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/implementation/assets/impl-agent-teams.png" alt="Agent Teams in action — split pane mode with tmux" width="100%">

Agent Teams spawn **multiple independent Claude Code sessions** that coordinate via a shared task list. Unlike subagents (isolated context forks within one session), each teammate gets its own full context window with CLAUDE.md, MCP servers, and skills loaded automatically.

<div class="tb-zh"><p>Agent Teams 会开出多个彼此独立的 Claude Code 会话，它们通过一份共享任务清单来协同。这与子代理不同——子代理只是单个会话内被隔离的上下文分叉；而在 Agent Teams 里，每位队友都拥有自己完整的上下文窗口，并自动加载好 CLAUDE.md、MCP 服务器与 skills。</p></div>

---

## ![How to Use](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/how-to-use.svg)

The time orchestration workflow was built entirely by an agent team. To run the finished product:

<div class="tb-zh"><p>这条时间编排工作流完全由一个 agent 团队搭出来。要运行成品：</p></div>

```bash
cd agent-teams
claude
/time-orchestrator
```

This invokes the **Command → Agent → Skill** pipeline: the agent fetches Dubai's current time, and the skill renders an SVG time card to `agent-teams/output/dubai-time.svg`.

<div class="tb-zh"><p>这会触发 Command → Agent → Skill 流水线：agent 取回迪拜的当前时间，skill 把 SVG 时间卡渲染到 agent-teams/output/dubai-time.svg。</p></div>

---

## ![How to Implement](https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/how-to-implement.svg)

You can create a replica of the weather orchestration workflow using agent teams — in this example, the time orchestration workflow was built entirely by an agent team.

<div class="tb-zh"><p>你可以用 agent 团队复刻一遍 weather 编排工作流——本示例里的时间编排工作流，就完全是由一个 agent 团队搭出来的。</p></div>

### 1. Install [iTerm2](https://iterm2.com/) and tmux

```bash
brew install --cask iterm2
brew install tmux
```

### 2. Start iTerm2 → tmux → Claude

```bash
tmux new -s dev
CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1 claude
```

### 3. Prompt with team structure

Paste this prompt into Claude to bootstrap a complete time orchestrator workflow using agent teams:

<div class="tb-zh"><p>把下面这段提示词粘进 Claude，就能用 agent 团队引导出一套完整的时间编排工作流：</p></div>

Main prompt: **[agent-teams-prompt.md](/lib/09-harness/claude-code-best-practice/agent-teams-agent-teams-prompt)**

<div class="tb-zh"><p>主提示词见：agent-teams-prompt.md。</p></div>

### Team Coordination Flow

```
┌──────────────────────────────────────────────────────────────┐
│                         LEAD (You)                           │
│       "Create an agent team to build time orchestration"     │
└──────────────────────────┬───────────────────────────────────┘
                           │ spawns team (all parallel)
              ┌────────────┼────────────┐
              ▼            ▼            ▼
   ┌────────────────┐ ┌──────────┐ ┌──────────────┐
   │ Command        │ │ Agent    │ │ Skill        │
   │ Architect      │ │ Engineer │ │ Designer     │
   │                │ │          │ │              │
   │ agent-teams/   │ │ agent-   │ │ agent-teams/ │
   │ .claude/       │ │ teams/   │ │ .claude/     │
   │ commands/      │ │ .claude/ │ │ skills/      │
   │ time-          │ │ agents/  │ │ time-svg-    │
   │ orchestrator.md│ │ time-    │ │ creator/     │
   │                │ │ agent.md │ │              │
   └───────┬────────┘ └────┬─────┘ └──────┬───────┘
           │               │              │
           ▼               ▼              ▼
   ┌──────────────────────────────────────────────────┐
   │            Shared Task List                      │
   │  ☐ Agree on data contract: {time, tz, formatted} │
   │  ☐ Command uses Agent tool (not bash)            │
   │  ☐ Agent preloads time-fetcher skill             │
   │  ☐ Skill reads time from context (no re-fetch)   │
   │  ☐ All files inside agent-teams/.claude/         │
   └──────────────────────────────────────────────────┘
                       │
                       ▼
          ┌──────────────────────────────┐
          │  cd agent-teams && claude    │
          │    /time-orchestrator        │
          │   Command → Agent → Skill    │
          └──────────────────────────────┘
```
