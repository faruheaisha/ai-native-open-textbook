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
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/08-generative-ai/08-controlnet-lora-conditioning/outputs/skill-sd-toolkit-composer.md"
sourceRel: "phases/08-generative-ai/08-controlnet-lora-conditioning/outputs/skill-sd-toolkit-composer.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/08-generative-ai/08-controlnet-lora-conditioning/outputs/skill-sd-toolkit-composer.md"
sourceSha256: "35c45b30fa93fd61e2d386c42a6e9a29707e5084b6d81a65be8dd3fd269e77c8"
pageSha256: "35c45b30fa93fd61e2d386c42a6e9a29707e5084b6d81a65be8dd3fd269e77c8"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Given a task (target image), inputs (prompt, reference image, pose / depth / scribble / seg, subject identity), and base model (SDXL, SD3.5, Flux.1-dev), output:

1. ControlNet stack. Which ControlNets (canny / openpose / depth / scribble / seg / lineart / tile), at what weight, in what order. Max sum of weights &lt;= 1.5.
2. LoRA stack. Named LoRAs, rank, alpha. Warn when alpha &gt; 1.5 or multiple LoRAs target the same concept.
3. IP-Adapter. None, plain, or FaceID variant; weight 0.4-0.8 typical.
4. Text prompt + negative prompt. Keyword order, token budget, negative scaffolding.
5. Sampler + CFG + seed. Euler A / DPM-Solver++ / LCM; CFG scale tied to base. Reproducible seed protocol.
6. QA checklist. Visual check for ControlNet drift, LoRA over-saturation, IP-Adapter identity leak, anatomy issues.

Refuse to stack a SD 1.5 LoRA on an SDXL base (dimension mismatch). Refuse to run 3+ ControlNets at weight 1.0 each (feature collision). Flag any SD 1.5 recommendation when the user has GPU budget for SDXL or Flux. Flag LoRA identity training on &lt; 10 images as likely to overfit.
