---
title: "Chat memory with LangChain4j and Ollama"
sourceId: "10-context-memory/context-engineering-book"
sourceTitle: "Context Engineering（Bonigarcia 教程）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/bonigarcia/context-engineering"
entryUrl: "https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch10/langchain4j/chat_memory/README.md"
sourceRel: "ch10/langchain4j/chat_memory/README.md"
rawUrl: "/raw/10-context-memory/context-engineering-book/ch10/langchain4j/chat_memory/README.md"
sourceSha256: "e6b14c3bd46d0fec127cbd7e1921243581a48532fa4308c2bc50fd36cebe1d7d"
pageSha256: "e6b14c3bd46d0fec127cbd7e1921243581a48532fa4308c2bc50fd36cebe1d7d"
contentMode: "local-full"
zh: ""
---

# Chat memory with LangChain4j and Ollama

This example shows how a bounded message window carries conversational state across turns.

The first call states a fact, and the second one relies on the memory window to recall it.

## Requirements

* [Java](https://www.oracle.com/java/technologies/downloads/) 21+
* [Maven](https://maven.apache.org/) 3.9+
* [Ollama](https://ollama.com/) installed locally
* A pulled chat model such as `llama3.2:1b`

## Steps for running this example in the shell

1. Start Ollama and pull the model:
```bash
ollama serve
ollama pull llama3.2:1b
```

2. Run the application:
```bash
mvn compile exec:java
```

## Output

```
Nice to meet you, Boni.
Your name is Boni.
```
