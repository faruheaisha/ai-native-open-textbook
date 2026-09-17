---
title: "Build your own Local MCP Client with LlamaIndex"
sourceId: "10-context-memory/ai-engineering-hub"
sourceTitle: "AI Engineering Hub"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/patchy631/ai-engineering-hub"
entryUrl: "https://github.com/patchy631/ai-engineering-hub/blob/2c9b106168d4540b88e727e4aa316c06c856c2b7/llamaindex-mcp/README.md"
sourceRel: "llamaindex-mcp/README.md"
rawUrl: "/raw/10-context-memory/ai-engineering-hub/llamaindex-mcp/README.md"
sourceSha256: "c8f4c07e488634eecb4ad870ae2f228ec00d2db4725c4a7cd5f980e648d29fe5"
pageSha256: "c8f4c07e488634eecb4ad870ae2f228ec00d2db4725c4a7cd5f980e648d29fe5"
contentMode: "local-full"
zh: ""
---

# Build your own Local MCP Client with LlamaIndex

This project demonstrates how to build a **local MCP (Model Context Protocol) client** using LlamaIndex. The client connects to a local MCP server (which exposes tools like a SQLite database) and lets you interact with it using natural language and tool-calling agents—all running locally on your machine.

### Setup

To sync dependencies, run:

```sh
uv sync
```

---

## Usage

- Start the local MCP server (for example, the included SQLite demo server):

```sh
uv run server.py --server_type=sse
```

- Run the client (choose the appropriate client script, e.g. `client.py` for OpenAI or `ollama_client.py` for Ollama):

```sh
uv run client.py
```

- Interact with the agent in your terminal. Type your message and the agent will use the available tools to answer your queries.

---

## 📬 Stay Updated with Our Newsletter!
**Get a FREE Data Science eBook** 📖 with 150+ essential lessons in Data Science when you subscribe to our newsletter! Stay in the loop with the latest tutorials, insights, and exclusive resources. [Subscribe now!](https://join.dailydoseofds.com)

[![Daily Dose of Data Science Newsletter](https://github.com/patchy631/ai-engineering/blob/main/resources/join_ddods.png)](https://join.dailydoseofds.com)

---

## Contribution
