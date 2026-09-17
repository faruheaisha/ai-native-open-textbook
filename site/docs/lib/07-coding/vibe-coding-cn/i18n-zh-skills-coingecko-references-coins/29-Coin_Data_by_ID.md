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
pageSha256: "b23aa08df01435b2d108adb83ef4dcf6bc5e8c85cc4bf8f6a4c7edb3496efdfb"
contentMode: "local-full"
zh: ""
---

## Coin Data by ID

**URL:** llms-txt#coin-data-by-id

Source: https://docs.coingecko.com/v3.0.1/reference/coins-id

v3.0.1/reference/api-reference/coingecko-demo.json get /coins/\{id\}
This endpoint allows you to **query all the metadata (image, websites, socials, description, contract address, etc.) and market data (price, ATH, exchange tickers, etc.) of a coin from the CoinGecko coin page based on a particular coin ID**

* You may obtain the coin `id` (API ID) via several ways:
    * refers to respective coin page and find "API ID".
    * refers to [`/coins/list`](https://docs.coingecko.com/v3.0.1/reference/coins-list) endpoint.
    * refers to Google Sheets [here](https://docs.google.com/spreadsheets/d/1wTTuxXt8n9q7C4NDXqQpI3wpKu1_5bGVmP9Xz0XGSyU/edit?usp=sharing).
  * You may also flag to include more data such as tickers, market data, community data, developer data and sparkline.
  * You may refer to `last_updated` in the endpoint response to check whether the price is stale.

* Tickers are limited to 100 items, to get more tickers, please go to [/coins/\{id\}/tickers](https://docs.coingecko.com/v3.0.1/reference/coins-id-tickers).
  * Coin descriptions may include newline characters represented as `\r\n` (escape sequences), which may require processing for proper formatting.
  * When `dex_pair_format=symbol`, the DEX pair `base` and `target` are displayed in symbol format (e.g. `WETH`, `USDC`) instead of as contract addresses.
  * Cache/Update Frequency:
    * Every 60 seconds for all the API plans.
    * Community data for Telegram will be updated on weekly basis (Reddit & Twitter community data are no longer supported).
