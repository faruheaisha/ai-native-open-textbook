---
title: "Tool use with LangChain4j and Ollama"
sourceId: "10-context-memory/context-engineering-book"
sourceTitle: "Context Engineering（Bonigarcia 教程）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/bonigarcia/context-engineering"
entryUrl: "https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch10/langchain4j/tool_use/README.md"
sourceRel: "ch10/langchain4j/tool_use/README.md"
rawUrl: "/raw/10-context-memory/context-engineering-book/ch10/langchain4j/tool_use/README.md"
sourceSha256: "78ec6b6f031afb26776d0a7cecb431b3abe2c997c90263e82e19ff89693127d5"
pageSha256: "78ec6b6f031afb26776d0a7cecb431b3abe2c997c90263e82e19ff89693127d5"
contentMode: "local-full"
zh: ""
---

# Tool use with LangChain4j and Ollama

This example shows LangChain4j tool calling against a local Ollama model.

A plain Java method annotated with `@Tool` becomes callable by the model, and LangChain4j runs the tool loop on behalf of the AI service. Small models call tools unreliably, so a larger model such as `llama3.2` gives more consistent results.

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
42
```
