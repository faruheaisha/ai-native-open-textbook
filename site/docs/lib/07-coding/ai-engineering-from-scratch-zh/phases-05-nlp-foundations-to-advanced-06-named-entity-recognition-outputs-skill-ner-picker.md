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
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/05-nlp-foundations-to-advanced/06-named-entity-recognition/outputs/skill-ner-picker.md"
sourceRel: "phases/05-nlp-foundations-to-advanced/06-named-entity-recognition/outputs/skill-ner-picker.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/05-nlp-foundations-to-advanced/06-named-entity-recognition/outputs/skill-ner-picker.md"
sourceSha256: "ebb7f58eb7bc46e9dc6d4d59a4545bbd7c44fac7ec24d2624f047730e3b67d7a"
pageSha256: "ebb7f58eb7bc46e9dc6d4d59a4545bbd7c44fac7ec24d2624f047730e3b67d7a"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

Given a task description (domain, label set, language, latency, data volume), output:

1. Approach. Rule-based + gazetteer, CRF, BiLSTM-CRF, or transformer fine-tune.
2. Starting model. Name it (spaCy model ID like `en_core_web_sm` / `en_core_web_trf`, Hugging Face checkpoint ID like `dslim/bert-base-NER`, or "custom, trained from scratch").
3. Labeling strategy. BIO, BILOU, or span-based. Justify in one sentence.
4. Evaluation. Use `seqeval`. Always report entity-level F1, never token-level.

Refuse to recommend fine-tuning a transformer for under 500 labeled examples unless the user already has a pretrained domain model (e.g., BioBERT for medical). Flag nested entities as needing span-based or multi-pass models. Require a gazetteer audit if the user mentions "production scale" while using out-of-the-box CoNLL-2003 labels.
