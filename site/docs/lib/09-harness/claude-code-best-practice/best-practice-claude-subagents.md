---
title: "Sub-agents Best Practice"
sourceId: "09-harness/claude-code-best-practice"
sourceTitle: "Claude Code Best Practice"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "09-harness"
sourceUrl: "https://github.com/shanraisshan/claude-code-best-practice"
entryUrl: "https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/best-practice/claude-subagents.md"
sourceRel: "best-practice/claude-subagents.md"
rawUrl: "/raw/09-harness/claude-code-best-practice/best-practice/claude-subagents.md"
sourceSha256: "164991463f57d08c2850c24d69423faab362e589f3ef74d7335b056732b3a1e6"
pageSha256: "164991463f57d08c2850c24d69423faab362e589f3ef74d7335b056732b3a1e6"
contentMode: "local-full"
zh: ""
---

# Sub-agents Best Practice

 <br>

Claude Code subagents — frontmatter fields and official built-in agent types.

<table width="100%">
<tr>
<td><a href="/lib/09-harness/claude-code-best-practice/overview">← Back to Claude Code Best Practice</a></td>
<td align="right"><img src="/mirror/08/083732f2d17cc173d2ce8cdf174e11bd1ccf34d9.svg" alt="Claude" width="60" /></td>
</tr>
</table>

---

## Frontmatter Fields (16)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Unique identifier using lowercase letters and hyphens |
| `description` | string | Yes | When to invoke. Use `"PROACTIVELY"` for auto-invocation by Claude |
| `tools` | string/list | No | Comma-separated allowlist of tools (e.g., `Read, Write, Edit, Bash`). Inherits all tools if omitted. Supports `Agent(agent_type)` syntax to restrict spawnable subagents; the older `Task(agent_type)` alias still works |
| `disallowedTools` | string/list | No | Tools to deny, removed from inherited or specified list |
| `model` | string | No | Model to use: `sonnet`, `opus`, `haiku`, a full model ID (e.g., `claude-opus-4-6`), or `inherit` (default: `inherit`) |
| `permissionMode` | string | No | Permission mode: `default`, `acceptEdits`, `auto`, `dontAsk`, `bypassPermissions`, or `plan` |
| `maxTurns` | integer | No | Maximum number of agentic turns before the subagent stops |
| `skills` | list | No | Skill names to preload into agent context at startup (full content injected, not just made available) |
| `mcpServers` | list | No | MCP servers for this subagent — server name strings or inline `\{name: config\}` objects |
| `hooks` | object | No | Lifecycle hooks scoped to this subagent. All hook events are supported; `PreToolUse`, `PostToolUse`, and `Stop` are the most common |
| `memory` | string | No | Persistent memory scope: `user`, `project`, or `local` |
| `background` | boolean | No | Set to `true` to always run as a background task (default: `false`) |
| `effort` | string | No | Effort level override when this subagent is active: `low`, `medium`, `high`, `xhigh`, `max` (Opus 4.6 only). Default: inherits from session |
| `isolation` | string | No | Set to `"worktree"` to run in a temporary git worktree (auto-cleaned if no changes) |
| `initialPrompt` | string | No | Auto-submitted as the first user turn when this agent runs as the main session agent (via `--agent` or the `agent` setting). Commands and skills are processed. Prepended to any user-provided prompt |
| `color` | string | No | Display color for the subagent in the task list and transcript: `red`, `blue`, `green`, `yellow`, `purple`, `orange`, `pink`, or `cyan` |

---

## ![Official](/mirror/5d/5dc02d05a93f03f9dbc3b6ede8ad03e64a65f789.svg) **(5)**

| # | Agent | Model | Tools | Description |
|---|-------|-------|-------|-------------|
| 1 | `general-purpose` | inherit | All | Complex multi-step tasks — the default agent type for research, code search, and autonomous work |
| 2 | `Explore` | haiku | Read-only (no Write, Edit) | Fast codebase search and exploration — optimized for finding files, searching code, and answering codebase questions |
| 3 | `Plan` | inherit | Read-only (no Write, Edit) | Pre-planning research in plan mode — explores the codebase and designs implementation approaches before writing code |
| 4 | `statusline-setup` | sonnet | Read, Edit | Configures the user's Claude Code status line setting |
| 5 | `claude-code-guide` | haiku | Glob, Grep, Read, WebFetch, WebSearch | Answers questions about Claude Code features, Agent SDK, and Claude API |

---

## Sources

- [Create custom subagents — Claude Code Docs](https://code.claude.com/docs/en/sub-agents)
- [CLI reference — Claude Code Docs](https://code.claude.com/docs/en/cli-reference)
- [Claude Code CHANGELOG](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md)
