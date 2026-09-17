---
title: "Stagehand × mcp-use"
sourceId: "10-context-memory/ai-engineering-hub"
sourceTitle: "AI Engineering Hub"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/patchy631/ai-engineering-hub"
entryUrl: "https://github.com/patchy631/ai-engineering-hub/blob/2c9b106168d4540b88e727e4aa316c06c856c2b7/stagehand%20x%20mcp-use/README.md"
sourceRel: "stagehand x mcp-use/README.md"
rawUrl: "/raw/10-context-memory/ai-engineering-hub/stagehand x mcp-use/README.md"
sourceSha256: "527af6d4af3aea51ac5ec739849ff542c0c254c51a0b6f2c06002780a7f2ccd0"
pageSha256: "527af6d4af3aea51ac5ec739849ff542c0c254c51a0b6f2c06002780a7f2ccd0"
contentMode: "local-full"
zh: ""
---

# Stagehand × mcp-use

A Streamlit application that provides a chat interface for interacting with MCP (Model Context Protocol) servers using mcp-use local client. This app allows you to configure Stagehand MCP server and chat with it using natural language for web automation tasks.

**Tech stack:**
- [mcp-use](https://github.com/mcp-use/mcp-use) to connect LLM to MCP servers
- [Stagehand MCP](https://github.com/browserbase/mcp-server-browserbase) for browser access and web automation
- [Ollama](https://ollama.ai) for local LLM support

## Setup

1. **Install Dependencies**: 
   ```bash
   uv sync 
   ```

2. **Environment Variables**:
   Create a `.env` file with your API keys:
   ```env
   BROWSERBASE_API_KEY=your-browserbase-api-key
   BROWSERBASE_PROJECT_ID=your-browserbase-project-id
   ```

3. **Setup MCP Servers**:
   Go to `mcp-config.json` and update the paths to the MCP servers according to your system.

4. **Run the App**:
   ```bash
   streamlit run app.py
   ```

## Usage

1. **Configure MCP Servers**:
   - Use the sidebar to enter your MCP server configuration in JSON format
   - Click "Load Example Config" to see a sample configuration
   - Click "Activate Configuration" to initialize the MCP client

2. **Chat with MCP Tools**:
   - Once configured, use the chat interface to interact with your MCP servers
   - Ask questions about available tools or request specific actions
   - The agent will use the appropriate MCP tools to respond

## Example Configuration

```json
{
  "mcpServers": {
    "browserbase": {
      "command": "npx",
      "args": [
        "-y",
        "@browserbasehq/mcp-server-browserbase",
        "--modelName", 
        "ollama/llama3.2:8b"
      ],
      "env": {
        "BROWSERBASE_API_KEY": "your-browserbase-api-key",
        "BROWSERBASE_PROJECT_ID": "your-browserbase-project-id",
        "OLLAMA_HOST": "http://127.0.0.1:11434"
      }
    }
  }
}
```

## 📬 Stay Updated with Our Newsletter!
**Get a FREE Data Science eBook** 📖 with 150+ essential lessons in Data Science when you subscribe to our newsletter! Stay in the loop with the latest tutorials, insights, and exclusive resources. [Subscribe now!](https://join.dailydoseofds.com)

[![Daily Dose of Data Science Newsletter](https://github.com/patchy631/ai-engineering/blob/main/resources/join_ddods.png)](https://join.dailydoseofds.com)

---

## Contribution
