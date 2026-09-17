---
title: "Context assembly with LangChain4j and Ollama"
sourceId: "10-context-memory/context-engineering-book"
sourceTitle: "Context Engineering（Bonigarcia 教程）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/bonigarcia/context-engineering"
entryUrl: "https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch10/langchain4j/context_assembly/README.md"
sourceRel: "ch10/langchain4j/context_assembly/README.md"
rawUrl: "/raw/10-context-memory/context-engineering-book/ch10/langchain4j/context_assembly/README.md"
sourceSha256: "b67a0d81d95274e7e314b60ac4db86de9550fa5abbedc370abfa1031023f0803"
pageSha256: "b67a0d81d95274e7e314b60ac4db86de9550fa5abbedc370abfa1031023f0803"
contentMode: "local-full"
zh: ""
---

# Context assembly with LangChain4j and Ollama

This example is the one shown in the book. It wires four context sources into a single AI service: the system instruction, a bounded chat memory, a content retriever, and a tool object.

Three questions exercise the three sources in turn, so the console output shows which one answered each turn.

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
42
You first asked how to reset your password.
```
