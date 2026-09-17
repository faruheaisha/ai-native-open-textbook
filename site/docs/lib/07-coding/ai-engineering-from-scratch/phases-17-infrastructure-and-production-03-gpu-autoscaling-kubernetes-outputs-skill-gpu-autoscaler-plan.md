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
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/17-infrastructure-and-production/03-gpu-autoscaling-kubernetes/outputs/skill-gpu-autoscaler-plan.md"
sourceRel: "phases/17-infrastructure-and-production/03-gpu-autoscaling-kubernetes/outputs/skill-gpu-autoscaler-plan.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/17-infrastructure-and-production/03-gpu-autoscaling-kubernetes/outputs/skill-gpu-autoscaler-plan.md"
sourceSha256: "6e788ef7c32fcdc308cbef2f3fb6c28ce7a3cad806956179165bb2bebdd2551b"
pageSha256: "6e788ef7c32fcdc308cbef2f3fb6c28ce7a3cad806956179165bb2bebdd2551b"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Given cluster topology (nodes, GPU types, NVLink domains), workload shape (TP/PP config, average concurrency, burst factor), and SLO (TTFT P99, goodput), produce a three-layer autoscaling plan.

Produce:

1. Layer 1 — Karpenter NodePool. Specify `instance-type`, `capacity-type` (on-demand / spot / reserved), `consolidationPolicy` (must be `WhenEmpty` with `consolidateAfter: 1h` for GPU pools), taints that exclude non-GPU workloads, and labels for KAI Scheduler selection.
2. Layer 2 — KAI Scheduler policy. State whether gang scheduling is required (yes for TP/PP > 1). Define topology constraint (NVLink domain, rack, zone). Specify queue hierarchy and preemption rules for production vs training tenants.
3. Layer 3 — Application autoscaler. Pick the signal: queue depth for prefill-bound workloads, KV cache utilization for decode-bound, composite goodput for mixed. Forbid `DCGM_FI_DEV_GPU_UTIL` and explain why.
4. Disaggregated split. If using Phase 17 · 17 disaggregated prefill/decode, specify separate HPAs — queue depth signal for prefill pool, KV utilization signal for decode pool.
5. Warm-pool sizing. Minimum ready replicas for SLO-critical paths, based on P99 TTFT constraint and observed cold-start time (node provision + model load).
6. Monitoring. Metrics to dashboard: per-replica queue depth, per-replica KV utilization, node provision wait time, gang-scheduling deferral count, Karpenter consolidation events.

Hard rejects:
- Recommending HPA on `DCGM_FI_DEV_GPU_UTIL`. Refuse and name queue depth + KV utilization as the correct signals.
- Leaving `consolidationPolicy: WhenEmptyOrUnderutilized` for a GPU pool. Refuse and cite the running-job-eviction risk.
- Ignoring gang scheduling for a TP/PP workload. Refuse — partial allocation is a $-burning anti-pattern.

Refusal rules:
- If the cluster has only one GPU type and one node, decline to propose Karpenter — the customer needs managed serverless (Phase 17 · 02) first.
- If the operator asks to "scale on GPU memory," refuse — vLLM pre-allocates to `--gpu-memory-utilization`; memory stays near 90% even at one request.
- If gang scheduling is declined for a TP-8 workload citing complexity, refuse to certify the plan — single-pod placement on 8 scattered GPUs fails atomically.

Output: a one-page plan with a Karpenter YAML snippet, a KAI Scheduler config snippet, an HPA/custom autoscaler signal choice, a warm-pool number, and five dashboard metrics. End with a single kill-switch: if P99 TTFT breaches, roll back to last-known autoscaler state.
