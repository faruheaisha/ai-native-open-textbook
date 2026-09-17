---
title: "Vibe Coding CN"
sourceId: "07-coding/vibe-coding-cn"
sourceTitle: "Vibe Coding CN"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/2025Emma/vibe-coding-cn"
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/hummingbot/references/getting_started.md"
sourceRel: "i18n/zh/skills/hummingbot/references/getting_started.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/hummingbot/references/getting_started.md"
sourceSha256: "aee68b742e5dcbc964624d10833db685d054e63a53b7e60a19dcbb50ba658356"
pageSha256: "9bc783f62188297e95913bb2255cc157e7b9c4cfa0dbce9dd7692622954561b5"
contentMode: "local-full"
zh: ""
---

## Installation - Hummingbot

**URL:** https://hummingbot.org/mcp/installation/

**Contents:**
- Hummingbot MCP Server Installation Guide¶
- 📋 Prerequisites¶
- ⚙️ Installing via Docker MCP Catalog¶
- 🔗 Connecting an MCP Client¶
- 🛠️ JSON MCP Integration¶
  - Gemini CLI¶
    - Installation¶
    - Configuration¶
  - Codex CLI¶
    - Installation¶

This guide will walk you through installing and configuring the Hummingbot MCP Server, connecting it with AI assistants such as Claude CLI, Gemini CLI, or Codex CLI, and troubleshooting common issues.

Before starting, make sure you have:

💡 Tip: Ensure Docker Desktop has the MCP Toolkit feature enabled.

Open Docker Desktop → navigate to MCP Toolkit → Catalog. Search for the Hummingbot MCP Server and click ➕ Install.

Go to the Configuration tab for the installed server.

Set the following environment variables:

If your Hummingbot API is running locally, use: http://host.docker.internal:8000 instead of http://localhost:8000

After entering your values, click the checkbox on the right to save.

Once the server is configured, connect it with your MCP clients:

In Docker Desktop → MCP Toolkit → Clients Choose your AI client (e.g., Claude Desktop, Cursor, VS Code). Click Connect to establish a link.

For clients not listed, you can:

Run MCP Gateway manually: docker mcp gateway run

Or add the server manually in your client configuration:

Gemini CLI is Google’s open-source AI agent that integrates Gemini models into your terminal.

👉 Gemini CLI Installation Guide

Navigate to the config folder:

Edit the settings.json file

Add MCP server configuration:

Open Gemini and verify the connection by running:

✅ You should see hummingbot-mcp in the output.

Codex CLI is OpenAI’s local coding agent designed for developer workflows.

👉 Codex CLI Installation Guide

The MCP instructions below will also work with the IDE version of Codex for VSCode / Cursor etc. If you want Codex in your code editor see the - IDE installation guide

Navigate to the config folder:

Add the MCP server configuration:

Run Codex and and verify the connection by running:

✅ Codex should now detect and connect to the Hummingbot MCP server.

Once configured, try commands like:

"Show me my portfolio balances"

"List all active trading bots"

"Get the current BTC-USDT price on Binance"

📢 Need help? Join our Discord community or visit the GitHub repository for the latest updates.

**Examples:**

Example 1 (unknown):
```unknown
docker mcp gateway run
```

Example 2 (unknown):
```unknown
"mcp": {
  "servers": {
    "MCP_DOCKER": {
      "command": "docker",
      "args": ["mcp", "gateway", "run"],
      "type": "stdio"
    }
  }
}
```

Example 3 (unknown):
```unknown
cd ~/.gemini
```

Example 4 (unknown):
```unknown
nano settings.json
```
