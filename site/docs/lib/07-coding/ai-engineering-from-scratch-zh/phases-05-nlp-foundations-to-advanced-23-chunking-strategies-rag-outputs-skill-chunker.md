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
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/05-nlp-foundations-to-advanced/23-chunking-strategies-rag/outputs/skill-chunker.md"
sourceRel: "phases/05-nlp-foundations-to-advanced/23-chunking-strategies-rag/outputs/skill-chunker.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/05-nlp-foundations-to-advanced/23-chunking-strategies-rag/outputs/skill-chunker.md"
sourceSha256: "7f0d823c937095bc77960982094a2f6df84b117ad89acb7a5d84d4c15e0db5ab"
pageSha256: "7f0d823c937095bc77960982094a2f6df84b117ad89acb7a5d84d4c15e0db5ab"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

Given a corpus (document types, avg length, domain) and query distribution (factoid / analytical / multi-hop), output:

1. Strategy. Recursive / sentence / semantic / parent-document / late / contextual. Reason.
2. Chunk size. Token count. Reason tied to query type.
3. Overlap. Default 0; justify if >0.
4. Min/max enforcement. `min_tokens`, `max_tokens` guards.
5. Evaluation plan. Recall@5 on 50-query stratified eval set (factoid, analytical, multi-hop).

Refuse any chunking strategy without min/max chunk size enforcement. Refuse overlap above 20% without an ablation showing it helps. Flag semantic chunking recommendations without a min-token floor.
