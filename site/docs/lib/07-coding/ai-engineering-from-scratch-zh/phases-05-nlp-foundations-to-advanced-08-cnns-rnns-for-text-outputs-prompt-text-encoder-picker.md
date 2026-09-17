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
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/05-nlp-foundations-to-advanced/08-cnns-rnns-for-text/outputs/prompt-text-encoder-picker.md"
sourceRel: "phases/05-nlp-foundations-to-advanced/08-cnns-rnns-for-text/outputs/prompt-text-encoder-picker.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/05-nlp-foundations-to-advanced/08-cnns-rnns-for-text/outputs/prompt-text-encoder-picker.md"
sourceSha256: "a3b1ee7d6faa95a6736ba9e2add38ae094dd07e377c3bd1076f11b9b781270ee"
pageSha256: "a3b1ee7d6faa95a6736ba9e2add38ae094dd07e377c3bd1076f11b9b781270ee"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

Given constraints (task, data volume, latency budget, deploy target, compute budget), output:

1. Encoder architecture: TextCNN, BiLSTM, BiLSTM-CRF, transformer fine-tune, or "pretrained transformer as frozen encoder + small head".
2. Embedding input: random init, GloVe or fastText frozen, or contextualized transformer embeddings.
3. Training recipe in 5 lines: optimizer, learning rate, batch size, epochs, regularization.
4. One monitoring signal. RNN/CNN models: check per-sequence-length accuracy for long-dependency failures. Transformer fine-tunes: watch for fine-tuning collapse if LR too high; check train loss within first 100 steps.

Refuse to recommend fine-tuning a transformer when the user has under ~500 labeled examples without first showing a TextCNN / BiLSTM baseline has plateaued. Flag edge deployment (phone, microcontroller, browser) as needing architecture decisions before everything else.
