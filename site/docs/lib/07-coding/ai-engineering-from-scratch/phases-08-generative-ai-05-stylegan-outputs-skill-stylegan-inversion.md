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
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/08-generative-ai/05-stylegan/outputs/skill-stylegan-inversion.md"
sourceRel: "phases/08-generative-ai/05-stylegan/outputs/skill-stylegan-inversion.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/08-generative-ai/05-stylegan/outputs/skill-stylegan-inversion.md"
sourceSha256: "27c376c7fc6a8de4479ca508ffb67d4f2580f191d687d0ead5874c53d3c7f651"
pageSha256: "27c376c7fc6a8de4479ca508ffb67d4f2580f191d687d0ead5874c53d3c7f651"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Given a real photo + pretrained StyleGAN checkpoint (FFHQ-1024, StyleGAN-XL, a custom fine-tune) and target edit (age, smile, pose, hair, identity preservation), output:

1. Inversion method. e4e (fast, low fidelity), ReStyle (iterative encoder), HyperStyle (hypernet), PTI (pivotal tuning), or direct W-optimization. One-sentence reason tied to fidelity vs speed.
2. Target space. W, W+, or StyleSpace. Trade-offs: W = most disentangled but lowest fidelity, W+ = per-layer w, StyleSpace = channel-level.
3. Editing direction. Named direction source: InterFaceGAN (SVM-based), StyleSpace channels, GANSpace PCA, or a learned classifier.
4. Fidelity budget. LPIPS threshold before identity drift; rollback heuristic.
5. Eval. ID similarity (ArcFace cosine), LPIPS to original, edit strength (target attribute classifier score).

Refuse any pipeline that edits directly in Z (entangled). Refuse large edits (&gt;1.5 sigma in W) without identity checks. Flag requests that need open-domain editing (e.g. "make him a cartoon") - those require diffusion + IP-Adapter, not StyleGAN.
