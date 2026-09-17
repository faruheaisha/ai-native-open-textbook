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
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/10-llms-from-scratch/17-native-sparse-attention/outputs/skill-nsa-integrator.md"
sourceRel: "phases/10-llms-from-scratch/17-native-sparse-attention/outputs/skill-nsa-integrator.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/10-llms-from-scratch/17-native-sparse-attention/outputs/skill-nsa-integrator.md"
sourceSha256: "171d20be9a9438a00ff224485d6421406f6dbf9ab2d11eb072ecd90b833cb8d4"
pageSha256: "171d20be9a9438a00ff224485d6421406f6dbf9ab2d11eb072ecd90b833cb8d4"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

Given a long-context pre-training run specification (target context, base architecture, training tokens available, GPU topology, deployment target), produce an NSA integration plan.

Produce:

1. Compression block size `l`. Pick 32, 64, or 128. Justify against target context: `l = 32` for 16k-32k, `l = 64` for 64k-128k, `l = 128` for 256k-plus. Larger `l` means fewer compressed keys but coarser routing signal.
2. Top-k selection count. Pick between 8 and 32. The paper's default is 16. Justify against the target task mix: reasoning-heavy tasks (math, code) benefit from higher `k` because selection precision matters more. Retrieval-heavy tasks work at lower `k`.
3. Sliding window `W`. Pick 256, 512, or 1024. Default 512. Shorter for heavily structured content (code) where local context is enough; longer for prose.
4. Gate MLP. Specify width and initialization. Default: linear layer from `hidden` to 3, with `sigmoid` or `softplus` activation. Warn if gate weights collapse to favor one branch — this indicates `l`, `k`, or `W` is mistuned.
5. Kernel choice. Confirm Triton or CUDA kernel availability for the target accelerator. Reject fallback to dense attention at inference (the whole point of NSA is to save decode compute). If only forward kernels exist and not backward, refuse pre-training and recommend continued training on existing dense checkpoints.

Hard rejects:
- NSA on a model pre-trained with dense attention without continued pre-training. Cannot be bolted on at inference.
- Target context under 16k. The three-branch overhead dominates.
- Inference-only deployments on stacks without NSA kernel support. Recommend MLA or sliding-window attention instead.

Refusal rules:
- If long-context evaluation data (RULER, LongBench, needle-in-haystack) is not available, refuse and request calibration data first.
- If the training-data context distribution is dominated by short sequences, refuse and recommend data reweighting before integrating NSA.
- If the accelerator is older than A100, refuse — NSA's kernel advantages assume H100/H200/MI300 memory hierarchies.

Output: a one-page integration plan listing `l`, `k`, `W`, gate config, kernel path, and expected compute savings at target context. End with a "success criterion" paragraph: the specific RULER or LongBench number (percentage points vs a matched dense-attention baseline) that justifies keeping NSA. Include a rollback trigger — the metric threshold below which the architecture should be reverted to MLA or dense GQA.
