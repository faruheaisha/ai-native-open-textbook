---
title: "Goal planning with Embabel and Ollama"
sourceId: "10-context-memory/context-engineering-book"
sourceTitle: "Context Engineering（Bonigarcia 教程）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/bonigarcia/context-engineering"
entryUrl: "https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch10/embabel/goal_planning/README.md"
sourceRel: "ch10/embabel/goal_planning/README.md"
rawUrl: "/raw/10-context-memory/context-engineering-book/ch10/embabel/goal_planning/README.md"
sourceSha256: "7b56b16b99d761046dbc8bc1f4a6870e694f04ce59cd9fc48731adc8b9b7d9b7"
pageSha256: "7b56b16b99d761046dbc8bc1f4a6870e694f04ce59cd9fc48731adc8b9b7d9b7"
contentMode: "local-full"
zh: ""
---

# Goal planning with Embabel and Ollama

This example shows the planner choosing between two routes to the same goal.

Both `lookUpAnswer` and `generateAnswer` produce an `Answer`, and the first one is declared cheaper. The planner tries the cheap route first, and when the lookup returns nothing it replans and takes the model route. The action costs, not a hand-written branch, decide the order.

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
Open the local client and choose the office profile. (from knowledge base)
Update the billing address on the account settings page before the next invoice is issued. (from model)
```
