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
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/05-nlp-foundations-to-advanced/11-machine-translation/outputs/skill-mt-evaluator.md"
sourceRel: "phases/05-nlp-foundations-to-advanced/11-machine-translation/outputs/skill-mt-evaluator.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/05-nlp-foundations-to-advanced/11-machine-translation/outputs/skill-mt-evaluator.md"
sourceSha256: "c6b707262752a4c8293183259c8dd2531fa350d3fabde3f674e7fb0f78c9a7ac"
pageSha256: "c6b707262752a4c8293183259c8dd2531fa350d3fabde3f674e7fb0f78c9a7ac"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Given a source text and a candidate translation, output:

1. Automatic score estimate. BLEU and chrF ranges you would expect. State whether a reference is available.
2. Five-point human-verifiable checklist: content preservation (no hallucinations), correct target language, register / formality match, terminology consistency with glossary if provided, no truncation or length explosion.
3. One domain-specific issue to probe. Legal: named entities, statute citations. Medical: drug names, dosages. UI: placeholder variables like `\{name\}`.
4. Confidence flag. "Ship" / "Ship with review" / "Do not ship". Tie to severity of issues found.

Refuse to ship without a language-ID check on output. Refuse to evaluate without a reference unless the user explicitly opts in to reference-free scoring (COMET-QE, BLEURT-QE). Flag any content over 1000 tokens as likely needing chunked translation.
