---
title: "Pocket Flow"
sourceId: "08-agents/pocket-manus"
sourceTitle: "Open Manus with PocketFlow Integration"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/Osly-AI/PocketManus"
entryUrl: "https://github.com/Osly-AI/PocketManus/blob/8ab0ec5f2d5dc17ff58b060af7afcda08a9f57fd/PocketFlow/docs/index.md"
sourceRel: "PocketFlow/docs/index.md"
rawUrl: "/raw/08-agents/pocket-manus/PocketFlow/docs/index.md"
sourceSha256: "689f57729cf85bdde3b4f3b8804edd9ff4da915403fe260f24d08d2ee5f5b5b2"
pageSha256: "689f57729cf85bdde3b4f3b8804edd9ff4da915403fe260f24d08d2ee5f5b5b2"
contentMode: "local-full"
zh: ""
---

# Pocket Flow

A [100-line](https://github.com/The-Pocket-World/Pocketflow-Framework-Py/blob/main/pocketflow_framework/__init__.py) minimalist LLM framework for *Agents, Task Decomposition, RAG, etc*.

- **Expressive**: Everything you love from larger frameworks—([Multi-](https://github.com/Osly-AI/PocketManus/blob/8ab0ec5f2d5dc17ff58b060af7afcda08a9f57fd/PocketFlow/docs/design_pattern/multi_agent.html))[Agents](https://github.com/Osly-AI/PocketManus/blob/8ab0ec5f2d5dc17ff58b060af7afcda08a9f57fd/PocketFlow/docs/design_pattern/agent.html), [Workflow](https://github.com/Osly-AI/PocketManus/blob/8ab0ec5f2d5dc17ff58b060af7afcda08a9f57fd/PocketFlow/docs/design_pattern/workflow.html), [RAG](https://github.com/Osly-AI/PocketManus/blob/8ab0ec5f2d5dc17ff58b060af7afcda08a9f57fd/PocketFlow/docs/design_pattern/rag.html), and more.  
- **Lightweight**: Just the core graph abstraction in 100 lines. ZERO dependencies, and vendor lock-in.
- **Principled**: Built with modularity and clear separation of concerns at its heart.
- **AI-Friendly**: Intuitive enough for AI agents to assist humans in building complex LLM applications.

  <img src="https://github.com/The-Pocket-World/Pocketflow-Framework-Py/raw/main/assets/meme.jpg?raw=true" width="400"/>

## Core Abstraction

We model the LLM workflow as a **Graph + Shared Store**:

- [Node](/lib/08-agents/pocket-manus/PocketFlow-docs-core_abstraction-node) handles simple (LLM) tasks.
- [Flow](/lib/08-agents/pocket-manus/PocketFlow-docs-core_abstraction-flow) connects nodes through **Actions** (labeled edges).
- [Shared Store](/lib/08-agents/pocket-manus/PocketFlow-docs-core_abstraction-communication) enables communication between nodes within flows.
- [Batch](/lib/08-agents/pocket-manus/PocketFlow-docs-core_abstraction-batch) nodes/flows allow for data-intensive tasks.
- [(Advanced) Async](/lib/08-agents/pocket-manus/PocketFlow-docs-core_abstraction-async) nodes/flows allow waiting for asynchronous tasks.
- [(Advanced) Parallel](/lib/08-agents/pocket-manus/PocketFlow-docs-core_abstraction-parallel) nodes/flows handle I/O-bound tasks.

## Design Pattern

From there, it’s easy to implement popular design patterns:

- [Structured Output](/lib/08-agents/pocket-manus/PocketFlow-docs-design_pattern-structure) formats outputs consistently.
- [Workflow](/lib/08-agents/pocket-manus/PocketFlow-docs-design_pattern-workflow) chains multiple tasks into pipelines.
- [Map Reduce](/lib/08-agents/pocket-manus/PocketFlow-docs-design_pattern-mapreduce) splits data tasks into Map and Reduce steps.
- [RAG](/lib/08-agents/pocket-manus/PocketFlow-docs-design_pattern-rag) integrates data retrieval with generation.
- [Agent](/lib/08-agents/pocket-manus/PocketFlow-docs-design_pattern-agent) autonomously makes decisions.
- [(Optional) Chat Memory](/lib/08-agents/pocket-manus/PocketFlow-docs-design_pattern-memory) preserves conversation context.
- [(Advanced) Multi-Agents](/lib/08-agents/pocket-manus/PocketFlow-docs-design_pattern-multi_agent) coordinate multiple agents.

## Utility Function

We provide utility functions not in *codes*, but in *docs*:

- [LLM Wrapper](/lib/08-agents/pocket-manus/PocketFlow-docs-utility_function-llm)
- [Tool](/lib/08-agents/pocket-manus/PocketFlow-docs-utility_function-tool)
- [(Optional) Viz and Debug](/lib/08-agents/pocket-manus/PocketFlow-docs-utility_function-viz)
- [(Optional) Web Search](/lib/08-agents/pocket-manus/PocketFlow-docs-utility_function-websearch)
- [(Optional) Chunking](/lib/08-agents/pocket-manus/PocketFlow-docs-utility_function-chunking)
- [(Optional) Embedding](/lib/08-agents/pocket-manus/PocketFlow-docs-utility_function-embedding)
- [(Optional) Vector Databases](/lib/08-agents/pocket-manus/PocketFlow-docs-utility_function-vector)
- [(Optional) Text-to-Speech](/lib/08-agents/pocket-manus/PocketFlow-docs-utility_function-text_to_speech)

## Read to Develop your LLM Apps? [Read this guide!](/lib/08-agents/pocket-manus/PocketFlow-docs-guide)
