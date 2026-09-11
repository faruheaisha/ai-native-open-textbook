---
title: "Retrieval-Augmented Generation (RAG) in Python"
sourceId: "10-context-memory/context-engineering-book"
sourceTitle: "Context Engineering（Bonigarcia 教程）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/bonigarcia/context-engineering"
entryUrl: "https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/README.md"
zh: ""
---

# Retrieval-Augmented Generation (RAG) in Python

This folder contains Python examples for different RAG patterns, including local RAG, agentic RAG, and context stuffing.

## Requirements

- [Python](https://www.python.org/) 3.8+
- API keys for OpenAI (if using OpenAI examples)
- [Ollama](https://ollama.com/) (if using local RAG examples)

## Examples

- `context-stuffing-system-prompt/`: Injecting context into the system prompt.
- `context-stuffing-user-prompt/`: Injecting context into the user prompt.
- `rag-openai/`: Basic RAG using OpenAI and TF-IDF.
- `rag-hugging-face/`: RAG using Hugging Face models and local retrieval.
- `agentic-rag/`: RAG using a ReAct agent.
- `cag/`: Cache-augmented generation using KV cache.
- `local-rag/`: Fully local RAG setup.
- `ragflow-basic/`: Basic example using the RAGFlow Python SDK.
- `vectorless-rag-pageindex/`: Vectorless RAG with PageIndex.

## Running the examples

Each example is in its own folder and contains a `README.md` with instructions on how to run it.
