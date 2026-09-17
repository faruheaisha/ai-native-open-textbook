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
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/commands/gsd/ns-review.md"
sourceRel: "commands/gsd/ns-review.md"
rawUrl: "/raw/10-context-memory/get-shit-done/commands/gsd/ns-review.md"
sourceSha256: "19d9f1fbcf6778142a664658595445027f59dfdbd129c850636979df577cabee"
pageSha256: "19d9f1fbcf6778142a664658595445027f59dfdbd129c850636979df577cabee"
contentMode: "local-full"
zh: ""
---

# GSD（Get Shit Done）工作流文档

Route to the appropriate quality / review skill based on the user's intent.
`gsd-code-review-fix` was absorbed by `gsd-code-review --fix` in #2790.

| User wants | Invoke |
|---|---|
| Review code for quality and correctness | gsd-code-review |
| Auto-fix code review findings | gsd-code-review --fix |
| Audit UAT / acceptance testing | gsd-audit-uat |
| Security review of a phase | gsd-secure-phase |
| Evaluate AI response quality | gsd-eval-review |
| Review UI for design and accessibility | gsd-ui-review |
| Validate phase outputs | gsd-validate-phase |
| Debug a failing feature or error | gsd-debug |
| Forensic investigation of a broken system | gsd-forensics |

Invoke the matched skill directly using the Skill tool.
