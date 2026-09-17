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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/hummingbot/references/other.md"
sourceRel: "i18n/zh/skills/hummingbot/references/other.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/hummingbot/references/other.md"
sourceSha256: "7bd57673fc3df5b901db36ae3eac6be136526e8e2dbb141702c9a6ebc26b607a"
pageSha256: "2fb0d2aee2b79ce16b2c736c84cca8d7e43e1eec8b2d0e4b210a46e6662dfb95"
contentMode: "local-full"
zh: ""
---

## Overview - Hummingbot

**URL:** https://hummingbot.org/mcp/

**Contents:**
- Hummingbot MCP Server¶
- Overview¶
- What is Model Context Protocol (MCP)?¶
- Key Features¶
  - 🏦 Account Management¶
  - 💰 Portfolio Tracking¶
  - 📊 Order Management¶
  - 📈 Position Management¶
  - 🔍 Market Data Access¶
  - 📉 Funding Rates Monitoring¶

The Hummingbot Model Context Protocol (MCP) Server enables AI assistants like Claude and Gemini to interact with Hummingbot for automated cryptocurrency trading across multiple exchanges.

GitHub Repository: github.com/hummingbot/mcp

The MCP Server acts as a bridge between AI language models and the Hummingbot trading platform, enabling programmatic interaction with cryptocurrency trading infrastructure. This allows AI assistants to manage trading operations, analyze portfolios, and execute strategies on behalf of users.

Model Context Protocol is an open standard that enables AI assistants to securely interact with external systems and data sources. In the context of Hummingbot, MCP allows AI models to:

The Hummingbot MCP Server provides the following capabilities:

Ready to build AI trading agents with Hummingbot? Follow these steps:

The MCP server provides comprehensive trading capabilities through these tool categories:

Monitor balances, track performance, and analyze portfolio allocation across all connected exchanges.

Execute trades, manage orders, and control positions programmatically with AI oversight.

Access real-time prices, funding rates, and order book data for informed decision making.

Install Claude CLI following Anthropic's guide

Configure MCP server in your Claude configuration: \{ "mcpServers": \{ "hummingbot": \{ "command": "uv", "args": ["run", "mcp"], "cwd": "/path/to/hummingbot-mcp" \} \} \}

Start trading conversation: You: Show me my portfolio balances across all exchanges Claude: I'll check your portfolio balances using the Hummingbot MCP server...

The configuration process for Gemini CLI - refer to Google's documentation for MCP setup or check out Gemini CLI Installation

See Codex CLI Installation for setup.

The Hummingbot MCP Server is open source. Contributions are welcome!

You can extend the MCP server by adding custom tools:

**Examples:**

Example 1 (unknown):
```unknown
graph TB
    subgraph "AI Assistants"
        CLAUDE[Claude CLI]
        GEMINI[Gemini CLI]
    end

    subgraph "MCP Server"
        MCP[Hummingbot<br/>MCP Server]
    end

    subgraph "Hummingbot Infrastructure" 
        API[Hummingbot API<br/>Server]
        BOTS[Trading Bots]
    end

    subgraph "Exchanges"
        EX[Binance, OKX,<br/>Hyperliquid, etc.]
    end

    %% AI to MCP connections
    CLAUDE -->|MCP Protocol| MCP
    GEMINI -->|MCP Protocol| MCP

    %% MCP to Hummingbot API
    MCP -->|REST API| API

    %% API to infrastructure
    API <--> BOTS
    BOTS <--> EX
    API <--> EX

    %% Styling
    classDef aiStyle stroke:#5FFFD7,stroke-width:3px
    classDef mcpStyle stroke:#E549FF,stroke-width:3px  
    classDef hbStyle stroke:#00B1BB,stroke-width:3px

    class CLAUDE,GEMINI aiStyle
    class MCP mcpStyle
    class API,BOTS hbStyle
```

Example 2 (unknown):
```unknown
{
  "mcpServers": {
    "hummingbot": {
      "command": "uv",
      "args": ["run", "mcp"],
      "cwd": "/path/to/hummingbot-mcp"
    }
  }
}
```

Example 3 (unknown):
```unknown
You: Show me my portfolio balances across all exchanges
Claude: I'll check your portfolio balances using the Hummingbot MCP server...
```

Example 4 (unknown):
```unknown
AI: "What's my current portfolio worth and how is it distributed?"
MCP: Retrieves balances across all exchanges and calculates total value
AI: Provides detailed breakdown with recommendations
```

---

## 

**URL:** https://hummingbot.org/assets/img/xrpl.png
