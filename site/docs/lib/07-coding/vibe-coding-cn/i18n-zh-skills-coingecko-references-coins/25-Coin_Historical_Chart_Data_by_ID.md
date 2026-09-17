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
pageSha256: "54ff08134e409ad3318473efb408cb32513b2632671072d129bfe5b1f95e68bd"
contentMode: "local-full"
zh: ""
---

## Coin Historical Chart Data by ID

**URL:** llms-txt#coin-historical-chart-data-by-id

Source: https://docs.coingecko.com/v3.0.1/reference/coins-id-market-chart

v3.0.1/reference/api-reference/coingecko-demo.json get /coins/\{id\}/market_chart
This endpoint allows you to **get the historical chart data of a coin including time in UNIX, price, market cap and 24hr volume based on particular coin ID**

* You may obtain the coin ID (API ID) via several ways:
    * refers to respective coin page and find 'API ID'.
    * refers to [`/coins/list`](https://docs.coingecko.com/v3.0.1/reference/coins-list) endpoint.
    * refers to google sheets [here](https://docs.google.com/spreadsheets/d/1wTTuxXt8n9q7C4NDXqQpI3wpKu1_5bGVmP9Xz0XGSyU/edit?usp=sharing).
  * You may use tools like [epoch converter ](https://www.epochconverter.com) to convert human readable date to UNIX timestamp.

* You may leave the interval as empty for automatic granularity:
    * 1 day from current time = **5-minutely** data
    * 2 - 90 days from current time = **hourly** data
    * above 90 days from current time = **daily** data (00:00 UTC)
  * Cache / Update Frequency:
    * Every 30 seconds for all the API plans (for last data point).
    * The last completed UTC day (00:00) data is now available **10 minutes after midnight** on the next UTC day (00:10).
  * Access to historical data via the Public API (Demo plan) is **restricted to the past 365 days** only. To access the complete range of historical data, please subscribe to one of our [paid plans](https://www.coingecko.com/en/api/pricing) to obtain a Pro-API key.
