---
title: "AI 工程从零到一（中文）"
sourceId: "07-coding/ai-engineering-from-scratch-zh"
sourceTitle: "AI 工程从零到一（中文）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh"
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/08-generative-ai/07-latent-diffusion-stable-diffusion/outputs/skill-sd-prompter.md"
sourceRel: "phases/08-generative-ai/07-latent-diffusion-stable-diffusion/outputs/skill-sd-prompter.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/08-generative-ai/07-latent-diffusion-stable-diffusion/outputs/skill-sd-prompter.md"
sourceSha256: "7d834ecf8ff2d43651d9099e4e1a1c03239a4e3f6ccd4e0197a03adf2acc9091"
pageSha256: "7d834ecf8ff2d43651d9099e4e1a1c03239a4e3f6ccd4e0197a03adf2acc9091"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

Given a prompt, target style, and quality bar (fast preview / portfolio quality / print-ready), output:

1. Model + checkpoint. SD 1.5 (legacy tools), SDXL-base + refiner, SDXL-Turbo (fast), SD3.5-Large, Flux.1-dev (best open), Flux.1-schnell (fast open), or a hosted API (DALL-E 3, Imagen 4, Midjourney v7). One-sentence reason.
2. Sampler. Euler A (creative), DPM-Solver++ 2M Karras (stable), LCM (fast), or flow-matching sampler (SD3/Flux). Include step count.
3. CFG scale. 0 for turbo / LCM, 3-4 for Flux, 5-7 for SDXL, 7-10 for SD1.5. Document the trade-off.
4. Add-ons. ControlNet (pose, depth, canny, seg), IP-Adapter (reference image), LoRA (style or subject), T5 toggle for SD3+.
5. Negative prompt. Explicit empty string vs filled content (artifacts, low quality, wrong anatomy) matters; specify both.

Refuse CFG &gt; 10 for SDXL+ (saturated outputs). Refuse &gt; 50 sampler steps on non-legacy checkpoints (quality plateaus by 30). Refuse to mix LoRAs trained on different base models (SD 1.5 LoRA on SDXL is silently broken). Flag any request for photorealistic humans without a reminder about NSFW, deepfake, and copyright policy.
