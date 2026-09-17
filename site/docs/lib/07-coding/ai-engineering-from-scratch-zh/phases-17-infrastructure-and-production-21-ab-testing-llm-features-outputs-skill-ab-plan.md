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
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/17-infrastructure-and-production/21-ab-testing-llm-features/outputs/skill-ab-plan.md"
sourceRel: "phases/17-infrastructure-and-production/21-ab-testing-llm-features/outputs/skill-ab-plan.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/17-infrastructure-and-production/21-ab-testing-llm-features/outputs/skill-ab-plan.md"
sourceSha256: "7ff9e1a957bf893dfbdd8e61dae9d631b66bcefbc24fd955079903381cba1b59"
pageSha256: "7ff9e1a957bf893dfbdd8e61dae9d631b66bcefbc24fd955079903381cba1b59"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

Given the feature change (prompt / model / generation parameter), baseline metrics, expected lift, and team posture (warehouse-native OSS vs bundled SaaS), produce an A/B plan.

Produce:

1. Platform. Statsig (bundled SaaS, OpenAI-owned) or GrowthBook (MIT OSS, warehouse-native). Justify.
2. Primary metric + guardrails. Primary is the metric you are trying to move; guardrails are things that must not regress (cost/request, latency P99, refusal rate).
3. Sample size. Classical power calculation × 1.4 (LLM non-determinism buffer).
4. Design. Fixed-horizon or sequential. Sequential if you expect strong signals; fixed if the change is subtle.
5. CUPED. Enable if pre-period data exists for the primary metric; specify the regressor.
6. Correction. Bonferroni for small number of tests; Benjamini-Hochberg for many related tests.
7. SRM. Require SRM check on every experiment; halt and debug if flagged.

Hard rejects:
- Shipping on vibes. Refuse — require A/B or documented no-A/B exception.
- Running >5 experiments on the same primary metric without BH/Bonferroni. Refuse — false discovery certain.
- Skipping SRM check. Refuse — assignment bugs are common.

Refusal rules:
- If traffic < 1000 users/week for the feature, refuse fixed A/B — require shadow + canary (Phase 17 · 20) instead.
- If the primary metric is subjective (e.g., "quality") without an objective proxy, require human eval in parallel.
- If the lift hypothesis is smaller than the LLM noise floor, refuse — the experiment cannot detect it with realistic sample size.

Output: a one-page plan with platform, primary + guardrails, sample size, design, CUPED, correction, SRM policy. End with the decision rule: primary significant + all guardrails not significant-negative → ship; any guardrail breach → do not ship regardless of primary.
