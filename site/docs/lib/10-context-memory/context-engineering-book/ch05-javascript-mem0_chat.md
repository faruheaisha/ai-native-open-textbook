---
title: "Memory-backed chat"
sourceId: "10-context-memory/context-engineering-book"
sourceTitle: "Context Engineering（Bonigarcia 教程）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/bonigarcia/context-engineering"
entryUrl: "https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch05/javascript/mem0_chat/README.md"
sourceRel: "ch05/javascript/mem0_chat/README.md"
rawUrl: "/raw/10-context-memory/context-engineering-book/ch05/javascript/mem0_chat/README.md"
sourceSha256: "fbf52de800e3a1a674fd0778745731474313282eb6b0c7d319d3bbc4bb8235cd"
pageSha256: "fbf52de800e3a1a674fd0778745731474313282eb6b0c7d319d3bbc4bb8235cd"
contentMode: "local-full"
zh: ""
---

# Memory-backed chat

This example demonstrates a practical Mem0-backed memory stack in JavaScript.

## Requirements

- Node.js 18+
- An OpenAI API key in `OPENAI_API_KEY`
- A running Qdrant instance for Mem0 (`localhost:6333` by default)

## Environment

- `MODEL` - OpenAI model to use (default: `gpt-5`)
- `USER_ID` - user scope for memory storage (default: `alice`)
- `MEM0_COLLECTION` - Qdrant collection name (default: `mem0_demo`)
- `QDRANT_HOST` / `QDRANT_PORT` - Qdrant connection settings

## Start Qdrant

```bash
docker run -p 6333:6333 -p 6334:6334 qdrant/qdrant
```

## Install

```bash
npm install
```

## Run

```bash
npm start
```

## Commands

- `/help` - show commands
- `/memories` - show stored memories for the user
- `/forget` - delete stored memories for the user
- `/exit` - quit
