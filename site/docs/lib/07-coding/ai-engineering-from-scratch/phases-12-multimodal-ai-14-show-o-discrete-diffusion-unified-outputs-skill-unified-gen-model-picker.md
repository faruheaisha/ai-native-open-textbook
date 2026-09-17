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
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/12-multimodal-ai/14-show-o-discrete-diffusion-unified/outputs/skill-unified-gen-model-picker.md"
sourceRel: "phases/12-multimodal-ai/14-show-o-discrete-diffusion-unified/outputs/skill-unified-gen-model-picker.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/12-multimodal-ai/14-show-o-discrete-diffusion-unified/outputs/skill-unified-gen-model-picker.md"
sourceSha256: "6bd7e56a35215e832589e96c52bea7e51ecfc643b425f140a585ef7abbbada16"
pageSha256: "6bd7e56a35215e832589e96c52bea7e51ecfc643b425f140a585ef7abbbada16"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Given a product that needs unified understanding + generation (VQA, captioning, T2I, optionally inpainting) with an open-weights constraint and a latency budget, pick a model family and emit a reference configuration.

Produce:

1. Family verdict. Show-o (masked discrete diffusion), Transfusion / MMDiT (continuous diffusion), Emu3 / Chameleon (autoregressive discrete), or Janus-Pro (decoupled encoders).
2. Inference-step budget. 16 steps for Show-o, 20 for Transfusion, 1024+ for Emu3. Justify the pick with user's latency budget.
3. Inpainting support. Show-o is free; Transfusion adds a mask channel; Emu3 needs a separate fine-tune. Flag this for the user.
4. Tokenizer pick. For discrete families, recommend IBQ / MAGVIT-v2 / SBER; for continuous, recommend SD3's VAE.
5. Training stability. Two-loss (Transfusion) needs weight tuning; Show-o's single loss is cleaner.
6. Migration path if user grows. From Show-o to Transfusion when quality becomes the limit.

Hard rejects:
- Proposing Emu3 / Chameleon when inference latency is <10s per image. Autoregressive over ~1024 tokens is too slow.
- Claiming Show-o matches Transfusion on frontier image quality. It does not. The tokenizer is the ceiling.
- Recommending Stable Diffusion for a product that needs VQA. SD cannot reason about images.

Refusal rules:
- If the user wants <2s per image generation, refuse Show-o and recommend Stable Diffusion + a separate VLM for understanding. Accept the multi-model complexity.
- If user wants "best-in-class quality" with open weights, refuse Show-o / Emu3 and recommend Transfusion-family (MMDiT) or JanusFlow.
- If user cannot commit to a tokenizer (fears licensing, quality ceiling), refuse discrete-only families and recommend Transfusion.

Output: one-page pick with family verdict, step budget, inpainting support, tokenizer recommendation, stability plan, and migration path. End with arXiv 2408.12528 (Show-o), 2408.11039 (Transfusion), 2501.17811 (Janus-Pro).
