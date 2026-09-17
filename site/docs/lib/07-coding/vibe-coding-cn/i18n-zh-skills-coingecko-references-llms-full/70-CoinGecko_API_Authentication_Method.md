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
pageSha256: "4c4e0b5a14cf815ab2a08e583fbdf749e0bac41fb7d0387034a72dee8474fd0a"
contentMode: "local-full"
zh: ""
---

## CoinGecko API Authentication Method

If this is your first time using the Pro API key, you can supply API Key to the root URL using one of these ways:

1. Header (Recommended): `x-cg-pro-api-key`
2. Query String Parameter: `x_cg_pro_api_key`

| Authentication Method  | Example using [Ping](https://docs.coingecko.com/reference/ping-server) Endpoint                                         |
| ---------------------- | --------------------------------------------------------------------------------------------- |
| Header (cURL)          | `curl -X GET "https://pro-api.coingecko.com/api/v3/ping" -H "x-cg-pro-api-key: YOUR_API_KEY"` |
| Query String Parameter | `https://pro-api.coingecko.com/api/v3/ping?x_cg_pro_api_key=YOUR_API_KEY`                     |
