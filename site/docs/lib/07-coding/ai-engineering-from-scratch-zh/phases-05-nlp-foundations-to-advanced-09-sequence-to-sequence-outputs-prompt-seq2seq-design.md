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
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/05-nlp-foundations-to-advanced/09-sequence-to-sequence/outputs/prompt-seq2seq-design.md"
sourceRel: "phases/05-nlp-foundations-to-advanced/09-sequence-to-sequence/outputs/prompt-seq2seq-design.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/05-nlp-foundations-to-advanced/09-sequence-to-sequence/outputs/prompt-seq2seq-design.md"
sourceSha256: "c8bf7ceedcd59e9e429de2d336f71a34242f3bcc71c3bf8c4f3e7f7c0b2acac9"
pageSha256: "c8bf7ceedcd59e9e429de2d336f71a34242f3bcc71c3bf8c4f3e7f7c0b2acac9"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

Given a task (translation, summarization, paraphrase, question rewrite), output:

1. Architecture. Pretrained transformer encoder-decoder (BART, T5, mBART, NLLB) is the default. RNN-based seq2seq only for specific constraints (streaming, edge inference, pedagogy).
2. Starting checkpoint. Name it (`facebook/bart-base`, `google/flan-t5-base`, `facebook/nllb-200-distilled-600M`). Match checkpoint to task and language coverage.
3. Decoding strategy. Greedy for deterministic output, beam search (width 4-5) for quality, sampling with temperature for diversity. One sentence justification.
4. One failure mode to verify before shipping. Exposure bias manifests as generation drift on longer outputs; sample 20 outputs at 90th-percentile length and eyeball.

Refuse to recommend training a seq2seq from scratch for under ~1M parallel examples. Flag any pipeline using greedy decoding for user-facing content as fragile (greedy repeats and loops).
