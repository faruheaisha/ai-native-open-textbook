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
pageSha256: "dda12759e034f0fe5ef9c07e82fb047aaf460d702d7373db327dccc37455f5f1"
contentMode: "local-full"
zh: ""
---

## Token Data by Token Address

**URL:** llms-txt#token-data-by-token-address

Source: https://docs.coingecko.com/v3.0.1/reference/token-data-contract-address

v3.0.1/reference/api-reference/onchain-demo.json get /networks/\{network\}/tokens/\{address\}
This endpoint allows you to **query specific token data based on the provided token contract address on a network**

* You may add values such as `top_pools` in the include param to include top pools along with the pools information.
  * If you would like to query token information such as socials, websites, description and etc. You can go to this endpoint [`/networks/\{network\}/tokens/\{address\}/info`](https://docs.coingecko.com/v3.0.1/reference/token-info-contract-address) instead.

* If the token's market cap is not verified by the team, the API response will return `null` for its market cap value, even though it has a displayed value on GeckoTerminal, which might not be accurate as it often matches the Fully Diluted Valuation (FDV).
  * Market Cap can be verified by and sourced from CoinGecko, and the number may be higher than FDV as it may include Market Cap of tokens issued on other blockchain network.
  * Attributes specified in the `include` param will be returned under the top-level "included" key.
  * Set `include_composition=true` to surface the balance and liquidity value of the pool's base and quote tokens. (requires `include=top_pools`)
  * For tokens on a bonding curve (i.e. non-graduated tokens from launchpads), the response will include a `launchpad_details` object containing their graduation status and details.
  * Cache/Update frequency: every 60 seconds.
