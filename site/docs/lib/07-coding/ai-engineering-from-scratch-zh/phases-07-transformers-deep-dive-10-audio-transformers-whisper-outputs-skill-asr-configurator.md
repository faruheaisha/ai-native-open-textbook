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
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/07-transformers-deep-dive/10-audio-transformers-whisper/outputs/skill-asr-configurator.md"
sourceRel: "phases/07-transformers-deep-dive/10-audio-transformers-whisper/outputs/skill-asr-configurator.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/07-transformers-deep-dive/10-audio-transformers-whisper/outputs/skill-asr-configurator.md"
sourceSha256: "0546657b70a614f7bdecc43781ac3cdff863aa5e35de73853eb11c3661e7b3ab"
pageSha256: "0546657b70a614f7bdecc43781ac3cdff863aa5e35de73853eb11c3661e7b3ab"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

Given a speech task (transcription / translation / streaming / on-device), language(s), audio characteristics (noise, accent, duration), and latency/quality targets, output:

1. Model choice. One of: faster-whisper large-v3-turbo (default production), whisper large-v3 (highest quality, multilingual), whisper medium (mid-tier), Moonshine base (edge), distil-whisper (2× faster English). One-sentence reason.
2. Quantization. int8_float16 (CPU default), float16 (GPU default), fp32 (research). Flag VRAM impact.
3. Decoding. Beam width (5 typical, 1 for streaming), temperature fallback schedule, log-prob threshold, no-speech threshold, VAD gate on/off.
4. Chunking. 30 s fixed window vs streaming chunks (typically 10 s with 2 s overlap) + VAD-based segmentation. Document post-merge strategy for overlaps.
5. Post-processing. Timestamp alignment (WhisperX forced alignment), punctuation restoration, diarization (pyannote). Flag which are required by the task.

Refuse to recommend plain OpenAI Whisper (reference implementation) for production — `faster-whisper` is 4× faster with identical outputs. Refuse to ship streaming ASR without VAD unless documented reason. Flag any single-speaker assumption when the input is likely multi-speaker.
