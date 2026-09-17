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
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/commands/gsd/ui-phase.md"
sourceRel: "commands/gsd/ui-phase.md"
rawUrl: "/raw/10-context-memory/get-shit-done/commands/gsd/ui-phase.md"
sourceSha256: "aeeda67dca286cf13cfd1dbb5a19caae094a5c13ac566637618badc852ce2888"
pageSha256: "aeeda67dca286cf13cfd1dbb5a19caae094a5c13ac566637618badc852ce2888"
contentMode: "local-full"
zh: ""
---

# GSD（Get Shit Done）工作流文档

&lt;objective>
Create a UI design contract (UI-SPEC.md) for a frontend phase.
Orchestrates gsd-ui-researcher and gsd-ui-checker.
Flow: Validate → Research UI → Verify UI-SPEC → Done
&lt;/objective>

&lt;execution_context>
@~/.claude/get-shit-done/workflows/ui-phase.md
@~/.claude/get-shit-done/references/ui-brand.md
&lt;/execution_context>

&lt;context>
Phase number: $ARGUMENTS — optional, auto-detects next unplanned phase if omitted.
&lt;/context>

&lt;process>
Execute end-to-end.
Preserve all workflow gates.
&lt;/process>
