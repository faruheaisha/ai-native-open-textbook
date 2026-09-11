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
entryUrl: ""
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
