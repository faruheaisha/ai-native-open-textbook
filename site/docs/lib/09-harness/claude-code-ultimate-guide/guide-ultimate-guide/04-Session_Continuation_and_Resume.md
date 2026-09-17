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
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ultimate-guide.md"
sourceRel: "guide/ultimate-guide.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/guide/ultimate-guide.md"
sourceSha256: "4d290b0171bbaaffd149d5d2e4da964392cb212d7357408df40d8f346f952dbc"
pageSha256: "5e9f56ca4bd80e629d3e10c89b55ecc078edf3fe96520c307fefe3e4eb728c84"
contentMode: "local-full"
zh: ""
---

#### Session Continuation and Resume

Claude Code allows you to **continue previous conversations** across terminal sessions, maintaining full context and conversation history.

**Two ways to resume**:

1. **Continue last session** (`--continue` or `-c`):
   ```bash
   # Automatically resumes your most recent conversation
   claude --continue
   # Short form
   claude -c
   ```

2. **Resume specific session** (`--resume <id>` or `-r <id>`):
   ```bash
   # Resume a specific session by ID
   claude --resume abc123def
   # Short form
   claude -r abc123def
   ```

3. **Link to a GitHub PR** (`--from-pr <number>`, v2.1.49+):
   ```bash
   # Start a session linked to a specific PR
   claude --from-pr 123

   # Sessions created via gh pr create during a Claude session
   # are auto-linked to that PR — use --from-pr to resume them
   gh pr create --title "Add auth" --body "..."
   # Later:
   claude --from-pr 123  # Resumes the session context for this PR
   ```

   Useful for continuing work on a feature exactly where you left off relative to a specific PR, with no need to remember session IDs.

**Finding session IDs**:

```bash
# Native: Interactive session picker
claude --resume

# Native: List via Serena MCP (if configured)
claude mcp call serena list_sessions

# Recommended: Fast search with ready-to-use resume commands
# See examples/scripts/session-search.sh (bash, zero dependencies, 15ms list, 400ms search)
# See examples/scripts/cc-sessions.py (Python, incremental index, partial resume, branch filter)
cs                    # List 10 most recent sessions
cs "authentication"   # Full-text search across all sessions

# Sessions are also shown when you exit
You: /exit
Session ID: abc123def (saved for resume)
```

