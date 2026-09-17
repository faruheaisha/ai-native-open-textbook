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
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/commands/gsd/add-tests.md"
sourceRel: "commands/gsd/add-tests.md"
rawUrl: "/raw/10-context-memory/get-shit-done/commands/gsd/add-tests.md"
sourceSha256: "56cc9f469483c9c21ed1d1674343e0a86bdb06b4e2654e2382b7a686d7d731e7"
pageSha256: "56cc9f469483c9c21ed1d1674343e0a86bdb06b4e2654e2382b7a686d7d731e7"
contentMode: "local-full"
zh: ""
---

# GSD（Get Shit Done）工作流文档

&lt;objective>
Generate unit and E2E tests for a completed phase, using its SUMMARY.md, CONTEXT.md, and VERIFICATION.md as specifications.

Analyzes implementation files, classifies them into TDD (unit), E2E (browser), or Skip categories, presents a test plan for user approval, then generates tests following RED-GREEN conventions.

Output: Test files committed with message `test(phase-\{N\}): add unit and E2E tests from add-tests command`
&lt;/objective>

&lt;execution_context>
@~/.claude/get-shit-done/workflows/add-tests.md
&lt;/execution_context>

&lt;context>
Phase: $ARGUMENTS

@.planning/STATE.md
@.planning/ROADMAP.md
&lt;/context>

&lt;process>
Execute end-to-end.
Preserve all workflow gates (classification approval, test plan approval, RED-GREEN verification, gap reporting).
&lt;/process>
