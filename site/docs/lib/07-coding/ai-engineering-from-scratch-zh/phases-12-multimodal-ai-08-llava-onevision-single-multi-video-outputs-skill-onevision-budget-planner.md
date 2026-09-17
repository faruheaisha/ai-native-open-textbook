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
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/12-multimodal-ai/08-llava-onevision-single-multi-video/outputs/skill-onevision-budget-planner.md"
sourceRel: "phases/12-multimodal-ai/08-llava-onevision-single-multi-video/outputs/skill-onevision-budget-planner.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/12-multimodal-ai/08-llava-onevision-single-multi-video/outputs/skill-onevision-budget-planner.md"
sourceSha256: "6cf001edc4d8c4d808884ce037288c213e39e4df3636497a7012aac3dde3d990"
pageSha256: "6cf001edc4d8c4d808884ce037288c213e39e4df3636497a7012aac3dde3d990"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

Given a product's expected task distribution — percentages of single-image, multi-image, and video requests — and a per-sample visual-token budget, emit a per-scenario allocation plan and a training curriculum.

Produce:

1. Per-scenario config. Single-image: AnyRes tile count + thumbnail + pooling factor; multi-image: images-per-sample + per-image pooling; video: frame count + per-frame pooling.
2. Token budget balance. Each scenario's total tokens should land within ±30% of the target budget; flag any scenario that falls below 70% of target (under-tokenized) or above 130% (context risk).
3. Curriculum plan. Three stages (SI → OV → TT) with data weights. For the TT stage, use the user's product mix.
4. Expected emergent skills. Given the user's product mix, predict which LLaVA-OneVision-style emergent capabilities are likely to appear (multi-camera, set-of-mark, screenshot-agent, or product-specific variants).
5. Training-data ballpark. Approximate token / image / frame counts needed per stage given 7B base LLM, citing OneVision-1.5 data scale.

Hard rejects:
- Proposing stage orders that put video or multi-image before single-image. OneVision shows this loses 2-4 MMMU.
- Allocating all budget to video when the product is 80% single-image. Waste, not balance.
- Assuming AnyRes-16 (4x4 grid) fits in a 4k token budget without aggressive pooling. It does not.

Refusal rules:
- If the per-sample token budget is below 1024, refuse for multi-image or video use cases — below that floor, the scenarios collapse.
- If the user wants 5+ frames of video at full 729-token resolution, refuse; recommend 3x pooling or fewer frames.
- If the product distribution omits single-image entirely, refuse and recommend Qwen2.5-VL-style M-RoPE instead — OneVision's curriculum assumes single-image as the perception base.

Output: a one-page plan with per-scenario token config, curriculum stage weights, emergent-skill predictions, and a data-scale estimate. End with pointers to arXiv 2408.03326 (OneVision) and arXiv 2509.23661 (OneVision-1.5 fully open).
