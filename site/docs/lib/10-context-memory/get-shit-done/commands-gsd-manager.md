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
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/commands/gsd/manager.md"
sourceRel: "commands/gsd/manager.md"
rawUrl: "/raw/10-context-memory/get-shit-done/commands/gsd/manager.md"
sourceSha256: "f3d33125c462d411d3afb6c1025bc1f9dbd020128a3346ab0047cf8c8be5ec32"
pageSha256: "f3d33125c462d411d3afb6c1025bc1f9dbd020128a3346ab0047cf8c8be5ec32"
contentMode: "local-full"
zh: ""
---

# GSD（Get Shit Done）工作流文档

&lt;objective>
Single-terminal command center for managing a milestone. Shows a dashboard of all phases with visual status indicators, recommends optimal next actions, and dispatches work — discuss runs inline, plan/execute run as background agents.

Designed for power users who want to parallelize work across phases from one terminal: discuss a phase while another plans or executes in the background.

**Creates/Updates:**
- No files created directly — dispatches to existing GSD commands via Skill() and background Task agents.
- Reads `.planning/STATE.md`, `.planning/ROADMAP.md`, phase directories for status.

**After:** User exits when done managing, or all phases complete and milestone lifecycle is suggested.
&lt;/objective>

&lt;execution_context>
@~/.claude/get-shit-done/workflows/manager.md
@~/.claude/get-shit-done/references/ui-brand.md
&lt;/execution_context>

&lt;context>
No arguments required. Requires an active milestone with ROADMAP.md and STATE.md.

Project context, phase list, dependencies, and recommendations are resolved inside the workflow using `gsd-sdk query init.manager`. No upfront context loading needed.
&lt;/context>

&lt;process>
If `--analyze-deps` is in $ARGUMENTS:
Read and execute `~/.claude/get-shit-done/workflows/analyze-dependencies.md` end-to-end.

Execute end-to-end.
Maintain the dashboard refresh loop until the user exits or all phases complete.
&lt;/process>
