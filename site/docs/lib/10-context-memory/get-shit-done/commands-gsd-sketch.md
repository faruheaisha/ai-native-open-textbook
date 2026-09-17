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
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/commands/gsd/sketch.md"
sourceRel: "commands/gsd/sketch.md"
rawUrl: "/raw/10-context-memory/get-shit-done/commands/gsd/sketch.md"
sourceSha256: "be6a7f7d2309b2a899c2c2f9977e68e7279fd808ce7bbe65033b91d03381a995"
pageSha256: "be6a7f7d2309b2a899c2c2f9977e68e7279fd808ce7bbe65033b91d03381a995"
contentMode: "local-full"
zh: ""
---

# GSD（Get Shit Done）工作流文档

&lt;objective>
Explore design directions through throwaway HTML mockups before committing to implementation.
Each sketch produces 2-3 variants for comparison. Sketches live in `.planning/sketches/` and
integrate with GSD commit patterns, state tracking, and handoff workflows. Loads spike
findings to ground mockups in real data shapes and validated interaction patterns.

Two modes:
- **Idea mode** (default) — describe a design idea to sketch
- **Frontier mode** (no argument or "frontier") — analyzes existing sketch landscape and proposes consistency and frontier sketches

Does not require prior new-project setup — auto-creates `.planning/sketches/` if needed.
&lt;/objective>

&lt;execution_context>
@~/.claude/get-shit-done/workflows/sketch.md
@~/.claude/get-shit-done/workflows/sketch-wrap-up.md
@~/.claude/get-shit-done/references/ui-brand.md
@~/.claude/get-shit-done/references/sketch-theme-system.md
@~/.claude/get-shit-done/references/sketch-interactivity.md
@~/.claude/get-shit-done/references/sketch-tooling.md
@~/.claude/get-shit-done/references/sketch-variant-patterns.md
&lt;/execution_context>

&lt;runtime_note>
**Copilot (VS Code):** Use `vscode_askquestions` wherever this workflow calls `AskUserQuestion`.
&lt;/runtime_note>

&lt;context>
Design idea: $ARGUMENTS

**Available flags:**
- `--quick` — Skip mood/direction intake, jump straight to decomposition and building. Use when the design direction is already clear.
- `--wrap-up` — Package sketch design findings into a persistent project skill for future build conversations. Runs the sketch-wrap-up workflow.
&lt;/context>

&lt;process>
Parse the first token of $ARGUMENTS:
- If it is `--wrap-up`: strip the flag, execute the sketch-wrap-up workflow end-to-end.
- Otherwise: execute the sketch workflow end-to-end.

Preserve all workflow gates (intake, decomposition, target stack research, variant evaluation, MANIFEST updates, commit patterns).
&lt;/process>
