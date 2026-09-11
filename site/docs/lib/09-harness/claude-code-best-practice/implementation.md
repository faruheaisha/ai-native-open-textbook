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
zh: ""
---

# Agent Teams Implementation

<table width="100%">
<tr>
<td><a href="/lib/09-harness/claude-code-best-practice/overview">← Back to Claude Code Best Practice</a></td>
<td align="right"><img src="https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/claude-jumping.svg" alt="Claude" width="60" /></td>
</tr>
</table>

---

<a href="#time-orchestration"><img src="https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/implemented-hd.svg" alt="Implemented"></a>

Agent Teams spawn **multiple independent Claude Code sessions** that coordinate via a shared task list. Unlike subagents (isolated context forks within one session), each teammate gets its own full context window with CLAUDE.md, MCP servers, and skills loaded automatically.

---

## ![How to Use](https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/how-to-use.svg)

The time orchestration workflow was built entirely by an agent team. To run the finished product:

```bash
cd agent-teams
claude
/time-orchestrator
```

This invokes the **Command → Agent → Skill** pipeline: the agent fetches Dubai's current time, and the skill renders an SVG time card to `agent-teams/output/dubai-time.svg`.

---

## ![How to Implement](https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/!/tags/how-to-implement.svg)

You can create a replica of the weather orchestration workflow using agent teams — in this example, the time orchestration workflow was built entirely by an agent team.

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

Main prompt: **[agent-teams-prompt.md](/lib/09-harness/claude-code-best-practice/agent-teams)**

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
