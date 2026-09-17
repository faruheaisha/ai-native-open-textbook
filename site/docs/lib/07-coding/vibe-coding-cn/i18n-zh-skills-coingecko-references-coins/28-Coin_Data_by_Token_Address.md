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
pageSha256: "654312e7ead2a251ed8136278fb55a6b250e93aa964285bb9ae2c1f0c487a20b"
contentMode: "local-full"
zh: ""
---

## Coin Data by Token Address

**URL:** llms-txt#coin-data-by-token-address

Source: https://docs.coingecko.com/v3.0.1/reference/coins-contract-address

v3.0.1/reference/api-reference/coingecko-demo.json get /coins/\{id\}/contract/\{contract_address\}
This endpoint allows you to **query all the metadata (image, websites, socials, description, contract address, etc.) and market data (price, ATH, exchange tickers, etc.) of a coin from the CoinGecko coin page based on an asset platform and a particular token contract address**

  ### Notice

* Please note that the `twitter_followers` data field will no longer be supported by our API starting on May 15, 2025. Please refer to [changelog](https://docs.coingecko.com/changelog#upcoming-change-notice:-removal-of-twitter-followers-data) for more details.

* You may obtain the asset platform and contract address via several ways:
    * refers to respective coin page and find 'contract address'.
    * refers to [`/coins/list`](https://docs.coingecko.com/v3.0.1/reference/coins-list) endpoint (`include platform = true`).

* Coin descriptions may include newline characters represented as `\r\n` (escape sequences), which may require processing for proper formatting.
  * Cache / Update Frequency: every 60 seconds for all the API plans.
