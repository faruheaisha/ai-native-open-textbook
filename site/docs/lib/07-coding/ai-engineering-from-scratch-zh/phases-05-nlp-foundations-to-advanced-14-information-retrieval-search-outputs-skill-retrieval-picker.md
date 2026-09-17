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
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/05-nlp-foundations-to-advanced/14-information-retrieval-search/outputs/skill-retrieval-picker.md"
sourceRel: "phases/05-nlp-foundations-to-advanced/14-information-retrieval-search/outputs/skill-retrieval-picker.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/05-nlp-foundations-to-advanced/14-information-retrieval-search/outputs/skill-retrieval-picker.md"
sourceSha256: "15fd628a2e4608c258781c47c928a360b49d579b8f027e4b42d218f28fecb650"
pageSha256: "15fd628a2e4608c258781c47c928a360b49d579b8f027e4b42d218f28fecb650"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

Given requirements (corpus size, query pattern, latency budget, quality bar, infra constraints), output:

1. Stack. BM25 only, dense only, hybrid (BM25 + dense + RRF), hybrid + cross-encoder rerank, or three-way (BM25 + dense + learned-sparse).
2. Dense encoder. Name the specific model (`all-MiniLM-L6-v2`, `bge-large-en-v1.5`, `e5-large-v2`, `paraphrase-multilingual-MiniLM-L12-v2`). Match to language, domain, context length.
3. Reranker. Name the cross-encoder model if used (`cross-encoder/ms-marco-MiniLM-L-6-v2`, `BAAI/bge-reranker-large`). Flag ~30-100ms added latency on top-30.
4. Evaluation plan. Recall@10 is the primary retriever metric. MRR for multi-answer. Baseline first, incremental improvements measured against it.

Refuse to recommend dense-only for corpora with named entities, error codes, or product SKUs unless the user has evidence dense handles exact matches. Refuse to skip reranking for high-stakes retrieval (legal, medical) where the final top-5 decides the user's answer.
