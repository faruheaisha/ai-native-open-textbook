---
title: "Phase 8: Generative AI"
sourceId: "07-coding/ai-engineering-from-scratch"
sourceTitle: "AI Engineering from Scratch（英文原版）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/rohitg00/ai-engineering-from-scratch"
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/08-generative-ai/README.md"
sourceRel: "phases/08-generative-ai/README.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/08-generative-ai/README.md"
sourceSha256: "1074380986567465c8e9da3d1c47793210a84208a9a9b439a248f052b3d0c0d5"
pageSha256: "1074380986567465c8e9da3d1c47793210a84208a9a9b439a248f052b3d0c0d5"
contentMode: "local-full"
zh: ""
---

# Phase 8: Generative AI

> Create images, video, audio, 3D, and more.

## Start this phase on GitHub

**Prerequisites:** Phase 2 ML Fundamentals, Phase 3 Deep Learning Core, and
Phase 7 Lesson 14, Build a Transformer from Scratch.

**First lesson:** [Generative Model Taxonomy and History](https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/08-generative-ai/01-generative-models-taxonomy-history/README.md)

Run this command from the repository root:

```bash
python3 phases/08-generative-ai/01-generative-models-taxonomy-history/code/main.py
```

Keep the command, exit code, density estimates, generated samples, and one
sentence explaining what an implicit generator cannot answer about `p(x)`.

**Next action:** Change the random seed, compare the density estimates, then
continue to [Autoencoders and VAE](https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/08-generative-ai/02-autoencoders-vae/README.md).

Browse the [full Phase 8 lesson list](/lib/07-coding/ai-engineering-from-scratch/overview#phase-8) or the
[cross-phase roadmap](/lib/07-coding/ai-engineering-from-scratch/ROADMAP).

15 lessons, about 15 hours total. Each lesson ships a detailed document, a
runnable Python demo, a diagram, and a named skill for your agent.

| # | Lesson | Time |
|---|--------|------|
| 01 | [Generative Models: Taxonomy and History](https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/08-generative-ai/01-generative-models-taxonomy-history/README.md) | ~45 min |
| 02 | [Autoencoders & VAE](https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/08-generative-ai/02-autoencoders-vae/README.md) | ~75 min |
| 03 | [GANs: Generator vs Discriminator](https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/08-generative-ai/03-gans-generator-discriminator/README.md) | ~75 min |
| 04 | [Conditional GANs & Pix2Pix](https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/08-generative-ai/04-conditional-gans-pix2pix/README.md) | ~75 min |
| 05 | [StyleGAN](https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/08-generative-ai/05-stylegan/README.md) | ~45 min |
| 06 | [Diffusion Models: DDPM from Scratch](https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/08-generative-ai/06-diffusion-ddpm-from-scratch/README.md) | ~75 min |
| 07 | [Latent Diffusion & Stable Diffusion](https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/08-generative-ai/07-latent-diffusion-stable-diffusion/README.md) | ~75 min |
| 08 | [ControlNet, LoRA & Conditioning](https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/08-generative-ai/08-controlnet-lora-conditioning/README.md) | ~75 min |
| 09 | [Inpainting, Outpainting & Editing](https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/08-generative-ai/09-inpainting-outpainting-editing/README.md) | ~75 min |
| 10 | [Video Generation](https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/08-generative-ai/10-video-generation/README.md) | ~45 min |
| 11 | [Audio Generation](https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/08-generative-ai/11-audio-generation/README.md) | ~45 min |
| 12 | [3D Generation](https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/08-generative-ai/12-3d-generation/README.md) | ~45 min |
| 13 | [Flow Matching & Rectified Flows](https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/08-generative-ai/13-flow-matching-rectified-flows/README.md) | ~45 min |
| 14 | [Evaluation: FID, CLIP Score, Human Preference](https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/08-generative-ai/14-evaluation-fid-clip-score/README.md) | ~45 min |
| 19 | [Visual Autoregressive Modeling](https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/08-generative-ai/19-visual-autoregressive-var/README.md) | ~60 min |
