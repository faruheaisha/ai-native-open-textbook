---
title: "2. Core Concepts"
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
pageSha256: "519c6ecd1db05a2d2ab9c1d3f05114f14fdef249da4be6c3283deedd1a0e615c"
contentMode: "local-full"
zh: ""
---

# 2. Core Concepts

_Quick jump:_ [The Interaction Loop](#21-the-interaction-loop) · [Context Management](#22-context-management) · [Plan Mode](#23-plan-mode) · [Rewind](#24-rewind) · [Model Selection](#25-model-selection--thinking-guide) · [Mental Model](#26-mental-model) · [Prompt Engineering Patterns](#210-prompt-engineering-patterns) · [Data Flow & Privacy](#212-data-flow--privacy)

---

> **Experienced with Claude Code?** Jump to [2.6 Mental Model](#26-mental-model), the highest-ROI section in this chapter.

## 📌 Section 2 TL;DR (2 minutes)

**What you'll learn**: The mental model and critical workflows for Claude Code mastery.

### Key Concepts:
- **Interaction Loop**: Describe → Analyze → Review → Accept/Reject cycle
- **Context Management** 🔴 CRITICAL: Watch `Ctx(u):`, /compact at 70%, /clear at 90%
- **Plan Mode**: Read-only exploration before making changes
- **Rewind**: Undo with Esc×2 or /rewind
- **Mental Model**: Claude = expert pair programmer, not autocomplete

### The One Rule:
> Always check context % before starting complex tasks. High context = degraded quality.

**Read this section if**: You want to avoid the #1 mistake (context overflow)
**Skip if**: You just need quick command reference (go to Section 10)

---

**Reading time**: 20 minutes

**Skill level**: Day 1-3

**Goal**: Understand how Claude Code thinks

## 2.1 The Interaction Loop

Every Claude Code interaction follows this pattern:

```
┌─────────────────────────────────────────────────────────┐
│                    INTERACTION LOOP                     │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   1. DESCRIBE  ──→  You explain what you need           │
│        │                                                │
│        ▼                                                │
│   2. ANALYZE   ──→  Claude explores the codebas         │
│        │                                                 │
│        ▼                                                 │
│   3. PROPOSE   ──→  Claude suggests changes (diff)       │
│        │                                                 │
│        ▼                                                 │
│   4. REVIEW    ──→  You read and evaluate                │
│        │                                                 │
│        ▼                                                 │
│   5. DECIDE    ──→  Accept / Reject / Modify             │
│        │                                                 │
│        ▼                                                 │
│   6. VERIFY    ──→  Run tests, check behavior            │
│        │                                                 │
│        ▼                                                 │
│   7. COMMIT    ──→  Save changes (optional)              │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### Key Insight

The loop is designed so that **you remain in control**. Claude proposes, you decide.

## 2.2 Context Management

🔴 **This is the most important concept in Claude Code.**

### 📌 Context Management Quick Reference

**The zones**:
- 🟢 0-50%: Work freely
- 🟡 50-75%: Be selective
- 🔴 75-90%: `/compact` now
- ⚫ 90%+: `/clear` required

**When context is high**:
1. `/compact` (saves context, frees space)
2. `/clear` (fresh start, loses history)

**Prevention**: Load only needed files, compact regularly, commit frequently

---

### What is Context?

Context is Claude's "working memory" for your conversation. It includes:
- All messages in the conversation
- Files Claude has read
- Command outputs
- Tool results

### The Context Budget

Claude has a **200,000 token** context window. Think of it like RAM - when it fills up, things slow down or fail.

### Reading the Statusline

The statusline shows your context usage:

```
Claude Code │ Ctx(u): 45% │ Cost: $0.23 │ Session: 1h 23m
```

| Metric | Meaning |
|--------|---------|
| `Ctx(u): 45%` | You've used 45% of context |
| `Cost: $0.23` | API cost so far |
| `Session: 1h 23m` | Time elapsed |

### Custom Statusline Setup

The default statusline can be enhanced with more detailed information like git branch, model name, and file changes.

**Option 1: [ccstatusline](https://github.com/sirmalloc/ccstatusline) (recommended)**

Add to `~/.claude/settings.json`:

```json
{
  "statusLine": {
    "type": "command",
    "command": "npx -y ccstatusline@latest",
    "padding": 0
  }
}
```

This displays: `Model: Sonnet 4.6 | Ctx: 0 | ⎇ main | (+0,-0) | Cost: $0.27 | Session: 0m | Ctx(u): 0.0%`

**Option 2: Custom script**

Create your own script that:
1. Reads JSON data from stdin (model, context, cost, git info)
2. Outputs a single formatted line to stdout
3. Supports ANSI colors for styling

```json
{
  "statusLine": {
    "type": "command",
    "command": "/path/to/your/statusline-script.sh",
    "padding": 0
  }
}
```

Use `/statusline` command in Claude Code to auto-generate a starter script.

**Available JSON fields (stdin)**:

| Field | Type | Description |
|-------|------|-------------|
| `model` | string | Current model name |
| `context` | object | `used`, `total`, `percentage` |
| `cost_usd` | number | Session cost |
| `git` | object | Branch, staged/unstaged counts |
| `rate_limits` | object | Claude.ai usage (v2.1.80+) |

**`rate_limits` object** (v2.1.80+): displays Claude.ai token usage directly in the statusline without opening the dashboard:

```json
{
  "rate_limits": {
    "5h":  { "used_percentage": 42, "resets_at": "2026-03-20T15:30:00Z" },
    "7d":  { "used_percentage": 18, "resets_at": "2026-03-23T00:00:00Z" }
  }
}
```

Example usage in a statusline script:

```bash
#!/usr/bin/env bash
input=$(cat)
pct_5h=$(echo "$input" | jq -r '.rate_limits["5h"].used_percentage // "?"')
echo "RL: ${pct_5h}%"
```

### Context Zones

| Zone | Usage | Action |
|------|-------|--------|
| 🟢 Green | 0-50% | Work freely |
| 🟡 Yellow | 50-75% | Start being selective |
| 🔴 Red | 75-90% | Use `/compact` or `/clear` |
| ⚫ Critical | 90%+ | Must clear or risk errors |

### Context Recovery Strategies

When context gets high:

**Option 1: Compact** (`/compact`)
- Summarizes the conversation
- Preserves key context
- Reduces usage by ~50%

> **When `/compact` goes wrong**: Compaction fires when the model has the most accumulated context, meaning it is also at its most distracted point. If the model cannot predict where the work is heading (e.g., auto-compact fires mid-debugging and your next message is "now fix that warning in bar.ts"), it may drop future-relevant info from the summary. Mitigate by compacting proactively and with context: `/compact focus on the auth refactor, drop the test debugging` guides the summary toward what matters next. (Source: Anthropic internal guidance)

**Option 2: Clear** (`/clear`)
- Starts fresh
- Loses all context
- Use when changing topics

> **"One Task, One Chat"**: mixing unrelated topics across turns degrades model accuracy by ~39%. Context accumulates noise ("context rot") that distorts judgment even when total token usage stays low. Use `/clear` aggressively between distinct tasks, not just when the context bar turns red.

**Option 3: Summarize from here** (v2.1.32+)
- Use `/rewind` (or `Esc + Esc`) to open the checkpoint list
- Select a checkpoint and choose "Summarize from here"
- Claude summarizes everything from that point forward, keeping earlier context intact
- Frees space while keeping critical context
- More precise than full `/compact`

**Option 4: Targeted Approach**
- Be specific in queries
- Avoid "read the entire file"
- Use symbol references: "read the `calculateTotal` function"

### Context Triage: What to Keep vs. Evacuate

When approaching the red zone (75%+), `/compact` alone may not be enough. You need to actively decide what information to preserve before compacting.

**Priority: Keep**

| Keep | Why |
|------|-----|
| CLAUDE.md content | Core instructions must persist |
| Files being actively edited | Current work context |
| Tests for the current component | Validation context |
| Critical decisions made | Architectural choices |
| Error messages being debugged | Problem context |

**Priority: Evacuate**

| Evacuate | Why |
|----------|-----|
| Files read but no longer relevant | One-time lookups |
| Debug output from resolved issues | Historical clutter |
| Long conversation history | Summarized by /compact |
| Files from completed tasks | No longer needed |
| Large config files | Can be re-read if needed |

**Pre-Compact Checklist**:

1. **Document critical decisions** in CLAUDE.md or a session note
2. **Commit pending changes** to git (creates restore point)
3. **Note the current task** explicitly ("We're implementing X")
4. **Run `/compact`** to summarize and free space

**Pro tip**: If you know you'll need specific information post-compact, tell Claude explicitly: "Before we compact, remember that we decided to use Strategy A for authentication because of X." Claude will include this in the summary.

### Session vs. Persistent Memory

Claude Code has three distinct memory systems. Knowing which one to use avoids losing context you meant to keep across sessions:

| Aspect | Session Memory | Auto-Memory (native) | Persistent Memory (Serena) |
|--------|----------------|----------------------|---------------------------|
| **Scope** | Current conversation only | Across sessions, per-project | Across all sessions |
| **Managed by** | `/compact`, `/clear` | `/memory` command (automatic) | `write_memory()` via Serena MCP |
| **Lost when** | Session ends or `/clear` | Explicitly deleted via `/memory` | Explicitly deleted from Serena |
| **Requires** | Nothing | Nothing (v2.1.59+) | [Serena MCP server](#82-available-servers) |
| **Use case** | Immediate working context | Key decisions, context snippets | Architectural decisions, patterns |

**Session Memory** (short-term):
- Everything in your current conversation
- Files Claude has read, commands run, decisions made
- Managed with `/compact` (compress) and `/clear` (reset)
- Disappears when you close Claude Code

**Auto-Memory** *(native, v2.1.59+)*:
- Built into Claude Code, no MCP server or configuration required
- Claude automatically saves useful context (decisions, patterns, preferences) to `MEMORY.md` files
- Organized per-project: `.claude/memory/MEMORY.md` or `~/.claude/projects/<path>/memory/MEMORY.md`
- Managed with `/memory`: view, edit, or delete what's been saved
- Survives across sessions automatically

**Persistent Memory** (long-term, Serena MCP):
- Requires [Serena MCP server](#82-available-servers) installed
- Explicitly saved with `write_memory("key", "value")`
- Survives across sessions
- Ideal for: architectural decisions, API patterns, coding conventions

**Pattern: End-of-Session Save**

```
# Before ending a productive session:
"Save our authentication decision to memory:
- Chose JWT over sessions for scalability
- Token expiry: 15min access, 7d refresh
- Store refresh tokens in httpOnly cookies"

# Claude calls: write_memory("auth_decisions", "...")

# Next session:
"What did we decide about authentication?"
# Claude calls: read_memory("auth_decisions")
```

**When to use which**:
- **Session memory**: Active problem-solving, debugging, exploration
- **Auto-memory**: Decisions and context you want Claude to rediscover next session without manual effort (v2.1.59+)
- **Persistent memory (Serena)**: Structured key-value store for architectural decisions across many projects
- **CLAUDE.md**: Team conventions, project structure (versioned with git)

**Auto-compact and PostToolUse memory capture: a conflict to know about**:

Claude Code auto-compacts the conversation when the remaining context drops below a fixed buffer threshold (roughly the last 6-7% of the context window, or about 13K tokens from the effective limit). In practice, this triggers somewhere in the 90-95% usage range depending on the model's context window and reserved output tokens. Before full compaction runs, Claude Code also applies **micro-compaction**: a lighter pass that selectively compresses older tool results (file reads, bash outputs, search results) to free space incrementally without summarizing the whole conversation. If auto-compact fails (e.g., due to a rate limit), it retries up to 3 consecutive times before giving up for that session.

If you use a hook-based memory capture tool (like claude-mem) that saves session history via `PostToolUse`, auto-compact can fire and discard conversation history **before** the save pipeline has a chance to capture it.

Two ways to handle this:

```json
// Option 1: disable auto-compact in your project settings.json
// (you manage compaction manually via /compact)
{
  "autoCompactEnabled": false
}
```

```bash
# Option 2: keep auto-compact on, but set your tool's save threshold
# to trigger well below 80% (e.g., at 60% context usage)
# — check your memory plugin's cooldowns/threshold config
```

Option 1 gives full control but requires discipline. Option 2 is safer if you forget to compact manually. The general guide advice (use `/compact` proactively at 75%) still applies. Auto-compact disabled just means you own the timing.

> **See also**: [Memory Systems: Session vs Persistent Memory](/lib/09-harness/claude-code-ultimate-guide/guide-core-memory-systems/index#25-session-vs-persistent-memory) for the full comparison table and cross-session tool options.

### Fresh Context Pattern (Ralph Loop)
