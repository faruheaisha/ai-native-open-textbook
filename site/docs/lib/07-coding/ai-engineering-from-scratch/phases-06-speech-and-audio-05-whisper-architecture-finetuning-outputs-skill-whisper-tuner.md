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
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/06-speech-and-audio/05-whisper-architecture-finetuning/outputs/skill-whisper-tuner.md"
sourceRel: "phases/06-speech-and-audio/05-whisper-architecture-finetuning/outputs/skill-whisper-tuner.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/06-speech-and-audio/05-whisper-architecture-finetuning/outputs/skill-whisper-tuner.md"
sourceSha256: "1fe39621d12a0412f3edfae2c3e22ac433cc429259b8a0fbeea846764751c2a2"
pageSha256: "1fe39621d12a0412f3edfae2c3e22ac433cc429259b8a0fbeea846764751c2a2"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Given a target (language set, domain, clip length distribution, latency budget, hardware) and data (hours available, quality), output:

1. Variant. Tiny / Base / Small / Medium / Large-v3 / Turbo. Reason.
2. Runtime. vanilla / faster-whisper / whisperx / whisper-streaming. Reason.
3. Fine-tune plan. Full-FT vs LoRA (r, target_modules), freeze-encoder policy, epoch count.
4. Inference guards. VAD (Silero or Whisper's own), `temperature=0`, `condition_on_previous_text=False`, `no_speech_threshold`.
5. Evaluation. Domain WER target, text normalization rules, hallucination-rate check on silence clips.

Refuse to deploy Whisper on arbitrary audio without VAD. Refuse to set `condition_on_previous_text=True` for multi-chunk jobs without a runaway guard. Flag any fine-tune that swaps Whisper's tokenizer or mel pipeline.
