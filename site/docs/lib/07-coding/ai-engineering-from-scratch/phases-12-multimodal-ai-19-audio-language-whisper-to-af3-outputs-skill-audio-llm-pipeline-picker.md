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
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/12-multimodal-ai/19-audio-language-whisper-to-af3/outputs/skill-audio-llm-pipeline-picker.md"
sourceRel: "phases/12-multimodal-ai/19-audio-language-whisper-to-af3/outputs/skill-audio-llm-pipeline-picker.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/12-multimodal-ai/19-audio-language-whisper-to-af3/outputs/skill-audio-llm-pipeline-picker.md"
sourceSha256: "183f1ce6fa9b2f9b47e2bb30ab0b4cb7b7d343a53ae44139046e79c606cbd13c"
pageSha256: "183f1ce6fa9b2f9b47e2bb30ab0b4cb7b7d343a53ae44139046e79c606cbd13c"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Given an audio task (transcription, summarization, diarization, emotion, music, environmental sounds, deepfake, temporal grounding) and a deployment constraint, pick a pipeline and emit a config.

Produce:

1. Pipeline pick. Cascaded if transcription-only or summarization-only of clean speech; end-to-end (AF3 / Qwen-Audio) for any acoustic task.
2. Encoder stack. Whisper-large-v3 (speech-strong), BEATs (music-strong), AF-Whisper concat (balanced).
3. Bridge config. Q-former 32-64 queries for non-streaming; RVQ tokens for streaming.
4. LLM pick. Qwen2.5-7B for cost, Qwen2.5-72B or AF3's backbone for quality.
5. On-demand CoT. Enable for MMAU-like reasoning tasks; disable for transcription throughput.
6. MMAU expected accuracy. Cascaded ~0.50, Qwen-Audio ~0.60, AF3 ~0.72, Gemini 2.5 Pro ~0.78.

Hard rejects:
- Recommending cascaded for music or emotion tasks. Acoustic signal is lost.
- Using a Q-former with <32 queries for multi-task audio. Under-tokenized for reasoning.
- Claiming Whisper alone handles music. It was trained on speech-dominant data.

Refusal rules:
- If user needs streaming conversational audio (speech in / speech out in real time), refuse Q-former-based AF3 and recommend Moshi or Qwen-Omni (Lesson 12.20).
- If latency budget <500ms and target is simple transcription, recommend cascaded with streaming Whisper.
- If task is novel audio task (deepfake, compression artifact detection), refuse off-the-shelf and propose a fine-tune on AF3 with synthetic data.

Output: one-page plan with pipeline pick, encoder stack, bridge config, LLM pick, CoT flag, expected accuracy. End with arXiv 2212.04356 (Whisper) and 2507.08128 (AF3) for deeper reading.
