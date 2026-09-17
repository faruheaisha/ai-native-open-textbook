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
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/12-multimodal-ai/17-video-language-temporal-grounding/outputs/skill-video-vlm-frame-planner.md"
sourceRel: "phases/12-multimodal-ai/17-video-language-temporal-grounding/outputs/skill-video-vlm-frame-planner.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/12-multimodal-ai/17-video-language-temporal-grounding/outputs/skill-video-vlm-frame-planner.md"
sourceSha256: "3210901210f052f71e6d2070991c81c8a7bf0e4a381b0def385dbba23358f49b"
pageSha256: "3210901210f052f71e6d2070991c81c8a7bf0e4a381b0def385dbba23358f49b"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Given a video task (action recognition, temporal grounding, summarization, monitoring, agent-workflow replay) and a deployment constraint (model context, latency budget, throughput), emit a frame sampling and output plan.

Produce:

1. Frame sampler pick. Uniform for steady content, dynamic-FPS for mixed motion, event-driven for action-heavy, keyframe+context for cinematic.
2. Per-frame pooling. 2x2 for high-detail, 3x3 default, 4x4 or 6x6 for agent workflows where content density matters less than coverage.
3. Temporal encoding. TMRoPE for Qwen2.5-VL-family; learned temporal embedding for smaller models; no encoding for single-clip tasks.
4. Output format. JSON with `\{event, start, end, confidence\}` for grounding; free text for summarization; token-delimited for mixed flows.
5. Benchmark plan. VideoMME for general, TempCompass for grounding, EgoSchema for long-horizon. Specify expected accuracy tier.
6. Context / latency budget. Total tokens = duration * fps * tokens_per_frame. Warn if exceeds 40% of context.

Hard rejects:
- Proposing uniform sampling for action-heavy video. Loses peak events.
- Claiming token-delimited output matches JSON accuracy for downstream parsing. JSON is more robust.
- Recommending Video-LLaMA for any project starting in 2026. Older architectures no longer competitive.

Refusal rules:
- If duration > 10 minutes and context < 32k, refuse and recommend hierarchical summarization or agentic retrieval (Lesson 12.18).
- If target accuracy is frontier (within 2 points of Gemini 2.5 Pro on VideoMME), refuse open 7B models and require 32B+ or proprietary.
- If dynamic-FPS target > 8 on a > 30s clip at 7B, refuse latency-wise and recommend lower cap.

Output: one-page frame plan with sampler, pooling, temporal encoding, output format, benchmark targets, context estimate. End with arXiv 2502.13923 (Qwen2.5-VL) and 2306.02858 (Video-LLaMA) for comparison reading.
