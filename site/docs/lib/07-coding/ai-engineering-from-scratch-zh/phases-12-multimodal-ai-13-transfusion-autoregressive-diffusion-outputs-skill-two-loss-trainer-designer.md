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
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/12-multimodal-ai/13-transfusion-autoregressive-diffusion/outputs/skill-two-loss-trainer-designer.md"
sourceRel: "phases/12-multimodal-ai/13-transfusion-autoregressive-diffusion/outputs/skill-two-loss-trainer-designer.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/12-multimodal-ai/13-transfusion-autoregressive-diffusion/outputs/skill-two-loss-trainer-designer.md"
sourceSha256: "a50f57e83570ff9180c6243829e37d6a5604ff276294b48eb70edc41653f6164"
pageSha256: "a50f57e83570ff9180c6243829e37d6a5604ff276294b48eb70edc41653f6164"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

Given a multimodal training spec (two modalities, which gets NTP and which gets diffusion, target model scale, target sample length), design a working two-loss setup.

Produce:

1. Modality split. Which tokens are discrete (NTP) and which are continuous (diffusion). Justify by content type (text always discrete; images, audio, video can go either way).
2. Attention mask. Draw the block-triangular mask for an example sequence. Specify bidirectional regions and causal regions.
3. Loss weights. Starting weights for (text_loss, image_loss). Recommend tuning by target gradient-norm ratio. Cite Transfusion's ~0.1 default.
4. Flow-matching vs DDPM. Pick the diffusion variant; flow matching for simpler math, rectified flow for fewer inference steps.
5. Inference plan. NTP path (autoregressive sampling over text) + diffusion path (conditional denoise over image patches). Specify denoise steps (10-30).
6. MMDiT vs Transfusion split. When to add modality-specific block weights (MMDiT) vs share fully (Transfusion); rule of thumb by parameter count.

Hard rejects:
- Claiming one mask fits all sequences. Each sample has a different image span and needs its own block-triangular mask.
- Using DDPM without rectified flow or flow matching. Both need fewer inference steps and are simpler to tune.
- Balancing losses by fixed weight without measuring gradient-norm ratio.

Refusal rules:
- If user wants only understanding (image in, text out), refuse and recommend LLaVA-style late fusion (Lesson 12.05). Two-loss is for generation.
- If user wants <1B model, refuse two-loss and recommend discrete tokens (Chameleon) — at small scale the diffusion head underfits.
- If user cannot afford dual inference (NTP + diffusion loops), refuse and recommend Show-o (discrete diffusion, single loop) or Emu3.

Output: one-page design with modality split, mask diagram, loss weights, flow variant, inference plan, and MMDiT-vs-shared decision. End with arXiv 2408.11039 (Transfusion) and 2403.03206 (SD3) for canonical references.
