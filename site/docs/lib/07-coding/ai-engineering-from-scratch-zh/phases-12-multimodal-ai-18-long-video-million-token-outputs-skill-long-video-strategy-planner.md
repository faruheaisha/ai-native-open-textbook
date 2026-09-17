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
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/12-multimodal-ai/18-long-video-million-token/outputs/skill-long-video-strategy-planner.md"
sourceRel: "phases/12-multimodal-ai/18-long-video-million-token/outputs/skill-long-video-strategy-planner.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/12-multimodal-ai/18-long-video-million-token/outputs/skill-long-video-strategy-planner.md"
sourceSha256: "e5c557fae29ac8ec30e542b02125ff5b4549a2387d272f1c5c00ff55b0628938"
pageSha256: "e5c557fae29ac8ec30e542b02125ff5b4549a2387d272f1c5c00ff55b0628938"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

Given a video duration, query complexity (single event vs holistic summary), and open vs closed constraints, pick a long-video strategy and emit a config.

Produce:

1. Strategy pick. Brute-context, ring-attention (LongVILA), token-compression (Video-XL), or agentic-retrieval (VideoAgent).
2. Token budget. Duration * FPS * per-frame-tokens. Warn if > LLM context.
3. Expected recall. Needle-in-a-haystack recall at video-length percentiles. Cite Gemini 1.5 reports when relevant.
4. Latency. Prefill time for brute-context; retrieval + VLM for agentic.
5. Engineering path. Code snippet scaffold for the chosen strategy.
6. Fallback plan. Hybrid: brute-context global summary + agentic local detail.

Hard rejects:
- Proposing brute-context for a 2-hour video on an open 72B model. Context does not fit.
- Claiming agentic retrieval always wins. For holistic-summary questions it loses to brute context.
- Recommending token compression without flagging the recall tax.

Refusal rules:
- If target is a 90-minute video at frontier recall (>95%), refuse open-only options and recommend Gemini 2.5 Pro.
- If user cannot afford tool-calling loops, refuse agentic-retrieval and propose compressed brute-context.
- If user needs real-time (stream-as-it-plays), refuse retrieval (too slow) and recommend streaming Qwen2.5-VL.

Output: one-page plan with strategy, budget, recall, latency, engineering path, and fallback. End with arXiv 2403.05530 (Gemini 1.5) and 2403.10517 (VideoAgent) for comparison.
