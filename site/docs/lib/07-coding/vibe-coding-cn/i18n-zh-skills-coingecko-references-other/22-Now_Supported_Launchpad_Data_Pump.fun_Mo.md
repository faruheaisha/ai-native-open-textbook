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
pageSha256: "3f1d6a1c44852f4c4095d20112b4943b2723269bb4953c9d50c9152d8e20afe1"
contentMode: "local-full"
zh: ""
---

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

**Example Request (Get the last 100 1-second intervals for a pool on Ethereum):**

### 🍯 Enhanced Honeypot Information

We've expanded our honeypot detection features to provide more comprehensive risk assessment. You can now check if a token is a potential honeypot using the main info endpoints.

**Improved Endpoints:**

* [Token Info by Token Address](https://docs.coingecko.com/reference/token-info-contract-address)
  * [Pool Tokens Info by Pool Address](https://docs.coingecko.com/reference/pool-token-info-contract-address)

### \[Pro-API Exclusive] New Filtering Option in Megafilter

Previously, the[Pools Megafilter](https://docs.coingecko.com/reference/pools-megafilter) endpoint could only show tokens confirmed as ***not*** a honeypot (`checks=no_honeypot`). Now, you can also include tokens where the honeypot status is 'unknown'.

* To use this, set `include_unknown_honeypot_tokens=true`.
  * Important: This parameter only takes effect when `checks=no_honeypot` is also specified in the request.

**Example Request (Get trending pools that are not confirmed honeypots, including those with an unknown status):**

### 📈 Expanded Pool Data

**Endpoint**: [Pool Tokens Info by Pool Address](https://docs.coingecko.com/reference/pool-token-info-contract-address)

By adding `include=pool` to your request on the pool tokens endpoint, you can now retrieve additional context about the pool itself.

* Base and quote token address
  * Sentiment vote percentage (positive and negative)
  * Community suspicious reports count

  ## SOL Currency Is Now Supported for CoinGecko Endpoints

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

**Example:** historical daily price, market cap and volume of Trump in Solana, using [Coin Historical Chart Data by ID](https://docs.coingecko.com/reference/coins-id-market-chart) endpoint.
