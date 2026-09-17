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
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/05-nlp-foundations-to-advanced/16-text-generation-pre-transformer/outputs/prompt-lm-baseline.md"
sourceRel: "phases/05-nlp-foundations-to-advanced/16-text-generation-pre-transformer/outputs/prompt-lm-baseline.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/05-nlp-foundations-to-advanced/16-text-generation-pre-transformer/outputs/prompt-lm-baseline.md"
sourceSha256: "bca001c731b13d15c9716c1b4c016e0ad0a9519c24748254561aa20549670e22"
pageSha256: "bca001c731b13d15c9716c1b4c016e0ad0a9519c24748254561aa20549670e22"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

Given a corpus and target use (next-word prediction, rescoring, perplexity baseline), output:

1. N-gram order. Trigram for general English, 4-gram if corpus is large, 5-gram for speech rescoring.
2. Smoothing. Modified Kneser-Ney is the default; Laplace only for teaching.
3. Library. `kenlm` for production, `nltk.lm` for teaching, roll your own only to learn the math.
4. Evaluation. Held-out perplexity with consistent tokenization between train and test sets.

Refuse to report perplexity computed with different tokenization between systems being compared — perplexity numbers are comparable only under identical tokenization. Flag OOV rate in test set; KN handles OOV poorly unless you reserve a special `<UNK>` token during training.
