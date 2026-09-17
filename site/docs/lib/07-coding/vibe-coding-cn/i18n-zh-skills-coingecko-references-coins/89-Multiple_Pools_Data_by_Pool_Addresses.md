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
pageSha256: "27f6ff7a25c7767869e30d1c65bfddc953174c898b96148199708eab0f64e72b"
contentMode: "local-full"
zh: ""
---

## Multiple Pools Data by Pool Addresses

**URL:** llms-txt#multiple-pools-data-by-pool-addresses

Source: https://docs.coingecko.com/v3.0.1/reference/pools-addresses

v3.0.1/reference/api-reference/onchain-demo.json get /networks/\{network\}/pools/multi/\{addresses\}
This endpoint allows you to **query multiple pools based on the provided network and pool address**

* Addresses not found in GeckoTerminal will be ignored.
  * If the token's market cap is not verified by the team, the API response will return `null` for its market cap value, even though it has a displayed value on GeckoTerminal, which might not be accurate as it often matches the Fully Diluted Valuation (FDV).
  * This endpoint allows querying **up to 30 contract addresses** per request.
  * Market Cap can be verified by and sourced from CoinGecko, and the number may be higher than FDV as it may include Market Cap of tokens issued on other blockchain network.
  * Attributes specified in the `include ` params will be included under the "included" key at the top level.
  * `locked_liquidity_percentage` will be updated on daily basis.
  * Set `include_composition=true` to surface the balance and liquidity value of the pool's base and quote tokens.
  * Pools on a bonding curve (e.g. non-graduated pools from launchpads) will return `launchpad_details` object with their graduation status and migration details.
  * Cache/Update Frequency: every 60 seconds.
