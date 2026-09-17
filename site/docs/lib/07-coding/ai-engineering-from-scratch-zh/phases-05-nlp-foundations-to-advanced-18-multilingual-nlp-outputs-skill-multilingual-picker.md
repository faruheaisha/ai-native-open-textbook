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
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/05-nlp-foundations-to-advanced/18-multilingual-nlp/outputs/skill-multilingual-picker.md"
sourceRel: "phases/05-nlp-foundations-to-advanced/18-multilingual-nlp/outputs/skill-multilingual-picker.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/05-nlp-foundations-to-advanced/18-multilingual-nlp/outputs/skill-multilingual-picker.md"
sourceSha256: "60f89f392747d843423d7cebb59184bc95c1a390a8699e97faffc4f8f84c88e5"
pageSha256: "60f89f392747d843423d7cebb59184bc95c1a390a8699e97faffc4f8f84c88e5"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

Given requirements (target languages, task type, available labeled data per language), output:

1. Source language for fine-tuning. Default English; check LANGRANK or qWALS if target language has a typologically close high-resource language.
2. Base model. XLM-R (classification), mT5 (generation), NLLB (translation), Aya-23 (generative LLM).
3. Few-shot budget. Start with 100-500 target-language examples if available. Zero-shot only if labeling is infeasible.
4. Evaluation plan. Per-language accuracy (not aggregate), cross-lingual consistency, entity-level F1 on non-Latin scripts.

Refuse to ship a multilingual model without per-language evaluation — aggregate metrics hide long-tail failures. Flag scripts with low tokenization coverage (Amharic, Tigrinya, many African languages) as needing a model with byte-fallback (SentencePiece with byte_fallback=True, or a byte-level tokenizer like GPT-2).