> **Session Search Tools**: For fast session search, see [session-search.sh](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/scripts/session-search.sh) (bash, lightweight) and [cc-sessions.py](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/scripts/cc-sessions.py) (Python, advanced features: incremental index, partial ID resume, branch filter, and `discover` for automated pattern analysis, [GitHub](https://github.com/FlorianBruniaux/cc-sessions)). Also: [Observability Guide](/lib/09-harness/claude-code-ultimate-guide/guide-ops-observability#session-search--resume).

**Common use cases**:

| Scenario | Command | Why |
|----------|---------|-----|
| Interrupted work | `claude -c` | Pick up exactly where you left off |
| Multi-day feature | `claude -r abc123` | Continue complex task across days |
| After break/meeting | `claude -c` | Resume without losing context |
| Parallel projects | `claude -r <id>` | Switch between different project contexts |
| Code review follow-up | `claude -r <id>` | Address review comments in original context |

**Example workflow**:

```bash
# Day 1: Start implementing authentication
cd ~/project
claude
You: Implement JWT authentication with refresh tokens
Claude: [Analysis and initial implementation]
You: /exit
Session ID: auth-feature-xyz (27% context used)

# Day 2: Continue the work
cd ~/project
claude --continue
Claude: Resuming session auth-feature-xyz...
You: Add rate limiting to the auth endpoints
Claude: [Continues with full context of Day 1 work]
```

**Best practices**:

- **Use `/exit` properly**: Always exit with `/exit` or `Ctrl+D` (not force-kill) to ensure session is saved
- **Descriptive final messages**: End sessions with context ("Ready for testing") so you remember the state when resuming
- **Proactive context management**: Monitor with `/status` and use research-backed thresholds:
  - **< 70%**: Optimal, full reasoning capacity
  - **75%**: Good time to `/compact` manually, before quality degrades
  - **85%**: Auto-compact territory. Claude Code will compress automatically once remaining context drops below its fixed buffer (~6-7% of window). Manual handoff recommended before this point ([research-backed](/lib/09-harness/claude-code-ultimate-guide/guide-core-architecture/index#auto-compaction))
  - **95%**: Force handoff, severe quality degradation, reset immediately
- **Session naming**: Use `/rename` to give sessions descriptive names, critical when running multiple sessions in parallel (see [Auto-Rename Pattern](#session-auto-rename) below)

**Resume vs. fresh start**:

| Use Resume When... | Start Fresh When... |
|-------------------|---------------------|
| Continuing a specific feature/task | Switching to unrelated work |
| Building on previous decisions | Previous session went off track |
| Context is still relevant (< 75%) | Context is bloated (> 85%) |
| Multi-step implementation in progress | Quick one-off questions |

**Limitations**:

- Sessions are stored locally (not synced across machines)
- Very old sessions may be pruned (depends on local storage limits)
- Corrupted sessions can't be resumed (start fresh with `/clear`)
- Cannot resume sessions started with different model or MCP config

**Context preservation**:

When you resume, Claude retains:
- ✅ Full conversation history
- ✅ Files previously read/edited
- ✅ CLAUDE.md and project settings
- ✅ MCP server state (if Serena is used)
- ✅ Uncommitted code changes awareness

**Combining with MCP Serena**:

For advanced session management with project memory and symbol tracking:

```bash
# Initialize Serena memory for the project
claude mcp call serena initialize_session

# Work with full session persistence
You: Implement user authentication
Claude: [Works with Serena tracking symbols and context]

# Exit and resume later with full project memory
claude -c
Claude: [Resumes with Serena's persistent project understanding]
```

> **💡 Pro tip**: Use `claude -c` as your default way to start Claude Code in active projects. This ensures you never lose context from previous sessions unless you explicitly want a fresh start with `claude` (no flags).

> **Source**: [DeepTo Claude Code Guide - Context Resume Functions](https://cc.deeptoai.com/docs/en/best-practices/claude-code-comprehensive-guide)

### Session Pattern Discovery (cc-sessions discover) \{#session-pattern-discovery\}

Your session history is a data source. Every time you ask Claude to do the same kind of thing across multiple sessions, that's a signal: extract it as a skill, command, or CLAUDE.md rule and stop paying the context tax on every request.

`cc-sessions discover` automates this analysis. It reads your session history, finds recurring patterns in user messages, and tells you what to extract.

**Install**:

```bash
curl -sL https://raw.githubusercontent.com/FlorianBruniaux/cc-sessions/main/cc-sessions \
  -o ~/.local/bin/cc-sessions && chmod +x ~/.local/bin/cc-sessions
```

**Two modes**:

| Mode | How | Cost | Speed |
|------|-----|------|-------|
| N-gram (default) | Tokenizes messages, builds frequency index of 3-6 word phrases | Free, local | ~3s for 12 projects |
| `--llm` | Deduplicates messages, sends batch to `claude --print` | Uses your subscription | ~15s |

```bash
# N-gram mode: all projects, last 90 days
cc-sessions --all discover

# Lower threshold, narrower window
cc-sessions --all discover --since 60d --min-count 2 --top 15

# Semantic analysis via claude --print
cc-sessions --all discover --llm

# JSON output for scripting
cc-sessions --all discover --json | jq '.[] | select(.category == "skill")'
```

**Example output**:

```
  cc-sessions discover — 847 sessions · 12 project(s) · since 90d

  📋  CLAUDE.md RULE
  ────────────────────────────────────────────────────────────
  write tests before implementation
    234 sessions (28%) · 891 occurrences · score 0.416
    → 3a72f1c4-...

  🧩  SKILL
  ────────────────────────────────────────────────────────────
  security review authentication flow
    71 sessions (8%) · 203 occurrences · score 0.084
    → 9f1c3a22-...

  ⚡  COMMAND
  ────────────────────────────────────────────────────────────
  generate prisma migration rollback script
    18 sessions (2%) · 44 occurrences · score 0.021
    → 44aab71c-...
```

**The 20% rule built into scoring**: patterns above 20% of sessions become `CLAUDE.md rule` suggestions (always load), 5-20% become `skill` suggestions (load on demand), below 5% become `command` suggestions (explicit invocation). The cross-project bonus (1.5×) prioritizes patterns that recur across different codebases. Those are worth extracting even at lower frequency.

See also: [§5.1 Understanding Skills](#51-understanding-skills) for the distinction between CLAUDE.md rules, skills, and commands, and the [20% rule](#the-20-rule) for the decision framework.

**GitHub**: [FlorianBruniaux/cc-sessions](https://github.com/FlorianBruniaux/cc-sessions)

### Session Auto-Rename

When running multiple Claude Code sessions in parallel (split terminals, WebStorm tabs, parallel workstreams), the `/resume` picker shows sessions by timestamp or truncated first prompt, impossible to distinguish at a glance.

Two complementary approaches solve this. Use one or both together.
