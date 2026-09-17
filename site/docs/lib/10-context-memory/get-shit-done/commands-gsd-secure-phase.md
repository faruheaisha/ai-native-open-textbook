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
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/commands/gsd/secure-phase.md"
sourceRel: "commands/gsd/secure-phase.md"
rawUrl: "/raw/10-context-memory/get-shit-done/commands/gsd/secure-phase.md"
sourceSha256: "19c9e164d11796983646f5f5f7b891c3abe84bf40b51d8408c938df26af64429"
pageSha256: "19c9e164d11796983646f5f5f7b891c3abe84bf40b51d8408c938df26af64429"
contentMode: "local-full"
zh: ""
---

# GSD（Get Shit Done）工作流文档

&lt;objective>
Verify threat mitigations for a completed phase. Three states:
- (A) SECURITY.md exists — audit and verify mitigations
- (B) No SECURITY.md, PLAN.md with threat model exists — run from artifacts
- (C) Phase not executed — exit with guidance

Output: updated SECURITY.md.
&lt;/objective>

&lt;execution_context>
@~/.claude/get-shit-done/workflows/secure-phase.md
&lt;/execution_context>

&lt;context>
Phase: $ARGUMENTS — optional, defaults to last completed phase.
&lt;/context>

&lt;process>
Execute end-to-end.
Preserve all workflow gates.
&lt;/process>
