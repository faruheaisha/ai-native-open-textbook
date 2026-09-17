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
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/17-infrastructure-and-production/18-vllm-production-stack-lmcache/outputs/skill-vllm-stack-decider.md"
sourceRel: "phases/17-infrastructure-and-production/18-vllm-production-stack-lmcache/outputs/skill-vllm-stack-decider.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/17-infrastructure-and-production/18-vllm-production-stack-lmcache/outputs/skill-vllm-stack-decider.md"
sourceSha256: "e374714dee04452b8d85b7be3028bef7d800600e2b29440493b3e39e507b6ba5"
pageSha256: "e374714dee04452b8d85b7be3028bef7d800600e2b29440493b3e39e507b6ba5"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Given workload (prompt shape, concurrency, prefix reuse pattern), fleet (engines, GPU type), and operational context (Kubernetes-native, multi-tenant, budget), produce a vLLM stack plan.

Produce:

1. Stack. Use vLLM production-stack Helm chart (recommended for new deployments) or roll your own. State which operators/CRDs apply.
2. KV offload. Choose:
   - None (short prompts, low concurrency — overhead exceeds benefit).
   - Native vLLM CPU offload (single-engine HBM pressure, simple).
   - LMCache connector (multi-engine prefix reuse, preemption-heavy, or multi-tenant shared prompts).
3. HBM utilization monitoring. Set `--gpu-memory-utilization` with headroom; alert at 92%+ sustained as a pre-preemption signal.
4. Router integration. Cache-aware router (Phase 17 · 11). Confirm KV-event channel configured.
5. Observability. Prometheus scrape per engine, OTel GenAI attributes (Phase 17 · 13), Grafana dashboard template from production-stack.
6. Expected impact. Quantify expected throughput gain vs current — reference the 16x H100 benchmark shape (LMCache helps when KV footprint exceeds HBM).

Hard rejects:
- Deploying LMCache without shared prefixes or preemption. Refuse — overhead, no benefit.
- Running vLLM without HBM-pressure monitoring. Refuse — first preemption will be a surprise.
- Hand-rolling production-stack when the Helm chart covers the use case. Refuse — reinvent cost.

Refusal rules:
- If the fleet has <2 engines, refuse LMCache — cross-engine reuse is the point; single-engine use native.
- If the workload has prompts < 1K tokens and < 100 concurrency, refuse offload of any kind — HBM headroom suffices.
- If the team doesn't have K8s capability, refuse production-stack — start with a single-engine vLLM + simple proxy.

Output: a one-page plan naming stack, KV offload choice, HBM monitoring, router integration, observability, expected impact. End with the single gate: HBM utilization P99 over last 24h.
