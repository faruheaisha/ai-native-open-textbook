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
pageSha256: "c44a801dea740ab214ff1c45a58afe9f8414c689242e78a628d839505efedcb7"
contentMode: "local-full"
zh: ""
---

## 💼 Coin OHLC Chart within Time Range by ID

**URL:** llms-txt#💼-coin-ohlc-chart-within-time-range-by-id

Source: https://docs.coingecko.com/reference/coins-id-ohlc-range

reference/api-reference/coingecko-pro.json get /coins/\{id\}/ohlc/range
This endpoint allows you to **get the OHLC chart (Open, High, Low, Close) of a coin within a range of timestamp based on particular coin ID**

* You may obtain the coin ID (API ID) via several ways:
    * refers to respective coin page and find 'API ID'.
    * refers to [`/coins/list`](https://docs.coingecko.com/reference/coins-list) endpoint.
    * refers to google sheets [here](https://docs.google.com/spreadsheets/d/1wTTuxXt8n9q7C4NDXqQpI3wpKu1_5bGVmP9Xz0XGSyU/edit?usp=sharing).
  * For historical chart data with better granularity, you may consider using [/coins/\{`id`\}/market\_chart](https://docs.coingecko.com/reference/coins-id-market-chart) endpoint.
  * Supports ISO date strings (`YYYY-MM-DD` or\
    `YYYY-MM-DDTHH:MM`, recommended for best compatibility) or UNIX timestamps.

* The timestamp displayed in the payload (response) indicates the end (or close) time of the OHLC data.
  * Interval Options:
    * Daily Interval (`interval=daily`):
      * up to 180 days per request/ 180 daily interval candles.
    * Hourly Interval (`interval=hourly`):
      * up to 31 days per request/ 744 hourly interval candles.
  * Data availability:
    * Available from 9 February 2018 onwards (`1518147224` epoch time).
  * Exclusive for Paid Plan Subscribers (Analyst, Lite, Pro and Enterprise).
  * Cache / Update Frequency:
    * Every 15 minutes for all the API plans.
