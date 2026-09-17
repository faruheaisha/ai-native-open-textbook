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
pageSha256: "8b2e9d90d1bb41ca020030e87b37039d5a05e71fc4e6da41532236f2b24efcd8"
contentMode: "local-full"
zh: ""
---

#### The Pattern

```bash
# Canonical "Ralph Loop" (Geoffrey Huntley)
while :; do cat TASK.md PROGRESS.md | claude -p ; done
```

> **Naming note**: "Ralph Loop" is used in two distinct ways in the community. Geoffrey Huntley's original pattern (above) is about context rotation: spawning fresh sessions to avoid context rot. A separate usage, popularized by Addy Osmani and others in 2026, applies the same term to *atomic task iteration* in multi-agent teams: pick task → implement → validate → commit → reset context → repeat. Both share the same core mechanic (stateless loop with external state), but the scope differs. When the term appears without attribution, clarify which variant is meant.

**State persists via**:
- `TASK.md`: Current task definition with acceptance criteria
- `PROGRESS.md`: Learnings, completed tasks, blockers
- Git commits: Each iteration commits atomically

**Variant: tasks/lessons.md**

A lightweight alternative for interactive sessions (no loop required): after each user correction, Claude updates `tasks/lessons.md` with the rule to avoid the same mistake. Reviewed at the start of each new session.

```
tasks/
├── todo.md      # Current plan (checkable items)
└── lessons.md   # Rules accumulated from corrections
```

The difference from PROGRESS.md: `lessons.md` captures *behavioral rules* ("always diff before marking done", "never mock without asking") rather than task state. It compounds over time. The mistake rate drops as the ruleset grows.

| Traditional | Fresh Context |
|-------------|---------------|
| Accumulate in chat history | Reset per task |
| `/compact` to compress | State in files + git |
| Context bleeds across tasks | Each task gets full attention |
