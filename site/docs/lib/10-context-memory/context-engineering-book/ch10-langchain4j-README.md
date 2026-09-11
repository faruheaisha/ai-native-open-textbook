---
title: "LangChain4j examples"
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

# LangChain4j examples

This folder contains Java examples demonstrating application development using LangChain4j.

Every example builds an AI service, which is a Java interface whose annotations carry the instructions and whose return type declares the expected output. The differences between the examples are the context sources wired into that service.

## Requirements

- [Java](https://www.oracle.com/java/technologies/downloads/) 21+
- [Maven](https://maven.apache.org/) 3.9+
- [Ollama](https://ollama.com/) installed locally for running model examples

## Examples

- `basic_assistant/`: Single prompt-response with a local model.
- `chat_memory/`: Bounded message window carried across turns.
- `rag_retrieval/`: In-memory retrieval-augmented generation.
- `tool_use/`: Local math solver tool integration.
- `structured_output/`: Generating and parsing response objects to Java records.
- `context_assembly/`: Instructions, memory, retrieval, and tools in one AI service.

## Running the examples

Each example is in its own folder and contains a `README.md` with instructions on how to run it.
