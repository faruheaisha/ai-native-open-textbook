---
title: "Session 2: Build AI Solutions with Azure AI Foundry"
sourceId: "13-local-ai/edgeai-for-beginners"
sourceTitle: "EdgeAI for Beginners"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "13-local-ai"
sourceUrl: "https://github.com/microsoft/edgeai-for-beginners"
entryUrl: "https://github.com/microsoft/edgeai-for-beginners/blob/e88f123a4bb5796594919db3a13257c429d1288c/Workshop/Session02-BuildAISolutionsRAG.md"
sourceRel: "Workshop/Session02-BuildAISolutionsRAG.md"
rawUrl: "/raw/13-local-ai/edgeai-for-beginners/Workshop/Session02-BuildAISolutionsRAG.md"
sourceSha256: "a279f15e8991f6ec22ab3ac31034b6d84d63b5667012348d137b36e7f0cf7847"
pageSha256: "a279f15e8991f6ec22ab3ac31034b6d84d63b5667012348d137b36e7f0cf7847"
contentMode: "local-full"
zh: ""
---

# Session 2: Build AI Solutions with Azure AI Foundry

## Abstract

Explore how to build actionable GenAI workflows using Foundry Local and Azure AI Foundry. Learn advanced prompt engineering, integrate structured data, and orchestrate tasks with reproducible pipelines. While the focus is on Retrieval-Augmented Generation (RAG) for document & data Q&A, the patterns generalize to broader GenAI solution design.

## Learning Objectives

By the end of this session, you will:

- **Master Prompt Engineering**: Design effective system prompts and grounding strategies
- **Implement RAG Patterns**: Build document-based Q&A systems with vector search
- **Integrate Structured Data**: Work with CSV, JSON, and tabular data in AI workflows
- **Build Production RAG**: Create scalable RAG applications with Chainlit
- **Bridge Local to Cloud**: Understand migration paths from Foundry Local to Azure AI Foundry

## Prerequisites

- Completed Session 1 (Foundry Local setup)
- Basic understanding of vector databases and embeddings
- Python programming experience
- Familiarity with document processing concepts
 
### Cross-Platform Environment Quick Start (Windows & macOS)

Windows PowerShell:
```powershell
py -m venv .venv
 .\.venv\Scripts\Activate.ps1
pip install --upgrade pip
pip install foundry-local-sdk openai sentence-transformers ragas datasets scikit-learn
```

macOS / Linux:
```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
pip install foundry-local-sdk openai sentence-transformers ragas datasets scikit-learn
```

If Foundry Local macOS binaries are not yet available in your environment, run the service on a Windows VM or container and set:
```bash
