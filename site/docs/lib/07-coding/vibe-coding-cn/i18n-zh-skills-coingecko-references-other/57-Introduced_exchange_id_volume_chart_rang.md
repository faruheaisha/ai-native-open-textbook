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
pageSha256: "bc58a4f5723fa783322a7e877c85edcf73010e3b3677051fe080f0e73b6233fd"
contentMode: "local-full"
zh: ""
---

## Introduced /exchange/id/volume\_chart/range endpoint

🗓️ **February 15, 2023**

We've introduced the [/exchange//volume\_chart/range](https://docs.coingecko.com/reference/exchanges-id-volume-chart-range) endpoint for Paid Plan Subscribers.

This exclusive feature allows users to query full historical volume data of an exchange.

  ## Introduced /coins/list/new endpoint

🗓️ **January 09, 2023**

We've introduced the [/coins/list/new](https://docs.coingecko.com/reference/coins-list-new) endpoint for Paid Plan Subscribers.

This exclusive feature allows users to query the latest 200 coins on CoinGecko.

**Examples:**

Example 1 (unknown):
```unknown
### Megafilter: Ascending Sort Order for Price Change %

  The [Megafilter for Pools](/reference/pools-megafilter) endpoint now supports ascending sorting for price change percentage:

  * `m5_price_change_percentage_asc`
  * `h1_price_change_percentage_asc`
  * `h6_price_change_percentage_asc`
  * `h24_price_change_percentage_asc`

  ### Token OHLCV Endpoint Fix to respect Specified Token Address

  We've fixed an issue where the [Token OHLCV chart by Token Address](/reference/token-ohlcv-token-address) endpoint returned data for the base token of the top pool instead of the requested token. It will now always return data for the specified token address.

  ## SDK Gains Public Treasury Coverage, MCP Adds Exchanges, NFTs, and ISO Support

  🗓️ **September 25, 2025**

  ### Expanded SDK Coverage for Public Treasuries

  We're broadening our SDK coverage to make treasury-level insights more powerful and easier to access. Check out what's new below (with functions from [our TypeScript SDK](https://github.com/coingecko/coingecko-typescript))

  * [`publicTreasury.getCoinID(coinID, { ...params })`](https://github.com/coingecko/coingecko-typescript/blob/main/api.md#publictreasury) \
    to query public companies & governments' cryptocurrency holdings by Coin ID
  * [`publicTreasury.getEntityID(entityID)`](https://github.com/coingecko/coingecko-typescript/blob/main/api.md#publictreasury) \
    to query public companies & governments' cryptocurrency holdings by Entity ID
  * [`entities.getList({ ...params })`](https://github.com/coingecko/coingecko-typescript/blob/main/api.md#entities) \
    to query all the supported entities on CoinGecko with entities ID, name, symbol, and country

  ### New MCP Tools: Exchanges, NFTs & Multi-Address Queries

  We're also surfacing new tools through the MCP to give developers a richer, faster way to query exchanges, NFTs, and onchain activity.

  * New tools:
    * Exchange coverage with [/exchanges/list](reference/exchanges-list), [/exchanges/](reference/exchanges-id), [/exchanges//tickers](reference/exchanges-id-tickers), and [/exchanges//volume\_chart/range](reference/exchanges-id-volume-chart-range)
    * NFT markets with [/nfts/markets](reference/nfts-markets)
    * Multi-address queries with [/onchain/networks//pools/multi/](reference/pools-addresses) and [/onchain/networks//tokens/multi/](reference/tokens-data-contract-addresses)
  * Retired tools:
    * We've removed endpoints such as [/coins/list](reference/coins-list), [/onchain/networks/trending\_pools](reference/trending-pools-network), and single-address pool/token queries in favor of more scalable multi-address endpoints

  ### Friendlier Time-related MCP Queries with ISO Support

  Time-based queries just got easier. MCP tools now accept **ISO date strings** (`YYYY-MM-DD` or `YYYY-MM-DDTHH:MM`) alongside UNIX timestamps.

  For example, when using the [Coin Historical Chart Data within Time Range](reference/coins-id-market-chart-range) tool, you can now pass ISO date strings directly instead of converting them into UNIX timestamps for your LLM tools.

  **CoinGecko API Team**

  ## New Crypto Treasury Endpoints and Improvements

  🗓️ **September 19, 2025**

  1. [Crypto Treasury Holdings by Coin ID](https://docs.coingecko.com/reference/companies-public-treasury) endpoint now supports governments and more coins data as seen on [https://www.coingecko.com/en/treasuries/bitcoin](https://www.coingecko.com/en/treasuries/bitcoin)
  2. **New endpoints:**
     1. [Crypto Treasury Holdings by Entity ID](https://docs.coingecko.com/reference/public-treasury-entity)
     2. [Entities List (ID Map)](https://docs.coingecko.com/reference/entities-list)
  3. [Derivatives Exchange Data by ID](https://docs.coingecko.com/reference/derivatives-exchanges-id) endpoint now supports `coin_id` and `target_coin_id` to identify coins of ticker pairs.
```

Example 2 (unknown):
```unknown

  ## Multiple Improvements: Bonding Curve Data, Pooled Token Balance, and More.

  🗓️ **September 12, 2025**

  ### 🚀 Now Supporting Bonding Curve Data

  Bonding curve data (launchpad graduation) is now supported for the followiing endpoints:

  * [Specific Pool Data by Pool Address](https://docs.coingecko.com/reference/pool-address)
  * [Multiple Pools Data by Pool Addresses](https://docs.coingecko.com/reference/pools-addresses)

  **Payload example:**
```

Example 3 (unknown):
```unknown
More endpoints to support bonding curve data soon.

  ### 🚀 Now Supporting Pooled Token Balance Data

  The following endpoints now support additional pool token balance data by flagging this parameter `include_composition=true` :

  * [Specific Pool Data by Pool Address](https://docs.coingecko.com/reference/pool-address)
  * [Multiple Pools Data by Pool Addresses](https://docs.coingecko.com/reference/pools-addresses)
  * [Token Data by Token Address](https://docs.coingecko.com/reference/token-data-contract-address) (requires `include=top_pools` parameter to be flagged together)
  * [Tokens Data by Token Addresses](https://docs.coingecko.com/reference/tokens-data-contract-addresses) (requires `include=top_pools` parameter to be flagged together)

  **Payload example:**
```

Example 4 (unknown):
```unknown
### 🚀 Other improvements

  1. [Onchain Megafilter](https://docs.coingecko.com/reference/pools-megafilter) endpoint now supports more `sort` options:
     * `m5_price_change_percentage_desc`
     * `h1_price_change_percentage_desc`
     * `h6_price_change_percentage_desc`
     * `fdv_usd_asc`
     * `fdv_usd_desc`
     * `reserve_in_usd_asc`
     * `reserve_in_usd_desc`
  2. [Top Gainers & Losers](https://docs.coingecko.com/reference/coins-top-gainers-losers) endpoint now supports additional price change percentage data by flagging `price_change_percentage` parameter. The available options are: `1h,24h,7d,14d,30d,60d,200d,1y`.
     * Payload example:
```
