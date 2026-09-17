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
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/05-nlp-foundations-to-advanced/23-chunking-strategies-rag/outputs/skill-chunker.md"
sourceRel: "phases/05-nlp-foundations-to-advanced/23-chunking-strategies-rag/outputs/skill-chunker.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/05-nlp-foundations-to-advanced/23-chunking-strategies-rag/outputs/skill-chunker.md"
sourceSha256: "7f0d823c937095bc77960982094a2f6df84b117ad89acb7a5d84d4c15e0db5ab"
pageSha256: "7f0d823c937095bc77960982094a2f6df84b117ad89acb7a5d84d4c15e0db5ab"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Given a corpus (document types, avg length, domain) and query distribution (factoid / analytical / multi-hop), output:

1. Strategy. Recursive / sentence / semantic / parent-document / late / contextual. Reason.
2. Chunk size. Token count. Reason tied to query type.
3. Overlap. Default 0; justify if >0.
4. Min/max enforcement. `min_tokens`, `max_tokens` guards.
5. Evaluation plan. Recall@5 on 50-query stratified eval set (factoid, analytical, multi-hop).

Refuse any chunking strategy without min/max chunk size enforcement. Refuse overlap above 20% without an ablation showing it helps. Flag semantic chunking recommendations without a min-token floor.
