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
pageSha256: "d4d64ab2dc9e01610ba22b15895ea384f55c8ed9fda1cf0f44550048eff07ae0"
contentMode: "local-full"
zh: ""
---

## Coin Historical Data by ID

**URL:** llms-txt#coin-historical-data-by-id

Source: https://docs.coingecko.com/v3.0.1/reference/coins-id-history

v3.0.1/reference/api-reference/coingecko-demo.json get /coins/\{id\}/history
This endpoint allows you to **query the historical data (price, market cap, 24hrs volume, ...) at a given date for a coin based on a particular coin ID**

* You may obtain the coin ID (API ID) via several ways:
    * refers to respective coin page and find 'API ID'.
    * refers to [`/coins/list`](https://docs.coingecko.com/v3.0.1/reference/coins-list) endpoint.
    * refers to Google Sheets [here](https://docs.google.com/spreadsheets/d/1wTTuxXt8n9q7C4NDXqQpI3wpKu1_5bGVmP9Xz0XGSyU/edit?usp=sharing).

* The data returned is at `00:00:00 UTC`.
  * The last completed UTC day (00:00) is available 35 minutes after midnight on the next UTC day (00:35).
  * Access to historical data via the Public API (Demo plan) is **restricted to the past 365 days** only. To access the complete range of historical data, please subscribe to one of our [paid plans](https://www.coingecko.com/en/api/pricing) to obtain a Pro-API key.
