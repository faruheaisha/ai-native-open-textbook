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
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/commands/gsd/ai-integration-phase.md"
sourceRel: "commands/gsd/ai-integration-phase.md"
rawUrl: "/raw/10-context-memory/get-shit-done/commands/gsd/ai-integration-phase.md"
sourceSha256: "37f1098e31826a7c4081d7fa544c4f126b02077d1a8f314fcd5d63fc3de3f358"
pageSha256: "37f1098e31826a7c4081d7fa544c4f126b02077d1a8f314fcd5d63fc3de3f358"
contentMode: "local-full"
zh: ""
---

# GSD（Get Shit Done）工作流文档

&lt;objective>
Create an AI design contract (AI-SPEC.md) for a phase involving AI system development.
Orchestrates gsd-framework-selector → gsd-ai-researcher → gsd-domain-researcher → gsd-eval-planner.
Flow: Select Framework → Research Docs → Research Domain → Design Eval Strategy → Done
&lt;/objective>

&lt;execution_context>
@~/.claude/get-shit-done/workflows/ai-integration-phase.md
@~/.claude/get-shit-done/references/ai-frameworks.md
@~/.claude/get-shit-done/references/ai-evals.md
&lt;/execution_context>

&lt;context>
Phase number: $ARGUMENTS — optional, auto-detects next unplanned phase if omitted.
&lt;/context>

&lt;process>
Execute end-to-end.
Preserve all workflow gates.
&lt;/process>
