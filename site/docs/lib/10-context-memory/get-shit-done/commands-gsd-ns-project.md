---
title: "GSD（Get Shit Done）工作流文档"
sourceId: "10-context-memory/get-shit-done"
sourceTitle: "GSD（Get Shit Done）工作流文档"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/gsd-build/get-shit-done"
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/commands/gsd/ns-project.md"
sourceRel: "commands/gsd/ns-project.md"
rawUrl: "/raw/10-context-memory/get-shit-done/commands/gsd/ns-project.md"
sourceSha256: "2aec370ce2e8c271de618b9530c852dac93a077a68b2324942889828867f2a20"
pageSha256: "2aec370ce2e8c271de618b9530c852dac93a077a68b2324942889828867f2a20"
contentMode: "local-full"
zh: ""
---

# GSD（Get Shit Done）工作流文档

Route to the appropriate project / milestone skill based on the user's intent.
`gsd-plan-milestone-gaps` was deleted by #2790 — gap planning now happens
inline as part of `gsd-audit-milestone`'s output.

| User wants | Invoke |
|---|---|
| Start a new project | gsd-new-project |
| Create a new milestone | gsd-new-milestone |
| Complete the current milestone | gsd-complete-milestone |
| Audit a milestone for issues | gsd-audit-milestone |
| Summarize milestone status | gsd-milestone-summary |

Invoke the matched skill directly using the Skill tool.
