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
pageSha256: "e4d2524d8c52219504e6a303b8ce6025dee5a73df9aae7b3816c5f51ba803643"
contentMode: "local-full"
zh: ""
---

#### Detailed Comparison

| Aspect | Skills (user-invocable) | Skills (model-invocable) | Agents |
|--------|------------------------|--------------------------|--------|
| **What it is** | Workflow template | Knowledge module | Context isolation tool |
| **Location** | `.claude/skills/` | `.claude/skills/` | `.claude/agents/` |
| **Invocation** | `/skill-name` (user types) | Auto-loaded by model | Task tool delegation |
| **Frontmatter** | `disable-model-invocation: true` | Default (no flag needed) | n/a |
| **Execution** | In main conversation | Loaded into context | Separate subprocess |
| **Context** | Shares main context | Adds to agent context | Isolated context |
| **Best for** | Repeatable manual workflows | Reusable knowledge | Scope-limited analysis |
| **Token cost** | Low (template only) | Medium (knowledge loaded) | High (full agent) |
| **Examples** | `/commit`, `/pr`, `/ship` | TDD, security-guardian | security-audit, perf-audit |
