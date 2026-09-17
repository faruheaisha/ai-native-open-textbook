---
title: "AI 工程从零到一（中文）"
sourceId: "07-coding/ai-engineering-from-scratch-zh"
sourceTitle: "AI 工程从零到一（中文）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh"
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/18-ethics-safety-alignment/20-bias-representational-harm/outputs/skill-bias-eval.md"
sourceRel: "phases/18-ethics-safety-alignment/20-bias-representational-harm/outputs/skill-bias-eval.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/18-ethics-safety-alignment/20-bias-representational-harm/outputs/skill-bias-eval.md"
sourceSha256: "83f5652db1b7ca7875549700b6077e6744d123b5125651a4f8611fc6dc98facf"
pageSha256: "83f5652db1b7ca7875549700b6077e6744d123b5125651a4f8611fc6dc98facf"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

Given a bias evaluation report or fairness claim, audit across the Gallegos et al. 2024 three-category framework and the 2024-2025 intersectionality literature.

Produce:

1. Metric coverage. Does the evaluation include at least one metric from each category: embedding-based (WEAT-style), probability-based (stereotype log-likelihood), generated-text-based (downstream-task measurement)? Flag missing categories.
2. Harm-type separation. Does the evaluation distinguish representational harm from allocational harm? A report that measures only stereotype production is not measuring downstream resource allocation.
3. Intersectionality coverage. Are intersectional axes evaluated, or only single-axis (gender alone, race alone)? Per An et al. 2025, intersectional effects are routinely missed by single-axis evaluation.
4. Debias mechanism. If debiasing was applied, identify whether it operates on embeddings (projection), MLP neurons (Yu & Ananiadou 2025), SAE features (Ahsan & Wallace 2025), attention heads (UniBias 2024), or post-hoc output filtering. Estimate the general-capability cost.
5. Axis diversity. Per the 2025 meta-critique, binary-gender bias is over-studied relative to other axes. Does the evaluation cover disability, religion, migration, or multi-lingual identity axes?

Hard rejects:
- Any "debiased" claim based on a single metric category.
- Any fairness claim without intersectional evaluation.
- Any debias intervention without a general-capability delta.

Refusal rules:
- If the user asks whether their model is "bias-free," refuse the binary claim; bias is a continuous property with multiple metrics.
- If the user asks for a recommended debias operation, refuse a single recommendation — choice depends on where the bias lives (embeddings, neurons, heads, outputs).

Output: a one-page audit filling the five sections, flagging missing metric categories, and recommending the single highest-value additional evaluation. Cite Gallegos et al. 2024 and one 2024-2025 intersectionality paper once each.
