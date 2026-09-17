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
pageSha256: "5931f3e4967d2f16c3ce85dab74087258aa0359b5ac9e6f4fffe472fca18c6ba"
contentMode: "local-full"
zh: ""
---

## Dynamic vs. Static Tools

When running our CoinGecko MCP server, you can choose how the LLM client discovers tools.

* **Static (Default)**: The AI is given a complete list of tools and their functions upfront. This is faster for specific, known tasks.
* **Dynamic**: The AI first asks the server for available tools based on a keyword search, then learns how to use them. This is flexible but can be slower.

For a deeper dive, read the [official documentation](https://www.stainless.com/changelog/mcp-dynamic-tools) from Stainless.
