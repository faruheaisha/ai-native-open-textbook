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
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/commands/gsd/autonomous.md"
sourceRel: "commands/gsd/autonomous.md"
rawUrl: "/raw/10-context-memory/get-shit-done/commands/gsd/autonomous.md"
sourceSha256: "ab9dfa8012540f4b7c4bb5d30d47cf678c2bc4b4b5d0353578beaec2d554d393"
pageSha256: "ab9dfa8012540f4b7c4bb5d30d47cf678c2bc4b4b5d0353578beaec2d554d393"
contentMode: "local-full"
zh: ""
---

# GSD（Get Shit Done）工作流文档

&lt;objective>
Execute all remaining milestone phases autonomously. For each phase: discuss → plan → execute. Pauses only for user decisions (grey area acceptance, blockers, validation requests).

Uses ROADMAP.md phase discovery and Skill() flat invocations for each phase command. After all phases complete: milestone audit → complete → cleanup.

**Creates/Updates:**
- `.planning/STATE.md` — updated after each phase
- `.planning/ROADMAP.md` — progress updated after each phase
- Phase artifacts — CONTEXT.md, PLANs, SUMMARYs per phase

**After:** Milestone is complete and cleaned up.
&lt;/objective>

&lt;execution_context>
@~/.claude/get-shit-done/workflows/autonomous.md
@~/.claude/get-shit-done/references/ui-brand.md
&lt;/execution_context>

&lt;context>
Optional flags:
- `--from N` — start from phase N instead of the first incomplete phase.
- `--to N` — stop after phase N completes (halt instead of advancing to next phase).
- `--only N` — execute only phase N (single-phase mode).
- `--interactive` — run discuss inline with questions (not auto-answered), then dispatch plan→execute as background agents. Keeps the main context lean while preserving user input on decisions.

Project context, phase list, and state are resolved inside the workflow using init commands (`gsd-sdk query init.milestone-op`, `gsd-sdk query roadmap.analyze`). No upfront context loading needed.
&lt;/context>

&lt;process>
Execute end-to-end.
Preserve all workflow gates (phase discovery, per-phase execution, blocker handling, progress display).
&lt;/process>
