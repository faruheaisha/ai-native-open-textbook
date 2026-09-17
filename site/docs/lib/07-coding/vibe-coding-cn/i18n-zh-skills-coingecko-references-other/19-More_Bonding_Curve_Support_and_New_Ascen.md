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
pageSha256: "83aa29a73f087d97e0ffafb4773f5c75440476445c1533bd37cac266fcaf9694"
contentMode: "local-full"
zh: ""
---

## More Bonding Curve Support and New Ascending Sort for Megafilter

🗓️ **October 4, 2025**

### Now supported Bonding Curve (non-graduated) Data for More Endpoints

We've added support for bonding curve (e.g. launchpad graduation from PumpFun) data across multiple token endpoints:

* [Token Data by Token Address](https://docs.coingecko.com/reference/token-data-contract-address) — `/onchain/networks/\{network\}/tokens/\{address\}`
  * [Tokens Data by Token Addresses](https://docs.coingecko.com/reference/tokens-data-contract-addresses) — `/onchain/networks/\{network\}/tokens/multi/\{addresses\}`
  * [Token Info by Token Address](https://docs.coingecko.com/reference/token-info-contract-address) — `/onchain/networks/\{network\}/tokens/\{address\}/info`
  * [Pool Tokens Info by Pool Address](https://docs.coingecko.com/reference/pool-token-info-contract-address) — `/onchain/networks/\{network\}/pools/\{pool_address\}/info`

### Megafilter: Ascending Sort Order for Price Change %

The [Megafilter for Pools](https://docs.coingecko.com/reference/pools-megafilter) endpoint now supports ascending sorting for price change percentage:

* `m5_price_change_percentage_asc`
  * `h1_price_change_percentage_asc`
  * `h6_price_change_percentage_asc`
  * `h24_price_change_percentage_asc`

### Token OHLCV Endpoint Fix to respect Specified Token Address

We've fixed an issue where the [Token OHLCV chart by Token Address](https://docs.coingecko.com/reference/token-ohlcv-token-address) endpoint returned data for the base token of the top pool instead of the requested token. It will now always return data for the specified token address.

  ## SDK Gains Public Treasury Coverage, MCP Adds Exchanges, NFTs, and ISO Support

🗓️ **September 25, 2025**

### Expanded SDK Coverage for Public Treasuries

We're broadening our SDK coverage to make treasury-level insights more powerful and easier to access. Check out what's new below (with functions from [our TypeScript SDK](https://github.com/coingecko/coingecko-typescript))

* [`publicTreasury.getCoinID(coinID, \{ ...params \})`](https://github.com/coingecko/coingecko-typescript/blob/main/api.md#publictreasury) \
    to query public companies & governments' cryptocurrency holdings by Coin ID
  * [`publicTreasury.getEntityID(entityID)`](https://github.com/coingecko/coingecko-typescript/blob/main/api.md#publictreasury) \
    to query public companies & governments' cryptocurrency holdings by Entity ID
  * [`entities.getList(\{ ...params \})`](https://github.com/coingecko/coingecko-typescript/blob/main/api.md#entities) \
    to query all the supported entities on CoinGecko with entities ID, name, symbol, and country

### New MCP Tools: Exchanges, NFTs & Multi-Address Queries

We're also surfacing new tools through the MCP to give developers a richer, faster way to query exchanges, NFTs, and onchain activity.

* New tools:
    * Exchange coverage with [/exchanges/list](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/reference/exchanges-list/README.md), [/exchanges/](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/reference/exchanges-id/README.md), [/exchanges//tickers](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/reference/exchanges-id-tickers/README.md), and [/exchanges//volume\_chart/range](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/reference/exchanges-id-volume-chart-range/README.md)
    * NFT markets with [/nfts/markets](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/reference/nfts-markets/README.md)
    * Multi-address queries with [/onchain/networks//pools/multi/](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/reference/pools-addresses/README.md) and [/onchain/networks//tokens/multi/](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/reference/tokens-data-contract-addresses/README.md)
  * Retired tools:
    * We've removed endpoints such as [/coins/list](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/reference/coins-list/README.md), [/onchain/networks/trending\_pools](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/reference/trending-pools-network/README.md), and single-address pool/token queries in favor of more scalable multi-address endpoints

### Friendlier Time-related MCP Queries with ISO Support

Time-based queries just got easier. MCP tools now accept **ISO date strings** (`YYYY-MM-DD` or `YYYY-MM-DDTHH:MM`) alongside UNIX timestamps.

For example, when using the [Coin Historical Chart Data within Time Range](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/reference/coins-id-market-chart-range/README.md) tool, you can now pass ISO date strings directly instead of converting them into UNIX timestamps for your LLM tools.

**CoinGecko API Team**
