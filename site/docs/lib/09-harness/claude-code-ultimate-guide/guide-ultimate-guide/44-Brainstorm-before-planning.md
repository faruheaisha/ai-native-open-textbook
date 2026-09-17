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
pageSha256: "ffe03204171511b30b8b8004ed5969e00fdbe98930b558e8a8a5651a1fc1894b"
contentMode: "local-full"
zh: ""
---

#### Brainstorm-before-planning

One specific pattern from compound-engineering that works independently: before creating a plan, check if relevant thinking already exists.

The instruction to add to CLAUDE.md or an agent:

```
Before creating a plan for any feature or problem, check docs/brainstorms/ for existing
thinking on this topic. If a brainstorm exists, use it as input. If not, create a new
brainstorm file before writing the plan.
```

The brainstorm document is not a plan. It explores the problem space: what we know, what we don't know, what we've tried before, what constraints exist. The plan comes after. Most teams skip this step and write plans that repeat reasoning already done in a previous session.
