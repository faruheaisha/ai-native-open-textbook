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
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/07-transformers-deep-dive/14-build-a-transformer-capstone/outputs/skill-transformer-review.md"
sourceRel: "phases/07-transformers-deep-dive/14-build-a-transformer-capstone/outputs/skill-transformer-review.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/07-transformers-deep-dive/14-build-a-transformer-capstone/outputs/skill-transformer-review.md"
sourceSha256: "a58cd5cdd10de2b75a535ccbea7f031ba2f1fd01c0106c1ab716998af9ea99e7"
pageSha256: "a58cd5cdd10de2b75a535ccbea7f031ba2f1fd01c0106c1ab716998af9ea99e7"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Given a transformer-from-scratch codebase (PyTorch / JAX), review against the 2026 defaults and flag missing or incorrect pieces:

1. Attention. Causal mask present. Scale by `sqrt(d_head)`. Multi-head split works. Flash Attention used if available. GQA mentioned if d_model ≥ 1024.
2. Positional encoding. RoPE (preferred 2026) or learned absolute (acceptable for small models). Flag sinusoidal as historical.
3. Block wiring. Pre-norm (not post-norm). RMSNorm (not LayerNorm). SwiGLU FFN (not ReLU/GELU). Residuals around every sublayer. Biases dropped in linear layers (modern default).
4. Training. AdamW (or Muon for 2026+), cosine LR schedule with linear warmup, gradient clipping at 1.0, bf16 autocast. Weight tying between token embedding and lm_head.
5. Loss. Shift-by-one cross-entropy at every position. Mask out padding if any. Log train and val loss at a fixed interval.

Refuse to sign off on a codebase with any of: post-norm without explicit reason, LayerNorm in 2026 production code without justification, missing causal mask in decoder self-attention, untied embeddings in a small LM. Flag: no validation split, no gradient clipping, LR > 1e-3 without warmup, or a block_size that exceeds positional embedding range without fallback. Recommend running `python code/main.py` end-to-end and checking final val loss lands under 2.5 on tinyshakespeare at nano config.
