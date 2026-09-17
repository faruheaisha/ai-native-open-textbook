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
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/commands/gsd/plan-phase.md"
sourceRel: "commands/gsd/plan-phase.md"
rawUrl: "/raw/10-context-memory/get-shit-done/commands/gsd/plan-phase.md"
sourceSha256: "0be581962a06bebab0b718dd21d4ff62525b1e58914ecec1453212362654c13b"
pageSha256: "0be581962a06bebab0b718dd21d4ff62525b1e58914ecec1453212362654c13b"
contentMode: "local-full"
zh: ""
---

# GSD（Get Shit Done）工作流文档

&lt;objective>
Create executable phase prompts (PLAN.md files) for a roadmap phase with integrated research and verification.

**Default flow:** Research (if needed) → Plan → Verify → Done

**Research-only mode (`--research-phase <N>`):** Spawn `gsd-phase-researcher` for phase `N`, write `RESEARCH.md`, then exit before the planner runs. Useful for cross-phase research, doc review before committing to a planning approach, and correction-without-replanning loops where iterating on research alone is dramatically cheaper than re-spawning the planner. Replaces the deleted research-phase command (#3042).

**Research-only modifiers:**
- **No flag** — when `RESEARCH.md` already exists, prompt the user to choose `update / view / skip`.
- **`--research`** — force-refresh: re-spawn the researcher unconditionally, no prompt. Skips the existing-RESEARCH.md menu.
- **`--view`** — view-only: print existing `RESEARCH.md` to stdout. Does not spawn the researcher. Cheapest mode for the correction-without-replanning loop. If no `RESEARCH.md` exists yet, errors with a hint to drop `--view`.

**Orchestrator role:** Parse arguments, validate phase, research domain (unless skipped), spawn gsd-planner, verify with gsd-plan-checker, iterate until pass or max iterations, present results.
&lt;/objective>

&lt;execution_context>
@~/.claude/get-shit-done/workflows/plan-phase.md
@~/.claude/get-shit-done/references/ui-brand.md
&lt;/execution_context>

&lt;runtime_note>
**Copilot (VS Code):** Use `vscode_askquestions` wherever this workflow calls `AskUserQuestion`. They are equivalent — `vscode_askquestions` is the VS Code Copilot implementation of the same interactive question API. Do not skip questioning steps because `AskUserQuestion` appears unavailable; use `vscode_askquestions` instead.
&lt;/runtime_note>

&lt;context>
Phase number: $ARGUMENTS (optional — auto-detects next unplanned phase if omitted)

**Flags:**
- `--research` — Force re-research even if RESEARCH.md exists
- `--skip-research` — Skip research, go straight to planning
- `--gaps` — Gap closure mode (reads VERIFICATION.md, skips research)
- `--skip-verify` — Skip verification loop
- `--prd <file>` — Use a PRD/acceptance criteria file instead of discuss-phase. Parses requirements into CONTEXT.md automatically. Skips discuss-phase entirely.
