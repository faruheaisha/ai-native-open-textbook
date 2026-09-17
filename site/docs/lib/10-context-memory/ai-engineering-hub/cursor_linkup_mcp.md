---
title: "Build your own MCP server for Cursor"
sourceId: "10-context-memory/ai-engineering-hub"
sourceTitle: "AI Engineering Hub"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/patchy631/ai-engineering-hub"
entryUrl: "https://github.com/patchy631/ai-engineering-hub/blob/2c9b106168d4540b88e727e4aa316c06c856c2b7/cursor_linkup_mcp/README.md"
sourceRel: "cursor_linkup_mcp/README.md"
rawUrl: "/raw/10-context-memory/ai-engineering-hub/cursor_linkup_mcp/README.md"
sourceSha256: "95d0da33c0270ebbb9ec6632c06ccf50e52d815c8db90dd8d7e8ece10fb43f76"
pageSha256: "95d0da33c0270ebbb9ec6632c06ccf50e52d815c8db90dd8d7e8ece10fb43f76"
contentMode: "local-full"
zh: ""
---

# Build your own MCP server for Cursor

We're building a custom MCP server, which connects to Cursor and lets it perform deep web searches using [Linkup](https://www.linkup.so/) amd RAG using LlamaIndex.

### Watch this tutorial on YouTube
[![Watch this tutorial on YouTube](https://github.com/patchy631/ai-engineering-hub/blob/main/cursor_linkup_mcp/assets/thumbnail.png)](https://youtu.be/XMVzT8X0QTA)

### Setup

To sync dependencies, run:

```sh
uv sync
```

### Environment Variables

You need to set up the following environment variables:

```sh
LINKUP_API_KEY=...
OPENAI_API_KEY=...
```
[Get your Linkup API keys here](https://www.linkup.so/)

Ensure these variables are configured correctly before running the application.

---

## 📬 Stay Updated with Our Newsletter!
**Get a FREE Data Science eBook** 📖 with 150+ essential lessons in Data Science when you subscribe to our newsletter! Stay in the loop with the latest tutorials, insights, and exclusive resources. [Subscribe now!](https://join.dailydoseofds.com)

[![Daily Dose of Data Science Newsletter](https://github.com/patchy631/ai-engineering/blob/main/resources/join_ddods.png)](https://join.dailydoseofds.com)

---

## Contribution
