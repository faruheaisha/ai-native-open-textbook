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
pageSha256: "ea8d40bad49ef05e609c6f215b342093880d9c2a547090cbcaf435896f79252b"
contentMode: "local-full"
zh: ""
---

## Multiple Improvements: Bonding Curve Data, Pooled Token Balance, and More.

🗓️ **September 12, 2025**

### 🚀 Now Supporting Bonding Curve Data

Bonding curve data (launchpad graduation) is now supported for the followiing endpoints:

* [Specific Pool Data by Pool Address](https://docs.coingecko.com/reference/pool-address)
  * [Multiple Pools Data by Pool Addresses](https://docs.coingecko.com/reference/pools-addresses)

More endpoints to support bonding curve data soon.

### 🚀 Now Supporting Pooled Token Balance Data

The following endpoints now support additional pool token balance data by flagging this parameter `include_composition=true` :

* [Specific Pool Data by Pool Address](https://docs.coingecko.com/reference/pool-address)
  * [Multiple Pools Data by Pool Addresses](https://docs.coingecko.com/reference/pools-addresses)
  * [Token Data by Token Address](https://docs.coingecko.com/reference/token-data-contract-address) (requires `include=top_pools` parameter to be flagged together)
  * [Tokens Data by Token Addresses](https://docs.coingecko.com/reference/tokens-data-contract-addresses) (requires `include=top_pools` parameter to be flagged together)

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
