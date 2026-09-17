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
pageSha256: "9c82e8baa40cb40cc6ee67a932785b3461100f18533b76ee8f06fea1cadb9fc4"
contentMode: "local-full"
zh: ""
---

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

### CG Exchange Info: Included Number of Coins and Pairs

[https://docs.coingecko.com/reference/exchanges-id](https://docs.coingecko.com/reference/exchanges-id) now includes "coins" and "pairs", e.g.

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

  ## Multiple Improvements: Global Market Chart, Asset Platforms, Coin Categories, Historical Supply Chart

🗓️ **September 26, 2024**

### Global Market Chart - Improved Daily Data Update

Previously, for [Global Market Cap Chart Data endpoint](https://docs.coingecko.com/reference/global-market-cap-chart) , the daily data is returned at 23:00 UTC. We've made improvement to return daily data at 00:00 UTC.

The last completed UTC day (00:00) is available 5 minutes after midnight on the next UTC day (00:05). The cache will **always expire at 00:05 UTC**. If you wish to get the latest daily data (00:00 UTC), you can make request at 00:05 UTC or later.

### Asset Platforms - Included Images of Blockchain Network Logos

[Asset Platforms List (ID Map)](https://docs.coingecko.com/reference/asset-platforms-list) now provides the logos of blockchain networks.

### Coins Categories - Included Ids of Top 3 Coins

[Coins Categories List with Market Data](https://docs.coingecko.com/reference/coins-categories) now provides coins id of the top 3 coins of a category.

### Circulating Supply Chart and Total Supply Chart - Fixed '0' data issue

For the following **Enterprise-plan** exclusive endpoints below, there was a bug that returned wrong '0' value in the payload. This is fixed and will no longer return wrong '0' value in the payload.

1. [👑 Circulating Supply Chart by ID](https://docs.coingecko.com/reference/coins-id-circulating-supply-chart)
  2. [👑 Circulating Supply chart within Time Range by ID](https://docs.coingecko.com/reference/coins-id-circulating-supply-chart-range)
  3. [👑 Total Supply Chart by ID](https://docs.coingecko.com/reference/coins-id-total-supply-chart)
  4. [👑 Total Supply Chart within time range by ID](https://docs.coingecko.com/reference/coins-id-total-supply-chart-range)
