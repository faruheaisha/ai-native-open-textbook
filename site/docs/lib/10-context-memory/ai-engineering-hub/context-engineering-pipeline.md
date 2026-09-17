---
title: "Context Engineering with Pixeltable"
sourceId: "10-context-memory/ai-engineering-hub"
sourceTitle: "AI Engineering Hub"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/patchy631/ai-engineering-hub"
entryUrl: "https://github.com/patchy631/ai-engineering-hub/blob/2c9b106168d4540b88e727e4aa316c06c856c2b7/context-engineering-pipeline/README.md"
sourceRel: "context-engineering-pipeline/README.md"
rawUrl: "/raw/10-context-memory/ai-engineering-hub/context-engineering-pipeline/README.md"
sourceSha256: "99a03f13a16d31541df1455068f441de99bee0126e279254930d254fbd219567"
pageSha256: "99a03f13a16d31541df1455068f441de99bee0126e279254930d254fbd219567"
contentMode: "local-full"
zh: ""
---

# Context Engineering with [Pixeltable](https://pixeltable.com/)

This project demonstrates **Context Engineering**—a sophisticated approach to building AI systems that intelligently manage and utilize context from multiple sources. The demo showcases how to combine Retrieval Augmented Generation (RAG), tool calling, and advanced memory management to create context-aware AI agents that can answer questions accurately using both external knowledge and conversation history.

![Context Engineering Pipeline](/mirror/e7/e7261324512032387120b61989d9f18e2a106258.jpg)

How It Works:

1.  **Document Ingestion**: Financial documents are loaded into a Pixeltable database and automatically chunked for efficient retrieval.
2.  **RAG Setup**: Documents are embedded using sentence transformers and indexed for semantic search, enabling the system to find relevant information from PDFs.
3.  **Tool Integration**: Custom tools are created for document search (RAG) and external APIs (MCP servers), extending the agent's capabilities beyond text generation.
4.  **Agent Creation**: An AI agent is configured with these tools and a system prompt that guides its behavior for context-aware responses.
5.  **Memory Management**: The system implements both short-term memory (conversation history) and long-term memory (vector database) for persistent, searchable context.
6.  **Context Engineering**: Multiple context sources (tool outputs, chat history, long-term memory) are intelligently combined and summarized to stay within token budgets.
7.  **Response Generation**: A specialized response agent synthesizes all context sources into accurate, helpful answers while respecting a hierarchy of information sources.

We use:

- [Pixeltable](https://docs.pixeltable.com) for AI data infrastructure
- [Pixelagent](https://github.com/pixeltable/pixelagent) for stateful agents

## Set Up

Follow these steps one by one:

### Install Dependencies

```bash
uv sync
```

## Run Notebook

Please refer to the `context_engineering_notebook.ipynb` notebook for detailed instructions and the complete code to build the Context Engineering Pipeline using [Pixeltable ecosystem](https://pixeltable.com/).

## 📬 Stay Updated with Our Newsletter!

**Get a FREE Data Science eBook** 📖 with 150+ essential lessons in Data Science when you subscribe to our newsletter! Stay in the loop with the latest tutorials, insights, and exclusive resources. [Subscribe now!](https://join.dailydoseofds.com)

[![Daily Dose of Data Science Newsletter](https://github.com/patchy631/ai-engineering/blob/main/resources/join_ddods.png)](https://join.dailydoseofds.com)

## Contribution
