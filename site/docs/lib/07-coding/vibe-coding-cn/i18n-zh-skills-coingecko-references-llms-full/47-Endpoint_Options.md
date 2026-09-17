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
pageSha256: "f5f38d4f9038946a3fef860a212ca5997fa4ce4604b8dcf212b51ec8cd24beba"
contentMode: "local-full"
zh: ""
---

## 🔗 Endpoint Options

Each remote server offers two connection methods to ensure compatibility with various MCP clients:

### Primary Endpoint (HTTP Streaming)

* **Public Server**: `https://mcp.api.coingecko.com/mcp`
* **Pro Server**: `https://mcp.pro-api.coingecko.com/mcp`
* Uses HTTP streaming protocol for real-time data transfer.
* Recommended for most modern MCP clients.

### Alternative Endpoint (SSE — Server-Sent Events)

* **Public Server**: `https://mcp.api.coingecko.com/sse`
* **Pro Server**: `https://mcp.pro-api.coingecko.com/sse`
* Uses Server-Sent Events for compatibility.
* Use this if you encounter connection issues with the primary endpoint.

  Most clients work with either endpoint. The configuration examples below use the SSE endpoint by default for maximum compatibility.
