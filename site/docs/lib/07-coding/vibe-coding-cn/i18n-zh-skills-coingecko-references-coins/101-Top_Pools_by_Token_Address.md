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
pageSha256: "0f19edce4e50b0372184a878abde2599dff065365b1fb242d888833c20eb9354"
contentMode: "local-full"
zh: ""
---

## Top Pools by Token Address

**URL:** llms-txt#top-pools-by-token-address

Source: https://docs.coingecko.com/v3.0.1/reference/top-pools-contract-address

v3.0.1/reference/api-reference/onchain-demo.json get /networks/\{network\}/tokens/\{token_address\}/pools
This endpoint allows you to **query top pools based on the provided token contract address on a network**

* You may include values such as `page` to specify which page of responses you would like to show.

* The ranking of the top 20 pools is established by evaluating their liquidity and trading activity to identify the most liquid ones. This ranking is determined through a combination of two key factors: liquidity (`reserve_in_usd`) and 24-Hour Trading Volume (`volume_usd`).
  * If the token's market cap is not verified by the team, the API response will return `null` for its market cap value, even though it has a displayed value on GeckoTerminal, which might not be accurate as it often matches the Fully Diluted Valuation (FDV).
  * Attributes specified in the `include` param will be returned under the top-level "included" key.
  * This endpoint returns up to 20 pools per page. Use the `page` param to navigate more results.
  * `page`: Pagination beyond 10 pages is available for [Paid Plan](https://www.coingecko.com/en/api/pricing) subscribers (Analyst plan or above).
  * Cache/Update frequency: every 60 seconds.
