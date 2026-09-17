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
pageSha256: "09c93b30ade363ed47c0514790726fdc1c268110a431d968cd6d60277fa2d00a"
contentMode: "local-full"
zh: ""
---

## Token Price by Token Addresses

**URL:** llms-txt#token-price-by-token-addresses

Source: https://docs.coingecko.com/v3.0.1/reference/onchain-simple-price

v3.0.1/reference/api-reference/onchain-demo.json get /simple/networks/\{network\}/token_price/\{addresses\}
This endpoint allows you to **get token price based on the provided token contract address on a network**

* If the token's market cap is not verified by the team, the API response will return `null` for its market cap value, even though it has a displayed value on GeckoTerminal, which might not be accurate as it often matches the Fully Diluted Valuation (FDV).
    * If you require `market_cap_usd` to return FDV value (as seen in [GeckoTerminal.com](https://www.geckoterminal.com/)) when market cap data is unavailable, please specify this parameter `mcap_fdv_fallback=true`.
  * The returned price currency is in USD.
  * Addresses not found in GeckoTerminal will be ignored.
  * This endpoint allows querying **up to 30 contract addresses** per request.
  * When using this endpoint, GeckoTerminal's routing decides the best pool for token price. The price source may change based on liquidity and pool activity. For full control over the price, you may use [`/networks/\{network\}/pools/\{address\}`](https://docs.coingecko.com/v3.0.1/reference/pool-address) endpoint by providing a specific pool address.
  * Cache/Update Frequency: every 60 seconds.
