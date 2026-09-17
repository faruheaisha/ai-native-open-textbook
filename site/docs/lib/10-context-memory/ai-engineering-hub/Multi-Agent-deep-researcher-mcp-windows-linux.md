---
title: "Agentic Deep Researcher"
sourceId: "10-context-memory/ai-engineering-hub"
sourceTitle: "AI Engineering Hub"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/patchy631/ai-engineering-hub"
entryUrl: "https://github.com/patchy631/ai-engineering-hub/blob/2c9b106168d4540b88e727e4aa316c06c856c2b7/Multi-Agent-deep-researcher-mcp-windows-linux/README.md"
sourceRel: "Multi-Agent-deep-researcher-mcp-windows-linux/README.md"
rawUrl: "/raw/10-context-memory/ai-engineering-hub/Multi-Agent-deep-researcher-mcp-windows-linux/README.md"
sourceSha256: "a42c720da386571605a03d93a0dcb0b9bc4da19771cc12907c2f7e2daa870e12"
pageSha256: "a42c720da386571605a03d93a0dcb0b9bc4da19771cc12907c2f7e2daa870e12"
contentMode: "local-full"
zh: ""
---

# Agentic Deep Researcher

We're building an MCP-powered multi-agent deep researcher, it can perform deep web searches using [Linkup](https://www.linkup.so/) amd the agents are orchestrated using CrewAI.

We use:

- [LinkUp](https://www.linkup.so/) (Search Tool)
- CrewAI (Agentic design)
- Deepseek R1 (LLM)
- Streamlit to wrap the logic in an interactive UI

### SetUp

Run these commands in project root

```
uv sync
```

### Run the Application

Run the application with:

```bash
streamlit run app.py
```

### Use as MCP server

```json
{
  "mcpServers": {
    "crew_research": {
      "command": "uv",
      "args": [
        "--directory",
        "./Multi-Agent-deep-researcher-mcp-windows-linux",
        "run",
        "server.py"
      ],
      "env": {
        "LINKUP_API_KEY": "your_linkup_api_key_here"
      }
    }
  }
}
```
[Get your Linkup API keys here](https://www.linkup.so/)

## 📬 Stay Updated with Our Newsletter!

**Get a FREE Data Science eBook** 📖 with 150+ essential lessons in Data Science when you subscribe to our newsletter! Stay in the loop with the latest tutorials, insights, and exclusive resources. [Subscribe now!](https://join.dailydoseofds.com)

[![Daily Dose of Data Science Newsletter](https://github.com/patchy631/ai-engineering/blob/main/resources/join_ddods.png)](https://join.dailydoseofds.com)

## Contribution
