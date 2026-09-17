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
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/06-speech-and-audio/04-speech-recognition-asr/outputs/skill-asr-picker.md"
sourceRel: "phases/06-speech-and-audio/04-speech-recognition-asr/outputs/skill-asr-picker.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/06-speech-and-audio/04-speech-recognition-asr/outputs/skill-asr-picker.md"
sourceSha256: "65154b5440a623ba56d794b692d93d72ecff19b04e1037715b9338753845d8c5"
pageSha256: "65154b5440a623ba56d794b692d93d72ecff19b04e1037715b9338753845d8c5"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

Given a deployment target (language list, domain, latency budget, hardware, offline / streaming, clip duration), output:

1. Model. Whisper-large-v3-turbo / Parakeet-TDT / Canary-Flash / wav2vec 2.0 / Moonshine. Reason in one sentence.
2. Decoding. Greedy / beam width / temperature fallback / LM fusion weight. Reason tied to the quality budget.
3. Chunking and VAD. Chunk length, stride, whether to gate with Silero-VAD or Whisper's own.
4. Language policy. Force language vs auto-LID; how to handle cross-lingual frames.
5. Eval plan. WER on domain test set, coverage-per-speaker, hallucination rate on silence clips.

Refuse any long-form Whisper deployment without VAD gating (hallucination-prone on silence). Refuse to report WER without text normalization (lower, punct strip). Flag any beam-width > 16 without an LM; raw beams over blanks do not help.
