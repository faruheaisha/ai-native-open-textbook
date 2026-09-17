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
pageSha256: "cc1efab162d6df3e57fa921f06f8223b823eaf2f1920fa85c4f87b7b4b24caee"
contentMode: "local-full"
zh: ""
---

## 🔥 Accessing Onchain DEX data

You can now use the Pro-API key (exclusive to any paid plan subscriber) to call onchain DEX data powered by [GeckoTerminal](https://www.geckoterminal.com/).

  ### **Notes**

  * Authentication method for onchain endpoints is exactly same as other endpoints.
  * When using the CG Pro API to access onchain DEX data, include the `/onchain` endpoint path in the request.

| Authentication Method  | Example using [Simple Token Price](https://docs.coingecko.com/reference/onchain-simple-price) Endpoint                                                                                                  |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Header (cURL)          | `curl -X GET "<https://pro-api.coingecko.com/api/v3/onchain/simple/networks/eth/token_price/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2>" -H "x-cg-pro-api-key: YOUR_API_KEY"` |
| Query String Parameter | `https://pro-api.coingecko.com/api/v3/onchain/simple/networks/eth/token_price/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2?x_cg_pro_api_key=YOUR_API_KEY`                       |
