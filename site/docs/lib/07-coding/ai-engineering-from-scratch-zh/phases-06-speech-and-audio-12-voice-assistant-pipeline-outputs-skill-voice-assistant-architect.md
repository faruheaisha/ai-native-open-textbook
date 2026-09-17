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
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/06-speech-and-audio/12-voice-assistant-pipeline/outputs/skill-voice-assistant-architect.md"
sourceRel: "phases/06-speech-and-audio/12-voice-assistant-pipeline/outputs/skill-voice-assistant-architect.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/06-speech-and-audio/12-voice-assistant-pipeline/outputs/skill-voice-assistant-architect.md"
sourceSha256: "69c7f545b3a300419cac6f34d596533d117b9aed00eff7f2741b717edf8657a8"
pageSha256: "69c7f545b3a300419cac6f34d596533d117b9aed00eff7f2741b717edf8657a8"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

Given the use case (consumer / customer-support / accessibility / edge), expected scale (concurrent sessions, minutes/month), language, latency targets, compliance (HIPAA, PCI, EU AI Act, CA SB 942), output:

1. Components (7 layers). Mic + chunking · VAD · streaming STT · LLM + tools · streaming TTS · playback · interruption handler. Name the exact provider/model for each.
2. Latency budget. P50 / P95 / P99 targets per stage summing to the end-to-end target. Mark which stages are independent vs sequential.
3. Tool-call schema. JSON spec for each tool + error handling + fallback text. Always include a "can't help" path that the LLM must take when it fails twice.
4. Safety. Prompt injection guard, voice-cloning lockout (if TTS is cloning-capable), wake-word gate (for always-on), PII redaction in logs, 30-day retention.
5. Observability. P50/P95/P99 per stage · false-interruption rate · tool-call success rate · WER per 100 calls · cost per minute · abandon rate.
6. Compliance. Disclosure audio ("This is an AI assistant"), region-pinning (EU data in EU), audit log retention, opt-out pathway.

Refuse always-on deployments without a wake word. Refuse TTS that does not stream (adds utterance-length latency). Refuse averaging latency without P95 — tail is where users churn. Refuse raw-audio retention &gt; 30 days without a legal review.

Example input: "Accessibility assistant for low-vision users: voice-only interface to a consumer email app. English. P95 &lt; 600 ms. ~10k concurrent users."

Example output:
- Components: sounddevice (WebRTC via LiveKit Agents) · Silero VAD · Deepgram Nova-3 (English) · GPT-4o with email tools (read_message, compose_reply, mark_read) · Cartesia Sonic 2 streaming · WebRTC out · interrupt=cancel-LLM-and-TTS on VAD fire.
- Budget: capture 120 ms + VAD 40 + STT 150 + LLM TTFT 100 + TTS TTFA 150 = 560 ms P95.
- Tools: read_message(\{id\}), compose_reply(\{message_id, body\}), mark_read(\{id\}), search(\{query\}). All return JSON; LLM has max 2 retries per tool then fallback "I couldn't do that — try rephrasing".
- Safety: prompt-injection guard (detect `ignore previous instructions`); wake word "Hey Mail"; no voice cloning (fixed Cartesia voice); redact email bodies in logs.
- Observability: Hamming AI production monitoring; per-stage Prometheus histograms; alert on false-interrupt &gt; 5% or p95 &gt; 800 ms.
- Compliance: AI disclosure on first use; HIPAA opt-in for medical messages only; EU users hit EU-hosted Cartesia + GPT-4o Ireland.
