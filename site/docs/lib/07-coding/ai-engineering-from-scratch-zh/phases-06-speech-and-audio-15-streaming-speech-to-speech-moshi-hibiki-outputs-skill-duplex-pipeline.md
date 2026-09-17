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
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/06-speech-and-audio/15-streaming-speech-to-speech-moshi-hibiki/outputs/skill-duplex-pipeline.md"
sourceRel: "phases/06-speech-and-audio/15-streaming-speech-to-speech-moshi-hibiki/outputs/skill-duplex-pipeline.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/06-speech-and-audio/15-streaming-speech-to-speech-moshi-hibiki/outputs/skill-duplex-pipeline.md"
sourceSha256: "2b8172ac0bdf0b494b158ab104fede04d28fee48e892f0914ef5835419513480"
pageSha256: "2b8172ac0bdf0b494b158ab104fede04d28fee48e892f0914ef5835419513480"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

Given the workload (latency target, tool-calling needs, language coverage, hardware budget, cloud vs edge), output:

1. Architecture. Full-duplex (Moshi / GPT-4o Realtime / Gemini Live) vs pipeline (LiveKit + STT + LLM + TTS, Lesson 12). One-sentence reason.
2. Model. Moshi · Hibiki · Hibiki-Zero · Sesame CSM · GPT-4o Realtime · Gemini 2.5 Live · traditional pipeline. Reason.
3. Scale. Per-session GPU cost (Moshi holds a slot), max concurrent sessions, cold-start impact.
4. Tool-calling path. If needed — hybrid pipeline (duplex + external LLM for tool calls) or pure pipeline. Explain trade-off.
5. Language coverage. Full-duplex models have narrow language support; pipelines inherit LLM's multilingual capability.

Refuse full-duplex-only architecture for enterprise agents that need tool-calling / retrieval — Moshi is a dialogue model, not an agent framework. Refuse pipeline-only for sub-250 ms conversational agents — the stages add up. Refuse Moshi for &gt; 4 concurrent sessions on one GPU — hits contention.

Example input: "Voice companion for language learning — conversational fluency practice. English + French. &lt; 250 ms responsiveness. 10k daily actives."

Example output:
- Architecture: full-duplex (Moshi). Sub-250 ms latency requirement + conversational fluency fit Moshi's strengths.
- Model: Moshi. EN + FR both well-supported. CC-BY 4.0 license.
- Scale: one L4 GPU per 4-6 concurrent sessions → ~1500 GPUs at peak for 10k DAU at 10% concurrency. Plan for on-device light mode using Kyutai Pocket TTS + local Whisper for the quiet path.
- Tool calling: minimal — "reveal grammar hint" and "translate this phrase" can be routed via a tiny LLM sidecar; most of the interaction is open-ended dialogue where Moshi shines.
- Language coverage: EN + FR (native); ES / DE / JP via Hibiki-Zero adaptation (1000 h of audio required per new language).
