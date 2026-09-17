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
pageSha256: "2bc00994d44e222dda8a07e11785c420fc9819a3966b5b8e5d29d6d448499570"
contentMode: "local-full"
zh: ""
---

## Coins List with Market Data

**URL:** llms-txt#coins-list-with-market-data

Source: https://docs.coingecko.com/v3.0.1/reference/coins-markets

v3.0.1/reference/api-reference/coingecko-demo.json get /coins/markets
This endpoint allows you to **query all the supported coins with price, market cap, volume and market related data**

* You can retrieve specific coins using their unique `ids`, `names`, or `symbols` instead of returning the whole list.
  * To filter results based on the coin's category, use the `category` param (refer to [`/coins/categories/list`](https://docs.coingecko.com/v3.0.1/reference/coins-categories-list) for available categories).
  * Use the `per_page` and `page` params to manage the number of results you receive and navigate through the data.

* When multiple lookup params are provided, the following priority order is applied: `category` (highest) > `ids` > `names` > `symbols` (lowest).
  * When searching by `name`, you need to URL-encode any spaces (e.g. "Binance Coin" becomes "Binance%20Coin").
  * The `include_tokens=all` param is exclusively for use with the `symbols` lookup and is limited to maximum of 50 symbols per request.
  * Wildcard searches are not supported for lookup params (`ids`, `names`, `symbols`).
  * Cache/Update Frequency:
    * Every 60 seconds for Public API.
    * Every 45 seconds for Pro API (Analyst, Lite, Pro, Enterprise).
