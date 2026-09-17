---
title: "Basic agent with Embabel and Ollama"
sourceId: "10-context-memory/context-engineering-book"
sourceTitle: "Context Engineering（Bonigarcia 教程）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/bonigarcia/context-engineering"
entryUrl: "https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch10/embabel/basic_agent/README.md"
sourceRel: "ch10/embabel/basic_agent/README.md"
rawUrl: "/raw/10-context-memory/context-engineering-book/ch10/embabel/basic_agent/README.md"
sourceSha256: "79b581287843ac76c910787d32232f838b4fd7c1993dbd9ee0c30ea2d28aa41d"
pageSha256: "79b581287843ac76c910787d32232f838b4fd7c1993dbd9ee0c30ea2d28aa41d"
contentMode: "local-full"
zh: ""
---

# Basic agent with Embabel and Ollama

This example shows the smallest Embabel agent: two actions and one goal.

No step order is written anywhere. The planner reads the parameter and return types of each action, finds that `classify` produces the `Ticket` that `draftReply` consumes, and builds the plan from those types.

## Requirements

* [Java](https://www.oracle.com/java/technologies/downloads/) 21+
* [Maven](https://maven.apache.org/) 3.9+
* [Ollama](https://ollama.com/) installed locally
* A pulled chat model such as `llama3.1:8b`

## Steps for running this example in the shell

1. Start Ollama and pull the chat model:
```bash
ollama serve
ollama pull llama3.1:8b
```

2. Run the application:
```bash
mvn spring-boot:run
```

## Output

```
Thanks for reaching out about the billing portal login issue. We have raised it with the access team and will confirm as soon as your sign-in is restored.
```
