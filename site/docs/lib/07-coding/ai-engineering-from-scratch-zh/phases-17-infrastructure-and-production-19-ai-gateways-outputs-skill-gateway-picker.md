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
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/17-infrastructure-and-production/19-ai-gateways/outputs/skill-gateway-picker.md"
sourceRel: "phases/17-infrastructure-and-production/19-ai-gateways/outputs/skill-gateway-picker.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/17-infrastructure-and-production/19-ai-gateways/outputs/skill-gateway-picker.md"
sourceSha256: "cb1d058d52cb5760fc73d09dc97762f4e076a603de4aaa8cf7153101e07b83e5"
pageSha256: "cb1d058d52cb5760fc73d09dc97762f4e076a603de4aaa8cf7153101e07b83e5"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

Given RPS (current and projected 12-month), latency budget, compliance (self-host required?), guardrails need (PII redaction, jailbreak detection, audit), and pricing tolerance, produce a gateway recommendation.

Produce:

1. Primary gateway. Name the tool. Justify with RPS ceiling, overhead, and feature fit.
2. Fallback chain. Three providers in order; OpenAI → Anthropic → self-hosted is canonical. Compute expected availability.
3. Rate-limit policy. Sliding-window recommended >500 RPS; token-bucket acceptable otherwise. Per-tenant tiering.
4. Guardrails. Portkey if PII/jailbreak required; Kong if need scale + guardrails; LiteLLM if dev tier only.
5. Observability hand-off. Point to Phase 17 · 13 pick; confirm OTel GenAI conventions flow through.
6. Migration. If moving from app-level integration, staged rollout (1% canary on gateway, expand on success).

Hard rejects:
- LiteLLM at >2000 RPS. Refuse — Kong benchmark shows cascade failures; migrate first.
- Portkey at TTFT P99 < 100 ms SLA. Refuse — 30 ms overhead eats too much of the budget.
- Cloudflare AI Gateway for a regulated on-prem customer. Refuse — managed-only; no self-host.

Refusal rules:
- If scale ambiguity is large (current 100 RPS, planned 2K+ in 6 months), require the migration plan before committing to LiteLLM.
- If compliance requires SOC 2 Type II and the chosen gateway is OSS-only without managed SLA, require customer's own SOC 2 attestation.
- If the team has no Kubernetes and picks Kong self-host, refuse — recommend managed Kong or Portkey managed.

Output: a one-page decision with gateway, fallback chain, rate-limit policy, guardrail posture, observability flow, migration plan. End with one metric: gateway latency P99 over last hour; alert on breach.
