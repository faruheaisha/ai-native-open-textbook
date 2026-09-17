---
title: "6. Commands (User-Invocable Skills)"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ultimate-guide.md"
sourceRel: "guide/ultimate-guide.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/guide/ultimate-guide.md"
sourceSha256: "4d290b0171bbaaffd149d5d2e4da964392cb212d7357408df40d8f346f952dbc"
pageSha256: "605dcbca4e83da94e6fc0c41bcb86778ed18f8345b6883b2a41c0a3fceb0d3e9"
contentMode: "local-full"
zh: ""
---

# 6. Commands (User-Invocable Skills)

_Quick jump:_ [Slash Commands](#61-slash-commands) · [Creating Custom Commands](#62-creating-custom-commands) · [Command Template](#63-command-template) · [Command Examples](#64-command-examples)

---

> **CC 2.1.3 (January 2026)**: Skills and Commands are now unified. `.claude/commands/` is merged into `.claude/skills/`. Skills have two invocation modes: user-triggered (`/skill-name`, equivalent to old commands) and model-triggered (auto-loaded by description match). To restrict a skill to user-invocation only, add `disable-model-invocation: true` to its frontmatter. Existing files in `.claude/commands/` remain backward-compatible but all new development belongs in `.claude/skills/`.

---

**Reading time**: 10 minutes
**Skill level**: Week 1-2
**Goal**: Create custom slash commands

## 6.1 Slash Commands

Slash commands are user-invocable skills. Since CC 2.1.3, they live in `.claude/skills/` (not `.claude/commands/`). The `/name` invocation syntax is unchanged. Add `disable-model-invocation: true` to a skill's frontmatter to make it user-only.

### Built-in Commands

Claude Code ships with roughly 100 built-in commands. The full categorized list lives in [§10.1 Commands Table](#101-commands-table), and the official reference that always reflects the current release is [code.claude.com/docs/en/commands](https://code.claude.com/docs/en/commands). Below is the subset worth memorizing, the ones that come up in most sessions.

| Command | Action |
|---------|--------|
| `/help` | Show all commands |
| `/clear` | Clear conversation |
| `/compact` | Summarize context |
| `/status` | Show session info |
| `/context` | Detailed context/token breakdown with actionable suggestions |
| `/usage` (`/cost`, `/stats`) | Session cost, plan limits, and per-model breakdown (merged from `/cost` and `/stats` in v2.1.118) |
| `/plan` | Enter Plan Mode |
| `/rewind` (`/checkpoint`, `/undo`) | Rewind conversation and/or code to a checkpoint |
| `/resume` (`/continue`) | Resume a previous session with interactive picker |
| `/voice` | Toggle voice dictation (hold Space to speak, release to send) |
| `/recap` | Show context summary when returning to a session after a break |
| `/config` | Interactive configuration editor, or `key=value` to set one directly |
| `/model` | Switch model (sonnet/opus/opusplan) |
| `/effort [level]` | Set thinking depth: low/medium/high/xhigh/max/ultracode; no arg = interactive slider |
| `/focus` | Toggle focus view (minimal UI, hides metadata) |
| `/tui [fullscreen]` | Switch to full-screen flicker-free TUI rendering |
| `/copy` | Interactive picker: copy a code block or full response |
| `/loop [interval] [prompt]` (`/proactive`) | Run a prompt on a recurring interval |
| `/code-review [level]` | Review the diff for correctness bugs and cleanups. `--fix` applies them, `ultra` runs the cloud review |
| `/simplify` | Review changed code and fix over-engineering (no longer looks for bugs since v2.1.154) |
| `/batch` | Large-scale changes via parallel worktree agents |
| `/subtask <task>` | Hand a side task to a forked subagent that reports back here (v2.1.212+) |
| `/insights` | Generate usage analytics report |
| `/btw [question]` | Side question via ephemeral overlay: read-only, no tools, single response, doesn't pollute main history |
| `/doctor` (`/checkup`) | Full setup checkup: install health, settings, hooks, `CLAUDE.md` bloat, unused skills and MCP servers |
| `/skill-doctor` | Terminal-only skill usage report: visible skill context cost and never-invoked skills; excludes bundled and enterprise skills, unavailable through Remote Control (v2.1.252+) |
| `/release-notes` | Browse Claude Code changelog interactively |
| `/fewer-permission-prompts` | Scan transcripts and propose a read-only tool allowlist (shipped as `/less-permission-prompts` in v2.1.111) |
| `/team-onboarding` | Generate a teammate ramp-up guide from 30 days of session history |
| `/terminal-setup` | Configure terminal keybindings for Shift+Enter (VS Code, Cursor, Zed, Alacritty) |
| `/reload-plugins` | Reload active plugins without restarting |
| `/mcp` | Show MCP server status |
| `/memory` | View/edit memory files |
| `/plugin` | Manage plugins (install, list, update) |
| `/keybindings` | Edit key bindings (opens ~/.claude/keybindings.json) |
| `/setup-bedrock` | Interactive Bedrock configuration wizard |
| `/setup-vertex` | Interactive Vertex AI configuration wizard |
| `/ultrareview` | Cloud-based parallel multi-agent code review, now an alias of `/code-review ultra` (Pro/Max) |
| `/goal [condition]` | Set a completion condition. Claude works autonomously across turns until the condition is met, displaying a live overlay with elapsed time, turn count, and token usage. Example: `/goal all tests pass and build is green` (v2.1.139) |
| `/scroll-speed` | Interactive slider to tune mouse wheel scroll speed. Changes take effect immediately with live preview. (v2.1.139) |
| `/exit` | Exit Claude Code |

### The /btw Command

`/btw` lets you ask a quick side question while Claude is working without breaking your flow. Type `/btw what does this function return?` and get an instant response in an overlay. The main task keeps running uninterrupted.

**How it works**: Claude spawns a temporary ephemeral agent with NO tools available. It cannot read files, run commands, or take actions. It responds once based solely on the current conversation context, then the overlay closes. The exchange never enters your main conversation history.

**Key constraints:**
- Read-only: no file access, no shell commands
- Single response: no follow-up in the overlay
- Context-only: answers from what's already in the conversation, not from disk
- "Full context aware" means conversation context, not project files

**When to use it:**
- Quick clarification mid-task ("btw what's the default port for Postgres?")
- Terminology check without stopping work
- Sanity check on something Claude just mentioned

**Syntax**: Start your message with `btw` (lowercase, no slash required) followed by your question. Claude Code detects the `btw` prefix and routes it to the ephemeral overlay agent.

> Note: This feature (`btw-side-question`) was introduced around v2.0.73 and matured by v2.1.23. If you encounter issues, verify you're on a recent version.

### Session Forking

Session forking creates a new independent session that starts from an existing point in history. Use it when you hit a decision point and want to explore two directions without restarting from scratch.

**Two ways to fork:**

```bash
# From inside an active session
/branch

# From the CLI when resuming
