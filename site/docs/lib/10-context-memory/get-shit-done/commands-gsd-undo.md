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
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/commands/gsd/undo.md"
sourceRel: "commands/gsd/undo.md"
rawUrl: "/raw/10-context-memory/get-shit-done/commands/gsd/undo.md"
sourceSha256: "4ac15db05e2d69701c82a099331bf3d4634bd456eae41d9fdf8e06a76db0adc5"
pageSha256: "4ac15db05e2d69701c82a099331bf3d4634bd456eae41d9fdf8e06a76db0adc5"
contentMode: "local-full"
zh: ""
---

# GSD（Get Shit Done）工作流文档

&lt;objective>
Safe git revert — roll back GSD phase or plan commits using the phase manifest, with dependency checks and a confirmation gate before execution.

Three modes:
- **--last N**: Show recent GSD commits for interactive selection
- **--phase NN**: Revert all commits for a phase (manifest + git log fallback)
- **--plan NN-MM**: Revert all commits for a specific plan
&lt;/objective>

&lt;execution_context>
@~/.claude/get-shit-done/workflows/undo.md
@~/.claude/get-shit-done/references/ui-brand.md
@~/.claude/get-shit-done/references/gate-prompts.md
&lt;/execution_context>

&lt;context>
$ARGUMENTS
&lt;/context>

&lt;process>
Execute end-to-end.
&lt;/process>
