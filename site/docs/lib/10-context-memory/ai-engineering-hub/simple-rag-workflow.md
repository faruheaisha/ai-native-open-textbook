---
title: "Simple RAG Workflow with LlamaIndex"
sourceId: "10-context-memory/ai-engineering-hub"
sourceTitle: "AI Engineering Hub"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/patchy631/ai-engineering-hub"
entryUrl: "https://github.com/patchy631/ai-engineering-hub/blob/2c9b106168d4540b88e727e4aa316c06c856c2b7/simple-rag-workflow/README.md"
sourceRel: "simple-rag-workflow/README.md"
rawUrl: "/raw/10-context-memory/ai-engineering-hub/simple-rag-workflow/README.md"
sourceSha256: "295d7c77f163a51f3a4cc8b12f7f5f9f19b107de5dd7ae0852748dc0a500015f"
pageSha256: "295d7c77f163a51f3a4cc8b12f7f5f9f19b107de5dd7ae0852748dc0a500015f"
contentMode: "local-full"
zh: ""
---

# Simple RAG Workflow with LlamaIndex

A basic implementation guide for building a Retrieval-Augmented Generation (RAG) system using LlamaIndex.

## Prerequisites

- Python 3.10+
- Ollama

## Installation

1. Install Ollama:

**macOS**
```bash
curl -fsSL https://ollama.com/install.sh | sh
```

**Linux**
```bash
curl -fsSL https://ollama.com/install.sh | sh
```

2. Pull the Llama 2 model:
```bash
ollama pull llama3.2
```

## Project Overview

This project demonstrates how to:
- Set up a basic RAG system using LlamaIndex
- Integrate with Ollama for local LLM inference
- Process and index documents for retrieval
- Generate contextual responses using the indexed knowledge

## Getting Started

1. Clone this repository
2. Follow the installation steps above
3. Run the Jupyter notebook `workflow.ipynb` to see the RAG system in action

## Note

Make sure Ollama is running in the background before executing the notebook:
```bash
ollama serve
```
