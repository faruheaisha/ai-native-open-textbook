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
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/19-capstone-projects/14-speculative-decoding-server/outputs/skill-inference-server.md"
sourceRel: "phases/19-capstone-projects/14-speculative-decoding-server/outputs/skill-inference-server.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/19-capstone-projects/14-speculative-decoding-server/outputs/skill-inference-server.md"
sourceSha256: "57d38d82dbdc49cb669e7a97b2fc0161ea0fbe6921ef1c882a9db30c26d2f267"
pageSha256: "57d38d82dbdc49cb669e7a97b2fc0161ea0fbe6921ef1c882a9db30c26d2f267"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

Given two open target models (Llama 3.3 70B and Qwen3-Coder-30B MoE or GPT-OSS-120B), ship a production serving stack with speculative decoding, quantization, and Kubernetes autoscaling. Publish measured speedups and tail-latency numbers.

Build plan:

1. Deploy target models under vLLM 0.7 (or SGLang 0.4) with FP8 Marlin quantization.
2. Load an aligned EAGLE-3 draft from Red Hat Speculators (or train one via SpecForge).
3. Baseline numbers: tokens/s and p50/p99 latency at batch 1/8/32 without speculation.
4. Enable EAGLE-3. Rerun the same benchmark. Report speedup, acceptance rate, p99 tail-latency delta.
5. Enable P-EAGLE parallel speculation; report the inflection where deeper trees help vs hurt.
6. Run the benchmarks across distributions: ShareGPT, HumanEval, domain data. Publish acceptance-rate drift.
7. Repeat on the second target model (MoE); identify routing-noise sensitivity in draft acceptance.
8. Deploy on Kubernetes with HPA tracking `queue_wait_ms`. Demonstrate scale-out when load triples.
9. Compare $/1M tokens vs Anthropic Claude Sonnet 4.7 and OpenAI GPT-5.4 on matched evals.

Assessment rubric:

| Weight | Criterion | Measurement |
|:-:|---|---|
| 25 | Measured speedup vs baseline | 2.5x+ throughput at matched quality on both models |
| 20 | Acceptance rate on realistic traffic | Per-distribution acceptance-rate report |
| 20 | P99 tail-latency discipline | p99 at batch 1/8/32 with and without speculation |
| 20 | Ops | K8s deploy, HPA on queue-wait, smooth rollout, drain-first upgrade |
| 15 | Write-up and methodology | Clear derivation of metrics, matched baselines |

Hard rejects:

- Reporting steady-state throughput without tail latency.
- HPA on CPU instead of queue-wait. Will thrash under GPU saturation.
- Ignoring draft-target version alignment. Drifted drafts cost more than no speculation.
- Cost comparisons that omit the hosted APIs' prompt-caching discounts.

Refusal rules:

- Refuse to serve without a rollout drain. Upgrading in-place while requests are in flight is disqualifying.
- Refuse to report acceptance rate aggregated across distributions. Per-distribution is mandatory.
- Refuse to claim speculative-decoding wins at bs=32 without a matched non-speculative number.

Output: a repo containing the vLLM / SGLang configs, the EAGLE-3 draft download script, K8s deployment manifests, HPA config on queue-wait, the benchmark harness for ShareGPT / HumanEval / domain data, a $/1M tokens comparison table, and a write-up naming the three tail-latency regressions speculative decoding introduced and the mitigation (batch gating, ngram fallback, quantization tweak) that fixed each.
