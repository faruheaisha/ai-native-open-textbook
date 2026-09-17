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
pageSha256: "824d09d69304d92058b87599dce6dd1956bb01303730903736a391a914dde957"
contentMode: "local-full"
zh: ""
---

#### Decision Tree: Which to Use?

```
Does correctness require guaranteed ordering, retries, a required artifact, or a hard stop?
├─ Yes → Use a HOOK, SCRIPT, CI JOB, or DYNAMIC WORKFLOW
│        Keep judgment in a skill only when the model must interpret a case.
│
└─ No → Is this reusable knowledge or an adaptable procedure?
        ├─ Yes → Use a SKILL
        │        Manual-only if timing or side effects require user control.
        │
        └─ No → Does this need isolated context or parallel work?
                ├─ Yes → Use an AGENT
                │        Example: code-reviewer, performance-auditor
                │
                └─ No → Just write it in CLAUDE.md as instructions
```

> **Starting heuristic, not a platform rule**: content relevant to most sessions belongs in `CLAUDE.md`; procedures and references used occasionally belong in skills. Measure your own session mix before using a numeric threshold. Skill descriptions still consume context while visible, and the full body enters the conversation when invoked.

> **See also**: [Memory Loading Comparison](#memory-loading-comparison) for a broader decision tree covering all seven mechanisms (including Hooks, MCP, and CLAUDE.md vs rules). To automate detection of what belongs in each category, use [`cc-sessions discover`](#session-pattern-discovery), which applies this 20% threshold to your actual session history.
