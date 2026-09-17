---
title: "LangChain examples"
sourceId: "10-context-memory/context-engineering-book"
sourceTitle: "Context Engineering（Bonigarcia 教程）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/bonigarcia/context-engineering"
entryUrl: "https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch10/langchain/README.md"
sourceRel: "ch10/langchain/README.md"
rawUrl: "/raw/10-context-memory/context-engineering-book/ch10/langchain/README.md"
sourceSha256: "7f71f85ae95f4e368e0cd1fad3e1851dc43e2cdb57c19b28f412e99746e34d48"
pageSha256: "7f71f85ae95f4e368e0cd1fad3e1851dc43e2cdb57c19b28f412e99746e34d48"
contentMode: "local-full"
zh: ""
---

# LangChain examples

This folder contains examples demonstrating application development with LangChain.

## Requirements

- [Python](https://www.python.org/) 3.10+
- An [OpenAI API key](https://platform.openai.com/api-keys) set as an environment variable (`OPENAI_API_KEY`)

## Examples

- `basic_llm_interaction/`: Setting up a basic LLM invocation.
- `structured_output/`: Binding an output schema so the model returns a validated object.
- `tool_calling/`: Equipping LangChain chains with tool call support.
- `conversational_memory/`: Storing and managing conversational history.
- `context_compression/`: Compressing input documents to retrieve relevant parts.
- `rag_with_vectorstore/`: End-to-end RAG system with a local vector store.

## Running the examples

Each example is in its own folder and contains a `README.md` with instructions on how to run it.
