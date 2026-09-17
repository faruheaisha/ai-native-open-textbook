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
pageSha256: "c98836e8431237743e1541346e8dd4da91cd126a5a76ebbd19938914bbe3a411"
contentMode: "local-full"
zh: ""
---

## 💼 Trending Search Pools

**URL:** llms-txt#💼-trending-search-pools

Source: https://docs.coingecko.com/reference/trending-search-pools

reference/api-reference/onchain-pro.json get /pools/trending_search
This endpoint allows you to **query all the trending search pools across all networks on GeckoTerminal**

* If the token's market cap is not verified by the team, the API response will return `null` for its market cap value, even though it has a displayed value on GeckoTerminal, which might not be accurate as it often matches the Fully Diluted Valuation (FDV).
  * Attributes specified in the `include` param will be returned under the top-level "included" key.
  * Cache/Update frequency: every 60 seconds.
  * 💼 Exclusive for [Paid Plan](https://www.coingecko.com/en/api/pricing) subscribers (Analyst plan or above).
