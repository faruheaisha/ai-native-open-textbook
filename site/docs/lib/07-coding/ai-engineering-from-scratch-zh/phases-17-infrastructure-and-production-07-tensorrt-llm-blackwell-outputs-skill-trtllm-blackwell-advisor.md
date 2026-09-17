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
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/17-infrastructure-and-production/07-tensorrt-llm-blackwell/outputs/skill-trtllm-blackwell-advisor.md"
sourceRel: "phases/17-infrastructure-and-production/07-tensorrt-llm-blackwell/outputs/skill-trtllm-blackwell-advisor.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/17-infrastructure-and-production/07-tensorrt-llm-blackwell/outputs/skill-trtllm-blackwell-advisor.md"
sourceSha256: "18126b9bccbffb629de5ceb0c9c567585de50bc3db641341c31ab7b159f295be"
pageSha256: "18126b9bccbffb629de5ceb0c9c567585de50bc3db641341c31ab7b159f295be"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

Given a workload (model size, active params, annual token volume, quality sensitivity — reasoning-heavy or routine), current infra (H100/H200/B200 GPUs, serving engine), and budget, produce a Blackwell + TRT-LLM migration advisory.

Produce:

1. Current baseline. Compute current $/M tokens and annual spend from reported volume and per-GPU-hour pricing. Flag if baseline is already on Blackwell + TRT-LLM.
2. Target stack. Recommend exact precision mix (weights: NVFP4 or FP8; KV cache: FP8; activations: NVFP4; accumulator: FP32). For reasoning-heavy workloads, recommend FP8 weights first, NVFP4 only after per-block calibration validated on the eval set.
3. Expected savings. From the 2026 cost shape: H100 + vLLM ~$0.09/M → B200 + TRT-LLM ~$0.02/M → GB200 NVL72 + Dynamo ~$0.012/M. Project annual savings for the workload's token volume.
4. Migration cost. Engineering time (10-30 engineer-weeks for first migration). Quality-validation pass. GPU CapEx or rental commitment.
5. Break-even horizon. Months of production needed to amortize migration. If > 18 months, flag as marginal.
6. Lock-in risk. TRT-LLM is NVIDIA-only. Name two exit strategies (dual-stack with vLLM on H100 for iteration tier; keep weights exportable to GGUF/HF for portability to non-NVIDIA).

Hard rejects:
- Recommending NVFP4 weights on reasoning-heavy models without an eval-set validation step.
- Claiming the 7x gap without naming the token volume the math assumes.
- Ignoring quality validation for FP4 weight conversion. Always run.

Refusal rules:
- If annual inference spend < $500K, refuse migration. The engineering cost does not amortize. Stay on vLLM + Hopper.
- If the team has any AMD/Intel GPUs in serving, refuse TRT-LLM for the multi-vendor tier. Recommend vLLM on mixed hardware.
- If model quality on task is already marginal, refuse aggressive quantization. Stay FP8 or BF16.

Output: a one-page Blackwell advisory listing current baseline, target stack, expected savings, migration cost, break-even horizon, and lock-in exit plan. End with a "what to read next" paragraph naming the MLPerf v6.0 blog, the TRT-LLM overview, or the Dynamo announcement depending on the primary gap.
