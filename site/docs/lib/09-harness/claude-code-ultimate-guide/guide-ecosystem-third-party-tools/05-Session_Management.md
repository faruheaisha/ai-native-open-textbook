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
pageSha256: "143b1d8af56fc49f4e07f5515f2e1dc7ad266715e58da3e94db68c36b5560045"
contentMode: "local-full"
zh: ""
---

## Session Management

### claude-code-viewer

A web-based UI for browsing and reading Claude Code conversation history (JSONL files).

| Attribute | Details |
|-----------|---------|
| **Source** | [GitHub: d-kimuson/claude-code-viewer](https://github.com/d-kimuson/claude-code-viewer) / [npm: @kimuson/claude-code-viewer](https://www.npmjs.com/package/@kimuson/claude-code-viewer) |
| **Install** | `npx @kimuson/claude-code-viewer` or `npm install -g @kimuson/claude-code-viewer` |
| **Language** | TypeScript (Node.js 18+) |
| **Version** | 0.5.x |

**Key features**:

- Project browser with session counts and metadata
- Full conversation display with syntax highlighting
- Tool usage results inline
- Real-time updates via Server-Sent Events (auto-refreshes when files change)
- Responsive design (desktop + mobile)

**Limitations**: Read-only (cannot edit or resume sessions). No cost data. Requires existing `~/.claude/projects/` history.

> **Cross-ref**: For session search from the CLI, see [session-search.sh](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/scripts/session-search.sh) in [Observability](/lib/09-harness/claude-code-ultimate-guide/guide-ops-observability).

---

### agenttrace

A local TUI and report generator for inspecting AI coding-agent session history. It reads Claude Code JSONL logs alongside Codex CLI, Gemini CLI, Qwen Code, Cline, Aider, Cursor exports, OpenCode/OpenClaw, Hermes Agent, Pi, Oh My Pi, Kimi CLI, Copilot-style logs, and generic JSON/JSONL traces.

| Attribute | Details |
|-----------|---------|
| **Source** | [GitHub: luoyuctl/agenttrace](https://github.com/luoyuctl/agenttrace) |
| **Install** | `brew install luoyuctl/tap/agenttrace` or `go install github.com/luoyuctl/agenttrace/cmd/agenttrace@latest` |
| **Language** | Go |
| **License** | MIT |

**Key features**:

- Local dashboard for historical sessions, sorted by cost, tokens, elapsed time, and health
- Per-session diagnostics for tool failures, latency gaps, retry loops, large parameters, anomalies, and diffs
- JSON, Markdown, and HTML overview output for CI artifacts or team review
- CI gates for average health, critical sessions, and tool failure rate
- Demo mode (`agenttrace --demo`) for evaluating the UI before connecting local logs

**When to choose agenttrace over claude-code-viewer**:

- You need cost, latency, health, and failure diagnostics, not just conversation browsing
- You use multiple coding agents and want one local view across their session logs
- You want exportable reports or CI quality gates from session history

**Limitations**: It is a local inspection/reporting tool, not a live collaborative UI. Cost estimates depend on the model pricing data and token fields available in each agent log format.

---

### Entire CLI

Agent-native platform for Git-integrated session capture with rewindable checkpoints and governance layer.

| Attribute | Details |
|-----------|---------|
| **Source** | [GitHub: entireio/cli](https://github.com/entireio/cli) / [entire.io](https://entire.io) |
| **Install** | See GitHub (platform launched Feb 2026, early access) |
| **Language** | TypeScript |
| **Founded** | February 2026 by Thomas Dohmke (ex-GitHub CEO), $60M funding |

**Key features:**

- **Session Capture**: Automatic recording of AI agent sessions (Claude Code, Gemini CLI) with full context
- **Rewindable Checkpoints**: Restore to any session state with prompts + reasoning + file changes
- **Governance Layer**: Permission system, human approval gates, audit trails for compliance
- **Agent Handoffs**: Preserve context when switching between agents (Claude → Gemini)
- **Git Integration**: Stores checkpoints on separate `entire/checkpoints/v1` branch (no history pollution)
- **Multi-Agent Support**: Works with multiple AI agents simultaneously with context sharing

**Use cases:**

| Scenario | Why Entire CLI |
|----------|---------------|
| **Compliance (SOC2, HIPAA)** | Full audit trail: prompts → reasoning → outputs |
| **Multi-agent workflows** | Context preserved across agent switches |
| **Debugging AI decisions** | Rewind to checkpoint, inspect reasoning |
| **Governance** | Approval gates before production changes |
| **Team handoffs** | Resume sessions with full context |

**vs claude-code-viewer:**

| Feature | claude-code-viewer | Entire CLI |
|---------|-------------------|-----------|
| **Purpose** | Read-only history viewing | Active session management + replay |
| **Replay** | No | Yes (rewind to checkpoints) |
| **Context** | Conversation only | Prompts + reasoning + file states |
| **Governance** | No | Yes (approval gates, permissions) |
| **Multi-agent** | No | Yes (agent handoffs) |
| **Overhead** | None | ~5-10% storage |

**When to choose Entire over claude-code-viewer:**

- ✅ Need session replay/rewind functionality
- ✅ Enterprise compliance requirements (audit trails)
- ✅ Multi-agent workflows (Claude + Gemini)
- ✅ Governance gates (approval before deploy)
- ❌ Just want to browse history → Use claude-code-viewer (lighter)

**Limitations:**

- Very new (launched Feb 10-12, 2026) - limited production feedback
- Enterprise-focused (may be complex for solo developers)
- Storage overhead (~5-10% of project size for session data)
- macOS/Linux only (Windows via WSL)
- Early stage (v1.x) - expect API changes

**Delta vs common existing setups:**

| Need | Typical existing setup | What Entire adds |
|------|----------------------|-----------------|
| Tool call logging | Local JSONL (7-day rotation) | Reasoning + attribution %, Git-permanent |
| Human/AI attribution | Nothing | % per file, annotated per line, by model |
| Agent handoffs | Manual context copy | Context checkpoint auto-passed to next agent |
| Inter-dev handoff | Git commits/PRs | Shared readable checkpoints on `entire/checkpoints/v1` |
| Session persistence | Local only, ephemeral | Git-native, permanent, shareable |
| Governance | Custom pre-commit hooks | Policy-based approval gates + configurable audit export |

**Evaluation (2h spike recommended before team rollout):**

```bash
entire enable  # Install on throwaway branch

# After 2-3 normal sessions:
du -sh .git/refs/heads/entire/   # Storage per session → flag if > 10 MB
time git push                     # Push overhead → flag if > 5s
ls .git/hooks/                    # Verify no conflict with existing hooks
```

Stop criteria: checkpoint > 10 MB/session, push overhead > 5s, or hook conflicts.

> **Cross-ref**: Full Entire workflow with examples at [AI Traceability Guide](/lib/09-harness/claude-code-ultimate-guide/guide-ops-ai-traceability#51-entire-cli). For compliance use cases, see [Security Hardening](/lib/09-harness/claude-code-ultimate-guide/guide-security-security-hardening/index).
