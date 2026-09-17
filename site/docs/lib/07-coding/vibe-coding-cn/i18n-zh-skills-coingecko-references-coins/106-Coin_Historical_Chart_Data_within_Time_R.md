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
pageSha256: "b7bd200ae17fbe11fbfa18e30e502d44c72759a9ed7f34bc0a01fc48da6e3010"
contentMode: "local-full"
zh: ""
---

## Coin Historical Chart Data within Time Range by ID

**URL:** llms-txt#coin-historical-chart-data-within-time-range-by-id

Source: https://docs.coingecko.com/v3.0.1/reference/coins-id-market-chart-range

v3.0.1/reference/api-reference/coingecko-demo.json get /coins/\{id\}/market_chart/range
This endpoint allows you to **get the historical chart data of a coin within certain time range in UNIX along with price, market cap and 24hr volume based on particular coin ID**

* You may obtain the coin ID (API ID) via several ways:
    * refers to respective coin page and find 'API ID'.
    * refers to [`/coins/list`](https://docs.coingecko.com/v3.0.1/reference/coins-list) endpoint.
    * refers to google sheets [here](https://docs.google.com/spreadsheets/d/1wTTuxXt8n9q7C4NDXqQpI3wpKu1_5bGVmP9Xz0XGSyU/edit?usp=sharing).

* You may leave the interval params as empty for automatic granularity:
    * 1 day from current time = **5-minutely** data
    * 1 day from any time (except current time) = **hourly** data
    * 2 - 90 days from any time = **hourly** data
    * above 90 days from any time = **daily** data (00:00 UTC)
  * Cache / Update Frequency:\
    Based on days range (all the API plans)
    * 1 day = 30 seconds cache
    * 2 -90 days = 30 minutes cache
    * 90 days = 12 hours cache
  * The last completed UTC day (00:00) is available 35 minutes after midnight on the next UTC day (00:35). The cache will always expire at 00:40 UTC.
  * Access to historical data via the Public API (Demo plan) is **restricted to the past 365 days** only. To access the complete range of historical data, please subscribe to one of our [paid plans](https://www.coingecko.com/en/api/pricing) to obtain a Pro-API key.
