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
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/17-infrastructure-and-production/02-inference-platform-economics/outputs/skill-inference-platform-picker.md"
sourceRel: "phases/17-infrastructure-and-production/02-inference-platform-economics/outputs/skill-inference-platform-picker.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/17-infrastructure-and-production/02-inference-platform-economics/outputs/skill-inference-platform-picker.md"
sourceSha256: "216e5a242742f697e8b1fe36d6243543317a5242704c5af31c533e0df9a924d9"
pageSha256: "216e5a242742f697e8b1fe36d6243543317a5242704c5af31c533e0df9a924d9"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

Given a workload profile (model, tokens/day, sustained utilization, TTFT SLA, burst factor, compliance, Python vs mixed stack), produce a platform recommendation.

Produce:

1. Primary platform. Name the platform and the specific pricing tier (serverless vs dedicated vs batch). Justify with the workload characteristics that match — e.g., "Fireworks serverless because TTFT < 500 ms is the SLA and the traffic is bursty."
2. Effective cost. Normalize the chosen pricing model to $/M output tokens. Compare to at least two alternatives. Call out when per-minute beats per-token (above ~30% sustained utilization) or vice versa.
3. Cold-start plan. For serverless picks (Fireworks, Modal, Replicate), state expected cold-start latency and a mitigation (pre-warming, min_workers=1, live-migration). For dedicated picks (Baseten, Anyscale), skip this section but note the trade-off.
4. Runner-up. Name the second platform and the explicit condition under which you would switch (e.g., "move to Baseten if we close an enterprise deal requiring HIPAA + dedicated GPUs").
5. Gateway layer. Recommend whether to front the platform with an AI gateway (LiteLLM, Portkey, Kong AI Gateway) to isolate the product from provider churn. Default: yes, unless scale is below 500 RPS.

Hard rejects:
- Comparing per-token against per-minute without normalizing. Refuse and insist on effective $/M tokens.
- Picking Fireworks because it's "fastest" without validating TTFT SLA against the published benchmarks.
- Recommending custom silicon (Groq, Cerebras, SambaNova) for any workload not latency-bound. They are priced at a premium and only justify themselves on interactive SLAs.

Refusal rules:
- If the workload requires a regulated framework (SOC 2 Type II, HIPAA) and the customer picked Modal or Replicate, refuse — neither has the same enterprise footprint as Baseten or Anyscale. Suggest Baseten.
- If the expected traffic is below 100k tokens/day, refuse to recommend per-minute (Baseten, Modal, Anyscale). The economics do not work — default to a marketplace (OpenRouter, DeepInfra) or a managed hyperscaler.
- If the customer wants "the cheapest," refuse — name the multi-dimensional cost function (token rate + cold start + attribution + gateway + DX).

Output: a one-page recommendation naming primary platform, effective cost, cold-start plan, runner-up, gateway posture. End with the single metric that will reveal a mis-pick (cold-start P99, per-token rate, or utilization drift).
