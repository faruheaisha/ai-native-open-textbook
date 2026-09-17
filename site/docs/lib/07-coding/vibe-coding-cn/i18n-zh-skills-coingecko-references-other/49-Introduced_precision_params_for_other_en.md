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
pageSha256: "b954108b19cc9c066df79765c6673c1c6fa6405726a76b50cf06973cf8858c46"
contentMode: "local-full"
zh: ""
---

## Introduced precision params for other endpoints

The uses of 'precision' parameter allows to specify price data in full or 0-18 decimals, and previously was only made available for [/simple/price](https://docs.coingecko.com/reference/simple-price) and [/simple/token\_price/](https://docs.coingecko.com/reference/simple-token-price) endpoints.

This parameter is now supported for more endpoints as listed below:

* [/coins/markets](https://docs.coingecko.com/reference/coins-markets)
  * [/coins/market\_chart](https://docs.coingecko.com/reference/coins-id-market-chart)
  * [/coins/market\_chart/range](https://docs.coingecko.com/reference/coins-id-market-chart)
  * [/coins//contract//market\_chart](https://docs.coingecko.com/reference/contract-address-market-chart)
  * [/coins//contract//market\_chart/range](https://docs.coingecko.com/reference/contract-address-market-chart-range)
  * [/coins//ohlc](https://docs.coingecko.com/reference/coins-id-ohlc)
