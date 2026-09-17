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
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/07-transformers-deep-dive/08-t5-bart-encoder-decoder/outputs/skill-seq2seq-picker.md"
sourceRel: "phases/07-transformers-deep-dive/08-t5-bart-encoder-decoder/outputs/skill-seq2seq-picker.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/07-transformers-deep-dive/08-t5-bart-encoder-decoder/outputs/skill-seq2seq-picker.md"
sourceSha256: "b8738235ed40a362a8d1b1cd257c87887533eb33ba93dadeb4ec4af4a7733c21"
pageSha256: "b8738235ed40a362a8d1b1cd257c87887533eb33ba93dadeb4ec4af4a7733c21"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

Given a seq2seq task (translation / summarization / speech-to-text / structured extraction / rewrite), input and output length distributions, and quality vs latency priorities, output:

1. Architecture. One of: encoder-decoder (T5 / BART / Whisper-style), decoder-only instruction-tuned, encoder-only + prompt template. One-sentence reason.
2. Pretraining objective. Span corruption (T5), denoising (BART), next-token (decoder-only), or "skip pretraining, fine-tune existing checkpoint." Name the checkpoint.
3. Input formatting. Task prefix string (T5 style) vs system prompt (decoder-only) vs raw tokens (BART). Include BOS/EOS handling.
4. Decoding strategy. Beam search width and length penalty (translation/summary), or nucleus/min-p (chat-like tasks). State which for the task.
5. Eval. Task-appropriate metric: BLEU / ROUGE / WER / F1 / exact match. Include test split size.

Refuse to recommend encoder-only for generative outputs. Refuse to recommend encoder-decoder when the input is already a conversation — decoder-only fits conversation memory naturally. Flag any choice of decoder-only for speech-to-text without mentioning Whisper as the baseline to beat.
