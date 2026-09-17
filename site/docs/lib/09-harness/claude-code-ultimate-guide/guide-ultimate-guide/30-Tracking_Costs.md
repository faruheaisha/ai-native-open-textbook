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
pageSha256: "95e3c309b1c8955619a8927334e3b6fa8f73da0c9cacbf631bffa8f9d62d9215"
contentMode: "local-full"
zh: ""
---

#### Tracking Costs

**Real-time tracking**:

The status line shows current session cost:

```
Claude Code │ Ctx(u): 45% │ Cost: $0.23 │ Session: 1h 23m
                              ↑ Current session cost
```

**Advanced tracking with `ccusage`**:

The `ccusage` CLI tool provides detailed cost analytics beyond the `/cost` command (use `/usage` since v2.1.118):

```bash
ccusage                    # Overview all periods
ccusage --today            # Today's costs
ccusage --month            # Current month
ccusage --session          # Active session breakdown
ccusage --model-breakdown  # Cost by model (Sonnet/Opus/Haiku)
```

**Example output**:
```
┌──────────────────────────────────────────────────────┐
│ USAGE SUMMARY - January 2026                         │
├──────────────────────────────────────────────────────┤
│ Today                           $2.34 (12 sessions)  │
│ This week                       $8.91 (47 sessions)  │
│ This month                     $23.45 (156 sessions) │
├──────────────────────────────────────────────────────┤
│ MODEL BREAKDOWN                                      │
│   Sonnet 3.5    85%    $19.93                        │
│   Opus 4.6      12%     $2.81                        │
│   Haiku 3.5      3%     $0.71                        │
└──────────────────────────────────────────────────────┘
```

**Why use `ccusage` over `/cost` (alias for `/usage` since v2.1.118)?**
- **Historical trends**: Track usage patterns over days/weeks/months
- **Model breakdown**: See which model tier drives costs
- **Budget planning**: Set monthly spending targets
- **Team analytics**: Aggregate costs across developers

> For a full inventory of community cost trackers, session viewers, config managers, and alternative UIs, see [Third-Party Tools](/lib/09-harness/claude-code-ultimate-guide/guide-ecosystem-third-party-tools/index).

**Monthly tracking**:

Check your Anthropic Console for detailed usage:
- https://console.anthropic.com/settings/usage

**Cost budgeting**:

```bash
# Set a mental budget per session
- Quick task (5-10 min): $0.05-$0.10
- Feature work (1-2 hours): $0.20-$0.50
- Deep refactor (half day): $1.00-$2.00

# If you're consistently over budget:
1. Use /compact more often
2. Be more specific in queries
3. Consider using Haiku for simpler tasks
4. Reduce MCP servers
```
