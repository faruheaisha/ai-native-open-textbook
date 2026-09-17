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
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/commands/gsd/audit-uat.md"
sourceRel: "commands/gsd/audit-uat.md"
rawUrl: "/raw/10-context-memory/get-shit-done/commands/gsd/audit-uat.md"
sourceSha256: "7247b0bf386011506595e10d24eee7500729dedc6ed7cea348422b24adca1ea2"
pageSha256: "7247b0bf386011506595e10d24eee7500729dedc6ed7cea348422b24adca1ea2"
contentMode: "local-full"
zh: ""
---

# GSD（Get Shit Done）工作流文档

&lt;objective>
Scan all phases for pending, skipped, blocked, and human_needed UAT items. Cross-reference against codebase to detect stale documentation. Produce prioritized human test plan.
&lt;/objective>

&lt;execution_context>
@~/.claude/get-shit-done/workflows/audit-uat.md
&lt;/execution_context>

&lt;context>
Core planning files are loaded in-workflow via CLI.

**Scope:**
Glob: .planning/phases/*/*-UAT.md
Glob: .planning/phases/*/*-VERIFICATION.md
&lt;/context>
