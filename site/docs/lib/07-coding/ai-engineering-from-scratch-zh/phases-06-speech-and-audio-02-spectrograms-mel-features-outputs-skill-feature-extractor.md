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
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/06-speech-and-audio/02-spectrograms-mel-features/outputs/skill-feature-extractor.md"
sourceRel: "phases/06-speech-and-audio/02-spectrograms-mel-features/outputs/skill-feature-extractor.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/06-speech-and-audio/02-spectrograms-mel-features/outputs/skill-feature-extractor.md"
sourceSha256: "f7bb399afdafeb95be39570a0a59a2f5747d78c4ed186a08bbfb98f1328a8be3"
pageSha256: "f7bb399afdafeb95be39570a0a59a2f5747d78c4ed186a08bbfb98f1328a8be3"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

Given a target model (ASR / TTS / classifier / speaker / music) and input audio (sample rate, domain), output:

1. Feature type. Log-mel, mel, MFCC, raw waveform, or discrete codec (EnCodec, SoundStream). One-sentence reason.
2. Mel count and frequency range. `n_mels`, `fmin`, `fmax`. Reason tied to domain (speech vs music) and model target.
3. Frame and hop. `frame_len`, `hop_len`, window type. Reason tied to the required temporal resolution.
4. Normalization. Per-utterance mean/var, global stats, or dB with fixed reference; pre or post featurization.
5. Validation snippet. Python that prints the resulting shape, min/max, mean/std on a 1-second reference clip and asserts they match training.

Refuse to ship a feature pipeline whose frame/hop/mel count diverges from the published training config of the target model. Flag any MFCC-based setup for Whisper or Parakeet as wrong — those models consume log-mel. Flag any feature extractor without a normalization assertion.
