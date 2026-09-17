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
pageSha256: "efb35f8a7e4e3182d5a6823eb6e25f13eb47cb750146e1d50bdabdc691304ae3"
contentMode: "local-full"
zh: ""
---

## Multiple Improvement: Holders data, Pool Stats, Simple Token Price

🗓️ **March 14, 2025**

### Onchain Token Info endpoints - Holders data

Now support the following holder data **(Beta)**:

* holders count
  * top holders distribution percentage

**Improved endpoints:**

* [Token Info by Token Address](https://docs.coingecko.com/reference/token-info-contract-address)
  * [Pool Tokens Info by Pool Address](https://docs.coingecko.com/reference/pool-token-info-contract-address)

### Onchain Pool Data endpoints - More Data Support

Now support the following data:

* `price_change_percentage`: m15, m30
  * `volume_usd`: m15, m30
  * `transactions`: h6

**Improved endpoints:**

* [Specific Pool Data by Pool Address](https://docs.coingecko.com/reference/pool-address)
  * [Multiple Pools Data by Pool Addresses](https://docs.coingecko.com/reference/pools-addresses)

### Onchain Simple Token Price endpoint - Liquidity & Price Change Percentage data

Now supports the following optional parameter to return more data.

* `include_24hr_price_change` (24hr price change percentage)
  * `include_total_reverse_in_usd` (token liquidity data - total liquidity portion attributable to a specific token across all available pools)

**Improved Endpoint:**

* [Token Price by Token Addresses](https://docs.coingecko.com/reference/onchain-simple-price)

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

🚀 API Docs: [Megafilter for Pools](https://docs.coingecko.com/reference/pools-megafilter)\
  🔗 Live Filtering on [GeckoTerminal](https://www.geckoterminal.com/)
