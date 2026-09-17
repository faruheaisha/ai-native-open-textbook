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
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/commands/gsd/ui-review.md"
sourceRel: "commands/gsd/ui-review.md"
rawUrl: "/raw/10-context-memory/get-shit-done/commands/gsd/ui-review.md"
sourceSha256: "91e1ecbc3174425213a63d168daa2bef88b657c84a181ab46d414631a9aa8b9f"
pageSha256: "91e1ecbc3174425213a63d168daa2bef88b657c84a181ab46d414631a9aa8b9f"
contentMode: "local-full"
zh: ""
---

# GSD（Get Shit Done）工作流文档

&lt;objective>
Conduct a retroactive 6-pillar visual audit. Produces UI-REVIEW.md with
graded assessment (1-4 per pillar). Works on any project.
Output: \{phase_num\}-UI-REVIEW.md
&lt;/objective>

&lt;execution_context>
@~/.claude/get-shit-done/workflows/ui-review.md
@~/.claude/get-shit-done/references/ui-brand.md
&lt;/execution_context>

&lt;context>
Phase: $ARGUMENTS — optional, defaults to last completed phase.
&lt;/context>

&lt;process>
Execute end-to-end.
Preserve all workflow gates.
&lt;/process>
