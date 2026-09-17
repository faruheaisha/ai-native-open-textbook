---
title: "LlamaIndex examples"
sourceId: "10-context-memory/context-engineering-book"
sourceTitle: "Context Engineering（Bonigarcia 教程）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/bonigarcia/context-engineering"
entryUrl: "https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch10/llamaindex/README.md"
sourceRel: "ch10/llamaindex/README.md"
rawUrl: "/raw/10-context-memory/context-engineering-book/ch10/llamaindex/README.md"
sourceSha256: "d6559cb15ffcf297a4cb46a62296fcf5ec6b10a2d831b3ff61eaeb727948c0bd"
pageSha256: "d6559cb15ffcf297a4cb46a62296fcf5ec6b10a2d831b3ff61eaeb727948c0bd"
contentMode: "local-full"
zh: ""
---

# LlamaIndex examples

This folder contains examples demonstrating index structures and query engines with LlamaIndex.

## Requirements

- [Python](https://www.python.org/) 3.10+
- An [OpenAI API key](https://platform.openai.com/api-keys) set as an environment variable (`OPENAI_API_KEY`)

## Examples

- `rag_basic/`: Basic RAG implementation using indices and query engines.
- `custom_prompts/`: Overriding prompt templates for LlamaIndex tasks.
- `conversational_memory/`: Implementing persistent chat sessions.
- `agent_with_tool/`: Creating a ReAct-based agent with local tools.
- `rag_agent_with_context_retrieval/`: Advanced retrieval agent optimization.
- `answer_context_evaluation/`: Evaluating generated answers against source context.

## Running the examples

Each example is in its own folder and contains a `README.md` with instructions on how to run it.
