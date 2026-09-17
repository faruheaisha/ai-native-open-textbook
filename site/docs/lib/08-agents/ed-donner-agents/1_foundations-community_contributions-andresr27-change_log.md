---
title: "Change Log"
sourceId: "08-agents/ed-donner-agents"
sourceTitle: "Ed Donner：AI Agents 实战课"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/ed-donner/agents"
entryUrl: "https://github.com/ed-donner/agents/blob/8ceaf66c24643627c1e4806851736bdd444bdd4b/1_foundations/community_contributions/andresr27/change_log.md"
sourceRel: "1_foundations/community_contributions/andresr27/change_log.md"
rawUrl: "/raw/08-agents/ed-donner-agents/1_foundations/community_contributions/andresr27/change_log.md"
sourceSha256: "2322b4f086e0e18ebf00a2b7926232bb538209b2703d738432625585fde8c709"
pageSha256: "2322b4f086e0e18ebf00a2b7926232bb538209b2703d738432625585fde8c709"
contentMode: "local-full"
zh: ""
---

# Change Log

## Week 1: Carrer Agent with RAG
**Goal:** Build over the course Career Agent shown in Day 4 using Retrieval Augmented Generation to answer specific questions not available in Linkedin.
- **ChromaDB Integration:** Set up persistent vector storage for extracted data.
- **Extract properties from Markdown sections:** To minimize files commited I extracted the summary property from a private Markdown file using a new function.
- **Context Retrieval:** Added logic to augment LLM prompts with retrieved documents. These are loaded before the UI runs.

### Dependencies Added:
- chromadb
- glob

### Next Steps
- **Evaluate responses:** Create a Pydantic model for the Evaluation and generate metrics to assess the model performance.
