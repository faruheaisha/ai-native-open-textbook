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
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/05-nlp-foundations-to-advanced/24-coreference-resolution/outputs/skill-coref-picker.md"
sourceRel: "phases/05-nlp-foundations-to-advanced/24-coreference-resolution/outputs/skill-coref-picker.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/05-nlp-foundations-to-advanced/24-coreference-resolution/outputs/skill-coref-picker.md"
sourceSha256: "edd5532435389d66c30940cc668cc3286ab458ba3efb5f6460626d3e937e0fe8"
pageSha256: "edd5532435389d66c30940cc668cc3286ab458ba3efb5f6460626d3e937e0fe8"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Given a use case (single-doc / multi-doc, domain, language), output:

1. Approach. Rule-based / neural span-based / LLM-prompted / hybrid. One-sentence reason.
2. Model. Named checkpoint if neural.
3. Integration. Order of operations: tokenize → NER → coref → downstream task.
4. Evaluation. CoNLL F1 (MUC + B³ + CEAF-φ4 average) on held-out set + manual cluster review on 20 documents.

Refuse LLM-only coref for documents over 2,000 tokens without sliding-window merge. Refuse any pipeline that runs coref without a mention-level precision-recall report. Flag gender-heuristic systems deployed in demographically diverse text.
