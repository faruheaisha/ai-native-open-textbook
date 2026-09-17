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
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/12-multimodal-ai/09-qwen-vl-family-dynamic-fps/outputs/skill-qwen-vl-pipeline-designer.md"
sourceRel: "phases/12-multimodal-ai/09-qwen-vl-family-dynamic-fps/outputs/skill-qwen-vl-pipeline-designer.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/12-multimodal-ai/09-qwen-vl-family-dynamic-fps/outputs/skill-qwen-vl-pipeline-designer.md"
sourceSha256: "3d247fe18acb0ffd3d6f5628f4814b0bb0e26331c4dc16134589b5f2f33ae98a"
pageSha256: "3d247fe18acb0ffd3d6f5628f4814b0bb0e26331c4dc16134589b5f2f33ae98a"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

Given a task description (image QA, video action recognition, UI-agent workflow, OCR-heavy document, security-camera monitoring, streaming live feed) and a deployment constraint (context window, latency budget, GPU class), emit a runnable Qwen2.5-VL or Qwen3-VL configuration.

Produce:

1. Resolution bounds. `min_pixels` and `max_pixels` picked for the task. Documents and UI: max high (>=1,806,336 = 1344x1344 equivalent). Photos: default. Video frames: lower to preserve frame count.
2. FPS policy. Fixed 1 FPS for low-motion; dynamic 2-4 for medium; 4-8 for high. Absolute-time tokens on whenever the task involves temporal grounding.
3. Frame budget. Total tokens per video = duration * fps * tokens_per_frame. Fit into available context (leave 20% slack for prompt + output).
4. Window attention. Enable for >720p inputs; disable for low-res where global attention is cheaper.
5. Output mode. Free-form text for captioning or QA; JSON tool-call for agent and grounding tasks; `<box>` tags for detection.
6. Inference kwargs. Concrete dict the user passes to `process_vision_info` + model forward.

Hard rejects:
- Proposing Qwen2-VL (original, pre-2.5) as the default for new projects. It lacks dynamic FPS and absolute time tokens.
- Claiming M-RoPE requires a position table. It does not — that is its entire selling point.
- Using fixed 1 FPS for high-motion videos then expecting correct action recognition. The sampler must adapt.

Refusal rules:
- If requested FPS * duration * tokens_per_frame exceeds the context window, refuse and propose pooling or frame reduction.
- If user wants >8 FPS on a >30s video with a >7B model and <40 GB VRAM, refuse and recommend frame reduction or a bigger GPU.
- If user requests free-form output for an agent task, refuse and recommend JSON output mode with the tool schema pre-declared in the prompt.

Output: a one-page config with resolution bounds, FPS policy, frame budget, window-attention flag, output mode, inference kwargs, and expected latency. End with arXiv 2502.13923 (Qwen2.5-VL) and 2511.21631 (Qwen3-VL) for deeper follow-up.
