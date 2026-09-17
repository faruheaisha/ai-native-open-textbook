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
pageSha256: "b5adf5d491c12a87bdf5b65e8f18751d6eb3d7ee85647a32b5417f3417145621"
contentMode: "local-full"
zh: ""
---

## New Endpoints & Improvements: Historical Token Holders Chart, OHLCV by Token Address, Multi-pool Token Data Support

### \[Pro-API Exclusive] New Endpoint  - Historical Token Holders Chart by Token Address

This new endpoint allows you to get the historical token holders chart based on the provided token contract address on a network.

* Supported chains include: Solana, EVM (Ethereum, Polygon, BNB, Arbitrum, Optimism, Base), Sui, TON, and Ronin.

Check it out now: [Historical Token Holders Chart by Token Address](https://docs.coingecko.com/reference/token-holders-chart-token-address)

### \[Pro-API Exclusive] New Endpoint  - Token OHLCV chart by Token Address

This endpoint allows you to get the OHLCV chart (Open, High, Low, Close, Volume) of a token based on the provided token address on a network.

* This endpoint will return OHLCV data of the most liquid pool of the specified token. You may use this endpoint Top Pools by Token Address to check the top pools of a token.

Check it out now: [Token OHLCV chart by Token Address](https://docs.coingecko.com/reference/token-ohlcv-token-address#/)

### Improved Endpoints - Support Multi-pool Token Data

Previously, we only surfaced 1 quote token for pools with more than 2 tokens.  With this new improvements, for pools that have 2 or more tokens:

* Extra quote tokens being listed under a new key `relationships.quote_tokens`
  * If `include=quote_token` is flagged, the extra quote tokens will be also listed under `included`

This improvement is applicable to all onchain pool endpoints that support `relationships.quote_token`, including but not limited to:

* [Top Pools by Token Address](https://docs.coingecko.com/reference/top-pools-contract-address#/)
  * [Search Pools](https://docs.coingecko.com/reference/search-pools#/)
  * [Megafilter for Pools](https://docs.coingecko.com/reference/pools-megafilter#/)
  * [Trending Pools List](https://docs.coingecko.com/reference/trending-pools-list#/)
  * [Specific Pool Data by Pool Address](https://docs.coingecko.com/reference/pool-address#/)
  * [Top Pools by Network](https://docs.coingecko.com/reference/top-pools-network#/)
  * [New Pools List](https://docs.coingecko.com/reference/latest-pools-list#/)

  ## Upcoming Change Notice: Removal of normalized\_volume\_btc Data

**`Notice: Upcoming Change to CoinGecko API Endpoints - Removal ofnormalized_volume_btc Data`**

**Effective Date: 16 June 2025**

**Affected Endpoints:**

* [Exchange Data by ID](https://docs.coingecko.com/reference/exchanges-id)
  * [Exchanges List with Data](https://docs.coingecko.com/reference/exchanges#/)

**Details of the Change:**

Please be advised that the `normalized_volume_btc` data point will be removed from the above-listed API endpoints, effective 16 June 2025. This change is being implemented due to significant recent change to a 3rd party data source provider, which have fundamentally altered how this specific data can be accessed.

Example of Affected Data Structure:

After the effective date, the `trade_volume_24h_btc_normalized` field will no longer be present in the API responses for these endpoints.

If your applications or integrations currently rely on the `trade_volume_24h_btc_normalized` data from these CoinGecko API endpoints, please make the necessary adjustments to your code before 16 June 2025 to avoid potential errors or data discrepancies.
