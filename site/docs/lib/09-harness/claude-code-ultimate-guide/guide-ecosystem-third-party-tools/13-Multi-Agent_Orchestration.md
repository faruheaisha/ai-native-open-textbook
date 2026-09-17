---
title: "Claude Code Ultimate Guide"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/third-party-tools.md"
sourceRel: "guide/ecosystem/third-party-tools.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/guide/ecosystem/third-party-tools.md"
sourceSha256: "b3e2f559e8457efd6710fab561c9ec7cd746c62b9885fa5535509f700f4a2677"
pageSha256: "41d1c8f49d2aaa422eeede9a906ab4534d68bbb30b98604214ed1016c17e62dd"
contentMode: "local-full"
zh: ""
---

## Multi-Agent Orchestration

This section covers tools for running **multiple Claude Code instances in parallel**. For detailed documentation, see:

- **[AI Ecosystem](/lib/09-harness/claude-code-ultimate-guide/guide-ecosystem-ai-ecosystem/index)** - Gas Town, multiclaude, agent-chat, claude-squad
- **[Ultimate Guide Section 9](/lib/09-harness/claude-code-ultimate-guide/guide-ultimate-guide/index)** - Multi-instance workflows, git worktrees, orchestration frameworks
- **[Agent Tools: Beyond Claude Code](/lib/09-harness/claude-code-ultimate-guide/guide-ecosystem-agentic-tools/index)** - Hermes Agent, Codex CLI, Devin, CrewAI, LangGraph, and other tools that are not Claude-Code-specific

**Quick reference**:

| Tool | Type | Key Feature |
|------|------|-------------|
| [Gas Town](https://github.com/steveyegge/gastown) | Multi-agent workspace | Steve Yegge's agent-first workspace manager |
| [multiclaude](https://github.com/dlorenc/multiclaude) | Multi-agent spawner | tmux + git worktrees (559 stars, 2026-07-27) |
| [agent-chat](https://github.com/justinabrahms/agent-chat) | Monitoring UI | Real-time SSE monitoring for Gas Town/multiclaude |
| [Multica](/lib/09-harness/claude-code-ultimate-guide/guide-ecosystem-agentic-tools/index#49-multica) | Issue-driven control plane | Server-side coordination with local daemon execution across 26 agent CLI integrations |
| [abtop](https://github.com/graykode/abtop) | Fleet TUI monitor | htop-style: tokens, context %, rate limits, ports, subagent tree (3,393 stars, 2026-07-27) |
| [Conductor](#conductor) | Desktop app | macOS parallel agents (also listed above) |
| [Piebald](#piebald) | Desktop/web app | Multi-provider + Windows + hooks compat (also listed above) |

---

### abtop

A Rust TUI that shows all active Claude Code and Codex CLI sessions in one screen, like htop but for agent fleets.

| Attribute | Details |
|-----------|---------|
| **Source** | [GitHub: graykode/abtop](https://github.com/graykode/abtop) |
| **Install** | `curl --proto '=https' --tlsv1.2 -LsSf https://github.com/graykode/abtop/releases/latest/download/abtop-installer.sh \| sh` or `cargo install abtop` |
| **Language** | Rust (ratatui) |
| **License** | MIT |
| **Platform** | macOS, Linux (WSL for Windows) |

**Key features**:

- Auto-discovery of Claude Code and Codex CLI sessions from local process/file state: no API key, no auth
- Per-session bars: token usage, context window %, rate limit quota
- Orphan port detection with one-key kill (`X`)
- Subagent tree (Claude Code only)
- tmux integration: press `Enter` to jump directly to the session pane
- `--once` flag for snapshot output (CI-friendly)
- `--setup` to install a rate-limit collection hook
- 10 built-in themes including 4 colorblind-friendly variants (`high-contrast`, `protanopia`, `deuteranopia`, `tritanopia`)

**Usage**:

```bash
abtop                    # Launch TUI (requires 120x40 terminal, degrades gracefully to 80x24)
abtop --once             # Print snapshot and exit
abtop --setup            # Install rate limit collection hook
abtop --theme dracula    # Launch with a specific theme
```

**Recommended setup with tmux**:

```bash
tmux new -s work
# pane 0: abtop
# pane 1: claude (project A)
# pane 2: claude (project B)
# Press Enter in abtop to jump to the active agent's pane
```

**Supported features by agent**:

| Feature | Claude Code | Codex CLI |
|---------|:-----------:|:---------:|
| Token tracking | ✅ | ✅ |
| Context window % | ✅ | ✅ |
| Rate limit | ✅ | ✅ |
| Subagents | ✅ | ❌ |
| Memory status | ✅ | ❌ |

> **When to use**: running 3+ concurrent agents across projects, hitting rate limits without knowing which session is responsible, or needing to spot orphaned ports left by a previous agent run.
