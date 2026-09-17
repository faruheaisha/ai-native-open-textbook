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
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/10-llms-from-scratch/21-jamba-hybrid-ssm-transformer/outputs/skill-hybrid-picker.md"
sourceRel: "phases/10-llms-from-scratch/21-jamba-hybrid-ssm-transformer/outputs/skill-hybrid-picker.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/10-llms-from-scratch/21-jamba-hybrid-ssm-transformer/outputs/skill-hybrid-picker.md"
sourceSha256: "e386ba906ea3aca0c47960ae3afdaa1214983398760ff1af538ca47af8fe6912"
pageSha256: "e386ba906ea3aca0c47960ae3afdaa1214983398760ff1af538ca47af8fe6912"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Given a workload specification (context length profile p50/p99, task mix, memory budget per GPU, target throughput, quality-vs-speed priority), recommend between a pure Transformer (+MoE +MLA), a Jamba-style hybrid, and a pure Mamba model.

Produce:

1. Context-length bucket. Short (under 16k), medium (16k-64k), long (64k-256k), or ultra-long (256k-plus). Drives the first-pass decision.
2. Architecture recommendation. Pick one of pure Transformer, 1:7 hybrid, 1:3 hybrid, 1:15 hybrid, or pure Mamba. Justify using the context bucket plus the task's in-context-recall demands.
3. Memory budget check. Compute KV cache + SSM state at target context. Confirm it fits on the target accelerator after accounting for weights and activation memory (typically 10-20 GB on top of weights and KV cache).
4. Quality tradeoff disclosure. Document the quality cost of the chosen sparsity level. Hybrids below 1:7 ratio degrade on in-context retrieval by measurable amounts; pure Mamba fails on some state-tracking tasks.
5. Inference stack compatibility. Confirm the chosen architecture is supported by the target stack (vLLM, TensorRT-LLM, SGLang, llama.cpp). Hybrids have thinner tooling coverage than pure Transformers.

Hard rejects:
- Jamba-style hybrid for context under 16k. The architectural overhead is not justified.
- Pure Mamba for reasoning-heavy or multi-document cross-reference tasks. State-tracking limits bite.
- Sub-1:15 hybrid ratios. Below this, in-context recall is unreliable.
- Any recommendation that does not fit the computed memory budget on the specified accelerator.

Refusal rules:
- If the workload is genuinely mixed short and long context, refuse the hybrid recommendation and recommend the pure Transformer (with MLA if possible) — hybrids shine on long-context workloads specifically.
- If the accelerator is consumer-grade (24GB or less), refuse hybrid-size models and recommend a distilled small hybrid or a quantized pure Transformer.
- If the workload is latency-sensitive batch-1 generation and the model is new (no existing deployment path), refuse and recommend a well-supported pure Transformer with speculative decoding (Phase 10 · 15) as the simpler path.

Output: a one-page recommendation listing context bucket, architecture choice, KV cache at target context, quality tradeoff disclosure, and inference stack compatibility. End with a "what to monitor" paragraph naming the specific long-context evaluation (RULER, LongBench, needle-in-haystack) that would confirm the recommendation in the first 10k production requests.
