---
title: "Changelog"
sourceId: "07-coding/vibe-coding-cn"
sourceTitle: "Vibe Coding CN"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/2025Emma/vibe-coding-cn"
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/llms-full.md"
sourceRel: "i18n/zh/skills/coingecko/references/llms-full.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/coingecko/references/llms-full.md"
sourceSha256: "a3cd0a16407a7e6b85ceb3cc714181ec1aecb3fdb5043afd1a82ec9cfdea8ec8"
pageSha256: "3d1dbd4262c8c3f8e2e93e89aeab8972238e2af79aeef0b109bc0bdb82ee4777"
contentMode: "local-full"
zh: ""
---

# Changelog
Source: https://docs.coingecko.com/changelog

Product updates and announcements

export const GreenSeparator = () => (
  &lt;div style=&#123;&#123;
    height: '4px',
    background: 'linear-gradient(to right, transparent, #4BCC00, transparent)',
    margin: '20px 0 60px 0',
    border: 'none'
  &#125;&#125; />
);

  ## Websocket is now supported for Self-serve API subscribers

  🗓️ **October 23, 2025**

  ### CoinGecko Websocket (Beta) is now available for [paid plan](https://www.coingecko.com/en/api/pricing) customers (Analyst plan & above)!

  For Analyst, Lite, Pro, and Pro+ self-serve customers, you are now eligible to access the following Websocket features, and stream real-time data by utilising your monthly API plan credits:

  * Max connections: 10 concurrent socket connections
  * Max subscriptions: 100 token or pool data subscription per channel, per socket
  * Channel Access: [all 4 channels](https://docs.coingecko.com/websocket#channel-%26-data-support)
  * Credit charge: **0.1** credit per response returned, deducting from monthly API plan credits

  Please visit [Websocket](https://docs.coingecko.com/websocket) for full details, and test out Websocket data streaming. We will gradually improve the Websocket and expand the feature limits. Please share your feedback and suggestion via this [**survey form**](https://forms.gle/gNE1Txc9FCV55s7ZA), or email soonaik\@coingecko\[dot]com .

  ### Notice: Temporary Disruption on MagicEden data for NFT Endpoints

  Due to recent updates to MagicEden's API, we are updating our integration. During this period, endpoints for NFT data may be temporarily unavailable or return incomplete information.

  ## More Bonding Curve Support and New Ascending Sort for Megafilter

  🗓️ **October 4, 2025**

  ### Now supported Bonding Curve (non-graduated) Data for More Endpoints

  We've added support for bonding curve (e.g. launchpad graduation from PumpFun) data across multiple token endpoints:

  * [Token Data by Token Address](https://docs.coingecko.com/reference/token-data-contract-address) — `/onchain/networks/\{network\}/tokens/\{address\}`
  * [Tokens Data by Token Addresses](https://docs.coingecko.com/reference/tokens-data-contract-addresses) — `/onchain/networks/\{network\}/tokens/multi/\{addresses\}`
  * [Token Info by Token Address](https://docs.coingecko.com/reference/token-info-contract-address) — `/onchain/networks/\{network\}/tokens/\{address\}/info`
  * [Pool Tokens Info by Pool Address](https://docs.coingecko.com/reference/pool-token-info-contract-address) — `/onchain/networks/\{network\}/pools/\{pool_address\}/info`

  ```json JSON theme={null}
  "launchpad_details": {
    "graduation_percentage": 2.16,
    "completed": false,
    "completed_at": null,
    "migrated_destination_pool_address": null
  }
  ```

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

  ## New Crypto Treasury Endpoints and Improvements

  🗓️ **September 19, 2025**

  1. [Crypto Treasury Holdings by Coin ID](https://docs.coingecko.com/reference/companies-public-treasury) endpoint now supports governments and more coins data as seen on [https://www.coingecko.com/en/treasuries/bitcoin](https://www.coingecko.com/en/treasuries/bitcoin)
  2. **New endpoints:**
     1. [Crypto Treasury Holdings by Entity ID](https://docs.coingecko.com/reference/public-treasury-entity)
     2. [Entities List (ID Map)](https://docs.coingecko.com/reference/entities-list)
  3. [Derivatives Exchange Data by ID](https://docs.coingecko.com/reference/derivatives-exchanges-id) endpoint now supports `coin_id` and `target_coin_id` to identify coins of ticker pairs.

     ```json JSON theme=\{null\}
     "tickers": [
       \{
         "symbol": "ASTERUSDT",
         "base": "ASTER",
         "target": "USDT",
         "coin_id": "aster-2",  👈 NEW
         "target_coin_id": "tether"  👈 NEW
       \}
     ]
     ```

  ## Multiple Improvements: Bonding Curve Data, Pooled Token Balance, and More.

  🗓️ **September 12, 2025**

  ### 🚀 Now Supporting Bonding Curve Data

  Bonding curve data (launchpad graduation) is now supported for the followiing endpoints:

  * [Specific Pool Data by Pool Address](https://docs.coingecko.com/reference/pool-address)
  * [Multiple Pools Data by Pool Addresses](https://docs.coingecko.com/reference/pools-addresses)

  **Payload example:**

  ```json  theme={null}
  "launchpad_details": {
    "graduation_percentage": 100,
    "completed": true,
    "completed_at": "2024-04-08T16:52:35Z",
    "migrated_destination_pool_address": "5wNu5QhdpRGrL37ffcd6TMMqZugQgxwafgz477rShtHy"  
  }
  ```

  More endpoints to support bonding curve data soon.

  ### 🚀 Now Supporting Pooled Token Balance Data

  The following endpoints now support additional pool token balance data by flagging this parameter `include_composition=true` :

  * [Specific Pool Data by Pool Address](https://docs.coingecko.com/reference/pool-address)
  * [Multiple Pools Data by Pool Addresses](https://docs.coingecko.com/reference/pools-addresses)
  * [Token Data by Token Address](https://docs.coingecko.com/reference/token-data-contract-address) (requires `include=top_pools` parameter to be flagged together)
  * [Tokens Data by Token Addresses](https://docs.coingecko.com/reference/tokens-data-contract-addresses) (requires `include=top_pools` parameter to be flagged together)

  **Payload example:**

  ```json  theme={null}
  "base_token_balance": "11700.98",
  "base_token_liquidity_usd": "29630000",
  "quote_token_balance": "66384614.21",
  "quote_token_liquidity_usd": "66330000",  
  ```

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

       ```json  theme=\{null\}
       "usd_1y_change": 21740.8866287307,
       "usd_1h_change": -0.279590756868549,
       "usd_24h_change": 3.13876587906131,
       "usd_7d_change": -9.67782096261206,
       "usd_14d_change": -3.39755498745517,
       "usd_30d_change": -13.7768698159765,
       "usd_60d_change": 29.9096824213076,
       "usd_200d_change": 2282.33681679488
       ```
  3. [Exchange Tickers by ID](https://docs.coingecko.com/reference/exchanges-id-tickers) endpoint now supports to sort tickers based on market cap, by flagging the `order` parameter.
     * Available options: `market_cap_desc`, `market_cap_asc`

  ## Improved Update Frequency for selected Pro-API On-chain Endpoints

  🗓️ **August 18, 2025**

  \[Changes below are applicable to all [paid plan subscribers](https://www.coingecko.com/en/api/pricing).]

  Dear CoinGecko API paid plan subscribers,

  We're excited to announce an improvement to our API, aimed at providing you with even faster access to real-time data! Starting **02:00 UTC, September 2, 2025**, the edge cache duration for the following endpoints will be reduced from \*\*30s \*\*to **10s**, allowing you to retrieve updated data more frequently.

  | Endpoints                                                                                                    | Effective Date & Time                   | Current Update Frequency | New Update Frequency |
  | :----------------------------------------------------------------------------------------------------------- | :-------------------------------------- | :----------------------- | :------------------- |
  | [Token Price by Token Addresses](https://docs.coingecko.com/reference/onchain-simple-price)                  | Tuesday, 02:00 UTC, September 2, 2025   | 30s                      | 10s                  |
  | [Token Data by Token Address](https://docs.coingecko.com/reference/token-data-contract-address)              | Tuesday, 02:00 UTC, September 2, 2025   | 30s                      | 10s                  |
  | [Tokens Data by Token Addresses](https://docs.coingecko.com/reference/tokens-data-contract-addresses)        | Tuesday, 02:00 UTC, September 2, 2025   | 30s                      | 10s                  |
  | [Specific Pool Data by Pool Address](https://docs.coingecko.com/reference/pool-address)                      | Wednesday, 02:00 UTC, September 3, 2025 | 30s                      | 10s                  |
  | [Multiple Pools Data by Pool Addresses](https://docs.coingecko.com/reference/pools-addresses)                | Wednesday, 02:00 UTC, September 3, 2025 | 30s                      | 10s                  |
  | [Pool OHLCV chart by Pool Address](https://docs.coingecko.com/reference/pool-ohlcv-contract-address)         | Thursday, 02:00 UTC, September 4, 2025  | 30s                      | 10s                  |
  | [Token OHLCV chart by Token Address](https://docs.coingecko.com/reference/token-ohlcv-token-address)         | Thursday, 02:00 UTC, September 4, 2025  | 30s                      | 10s                  |
  | [Past 24 Hour Trades by Pool Address](https://docs.coingecko.com/reference/pool-trades-contract-address)     | Thursday, 02:00 UTC, September 4, 2025  | 30s                      | 10s                  |
  | [Past 24 Hour Trades by Token Address](https://docs.coingecko.com/reference/token-trades-contract-address#/) | Thursday, 02:00 UTC, September 4, 2025  | 30s                      | 10s                  |

  #### **What This Means for You:**

  * **Fresher Data, Quicker**: With a reduced cache time, you'll now have the option to access more up-to-date data, closer to real-time!
  * **No Extra Credits for Cached Data**: If your request hits the cache (now updated every 10 seconds for endpoints above), there will be no additional credits charged - just like before.

  **Things to Keep in Mind:**

  * If your request hits our origin server instead of the cache to retrieve the latest data, there may be additional credits used.
  * To balance cost and real-time data needs, we recommend reviewing your request frequency. For those who prefer to obtain data without extra credits, consider keeping your request interval at 30 seconds or more to align with the new cache duration.

  We're committed to continuously improving your experience and ensuring you get the data you need, as efficiently as possible. If you have any questions or need assistance, feel free to reach out to [soonaik@coingecko.com](mailto:soonaik@coingecko.com) .

  **CoinGecko API Team**

  ## Now Supported: Launchpad Data (Pump.fun & More), Granular OHLCV, and Honeypot Info

  🗓️ **August 05, 2025**

  We're excited to announce a major update to our on-chain API endpoints! This release introduces support for popular token launchpads, adds high-frequency OHLCV data, and enhances our honeypot detection capabilities to give you deeper and more timely on-chain insights.

  ### 🚀 Now Supporting Launchpad Data (Pump.fun & More!)

  In addition to the 1,600+ DEXes already integrated with GeckoTerminal.com, you can now track token data from popular launchpad platforms directly through the CoinGecko API. More launchpads will be supported soon!

  **New Supported Launchpads:**

  | Launchpad                                                                                       | network id (API) | dex id (API)      |
  | :---------------------------------------------------------------------------------------------- | :--------------- | :---------------- |
  | [Meteora DBC](https://www.geckoterminal.com/solana/meteora-dbc/pools)                           | solana           | meteora-dbc       |
  | [Pump.fun](https://www.geckoterminal.com/solana/pump-fun/pools)                                 | solana           | pump-fun          |
  | [Raydium Launchpad](https://www.geckoterminal.com/solana/raydium-launchlab/pools) (LetsBonkFun) | solana           | raydium-launchlab |
  | [Boop.fun](https://www.geckoterminal.com/solana/boop-fun/pools)                                 | solana           | boop-fun          |
  | [Virtuals (Base)](https://www.geckoterminal.com/base/virtuals-base/pools)                       | base             | virtuals-base     |

  **Improved endpoints to track launchpad data:**

  * [Token Data by Token Address](https://docs.coingecko.com/reference/token-data-contract-address)
  * [Tokens Data by Token Addresses](https://docs.coingecko.com/reference/tokens-data-contract-addresses)
  * [Specific Pool Data by Pool Address](https://docs.coingecko.com/reference/pool-address)
  * [Multiple Pools Data by Pool Addresses](https://docs.coingecko.com/reference/pools-addresses)

  More launchpad-specific data will be supported soon for the endpoints above!

  **Tips:** use [megafilter endpoint](https://docs.coingecko.com/reference/pools-megafilter) to retrieve latest launchpad data, by flagging `sort=pool_created_at_desc`

  **Request example** (Get latest pools on Pump.fun):

  ```curl  theme={null}
  https://pro-api.coingecko.com/api/v3/onchain/pools/megafilter?page=1&networks=solana&dexes=pump-fun&sort=pool_created_at_desc&x_cg_pro_api_key=YOUR_KEY
  ```

  ### \[Pro-API Exclusive] More Granular OHLCV Data

  On-chain OHLCV endpoints now support higher frequency intervals, down to 1-second granularity.

  | Timeframe | Aggregate (Before) | Aggregate (New) |
  | :-------- | :----------------- | :-------------- |
  | day       | 1                  | 1               |
  | hour      | 1, 4, 12           | 1, 4, 12        |
  | minute    | 1, 5, 15           | 1, 5, 15        |
  | second    | n/a                | 1, 15, 30       |

  **Improved Endpoints:**

  * [Pool OHLCV chart by Pool Address](https://docs.coingecko.com/reference/pool-ohlcv-contract-address)
  * [Token OHLCV chart by Token Address](https://docs.coingecko.com/reference/token-ohlcv-token-address)

  **New interval supported:**

  * 1s
  * 15s
  * 30s

  **Example Request (Get the last 100 1-second intervals for a pool on Ethereum):**

  ```curl  theme={null}
  https://pro-api.coingecko.com/api/v3/onchain/networks/eth/pools/0x06da0fd433c1a5d7a4faa01111c044910a184553/ohlcv/second?aggregate=1&limit=100&include_empty_intervals=false&x_cg_pro_api_key=YOUR_KEY
  ```

  ### 🍯 Enhanced Honeypot Information

  We've expanded our honeypot detection features to provide more comprehensive risk assessment. You can now check if a token is a potential honeypot using the main info endpoints.

  **Improved Endpoints:**

  * [Token Info by Token Address](https://docs.coingecko.com/reference/token-info-contract-address)
  * [Pool Tokens Info by Pool Address](https://docs.coingecko.com/reference/pool-token-info-contract-address)

  **Example Payload:**

  ```json  theme={null}
  {
   "mint_authority": null,
   "freeze_authority": null,
   "is_honeypot": true  // possible values: true / false / unknown
  }
  ```

  ### \[Pro-API Exclusive] New Filtering Option in Megafilter

  Previously, the[Pools Megafilter](https://docs.coingecko.com/reference/pools-megafilter) endpoint could only show tokens confirmed as ***not*** a honeypot (`checks=no_honeypot`). Now, you can also include tokens where the honeypot status is 'unknown'.

  * To use this, set `include_unknown_honeypot_tokens=true`.
  * Important: This parameter only takes effect when `checks=no_honeypot` is also specified in the request.

  **Example Request (Get trending pools that are not confirmed honeypots, including those with an unknown status):**

  ```curl  theme={null}
  https://pro-api.coingecko.com/api/v3/onchain/pools/megafilter?page=1&sort=h6_trending&checks=no_honeypot&include_unknown_honeypot_tokens=true&x_cg_pro_api_key=YOUR_KEY
  ```

  ### 📈 Expanded Pool Data

  **Endpoint**: [Pool Tokens Info by Pool Address](https://docs.coingecko.com/reference/pool-token-info-contract-address)

  By adding `include=pool` to your request on the pool tokens endpoint, you can now retrieve additional context about the pool itself.

  * Base and quote token address
  * Sentiment vote percentage (positive and negative)
  * Community suspicious reports count

  **Payload Example**:

  ```json  theme={null}
    "included": [
      {
        "id": "eth_0x06da0fd433c1a5d7a4faa01111c044910a184553",
        "type": "pool",
        "attributes": {
          "base_token_address": "0xdac17f958d2ee523a2206206994597c13d831ec7",
          "quote_token_address": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
          "sentiment_vote_positive_percentage": 100,
          "sentiment_vote_negative_percentage": 0,
          "community_sus_report": 0
        }
      }
    ]
  ```

  ## SOL Currency Is Now Supported for CoinGecko Endpoints

  🗓️ **June 19, 2025**

  We're excited to announce that you can now obtain real-time and historical price & market data for tokens listed on CoinGecko.com, with the option to return data value in **SOL** (Solana) currency.

  Note: for dates prior to May 2025, 'SOL' historical data is limited to hourly and daily granularity

  #### **Improved endpoints:**

  * [Coin Price by IDs](https://docs.coingecko.com/reference/simple-price)
  * [Coin Price by Token Addresses](https://docs.coingecko.com/reference/simple-token-price)
  * [Supported Currencies List](https://docs.coingecko.com/reference/simple-supported-currencies)
  * [Top Gainers & Losers](https://docs.coingecko.com/reference/coins-top-gainers-losers)
  * [Coins List with Market Data](https://docs.coingecko.com/reference/coins-markets)
  * [Coin Data by ID](https://docs.coingecko.com/reference/coins-id)
  * [Coin Historical Data by ID](https://docs.coingecko.com/reference/coins-id-history)
  * [Coin Historical Chart Data by ID](https://docs.coingecko.com/reference/coins-id-market-chart)
  * [Coin Historical Chart Data within Time Range by ID](https://docs.coingecko.com/reference/coins-id-market-chart-range)
  * [Coin OHLC Chart by ID](https://docs.coingecko.com/reference/coins-id-ohlc)
  * [Coin OHLC Chart within Time Range by ID](https://docs.coingecko.com/reference/coins-id-ohlc-range)
  * [Coin Data by Token Address](https://docs.coingecko.com/reference/coins-contract-address)
  * [Coin Historical Chart Data by Token Address](https://docs.coingecko.com/reference/contract-address-market-chart)
  * [Coin Historical Chart Data within Time Range by Token Address](https://docs.coingecko.com/reference/contract-address-market-chart-range)
  * [Trending Search List](https://docs.coingecko.com/reference/trending-search)
  * [Crypto Global Market Data](https://docs.coingecko.com/reference/crypto-global)

  **Example**: price of Bitcoin in Solana, using [Coin Price by IDs](https://docs.coingecko.com/reference/simple-price) endpoint.

  ```json  theme={null}
  {
    "bitcoin": {
      "sol": 720.21
    }
  }
  ```

  **Example:** historical daily price, market cap and volume of Trump in Solana, using [Coin Historical Chart Data by ID](https://docs.coingecko.com/reference/coins-id-market-chart) endpoint.

  ```json  theme={null}
  {
    "prices": [
      [
        1750118400000,
        0.0640701365814472
      ],
      [
        1750204800000,
        0.0644263929356261
      ],
      [
        1750291200000,
        0.0639713357587322
      ],
      [
        1750326151000,
        0.06415963364804504
      ]
    ],
    "market_caps": [
      [
        1750118400000,
        12843589.584485611
      ],
      [
        1750204800000,
        12882547.839086628
      ],
      [
        1750291200000,
        12793790.726102708
      ],
      [
        1750326151000,
        12826247.390733324
      ]
    ],
    "total_volumes": [
      [
        1750118400000,
        2425793.780846796
      ],
      [
        1750204800000,
        2055697.9106767387
      ],
      [
        1750291200000,
        1871087.4334618242
      ],
      [
        1750326151000,
        2008278.189223005
      ]
    ]
  }
  ```

  ## New Endpoints & Improvements: Historical Token Holders Chart, OHLCV by Token Address, Multi-pool Token Data Support

  🗓️ **June 09, 2025**

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

  ```json  theme={null}
      "relationships": {  
        "base_token": {
          "data": {
            "id": "eth_0x40d16fc0246ad3160ccc09b8d0d3a2cd28ae6c2f",
            "type": "token"
          }
        },
        "quote_token": {
          "data": {
            "id": "eth_0x8353157092ed8be69a9df8f95af097bbf33cb2af",
            "type": "token"
          }
        },
        "quote_tokens": {
          "data": [
            {
              "id": "eth_0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
              "type": "token"
            },
            {
              "id": "eth_0xdac17f958d2ee523a2206206994597c13d831ec7",
              "type": "token"
            }
  ```

  This improvement is applicable to all onchain pool endpoints that support `relationships.quote_token`, including but not limited to:

  * [Top Pools by Token Address](https://docs.coingecko.com/reference/top-pools-contract-address#/)
  * [Search Pools](https://docs.coingecko.com/reference/search-pools#/)
  * [Megafilter for Pools](https://docs.coingecko.com/reference/pools-megafilter#/)
  * [Trending Pools List](https://docs.coingecko.com/reference/trending-pools-list#/)
  * [Specific Pool Data by Pool Address](https://docs.coingecko.com/reference/pool-address#/)
  * [Top Pools by Network](https://docs.coingecko.com/reference/top-pools-network#/)
  * [New Pools List](https://docs.coingecko.com/reference/latest-pools-list#/)

  ## Upcoming Change Notice: Removal of normalized\_volume\_btc Data

  🗓️ **May 30, 2025**

  **`Notice: Upcoming Change to CoinGecko API Endpoints - Removal ofnormalized_volume_btc Data`**

  **Effective Date: 16 June 2025**

  **Affected Endpoints:**

  * [Exchange Data by ID](https://docs.coingecko.com/reference/exchanges-id)
  * [Exchanges List with Data](https://docs.coingecko.com/reference/exchanges#/)

  **Details of the Change:**

  Please be advised that the `normalized_volume_btc` data point will be removed from the above-listed API endpoints, effective 16 June 2025. This change is being implemented due to significant recent change to a 3rd party data source provider, which have fundamentally altered how this specific data can be accessed.

  Example of Affected Data Structure:

  ```json  theme={null}
    {
      "trade_volume_24h_btc_normalized": 47765.5886637453
    },
  ```

  After the effective date, the `trade_volume_24h_btc_normalized` field will no longer be present in the API responses for these endpoints.

  **Action Required:**

  If your applications or integrations currently rely on the `trade_volume_24h_btc_normalized` data from these CoinGecko API endpoints, please make the necessary adjustments to your code before 16 June 2025 to avoid potential errors or data discrepancies.

  ## New Endpoint & Improvements: On-Chain Trades, Net Buy Volume, and More

  🗓️ **May 29, 2025**

  ### \[Pro-API Exclusive] New Endpoint  - On-chain Trades by Token Address

  Previously, the [Past 24 Hour Trades by Pool Address](https://docs.coingecko.com/reference/pool-trades-contract-address) endpoint allows you to retrieve the last 300 trades of a specific pool only.

  With this new endpoint [Past 24 Hour Trades by Token Address](https://docs.coingecko.com/reference/token-trades-contract-address), you can now retrieve the last 300 trades **across different pools**, based on the provided **token contract address** on a network.

  ### Improved Endpoints - Support Net Buy Volume Data

  The following endpoints now support more volume breakdown data:

  * [Specific Pool Data by Pool Address](https://docs.coingecko.com/reference/pool-address)
  * [Multiple Pools Data by Pool Addresses](https://docs.coingecko.com/reference/pools-addresses#/)

  By flagging `include_volume_breakdown=true` , you can surface the following data:

  * net\_buy\_volume\_usd
  * buy\_volume\_usd
  * sell\_volume\_usd

  Sample Response:

  ```json JSON theme={null}
  {
    "data": {
      "id": "eth_0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640",
      "type": "pool",
      "attributes": {
        ...
        },
        "net_buy_volume_usd": {
          "m5":  "-40796.577553965",
          "m15": "-69765.771189161",
          "m30": "-88014.095440243",
          "h1":   "0.000000000000",
          "h6":   "1884879.921855301",
          "h24":  "17555422.243003801"
        },
        "buy_volume_usd": {
          "m5":  "30597.433165473",
          "m15": "139531.542378324",
          "m30": "396063.429481099",
          "h1":  "969922.728762430",
          "h6":  "10366839.570204150",
          "h24": "52666266.729011402"
        },
        "sell_volume_usd": {
          "m5":  "71394.010719438",
          "m15": "209297.313567485",
          "m30": "484077.524921342",
          "h1":  "969922.728762430",
          "h6":  "8481959.648348849",
          "h24": "35110844.486007601"
        },
  ```

  ### Improved Endpoint - On-Chain OHLCV endpoint

  [Pool OHLCV chart by Pool Address](https://docs.coingecko.com/reference/pool-ohlcv-contract-address) endpoint now supports to include empty intervals by flagging `include_empty_intervals=true` .

  * By default, specific timeframe intervals (e.g. minutely) with no recorded swaps are excluded (or **skipped**) from the response.
  * This new parameter option provides the flexibility to get **padded** data, when there's no trade data.

  Sample Response:

  ```json  theme={null}
  {
    "data": {
      "id": "81da0682-1c4f-445a-9bed-9b5454004df5",
      "type": "ohlcv_request_response",
      "attributes": {
        "ohlcv_list": [
          [
            1744712700,
            0.000212149802253853,
            0.000212173305907688,
            0.000212149802253853,
            0.000212173305907688,
            46.48164903882
          ],
          [
            1744712400,
            0.000212149802253853,  👈 O — Follow previous Close value
            0.000212149802253853,  👈 H — Follow previous Close value
            0.000212149802253853,  👈 L — Follow previous Close value
            0.000212149802253853,  👈 C — Follow previous Close value
            0.0  👈 V — Set to zero
          ],
          [
            1744712100,
            0.000210532522666822,
            0.000212149802253853,
            0.000210532522666822,
            0.000212149802253853,  👈 Previous Close value
            46.4765
          ],
  ...
  }
  ```

  ### Improved Endpoints - Support Large Images

  The following endpoints now support more size options for coin logo image:

  * [Token Info by Token Address](https://docs.coingecko.com/reference/token-info-contract-address)
  * [Pool Tokens Info by Pool Address](https://docs.coingecko.com/reference/pool-token-info-contract-addres)

  Sample Response:

  ```json  theme={null}
    "data": {
      "id": "eth_0xdac17f958d2ee523a2206206994597c13d831ec7",
      "type": "token",
      "attributes": {
  ...
        "image_url": "https://assets.coingecko.com/coins/images/325/small/Tether.png?1696501661",
        "image": {
          "thumb": "https://assets.coingecko.com/coins/images/325/thumb/Tether.png?1696501661",
          "small": "https://assets.coingecko.com/coins/images/325/small/Tether.png?1696501661",
          "large": "https://assets.coingecko.com/coins/images/325/large/Tether.png?1696501661"
        },
  ```

  ### Improved Endpoints - Support Normalized Supply Data

  The following endpoints now support `normalized_total_supply`:

  * [Token Data by Token Address](https://docs.coingecko.com/reference/token-data-contract-address)
  * [Tokens Data by Token Addresses](https://docs.coingecko.com/reference/tokens-data-contract-addresses)

  Sample Response:

  ```json  theme={null}
        "decimals": 6,
        "total_supply": "49999156520373530.0",
        "normalized_total_supply": "49999156520.37353",
  ```

  ### Improved Endpoints - Support Pool 'Name' and 'Fee' Data

  The following endpoints now support `pool_name` and `pool_fee`:

  * [Specific Pool Data by Pool Address](https://docs.coingecko.com/reference/pool-address)
  * [Multiple Pools Data by Pool Addresses](https://docs.coingecko.com/reference/pools-addresses)

  Sample Response:

  ```json  theme={null}
          "name": "WETH / USDC 0.05%",
          "pool_name": "WETH / USDC",
          "pool_fee_percentage": "0.05",
  ```

  ### Improved Endpoints - Support Symbols of DEX Pairs

  The following endpoints now allow to flag `dex_pair_format=symbol` to return DEX pair symbols instead of contract address.

  * [Coin Data by ID](https://docs.coingecko.com/reference/coins-id)
  * [Coin Tickers by ID](https://docs.coingecko.com/reference/coins-id-tickers)
  * [Exchange Tickers by ID](https://docs.coingecko.com/reference/exchanges-id-tickers)
  * [Exchange Data by ID](https://docs.coingecko.com/reference/exchanges-id)

  Sample Response:

  ```json  theme={null}
  // before
  {
        "base": "0X8FC8F8269EBCA376D046CE292DC7EAC40C8D358A",
        "target": "0XA0B86991C6218B36C1D19D4A2E9EB0CE3606EB48",
        "market": {
          "name": "Uniswap V2 (Ethereum)",
          "identifier": "uniswap_v2",
  ...
  }

  // now when "dex_pair_format=symbol" is flagged
  {
        "base": "DFI",
        "target": "USDC",
        "market": {
          "name": "Uniswap V2 (Ethereum)",
          "identifier": "uniswap_v2",
  ...
  }
  ```

  ## New Endpoint & Improvements: On-Chain Trending Data, Enhanced Trending Search, and Improved Token Lookup

  🗓️ **April 25, 2025**

  ### \[Pro-API Exclusive] New Endpoint  - On-chain Trending Search Data

  With this new endpoint [Trending Search Pools](https://docs.coingecko.com/reference/trending-search-pools), you can now retrieve the on-chain trending search pools and tokens data, as seen on GeckoTerminal.com .

  By default, this endpoint returns the top 4 trending pools data, you may specify the `pools` parameter to retrieve up to top 10 pools data.

  Tips: you may flag `include=base_token` to retrieve the trending tokens data.

  Note:  this exclusive endpoint is available for our API [paid plan](https://www.coingecko.com/en/api/pricing) subscribers (Analyst plan & above).

  ### \[Pro-API Exclusive] Improved Endpoint - Trending Search List

  [Paid plan](https://www.coingecko.com/en/api/pricing) subscribers (Analyst plan & above) can now use [Trending Search List](https://docs.coingecko.com/reference/trending-search) endpoint and flag `show_max` parameter to retrieve more trending coins, NFTs and coin categories on CoinGecko.com.

  | Trending Data   | Public API (Demo plan) | Paid API (Analyst plan & above) |
  | :-------------- | :--------------------- | :------------------------------ |
  | Coins           | 15                     | 30                              |
  | NFTs            | 7                      | 10                              |
  | Coin Categories | 6                      | 10                              |

  ### Improved Endpoints - Support Token Lookup by Symbol and Name

  The following endpoints now support token lookup by symbol and name, in addition to the existing API ID support:

  * [Coin Price by IDs and Symbols](https://docs.coingecko.com/reference/simple-price)
  * [Coins List with Market Data](https://docs.coingecko.com/reference/coins-markets)

  Previously, these endpoints only supported token lookup by \[API IDs]\([https://docs.coingecko.com/docs/1-get-data-by-id-or-address#/methods-to-query-price--market-data-of-coins](https://docs.coingecko.com/docs/1-get-data-by-id-or-address#/methods-to-query-price--market-data-of-coins\)).  This enhancement streamlines token data retrieval and eliminates the need for manual coin ID mapping.

  Example Mapping:

  | API Ids  | Symbol | Name    |
  | :------- | :----- | :------ |
  | bitcoin  | btc    | Bitcoin |
  | tether   | usdt   | Tether  |
  | usd-coin | usdc   | USDC    |

  Lookup Priority: When multiple lookup parameters are provided, the system applies the following priority order: id (highest) > name > symbol (lowest).

  **`Filtering by Symbol withinclude_tokens`**

  The `include_tokens`parameter has been added to provide flexibility when filtering by symbol:

  * `include_tokens=top` : Returns only the top market cap token for the specified symbol.
  * `include_tokens=all`: Returns all tokens that share the specified symbol.

  Example Request & Data:

  | Request Example                                                                               | Token Data Returned                                                                                              | Remarks                                                                                                                                                                                          |
  | :-------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | pro-api.coingecko.com/api/v3/coins/markets?vs\_currency=usd\&symbols=btc\&include\_tokens=top | 1. Bitcoin                                                                                                       | When symbols and 'include\_tokens=**top**' is specified, only the top market cap tokens will be returned.                                                                                        |
  | pro-api.coingecko.com/api/v3/coins/markets?vs\_currency=usd\&symbols=btc\&include\_tokens=all | 1. Bitcoin<br />2. Osmosis allBTC<br />3. atcat<br />4. Meld Bridged BTC (Meld)<br />5. BlackrockTradingCurrency | When symbols and 'include\_tokens=**all**' is specified, all the coins that share the same symbol will be returned.<br /><br />All the 5 coins stated in the example have the same symbol 'btc'. |

  ### /coins/markets Endpoint Improvement

  We've enhanced the`/coins/markets` endpoint [Coins List with Market Data](https://docs.coingecko.com/reference/coins-markets), by including 'total' and 'per-page' values in the Response Headers.

  This addition to the Response Headers enables developers to identify the total number of active coins on coingecko.com and specify the required pagination to retrieve all available data.

  ```Text Response Header (Example) theme={null}
  per-page: 250
  total:16989
  ```

  ## Upcoming Change Notice: Removal of twitter\_followers Data

  🗓️ **April 25, 2025**

  **`Notice: Upcoming Change to CoinGecko API Endpoints - Removal oftwitter_followers Data`**

  **Effective Date: 15 May 2025**

  **Affected Endpoints:**

  * [Coin Data by ID](https://docs.coingecko.com/reference/coins-id)
  * [Coin Data by Token Address](https://docs.coingecko.com/reference/coins-contract-address)
  * [Coin Historical Data by ID](https://docs.coingecko.com/reference/coins-id-history)

  **Details of the Change:**

  Please be advised that the `twitter_followers` data point within the `community_data` object will be removed from the above-listed API endpoints, effective 15 May 2025. This change is being implemented due to significant recent changes to the X (formerly Twitter) API, which have fundamentally altered how this specific data can be accessed.

  Example of Affected Data Structure:

  ```json  theme={null}
  "community_data": {  
    "twitter_followers": 7694251,
    // ... other community data points ...
  }
  ```

  After the effective date, the `twitter_followers` field will no longer be present in the API responses for these endpoints.

  **Action Required:**

  If your applications or integrations currently rely on the `twitter_followers` data from these CoinGecko API endpoints, please make the necessary adjustments to your code before 15 May 2025 to avoid potential errors or data discrepancies.

  **`Important Note Regarding Previously Storedtwitter_followers Data:`**

  Please be aware that if you have previously stored `twitter_followers` data obtained from the CoinGecko API and archived it within your own systems, you are solely responsible for its continued use and any implications thereof.

  We appreciate your understanding as we adapt to changes in third-party platforms to maintain the stability and reliability of our API. If you have any questions or require further clarification, please do not hesitate to contact our support team.

  ## New Endpoint & Multiple Improvements: On-Chain Top Token Holder Address, Security Data, Historical Supply.

  🗓️ **March 28, 2025**

  ### \[Pro-API Exclusive] New Endpoint  - Top Token Holder Address Data

  You can now access the top 50 token holder address data for tokens, as seen on GeckoTerminal.com.

  By default, this endpoint returns the top 10 holders data, you can also specify the `holders` parameter to retrieve up to top 50 holders data.

  **Network supported:**

  * EVM: Ethereum, Polygon, BNB, Arbitrum, Optimism, Base
  * Solana
  * Sui
  * TON
  * Ronin

  👉 Visit the endpoint reference page - [Top Token Holders by Token Address](https://docs.coingecko.com/reference/top-token-holders-token-address) to learn more and try it out now!

  **Note:**  this exclusive endpoint is available for our API [paid plan](https://www.coingecko.com/en/api/pricing) subscribers (Analyst plan & above).

  * The holders data is currently in **Beta**, with ongoing improvements to data quality, coverage, and update frequency.
  * For Solana tokens, the maximum number of retrievable top holders data is 40 instead of 50.

  **Tips:** You may also use the following endpoints to retrieve **token holders count** and **top holders distribution percentage data**:

  * [Token Info by Token Address](https://docs.coingecko.com/reference/token-info-contract-address)
  * [Pool Tokens Info by Pool Address](https://docs.coingecko.com/reference/pool-token-info-contract-address)

  ### Historical Supply endpoints - Support for Inactive Coins

  You may now access historical total and circulating supply data of inactive coins using the following endpoints. To check for list of inactive coins, you may use [Coin List (ID Map)](https://docs.coingecko.com/reference/coins-list) endpoint and flag `status=inactive`.

  Note: these endpoints below are exclusive for [Enterprise plan](https://www.coingecko.com/en/api/pricing) customers only.

  **Improved endpoints:**

  * [Circulating Supply Chart by ID](https://docs.coingecko.com/reference/coins-id-circulating-supply-chart)
  * [Circulating Supply Chart within Time Range by ID](https://docs.coingecko.com/reference/coins-id-circulating-supply-chart-range)
  * [Total Supply Chart by ID](https://docs.coingecko.com/reference/coins-id-total-supply-chart)
  * [Total Supply Chart within time range by ID](https://docs.coingecko.com/reference/coins-id-total-supply-chart-range)

  ### Onchain Pool Data endpoints - Locked Liquidity

  Now support **`locked_liquidity_percentage`** data.

  **Improved endpoints:**

  * [Specific Pool Data by Pool Address](https://docs.coingecko.com/reference/pool-address)
  * [Multiple Pools Data by Pool Addresses](https://docs.coingecko.com/reference/pools-addresses)

  ```json  theme={null}
  {
    "data": [
      {
        "id": "eth_0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640",
        "type": "pool",
        "attributes": {
          "base_token_price_usd": "3653.12491645176",
          "base_token_price_native_currency": "1.0",
  ..
          "volume_usd": {
            "m5": "868581.7348314",
            "h1": "16798158.0138526",
            "h6": "164054610.850188",
            "h24": "536545444.904535"
          },
          "reserve_in_usd": "163988541.3812",
          "locked_liquidity_percentage": "99.82"
        },
  ```

  ### Onchain Token Info endpoints - GT Score, Mint Authority, Freeze Authority

  The following Token Info endpoints now provide more security related information:

  * **GeckoTerminal Score Details** - Learn more about GT Score [here](https://support.coingecko.com/hc/en-us/articles/38381394237593-What-is-GT-Score-How-is-GT-Score-calculated).
    * **Pool** - Combination of pool signals such as honeypot risk, buy/sell tax, proxy contract, liquidity amount, and whether the liquidity is locked.
    * **Transaction** - Total number of transactions and trading volume in the last 24 hours.
    * **Creation** - Age of the pool since creation. The longer, the better it is for the score.
    * **Info** - Submitted social info and metadata to the token.
    * **Holders** - Distribution of tokens among unique addresses.
  * **Mint Authority**
  * **Freeze Authority**

  **Improved endpoints:**

  * [Token Info by Token Address](https://docs.coingecko.com/reference/token-info-contract-address)
  * [Pool Tokens Info by Pool Address](https://docs.coingecko.com/reference/pool-token-info-contract-address)

  ```json  theme={null}
          "gt_score": 92.6605504587156,    
          "gt_score_details": {
            "pool": 0,
            "transaction": 32.2,
            "creation": 0,
            "info": 0,
            "holders": 0
          }
          "mint_authority": "no",   
          "freeze_authority": "no" 
  ```

  ### Onchain Simple Token Price endpoint - Market Cap to FDV Fallback

  The [Onchain Simple Token Price](https://docs.coingecko.com/reference/onchain-simple-price) endpoint now supports fallback option for Market Cap to return FDV value, when the Market Cap value is not available.

  Notes:

  * If the token's market cap is not verified by the CoinGecko team, the onchain endpoints will return **null** for its market cap value, even though it has a displayed value on GeckoTerminal, which might not be accurate as it often matches the Fully Diluted Valuation (FDV).
  * Market Cap can be verified by and sourced from CoinGecko, and the number may be higher than FDV as it may include Market Cap of tokens issued on other blockchain network.

  If you require the Market Cap key (`market_cap_usd`) to return FDV value (as seen on GeckoTerminal.com) when Market Cap data is unavailable, please specify this parameter `marketcap_fdv_fallback=true`.

  ## Update Frequency Improvements for selected Pro-API endpoints (March 2025)

  🗓️ **March 14, 2025**

  \[Changes below are applicable to Analyst/Lite/Pro/Enterprise [plan subscribers](https://www.coingecko.com/en/api/pricing) only.]

  Dear CoinGecko API paid plan subscribers,

  We're excited to announce an improvement to our API, aimed at providing you with even faster access to real-time data! Starting **02:00 UTC, March 25, 2025**, the edge cache duration for the following endpoints will be reduced from 60s to 30s, allowing you to retrieve updated data more frequently.

  1. Effective from 02:00 UTC, March 25, 2025:
     1. [Trending Pools List](https://docs.coingecko.com/reference/trending-pools-list)
     2. [Trending Pools by Network](https://docs.coingecko.com/reference/trending-pools-network)
     3. [Top Pools by Network](https://docs.coingecko.com/reference/top-pools-network)
     4. [Top Pools by Dex](https://docs.coingecko.com/reference/top-pools-dex)
  2. Effective from 02:00 UTC, March 26, 2025:
     1. [New Pools by Network](https://docs.coingecko.com/reference/latest-pools-network)
     2. [New Pools List](https://docs.coingecko.com/reference/latest-pools-list)
     3. [ Megafilter for Pools](https://docs.coingecko.com/reference/pools-megafilter)
     4. [Search Pools](https://docs.coingecko.com/reference/search-pools)
  3. Effective from 02:00 UTC, March 27, 2025:
     1. [Top Pools by Token Address](https://docs.coingecko.com/reference/top-pools-contract-address)
     2. [Most Recently Updated Tokens List](https://docs.coingecko.com/reference/tokens-info-recent-updated)
     3. [Pools by Category ID](https://docs.coingecko.com/reference/pools-category)

  **What This Means for You:**

  * **Fresher Data, Quicker**: With a reduced cache time, you'll now have the option to access more up-to-date data, closer to real-time!
  * **No Extra Credits for Cached Data**: If your request hits the cache (now updated every 30 seconds for endpoints above), there will be no additional credits charged—just like before.

  **Things to Keep in Mind:**

  * If your request hits our origin server instead of the cache to retrieve the latest data, there may be additional credits used.
  * To balance cost and real-time data needs, we recommend reviewing your request frequency. For those who prefer to obtain data without extra credits, consider keeping your request interval at 60 seconds or more to align with the new cache duration.

  We're committed to continuously improving your experience and ensuring you get the data you need, as efficiently as possible. If you have any questions or need assistance, feel free to reach out to [soonaik@coingecko.com](mailto:soonaik@coingecko.com) .

  **CoinGecko API Team**

  ## Multiple Improvement: Holders data, Pool Stats, Simple Token Price

  🗓️ **March 14, 2025**

  ### Onchain Token Info endpoints - Holders data

  Now support the following holder data **(Beta)**:

  * holders count
  * top holders distribution percentage

  **Improved endpoints:**

  * [Token Info by Token Address](https://docs.coingecko.com/reference/token-info-contract-address)
  * [Pool Tokens Info by Pool Address](https://docs.coingecko.com/reference/pool-token-info-contract-address)

  ```json  theme={null}
      "holders": {
        "count": 1432761,
        "distribution_percentage": {
          "top_10": "1.3019",
          "11_20": "0.1024",
          "21_40": "0.095",
          "rest": "98.5007"
        },
        "last_updated": "2025-03-06T01:21:18Z"
  ```

  ### Onchain Pool Data endpoints - More Data Support

  Now support the following data:

  * `price_change_percentage`: m15, m30
  * `volume_usd`: m15, m30
  * `transactions`: h6

  **Improved endpoints:**

  * [Specific Pool Data by Pool Address](https://docs.coingecko.com/reference/pool-address)
  * [Multiple Pools Data by Pool Addresses](https://docs.coingecko.com/reference/pools-addresses)

  ```json  theme={null}
          "price_change_percentage": {
            "m5": "0.06",
            "m15": "0.06",
            "m30": "0.89",
            "h1": "-4.31",
            "h6": "-1.02",
            "h24": "3.32"
          },
          "transactions": {
            "m5": {
              "buys": 0,
              "sells": 2,
              "buyers": 0,
              "sellers": 2
            },
            "m15": {
              "buys": 0,
              "sells": 2,
              "buyers": 0,
              "sellers": 2
            },
            "m30": {
              "buys": 0,
              "sells": 3,
              "buyers": 0,
              "sellers": 3
            },
            "h1": {
              "buys": 1,
              "sells": 23,
              "buyers": 1,
              "sellers": 7
            },
            "h6": {
              "buys": 60,
              "sells": 38,
              "buyers": 23,
              "sellers": 18
            },
            "h24": {
              "buys": 206,
              "sells": 138,
              "buyers": 96,
              "sellers": 77
            }
          },
          "volume_usd": {
            "m5": "130.5119858698",
            "m15": "130.5119858698",
            "m30": "177.109036156",
            "h1": "4942.2463835639",
            "h6": "28362.2127269542",
            "h24": "112426.585893123"
          }
  ```

  ### Onchain Simple Token Price endpoint - Liquidity & Price Change Percentage data

  Now supports the following optional parameter to return more data.

  * `include_24hr_price_change` (24hr price change percentage)
  * `include_total_reverse_in_usd` (token liquidity data - total liquidity portion attributable to a specific token across all available pools)

  **Improved Endpoint:**

  * [Token Price by Token Addresses](https://docs.coingecko.com/reference/onchain-simple-price)

  ```json  theme={null}
  {
    "data": {
      "id": "e58258f7-8368-4968-bbe1-b5343540cd71",
      "type": "simple_token_price",
      "attributes": {
        "token_prices": {
          "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48": "1.00276143983565",
          "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2": "3175.22870146126"
        },
        "market_cap_usd": {
          "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48": "25000000000",
          "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2": "500000000000"
        },
        "h24_volume_usd": {
          "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48": "50000000",
          "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2": "10000000000"
        },
        "h24_price_change_percentage": {
          "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48": "-0.15",
          "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2": "1.15"
        },
        "total_reserve_in_usd": {
          "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48": "417994486.4342195821530162288",
          "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2": "417994486.4342195821530162288" 
      }
    }
  }
  ```

  ## New Megafilter Endpoint,  200+ Chains Supported: Hyperliquid, Abstract, Berachain & MOAR!

  🗓️ **February 27, 2025**

  Powered by GeckoTerminal, the CoinGecko API now supports on-chain data across **200+ blockchain networks**, including the latest additions: Hyperliquid, HyperEVM, Abstract, Berachain, Story, Monad, Unichain, and Soneium.

  While we offer the widest on-chain data coverage, we understand that you may have specific needs when slicing and dicing data for your use case. That's why we're introducing Megafilter, an exclusive endpoint available for our API paid plan subscribers (Analyst plan & above).

  ### 🔥 What's Megafilter?

  This new endpoint provides unmatched flexibility, allowing you to query and filter data exactly the way you want.

  🔗 Docs: [Megafilter for Pools](https://docs.coingecko.com/reference/pools-megafilter)

  ### 👀 What Can You Do?

  With the /megafilter endpoint, you can slice and dice on-chain data your way across:

  * 200+ blockchain networks, 1,400+ dexes, 6M+ pools, and 5M+ tokens
  * Advanced filtering options based on liquidity, FDV, volume, transactions, buy/sell trends, and time range
  * Custom sorting, including trending pools (5m), newest pools, or liquidity growth
  * Fraud detection filters: Exclude honeypots, check GT Score, verify CG listings, and track social metrics

  Here's some quick examples:

  * Track fresh pools on Uniswap V4 & Aerodrome with liquidity above \$1,000
  * Discover trending DEX pools across Solana, Base, and other chains with a high GT Score.
  * Filter out risky pools with built-in honeypot protection & fraud checks
  * Customize data retrieval based on your strategy: time-based, volume-based, or trend-driven

  ### Try it out now!

  🚀 API Docs: [Megafilter for Pools](https://docs.coingecko.com/reference/pools-megafilter)\
  🔗 Live Filtering on [GeckoTerminal](https://www.geckoterminal.com/)

  ## Update Frequency Improvements for selected Pro-API endpoints

  🗓️ **February 14, 2025**

  \[Changes below are applicable to Analyst/Lite/Pro/Enterprise [plan subscribers](https://www.coingecko.com/en/api/pricing) only.]

  Dear CoinGecko API paid plan subscribers,

  We're excited to announce an improvement to our API, aimed at providing you with even faster access to real-time data! Starting **02:00 UTC, February 24, 2025**, the edge cache duration for the following endpoints will be reduced to 30s, allowing you to retrieve updated data more frequently.

  | Endpoints                                                                                                 | Effective Date & Time                                            | Current Update Frequency | New Update Frequency |
  | :-------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------- | :----------------------- | :------------------- |
  | Onchain [/networks/../tokens/](https://docs.coingecko.com/reference/token-data-contract-address)          | 02:00 UTC, February 24, 2025                                     | 60s                      | 30s                  |
  | Onchain [/networks/../tokens/multi/](https://docs.coingecko.com/reference/tokens-data-contract-addresses) | 06:00 UTC, February 24, 2025                                     | 60s                      | 30s                  |
  | Onchain [/networks/../pools/../ohlcv](https://docs.coingecko.com/reference/pool-ohlcv-contract-address)   | 02:00 UTC, February 25, 2025 - Enterprise plan subscribers only  | 60s                      | 30s                  |
  | Onchain [/networks/../pools/../ohlcv](https://docs.coingecko.com/reference/pool-ohlcv-contract-address)   | 02:00 UTC, February 26, 2025 - Analyst/Lite/Pro plan subscribers | 60s                      | 30s                  |

  **What This Means for You:**

  * **Fresher Data, Quicker**: With a reduced cache time, you'll now have the option to access more up-to-date data, closer to real-time!
  * **No Extra Credits for Cached Data**: If your request hits the cache (now updated every 30 seconds for endpoints above), there will be no additional credits charged—just like before.

  **Things to Keep in Mind:**

  * If your request hits our origin server instead of the cache to retrieve the latest data, there may be additional credits used.
  * To balance cost and real-time data needs, we recommend reviewing your request frequency. For those who prefer to obtain data without extra credits, consider keeping your request interval at 60 seconds or more to align with the new cache duration.

  We're committed to continuously improving your experience and ensuring you get the data you need, as efficiently as possible. If you have any questions or need assistance, feel free to reach out to [soonaik@coingecko.com](mailto:soonaik@coingecko.com) .

  **CoinGecko API Team**

  ## Enhanced Onchain Metadata, Increased Max Address Limit for Multi Endpoints, Improved Exchange Tickers Sorting

  🗓️ **February 09, 2025**

  ### Onchain Metadata: Improved Coverage

  **Previously:** Payload may return 'missing.png' for `image_url` for tokens that do not have image data.

  **Now:** Coverage of metadata (images, websites, description, socials) is now improved for tokens on Solana, Ton, Base, and Sui networks. For tokens that do not contain image data, 'null' value will be returned for `image_url`.

  **Improved endpoints with image data:**

  1. [Trending Pools List](https://docs.coingecko.com/reference/trending-pools-list)
  2. [Trending Pools by Network](https://docs.coingecko.com/reference/trending-pools-network)
  3. [Specific Pool Data by Pool Address](https://docs.coingecko.com/reference/pool-address)
  4. [Multiple Pools Data by Pool Addresses](https://docs.coingecko.com/reference/pools-addresses)
  5. [Top Pools by Network](https://docs.coingecko.com/reference/top-pools-network)
  6. [Top Pools by Dex](https://docs.coingecko.com/reference/top-pools-dex)
  7. [New Pools by Network](https://docs.coingecko.com/reference/latest-pools-network)
  8. [New Pools List](https://docs.coingecko.com/reference/latest-pools-list)
  9. [Search Pools](https://docs.coingecko.com/reference/search-pools)
  10. [Top Pools by Token Address](https://docs.coingecko.com/reference/top-pools-contract-address)
  11. [Token Data by Token Address](https://docs.coingecko.com/reference/token-data-contract-address)
  12. [Tokens Data by Token Addresses](https://docs.coingecko.com/reference/tokens-data-contract-addresses)
  13. [Token Info by Token Address](https://docs.coingecko.com/reference/token-info-contract-address)
  14. [Pool Tokens Info by Pool Address](https://docs.coingecko.com/reference/pool-token-info-contract-address)
  15. [Most Recently Updated Tokens List](https://docs.coingecko.com/reference/tokens-info-recent-updated)

  **Improved endpoints with metadata (images, websites, description, socials):**

  1. [Token Info by Token Address](https://docs.coingecko.com/reference/token-info-contract-address)
  2. [Pool Tokens Info by Pool Address](https://docs.coingecko.com/reference/pool-token-info-contract-address)
  3. [Most Recently Updated Tokens List](https://docs.coingecko.com/reference/tokens-info-recent-updated)

  Note: Metadata may be sourced on-chain and is not vetted by the CoinGecko team. If you wish to get metadata reviewed by CoinGecko team, you may use the following endpoints:

  * [Coin Data by ID](https://docs.coingecko.com/reference/coins-id)
  * [Coin Data by Token Address](https://docs.coingecko.com/reference/coins-contract-address)

  ### Improved Max Address Limit for onchain /multi endpoints

  **Previously:** Onchain /multi endpoints support up to 30 token or pool contract addresses per request.

  **Now:** Onchain /multi endpoints support up to 50 token or pool contract addresses per request.

  **Improved endpoints:**

  1. [Tokens Data by Token Addresses](https://docs.coingecko.com/reference/tokens-data-contract-addresses)
  2. [Multiple Pools Data by Pool Addresses ](https://docs.coingecko.com/reference/pools-addresses)

  Note: this new max address input limit is exclusive for paid plan subscribers (Analyst plan & above) only.

  ### Improved Data Consistency for Exchange Tickers by ID

  For [Exchange Tickers by ID](https://docs.coingecko.com/reference/exchanges-id-tickers) endpoint, the order is sorted by **trust\_score\_desc** by default.

  * Sometimes duplicate or missing data may occur due to paginated cached response, especially when a ticker's rank changes between 2 paginated requests, e.g. it might shift from Page 2 to Page 1, vice versa.
  * We've added a new `order` option: **base\_target**, which will sort the tickers by **base** symbol, then **target** symbol, in lexicographical order, i.e. `0->9`, then `a->Z`.

  Example:  flagging ?order=base\_target

  ```
  pro-api.coingecko.com/api/v3/exchanges/binance/tickers?order=base_target
  ```

  This sorting method ensures stable pagination, reducing issues where cached responses may cause duplicate or missing tickers across pages.

  ## Multiple Improvements: Onchain Pools Page Limit, Trades Token Filter

  🗓️ **January 27, 2025**

  ### Onchain Pools Data: Supports more than 10 pages of data

  **Previously:** There was a limitation of a maximum of 10 pages for accessing pools data in the related endpoints.

  **Now:** All paid plan subscribers (Analyst & above) can access more than 10 pages of pools data for the endpoints below.

  **Improved Endpoints:**

  1. [Search Pools](https://docs.coingecko.com/reference/search-pools)
  2. [Top Pools by Token Address](https://docs.coingecko.com/reference/top-pools-contract-address)
  3. [Trending Pools List](https://docs.coingecko.com/reference/trending-pools-list)
  4. [Trending Pools by Network](https://docs.coingecko.com/reference/trending-pools-network)
  5. [New Pools by Network](https://docs.coingecko.com/reference/latest-pools-network)
  6. [New Pools List](https://docs.coingecko.com/reference/latest-pools-list)
  7. [Top Pools by Network](https://docs.coingecko.com/reference/top-pools-network)
  8. [Top Pools by Dex](https://docs.coingecko.com/reference/top-pools-dex)

  ### Onchain Trades: Added Token Filter

  **Endpoint:** [Past 24 Hour Trades by Pool Address](https://docs.coingecko.com/reference/pool-trades-contract-address)

  **Previously:** There was no way to filter trades data by base or quote token.

  **Now**: A new optional parameter has been added to allow filtering by base or quote token of a pool.

  * Parameter: `token`
  * Value options:
    * `base`
    * `quote`
    * `\{token_address\}`

  **Example**:

  ```json Example theme={null}
  ?token=base // get the trades data of base token
  ?token=quote // get the trades data of quote token
  ?token=8FqXr6dw5NHA2TtwFeDz6q9p7y9uWyoEdZmpXqqUpump // get the trades data of specific token based on address
  ```

  ## Multiple Improvements: Onchain Token Price, NFT Market Cap

  🗓️ **January 24, 2025**

  ### Onchain Simple Token Price: Added Market Cap and 24h Volume Data

  **Endpoint:** [Token Price by Token Addresses](https://docs.coingecko.com/reference/onchain-simple-price)

  * You can now flag `include_market_cap=true` and `include_24hr_vol=true` to retrieve market cap and 24h trading volume data. e.g.

  ```json json theme={null}
  {
    "data": {
      "id": "e1979db1-5c3e-4ba8-b103-cb0258af4a7c",
      "type": "simple_token_price",
      "attributes": {
        "token_prices": {
          "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48": "0.999365729816931",
          "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2": "3399.24368371279"
        },
        "market_cap_usd": {
          "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48": "51963214441.24363",
          "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2": "10005535878.50094"
        },
        "h24_volume_usd": {
          "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48": "2095689865.85327",
          "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2": "2544539948.02599"
        }
      }
    }
  }
  ```

  ### NFT Data: Added 'Market Cap Rank'

  You can now obtain the `market_cap_rank` data of NFT collections via the following endpoints:

  * [NFTs Collection Data by ID](https://docs.coingecko.com/reference/nfts-id)
  * [NFTs Collection Data by Contract Address](https://docs.coingecko.com/reference/nfts-contract-address)

  ```json example theme={null}

    "market_cap_rank": 75,

  ```

  ## Removal of Unsupported Categories

  🗓️ **January 23, 2025**

  ### Upcoming Removal of Unsupported Categories from CoinGecko and CoinGecko API

  #### Summary

  We are announcing the removal of certain categories from CoinGecko and CoinGecko API. These categories will no longer be supported across all API endpoints starting **February 12, 2025**.

  | No | Category Name          | Category ID         |
  | :- | :--------------------- | :------------------ |
  | 1  | US Election 2020       | us-election-2020    |
  | 2  | Governance             | governance          |
  | 3  | Cryptocurrency         | cryptocurrency      |
  | 4  | Technology and Science | technology-science  |
  | 5  | Presale Meme           | presale-meme-coins  |
  | 6  | Business Platform      | business-platform   |
  | 7  | Number                 | number              |
  | 8  | Structured Product     | structured-products |
  | 9  | Investment             | investment          |
  | 10 | Niftex Shards          | niftex-shards       |
  | 11 | Ethereum POW IOU       | ethereum-pow-iou    |
  | 12 | Mirrored Assets        | mirrored-assets     |
  | 13 | Remittance             | remittance          |
  | 14 | Protocol               | protocol            |
  | 15 | Unicly Ecosystem       | utokens             |
  | 16 | Finance and Banking    | finance-banking     |
  | 17 | Eth 2.0 Staking        | eth-2-0-staking     |

  #### Reason for Removal

  Many of these categories no longer have associated coins. Some categories are outdated and no longer relevant in the crypto space. The changes align with updated category topology standards to maintain data accuracy and relevance.

  #### Impact

  API responses for the `/coins/markets` [endpoint](https://docs.coingecko.com/reference/coins-markets) will no longer support data of the categories above. Any requests specifying these categories will return an error.

  #### Action Required

  Ensure applications using the `/coins/markets` [endpoint](https://docs.coingecko.com/reference/coins-markets) are not querying these removed categories. Please update any code or documentation referencing these categories to prevent errors.

  ## Extended Historical Data for Onchain OHLCV Endpoint

  🗓️ **January 15, 2025**

  ### What's New?

  We've improved the [Pool OHLCV Chart by Pool Address](https://docs.coingecko.com/reference/pool-ohlcv-contract-address) endpoint to provide access to a much broader range of historical data.

  #### Key Updates

  * **Previous Behavior:** Users could only query data for the past 6 months from today.
  * **New Behavior**: Users can now access data from September 2021 to the present, depending on the pool's tracking start date on GeckoTerminal.
  * Each API request is **limited to a 6-month date range**, but users can query older data by using the before\_timestamp parameter.

  Note: access to data beyond the past 6 months is only available to [Paid Plan](https://www.coingecko.com/en/api/pricing) subscribers (Analyst plan & above).

  #### Action Required

  No changes are required for existing integrations. However, users who need data beyond the past 6 months should adjust their queries to use the `before_timestamp` parameter to fetch additional data.

  ## Update to Total Supply of POW Coins

  🗓️ **January 15, 2025**

  #### What's Changing?

  We are updating the definition of Total Supply for PoW (Proof-of-Work) coins to reflect the actual number of mined coins rather than the maximum supply. This change ensures consistency and accuracy in representing the supply data.

  #### Key Updates

  * **Previous Behavior:**
    * Total Supply: Displayed as the maximum possible supply (e.g., Bitcoin: 21,000,000).
  * **New Behavior:**
    * Total Supply: Now reflects the actual number of mined coins.\
      For example: Bitcoin: \~19,500,000 (as of January 2025).

  This update will also affect historical Total Supply data for consistency. This change applies to all affected PoW coins, including Bitcoin, Bitcoin Cash, Litecoin, Ethereum Classic, and more.

  #### Affected endpoints that contain "total\_supply" data:

  * **Current Data**
    * [Coin Data by ID](https://docs.coingecko.com/reference/coins-id)
    * [Coins List with Market Data](https://docs.coingecko.com/reference/coins-markets)
  * **Historical Darta**
    * [Total Supply Chart by ID](https://docs.coingecko.com/reference/coins-id-total-supply-chart)
    * [Total Supply chart within time range by ID](https://docs.coingecko.com/reference/coins-id-total-supply-chart-range)

  #### Timeline:

  **Bitcoin:** Updated on Jan 14, 2025

  **Other PoW Coins**: Scheduled for Jan 22, 2025

  * [Bitcoin Cash](https://www.coingecko.com/en/coins/bitcoin-cash)
  * [Litecoin](https://www.coingecko.com/en/coins/litecoin)
  * [Ethereum Classic](https://www.coingecko.com/en/coins/ethereum-classic)
  * [Bitcoin SV](https://www.coingecko.com/en/coins/bitcoin-sv)
  * [Zcash](https://www.coingecko.com/en/coins/zcash)
  * [eCash](https://www.coingecko.com/en/coins/ecash)
  * [Dash](https://www.coingecko.com/en/coins/dash)
  * [Verus Coin](https://www.coingecko.com/en/coins/verus-coin)
  * [Ravencoin](https://www.coingecko.com/en/coins/ravencoin)
  * [Kadena](https://www.coingecko.com/en/coins/kadena)
  * [Decred](https://www.coingecko.com/en/coins/decred)
  * [Flux (Zelcash)](https://www.coingecko.com/en/coins/flux-zelcash)
  * [DigiByte](https://www.coingecko.com/en/coins/digibyte)
  * [Quantum Resistant Ledger](https://www.coingecko.com/en/coins/quantum-resistant-ledger)
  * [Komodo](https://www.coingecko.com/en/coins/komodo)
  * [Groestlcoin](https://www.coingecko.com/en/coins/groestlcoin)
  * [Firo](https://www.coingecko.com/en/coins/firo)
  * [Litecoin Cash](https://www.coingecko.com/en/coins/litecoin-cash)
  * [LuckyCoin](https://www.coingecko.com/en/coins/luckycoin)
  * [Enecuum](https://www.coingecko.com/en/coins/enecuum)
  * [Wownero](https://www.coingecko.com/en/coins/wownero)
  * [Radiant](https://www.coingecko.com/en/coins/radiant)
  * [Tidecoin](https://www.coingecko.com/en/coins/tidecoin)
  * [Handshake](https://www.coingecko.com/en/coins/handshake)
  * [Neoxa](https://www.coingecko.com/en/coins/neoxa)
  * [Vertcoin](https://www.coingecko.com/en/coins/vertcoin)
  * [Feathercoin](https://www.coingecko.com/en/coins/feathercoin)
  * [Bitcore](https://www.coingecko.com/en/coins/bitcore)
  * [Phoenixcoin](https://www.coingecko.com/en/coins/phoenixcoin)
  * [BitcoinZ](https://www.coingecko.com/en/coins/bitcoinz)
  * [Hush](https://www.coingecko.com/en/coins/hush)
  * [DigitalNote](https://www.coingecko.com/en/coins/digitalnote)
  * [EquityPay](https://www.coingecko.com/en/coins/equitypay)
  * [Evadore](https://www.coingecko.com/en/coins/evadore)
  * [Swap](https://www.coingecko.com/en/coins/swap)
  * [DeVault](https://www.coingecko.com/en/coins/devault)
  * [AXE](https://www.coingecko.com/en/coins/axe)
  * [Iridium](https://www.coingecko.com/en/coins/iridium)
  * [X-Cash](https://www.coingecko.com/en/coins/x-cash)
  * [Bolivarcoin](https://www.coingecko.com/en/coins/bolivarcoin)
  * [uPlexa](https://www.coingecko.com/en/coins/uplexa)
  * [WorldCoin (WDC)](https://www.coingecko.com/en/coins/worldcoin-wdc)

  ## Improved Update Frequency for selected Pro-API endpoints

  🗓️ **January 13, 2025**

  \[Changes below are applicable to Analyst/Lite/Pro/Enterprise [plan subscribers](https://www.coingecko.com/en/api/pricing) only.]

  The edge cache duration for the following endpoints are now reduced to 20-30s, allowing you to retrieve updated data more frequently.

  | Endpoints                                                                                                 | Previous Update Frequency | Current Update Frequency |
  | :-------------------------------------------------------------------------------------------------------- | :------------------------ | :----------------------- |
  | CoinGecko [/simple/price](https://docs.coingecko.com/reference/simple-price)                              | 30s                       | 20s                      |
  | CoinGecko [/simple/token\_price](https://docs.coingecko.com/reference/simple-token-price)                 | 30s                       | 20s                      |
  | Onchain [/simple/networks/../token\_price](https://docs.coingecko.com/reference/onchain-simple-price)     | 60s                       | 30s                      |
  | Onchain [/networks/../pools/../trades](https://docs.coingecko.com/reference/pool-trades-contract-address) | 60s                       | 30s                      |
  | Onchain [/networks/../pools/..](https://docs.coingecko.com/reference/pool-address)                        | 60s                       | 30s                      |
  | Onchain [/networks/../pools/multi/..](https://docs.coingecko.com/reference/pools-addresses)               | 60s                       | 30s                      |

  **What This Means for You:**

  * **Fresher Data, Quicker**: With a reduced cache time, you'll now have the option to access more up-to-date data, closer to real-time!
  * **No Extra Credits for Cached Data**: If your request hits the cache (now updated every 20-30 seconds for endpoints above), there will be no additional credits charged—just like before.

  **Things to Keep in Mind:**

  * If your request hits our origin server instead of the cache to retrieve the latest data, there may be additional credits used.
  * To balance cost and real-time data needs, we recommend reviewing your request frequency. For those who prefer fresher data without extra credits, consider keeping your request interval at 30 seconds or more to align with the new cache duration.

  We're committed to continuously improving your experience and ensuring you get the data you need, as efficiently as possible. If you have any questions or need assistance, feel free to reach out to [soonaik@coingecko.com](mailto:soonaik@coingecko.com) .

  **CoinGecko API Team**

  ## Improved 5-minutely data for Historical Chart Data endpoints

  🗓️ **January 09, 2025**

  For the following 4 historical chart endpoints, the data of the *last 48 hours from now* is no longer excluded.

  * [Coin Historical Chart Data by ID](https://docs.coingecko.com/reference/coins-id-market-chart)
  * [Coin Historical Chart Data within Time Range by ID](https://docs.coingecko.com/reference/coins-id-market-chart-range)
  * [Coin Historical Chart Data by Token Address](https://docs.coingecko.com/reference/contract-address-market-chart)
  * [Coin Historical Chart Data within Time Range by Token Address](https://docs.coingecko.com/reference/contract-address-market-chart-range)

  **Note:** The **5-minutely** and **hourly** interval params are exclusively available to Enterprise plan subscribers, bypassing auto-granularity:

  * `interval=5m`: 5-minutely historical data, supports up to any 10 days date range per request.
  * `interval=hourly`: hourly historical data, supports up to any 100 days date range per request.
  * **Data availability:**
    * `interval=5m`: Available from 9 February 2018 onwards
    * `interval=hourly`: Available from 30 Jan 2018 onwards

  For non-Enterprise plan subscribers who would like to get hourly data, please leave the `interval` params empty for auto granularity:

  * 1 day from current time = 5-minutely data
  * 1 day from any time (except current time) = hourly data
  * 2 - 90 days from any time = hourly data
  * above 90 days from any time = daily data (00:00 UTC)

  ## Added: Onchain Categories Data, CG data improvements

  🗓️ **December 24, 2024**

  ### NEW: Onchain Categories : Get Categories on GeckoTerminal.com

  This new [Categories List](https://docs.coingecko.com/reference/categories-list) endpoint allows you to query all the categories supported on GeckoTerminal.com such as 'Pump Fun' and 'Animal'.

  * This endpoint is exclusively available for [Analyst/Lite/Pro/Enterprise plan](https://www.coingecko.com/en/api/pricing) subscribers only.

  ### NEW: Onchain Catergory Pools: Get Pools of a specific Category

  This new [Pools by Category ID](https://docs.coingecko.com/reference/pools-category) endpoint allows you to query all the pools of a specific category on GeckoTerminal.com.

  * This endpoint is exclusively available for [Analyst/Lite/Pro/Enterprise plan](https://www.coingecko.com/en/api/pricing) subscribers only.
  * You can also obtain tokens of a specific category, by flagging `include=base_token`

  ### Onchain Token Info: Added Categories Data

  You can now obtain the categories of a token via the following endpoints:

  1. [Token Info by Token Address](https://docs.coingecko.com/reference/token-info-contract-address)
  2. [Pool Tokens Info by Pool Address](https://docs.coingecko.com/reference/pool-token-info-contract-address)

  Payload example:

  ```yaml json theme={null}
    "categories": [
      "Doge",
      "Baby",
      "Animal"
    ],
    "gt_category_ids": [
      "doge",
      "baby",
      "animal"
  ```

  ### Onchain New Pools Data: Bug Fixed

  Previously, this [/networks/new\_pools](https://docs.coingecko.com/reference/latest-pools-network) endpoint omitted new pools that are created within the last 24 hours.

  It now returns all newly created pools in the last 48 hours.

  ### CoinGecko Exchange Data: Added support of inactive exchange id

  You now query the the list of id of delisted exchanges with [Exchanges List (ID Map)](https://docs.coingecko.com/reference/exchanges-list) endpoint, by flagging `status=inactive `

  Payload example:

  ```yaml json theme={null}
    {
      "id": "ftx",
      "name": "FTX (Derivatives)"
    },
    {
      "id": "ftx_spot",
      "name": "FTX"
    },
    {
      "id": "ftx_tr",
      "name": "FTX TR"
    },
    {
      "id": "ftx_us",
      "name": "FTX.US"
    },
  ```

  **Tips**: you may query to get historical volume delisted exchanges for via the following endpoints:

  * [Exchange Volume Chart by ID](https://docs.coingecko.com/reference/exchanges-id-volume-chart)
  * [Exchange Volume Chart within Time Range by ID](https://docs.coingecko.com/reference/exchanges-id-volume-chart-range)

  ### CoinGecko Historical Chart Data: Faster Last UTC Day (00:00) Data Update

  For [Coin Historical Chart Data by ID](https://docs.coingecko.com/reference/coins-id-market-chart) endpoint, the last completed UTC day (00:00) data is now available **10 minutes after midnight** on the next UTC day (00:10).

  Previously, the last completed UTC day (00:00) was only made available **35 minutes** after midnight.

  ## \[Updated: Q4 2024] CoinGecko Asset Issuance Standardisation Initiative Updates

  🗓️ **December 17, 2024**

  As part of our commitment to improving data quality and enhancing the consistency of asset information, we are rolling out an asset standardization initiative at CoinGecko.

  **What is asset standardization?**\
  Standardization involves refining how we classify and display assets. By systematically organizing asset listings into more precise categories - such as native, bridged, or wrapped tokens each following specific naming conventions, we aim to eliminate confusion and enhance data reliability.

  **What changes should I expect?**\
  The most notable change is that non-native token contracts previously grouped under native asset listings will now be assigned their own distinct pages.

  For example, a bridged version of USDT that might have been aggregated under the original, native USDT page, will now be featured on a dedicated page specifically for that bridged variant.

  Additionally, there may be varying levels of changes in various aggregated data points of the standardized assets, including trading volume, supply, market cap rankings, etc., due to misplaced contracts being transitioned away from the original page to accurately reflect their true metrics.

  **Focus for Q3 2024** **\[Completed ✅]**

  * [Wrapped Bitcoin (WBTC)](https://www.coingecko.com/en/coins/wrapped-bitcoin)
  * [Wrapped Ethereum (WETH)](https://www.coingecko.com/en/coins/weth)
  * [Dai (DAI)](https://www.coingecko.com/en/coins/dai)

  \*\*For full list of FAQs and updated infomation, please refer [here](https://support.coingecko.com/hc/en-us/articles/35555248857497-CoinGecko-Asset-Issuance-Standardisation-Initiative-Updates-and-FAQ)

  ### What's New in Q4 2024? 👈

  Building on Q3's achievements, we're expanding the scope of Standardization to include four additional Coins this quarter, selected based on their significance and impact on the DeFi ecosystem.

  * [Frax (FRAX)](https://www.coingecko.com/en/coins/frax)
  * [Wrapped AVAX (WAVAX)](https://www.coingecko.com/en/coins/wrapped-avax)
  * [Wrapped BNB (WBNB)](https://www.coingecko.com/en/coins/wbnb)
  * [Wrapped stETH (wstETH)](https://www.coingecko.com/en/coins/wrapped-steth)

  ### Tips and FAQs for API users

  #### **1. How does this affect my current API setup?**

  The following CoinGecko API endpoints will be impacted, with full details tracked in [this spreadsheet](https://docs.google.com/spreadsheets/d/15FyY1gvUi20LdnlJRly-pXvm5ATNbFbSy06VoI1vVs4/edit?usp=sharing). We encourage you to make the necessary adjustments and enable edit notifications on the Google Sheets, to receive real-time updates when non-native token contracts have been successfully standardized.

  **Simple**

  * /simple/price
  * /simple/token\_price/id

  **Coins**

  * /coins/markets
  * /coins/id
  * /coins/id/tickers
  * /coins/id/history
  * /coins/id/market\_chart
  * /coins/id/market\_chart/range
  * /coins/id/ohlc
  * /coins/id/ohlc/range
  * /coins/id/circulating\_supply\_chart
  * /coins/id/circulating\_supply\_chart/range
  * /coins/id/total\_supply\_chart
  * /coins/id/total\_supply\_chart/range

  **Contract**

  * /coins/id/contract/contract\_address
  * /coins/id/contract/contract\_address/market\_chart
  * /coins/id/contract/contract\_address/market\_chart/range

  **Exchange**

  * /exchanges/id/tickers
  * /exchanges/id/volume\_chart
  * /exchanges/id/volume\_chart/range

  #### **2. Do I have to make changes to my API?**

  **No changes are necessary** if you do not need data for non-native token contracts that will be separated away from the native tokens.

  #### **3. What will happen to the coins that are separated into a new coin page?**

  Historical data for new non-native or bridged assets will only be available from the date of asset page creation (i.e. stnadardized). To access historical data prior to the asset standardization, we recommend retrieving data from the original native assets.

  #### **4. How do I identify the list of coins that will be separated?**

  For a finalised list of token contracts and API IDs that have been separated from its native asset page and listed individually, please refer to this [Google Sheets](https://docs.google.com/spreadsheets/d/15FyY1gvUi20LdnlJRly-pXvm5ATNbFbSy06VoI1vVs4/edit?usp=sharing)

  You may also identify the list of bridged coins via API: you may also use [/categories/list endpoint](https://docs.coingecko.com/reference/coins-categories-list) to look for bridged categories such as:

  1. bridged-usdc
  2. bridged-wbtc
  3. bridged-weth

  Then you may use [/coins/market endpoint](https://docs.coingecko.com/reference/coins-markets) to retrieve the list of coins

  ## Enhancing Your Access to Even Fresher Data!

  🗓️ **December 16, 2024**

  \[Changes below are applicable to Analyst/Lite/Pro/Enterprise [plan subscribers](https://www.coingecko.com/en/api/pricing) only.]

  **Dear CoinGecko API paid plan subscribers,**

  We're excited to announce an improvement to our API, aimed at providing you with even faster access to real-time data! Starting **02:00 UTC, January 13, 2025**, the edge cache duration for the following endpoints will be reduced to 20-30s, allowing you to retrieve updated data more frequently.

  | Endpoints                                                                                                 | Current Update Frequency | New Update Frequency |
  | :-------------------------------------------------------------------------------------------------------- | :----------------------- | :------------------- |
  | CoinGecko [/simple/price](https://docs.coingecko.com/reference/simple-price)                              | 30s                      | 20s                  |
  | CoinGecko [/simple/token\_price](https://docs.coingecko.com/reference/simple-token-price)                 | 30s                      | 20s                  |
  | Onchain [/simple/networks/../token\_price](https://docs.coingecko.com/reference/onchain-simple-price)     | 60s                      | 30s                  |
  | Onchain [/networks/../pools/../trades](https://docs.coingecko.com/reference/pool-trades-contract-address) | 60s                      | 30s                  |
  | Onchain [/networks/../pools/..](https://docs.coingecko.com/reference/pool-address)                        | 60s                      | 30s                  |
  | Onchain [/networks/../pools/multi/..](https://docs.coingecko.com/reference/pools-addresses)               | 60s                      | 30s                  |

  **What This Means for You:**

  * **Fresher Data, Quicker**: With a reduced cache time, you'll now have the option to access more up-to-date data, closer to real-time!
  * **No Extra Credits for Cached Data**: If your request hits the cache (now updated every 20-30 seconds for endpoints above), there will be no additional credits charged—just like before.

  **Things to Keep in Mind:**

  * If your request hits our origin server instead of the cache to retrieve the latest data, there may be additional credits used.
  * To balance cost and real-time data needs, we recommend reviewing your request frequency. For those who prefer fresher data without extra credits, consider keeping your request interval at 30 seconds or more to align with the new cache duration.

  We're committed to continuously improving your experience and ensuring you get the data you need, as efficiently as possible. If you have any questions or need assistance, feel free to reach out to [soonaik@coingecko.com](mailto:soonaik@coingecko.com) .

  **CoinGecko API Team**

  ## Multiple Improvements: Onchain Trending Pools, CG New Currencies Support, Snapshot, Exchange Info

  🗓️ **December 15, 2024**

  ### Onchain Trending Pools: Added Support to Filter by Duration

  You can now query trending pools with the following endpoints, and filter them by different duration: 5m, 1h, 6h, 24h, using `duration` parameter. e.g. `duration=5m`

  * [Trending Pools List](https://docs.coingecko.com/reference/trending-pools-list): query all the trending pools across all networks on GeckoTerminal
  * [Trending Pools by Network](https://docs.coingecko.com/reference/trending-pools-network): query the trending pools based on the provided network

  ### CG Coin Prices: Added Support for New Fiat Currencies

  You can now query coin prices in the 13 new currencies for the following 3 endpoints:

  * [Coin Price by IDs](https://docs.coingecko.com/reference/simple-price): query latest price in selected currencies, by coin id
  * [Coin Price by Token Addresses](https://docs.coingecko.com/reference/simple-token-price): query latest price in selected currencies, by token address
  * [BTC-to-Currency Exchange Rates](https://docs.coingecko.com/reference/exchange-rates): query BTC exchange rates with other currencies

  **New supported currencies:**

  1. Colombia | COP
  2. Kenya | KES
  3. Romania | RON
  4. Dominican Republic | DOP
  5. Costa Rica | CRC
  6. Honduras | HNL
  7. Zambia | ZMW
  8. El Salvador | SVC
  9. Bosnia and Herzegovina | BAM
  10. Peru | PEN
  11. Guatemala | GTQ
  12. Lebanon | LBP
  13. Armenian Dram | AMD

  ### CG Coin Info: Included Snapshot URL

  [Coin Data by ID](https://docs.coingecko.com/reference/coins-id) now includes Snapshot link, e.g.

  ```asp json theme={null}
  "snapshot_url": "https://snapshot.org/#/lido-snapshot.eth",
  ```

  ### CG Exchange Info: Included Number of Coins and Pairs

  [https://docs.coingecko.com/reference/exchanges-id](https://docs.coingecko.com/reference/exchanges-id) now includes "coins" and "pairs", e.g.

  ```asp json theme={null}
   "coins": 384,
   "pairs": 1281,
  ```

  ## Multiple Improvements: Onchain Simple Price, Onchain Recently Updated Info, NFT Collection Data

  🗓️ **October 09, 2024**

  ### Onchain: Simple Price - Increased Token Address Limit from 30 to 100

  [Token Price by Token Addresses](https://docs.coingecko.com/reference/onchain-simple-price) now allows to input up to 100 contract addresses, instead of 30.

  * You may now retrieve data of up to 100 token prices of a specific network, in one single request.
  * Available exclusively to Pro API paid plan subscribers.

  ### Onchain: Recently Updated Info - Added Filter by Network

  [Most Recently Updated Token List](https://docs.coingecko.com/reference/tokens-info-recent-updated) now allows to filter by blockchain network, by flagging the `network` parameter. e.g. `network=eth`.

  * You can use the `network` parameter to retrieve the 100 most recently updated token info of a specific network.
  * View list of supported network via [Supported Networks List](https://docs.coingecko.com/reference/networks-list) endpoint.

  ### NFT Collection Data  - Included Banner Image

  [NFTs Collection Data by ID](https://docs.coingecko.com/reference/nfts-id) now provides banner image of a NFT collection.

  View banner image [example](https://coin-images.coingecko.com/nft_contracts/images/38/pudgy-penguins-banner.png?1708416126) on: [https://www.coingecko.com/en/nft/pudgy-penguins](https://www.coingecko.com/en/nft/pudgy-penguins)

  ```json  theme={null}
  {
    "symbol": "PPG",
    "image": {
      "small": "https://coin-images.coingecko.com/nft_contracts/images/38/small/da64989d9762c8a61b3c65917edfdf97.png?1707287183"
    },
    "banner_image": "https://coin-images.coingecko.com/nft_contracts/images/38/pudgy-penguins-banner.png?1708416126",
  ..
  ```

  ## Multiple Improvements: Global Market Chart, Asset Platforms, Coin Categories, Historical Supply Chart

  🗓️ **September 26, 2024**

  ### Global Market Chart - Improved Daily Data Update

  Previously, for [Global Market Cap Chart Data endpoint](https://docs.coingecko.com/reference/global-market-cap-chart) , the daily data is returned at 23:00 UTC. We've made improvement to return daily data at 00:00 UTC.

  The last completed UTC day (00:00) is available 5 minutes after midnight on the next UTC day (00:05). The cache will **always expire at 00:05 UTC**. If you wish to get the latest daily data (00:00 UTC), you can make request at 00:05 UTC or later.

  ### Asset Platforms - Included Images of Blockchain Network Logos

  [Asset Platforms List (ID Map)](https://docs.coingecko.com/reference/asset-platforms-list) now provides the logos of blockchain networks.

  For example:

  ```json  theme={null}
      "image": {
        "thumb": "https://coin-images.coingecko.com/asset_platforms/images/93/thumb/AN_logomark.png?1706606703",
        "small": "https://coin-images.coingecko.com/asset_platforms/images/93/small/AN_logomark.png?1706606703",
        "large": "https://coin-images.coingecko.com/asset_platforms/images/93/large/AN_logomark.png?1706606703"
      }
  ```

  ### Coins Categories - Included Ids of Top 3 Coins

  [Coins Categories List with Market Data](https://docs.coingecko.com/reference/coins-categories) now provides coins id of the top 3 coins of a category.

  For example:

  ```json  theme={null}
  "top_3_coins_id": [
    "bitcoin",
    "ethereum",
    "binancecoin"
  ],
  ```

  ### Circulating Supply Chart and Total Supply Chart - Fixed '0' data issue

  For the following **Enterprise-plan** exclusive endpoints below, there was a bug that returned wrong '0' value in the payload. This is fixed and will no longer return wrong '0' value in the payload.

  1. [👑 Circulating Supply Chart by ID](https://docs.coingecko.com/reference/coins-id-circulating-supply-chart)
  2. [👑 Circulating Supply chart within Time Range by ID](https://docs.coingecko.com/reference/coins-id-circulating-supply-chart-range)
  3. [👑 Total Supply Chart by ID](https://docs.coingecko.com/reference/coins-id-total-supply-chart)
  4. [👑 Total Supply Chart within time range by ID](https://docs.coingecko.com/reference/coins-id-total-supply-chart-range)

  ## Improvement of update frequency for OHLC endpoints

  🗓️ **September 04, 2024**

  The cache & update frequency of the following endpoints have been improved from every 30 minutes to every 15 minutes:

  * [/coins//ohlc](https://docs.coingecko.com/reference/coins-id-ohlc)
  * [/coins//ohlc/range](https://docs.coingecko.com/reference/coins-id-ohlc-range)

  ## Included new fields - NFT data

  🗓️ **August 18, 2024**

  We've added  'user\_favorites\_count', and 'ath' (all-time-high) related data to the following NFT endpoints:

  * [/nfts/](https://docs.coingecko.com/reference/nfts-id)
  * [/nfts//contract/](https://docs.coingecko.com/reference/nfts-contract-address)

  **Example of responses:**

  ```json  theme={null}
  {
    "user_favorites_count": 3660,
    "ath": {
      "native_currency": 22.9,
      "usd": 67535
    },
    "ath_change_percentage": {
      "native_currency": -59.825327510917,
      "usd": -64.3396788440525
    },
    "ath_date": {
      "native_currency": "2024-02-17T09:25:05.056Z",
      "usd": "2024-02-29T11:45:08.150Z"
  }
  ```

  ## Introduced /coins/id/ohlc/range endpoint

  🗓️ **May 10, 2024**

  We've introduced a new endpoint [/coins//ohlc/range](https://docs.coingecko.com/reference/coins-id-ohlc-range).

  This endpoint allows you to get the OHLC chart (Open, High, Low, Close) of a coin within a range of timestamp based on particular coin id.

  Please note that this endpoint is available exclusively for **paid plan subscribers only**.

  ## Added interval hourly params to /coins/id/ohlc

  🗓️ **May 04, 2024**

  We've expanded functionality to include support for the `interval=hourly` parameter within the [/coins//ohlc](https://docs.coingecko.com/reference/coins-id-ohlc) endpoint.

  Users can use this parameter to retrieve OHLC (Open/High/Low/Close) data on a hourly interval for up to 90 days of the date range.

  Example of endpoint request:

  `https://pro-api.coingecko.com/api/v3/coins/bitcoin/ohlc?vs_currency=usd&days=1&interval=hourly&x_cg_pro_api_key=YOUR_API_KEY`

  ## Added support for inactive coins in /coins/list and historical data endpoints

  🗓️ **April 30, 2024**

  We've now enhanced the [/coins/list](https://docs.coingecko.com/reference/coins-list) endpoint to include inactive coins

  * You may access the inactive coins by specifying `status=inactive` in your query
  * Example of endpoint request:\
    `https://pro-api.coingecko.com/api/v3/coins/list?include_platform=false&status=inactive&x_cg_pro_api_key=YOUR_API_KEY`

  Additionally, historical data for inactive coins can be queried using their IDs in the following endpoints:

  * [/coins//history](https://docs.coingecko.com/reference/coins-id-history)
  * [/coins//market\_chart](https://docs.coingecko.com/reference/coins-id-market-chart)
  * [/coins//market\_chart/range](https://docs.coingecko.com/reference/coins-id-market-chart-range)
  * [/coins//contract//market\_chart](https://docs.coingecko.com/reference/contract-address-market-chart)
  * [/coins//contract//market\_chart/range](https://docs.coingecko.com/reference/contract-address-market-chart-range)

  Please note that these features are available exclusively for **paid plan subscribers only**

  ## Introduced /key endpoint

  🗓️ **March 27, 2024**

  We've introduced a new endpoint [/key](https://docs.coingecko.com/reference/api-usage) for conveniently monitoring your account's API usage, including rate limits and remaining credits.

  **Example of responses**:

  ```json  theme={null}
  {
    "plan": "Other",
    "rate_limit_request_per_minute": 1000,
    "monthly_call_credit": 1000000,
    "current_total_monthly_calls": 307,
    "current_remaining_monthly_calls": 999693
  }
  ```

  ## Multiple Improvements (Onchain/GT)

  🗓️ **February 28, 2024**

  * image\_url is now returned in the token response for pools and tokens endpoints:

    Example of responses:

    ```json JSON theme=\{null\}
     "data": \{
        "id": "eth_0xdac17f958d2ee523a2206206994597c13d831ec7",
        "type": "token",
        "attributes": \{
          "address": "0xdac17f958d2ee523a2206206994597c13d831ec7",
          "name": "Tether USD",
          "symbol": "USDT",
          "image_url": "https://assets.coingecko.com/coins/images/325/small/Tether.png?1696501661", 👈
          ......
          "market_cap_usd": "100719721661.467"
        \},
        "relationships": \{\}
    \}
    ```
  * We've added sorting parameters such as order= `h24_volume_usd_desc` and order=` h24_tx_count_desc` for /pools endpoints
  * The 'token' parameter within the [/ohlcv ](https://docs.coingecko.com/reference/pool-ohlcv-contract-address) endpoint can now accept a token address, provided it exists in the queried pool, to return OHLCV data\
    Example of endpoint request (**token=0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2**):\
    `https://pro-api.coingecko.com/api/v3/onchain/networks/eth/pools/0x06da0fd433c1a5d7a4faa01111c044910a184553/ohlcv/day?token=0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2&x_cg_pro_api_key=YOUR_API_KEY`
  * [/ohlcv ](https://docs.coingecko.com/reference/pool-ohlcv-contract-address) endpoint now includes the base and target token metadata in the response\
    Example of responses:

    ```json JSON theme=\{null\}
    \{
      "data": \{
        "id": "46303eb4-fba1-44f3-a3c8-c542e4cd5d1a",
        "type": "ohlcv_request_response",
        "attributes": \{
          "ohlcv_list": []
        \}
      \},
      "meta": \{
        "base": \{
          "address": "0xdac17f958d2ee523a2206206994597c13d831ec7",
          "name": "Tether USD",
          "symbol": "USDT",
          "coingecko_coin_id": "tether"
        \},
        "quote": \{
          "address": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
          "name": "Wrapped Ether",
          "symbol": "WETH",
          "coingecko_coin_id": "weth"
        \}
      \}
    \}
    ```

  ## Introduced /networks/network/trending\_pools endpoint (Onchain/GT)

  🗓️ **February 19, 2024**

  Trending Pools endpoint, [/networks//trending\_pools](https://docs.coingecko.com/reference/trending-pools-network) is now available to fetch a list of pools that are trending as seen on GeckoTerminal based on web visits and on-chain activities.

  ## Introduced /search/pools endpoint (Onchain/GT)

  🗓️ **February 19, 2024**

  Added new endpoint to search for pools /search/pools based on keywords passed into query.

  ## Included new field for /coins/id endpoint

  🗓️ **January 18, 2024**

  We've included a new field "whitepaper" under "links" section for [/coins/](https://docs.coingecko.com/reference/coins-id) endpoint

  **Example of responses:**

  ```json  theme={null}
  {
    "id": "bitcoin",
    ......
    "links": {
      "homepage": [],
      "whitepaper": "https://bitcoin.org/bitcoin.pdf", 👈
      "blockchain_site": [],
      "official_forum_url": [],
      "chat_url": [],
      "announcement_url": [],
      "twitter_screen_name": "bitcoin",
      "facebook_username": "bitcoins",
      "bitcointalk_thread_identifier": null,
      "telegram_channel_identifier": "",
      "subreddit_url": "https://www.reddit.com/r/Bitcoin/",
      "repos_url": {}
    },
    .......
  }
  ```

  ## Deprecated response fields for /coins/id

  🗓️ **December 13, 2023**

  The following data is now deprecated for [/coins/](https://docs.coingecko.com/reference/coins-id) endpoint:

  * coingecko\_rank
  * coingecko\_score
  * developer\_score
  * community\_score
  * liquidity\_score
  * public\_interest\_score
  * public\_interest\_stats
  * alexa\_rank
  * bing\_matches

  ## Introduced new historical total supply endpoints

  🗓️ **December 12, 2023**

  We've introduced Historical Total Supply data to Enterprise plan subscribers via these 2 exclusive endpoints:

  * [/coins//total\_supply\_chart](https://docs.coingecko.com/reference/coins-id-total-supply-chart) : get historical total supply of a coin, by number of days away from now.
  * [/coins//total\_supply\_chart/range](https://docs.coingecko.com/reference/coins-id-total-supply-chart-range) : get historical total supply of a coin, within a range of timestamp.

  ## Included more trending coins

  🗓️ **December 07, 2023**

  We've expanded the capabilities of the [/search/trending](https://docs.coingecko.com/reference/trending-search) endpoint.

  It now supports up to 15 trending coins, a significant increase from the previous limit of 7.

  ## Improvement on pool data (Onchain/GT)

  🗓️ **December 03, 2023**

  Pool data now returns transaction stats for the last 1 hour. Unique buyers and sellers in the last 1 hour and 24 hours are now returned in the response

  ## Multiple Improvements

  🗓️ **November 21, 2023**

  The web\_slug data is now available in the following endpoints.

  * [/coins/](https://docs.coingecko.com/reference/coins-id)
  * [/coins//contract/](https://docs.coingecko.com/reference/coins-contract-address)

  This addition allows users to accurately link to a CoinGecko coin page using [www.coingecko.com/en/](http://www.coingecko.com/en/\\{web_slug\}).

  **Example of responses:**

  ```Text JSON theme={null}
  {
    "id": "bitcoin",
    "symbol": "btc",
    "name": "Bitcoin",
    "web_slug": "bitcoin", 👈
    ......
    "tickers": [...]
  }
  ```

  For the [/asset\_platforms](https://docs.coingecko.com/reference/asset-platforms-list) endpoint, we've introduced the native\_coin\_id data. This enables users to obtain the coin ID of different blockchain networks or asset platforms that may not have a contract address to look up

  **Example of responses:**

  ```Text JSON theme={null}
  {
    "id": "polygon-pos",
    "chain_identifier": 137,
    "name": "Polygon POS",
    "shortname": "MATIC", 
    "native_coin_id": "matic-network" 👈
  },
  ```

  ## Introduced /simple/networks/network/token\_price/addresses endpoint (Onchain/GT)

  🗓️ **November 10, 2023**

  Inspired by CoinGecko API most popular endpoint, we have launched the [/simple/networks//token\_price/](https://docs.coingecko.com/reference/onchain-simple-price), simple endpoint. Simply pass in addresses of any tokens on supported blockchain and get price data for it

  ## Introduced /networks/network/pools/pool\_address/trades endpoint (Onchain/GT)

  🗓️ **November 08, 2023**

  You can now get the latest 300 trades in the past 24 hours of a given pool from this endpoint [/networks//pools//trades](https://docs.coingecko.com/reference/pool-trades-contract-address). You may optionally filter by trade size as well. You can now build your own telegram bot alert!

  ## Introduced new endpoints (Onchain/GT)

  🗓️ **October 23, 2023**

  You can now fetch token information such as name, image, social links, and description via these endpoints:

  * To fetch information of tokens inside a pool, use [/networks//pools//info](https://docs.coingecko.com/reference/pool-token-info-contract-address)
  * To fetch information of a specific token use [/networks//tokens//info](https://docs.coingecko.com/reference/token-info-contract-address)
  * If you like to get token information of the most recently updated tokens, use [/tokens/info\_recently\_updated](https://docs.coingecko.com/reference/tokens-info-recent-updated)

  ## Included new fields (Onchain/GT)

  🗓️ **September 11, 2023**

  Pool response data now returns price in the base and quote token of the pool base\_token\_price\_quote\_token and quote\_token\_price\_base\_token for your convenience without the need to do additional calculation to derive these values

  ## Introduced new endpoints (Onchain/GT)

  🗓️ **September 06, 2023**

  Added new endpoints to allow querying multiple pools and tokens in a single API call. /networks/network/pools/multi/addresses and /networks/network/tokens/multi/addresses

  ## Included new fields (Onchain/GT)

  🗓️ **June 23, 2023**

  * More data added to the Pool response such as FDV, market cap (from CoinGecko if available), price change percentage, volume, number of buy/sell transactions
  * More data added when querying for token such as FDV, volume, market cap, and the top 3 pools

  ## Introduced precision params for other endpoints

  🗓️ **June 15, 2023**

  The uses of 'precision' parameter allows to specify price data in full or 0-18 decimals, and previously was only made available for [/simple/price](https://docs.coingecko.com/reference/simple-price) and [/simple/token\_price/](https://docs.coingecko.com/reference/simple-token-price) endpoints.

  This parameter is now supported for more endpoints as listed below:

  * [/coins/markets](https://docs.coingecko.com/reference/coins-markets)
  * [/coins/market\_chart](https://docs.coingecko.com/reference/coins-id-market-chart)
  * [/coins/market\_chart/range](https://docs.coingecko.com/reference/coins-id-market-chart)
  * [/coins//contract//market\_chart](https://docs.coingecko.com/reference/contract-address-market-chart)
  * [/coins//contract//market\_chart/range](https://docs.coingecko.com/reference/contract-address-market-chart-range)
  * [/coins//ohlc](https://docs.coingecko.com/reference/coins-id-ohlc)

  ## Multiple Improvements

  🗓️ **June 01, 2023**

  We've made enhancements to the /search/trending and /coins/asset\_platform\_id/contract/contract\_address endpoints:

  * Top 5 trending NFT data (based on high trading volume in the last 24 hours) is now included in the [/search/trending](https://docs.coingecko.com/reference/trending-search) endpoint
  * Near Protocol contract address (e.g. wrap.near) is now supported for [/coins//contract/ ](https://docs.coingecko.com/reference/coins-contract-address) endpoint

  ## Multiple Improvements (Onchain/GT)

  🗓️ **May 28, 2023**

  * Token metadata such as name, symbol, and CoinGecko ID are now returned in the responses for pools endpoints. Users will need to pass in this attribute include=base\_token, quote\_token
  * CoinGecko asset platform ID added to the response for [/networks](https://docs.coingecko.com/reference/networks-list) endpoint

  ## Added interval daily params to /coins/id/ohlc

  🗓️ **May 22, 2023**

  The [/coins//ohlc](https://docs.coingecko.com/reference/coins-id-ohlc) endpoint now supports the "interval=daily" parameter for Paid Plan Subscribers

  Users can use this parameter to retrieve OHLC (Open/High/Low/Close) data on a daily interval for up to 180 days of date range.

  ## Included new fields

  🗓️ **April 26, 2023**

  We've added  'watchlist\_portfolio\_users' field to [/coins/](https://docs.coingecko.com/reference/coins-id) endpoint responses.

  This refers to number of users who added the coin into a watchlist or portfolio.

  **Example of responses:**

  ```json JSON theme={null}
  {
  "id": "bitcoin",
  ......
  "watchlist_portfolio_users": 1449601, 👈
  "market_cap_rank": 1,
  ......
  "tickers": []
  }
  ```

  ## Increased Rate Limit (Onchain/GT)

  🗓️ **April 19, 2023**

  We've increased the rate limit of Public Plan from 10 calls per minute to 30 calls per minute

  ## Multiple Improvements (Onchain/GT)

  🗓️ **April 18, 2023**

  * base\_token\_native\_currency and quote\_token\_native\_currency added to the pools endpoint response. This allows you to obtain price in the network's native currency in addition to in USD
  * reserve\_in\_usd added to the pools endpoint response. This returns the total liquidity/reserve of the pool in USD
  * pool\_created\_at added to the pools endpoint response

  Example of responses for [/networks//pools/](https://docs.coingecko.com/reference/pool-address) :

  ```json  theme={null}
  {
  "data": {
      "id": "eth_0xeb2eae8a9912a09cb0f13bfafd5ad56cd263bb3f",
      "type": "pool",
      "attributes": {
      "base_token_price_usd": "0.0000186523882966482",
      "base_token_price_native_currency": "0.00000000647822280242372", 👈
      "quote_token_price_usd": "2881.71870575097",
      "quote_token_price_native_currency": "1.0", 👈
      "base_token_price_quote_token": "0.000000006478222802",
      "quote_token_price_base_token": "154363323",
      "address": "0xeb2eae8a9912a09cb0f13bfafd5ad56cd263bb3f",
      "name": "DGX-1 / WETH",
      "pool_created_at": "2024-02-18T08:10:59Z", 👈
      "fdv_usd": "784687",
      "market_cap_usd": null,
      "price_change_percentage": {
      "h1": "34.67",
      "h24": "8406.81"
      },
      "transactions": {},
      "volume_usd": {},
      "reserve_in_usd": "110214.6247" 👈
      },
      "relationships": {}
      }
  }
  ```

  * [/networks//new\_pools](https://docs.coingecko.com/reference/latest-pools-network) endpoint added to query new pools discovered for a network
  * [/networks/new\_pools](https://docs.coingecko.com/reference/latest-pools-list) endpoint added to query new pools discovered across all networks

  ## Included new fields

  🗓️ **April 03, 2023**

  We've added "symbol" field to these NFT endpoints responses:

  * [/nfts/markets](https://docs.coingecko.com/reference/nfts-markets)
  * [/nfts/ ](https://docs.coingecko.com/reference/nfts-id)
  * [/nfts//contract/](https://docs.coingecko.com/reference/nfts-contract-address)

  **Example of responses:**

  ```Text JSON theme={null}
  {
  	"id": "pudgy-penguins",
    "contract_address": "0xBd3531dA5CF5857e7CfAA92426877b022e612cf8",
    "asset_platform_id": "ethereum",
    "name": "Pudgy Penguins",
    "symbol": "PPG", 👈
    ....
  },
  ```

  ## Included new fields

  🗓️ **March 27, 2023**

  We've added "links" field (e.g. homepage, twitter, discord) to these NFT endpoints responses:

  * [/nfts/](https://docs.coingecko.com/reference/nfts-id)
  * [/nfts//contract/](https://docs.coingecko.com/reference/nfts-contract-address)

  **Example of responses:**

  ```json  theme={null}
  {
    "id": "pudgy-penguins",
    "contract_address": "0xBd3531dA5CF5857e7CfAA92426877b022e612cf8",
    .......
    "links": {
      "homepage": "https://www.pudgypenguins.com/", 👈
      "twitter": "https://twitter.com/pudgypenguins",👈
      "discord": "https://discord.gg/pudgypenguins" 👈
    },
  	.......
  }
  ```

  ## Introduced /coins/top\_gainer\_losers endpoint

  🗓️ **March 23, 2023**

  We've added [/coins/top\_gainers\_losers](https://docs.coingecko.com/reference/coins-top-gainers-losers) endpoint exclusively for Paid Plan Subscribers.

  Users can now get the top 30 coins with largest price gain and loss by a specific time duration with this endpoint.

  ## Improved OHLCV endpoint (Onchain/GT)

  🗓️ **March 23, 2023**

  [/networks//pools//ohlcv/](https://docs.coingecko.com/reference/pool-ohlcv-contract-address) now returns more granularity `day,` `hour`, `minute` and multiple aggregates

  ## Multiple Improvements

  🗓️ **February 23, 2023**

  We've made some updates to the /coins/categories and /simple/token\_price/id endpoints:

  * Market cap and volume data for 'ecosystem' categories in the [/coins/categories](https://docs.coingecko.com/reference/coins-categories) endpoint will now return 'null' until further notice. The CoinGecko team is actively working on improvements to provide more accurate data. If you have any feedback or suggestions, please reach out via [api@coingecko.com](mailto:api@coingecko.com).
  * Previously, the [/simple/token\_price/](https://docs.coingecko.com/reference/simple-token-price) endpoint was unable to return data for some Solana coins. This issue has been resolved, and users can now expect accurate data for Solana coins from this endpoint.

  ## Introduced /exchange/id/volume\_chart/range endpoint

  🗓️ **February 15, 2023**

  We've introduced the [/exchange//volume\_chart/range](https://docs.coingecko.com/reference/exchanges-id-volume-chart-range) endpoint for Paid Plan Subscribers.

  This exclusive feature allows users to query full historical volume data of an exchange.

  ## Introduced /coins/list/new endpoint

  🗓️ **January 09, 2023**

  We've introduced the [/coins/list/new](https://docs.coingecko.com/reference/coins-list-new) endpoint for Paid Plan Subscribers.

  This exclusive feature allows users to query the latest 200 coins on CoinGecko.

# 1. Get data by ID or Address
Source: https://docs.coingecko.com/docs/1-get-data-by-id-or-address

## 本篇目录

- [Methods to query price & market data of coins](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/01-Methods_to_query_price_market_data_of_co.md)
- [Specify target currency to return](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/02-Specify_target_currency_to_return.md)
- [Other way to obtain coin prices & market data](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/03-Other_way_to_obtain_coin_prices_market_d.md)
- [Blockchain Networks](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/04-Blockchain_Networks.md)
- [DEXs](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/05-DEXs.md)
- [Methods to query Onchain Data](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/06-Methods_to_query_Onchain_Data.md)
- [How to Use Our Prompts](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/07-How_to_Use_Our_Prompts.md)
- [Available Prompts](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/08-Available_Prompts.md)
- [Best Practices](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/09-Best_Practices.md)
- [User Journey for CoinGecko API Endpoints](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/10-User_Journey_for_CoinGecko_API_Endpoints.md)
- [User Journey for Onchain DEX API Endpoints (GeckoTerminal data)](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/11-User_Journey_for_Onchain_DEX_API_Endpoin.md)
- [Using llms.txt](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/12-Using_llms.txt.md)
- [CoinGecko MCP Server](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/13-CoinGecko_MCP_Server.md)
- [Tools for Your Workflow](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/14-Tools_for_Your_Workflow.md)
- [API Swagger JSON (OAS)](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/15-API_Swagger_JSON_OAS.md)
- [Official CoinGecko API SDK](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/16-Official_CoinGecko_API_SDK.md)
- [Common Errors](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/17-Common_Errors.md)
- [Rate Limit](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/18-Rate_Limit.md)
- [1. Get Coins Logo Images](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/19-1._Get_Coins_Logo_Images.md)
- [2. Best Endpoint for Latest Crypto Price](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/20-2._Best_Endpoint_for_Latest_Crypto_Price.md)
- [3. Get All Trading Pairs (Tickers) of a Coin](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/21-3._Get_All_Trading_Pairs_Tickers_of_a_Co.md)
- [4. Get Trading Pairs of Specific Coins from a Specific Exchange](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/22-4._Get_Trading_Pairs_of_Specific_Coins_f.md)
- [5. Building Telegram Bot for Latest Coin Listings](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/23-5._Building_Telegram_Bot_for_Latest_Coin.md)
- [6. Get List of Coins Under Specific Category](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/24-6._Get_List_of_Coins_Under_Specific_Cate.md)
- [7. Identify DEX Decentralized Exchanges](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/25-7._Identify_DEX_Decentralized_Exchanges.md)
- [8. Get Bitcoin Dominance Data (BTC.D)](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/26-8._Get_Bitcoin_Dominance_Data_BTC.D.md)
- [9. Get Market Cap or Dominance of a Specific Ecosystem](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/27-9._Get_Market_Cap_or_Dominance_of_a_Spec.md)
- [10. Get Token Lists of a Specific Blockchain Network](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/28-10._Get_Token_Lists_of_a_Specific_Blockc.md)
- [11. Get 7-Day Sparkline Price Data of a Coin](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/29-11._Get_7-Day_Sparkline_Price_Data_of_a_.md)
- [12. Get Link to Individual CoinGecko Coin Page](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/30-12._Get_Link_to_Individual_CoinGecko_Coi.md)
- [13. Check Coin Status and Stale Price Updates](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/31-13._Check_Coin_Status_and_Stale_Price_Up.md)
- [14. Get Real-Time and Historical Exchange of BTC in USD](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/32-14._Get_Real-Time_and_Historical_Exchang.md)
- [15. Get Watchlist Portfolio Data of a Coin](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/33-15._Get_Watchlist_Portfolio_Data_of_a_Co.md)
- [16. Get Historical Data for Inactive Coins](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/34-16._Get_Historical_Data_for_Inactive_Coi.md)
- [17. Get TVL (Total Value Locked) data of a Coin](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/35-17._Get_TVL_Total_Value_Locked_data_of_a.md)
- [18. Query Search for Coins, Categories, NFTs, Exchanges, and Pools](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/36-18._Query_Search_for_Coins_Categories_NF.md)
- [19. Get List of Blockchain Networks supported on CoinGecko and GeckoTerminal.](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/37-19._Get_List_of_Blockchain_Networks_supp.md)
- [20. Get Native Coin of a Blockchain Network (Asset Platform)](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/38-20._Get_Native_Coin_of_a_Blockchain_Netw.md)
- [21. Get Liquidity data of a Liquidity Pool or Token](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/39-21._Get_Liquidity_data_of_a_Liquidity_Po.md)
- [22. Get list of onchain DEX pools based on specific criteria](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/40-22._Get_list_of_onchain_DEX_pools_based_.md)
- [23. Get List of Trending Coins](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/41-23._Get_List_of_Trending_Coins.md)
- [24. Get Security Info of Tokens](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/42-24._Get_Security_Info_of_Tokens.md)
- [25. Get Latest Token/Pool Data from Launchpad](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/43-25._Get_Latest_Token_Pool_Data_from_Laun.md)
- [CoinGecko](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/44-CoinGecko.md)
- [GeckoTerminal](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/45-GeckoTerminal.md)
- [Which MCP Server Should You Use?](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/46-Which_MCP_Server_Should_You_Use.md)
- [🔗 Endpoint Options](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/47-Endpoint_Options.md)
- [Remote Server (Public, Keyless)](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/48-Remote_Server_Public_Keyless.md)
- [Remote Server (Authenticated)](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/49-Remote_Server_Authenticated.md)
- [Local Server (API Key Required)](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/50-Local_Server_API_Key_Required.md)
- [For Claude Free Users (via Claude Desktop)](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/51-For_Claude_Free_Users_via_Claude_Desktop.md)
- [For Claude Pro Users](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/52-For_Claude_Pro_Users.md)
- [API Key Differences (Demo vs. Pro)](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/53-API_Key_Differences_Demo_vs._Pro.md)
- [Dynamic vs. Static Tools](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/54-Dynamic_vs._Static_Tools.md)
- [Using llms.txt](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/55-Using_llms.txt.md)
- [How to Use Our Prompts](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/56-How_to_Use_Our_Prompts.md)
- [Resources](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/57-Resources.md)
- [Install via npm](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/58-Install_via_npm.md)
- [Install via pip](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/59-Install_via_pip.md)
- [1. Creating a new API Key](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/60-1._Creating_a_new_API_Key.md)
- [2. Making API Request](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/61-2._Making_API_Request.md)
- [3. Edit or Delete API Key](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/62-3._Edit_or_Delete_API_Key.md)
- [4. API Usage Report](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/63-4._API_Usage_Report.md)
- [5. Others](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/64-5._Others.md)
- [🔤 No Code](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/65-No_Code.md)
- [💻 Low Code](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/66-Low_Code.md)
- [👨‍💻 Code](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/67-Code.md)
- [How to Use Our Prompts](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/68-How_to_Use_Our_Prompts.md)
- [Resources](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/69-Resources.md)
- [CoinGecko API Authentication Method](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/70-CoinGecko_API_Authentication_Method.md)
- [🔥 Accessing Onchain DEX data](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/71-Accessing_Onchain_DEX_data.md)
- [API Key Usage Credits](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/72-API_Key_Usage_Credits.md)
- [CoinGecko Endpoints: Coins](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/73-CoinGecko_Endpoints_Coins.md)
- [CoinGecko Endpoints: NFT](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/74-CoinGecko_Endpoints_NFT.md)
- [CoinGecko Endpoints: Exchanges & Derivatives](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/75-CoinGecko_Endpoints_Exchanges_Derivative.md)
- [CoinGecko Endpoints: Public Treasuries](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/76-CoinGecko_Endpoints_Public_Treasuries.md)
- [CoinGecko Endpoints: General](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/77-CoinGecko_Endpoints_General.md)
- [Onchain DEX Endpoints (GeckoTerminal)](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/78-Onchain_DEX_Endpoints_GeckoTerminal.md)
- [CoinGecko API Authentication Method](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/79-CoinGecko_API_Authentication_Method.md)
- [API Key Usage Credits](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/80-API_Key_Usage_Credits.md)
- [CoinGecko Endpoints: Coins](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/81-CoinGecko_Endpoints_Coins.md)
- [CoinGecko Endpoints: NFT](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/82-CoinGecko_Endpoints_NFT.md)
- [CoinGecko Endpoints: Exchanges & Derivatives](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/83-CoinGecko_Endpoints_Exchanges_Derivative.md)
- [CoinGecko Endpoints: Public Treasuries](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/84-CoinGecko_Endpoints_Public_Treasuries.md)
- [CoinGecko Endpoints: General](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/85-CoinGecko_Endpoints_General.md)
- [Onchain DEX Endpoints (GeckoTerminal)](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/86-Onchain_DEX_Endpoints_GeckoTerminal.md)
- [1. Establish Connection to Websocket](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/87-1._Establish_Connection_to_Websocket.md)
- [2. Subscribe to a specific channel - CGSimplePrice](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/88-2._Subscribe_to_a_specific_channel_-_CGS.md)
- [3. Stream CGSimplePrice](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/89-3._Stream_CGSimplePrice.md)
- [Tips:](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/90-Tips.md)
- [Access Real-Time Crypto Data Instantly with CoinGecko WebSockets](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/91-Access_Real-Time_Crypto_Data_Instantly_w.md)
- [1. Establish Connection to Websocket](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/92-1._Establish_Connection_to_Websocket.md)
- [2. Subscribe to a specific channel - OnchainSimpleTokenPrice](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/93-2._Subscribe_to_a_specific_channel_-_Onc.md)
- [3. Stream OnchainSimpleTokenPrice data](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/94-3._Stream_OnchainSimpleTokenPrice_data.md)
- [Tips:](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/95-Tips.md)
- [1. Establish Connection to Websocket](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/96-1._Establish_Connection_to_Websocket.md)
- [2. Subscribe to a specific channel - OnchainTrade](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/97-2._Subscribe_to_a_specific_channel_-_Onc.md)
- [3. Stream OnchainTrade data](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/98-3._Stream_OnchainTrade_data.md)
- [Tips:](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/99-Tips.md)
- [1. Establish Connection to Websocket](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/100-1._Establish_Connection_to_Websocket.md)
- [2. Subscribe to a specific channel - OnchainOHLCV](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/101-2._Subscribe_to_a_specific_channel_-_Onc.md)
- [3. Stream OnchainOHLCV data](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/102-3._Stream_OnchainOHLCV_data.md)
- [Tips:](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/103-Tips.md)
