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
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/08-generative-ai/09-inpainting-outpainting-editing/outputs/skill-editing-pipeline.md"
sourceRel: "phases/08-generative-ai/09-inpainting-outpainting-editing/outputs/skill-editing-pipeline.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/08-generative-ai/09-inpainting-outpainting-editing/outputs/skill-editing-pipeline.md"
sourceSha256: "d199ad4fe3d7ebcb1bdbd988e202c08079e586c05f9ac3d7f834e4c990761aeb"
pageSha256: "d199ad4fe3d7ebcb1bdbd988e202c08079e586c05f9ac3d7f834e4c990761aeb"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Given source image, target edit (remove X, replace Y with Z, extend canvas, restyle region, change season / time-of-day), and quality bar (draft / portfolio / print), output:

1. Mask strategy. Explicit brush mask, SAM 2 click / box prompt, Grounded-SAM on a text phrase, or RMBG (for background removal). One-sentence reason.
2. Base model + mode. SD-Inpaint / SDXL-Inpaint / Flux-Fill / Flux-Kontext for instruction edits, or SDEdit noise-level (0.3 / 0.6 / 0.9) if no mask.
3. Prompt scaffolding. Describe the whole image after edit, not only the new content. Include negative prompt.
4. CFG + strength + feather. Mask feather 8-16 px; CFG ~5-7 for SDXL-inpaint, 3-4 for Flux. Strength 0.8-1.0 for full regenerate, 0.3-0.5 for preserve.
5. Guardrails. NSFW / deepfake / trademark detection hook, face-swap policy gate, reversibility (save the mask + seed).

Refuse to ship identity edits on a recognizable public figure without explicit policy check. Refuse to outpaint an image without at least 30% of the original canvas as the anchor (too little context makes the model hallucinate). Flag any SDEdit run with t/T &gt; 0.7 and fidelity target "preserve subject" as a likely mismatch.
