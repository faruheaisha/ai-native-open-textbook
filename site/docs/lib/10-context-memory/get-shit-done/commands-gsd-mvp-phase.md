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
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/commands/gsd/mvp-phase.md"
sourceRel: "commands/gsd/mvp-phase.md"
rawUrl: "/raw/10-context-memory/get-shit-done/commands/gsd/mvp-phase.md"
sourceSha256: "6d2971996800fdecdea71fc8cb2717e91b582f8959a4974a46c6cc704dbdde28"
pageSha256: "6d2971996800fdecdea71fc8cb2717e91b582f8959a4974a46c6cc704dbdde28"
contentMode: "local-full"
zh: ""
---

# GSD（Get Shit Done）工作流文档

&lt;objective>
Guide the user through MVP-mode planning for a phase. The command:

1. Prompts for an "As a / I want to / So that" user story (three structured questions)
2. Runs SPIDR splitting check — if the story is too large, walks through Spike/Paths/Interfaces/Data/Rules and offers to split into multiple phases
3. Writes `**Mode:** mvp` and the reformatted `**Goal:**` to the phase's ROADMAP.md section
4. Delegates to `/gsd plan-phase <N>` which auto-detects MVP mode via the roadmap field

Phase 1 of the vertical-mvp-slice PRD shipped the planner-side machinery; this command is the user entry point for it.
&lt;/objective>

&lt;execution_context>
@~/.claude/get-shit-done/workflows/mvp-phase.md
@~/.claude/get-shit-done/references/spidr-splitting.md
@~/.claude/get-shit-done/references/user-story-template.md
&lt;/execution_context>

&lt;runtime_note>
**Copilot (VS Code):** Use `vscode_askquestions` wherever this workflow calls `AskUserQuestion`. Equivalent API.
&lt;/runtime_note>

&lt;context>
Phase number: $ARGUMENTS (required — integer or decimal like `2.1`)

The phase must already exist in ROADMAP.md (created via `/gsd new-project`, `/gsd add-phase`, or `/gsd insert-phase`). This command does not create new phases — it converts an existing phase to MVP mode.
&lt;/context>

&lt;process>
Execute the mvp-phase workflow from @~/.claude/get-shit-done/workflows/mvp-phase.md end-to-end.
Preserve all gates: phase existence, status guard (refuse in_progress/completed), user-story format validation, SPIDR splitting check, ROADMAP write confirmation, plan-phase delegation.
&lt;/process>
