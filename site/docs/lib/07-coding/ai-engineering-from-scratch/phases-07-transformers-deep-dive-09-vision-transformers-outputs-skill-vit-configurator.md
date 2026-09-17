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
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/07-transformers-deep-dive/09-vision-transformers/outputs/skill-vit-configurator.md"
sourceRel: "phases/07-transformers-deep-dive/09-vision-transformers/outputs/skill-vit-configurator.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/07-transformers-deep-dive/09-vision-transformers/outputs/skill-vit-configurator.md"
sourceSha256: "c6847f2a71b8d4032bd739eb708dd58039807d086dcda6c2d5ce1a032b6b0e84"
pageSha256: "c6847f2a71b8d4032bd739eb708dd58039807d086dcda6c2d5ce1a032b6b0e84"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Given a vision task (classification / segmentation / detection / retrieval), image resolution, dataset size (labeled + unlabeled), and deployment target, output:

1. Backbone. One of: DINOv2 ViT-L/14 (default for retrieval/classification), SAM 3 encoder (segmentation), SigLIP (vision-language), ConvNeXt (latency-critical). One-sentence reason.
2. Patch size. 16 for standard classification at 224, 14 for DINOv2, 8 for dense prediction at high res. Flag sequence length `(H/P)^2 + 1` and attention cost `O(N^2)`.
3. Pretraining source. Checkpoint name. For small labeled sets (<10k): DINOv2 features frozen + linear probe. For >100k: fine-tune last blocks. State why.
4. Training recipe. Optimizer (AdamW), lr, augmentations (RandAug, MixUp, Random Erasing), label smoothing (0.1 typical), EMA.
5. Risk note. Data regime risk (too little data for full fine-tune), resolution mismatch (pretrain 224 → deploy 1024 without position interpolation), register-token absence (may hurt DINOv2 features).

Refuse to recommend training a ViT from scratch on less than 1M images — CNN baselines will win. Refuse to recommend patch size that yields sequence length > 4096 without explicit discussion of Flash Attention + hierarchical variants (Swin). Flag any deployment that changes input resolution without interpolating positional embeddings.
