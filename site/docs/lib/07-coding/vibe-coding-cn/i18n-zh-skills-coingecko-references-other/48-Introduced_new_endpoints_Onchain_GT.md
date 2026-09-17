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
pageSha256: "5f385f70f98cd5b8c29ca55baa3353fd77b9d12c911cc34ff9439c3f1cc1c2cd"
contentMode: "local-full"
zh: ""
---

## Introduced new endpoints (Onchain/GT)

🗓️ **September 06, 2023**

Added new endpoints to allow querying multiple pools and tokens in a single API call. /networks/network/pools/multi/addresses and /networks/network/tokens/multi/addresses

  ## Included new fields (Onchain/GT)

* More data added to the Pool response such as FDV, market cap (from CoinGecko if available), price change percentage, volume, number of buy/sell transactions
  * More data added when querying for token such as FDV, volume, market cap, and the top 3 pools
