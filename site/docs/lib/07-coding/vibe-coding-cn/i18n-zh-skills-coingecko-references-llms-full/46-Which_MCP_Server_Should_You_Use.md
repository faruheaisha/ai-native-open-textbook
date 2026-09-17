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
pageSha256: "f35d41a971903c8facf58c88a8c97a730cae31dac46ce8fd9610ac98570f17cf"
contentMode: "local-full"
zh: ""
---

## Which MCP Server Should You Use?

Here's a breakdown of the available options to help you choose the right one:

| MCP Server Type                 | Best For                                                                                                                                                                                                                                | Endpoints                                | Status      | Setup Details                                                                 |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- | ----------- | ----------------------------------------------------------------------------- |
| Remote Server (Public, Keyless) | - First-time users, quick tests, and basic queries<br />- Connect instantly without any registration<br />- Subject to shared rate limits, not for heavy use                                                                            | Primary: `/mcp`<br />Alternative: `/sse` | Public Beta | [mcp.api.coingecko.com](https://mcp.api.coingecko.com/)                       |
| Remote Server (Authenticated)   | - Scalable apps, AI agent integrations<br />- Unlocks 76+ tools available under your Demo/Pro plan<br />- Higher, reliable rate limits with 24/7 uptime. Get your API key [here](https://www.coingecko.com/en/api/pricing)              | Primary: `/mcp`<br />Alternative: `/sse` | Public Beta | [mcp.pro-api.coingecko.com](https://mcp.pro-api.coingecko.com/)               |
| Local Server                    | - Ideal for local development, desktop AI apps<br />- Build/test your AI app even without an active internet connection<br />- Demo/Pro API key to access more tools. Get your API key [here](https://www.coingecko.com/en/api/pricing) | Local server instance                    | Beta        | [npmjs/coingecko-mcp](https://www.npmjs.com/package/@coingecko/coingecko-mcp) |
