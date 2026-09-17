---
title: "Memory and state examples"
sourceId: "10-context-memory/context-engineering-book"
sourceTitle: "Context Engineering（Bonigarcia 教程）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/bonigarcia/context-engineering"
entryUrl: "https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch05/java/README.md"
sourceRel: "ch05/java/README.md"
rawUrl: "/raw/10-context-memory/context-engineering-book/ch05/java/README.md"
sourceSha256: "a29cc2ecb8aadc03123adb856c612be12d260f78a4ab63d70684f96a13d425ea"
pageSha256: "a29cc2ecb8aadc03123adb856c612be12d260f78a4ab63d70684f96a13d425ea"
contentMode: "local-full"
zh: ""
---

# Memory and state examples

This folder contains some Java examples about Chapter 5 (Memory and state in agentic systems).

## Requirements

- Java 21+
- Maven 3.9+
- `OPENAI_API_KEY` for the model calls
- For the Mem0 example, a running Mem0 OSS REST server and Qdrant backend

## Run

```bash
mvn compile
mvn exec:java -Dexec.mainClass="io.github.bonigarcia.ce.SessionStateChat"
mvn exec:java -Dexec.mainClass="io.github.bonigarcia.ce.WorkflowStateHandoff"
mvn exec:java -Dexec.mainClass="io.github.bonigarcia.ce.Mem0Chat"
```

## Notes

- `SessionStateChat` demonstrates transient local session state.
- `WorkflowStateHandoff` demonstrates shared state between planner and executor steps.
- `Mem0Chat` talks to a self-hosted Mem0 OSS REST server over HTTP.
- For the Mem0 example, start the server locally and point `MEM0_BASE_URL` at it (default: `http://localhost:8888`).
- If the Mem0 server requires auth, set `MEM0_API_KEY`; for a local demo you can also run the server with auth disabled.
