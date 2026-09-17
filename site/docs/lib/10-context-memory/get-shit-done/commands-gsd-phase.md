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
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/commands/gsd/phase.md"
sourceRel: "commands/gsd/phase.md"
rawUrl: "/raw/10-context-memory/get-shit-done/commands/gsd/phase.md"
sourceSha256: "65c06eec0474a6f190a1c37e13822489e007276e83065d7e4f49ba44b9299f32"
pageSha256: "65c06eec0474a6f190a1c37e13822489e007276e83065d7e4f49ba44b9299f32"
contentMode: "local-full"
zh: ""
---

# GSD（Get Shit Done）工作流文档

&lt;objective>
Manage phases in ROADMAP.md with a single consolidated command.

Mode routing:
- **default** (no flag): Add a new integer phase to the end of the current milestone → add-phase workflow
- **--insert**: Insert urgent work as a decimal phase (e.g., 72.1) between existing phases → insert-phase workflow
- **--remove**: Remove a future phase and renumber subsequent phases → remove-phase workflow
- **--edit**: Edit any field of an existing phase in place → edit-phase workflow
&lt;/objective>

&lt;routing>

| Flag | Action | Workflow |
|------|--------|----------|
| (none) | Add new integer phase at end of milestone | add-phase |
| --insert | Insert decimal phase (e.g., 72.1) after specified phase | insert-phase |
| --remove | Remove future phase, renumber subsequent | remove-phase |
| --edit | Edit fields of existing phase in place | edit-phase |

&lt;/routing>

&lt;execution_context>
@~/.claude/get-shit-done/workflows/add-phase.md
@~/.claude/get-shit-done/workflows/insert-phase.md
@~/.claude/get-shit-done/workflows/remove-phase.md
@~/.claude/get-shit-done/workflows/edit-phase.md
&lt;/execution_context>

&lt;context>
Arguments: $ARGUMENTS

Parse the first token of $ARGUMENTS:
