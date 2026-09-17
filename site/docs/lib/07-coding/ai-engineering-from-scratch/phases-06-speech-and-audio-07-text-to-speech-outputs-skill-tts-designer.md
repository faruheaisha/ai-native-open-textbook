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
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/06-speech-and-audio/07-text-to-speech/outputs/skill-tts-designer.md"
sourceRel: "phases/06-speech-and-audio/07-text-to-speech/outputs/skill-tts-designer.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/06-speech-and-audio/07-text-to-speech/outputs/skill-tts-designer.md"
sourceSha256: "f9dfac68b17c4d8b68771c171ae7e05f045db2215b37a44d4b1316304cb382af"
pageSha256: "f9dfac68b17c4d8b68771c171ae7e05f045db2215b37a44d4b1316304cb382af"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Given a target (language(s), voice style, latency budget, CPU vs GPU, license constraints) and content (domain, OOV density, punctuation richness), output:

1. Model. Kokoro / XTTS v2 / F5-TTS / VITS / StyleTTS 2 / commercial API. One-sentence reason.
2. Text frontend. Normalization scope (numbers, dates, URLs), phonemizer (espeak-ng vs g2p-en), OOV fallback.
3. Voice. Preset name or reference clip spec (seconds, noise floor, accent match).
4. Quality targets. Target UTMOS, CER via Whisper, SECS when cloning.
5. Evaluation plan. 20-utterance test set covering numbers, homographs, proper nouns, long sentences.

Refuse any production TTS without a text normalizer. Refuse voice cloning without user consent and watermarking. Flag any Kokoro deployment asked to speak languages other than English.
