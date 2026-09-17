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
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/commands/gsd/spike.md"
sourceRel: "commands/gsd/spike.md"
rawUrl: "/raw/10-context-memory/get-shit-done/commands/gsd/spike.md"
sourceSha256: "83653f72e8967438f81ef1cf8bb0eefbcb0831fff44cd8c071ad031459dfe1b9"
pageSha256: "83653f72e8967438f81ef1cf8bb0eefbcb0831fff44cd8c071ad031459dfe1b9"
contentMode: "local-full"
zh: ""
---

# GSD（Get Shit Done）工作流文档

&lt;objective>
Spike an idea through experiential exploration — build focused experiments to feel the pieces
of a future app, validate feasibility, and produce verified knowledge for the real build.
Spikes live in `.planning/spikes/` and integrate with GSD commit patterns, state tracking,
and handoff workflows.

Two modes:
- **Idea mode** (default) — describe an idea to spike
- **Frontier mode** (no argument or "frontier") — analyzes existing spike landscape and proposes integration and frontier spikes

Does not require prior new-project setup — auto-creates `.planning/spikes/` if needed.
&lt;/objective>

&lt;execution_context>
@~/.claude/get-shit-done/workflows/spike.md
@~/.claude/get-shit-done/workflows/spike-wrap-up.md
@~/.claude/get-shit-done/references/ui-brand.md
&lt;/execution_context>

&lt;runtime_note>
**Copilot (VS Code):** Use `vscode_askquestions` wherever this workflow calls `AskUserQuestion`.
&lt;/runtime_note>

&lt;context>
Idea: $ARGUMENTS

**Available flags:**
- `--quick` — Skip decomposition/alignment, jump straight to building. Use when you already know what to spike.
- `--text` — Use plain-text numbered lists instead of AskUserQuestion (for non-Claude runtimes).
- `--wrap-up` — Package spike findings into a persistent project skill for future build conversations. Runs the spike-wrap-up workflow.
&lt;/context>

&lt;process>
Parse the first token of $ARGUMENTS:
- If it is `--wrap-up`: strip the flag, execute the spike-wrap-up workflow
- Otherwise: pass all of $ARGUMENTS as the idea to the spike workflow end-to-end.

Preserve all workflow gates (prior spike check, decomposition, research, risk ordering, observability assessment, verification, MANIFEST updates, commit patterns).
&lt;/process>
