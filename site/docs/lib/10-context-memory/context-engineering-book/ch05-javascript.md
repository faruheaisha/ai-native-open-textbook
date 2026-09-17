---
title: "Chapter 5 JavaScript examples"
sourceId: "10-context-memory/context-engineering-book"
sourceTitle: "Context Engineering（Bonigarcia 教程）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/bonigarcia/context-engineering"
entryUrl: "https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch05/javascript/README.md"
sourceRel: "ch05/javascript/README.md"
rawUrl: "/raw/10-context-memory/context-engineering-book/ch05/javascript/README.md"
sourceSha256: "f36cdf55be103ec5922be45ffeda4f447387c27863b9162f4ee7e86f9ca96024"
pageSha256: "f36cdf55be103ec5922be45ffeda4f447387c27863b9162f4ee7e86f9ca96024"
contentMode: "local-full"
zh: ""
---

# Chapter 5 JavaScript examples

This folder contains JavaScript ports of the easier Chapter 5 examples.

## Examples

- `session_state_chat/` - transient structured session state
- `workflow_state_handoff/` - shared workflow state between planner and executor
- `mem0_chat/` - Mem0-backed long-term memory chat

## Run

Each example is its own Node project:

```bash
cd session_state_chat && npm install && npm start
cd ../workflow_state_handoff && npm install && npm start
cd ../mem0_chat && npm install && npm start
```
