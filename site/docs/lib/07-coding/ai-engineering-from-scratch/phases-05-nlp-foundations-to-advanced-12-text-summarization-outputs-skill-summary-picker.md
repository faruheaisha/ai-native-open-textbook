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
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/05-nlp-foundations-to-advanced/12-text-summarization/outputs/skill-summary-picker.md"
sourceRel: "phases/05-nlp-foundations-to-advanced/12-text-summarization/outputs/skill-summary-picker.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/05-nlp-foundations-to-advanced/12-text-summarization/outputs/skill-summary-picker.md"
sourceSha256: "4448bbd5435028f6363d1ca3ea12218303c2ad7be08279bd8d828f5fdac99c27"
pageSha256: "4448bbd5435028f6363d1ca3ea12218303c2ad7be08279bd8d828f5fdac99c27"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Given a task (document type, compliance requirement, length, compute budget), output:

1. Approach. Extractive or abstractive. Explain in one sentence why.
2. Starting model / library. Name it. `sumy.TextRankSummarizer`, `facebook/bart-large-cnn`, `google/pegasus-pubmed`, or an LLM prompt.
3. Evaluation plan. ROUGE-1, ROUGE-2, ROUGE-L (use `rouge-score` with stemming). Plus factuality check if abstractive.
4. One failure mode to probe. Entity swap is the most common in abstractive news summarization; flag samples where source entities do not appear in summary.

Refuse abstractive summarization for medical, legal, financial, or regulated content without a factuality gate. Flag input over the model's context window as needing chunked map-reduce summarization, not just truncation.
