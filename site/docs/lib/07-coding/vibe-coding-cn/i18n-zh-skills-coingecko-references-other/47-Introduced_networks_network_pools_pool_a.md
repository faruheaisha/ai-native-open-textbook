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
pageSha256: "012251180b3c826e34e362ab136ba6b2b592936fe5a205167ae9901c5a0c4391"
contentMode: "local-full"
zh: ""
---

## Introduced /networks/network/pools/pool\_address/trades endpoint (Onchain/GT)

🗓️ **November 08, 2023**

You can now get the latest 300 trades in the past 24 hours of a given pool from this endpoint [/networks//pools//trades](https://docs.coingecko.com/reference/pool-trades-contract-address). You may optionally filter by trade size as well. You can now build your own telegram bot alert!

  ## Introduced new endpoints (Onchain/GT)

🗓️ **October 23, 2023**

You can now fetch token information such as name, image, social links, and description via these endpoints:

* To fetch information of tokens inside a pool, use [/networks//pools//info](https://docs.coingecko.com/reference/pool-token-info-contract-address)
  * To fetch information of a specific token use [/networks//tokens//info](https://docs.coingecko.com/reference/token-info-contract-address)
  * If you like to get token information of the most recently updated tokens, use [/tokens/info\_recently\_updated](https://docs.coingecko.com/reference/tokens-info-recent-updated)

  ## Included new fields (Onchain/GT)

🗓️ **September 11, 2023**

Pool response data now returns price in the base and quote token of the pool base\_token\_price\_quote\_token and quote\_token\_price\_base\_token for your convenience without the need to do additional calculation to derive these values
