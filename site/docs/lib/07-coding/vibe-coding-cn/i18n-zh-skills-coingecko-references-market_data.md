---
title: "Coingecko - Market Data"
sourceId: "07-coding/vibe-coding-cn"
sourceTitle: "Vibe Coding CN"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/2025Emma/vibe-coding-cn"
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/market_data.md"
sourceRel: "i18n/zh/skills/coingecko/references/market_data.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/coingecko/references/market_data.md"
sourceSha256: "362c7b218adcc0e80ce78c4da12b9d2644dbe2ca113ea7eaa8515593dbed7b92"
pageSha256: "362c7b218adcc0e80ce78c4da12b9d2644dbe2ca113ea7eaa8515593dbed7b92"
contentMode: "local-full"
zh: ""
---

# Coingecko - Market Data

**Pages:** 3

---

## 💼 NFTs Collection Historical Chart Data by ID

**URL:** llms-txt#💼-nfts-collection-historical-chart-data-by-id

Source: https://docs.coingecko.com/reference/nfts-id-market-chart

reference/api-reference/coingecko-pro.json get /nfts/\{id\}/market_chart
This endpoint allows you **query historical market data of a NFT collection, including floor price, market cap, and 24hr volume, by number of days away from now**

* Data Granularity (auto):
    * 1-14 days from now = **5-minutely** data
    * 15 days & above from now = **daily** data (00:00 UTC)
  * Cache/Update Frequency: every 5 minutes
  * The last completed UTC day (00:00) is available 5 minutes after midnight on the next UTC day (00:05).
  * Exclusive for Paid Plan Subscribers (Analyst, Lite, Pro and Enterprise).

---

## 💼 NFTs Collection Historical Chart Data by Contract Address

**URL:** llms-txt#💼-nfts-collection-historical-chart-data-by-contract-address

Source: https://docs.coingecko.com/reference/nfts-contract-address-market-chart

reference/api-reference/coingecko-pro.json get /nfts/\{asset_platform_id\}/contract/\{contract_address\}/market_chart
This endpoint allows you **query historical market data of a NFT collection, including floor price, market cap, and 24hr volume, by number of days away from now based on the provided contract address**

* This endpoint doesn't support Solana NFT and Art Blocks, please use [/nfts/\\{id\}/market\_chart](https://docs.coingecko.com/reference/nfts-id-market-chart) endpoint instead.
  * Data Granularity (auto):
    * 1-14 days from now = **5-minutely** data
    * 15 days & above from now = **daily** data (00:00 UTC)
  * Cache/Update Frequency: every 5 minutes
  * The last completed UTC day (00:00) is available 5 minutes after midnight on the next UTC day (00:05).
  * Exclusive for Paid Plan Subscribers (Analyst, Lite, Pro and Enterprise).

---

## 💼 NFTs Collection Tickers by ID

**URL:** llms-txt#💼-nfts-collection-tickers-by-id

Source: https://docs.coingecko.com/reference/nfts-id-tickers

reference/api-reference/coingecko-pro.json get /nfts/\{id\}/tickers
This endpoint allows you to **query the latest floor price and 24hr volume of a NFT collection, on each NFT marketplace, e.g. OpenSea and LooksRare**

* Cache/Update Frequency: every 30 seconds.
  * Exclusive for Paid Plan Subscribers (Analyst, Lite, Pro and Enterprise).
