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
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/08-generative-ai/03-gans-generator-discriminator/outputs/skill-gan-debugger.md"
sourceRel: "phases/08-generative-ai/03-gans-generator-discriminator/outputs/skill-gan-debugger.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/08-generative-ai/03-gans-generator-discriminator/outputs/skill-gan-debugger.md"
sourceSha256: "cabe7391c5687e54ab76026c16ffdad15d11f106010cdfe0bcf7455888236123"
pageSha256: "cabe7391c5687e54ab76026c16ffdad15d11f106010cdfe0bcf7455888236123"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Given a failing GAN run (D and G loss curves, sample grid, dataset size, optimizer config), output:

1. Diagnosis. One root cause from: mode collapse, D too strong, D too weak, vanishing gradient, batch-norm leakage, overfit D, learning-rate mismatch, bad init.
2. Evidence. Pointer to the telltale in the loss curves or samples (e.g. "D(fake) &lt; 0.05 by step 500 = D too strong").
3. Fix. One concrete change. Examples: `lr_D = lr_G / 2`, replace BN with IN, add spectral norm to D, switch to WGAN-GP with lambda=10, cut batch size by 2, add 0.1 Gaussian noise to D inputs.
4. Rerun protocol. Seeds to try, number of steps before re-evaluation, acceptance criterion (e.g. "FID drops below baseline by step 20k").
5. Fallback. If the fix doesn't land in one rerun, what to try next. Usually: switch architecture (StyleGAN, R3GAN) or switch paradigm (diffusion, flow matching) if dataset is too diverse.

Refuse to recommend increasing G learning rate when D is already saturated. Refuse to add regularization to G when the real failure is D - fix D first. Flag any run that shows training collapse within 100 steps as likely bad init or lr blowup, not a deep algorithmic issue.
