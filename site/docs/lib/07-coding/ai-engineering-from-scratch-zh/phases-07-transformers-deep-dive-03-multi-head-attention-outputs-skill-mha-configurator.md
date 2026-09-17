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
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/07-transformers-deep-dive/03-multi-head-attention/outputs/skill-mha-configurator.md"
sourceRel: "phases/07-transformers-deep-dive/03-multi-head-attention/outputs/skill-mha-configurator.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/07-transformers-deep-dive/03-multi-head-attention/outputs/skill-mha-configurator.md"
sourceSha256: "ebd3267801bca731c6cc4ab8aa0d98054474199867835864fdb9408139a6b25e"
pageSha256: "ebd3267801bca731c6cc4ab8aa0d98054474199867835864fdb9408139a6b25e"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

Given a transformer spec (parameter budget, hidden size `d_model`, target context length, inference device memory, training vs inference priority), output:

1. Projection variant. One of: MHA, GQA, MQA, MLA. One-sentence reason tied to KV-cache constraints.
2. Head geometry. `n_heads`, `n_kv_heads`, `d_head`. Values must satisfy `d_model = n_heads * d_head` and `n_heads % n_kv_heads == 0`.
3. KV cache estimate. Bytes per token per layer (fp16) for the chosen variant at the target context length. Flag if one batch exceeds the target device memory.
4. Initialization. Xavier / Kaiming scale for Q, K, V, O matrices. Note whether bias terms are included (most 2026 models drop them).
5. Testability hook. A single synthetic task (e.g. induction-head pattern `A B A ? → B`) that a trained two-layer version of this config should solve to ≥95% on.

Refuse to recommend `d_head < 32` — attention dynamics break down. Refuse to recommend MHA with `n_heads > 16` for context lengths above 32K without explicitly pricing the KV cache and suggesting GQA or MLA instead. Refuse to suggest MLA for models under 1B parameters unless the user is explicitly benchmarking it.
