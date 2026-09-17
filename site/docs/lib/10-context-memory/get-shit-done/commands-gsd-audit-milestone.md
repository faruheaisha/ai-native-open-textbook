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
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/commands/gsd/audit-milestone.md"
sourceRel: "commands/gsd/audit-milestone.md"
rawUrl: "/raw/10-context-memory/get-shit-done/commands/gsd/audit-milestone.md"
sourceSha256: "44f39690881c2f3ac6f6b2fb8d3a86b036cf2e6f6cb32bf7cb9feef5234c96bb"
pageSha256: "44f39690881c2f3ac6f6b2fb8d3a86b036cf2e6f6cb32bf7cb9feef5234c96bb"
contentMode: "local-full"
zh: ""
---

# GSD（Get Shit Done）工作流文档

&lt;objective>
Verify milestone achieved its definition of done. Check requirements coverage, cross-phase integration, and end-to-end flows.

**This command IS the orchestrator.** Reads existing VERIFICATION.md files (phases already verified during execute-phase), aggregates tech debt and deferred gaps, then spawns integration checker for cross-phase wiring.
&lt;/objective>

&lt;execution_context>
@~/.claude/get-shit-done/workflows/audit-milestone.md
&lt;/execution_context>

&lt;context>
Version: $ARGUMENTS (optional — defaults to current milestone)

Core planning files are resolved in-workflow (`init milestone-op`) and loaded only as needed.

**Completed Work:**
Glob: .planning/phases/*/*-SUMMARY.md
Glob: .planning/phases/*/*-VERIFICATION.md
&lt;/context>

&lt;process>
Execute end-to-end.
Preserve all workflow gates (scope determination, verification reading, integration check, requirements coverage, routing).
&lt;/process>
