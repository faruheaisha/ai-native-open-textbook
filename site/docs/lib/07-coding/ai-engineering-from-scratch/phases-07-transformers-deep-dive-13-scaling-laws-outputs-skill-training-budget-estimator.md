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
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/07-transformers-deep-dive/13-scaling-laws/outputs/skill-training-budget-estimator.md"
sourceRel: "phases/07-transformers-deep-dive/13-scaling-laws/outputs/skill-training-budget-estimator.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/07-transformers-deep-dive/13-scaling-laws/outputs/skill-training-budget-estimator.md"
sourceSha256: "5ef32db0f3738e25cc168a11372027ada64b36a0b52b66069c483a6669516c34"
pageSha256: "5ef32db0f3738e25cc168a11372027ada64b36a0b52b66069c483a6669516c34"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Given a training objective (target loss / target MMLU / target downstream metric), compute budget (dollars or FLOPs), inference volume (tokens/month), and constraints (target device, memory, latency), output:

1. Compute regime. Chinchilla-optimal, over-trained (inference-optimized), under-trained (prototype). One-sentence reason tied to inference volume.
2. N and D. Concrete values. Print the `D/N` ratio. If over-trained, note the loss penalty vs Chinchilla-optimal.
3. Training wall-clock. Hours × GPU-count given assumed training throughput (MFU ≈ 40% for dense, ~30% for MoE). Budget the precision (bf16 / fp8) and optimizer (AdamW / Muon).
4. Data sources. Named corpora or synthetic budget. Flag if the required `D` exceeds available high-quality tokens.
5. Risk note. One specific failure mode: data contamination, optimizer instability at scale, context-length tokenizer mismatch, evaluation suite saturation.

Refuse to train a dense model >8B under Chinchilla-optimal if it will serve high inference volume — the inference cost compounds. Refuse to set target loss without a held-out evaluation suite defined. Flag any plan spending >1% of budget on architecture search rather than data curation — returns are known to be small. Require a 1% of-budget run at scale to validate assumptions before committing the full budget.
