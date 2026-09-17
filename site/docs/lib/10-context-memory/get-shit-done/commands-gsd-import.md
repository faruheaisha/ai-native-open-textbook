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
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/commands/gsd/import.md"
sourceRel: "commands/gsd/import.md"
rawUrl: "/raw/10-context-memory/get-shit-done/commands/gsd/import.md"
sourceSha256: "9551dc2d3a56ca279ec326b65089e3526816d11271be233ba18a1141a6769c26"
pageSha256: "9551dc2d3a56ca279ec326b65089e3526816d11271be233ba18a1141a6769c26"
contentMode: "local-full"
zh: ""
---

# GSD（Get Shit Done）工作流文档

&lt;objective>
Import external plan files into the GSD planning system with conflict detection against PROJECT.md decisions.

- **--from**: Import an external plan file, detect conflicts, write as GSD PLAN.md, validate via gsd-plan-checker.
- **--from-gsd2**: Reverse-migrate a GSD-2 project (`.gsd/` directory) back to GSD v1 (`.planning/`) format. Runs `gsd-tools.cjs from-gsd2`. Pass `--path <dir>` to migrate a project at a different path.
&lt;/objective>

&lt;execution_context>
@~/.claude/get-shit-done/workflows/import.md
@~/.claude/get-shit-done/references/ui-brand.md
@~/.claude/get-shit-done/references/gate-prompts.md
@~/.claude/get-shit-done/references/doc-conflict-engine.md
&lt;/execution_context>

&lt;context>
$ARGUMENTS
&lt;/context>

&lt;process>
If `--from-gsd2` is in $ARGUMENTS:
Run: `node "$HOME/.claude/get-shit-done/bin/gsd-tools.cjs" from-gsd2`
Pass `--path <dir>` if provided. Present the migration result to the user.
Stop here (do not run the standard import workflow).

Otherwise, execute the import workflow end-to-end.
&lt;/process>
