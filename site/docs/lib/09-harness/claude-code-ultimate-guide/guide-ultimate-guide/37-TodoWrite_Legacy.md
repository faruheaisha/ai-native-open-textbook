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
pageSha256: "7121021dbbf03bda8cafd916d0226f7866ce269eda7e1f442c8f33801e114e4d"
contentMode: "local-full"
zh: ""
---

#### TodoWrite (Legacy)

**Tool**: `TodoWrite` - Creates task lists stored in session memory

**Capabilities:**
- Simple task tracking within a single session
- Status tracking: pending/in_progress/completed
- Lost when session ends or context is compacted

**When to use TodoWrite:**
- Single-session, straightforward implementations
- Quick fixes or exploratory coding
- Claude Code < v2.1.16
- Prefer simplicity over persistence

**Migration flag** (v2.1.19+):

```bash
# Temporarily revert to TodoWrite system
CLAUDE_CODE_ENABLE_TASKS=false claude

# Use new Tasks API (default)
claude
```
