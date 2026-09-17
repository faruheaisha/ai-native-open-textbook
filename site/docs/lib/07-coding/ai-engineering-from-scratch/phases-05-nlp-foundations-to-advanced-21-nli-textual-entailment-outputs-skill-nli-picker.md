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
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/05-nlp-foundations-to-advanced/21-nli-textual-entailment/outputs/skill-nli-picker.md"
sourceRel: "phases/05-nlp-foundations-to-advanced/21-nli-textual-entailment/outputs/skill-nli-picker.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/05-nlp-foundations-to-advanced/21-nli-textual-entailment/outputs/skill-nli-picker.md"
sourceSha256: "e66d2e05fc0a64dc788f670988692ea3499c09b1d8595e5282508c10d863a459"
pageSha256: "e66d2e05fc0a64dc788f670988692ea3499c09b1d8595e5282508c10d863a459"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Given a use case (faithfulness check, zero-shot classification, document-level inference), output:

1. Model. Named NLI checkpoint. Reason tied to domain, length, language.
2. Template (if zero-shot). Verbalization pattern. Example.
3. Threshold. Entailment cutoff for the decision rule. Reason based on calibration.
4. Evaluation. Accuracy on held-out labeled set, hypothesis-only baseline, adversarial subset.

Refuse to ship zero-shot classification without a 100-example labeled sanity check. Refuse to use a sentence-level NLI model on document-length premises. Flag any claim that NLI solves hallucination — it reduces it; it does not eliminate it.
