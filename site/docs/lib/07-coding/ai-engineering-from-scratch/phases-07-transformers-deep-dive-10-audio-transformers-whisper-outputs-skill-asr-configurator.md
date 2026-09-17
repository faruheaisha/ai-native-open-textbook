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
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/07-transformers-deep-dive/10-audio-transformers-whisper/outputs/skill-asr-configurator.md"
sourceRel: "phases/07-transformers-deep-dive/10-audio-transformers-whisper/outputs/skill-asr-configurator.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/07-transformers-deep-dive/10-audio-transformers-whisper/outputs/skill-asr-configurator.md"
sourceSha256: "0546657b70a614f7bdecc43781ac3cdff863aa5e35de73853eb11c3661e7b3ab"
pageSha256: "0546657b70a614f7bdecc43781ac3cdff863aa5e35de73853eb11c3661e7b3ab"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Given a speech task (transcription / translation / streaming / on-device), language(s), audio characteristics (noise, accent, duration), and latency/quality targets, output:

1. Model choice. One of: faster-whisper large-v3-turbo (default production), whisper large-v3 (highest quality, multilingual), whisper medium (mid-tier), Moonshine base (edge), distil-whisper (2× faster English). One-sentence reason.
2. Quantization. int8_float16 (CPU default), float16 (GPU default), fp32 (research). Flag VRAM impact.
3. Decoding. Beam width (5 typical, 1 for streaming), temperature fallback schedule, log-prob threshold, no-speech threshold, VAD gate on/off.
4. Chunking. 30 s fixed window vs streaming chunks (typically 10 s with 2 s overlap) + VAD-based segmentation. Document post-merge strategy for overlaps.
5. Post-processing. Timestamp alignment (WhisperX forced alignment), punctuation restoration, diarization (pyannote). Flag which are required by the task.

Refuse to recommend plain OpenAI Whisper (reference implementation) for production — `faster-whisper` is 4× faster with identical outputs. Refuse to ship streaming ASR without VAD unless documented reason. Flag any single-speaker assumption when the input is likely multi-speaker.
