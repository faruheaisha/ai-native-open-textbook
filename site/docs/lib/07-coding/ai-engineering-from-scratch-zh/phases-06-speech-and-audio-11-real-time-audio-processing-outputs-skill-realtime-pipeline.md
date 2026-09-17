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
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/06-speech-and-audio/11-real-time-audio-processing/outputs/skill-realtime-pipeline.md"
sourceRel: "phases/06-speech-and-audio/11-real-time-audio-processing/outputs/skill-realtime-pipeline.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/06-speech-and-audio/11-real-time-audio-processing/outputs/skill-realtime-pipeline.md"
sourceSha256: "642810014637fdaf523acc6f89a54be209cc80ed8e3fb5d7e79b9763d6dba283"
pageSha256: "642810014637fdaf523acc6f89a54be209cc80ed8e3fb5d7e79b9763d6dba283"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

Given the target (latency P50/P95, language, channel, offline vs cloud, call volume), output:

1. Transport. WebRTC (LiveKit / Daily) · WebSocket · SIP trunking (Twilio / Telnyx). Reason tied to jitter tolerance + use case.
2. VAD + turn-taking. Silero VAD (open, 99.5% TPR) · Cobra (commercial) · LiveKit turn-detector. Threshold, min speech duration, silence hang-over.
3. Streaming STT. Parakeet TDT (fastest open) · Kyutai STT (with flush trick) · Deepgram Nova-3 (API, ~150 ms) · Whisper-streaming. Reason.
4. LLM + streaming. Pin the first 20 tokens before TTS kicks in. Model + streaming config + guardrails for prompt injection.
5. Streaming TTS. Kokoro-82M (~100 ms TTFA) · Orpheus · Cartesia Sonic · ElevenLabs Turbo. Voice-pack or cloning guard (Lesson 8).
6. Orchestration. LiveKit Agents · Pipecat · Vapi · Retell · custom Rust. Reason tied to team skills + scale.
7. Observability. P50/P95/P99 per-stage histograms; false-positive interruption rate; drop-call rate; WER on call samples.

Refuse deploys that buffer entire utterances before STT. Refuse TTS that does not stream. Refuse evaluation by average latency — require P95. Refuse managed platforms (Vapi / Retell) for &gt; 100k minutes/month without a cost-comparison to build-your-own.

Example input: "Voice agent for car insurance quoting. &lt; 500 ms P95. English, US. 50k minutes/week. Compliance: HIPAA-adjacent (no PII in logs)."

Example output:
- Transport: LiveKit Agents + Twilio SIP. Proven at call-center scale, HIPAA-mode opt-in.
- VAD: Silero VAD @ threshold 0.45, min speech 220 ms, silence hang-over 400 ms. LiveKit turn-detector overlay.
- STT: Deepgram Nova-3 English (~150 ms P95); fall-back to Parakeet-TDT if on-prem audit required.
- LLM: GPT-4o streaming via OpenAI realtime API; guard against prompt injection with a post-filter; pin first 20 tokens to TTS.
- TTS: Cartesia Sonic 2 (~150 ms TTFA, voice cloning not used — predefined voice).
- Orchestration: LiveKit Agents. Observability via Hamming AI for production.
- Logs: strip CVV / SSN / DOB with a regex + NER pass before persistence. Retain 30 days.
