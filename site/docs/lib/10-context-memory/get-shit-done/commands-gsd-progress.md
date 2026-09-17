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
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/commands/gsd/progress.md"
sourceRel: "commands/gsd/progress.md"
rawUrl: "/raw/10-context-memory/get-shit-done/commands/gsd/progress.md"
sourceSha256: "3e4236615580030f3fa842f9103464adcb218789e974e6076ea965377f615152"
pageSha256: "3e4236615580030f3fa842f9103464adcb218789e974e6076ea965377f615152"
contentMode: "local-full"
zh: ""
---

# GSD（Get Shit Done）工作流文档

&lt;objective>
Check project progress, summarize recent work and what's ahead, then intelligently route to the next action.

Three modes:
- **default**: Show progress report + intelligently route to the next action (execute or plan). Provides situational awareness before continuing work.
- **--next**: Automatically advance to the next logical step without manual route selection. Reads STATE.md, ROADMAP.md, and phase directories. Supports `--force` to bypass safety gates.
- **--do "task description"**: Analyze freeform natural language and dispatch to the most appropriate GSD command. Never does the work itself — matches intent, confirms, hands off.
- **--forensic**: Append a 6-check integrity audit after the standard progress report.
&lt;/objective>

&lt;flags>
- **--next**: Detect current project state and automatically invoke the next logical GSD workflow step. Scans all prior phases for incomplete work before routing. `--next --force` bypasses safety gates.
- **--do "..."**: Smart dispatcher — match freeform intent to the best GSD command using routing rules, confirm the match, then hand off.
- **--forensic**: Run 6-check integrity audit after the standard progress report.
- **(no flag)**: Standard progress check + intelligent routing (Routes A through F).
&lt;/flags>

&lt;execution_context>
@~/.claude/get-shit-done/workflows/progress.md
@~/.claude/get-shit-done/workflows/next.md
@~/.claude/get-shit-done/workflows/do.md
@~/.claude/get-shit-done/references/ui-brand.md
&lt;/execution_context>

&lt;process>
Arguments provided: "$ARGUMENTS"
Parse the first token from the provided arguments:
- If it is `--next`: strip the flag, execute the next workflow (passing remaining args e.g. --force).
- If it is `--do`: strip the flag, pass remainder as freeform intent to the do workflow.
- Otherwise: execute the progress workflow end-to-end (pass --forensic through if present).

Preserve all routing logic from the target workflow.
&lt;/process>
