---
title: "Retrieval with LangChain4j and Ollama"
sourceId: "10-context-memory/context-engineering-book"
sourceTitle: "Context Engineering（Bonigarcia 教程）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/bonigarcia/context-engineering"
entryUrl: "https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch10/langchain4j/rag_retrieval/README.md"
sourceRel: "ch10/langchain4j/rag_retrieval/README.md"
rawUrl: "/raw/10-context-memory/context-engineering-book/ch10/langchain4j/rag_retrieval/README.md"
sourceSha256: "ffc0c0567057d2a96d793c2e3d68730452ffea9cad9218072dafb15af3c08b86"
pageSha256: "ffc0c0567057d2a96d793c2e3d68730452ffea9cad9218072dafb15af3c08b86"
contentMode: "local-full"
zh: ""
---

# Retrieval with LangChain4j and Ollama

This example shows a small local retrieval flow using Ollama embeddings and an in-memory embedding store.

Three short notes are ingested, the best match is retrieved for the question, and the retrieved note is the only external knowledge the model receives.

## Requirements

* [Java](https://www.oracle.com/java/technologies/downloads/) 21+
* [Maven](https://maven.apache.org/) 3.9+
* [Ollama](https://ollama.com/) installed locally
* A pulled chat model such as `llama3.2:1b`
* A pulled embedding model such as `nomic-embed-text`

## Steps for running this example in the shell

1. Start Ollama and pull the models:
```bash
ollama serve
ollama pull llama3.2:1b
ollama pull nomic-embed-text
```

2. Run the application:
```bash
mvn compile exec:java
```

## Output

```
Use the self-service portal to reset your password, then sign in again.
```
