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
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/07-transformers-deep-dive/05-full-transformer/outputs/skill-transformer-block-reviewer.md"
sourceRel: "phases/07-transformers-deep-dive/05-full-transformer/outputs/skill-transformer-block-reviewer.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/07-transformers-deep-dive/05-full-transformer/outputs/skill-transformer-block-reviewer.md"
sourceSha256: "1bdbec99c46f2316cc9e97fdd7a6c79ed07965ffe4dd09bb98b605a187c2133f"
pageSha256: "1bdbec99c46f2316cc9e97fdd7a6c79ed07965ffe4dd09bb98b605a187c2133f"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Given a transformer block source (PyTorch / JAX / numpy / pseudocode) and its intended role (encoder / decoder / encoder-decoder), output:

1. Wiring check. Pre-norm or post-norm. Residual connections around each sublayer. Flag post-norm as non-default for 2026 unless the author states why.
2. Normalization. LayerNorm vs RMSNorm. RMSNorm preferred. Flag if bias terms are present in Q/K/V/O projections — most 2026 models drop them.
3. Attention shape. MHA / GQA / MQA / MLA. For decoder blocks: confirm causal mask is applied. For cross-attention: confirm Q from decoder, K/V from encoder.
4. FFN. Activation (ReLU / GELU / SwiGLU / GeGLU). Expansion ratio. SwiGLU with ~2.67× is modern default; 4× ReLU/GELU is classic.
5. Positional signal. Confirm RoPE / ALiBi / absolute is applied where expected (typically Q,K projections for RoPE).

Refuse to sign off on a block that stacks more than 12 layers with post-norm and no warmup schedule — training will diverge. Refuse a decoder block without causal masking. Flag any block whose FFN expansion drops below 2× as likely under-capacity. Warn if the block hard-codes `d_model` without a config field for swap-in sizing.
