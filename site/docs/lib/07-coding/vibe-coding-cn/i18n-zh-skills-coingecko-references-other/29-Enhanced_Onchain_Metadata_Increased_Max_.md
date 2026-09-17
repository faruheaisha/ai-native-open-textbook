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
pageSha256: "7e3ca5f33c9eeb67b797342bc910df5f13d662d9d8f06d1a7a9d44f2c60d57f6"
contentMode: "local-full"
zh: ""
---

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
