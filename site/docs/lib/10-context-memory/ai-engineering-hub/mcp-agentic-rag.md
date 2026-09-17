---
title: "MCP-powered Agentic RAG using Bright Data and Qdrant"
sourceId: "10-context-memory/ai-engineering-hub"
sourceTitle: "AI Engineering Hub"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/patchy631/ai-engineering-hub"
entryUrl: "https://github.com/patchy631/ai-engineering-hub/blob/2c9b106168d4540b88e727e4aa316c06c856c2b7/mcp-agentic-rag/README.md"
sourceRel: "mcp-agentic-rag/README.md"
rawUrl: "/raw/10-context-memory/ai-engineering-hub/mcp-agentic-rag/README.md"
sourceSha256: "ab32c3ae0ddfd2b9ab5142c41538f1d663801ccdb806ffc9c8640e80a5187472"
pageSha256: "ab32c3ae0ddfd2b9ab5142c41538f1d663801ccdb806ffc9c8640e80a5187472"
contentMode: "local-full"
zh: ""
---

# MCP-powered Agentic RAG using Bright Data and Qdrant

This project implements an automated book writing system using AI agents.
- [Bright Data](https://brdta.com/dailydoseofds) is used to scrape data from the web
- Qdrant as the local vector database.
- Cursor IDE as the MCP client.

---
## Setup and installations

**Get BrightData API Key**:
- Go to [Bright Data](https://brdta.com/dailydoseofds) and sign up for an account.
- Select "Proxies & Scraping" and create a new "SERP API"
- Select "Native proxy-based access"
- You will find your username and password there.
- Store it in the .env file.

```
BRIGHDATA_USERNAME="..."
BRIGHDATA_PASSWORD="..."
```

**Install Dependencies**:
   Ensure you have Python 3.11 or later installed.
   ```bash
   pip install mcp qdrant-client
   ```

---

## Run the project

First, start a Qdrant docker container as follows (make sure you have downloaded Docker):

   ```bash
   docker run -p 6333:6333 -p 6334:6334 \
   -v $(pwd)/qdrant_storage:/qdrant/storage:z \
   qdrant/qdrant
   ```

Next, go to the notebook.ipynb file, run the code to create a collection in your vector database.

Finally, set up your local MCP server as follows:
- Go to Cursor settings
- Select MCP 
- Add new global MCP server.

In the JSON file, add this:
```json
{
  "mcpServers": {
      "mcp-rag-app": {
          "command": "python",
          "args": ["/absolute/path/to/server.py"],
          "host": "127.0.0.1",
          "port": 8080,
          "timeout": 30000
      }
  }
}
```

Done! You can now interact with your vector database and fallback to web search if needed.

---

## 📬 Stay Updated with Our Newsletter!
**Get a FREE Data Science eBook** 📖 with 150+ essential lessons in Data Science when you subscribe to our newsletter! Stay in the loop with the latest tutorials, insights, and exclusive resources. [Subscribe now!](https://join.dailydoseofds.com)

[![Daily Dose of Data Science Newsletter](https://github.com/patchy631/ai-engineering/blob/main/resources/join_ddods.png)](https://join.dailydoseofds.com)

---

## Contribution
