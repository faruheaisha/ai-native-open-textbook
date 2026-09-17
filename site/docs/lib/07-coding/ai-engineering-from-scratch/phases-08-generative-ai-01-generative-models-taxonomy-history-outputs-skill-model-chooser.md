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
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/08-generative-ai/01-generative-models-taxonomy-history/outputs/skill-model-chooser.md"
sourceRel: "phases/08-generative-ai/01-generative-models-taxonomy-history/outputs/skill-model-chooser.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/08-generative-ai/01-generative-models-taxonomy-history/outputs/skill-model-chooser.md"
sourceSha256: "5bb1fa2f6294abfd61da6a16126aa1231304a8e853db27d39eef710fdaabde8f"
pageSha256: "5bb1fa2f6294abfd61da6a16126aa1231304a8e853db27d39eef710fdaabde8f"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Given a task description (modality, domain, latency budget, compute budget, conditioning signal), output:

1. Family. Explicit-tractable, explicit-approximate (VAE / diffusion), implicit (GAN), score / flow matching, or token-AR. One-sentence reason tied to the modality + latency.
2. Backbone + open reference. One pretrained open-weights model the user can fine-tune today (e.g. Stable Diffusion 3, Flux.1-dev, AudioCraft 2, StyleGAN3, 3D Gaussian Splatting).
3. Hosted alternatives. Three production APIs ranked by quality / cost / latency trade-off (fal.ai, Replicate, Stability, Runway, Veo, Kling, ElevenLabs, etc.).
4. Failure mode. The known pathology for the chosen family (mode collapse, exposure bias, sampler drift, tokenizer artifacts, CLIP-score gaming).
5. Budget. Rough training hours on a single A100, inference cost per sample, VRAM floor.

Refuse to recommend a GAN when the task requires likelihood scoring. Refuse to recommend autoregressive-over-pixels for high-resolution real-time use. Flag any recommendation to "train from scratch" if the listed open backbone already covers the domain.
