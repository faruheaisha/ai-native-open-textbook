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
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/10-llms-from-scratch/18-multi-token-prediction/outputs/skill-mtp-planner.md"
sourceRel: "phases/10-llms-from-scratch/18-multi-token-prediction/outputs/skill-mtp-planner.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/10-llms-from-scratch/18-multi-token-prediction/outputs/skill-mtp-planner.md"
sourceSha256: "9a69a4bffdee11876be9f1419b83e8e2bc4782facdab6b3773f91588210b7e9f"
pageSha256: "9a69a4bffdee11876be9f1419b83e8e2bc4782facdab6b3773f91588210b7e9f"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

Given a pre-training run specification (model scale, hidden size, layers, data tokens budget, GPU topology, target deployment) and a stated goal (denser training signal vs speculative-decoding draft vs both), produce an MTP integration plan.

Produce:

1. Depth D. Pick 1 or 2. DeepSeek-V3 uses D=1 and reports the first-depth speculative-decoding acceptance at 80%+. D=2 is diminishing-returns territory for most runs. Justify the choice against compute budget — each extra depth adds roughly one transformer block of compute per training step.
2. Lambda schedule. Default: 0.3 for the first 10% of training, 0.1 afterward. Adjust up to 0.5 early for small models (under 7B) where the denser signal matters more; adjust down if you observe the MTP loss dominating the main loss.
3. Parameter budget. Report per-module parameter count against the main model. Confirm overhead is under 5% of main parameters (dense) or under 3% (MoE).
4. Memory and compute overhead. Quantify extra forward-pass FLOPs per step (roughly `D * transformer_block_cost`), extra backward-pass memory (activation memory for D modules), and extra peak VRAM (shared embedding and head do not count, projection and transformer block do).
5. Inference-time wiring. Describe how to consume the MTP module as a speculative-decoding draft at inference. Name the Leviathan rule integration path and the KV-rollback bookkeeping. Confirm compatibility with the target inference stack (vLLM, SGLang, TensorRT-LLM).

Hard rejects:
- Adding MTP to a dense model pre-trained without it. Cannot retrofit — the MTP modules are not trained.
- D > 2 for a first integration. Gain over D=1 is small; complexity grows quickly.
- MTP on a model under 1B active parameters. Signal is weaker than the overhead cost at that scale.
- Using parallel (Gloeckle-style) heads when the goal is speculative decoding. They do not chain causally.

Refusal rules:
- If the pre-training data is dominated by short sequences (under 2k), refuse. MTP gains assume sequences long enough for depth-2 supervision to matter.
- If the target inference stack does not support speculative decoding at all, note that MTP still buys the denser training signal and proceed, but flag the mismatch.
- If the user is continuing pre-training on an existing dense checkpoint without MTP, refuse and recommend adding MTP only at the start of a clean training run or at a clean data-boundary reset.

Output: a one-page integration plan listing D, lambda schedule, parameter overhead (absolute and percentage), compute overhead (percentage per training step), and the inference-time speculative-decoding wiring plan. End with a "success criterion" paragraph naming the measured metric that justifies keeping MTP: acceptance rate at depth 1 after 50B training tokens must be above 70%, otherwise the architecture should be reverted.
