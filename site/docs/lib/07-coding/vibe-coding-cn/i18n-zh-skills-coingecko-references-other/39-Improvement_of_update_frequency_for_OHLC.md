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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/other.md"
sourceRel: "i18n/zh/skills/coingecko/references/other.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/coingecko/references/other.md"
sourceSha256: "0475f27bdec749a3923243511fa9995a6b979ed924a086b9b9a02c5e9a1741a5"
pageSha256: "b8e1c6b6481cd61149dfb0a84f3125e39bdc2a69041f8992240fe8297f09f27e"
contentMode: "local-full"
zh: ""
---

## Improvement of update frequency for OHLC endpoints

🗓️ **September 04, 2024**

The cache & update frequency of the following endpoints have been improved from every 30 minutes to every 15 minutes:

* [/coins//ohlc](https://docs.coingecko.com/reference/coins-id-ohlc)
  * [/coins//ohlc/range](https://docs.coingecko.com/reference/coins-id-ohlc-range)

  ## Included new fields - NFT data

🗓️ **August 18, 2024**

We've added  'user\_favorites\_count', and 'ath' (all-time-high) related data to the following NFT endpoints:

* [/nfts/](https://docs.coingecko.com/reference/nfts-id)
  * [/nfts//contract/](https://docs.coingecko.com/reference/nfts-contract-address)

**Example of responses:**

  ## Introduced /coins/id/ohlc/range endpoint

We've introduced a new endpoint [/coins//ohlc/range](https://docs.coingecko.com/reference/coins-id-ohlc-range).

This endpoint allows you to get the OHLC chart (Open, High, Low, Close) of a coin within a range of timestamp based on particular coin id.

Please note that this endpoint is available exclusively for **paid plan subscribers only**.
