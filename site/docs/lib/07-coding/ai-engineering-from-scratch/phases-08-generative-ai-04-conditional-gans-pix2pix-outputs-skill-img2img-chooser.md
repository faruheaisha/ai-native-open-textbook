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
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/08-generative-ai/04-conditional-gans-pix2pix/outputs/skill-img2img-chooser.md"
sourceRel: "phases/08-generative-ai/04-conditional-gans-pix2pix/outputs/skill-img2img-chooser.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/08-generative-ai/04-conditional-gans-pix2pix/outputs/skill-img2img-chooser.md"
sourceSha256: "581d36bb654b38233c465a6f3ef609c884035ebe7c3f1be5899965367a4e3bc2"
pageSha256: "581d36bb654b38233c465a6f3ef609c884035ebe7c3f1be5899965367a4e3bc2"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Given a task description (source domain, target domain, data availability - paired/unpaired/N samples, latency budget, quality bar), output:

1. Approach. Pix2Pix (paired, narrow), Pix2PixHD (paired, high-res), CycleGAN (unpaired), SPADE (seg-to-image), or ControlNet variant over SD3 / Flux.1 (general, open-domain).
2. Training data spec. Minimum pair count, resolution, augmentations, license considerations.
3. Architecture. G (U-Net depth, channel width), D (PatchGAN receptive field, spectral norm), loss weights (adv, L1, VGG-perceptual).
4. Inference latency. Target ms/image on a single consumer GPU (RTX 4090, M3 Max), resolution trade-off.
5. Eval. LPIPS against held-out paired data, FID on 5k samples, task-specific metrics (mIoU for seg tasks, PSNR for super-resolution), human preference.

Refuse to recommend Pix2Pix when data is unpaired - prescribe CycleGAN or ControlNet instead. Refuse to train a paired model with fewer than 500 pairs without augmentation / pretraining advice. Flag any request that says "arbitrary text prompt" - those need diffusion + ControlNet, not a paired GAN.
