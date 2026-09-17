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
pageSha256: "1f0cb8ec351c06d347b39e068c642d29d7fbb4b3baf53ce2a96a4e15713a7694"
contentMode: "local-full"
zh: ""
---

## Coin Price by IDs

**URL:** llms-txt#coin-price-by-ids

Source: https://docs.coingecko.com/v3.0.1/reference/simple-price

v3.0.1/reference/api-reference/coingecko-demo.json get /simple/price
This endpoint allows you to **query the prices of one or more coins by using their unique Coin API IDs**

* You may obtain the coin ID (API ID) via several ways:
    * refers to respective coin page and find 'API ID'.
    * refers to [`/coins/list`](https://docs.coingecko.com/v3.0.1/reference/coins-list) endpoint.
    * refers to Google Sheets [here](https://docs.google.com/spreadsheets/d/1wTTuxXt8n9q7C4NDXqQpI3wpKu1_5bGVmP9Xz0XGSyU/edit?usp=sharing).
  * You can retrieve specific coins using their unique `ids`, `names`, or `symbols`.
  * You may flag to include more data such as market cap, 24hr volume, 24hr change, last updated time etc.
  * To verify if a price is stale, you may flag `include_last_updated_at=true` in your request to obtain the latest updated time. Alternatively, you may flag `include_24hr_change=true` to determine if it returns a `null` value.

* You may cross-check the price on [CoinGecko](https://www.coingecko.com) and learn more about our price methodology [here](https://www.coingecko.com/en/methodology).
  * When multiple lookup params are provided, the following priority order is applied: `ids` (highest) > `names` > `symbols` (lowest).
  * When searching by `name`, you need to URL-encode any spaces (e.g. "Binance Coin" becomes "Binance%20Coin").
  * The `include_tokens=all` param is exclusively for use with the `symbols` lookup and is limited to maximum of 50 symbols per request.
  * Wildcard searches are not supported for lookup params (`ids`, `names`, `symbols`).
  * Cache/Update Frequency: every 60 seconds for Public API.
    * Every 20 seconds for [Pro-API](https://www.coingecko.com/en/api/pricing) (Analyst, Lite, Pro, Enterprise).
