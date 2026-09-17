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
pageSha256: "03148c92f720c3fb41d5eaa1f6b35bf642d2c55c49aaf129b953905076cbcb84"
contentMode: "local-full"
zh: ""
---

## 💼 Top Token Holders by Token Address

**URL:** llms-txt#💼-top-token-holders-by-token-address

Source: https://docs.coingecko.com/reference/top-token-holders-token-address

reference/api-reference/onchain-pro.json get /networks/\{network\}/tokens/\{address\}/top_holders
This endpoint allows you to **query top token holders based on the provided token contract address on a network**

* The top holders data is currently in **Beta**, with ongoing improvements to data quality, coverage, and update frequency.
  * **Supported chains include**: Solana, EVM (Ethereum, Polygon, BNB, Arbitrum, Optimism, Base), Sui, TON, and Ronin.
  * Max `holders` value:
    * Maximum 50 for non-Solana networks, 40 for Solana network.
  * 💼 Exclusive for [Paid Plan](https://www.coingecko.com/en/api/pricing) subscribers (Analyst plan or above).
  * Cache/Update frequency: every 60 seconds.
