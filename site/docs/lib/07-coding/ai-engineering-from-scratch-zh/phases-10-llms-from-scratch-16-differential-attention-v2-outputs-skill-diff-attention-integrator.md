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
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/10-llms-from-scratch/16-differential-attention-v2/outputs/skill-diff-attention-integrator.md"
sourceRel: "phases/10-llms-from-scratch/16-differential-attention-v2/outputs/skill-diff-attention-integrator.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/10-llms-from-scratch/16-differential-attention-v2/outputs/skill-diff-attention-integrator.md"
sourceSha256: "5e78b9ea75661ba6fe6df70500bc98e56d76373934d71d1848d1c87132fb955c"
pageSha256: "5e78b9ea75661ba6fe6df70500bc98e56d76373934d71d1848d1c87132fb955c"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

Given a model architecture (hidden, heads, KV heads, layers, d_head), a target context length, a hallucination or long-context profile (failure modes on your existing evals), and a training budget (tokens available, GPU-hours), produce an integration plan for DIFF V2.

Produce:

1. Integration mode. From-scratch pre-training, mid-training architecture swap, or LoRA fine-tune on Q projections. Justify the choice against the training budget and the existing weights available.
2. Architecture diff. Concrete field-by-field change list: which projections grow, which stay the same, which parameter count you are adding, and where the subtraction gets placed in the attention block. Include `lambda_init` schedule by layer depth (`0.8 - 0.6 * exp(-0.3 * (depth - 1))` is the paper's default; adjust per-depth if layerwise telemetry shows instability).
3. Kernel choice. Confirm FlashAttention 2 or 3 support given V2's head-count doubling. Reject V1's custom-kernel path unless the user explicitly needs it for reproducibility.
4. Memory budget. KV cache stays at baseline (KV heads unchanged). Compute per-token activation memory delta (extra Q heads, extra compute). Report absolute numbers at the target context.
5. Training stability plan. Describe what to monitor: `lambda` drift per layer, attention entropy per head, gradient variance on the Q projections. Name the specific metric that should trigger a rollback to baseline attention if telemetry indicates divergence.

Hard rejects:
- Adding DIFF attention to a pre-trained model without continued pre-training. Output distributions drift — not a drop-in fix.
- DIFF V1 for any new run past April 2026. V2 is strictly better in all measured dimensions.
- Integrating DIFF without also enabling long-context training data. The benefit only shows past 32k.
- Changing `lambda_init` to a negative value without a controlled experiment. Negative init subtracts more than the noise floor and collapses training.

Refusal rules:
- If the target context is below 16k, refuse the integration and recommend standard attention. The added parameter cost is not justified by the noise-floor argument.
- If the user cannot provide long-context evaluation data (RULER, needle-in-haystack, MultiNeedle), refuse and request calibration data first.
- If the user is on a pre-FlashAttention-2 stack, refuse and recommend upgrading the stack before attempting integration.

Output: a one-page integration plan listing mode, param count delta, KV cache impact, FlashAttention confirmation, `lambda` schedule, and a 3-metric monitoring board. End with a "success criterion" paragraph naming the specific long-context eval number (percentage point delta on RULER 64k or equivalent) that would justify keeping DIFF V2 in the architecture versus reverting.
