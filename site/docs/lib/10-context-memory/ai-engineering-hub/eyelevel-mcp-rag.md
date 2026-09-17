---
title: "Build an MCP server for RAG over comple real world docs"
sourceId: "10-context-memory/ai-engineering-hub"
sourceTitle: "AI Engineering Hub"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/patchy631/ai-engineering-hub"
entryUrl: "https://github.com/patchy631/ai-engineering-hub/blob/2c9b106168d4540b88e727e4aa316c06c856c2b7/eyelevel-mcp-rag/README.md"
sourceRel: "eyelevel-mcp-rag/README.md"
rawUrl: "/raw/10-context-memory/ai-engineering-hub/eyelevel-mcp-rag/README.md"
sourceSha256: "202099ac6c510fda3e0c5725c766498f8bd6d7e7744cb4c6000050e675792144"
pageSha256: "202099ac6c510fda3e0c5725c766498f8bd6d7e7744cb4c6000050e675792144"
contentMode: "local-full"
zh: ""
---

# Build an MCP server for RAG over comple real world docs

This server leverages [GroundX](https://eyelevel.ai/)'s state-of-the-art document search and retrieval capabilities.

You can quickly test it on your own complex docs [here](https://eyelevel.ai/).

### Setup

To sync dependencies, run:

```sh
uv sync
```

### Environment Variables

You need to set up the following environment variables:

```sh
GROUNDX_API_KEY=...
```
[Get your GroundX API keys here](https://eyelevel.ai/)

Ensure these variables are configured correctly before running the application use `.env.example` as reference and create your own `.env` file.

---

## 📬 Stay Updated with Our Newsletter!
**Get a FREE Data Science eBook** 📖 with 150+ essential lessons in Data Science when you subscribe to our newsletter! Stay in the loop with the latest tutorials, insights, and exclusive resources. [Subscribe now!](https://join.dailydoseofds.com)

[![Daily Dose of Data Science Newsletter](https://github.com/patchy631/ai-engineering/blob/main/resources/join_ddods.png)](https://join.dailydoseofds.com)

---

## Contribution
