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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/llms-full.md"
sourceRel: "i18n/zh/skills/coingecko/references/llms-full.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/coingecko/references/llms-full.md"
sourceSha256: "a3cd0a16407a7e6b85ceb3cc714181ec1aecb3fdb5043afd1a82ec9cfdea8ec8"
pageSha256: "5fa82f66bce6fe8b29a88ea9ac25fff8c5967668bc1ec8195c12777066b281e0"
contentMode: "local-full"
zh: ""
---

## Remote Server (Public, Keyless)

The easiest way to get started. Just add the following to your client's `mcp_config.json` file.

  ### Client-Specific Config

  The file name and location depend on your client. Find your config file here: [modelcontextprotocol.io/quickstart](https://modelcontextprotocol.io/quickstart/user#2-add-the-filesystem-mcp-server)

Add the following configuration to your `mcp_config.json`:

  ```json JSON theme={null}
  {
    "mcpServers": {
      "coingecko_mcp": {
        "command": "npx",
        "args": [
          "mcp-remote",
          "https://mcp.api.coingecko.com/mcp"
        ]
      }
    }
  }
  ```

Here's a quick 2-minute tutorial for setting up the public server with Claude Desktop:

<iframe className="w-full aspect-video rounded-xl" src="https://www.youtube.com/embed/PDYJvtKok0E" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
