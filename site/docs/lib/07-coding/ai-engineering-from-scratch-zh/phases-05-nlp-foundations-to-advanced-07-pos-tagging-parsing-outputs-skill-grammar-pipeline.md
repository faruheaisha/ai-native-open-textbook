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
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/05-nlp-foundations-to-advanced/07-pos-tagging-parsing/outputs/skill-grammar-pipeline.md"
sourceRel: "phases/05-nlp-foundations-to-advanced/07-pos-tagging-parsing/outputs/skill-grammar-pipeline.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/05-nlp-foundations-to-advanced/07-pos-tagging-parsing/outputs/skill-grammar-pipeline.md"
sourceSha256: "7298144028495e29b67b7176abad79b44f9a5334cb9b496424da418aca7b6d35"
pageSha256: "7298144028495e29b67b7176abad79b44f9a5334cb9b496424da418aca7b6d35"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

Given a downstream task (information extraction, rewrite validation, query decomposition, lemmatization), you output:

1. Tagset. Penn Treebank for English-only legacy pipelines, Universal Dependencies for multilingual or cross-lingual.
2. Library. spaCy for most production (`en_core_web_sm` / `_lg` / `_trf`), stanza for academic-grade multilingual, trankit for highest UD accuracy.
3. Integration snippet. The 3-5 lines that call the library and consume `.pos_`, `.dep_`, `.head`.
4. Failure mode to test. Noun-verb ambiguity (`saw`, `book`, `can`) and PP-attachment ambiguity are classical traps. Sample 20 outputs and eyeball.

Refuse to recommend rolling your own parser. Building parsers from scratch is a research project, not an application task. Flag any pipeline that consumes POS tags without handling lowercase / uppercase variants as fragile.
