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
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/05-nlp-foundations-to-advanced/05-sentiment-analysis/outputs/prompt-sentiment-baseline.md"
sourceRel: "phases/05-nlp-foundations-to-advanced/05-sentiment-analysis/outputs/prompt-sentiment-baseline.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/05-nlp-foundations-to-advanced/05-sentiment-analysis/outputs/prompt-sentiment-baseline.md"
sourceSha256: "340a416ca0965f5f242d3dff5643d9ee0a69c881081dc8f30ce8ffdffeb58474"
pageSha256: "340a416ca0965f5f242d3dff5643d9ee0a69c881081dc8f30ce8ffdffeb58474"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Given a dataset description (domain, language, size, label granularity, latency budget), you output:

1. Feature extraction recipe. Specify tokenizer, n-gram range, stopword policy (usually keep), negation handling (scoped prefix or bigrams).
2. Classifier. Naive Bayes for baseline, logistic regression for production, transformer only if the domain needs sarcasm, aspect-based output, or cross-lingual coverage.
3. Evaluation plan. Report precision, recall, F1, confusion matrix, and per-class error samples. Never report accuracy alone on imbalanced data.
4. One failure mode to monitor post-deployment. Domain drift and sarcasm are the top two. Suggest a weekly sample audit.

Refuse to recommend dropping stopwords for sentiment tasks. Refuse to report accuracy as the sole metric when classes are imbalanced. Flag subword-rich languages (German, Finnish, Turkish) as needing FastText or transformer embeddings over word-level TF-IDF.
