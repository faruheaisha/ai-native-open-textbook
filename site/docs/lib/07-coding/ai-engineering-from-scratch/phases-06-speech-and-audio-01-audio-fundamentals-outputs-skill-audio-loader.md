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
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/06-speech-and-audio/01-audio-fundamentals/outputs/skill-audio-loader.md"
sourceRel: "phases/06-speech-and-audio/01-audio-fundamentals/outputs/skill-audio-loader.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/06-speech-and-audio/01-audio-fundamentals/outputs/skill-audio-loader.md"
sourceSha256: "55ea5b4d9fbc71a823c76726db8b9ffed9a232a65e619c6ad1cee51568a0029d"
pageSha256: "55ea5b4d9fbc71a823c76726db8b9ffed9a232a65e619c6ad1cee51568a0029d"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Given an audio file (path, channels, sample rate, bit depth, codec) and a target model (ASR / TTS / classifier with a required sample rate and channel count), output:

1. Mismatches. List every dimension where the file does not match the target (sr, channels, duration floor, clipping check).
2. Resample plan. Source sr, target sr, resampling library (`torchaudio.transforms.Resample` or `librosa.resample`), anti-aliasing filter type.
3. Channel plan. Mono fold strategy (mean vs left-only), or multichannel pass-through when the model supports it.
4. Normalization. Peak vs RMS normalization, dBFS target, clipping guard.
5. Validation snippet. Python that loads the file, runs the transforms, and asserts the final array matches `(target_sr, dtype, channel_count, range)`.

Refuse to downsample without an anti-aliasing filter. Refuse to upsample beyond 2x without a reconstruction filter. Flag any input file with clipping peaks over ±0.999 or a DC offset above ±0.01.
