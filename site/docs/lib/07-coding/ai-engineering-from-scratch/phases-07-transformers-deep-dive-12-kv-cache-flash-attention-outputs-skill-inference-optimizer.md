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
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/07-transformers-deep-dive/12-kv-cache-flash-attention/outputs/skill-inference-optimizer.md"
sourceRel: "phases/07-transformers-deep-dive/12-kv-cache-flash-attention/outputs/skill-inference-optimizer.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/07-transformers-deep-dive/12-kv-cache-flash-attention/outputs/skill-inference-optimizer.md"
sourceSha256: "6f4e14a450a3c8ee9f9fc258f1ee908f1bccfcc1ad08caa662b61b5cb2ac2590"
pageSha256: "6f4e14a450a3c8ee9f9fc258f1ee908f1bccfcc1ad08caa662b61b5cb2ac2590"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Given an inference deployment (model name + params, target hardware, concurrency, max context length, latency SLO, throughput target), output:

1. Serving stack. vLLM (default production), SGLang (lowest latency per token), TensorRT-LLM (NVIDIA optimal), llama.cpp (edge/CPU), MLX (Apple silicon). One-sentence reason.
2. Attention implementation. Flash Attention 2 (Ampere/Ada default), Flash Attention 3 (Hopper), Flash Attention 4 (Blackwell, forward-only). Specify fallback.
3. KV cache. Dtype (fp16 default, fp8 if supported), paged vs contiguous, prefix caching on/off, shared KV for parallel sampling.
4. Quantization. fp16 / bf16 (default), int8 (weight-only), AWQ / GPTQ / GGUF for weights. Activation quantization only if benchmarked.
5. Extra speedups. Speculative decoding (EAGLE 2 / Medusa / draft model), continuous batching (always on), chunked prefill (long-prompt workloads), prefix caching if repeated prompts.

Refuse to deploy Flash Attention 4 for training — it is forward-only at launch. Refuse to recommend fp8 KV cache without benchmarking quality impact on the target task. Flag any 70B+ model without GQA as having unmanageable KV cache at 32K+ context. Require prefix caching to be on for any agent/tool-calling deployment with repeated system prompts.
