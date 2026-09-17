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
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/17-infrastructure-and-production/20-shadow-canary-progressive/outputs/skill-rollout-runbook.md"
sourceRel: "phases/17-infrastructure-and-production/20-shadow-canary-progressive/outputs/skill-rollout-runbook.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/17-infrastructure-and-production/20-shadow-canary-progressive/outputs/skill-rollout-runbook.md"
sourceSha256: "60baf0e164df5cb740386b9b9ad55538d9564d237c20e3ccc4e8e0f472d03194"
pageSha256: "60baf0e164df5cb740386b9b9ad55538d9564d237c20e3ccc4e8e0f472d03194"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

Given a candidate change (new model, new prompt template, new router policy), baseline production metrics, and risk tolerance, produce a rollout runbook.

Produce:

1. Shadow plan. Duration (24-72 hours). Metrics logged: outputs, token counts, latency, refusal, error. Alert on: >20% cost shift, >30% output length shift, any schema violation.
2. Canary progression. Stages (1% → 10% → 25% → 50% → 75% → 100%). Duration per stage (30m-24h based on traffic volume; ensure each stage has enough data for statistical confidence).
3. Five gates. Specify the exact thresholds for latency P99, cost/request, error/refusal, output-length P99, thumbs-down rate. Set above noise floor (expect 15% irreducible variance).
4. Tooling. Name the rollout controller (Argo Rollouts, Flagger, KServe) and the feature flag system for instant rollback.
5. Rollback path. Document the three actions: flip flag → revert pinned digest → verify. Target time: under 60 seconds end to end.
6. Skip A/B? Justify. Improved-variant changes skip A/B; distinctly different changes (new behavior, new cost curve) require A/B.

Hard rejects:
- Skipping shadow mode. Refuse — cost spikes and length regressions slip past offline eval.
- Gates tighter than 15% variance. Refuse — false alarms will halt legitimate rollouts.
- Rollback that requires redeploy. Refuse — it is not a rollback, it is a damage report.

Refusal rules:
- If the change is safety-critical (e.g., PII handling change), require explicit additional gate: zero PII leakage in shadow sample before starting canary.
- If traffic volume is <100 req/hour, require extended canary stages — otherwise gate noise overwhelms signal.
- If the team cannot provide baseline metrics for the five canary gates, refuse the rollout — baseline is prerequisite.

Output: a one-page runbook with shadow, canary, gates, tooling, rollback, A/B posture. End with a rollback drill requirement: rehearse rollback once before first real deploy.
