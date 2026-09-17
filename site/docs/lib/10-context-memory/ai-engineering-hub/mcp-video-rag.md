---
title: "MCP-powered video-RAG using Ragie"
sourceId: "10-context-memory/ai-engineering-hub"
sourceTitle: "AI Engineering Hub"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/patchy631/ai-engineering-hub"
entryUrl: "https://github.com/patchy631/ai-engineering-hub/blob/2c9b106168d4540b88e727e4aa316c06c856c2b7/mcp-video-rag/README.md"
sourceRel: "mcp-video-rag/README.md"
rawUrl: "/raw/10-context-memory/ai-engineering-hub/mcp-video-rag/README.md"
sourceSha256: "46b10e3b28776ac4ac41955cc551d7ee69806458fdc56e92662c06b7209e720d"
pageSha256: "46b10e3b28776ac4ac41955cc551d7ee69806458fdc56e92662c06b7209e720d"
contentMode: "local-full"
zh: ""
---

# MCP-powered video-RAG using Ragie

This project demonstrates how to build a video-based Retrieval Augmented Generation (RAG) system powered by the Model Context Protocol (MCP). It uses [Ragie's](https://www.ragie.ai/) video ingestion and retrieval capabilities to enable semantic search and Q&A over video content and integrate them as MCP tools via Cursor IDE.

We use the following tech stack:
- Ragie for video ingestion + retrieval (video-RAG)
- Cursor as the MCP host

---
## Setup and Installation

Ensure you have Python 3.12 or later installed on your system.

### Install uv
First, let’s install uv and set up our Python project and environment:
```bash
# MacOS/Linux
curl -LsSf https://astral.sh/uv/install.sh | sh

# Windows
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```

### Install dependencies
```bash
# Create a new directory for our project
uv init project-name
cd project-name

# Create virtual environment and activate it
uv venv
source .venv/bin/activate  # MacOS/Linux

.venv\Scripts\activate     # Windows

# Install dependencies
uv sync
```

### Configure environment variables

Copy `.env.example` to `.env` and configure the following environment variables:
```
RAGIE_API_KEY=your_ragie_api_key
```

## Run the project

First, set up your MCP server as follows:
- Go to Cursor settings
- Select MCP Tools
- Add new global MCP server.

In the JSON file, add this:
```json
{
    "mcpServers": {
        "ragie": {
            "command": "uv",
            "args": [
                "--directory",
                "/absolute/path/to/project_root",
                "run",
                "server.py"
            ],
            "env": {
                "RAGIE_API_KEY": "YOUR_RAGIE_API_KEY"
            }
        }
    }
}
```

You should now be able to see the MCP server listed in the MCP settings. In Cursor MCP settings make sure to toggle the button to connect the server to the host.

Done! Your server is now up and running. 

The custom MCP server has 3 tools:
- `ingest_data_tool`: Ingests the video data to the Ragie index
- `retrieve_data_tool`: Retrieves relevant data from the video based on user query
- `show_video_tool`: Creates a short video chunk from the specified segment from the original video 

You can now ingest your videos, retrieve relevant data and query it all using the Cursor Agent.
The agent can even create the desired chunks from your video just with a single query.

---

## 📬 Stay Updated with Our Newsletter!
**Get a FREE Data Science eBook** 📖 with 150+ essential lessons in Data Science when you subscribe to our newsletter! Stay in the loop with the latest tutorials, insights, and exclusive resources. [Subscribe now!](https://join.dailydoseofds.com)

[![Daily Dose of Data Science Newsletter](https://github.com/patchy631/ai-engineering/blob/main/resources/join_ddods.png)](https://join.dailydoseofds.com)

---

## Contribution
