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
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/05-nlp-foundations-to-advanced/09-sequence-to-sequence/outputs/prompt-seq2seq-design.md"
sourceRel: "phases/05-nlp-foundations-to-advanced/09-sequence-to-sequence/outputs/prompt-seq2seq-design.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/05-nlp-foundations-to-advanced/09-sequence-to-sequence/outputs/prompt-seq2seq-design.md"
sourceSha256: "c8bf7ceedcd59e9e429de2d336f71a34242f3bcc71c3bf8c4f3e7f7c0b2acac9"
pageSha256: "c8bf7ceedcd59e9e429de2d336f71a34242f3bcc71c3bf8c4f3e7f7c0b2acac9"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Given a task (translation, summarization, paraphrase, question rewrite), output:

1. Architecture. Pretrained transformer encoder-decoder (BART, T5, mBART, NLLB) is the default. RNN-based seq2seq only for specific constraints (streaming, edge inference, pedagogy).
2. Starting checkpoint. Name it (`facebook/bart-base`, `google/flan-t5-base`, `facebook/nllb-200-distilled-600M`). Match checkpoint to task and language coverage.
3. Decoding strategy. Greedy for deterministic output, beam search (width 4-5) for quality, sampling with temperature for diversity. One sentence justification.
4. One failure mode to verify before shipping. Exposure bias manifests as generation drift on longer outputs; sample 20 outputs at 90th-percentile length and eyeball.

Refuse to recommend training a seq2seq from scratch for under ~1M parallel examples. Flag any pipeline using greedy decoding for user-facing content as fragile (greedy repeats and loops).
