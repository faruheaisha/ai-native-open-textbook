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
pageSha256: "2dca0ac36dcabb8a706b6d31375d63541276aa40bc7c7d7d0721266abf052022"
contentMode: "local-full"
zh: ""
---

#### Key Insight

`/compact` preserves conversation flow. Fresh context maximizes per-task attention at the cost of continuity.

> **Sources**: [Chroma Research - Context Rot](https://research.trychroma.com/context-rot) | [Ralph Loop Origin](https://block.github.io/goose/docs/tutorials/ralph-loop/) | [METR - Long Task Capability](https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/) | [Anthropic - Context Engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)

### What Consumes Context?

| Action | Context Cost |
|--------|--------------|
| Reading a small file | Low (~500 tokens) |
| Reading a large file | High (~5K+ tokens) |
| Running commands | Medium (~1K tokens) |
| Multi-file search | High (~3K+ tokens) |
| Long conversations | Accumulates |

### Context Depletion Symptoms

Learn to recognize when context is running out:

| Symptom | Severity | Action |
|---------|----------|--------|
| Shorter responses than usual | 🟡 Warning | Continue with caution |
| Forgetting CLAUDE.md instructions | 🟠 Serious | Document state, prepare checkpoint |
| Inconsistencies with earlier conversation | 🔴 Critical | New session needed |
| Errors on code already discussed | 🔴 Critical | New session needed |
| "I can't access that file" (when it was read) | 🔴 Critical | New session immediately |

### Context Inspection

Check your context usage in detail:

```
/context
```

Example output:
```
┌─────────────────────────────────────────────────────────────┐
│ CONTEXT USAGE                                    67% used   │
├─────────────────────────────────────────────────────────────┤
│ System Prompt          ████████░░░░░░░░░░░░░░░░  12,450 tk  │
│ System Tools           ██░░░░░░░░░░░░░░░░░░░░░░   3,200 tk  │
│ MCP Tools (5 servers)  ████████████░░░░░░░░░░░░  18,600 tk  │
│ Conversation           ████████████████████░░░░  89,200 tk  │
├─────────────────────────────────────────────────────────────┤
│ TOTAL                                           123,450 tk  │
│ REMAINING                                        76,550 tk  │
└─────────────────────────────────────────────────────────────┘
```

💡 **The Last 20% Rule**: Reserve ~20% of context for:
- Multi-file operations at end of session
- Last-minute corrections
- Generating summary/checkpoint

### Cost Awareness & Optimization

> **Note:** If you use `claude -p`, the Agent SDK, GitHub Actions, or any automation harness, a billing model change effective June 15, 2026 introduces a new monthly credit cap on programmatic usage separate from interactive limits. See [§9.13: The Interactive/Programmatic Billing Split](#the-interactiveprogrammatic-billing-split-effective-june-15-2026) for the full breakdown, affected tools, and audit steps.

Claude Code isn't free - you're using API credits. Understanding costs helps optimize usage.
