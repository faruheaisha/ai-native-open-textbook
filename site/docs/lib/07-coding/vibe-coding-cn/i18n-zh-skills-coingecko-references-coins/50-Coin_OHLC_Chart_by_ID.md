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
pageSha256: "d11a1a23a37784771e54c005c1ce92a3fce0815c04b92fac10db766b203f1f18"
contentMode: "local-full"
zh: ""
---

## Coin OHLC Chart by ID

**URL:** llms-txt#coin-ohlc-chart-by-id

Source: https://docs.coingecko.com/v3.0.1/reference/coins-id-ohlc

v3.0.1/reference/api-reference/coingecko-demo.json get /coins/\{id\}/ohlc
This endpoint allows you to **get the OHLC chart (Open, High, Low, Close) of a coin based on particular coin ID**

* You may obtain the coin ID (API ID) via several ways:
    * refers to respective coin page and find 'API ID'.
    * refers to [`/coins/list`](https://docs.coingecko.com/v3.0.1/reference/coins-list) endpoint.
    * refers to google sheets [here](https://docs.google.com/spreadsheets/d/1wTTuxXt8n9q7C4NDXqQpI3wpKu1_5bGVmP9Xz0XGSyU/edit?usp=sharing).
  * For historical chart data with better granularity, you may consider using [/coins/\\{id\}/market\_chart](https://docs.coingecko.com/v3.0.1/reference/coins-id-market-chart) endpoint.

* The timestamp displayed in the payload (response) indicates the end (or close) time of the OHLC data.
  * Data granularity (candle's body) is automatic:
    * 1 - 2 days: 30 minutes
    * 3 - 30 days: 4 hours
    * 31 days and beyond: 4 days
  * Cache / Update Frequency:
    * Every 15 minutes for all the API plans.
    * The last completed UTC day (00:00) is available 35 minutes after midnight on the next UTC day (00:35).
  * Access to historical data via the Public API (Demo plan) is **restricted to the past 365 days** only. To access the complete range of historical data, please subscribe to one of our [paid plans](https://www.coingecko.com/en/api/pricing) to obtain a Pro-API key.
