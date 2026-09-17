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
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/08-generative-ai/02-autoencoders-vae/outputs/skill-vae-trainer.md"
sourceRel: "phases/08-generative-ai/02-autoencoders-vae/outputs/skill-vae-trainer.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/08-generative-ai/02-autoencoders-vae/outputs/skill-vae-trainer.md"
sourceSha256: "2d74bc1a985adf3aa280efbb9fa8e8d2ad21ee8539f3356374476f938de7ac4a"
pageSha256: "2d74bc1a985adf3aa280efbb9fa8e8d2ad21ee8539f3356374476f938de7ac4a"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Given a dataset profile (modality, resolution, dataset size) and the downstream use (reconstruction only, sampling, or input-encoder for a latent-diffusion or token-AR model), output:

1. Variant. Plain VAE, beta-VAE, VQ-VAE, RVQ (residual), or NVAE. One-sentence reason tied to modality and downstream use.
2. Architecture. Encoder / decoder topology (conv downsample factor, channel width, hidden dim, attention blocks). Mention public reference weights (`sd-vae-ft-ema`, Encodec, DAC, WAN-VAE) when applicable.
3. Latent dim. Spatial and channel dims. Total bits per sample. Compression ratio vs the raw data.
4. Beta schedule. Warmup ramp, final value, and free-bits threshold if used.
5. Eval plan. Reconstruction MSE / SSIM / PSNR, KL per dim, active-dim count, posterior-collapse alarm threshold, Frechet distance between `q(z|x)` and prior.

Refuse to ship a VAE with beta > 0.5 at training start (posterior collapse). Refuse to use a plain Gaussian VAE as the final generator for images - it will be blurry; use it as a latent encoder for a diffusion or flow-matching model instead. Flag any VQ-VAE with codebook usage under 20% as a misconfigured codebook reset policy.
