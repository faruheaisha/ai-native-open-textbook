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
pageSha256: "bbf73bf3813ef3afaa0fae44d3adcd5d4475cc51f4ad382644ad8198dd757a5a"
contentMode: "local-full"
zh: ""
---

## Coin Tickers by ID

**URL:** llms-txt#coin-tickers-by-id

Source: https://docs.coingecko.com/v3.0.1/reference/coins-id-tickers

v3.0.1/reference/api-reference/coingecko-demo.json get /coins/\{id\}/tickers
This endpoint allows you to **query the coin tickers on both centralized exchange (CEX) and decentralized exchange (DEX) based on a particular coin ID**

* You may obtain the coin ID (API ID) via several ways:
    * refers to respective coin page and find 'API ID'.
    * refers to [`/coins/list`](https://docs.coingecko.com/v3.0.1/reference/coins-list) endpoint.
    * refers to google sheets [here](https://docs.google.com/spreadsheets/d/1wTTuxXt8n9q7C4NDXqQpI3wpKu1_5bGVmP9Xz0XGSyU/edit?usp=sharing).
  * You may specify the `exchange_ids` if you want to retrieve tickers for specific exchange only.
  * You may include values such as  `page` to specify which page of responses you would like to show.
  * You may also flag to include more data such as exchange logo and depth.

* The tickers are paginated to 100 items.
  * When `dex_pair_format=symbol`, the DEX pair `base` and `target` are displayed in symbol format (e.g. `WETH`, `USDC`) instead of as contract addresses.
  * When order is sorted by `volume`, ***converted\_volume*** will be used instead of ***volume***.
  * Cache / Update Frequency: every 2 minutes for all the API plans.
