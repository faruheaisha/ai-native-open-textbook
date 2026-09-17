---
title: "Advanced Digital Twin with RAG"
sourceId: "08-agents/ed-donner-agents"
sourceTitle: "Ed Donner：AI Agents 实战课"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/ed-donner/agents"
entryUrl: "https://github.com/ed-donner/agents/blob/8ceaf66c24643627c1e4806851736bdd444bdd4b/1_foundations/community_contributions/iamumarjaved/README.md"
sourceRel: "1_foundations/community_contributions/iamumarjaved/README.md"
rawUrl: "/raw/08-agents/ed-donner-agents/1_foundations/community_contributions/iamumarjaved/README.md"
sourceSha256: "a69179e7885d94b8ad7de10578e12daf83ab54ecef355909b251013eca814cb7"
pageSha256: "a69179e7885d94b8ad7de10578e12daf83ab54ecef355909b251013eca814cb7"
contentMode: "local-full"
zh: ""
---

# Advanced Digital Twin with RAG

AI-powered digital twin persona using RAG created from Linkedin using OPENAI function calling, advanced retrieval techniques and their evaluation.

## Core Features

**RAG System**
- Hybrid search: BM25 + semantic embeddings
- Cross-encoder reranking
- Query expansion
- ChromaDB vector storage
- 4 retrieval methods: bm25, semantic, hybrid, hybrid_rerank

**Evaluation Framework**
- MRR, nDCG, Precision, Recall
- LLM-as-judge for quality assessment
- Automated comparison reports

**Application**
- Gradio UI
- OpenAI function calling
- Pushover notifications

**Tests**
- Tests to test all components and pipeline.
