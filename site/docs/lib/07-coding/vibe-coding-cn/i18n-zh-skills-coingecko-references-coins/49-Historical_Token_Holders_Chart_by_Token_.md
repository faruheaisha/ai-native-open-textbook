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
pageSha256: "ccf8217c31a612ce76d555e113a6d5cebb010067c5b82d0f441e08efec784173"
contentMode: "local-full"
zh: ""
---

## 💼 Historical Token Holders Chart by Token Address

**URL:** llms-txt#💼-historical-token-holders-chart-by-token-address

Source: https://docs.coingecko.com/reference/token-holders-chart-token-address

reference/api-reference/onchain-pro.json get /networks/\{network\}/tokens/\{token_address\}/holders_chart
This endpoint allows you to **get the historical token holders chart based on the provided token contract address on a network**

* The historical token holders chart data is currently in Beta, with ongoing improvements to data quality, coverage, and update frequency.
  * Supported chains include: Solana, EVM (Ethereum, Polygon, BNB, Arbitrum, Optimism, Base), Sui, TON, and Ronin.
  * `days` param provides the following automatic granularity:
    * `days=7` = **all data** (without fixed intervals)
    * `days=30` = **daily data** (30 daily intervals)
    * `days=max` = **weekly data**
  * 💼 Exclusive for Paid Plan subscribers (Analyst plan or above).
  * Cache/Update frequency: every 60 seconds.
