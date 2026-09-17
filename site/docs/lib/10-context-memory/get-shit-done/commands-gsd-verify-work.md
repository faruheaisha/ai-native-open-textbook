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
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/commands/gsd/verify-work.md"
sourceRel: "commands/gsd/verify-work.md"
rawUrl: "/raw/10-context-memory/get-shit-done/commands/gsd/verify-work.md"
sourceSha256: "e51c337793b20f922c398a30a7036b616b8e1d2de48692093875c4e886ba8a7a"
pageSha256: "e51c337793b20f922c398a30a7036b616b8e1d2de48692093875c4e886ba8a7a"
contentMode: "local-full"
zh: ""
---

# GSD（Get Shit Done）工作流文档

&lt;objective>
Validate built features through conversational testing with persistent state.

Purpose: Confirm what Claude built actually works from user's perspective. One test at a time, plain text responses, no interrogation. When issues are found, automatically diagnose, plan fixes, and prepare for execution.

Output: \{phase_num\}-UAT.md tracking all test results. If issues found: diagnosed gaps, verified fix plans ready for /gsd:execute-phase
&lt;/objective>

&lt;execution_context>
@~/.claude/get-shit-done/workflows/verify-work.md
@~/.claude/get-shit-done/templates/UAT.md
&lt;/execution_context>

&lt;context>
Phase: $ARGUMENTS (optional)
- If provided: Test specific phase (e.g., "4")
- If not provided: Check for active sessions or prompt for phase

Context files are resolved inside the workflow (`init verify-work`) and delegated via `<files_to_read>` blocks.
&lt;/context>

&lt;process>
Execute end-to-end.
Preserve all workflow gates (session management, test presentation, diagnosis, fix planning, routing).
&lt;/process>
