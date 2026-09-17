---
title: "AI Engineering from Scratch（英文原版）"
sourceId: "07-coding/ai-engineering-from-scratch"
sourceTitle: "AI Engineering from Scratch（英文原版）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/rohitg00/ai-engineering-from-scratch"
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/17-infrastructure-and-production/13-llm-observability/outputs/skill-observability-stack.md"
sourceRel: "phases/17-infrastructure-and-production/13-llm-observability/outputs/skill-observability-stack.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/17-infrastructure-and-production/13-llm-observability/outputs/skill-observability-stack.md"
sourceSha256: "7e08a310b224ba3a29f8ac6d5b3811532d7c0a5cb696cced6c4782351003427e"
pageSha256: "7e08a310b224ba3a29f8ac6d5b3811532d7c0a5cb696cced6c4782351003427e"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Given stack (LangChain / DSPy / raw SDK), scale (traces/day), budget, license posture (MIT-only vs commercial OK), and self-host requirement, produce an observability plan.

Produce:

1. Development platform choice. Langfuse (OSS), LangSmith (LangChain-first commercial), Opik (Comet OSS), or none. Justify with stack and license.
2. Gateway/telemetry choice. Helicone (proxy + gateway), SigNoz (full APM), OpenLLMetry (pure OTel). If already using an AI gateway (Phase 17 · 19), name the integration.
3. Scale/lake layer. Optional; Arize AX or raw Iceberg for long-term analytics, Phoenix for RAG drift.
4. OTel GenAI conventions. Specify the minimum attribute set: `gen_ai.system`, `gen_ai.request.model`, `gen_ai.usage.input_tokens`, `gen_ai.usage.output_tokens`, `gen_ai.request.temperature`, `gen_ai.response.finish_reasons`, plus org-specific (tenant_id, user_id, task).
5. Sampling policy. 100% errors, 100% high-cost (>$0.10/call), N% success sampling rate. Raw-retention window (14d / 30d / 90d). Aggregates retained longer.
6. Alerting. Five metrics that must have alerts: error rate, P99 TTFT, cost/request, prompt-cache hit rate, refusal rate.

Hard rejects:
- Instrumenting inside framework-specific SDK without an OTel fallback. Refuse — framework lock-in.
- Keeping 100% of traces at Datadog-class pricing >$500/mo for a non-regulated workload. Refuse — recommend sampling.
- Ignoring OpenTelemetry GenAI conventions. Refuse — 2026 interop requires them.

Refusal rules:
- If traces/day > 5M and the team insists on full Datadog retention, refuse without a cost forecast.
- If the team is MIT-only and picks LangSmith, refuse — Langfuse is the MIT equivalent.
- If the team has no AI gateway and picks Helicone as gateway AND observability, accept — the proxy doubles as gateway up to ~500 RPS (Phase 17 · 19 covers gateway scale).

Output: a one-page plan naming dev platform, gateway, scale layer (if any), OTel attribute set, sampling rule, five alerts. End with the single metric that signals stack drift: percentage of LLM calls with complete OTel GenAI attributes over last 7 days.
