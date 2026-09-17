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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/coins.md"
sourceRel: "i18n/zh/skills/coingecko/references/coins.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/coingecko/references/coins.md"
sourceSha256: "fb2cd6385ac7d21732c4716db3c685f6c264d3d3a3fe9b8efd0973eb2605d330"
pageSha256: "a6439d029f072d980928332b69a1333018d938d4aeac66bc661cdfcc7548ac7c"
contentMode: "local-full"
zh: ""
---

## Coin Price by Token Addresses

**URL:** llms-txt#coin-price-by-token-addresses

Source: https://docs.coingecko.com/v3.0.1/reference/simple-token-price

v3.0.1/reference/api-reference/coingecko-demo.json get /simple/token_price/\{id\}
This endpoint allows you to **query one or more token prices using their token contract addresses**

* You may obtain the asset platform and contract address via several ways:
    * refers to respective coin page and find 'contract address'.
    * refers to [`/coins/list`](https://docs.coingecko.com/v3.0.1/reference/coins-list) endpoint (`include platform = true`).
  * You may flag to include more data such as market cap, 24hr volume, 24hr change, last updated time etc.

* The endpoint returns the global average price of the coin that is aggregated across all active exchanges on CoinGecko.
  * You may cross-check the price on [CoinGecko](https://www.coingecko.com) and learn more about our price methodology [here](https://www.coingecko.com/en/methodology).
  * Cache/Update Frequency: every 60 seconds for Public API.
    * Every 20 seconds for [Pro-API](https://www.coingecko.com/en/api/pricing) (Analyst, Lite, Pro, Enterprise).
