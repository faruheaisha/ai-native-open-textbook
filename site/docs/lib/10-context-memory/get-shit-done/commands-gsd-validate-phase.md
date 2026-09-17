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
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/commands/gsd/validate-phase.md"
sourceRel: "commands/gsd/validate-phase.md"
rawUrl: "/raw/10-context-memory/get-shit-done/commands/gsd/validate-phase.md"
sourceSha256: "7f44d444ebf409919e1e624e251ebead617fbae7c2c46bd8428eab6f756c58bc"
pageSha256: "7f44d444ebf409919e1e624e251ebead617fbae7c2c46bd8428eab6f756c58bc"
contentMode: "local-full"
zh: ""
---

# GSD（Get Shit Done）工作流文档

&lt;objective>
Audit Nyquist validation coverage for a completed phase. Three states:
- (A) VALIDATION.md exists — audit and fill gaps
- (B) No VALIDATION.md, SUMMARY.md exists — reconstruct from artifacts
- (C) Phase not executed — exit with guidance

Output: updated VALIDATION.md + generated test files.
&lt;/objective>

&lt;execution_context>
@~/.claude/get-shit-done/workflows/validate-phase.md
&lt;/execution_context>

&lt;context>
Phase: $ARGUMENTS — optional, defaults to last completed phase.
&lt;/context>

&lt;process>
Execute end-to-end.
Preserve all workflow gates.
&lt;/process>
