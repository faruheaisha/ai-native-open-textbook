---
title: "Speculative Decoding Picker"
sourceId: "07-coding/ai-engineering-from-scratch-zh"
sourceTitle: "AI 工程从零到一（中文）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh"
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/07-transformers-deep-dive/16-speculative-decoding/outputs/skill-spec-decode-picker.md"
sourceRel: "phases/07-transformers-deep-dive/16-speculative-decoding/outputs/skill-spec-decode-picker.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/07-transformers-deep-dive/16-speculative-decoding/outputs/skill-spec-decode-picker.md"
sourceSha256: "a1b71a6ae44d4a34cc432c63e777f98772397f4581fa3dafc52bdcd7667f9c8d"
pageSha256: "a1b71a6ae44d4a34cc432c63e777f98772397f4581fa3dafc52bdcd7667f9c8d"
contentMode: "local-full"
zh: ""
---

# Speculative Decoding Picker

Help an engineer choose between vanilla speculative, Medusa, EAGLE, or lookahead decoding, and tune `N` (draft length) for a specific workload.

## Inputs to gather

1. **Verifier model** — which LLM produces final output. Size matters (draft cost must be < verifier cost for speedup).
2. **Workload type** — code, chat, structured output, summarization. Determines acceptance rate.
3. **Sampling strategy** — greedy, low-T, high-T, beam. High-T sampling degrades acceptance.
4. **Hardware target** — memory budget determines if you can fit a separate draft model.
5. **Engineering budget** — Medusa and EAGLE need fine-tuning; vanilla and lookahead don't.
6. **Latency target** — interactive chat (<500ms TTFT, <50ms per token) vs batch (throughput-first).

## Decision rules

- **Quick start, no training**: vanilla draft with a same-family 1B–3B model. 2× typical.
- **You can fine-tune**: EAGLE-2 or EAGLE-3 using the verifier's hidden states. 3–4× typical.
- **You can fine-tune but can't run two models**: Medusa (extra heads on verifier). 2–3×.
- **No training budget, no draft model available**: lookahead decoding. 1.3–1.6×.
- **Batch-heavy serving**: continuous batching matters more; speculative gains diminish as batch grows because the verifier is already saturated.
- **High temperature or stochastic sampling**: acceptance drops sharply. Consider lower N (2–3) or disabling.
- **Structured output (JSON, code)**: acceptance is high. Push N to 7+ for max speedup.

## Tuning

- **N (draft length)**: start at 5. Measure acceptance. If α > 0.9, push to 7. If α < 0.6, drop to 3.
- **Draft temperature**: match the verifier's temperature. Mismatched draft sampling loses α.
- **Tree depth (EAGLE-2 / Medusa)**: 3–5 branches; wider trees help only at α > 0.8.
- **Draft model size**: smallest that hits α > 0.7. A 1B draft for a 70B verifier is typical; don't go below the verifier's tokenizer / embedding compatibility.

## Always flag

- Check that draft and verifier share the tokenizer. Different BPE splits break speculative guarantees.
- Spec decoding interacts with continuous batching in vLLM: per-request speedup drops when the batch is already saturated.
- EAGLE's hidden-state input requires verifier internals; not always exposed through HF APIs. Prefer vLLM or SGLang runtimes.
- Medusa heads need a supervised fine-tune on the verifier's own outputs. Data-gathering step is often the dominant cost.

## Output format

Return:

1. **Recommendation** — one strategy name and tuning parameters (e.g. "EAGLE-2, N=5, tree_depth=4").
2. **Expected speedup** — with explicit α assumption.
3. **Compatibility checks** — tokenizer match, runtime support, KV cache rollback support.
4. **Fallback plan** — if the primary strategy underperforms, what to try next.
5. **Measurement plan** — how to validate acceptance rate and speedup on a representative sample.
