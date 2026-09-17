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
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/commands/gsd/ultraplan-phase.md"
sourceRel: "commands/gsd/ultraplan-phase.md"
rawUrl: "/raw/10-context-memory/get-shit-done/commands/gsd/ultraplan-phase.md"
sourceSha256: "b543d90d84de69989fe4c53ea0ef11bdc55000bdd9fc24c3eadd266095e06007"
pageSha256: "b543d90d84de69989fe4c53ea0ef11bdc55000bdd9fc24c3eadd266095e06007"
contentMode: "local-full"
zh: ""
---

# GSD（Get Shit Done）工作流文档

&lt;objective>
Offload GSD's plan phase to Claude Code's ultraplan cloud infrastructure.

Ultraplan drafts the plan in a remote cloud session while your terminal stays free.
Review and comment on the plan in your browser, then import it back via /gsd:import --from.

⚠ BETA: ultraplan is in research preview. Use /gsd:plan-phase for stable local planning.
Requirements: Claude Code v2.1.91+, claude.ai account, GitHub repository.
&lt;/objective>

&lt;execution_context>
@~/.claude/get-shit-done/workflows/ultraplan-phase.md
@~/.claude/get-shit-done/references/ui-brand.md
&lt;/execution_context>

&lt;context>
$ARGUMENTS
&lt;/context>

&lt;process>
Execute the ultraplan-phase workflow end-to-end.
&lt;/process>
