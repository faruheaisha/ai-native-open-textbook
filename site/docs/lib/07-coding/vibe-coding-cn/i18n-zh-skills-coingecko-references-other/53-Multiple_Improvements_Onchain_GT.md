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
pageSha256: "e1efddc941e65fe11a9a82cd6e3d42d160e148e028359886c69ffd724f06697c"
contentMode: "local-full"
zh: ""
---

## Multiple Improvements (Onchain/GT)

🗓️ **April 18, 2023**

* base\_token\_native\_currency and quote\_token\_native\_currency added to the pools endpoint response. This allows you to obtain price in the network's native currency in addition to in USD
  * reserve\_in\_usd added to the pools endpoint response. This returns the total liquidity/reserve of the pool in USD
  * pool\_created\_at added to the pools endpoint response

Example of responses for [/networks//pools/](https://docs.coingecko.com/reference/pool-address) :

* [/networks//new\_pools](https://docs.coingecko.com/reference/latest-pools-network) endpoint added to query new pools discovered for a network
  * [/networks/new\_pools](https://docs.coingecko.com/reference/latest-pools-list) endpoint added to query new pools discovered across all networks
