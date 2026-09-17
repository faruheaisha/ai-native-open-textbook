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
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/05-nlp-foundations-to-advanced/10-attention-mechanism/outputs/prompt-attention-shapes.md"
sourceRel: "phases/05-nlp-foundations-to-advanced/10-attention-mechanism/outputs/prompt-attention-shapes.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/05-nlp-foundations-to-advanced/10-attention-mechanism/outputs/prompt-attention-shapes.md"
sourceSha256: "9eb4c3167dbb5adf38277eb88a3c53b87d120240c4a883f1d81f688ca77a7b3f"
pageSha256: "9eb4c3167dbb5adf38277eb88a3c53b87d120240c4a883f1d81f688ca77a7b3f"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Given a broken attention implementation, you identify the shape mismatch. Output:

1. Which matrix has the wrong shape. Name the tensor.
2. What its shape should be, derived from `(d_s, d_h, d_attn, T_enc, T_dec, batch_size)`.
3. One-line fix. Transpose, reshape, or project.
4. A test to catch regressions. Typically assert `output.shape == (batch, T_dec, d_h)` and `weights.shape == (batch, T_dec, T_enc)` and `weights.sum(dim=-1)` is close to 1.

Refuse to recommend fixes that silently broadcast. Broadcast-hiding bugs surface later as silent accuracy degradation.

For Bahdanau confusion, insist the decoder input is `s_\{t-1\}` (pre-step state). For Luong, `s_t` (post-step state). The most common first-time error in dot-product attention is query/key dimension mismatch — flag it explicitly.
