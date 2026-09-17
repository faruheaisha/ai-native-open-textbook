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
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/commands/gsd/help.md"
sourceRel: "commands/gsd/help.md"
rawUrl: "/raw/10-context-memory/get-shit-done/commands/gsd/help.md"
sourceSha256: "2fea123d0368cb965bdf7d703e2e69db4feee6f7f9f84073a6e743c6e1f1ea04"
pageSha256: "2fea123d0368cb965bdf7d703e2e69db4feee6f7f9f84073a6e743c6e1f1ea04"
contentMode: "local-full"
zh: ""
---

# GSD（Get Shit Done）工作流文档

&lt;objective>
Display GSD help at the tier the user asked for: brief (one-line refresher), default (one-page tour), full (complete reference), a single topic section, or a compact scoped lookup of one topic (`--brief <topic>`: signature + one-line summary).

Output ONLY the reference content of the chosen tier. Do NOT add:
- Project-specific analysis
- Git status or file context
- Next-step suggestions
- Any commentary beyond the reference
&lt;/objective>

&lt;execution_context>
@~/.claude/get-shit-done/workflows/help.md
&lt;/execution_context>

&lt;context>
Arguments: $ARGUMENTS
&lt;/context>

&lt;process>
Follow ~/.claude/get-shit-done/workflows/help.md with $ARGUMENTS.
&lt;/process>
