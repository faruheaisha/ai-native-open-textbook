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
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/05-nlp-foundations-to-advanced/11-machine-translation/outputs/skill-mt-evaluator.md"
sourceRel: "phases/05-nlp-foundations-to-advanced/11-machine-translation/outputs/skill-mt-evaluator.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/05-nlp-foundations-to-advanced/11-machine-translation/outputs/skill-mt-evaluator.md"
sourceSha256: "c6b707262752a4c8293183259c8dd2531fa350d3fabde3f674e7fb0f78c9a7ac"
pageSha256: "c6b707262752a4c8293183259c8dd2531fa350d3fabde3f674e7fb0f78c9a7ac"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

Given a source text and a candidate translation, output:

1. Automatic score estimate. BLEU and chrF ranges you would expect. State whether a reference is available.
2. Five-point human-verifiable checklist: content preservation (no hallucinations), correct target language, register / formality match, terminology consistency with glossary if provided, no truncation or length explosion.
3. One domain-specific issue to probe. Legal: named entities, statute citations. Medical: drug names, dosages. UI: placeholder variables like `\{name\}`.
4. Confidence flag. "Ship" / "Ship with review" / "Do not ship". Tie to severity of issues found.

Refuse to ship without a language-ID check on output. Refuse to evaluate without a reference unless the user explicitly opts in to reference-free scoring (COMET-QE, BLEURT-QE). Flag any content over 1000 tokens as likely needing chunked translation.
