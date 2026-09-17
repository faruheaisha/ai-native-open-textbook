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
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/commands/gsd/eval-review.md"
sourceRel: "commands/gsd/eval-review.md"
rawUrl: "/raw/10-context-memory/get-shit-done/commands/gsd/eval-review.md"
sourceSha256: "206bfe62149ad12afdd7c536bb8ccabc5f94d4f62642c8fcc6f9007f6de727ae"
pageSha256: "206bfe62149ad12afdd7c536bb8ccabc5f94d4f62642c8fcc6f9007f6de727ae"
contentMode: "local-full"
zh: ""
---

# GSD（Get Shit Done）工作流文档

&lt;objective>
Conduct a retroactive evaluation coverage audit of a completed AI phase.
Checks whether the evaluation strategy from AI-SPEC.md was implemented.
Produces EVAL-REVIEW.md with score, verdict, gaps, and remediation plan.
&lt;/objective>

&lt;execution_context>
@~/.claude/get-shit-done/workflows/eval-review.md
@~/.claude/get-shit-done/references/ai-evals.md
&lt;/execution_context>

&lt;context>
Phase: $ARGUMENTS — optional, defaults to last completed phase.
&lt;/context>

&lt;process>
Execute end-to-end.
Preserve all workflow gates.
&lt;/process>
