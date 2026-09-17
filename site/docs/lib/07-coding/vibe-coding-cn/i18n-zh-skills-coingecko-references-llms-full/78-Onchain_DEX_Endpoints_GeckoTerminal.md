---
title: "Entities List (ID Map)"
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
pageSha256: "36eca36cc35b527474ac1680dcdb63bb72b90f571c380b1cf8e32d99a0a07be6"
contentMode: "local-full"
zh: ""
---

# Entities List (ID Map)
Source: https://docs.coingecko.com/reference/entities-list

reference/api-reference/coingecko-pro.json get /entities/list
This endpoint allows you to **query all the supported entities on CoinGecko with entities ID, name, symbol, and country**

  ### Note

  * Cache / Update Frequency: every 5 minutes for all the API plans.

# BTC-to-Currency Exchange Rates
Source: https://docs.coingecko.com/reference/exchange-rates

reference/api-reference/coingecko-pro.json get /exchange_rates
This endpoint allows you to **query BTC exchange rates with other currencies**

  ### Tips

  * You may use this endpoint to convert the response data, which is originally in BTC, to other currencies.

  ### Note

  * Cache / Update Frequency: every 5 minutes for all the API plans.

# Exchanges List with data
Source: https://docs.coingecko.com/reference/exchanges

reference/api-reference/coingecko-pro.json get /exchanges
This endpoint allows you to **query all the supported exchanges with exchanges' data (ID, name, country, ...) that have active trading volumes on CoinGecko**

  ### Tips

  * You may include values such as `per_page` and `page` to specify how many results you would like to show in the responses per page and which page of responses you would like to show.

  ### Note

  * All the exchanges in the responses are the exchanges with active trading volume on CoinGecko, any inactive or deactivated exchanges will be removed from the list.
  * Cache / Update Frequency: every 60 seconds for all the API plans.

# Exchange Data by ID
Source: https://docs.coingecko.com/reference/exchanges-id

reference/api-reference/coingecko-pro.json get /exchanges/\{id\}
This endpoint allows you to **query exchange's data (name, year established, country, ...), exchange volume in BTC and top 100 tickers based on exchange's ID**

  ### Notice

  * Please note that the `trade_volume_24h_btc_normalized` data field will no longer be supported by our API starting on June 16, 2025. Please refer to [changelog](https://docs.coingecko.com/changelog#may-2025) for more details.

  ### Note

  * The exchange volume in the response is provided in BTC. To convert it to other currencies, please use [/exchange\_rates](https://docs.coingecko.com/reference/exchange-rates) endpoint.
  * For derivatives (e.g. `bitmex`, `binance_futures`), to get derivatives exchanges data, please go to [/derivatives/exchange/\\{id\}](https://docs.coingecko.com/reference/derivatives-exchanges-id) endpoint.
  * Tickers are limited to 100 items, to get more tickers, please go to [/exchanges/\\{id\}/tickers](https://docs.coingecko.com/reference/exchanges-id-tickers) endpoint.
  * When `dex_pair_format=symbol`, the DEX pair `base` and `target` are displayed in symbol format (e.g. `WETH`, `USDC`) instead of as contract addresses.
  * Cache / Update Frequency: every 60 seconds for all the API plans.

# Exchange Tickers by ID
Source: https://docs.coingecko.com/reference/exchanges-id-tickers

reference/api-reference/coingecko-pro.json get /exchanges/\{id\}/tickers
This endpoint allows you to **query exchange's tickers based on exchange's ID**

  ### Note

  * Responses are paginated and limited to 100 tickers per page. You may specify the page number using the `page` params to retrieve the tickers accordingly.
  * `order=base_target` sorts tickers by `base` symbol, then `target` symbol, in lexicographical order (`0 -> 9`, followed by `a -> z`).\
    This sorting method ensures stable pagination results, minimizing cases where cached responses might otherwise cause duplicate or missing tickers across paginated pages.
  * When `dex_pair_format=symbol`, the DEX pair `base` and `target` are displayed in symbol format (e.g. `WETH`, `USDC`) instead of as contract addresses.
  * Cache / Update Frequency: every 60 seconds for all the API plans.

# Exchange Volume Chart by ID
Source: https://docs.coingecko.com/reference/exchanges-id-volume-chart

reference/api-reference/coingecko-pro.json get /exchanges/\{id\}/volume_chart
This endpoint allows you to **query the historical volume chart data with time in UNIX and trading volume data in BTC based on exchange's ID**

  ### Note

  * You can use this endpoint to query the historical volume chart data of **derivatives exchanges** as well.
  * The exchange volume in the response is provided in BTC. To convert it to other currencies, please use [/exchange\_rates](https://docs.coingecko.com/reference/exchange-rates) endpoint.
  * Data granularity is automatic (cannot be adjusted):
    * 1 day = 10-minutely
    * 7, 14 days = hourly
    * 30 days & above = daily
  * Cache / Update Frequency: every 60 seconds for all the API plans.

# 💼 Exchange Volume Chart within Time Range by ID
Source: https://docs.coingecko.com/reference/exchanges-id-volume-chart-range

reference/api-reference/coingecko-pro.json get /exchanges/\{id\}/volume_chart/range
This endpoint allows you to **query the historical volume chart data in BTC by specifying date range in UNIX based on exchange's ID**

  ### Note

  * You can query the historical volume chart data of **derivatives exchanges** with this endpoint as well.
  * The data interval for this endpoint is fixed at daily.
  * The date range between `from` and `to` must be within 31 days.
  * Cache/Update Frequency: 5 minutes
  * Exclusive for Paid Plan Subscribers (Analyst, Lite, Pro and Enterprise)

# Exchanges List (ID Map)
Source: https://docs.coingecko.com/reference/exchanges-list

reference/api-reference/coingecko-pro.json get /exchanges/list
This endpoint allows you to **query all the exchanges with ID and name**

  ### Tips

  * You may use this endpoint to query the list of exchanges including **derivatives exchanges** for other endpoints that contain params like `id`(exchange ID).

  ### Note

  * There is no pagination required for this endpoint.
  * Cache / Update Frequency:  every 5 minutes for all the API plans.

# Global DeFi Market Data
Source: https://docs.coingecko.com/reference/global-defi

reference/api-reference/coingecko-pro.json get /global/decentralized_finance_defi
This endpoint allows you **query top 100 cryptocurrency global decentralized finance (DeFi) data including DeFi market cap, trading volume**

# 💼 Global Market Cap Chart Data
Source: https://docs.coingecko.com/reference/global-market-cap-chart

reference/api-reference/coingecko-pro.json get /global/market_cap_chart
This endpoint allows you to **query historical global market cap and volume data by number of days away from now**

  ### Note

  * CoinGecko equivalent page: [https://www.coingecko.com/en/global-charts](https://www.coingecko.com/en/global-charts).
  * Data Granularity (auto):
    * 1 day from now = **hourly** data
    * 2 days & above from now = **daily** data
  * Exclusive for all Paid Plan Subscribers (Analyst, Lite, Pro and Enterprise).
  * The last completed UTC day (00:00) is available 5 minutes after midnight on the next UTC day (00:05). The cache will **always expire at 00:05 UTC**. If you wish to get the latest daily data (00:00 UTC), you can make request at 00:05 UTC or later.
  * Cache / Update Frequency: every 1 minute.

# New Pools List
Source: https://docs.coingecko.com/reference/latest-pools-list

reference/api-reference/onchain-pro.json get /networks/new_pools
This endpoint allows you to **query all the latest pools across all networks on GeckoTerminal**

  ### Tips

  * You may include values such as `page` to specify which page of responses you would like to show.

  ### Note

  * If the token's market cap is not verified by the team, the API response will return `null` for its market cap value, even though it has a displayed value on GeckoTerminal, which might not be accurate as it often matches the Fully Diluted Valuation (FDV).
  * Attributes specified in the `include` param will be returned under the top-level "included" key.
  * This endpoint returns up to 20 pools per page. Use the `page` param to navigate more results.
  * `page`: Pagination beyond 10 pages is available for [Paid Plan](https://www.coingecko.com/en/api/pricing) subscribers (Analyst plan or above).
  * Cache/Update frequency: every 30 seconds.
  * GeckoTerminal equivalent page (example): [https://www.geckoterminal.com/explore/new-crypto-pools](https://www.geckoterminal.com/explore/new-crypto-pools)

# New Pools by Network
Source: https://docs.coingecko.com/reference/latest-pools-network

reference/api-reference/onchain-pro.json get /networks/\{network\}/new_pools
This endpoint allows you to **query all the latest pools based on provided network**

  ### Tips

  * You may include values such as `page` to specify which page of responses you would like to show.

  ### Note

  * This endpoint includes the newly created pools in the past 48 hours.
  * If the token's market cap is not verified by the team, the API response will return `null` for its market cap value, even though it has a displayed value on GeckoTerminal, which might not be accurate as it often matches the Fully Diluted Valuation (FDV).
  * Attributes specified in the `include` param will be returned under the top-level "included" key.
  * This endpoint returns up to 20 pools per page. Use the `page` param to navigate more results.
  * `page`: Pagination beyond 10 pages is available for [Paid Plan](https://www.coingecko.com/en/api/pricing) subscribers (Analyst plan or above).
  * Cache/Update frequency: every 30 seconds.
  * GeckoTerminal equivalent page (example): [https://www.geckoterminal.com/explore/new-crypto-pools/solana](https://www.geckoterminal.com/explore/new-crypto-pools/solana)

# Supported Networks List (ID Map)
Source: https://docs.coingecko.com/reference/networks-list

reference/api-reference/onchain-pro.json get /networks
This endpoint allows you to **query all the supported networks on GeckoTerminal**

  ### Tips

  * You may use this endpoint to query the list of networks with network ID for other endpoints that contain params like `network`.
  * You may include values such as `page` to specify which page of responses you would like to show.

# NFTs Collection Data by Contract Address
Source: https://docs.coingecko.com/reference/nfts-contract-address

reference/api-reference/coingecko-pro.json get /nfts/\{asset_platform_id\}/contract/\{contract_address\}
This endpoint allows you to **query all the NFT data (name, floor price, 24hr volume ...) based on the NFT collection contract address and respective asset platform**

  ### Tips

  * You may also obtain the asset platform ID and contract address through [/nfts/list](https://docs.coingecko.com/reference/nfts-list) endpoint.

  ### Note

  * Solana NFT & Art Blocks are not supported for this endpoint, please use [/nfts/\\{id\}](https://docs.coingecko.com/reference/nfts-id) endpoint instead.
  * Cache / Update Frequency: every 60 seconds for all the API plans.

# 💼 NFTs Collection Historical Chart Data by Contract Address
Source: https://docs.coingecko.com/reference/nfts-contract-address-market-chart

reference/api-reference/coingecko-pro.json get /nfts/\{asset_platform_id\}/contract/\{contract_address\}/market_chart
This endpoint allows you **query historical market data of a NFT collection, including floor price, market cap, and 24hr volume, by number of days away from now based on the provided contract address**

  ### Note

  * This endpoint doesn't support Solana NFT and Art Blocks, please use [/nfts/\\{id\}/market\_chart](https://docs.coingecko.com/reference/nfts-id-market-chart) endpoint instead.
  * Data Granularity (auto):
    * 1-14 days from now = **5-minutely** data
    * 15 days & above from now = **daily** data (00:00 UTC)
  * Cache/Update Frequency: every 5 minutes
  * The last completed UTC day (00:00) is available 5 minutes after midnight on the next UTC day (00:05).
  * Exclusive for Paid Plan Subscribers (Analyst, Lite, Pro and Enterprise).

# NFTs Collection Data by ID
Source: https://docs.coingecko.com/reference/nfts-id

reference/api-reference/coingecko-pro.json get /nfts/\{id\}
This endpoint allows you to **query all the NFT data (name, floor price, 24hr volume ...) based on the NFT collection ID**

  ### Note

  * Cache / Update Frequency: every 60 seconds for all the API plans.

# 💼 NFTs Collection Historical Chart Data by ID
Source: https://docs.coingecko.com/reference/nfts-id-market-chart

reference/api-reference/coingecko-pro.json get /nfts/\{id\}/market_chart
This endpoint allows you **query historical market data of a NFT collection, including floor price, market cap, and 24hr volume, by number of days away from now**

  ### Note

  * Data Granularity (auto):
    * 1-14 days from now = **5-minutely** data
    * 15 days & above from now = **daily** data (00:00 UTC)
  * Cache/Update Frequency: every 5 minutes
  * The last completed UTC day (00:00) is available 5 minutes after midnight on the next UTC day (00:05).
  * Exclusive for Paid Plan Subscribers (Analyst, Lite, Pro and Enterprise).

# 💼 NFTs Collection Tickers by ID
Source: https://docs.coingecko.com/reference/nfts-id-tickers

reference/api-reference/coingecko-pro.json get /nfts/\{id\}/tickers
This endpoint allows you to **query the latest floor price and 24hr volume of a NFT collection, on each NFT marketplace, e.g. OpenSea and LooksRare**

  ### Note

  * Cache/Update Frequency: every 30 seconds.
  * Exclusive for Paid Plan Subscribers (Analyst, Lite, Pro and Enterprise).

# NFTs List (ID Map)
Source: https://docs.coingecko.com/reference/nfts-list

reference/api-reference/coingecko-pro.json get /nfts/list
This endpoint allows you to **query all supported NFTs with ID, contract address, name, asset platform ID and symbol on CoinGecko**

  ### Tips

  * You may use this endpoint to query the list of nfts for other endpoints that contain params like `id` (NFT collection's ID) as well as `asset_platform_id` and `contract_address`.
  * You may include values such as `per_page` and `page` to specify how many results you would like to show in the responses per page and which page of responses you would like to show.

  ### Note

  * The responses are paginated to 100 items.
  * Cache / Update Frequency: every 5 minutes for all the API plans.

# 💼 NFTs List with Market Data
Source: https://docs.coingecko.com/reference/nfts-markets

reference/api-reference/coingecko-pro.json get /nfts/markets
This endpoint allows you to **query all the supported NFT collections with floor price, market cap, volume and market related data on CoinGecko**

  ### Tips

  * You may include values such as `per_page` and `page` to specify how many results you would like to show in the responses per page and which page of responses you would like to show.

  ### Note

  * Cache / Update Frequency: every 5 minutes.
  * Exclusive for Paid Plan Subscribers (Analyst, Lite, Pro and Enterprise).
  * CoinGecko equivalent page: [https://www.coingecko.com/en/nft](https://www.coingecko.com/en/nft).
  * Some collection with low liquidity may not be ranked by Market Cap value, learn more [here](https://support.coingecko.com/hc/en-us/articles/37226121227545-What-is-NFT-Market-Cap). Sorting by Mcap ranking will first prioritise Market Cap value of liquid NFT collections, then followed by trading volume of illiquid NFT collections.

# Token Price by Token Addresses
Source: https://docs.coingecko.com/reference/onchain-simple-price

reference/api-reference/onchain-pro.json get /simple/networks/\{network\}/token_price/\{addresses\}
This endpoint allows you to **get token price based on the provided token contract address on a network**

  ### Note

  * If the token's market cap is not verified by the team, the API response will return `null` for its market cap value, even though it has a displayed value on GeckoTerminal, which might not be accurate as it often matches the Fully Diluted Valuation (FDV).
    * If you require `market_cap_usd` to return FDV value (as seen in [GeckoTerminal.com](https://www.geckoterminal.com/)) when market cap data is unavailable, please specify this parameter `mcap_fdv_fallback=true`.
  * The returned price currency is in USD.
  * Addresses not found in GeckoTerminal will be ignored.
  * This endpoint allows querying **up to 100 contract addresses** per request. This limit is exclusive for [paid plan](https://www.coingecko.com/en/api/pricing) subscribers (Analyst plan & above).
  * When using this endpoint, GeckoTerminal's routing decides the best pool for token price. The price source may change based on liquidity and pool activity. For full control over the price, you may use [`/networks/\{network\}/pools/\{address\}`](https://docs.coingecko.com/reference/pool-address) endpoint by providing a specific pool address.
  * Cache/Update Frequency: every 10 seconds for Pro API (Analyst, Lite, Pro, Enterprise).

# Check API server status
Source: https://docs.coingecko.com/reference/ping-server

reference/api-reference/coingecko-pro.json get /ping
This endpoint allows you to **check the API server status**

  ### Note

  * You can also go to [status.coingecko.com](https://status.coingecko.com/) to check the API server status and further maintenance notices.

# Specific Pool Data by Pool Address
Source: https://docs.coingecko.com/reference/pool-address

reference/api-reference/onchain-pro.json get /networks/\{network\}/pools/\{address\}
This endpoint allows you to **query the specific pool based on the provided network and pool address**

  ### Note

  * Address not found in GeckoTerminal will be ignored.
  * If the token's market cap is not verified by the team, the API response will return `null` for its market cap value, even though it has a displayed value on GeckoTerminal, which might not be accurate as it often matches the Fully Diluted Valuation (FDV).
  * Market Cap can be verified by and sourced from CoinGecko, and the number may be higher than FDV as it may include Market Cap of tokens issued on other blockchain network.
  * Attributes specified in the `include` param will be returned under the top-level "included" key.
  * `locked_liquidity_percentage` will be updated on daily basis.
  * Set `include_composition=true` to surface the balance and liquidity value of the pool's base and quote tokens.
  * Pools on a bonding curve (e.g. non-graduated pools from launchpads) will return `launchpad_details` object with their graduation status and migration details.
  * Cache/Update Frequency: every 10 seconds for Pro API (Analyst, Lite, Pro, Enterprise).

# Pool OHLCV chart by Pool Address
Source: https://docs.coingecko.com/reference/pool-ohlcv-contract-address

reference/api-reference/onchain-pro.json get /networks/\{network\}/pools/\{pool_address\}/ohlcv/\{timeframe\}
This endpoint allows you to **get the OHLCV chart (Open, High, Low, Close, Volume) of a pool based on the provided pool address on a network**

  ### Tips

  * You may use this endpoint to query the historical price and volume of a token.
  * You may select the timeframe with its respective aggregate to get the intended OHLCV data (e.g. `minute?aggregate=15` for 15 minutes OHLCV).

  ### Note

  * This endpoint uses epoch/unix format for its timestamp. Example: `1708850449`.
  * [Paid plan](https://www.coingecko.com/en/api/pricing) subscribers (Analyst plan & above) can access data from **September 2021 to the present**, depending on when the pool started tracking on GeckoTerminal.
    * If no earlier data is available, an empty response will be returned.
    * Each API call can only retrieve data for a **maximum range of 6 months**. To fetch older data, use the `before_timestamp` parameter to query in multiple requests.
  * Pools with more than 2 tokens are not yet supported for this endpoint.
  * Each OHLCV array (under "ohlcv\_list") consists of 6 elements in the following order:
    * Timestamp: The epoch/unix timestamp representing the start of the time interval.
    * Open: The opening price of the asset at the beginning of the interval.
    * High: The highest price reached during the interval.
    * Low: The lowest price reached during the interval.
    * Close: The price of the asset at the end of the interval.
    * Volume: The total trading volume of the asset during the interval.
  * **Skipped Intervals**: To ensure concise and relevant data, specific timeframe intervals (e.g. minutely) with no recorded swaps are **excluded** from the response.
    * Higher granularity timeframes (e.g. 1 minute) are more likely to skip intervals due to periods of inactivity, while lower granularity timeframes (e.g. daily) are less affected.
  * For `include_empty_intervals` param:
    * When `false` (default): Only intervals with trade data are returned.
    * When `true`: All requested intervals are returned, those with no trade data are populated as follows:
      * OHLC (Open, High, Low, Close) are all set to the Close price of the previous interval.
        * *O = H = L = C = previous Close*
      * Volume (V) is set to 0, reflecting no trade activity.
  * Cache/Update Frequency: every 10 seconds for Pro API (Analyst, Lite, Pro, Enterprise).

# Pool Tokens Info by Pool Address
Source: https://docs.coingecko.com/reference/pool-token-info-contract-address

reference/api-reference/onchain-pro.json get /networks/\{network\}/pools/\{pool_address\}/info
This endpoint allows you to **query pool metadata (base and quote token details, image, socials, websites, description, contract address, etc.) based on a provided pool contract address on a network**

  ### Tips

  * If you would like to query pool data such as price, transactions, volume and etc. You can go to this endpoint [`/networks/\{network\}/pools/\{address\}`](https://docs.coingecko.com/reference/pool-address) instead.
  * Cache/Update frequency: every 60 seconds.
  * Learn more about GT score [here](https://support.coingecko.com/hc/en-us/articles/38381394237593-What-is-GT-Score-How-is-GT-Score-calculated).
  * Metadata (image, websites, description, socials) may be sourced on-chain and is not vetted by the CoinGecko team. If you wish to get metadata reviewed by CoinGecko team, you may use the following endpoints:
    * [Coin Data by ID](https://docs.coingecko.com/reference/coins-id)
    * [Coin Data by Token Address](https://docs.coingecko.com/reference/coins-contract-address)

  ### Note

  * `holders` data is currently in Beta, with ongoing improvements to data quality, coverage, and update frequency.
    * Supported chains include: Solana, EVM (Ethereum, Polygon, BNB, Arbitrum, Optimism, Base), Sui, TON, and Ronin.
    * `distribution_percentage` coverage:
      * Solana: `top_10`, `11_20`, `21_40`, `rest`
      * Other chains: `top_10`, `11_30`, `31_50`, `rest`
  * For tokens on a bonding curve (i.e. non-graduated tokens from launchpads), the response will include a `launchpad_details` object containing their graduation status and details.

# Past 24 Hour Trades by Pool Address
Source: https://docs.coingecko.com/reference/pool-trades-contract-address

reference/api-reference/onchain-pro.json get /networks/\{network\}/pools/\{pool_address\}/trades
This endpoint allows you to **query the last 300 trades in the past 24 hours based on the provided pool address**

  ### Note

  * Cache/Update Frequency: every 10 seconds for Pro API (Analyst, Lite, Pro, Enterprise).

# Multiple Pools Data by Pool Addresses
Source: https://docs.coingecko.com/reference/pools-addresses

reference/api-reference/onchain-pro.json get /networks/\{network\}/pools/multi/\{addresses\}
This endpoint allows you to **query multiple pools based on the provided network and pool address**

  ### Note

  * Addresses not found in GeckoTerminal will be ignored.
  * If the token's market cap is not verified by the team, the API response will return `null` for its market cap value, even though it has a displayed value on GeckoTerminal, which might not be accurate as it often matches the Fully Diluted Valuation (FDV).
  * This endpoint allows querying **up to 50 contract addresses** per request. This limit is exclusive for [paid plan](https://www.coingecko.com/en/api/pricing) subscribers (Analyst plan & above).
  * Market Cap can be verified by and sourced from CoinGecko, and the number may be higher than FDV as it may include Market Cap of tokens issued on other blockchain network.
  * Attributes specified in the `include ` params will be included under the "included" key at the top level.
  * `locked_liquidity_percentage` will be updated on daily basis.
  * Set `include_composition=true` to surface the balance and liquidity value of the pool's base and quote tokens.
  * Pools on a bonding curve (e.g. non-graduated pools from launchpads) will return `launchpad_details` object with their graduation status and migration details.
  * Cache/Update Frequency: every 10 seconds for Pro API (Analyst, Lite, Pro, Enterprise).

# 💼 Pools by Category ID
Source: https://docs.coingecko.com/reference/pools-category

reference/api-reference/onchain-pro.json get /categories/\{category_id\}/pools
This endpoint allows you to **query all the pools based on the provided category ID**

  ### Tips

  * You can retrieve full list of categories id via this endpoint: [Categories List](https://docs.coingecko.com/reference/categories-list).
  * You can retrieve tokens of a specific category, by flagging `include=base_token`.
  * GeckoTerminal categories are different from [CoinGecko categories](https://docs.coingecko.com/reference/coins-categories-list).

  ### Note

  * Trending rankings are determined by a combination of factors:
    * User engagement on geckoterminal.com
    * Market activity, such as trading volume and transactions
    * Pool security and credibility, including liquidity and honeypot checks
  * This endpoint returns up to 20 pools per page. Use the `page` param to navigate more results.
  * `page`: Pagination beyond 10 pages is available for [Paid Plan](https://www.coingecko.com/en/api/pricing) subscribers (Analyst plan or above).
  * GeckoTerminal equivalent page example: [https://www.geckoterminal.com/category/pump-fun](https://www.geckoterminal.com/category/pump-fun)
  * Cache/Update frequency: every 30 seconds.
  * Exclusive for all Paid Plan Subscribers (Analyst, Lite, Pro and Enterprise).

# 🔥 Megafilter for Pools
Source: https://docs.coingecko.com/reference/pools-megafilter

reference/api-reference/onchain-pro.json get /pools/megafilter
This endpoint allows you to **query pools based on various filters across all networks on GeckoTerminal**

  ### Tips

  * Using `checks` param to filter pools based on various checks:
    * `checks=no_honeypot` — Filter out Honeypot pools, using GoPlus Token Security and De.Fi Scanner.
    * `checks=good_gt_score` — Show only pools with a GT Score of at least 75.
    * `checks=on_coingecko` — Show only pools with tokens that are listed on CoinGecko.
    * `checks=has_social` — Show only pools with their social links and token information updated.
  * You may include values such as `page` to specify which page of responses you would like to show.

  ### Note

  * Trending rankings are determined by a combination of factors:
    * User engagement on geckoterminal.com
    * Market activity, such as trading volume and transactions
    * Pool security and credibility, including liquidity and honeypot checks
  * `dexes` param can only be used when **only 1`networks`** is specified.
  * If the token's market cap is not verified by the team, the API response will return `null` for its market cap value, even though it has a displayed value on GeckoTerminal, which might not be accurate as it often matches the Fully Diluted Valuation (FDV).
  * Attributes specified in the `include` param will be returned under the top-level "included" key.
  * This endpoint returns up to 20 pools per page. Use the `page` param to navigate more results.
  * Setting `include_unknown_honeypot_tokens=true` will include tokens with an 'unknown' honeypot status.
    * Please note that this param only takes effect when `checks=no_honeypot` is specified.
  * Cache/Update frequency: every 30 seconds.
  * 💼 Exclusive for [Paid Plan](https://www.coingecko.com/en/api/pricing) subscribers (Analyst plan or above).

# Crypto Treasury Holdings by Entity ID
Source: https://docs.coingecko.com/reference/public-treasury-entity

reference/api-reference/coingecko-pro.json get /public_treasury/\{entity_id\}
This endpoint allows you **query public companies & governments' cryptocurrency holdings** by Entity ID

  ### Note

  * CoinGecko equivalent page: [https://www.coingecko.com/en/treasuries/bitcoin](https://www.coingecko.com/en/treasuries/bitcoin)
  * Cache / Update Frequency: every 5 minutes for all the API plans.

# Search Queries
Source: https://docs.coingecko.com/reference/search-data

reference/api-reference/coingecko-pro.json get /search
This endpoint allows you to **search for coins, categories and markets listed on CoinGecko**

  ### Note

  * The responses are sorted in descending order by market cap.
  * Cache / Update Frequency: every 15 minutes for all the API plans.

# Search Pools
Source: https://docs.coingecko.com/reference/search-pools

reference/api-reference/onchain-pro.json get /search/pools
This endpoint allows you to **search for pools on a network**

  ### Tips

  * You may use this endpoint to search for query such as pool contract address, token contract address or token symbol. The endpoint will return matching pools as response.
  * You may include values such as `page` to specify which page of responses you would like to show.

  ### Note

  * If the token's market cap is not verified by the team, the API response will return `null` for its market cap value, even though it has a displayed value on GeckoTerminal, which might not be accurate as it often matches the Fully Diluted Valuation (FDV).
  * Attributes specified in the `include` param will be returned under the top-level "included" key.
  * This endpoint returns up to 20 pools per page. Use the `page` param to navigate more results.
  * `page`: Pagination beyond 10 pages is available for [Paid Plan](https://www.coingecko.com/en/api/pricing) subscribers (Analyst plan or above).
  * Cache/Update frequency: every 30 seconds.

# Coin Price by IDs
Source: https://docs.coingecko.com/reference/simple-price

reference/api-reference/coingecko-pro.json get /simple/price
This endpoint allows you to **query the prices of one or more coins by using their unique Coin API IDs**

  ### Tips

  * You may obtain the coin ID (API ID) via several ways:
    * refers to respective coin page and find 'API ID'.
    * refers to [`/coins/list`](https://docs.coingecko.com/reference/coins-list) endpoint.
    * refers to Google Sheets [here](https://docs.google.com/spreadsheets/d/1wTTuxXt8n9q7C4NDXqQpI3wpKu1_5bGVmP9Xz0XGSyU/edit?usp=sharing).
  * You can retrieve specific coins using their unique `ids`, `names`, or `symbols`.
  * You may flag to include more data such as market cap, 24hr volume, 24hr change, last updated time etc.
  * To verify if a price is stale, you may flag `include_last_updated_at=true` in your request to obtain the latest updated time. Alternatively, you may flag `include_24hr_change=true` to determine if it returns a `null` value.

  ### Note

  * You may cross-check the price on [CoinGecko](https://www.coingecko.com) and learn more about our price methodology [here](https://www.coingecko.com/en/methodology).
  * When multiple lookup params are provided, the following priority order is applied: `ids` (highest) > `names` > `symbols` (lowest).
  * When searching by `name`, you need to URL-encode any spaces (e.g. "Binance Coin" becomes "Binance%20Coin").
  * The `include_tokens=all` param is exclusively for use with the `symbols` lookup and is limited to maximum of 50 symbols per request.
  * Wildcard searches are not supported for lookup params (`ids`, `names`, `symbols`).
  * Cache/Update Frequency: every 20 seconds for Pro API (Analyst, Lite, Pro, Enterprise).

# Supported Currencies List
Source: https://docs.coingecko.com/reference/simple-supported-currencies

reference/api-reference/coingecko-pro.json get /simple/supported_vs_currencies
This endpoint allows you to **query all the supported currencies on CoinGecko**

  ### Tips

  * You may use this endpoint to query the list of currencies for other endpoints that contain params like `vs_currencies`.

  ### Note

  * Cache/Update Frequency: every 30 seconds for Pro API (Analyst, Lite, Pro, Enterprise).

# Coin Price by Token Addresses
Source: https://docs.coingecko.com/reference/simple-token-price

reference/api-reference/coingecko-pro.json get /simple/token_price/\{id\}
This endpoint allows you to **query one or more token prices using their token contract addresses**

  ### Tips

  * You may obtain the asset platform and contract address via several ways:
    * refers to respective coin page and find 'contract address'.
    * refers to [`/coins/list`](https://docs.coingecko.com/reference/coins-list) endpoint (`include platform = true`).
  * You may flag to include more data such as market cap, 24hr volume, 24hr change, last updated time etc.

  ### Note

  * The endpoint returns the global average price of the coin that is aggregated across all active exchanges on CoinGecko.
  * You may cross-check the price on [CoinGecko](https://www.coingecko.com) and learn more about our price methodology [here](https://www.coingecko.com/en/methodology).
  * Cache/Update Frequency: every 20 seconds for Pro API (Analyst, Lite, Pro, Enterprise).

# Token Data by Token Address
Source: https://docs.coingecko.com/reference/token-data-contract-address

reference/api-reference/onchain-pro.json get /networks/\{network\}/tokens/\{address\}
This endpoint allows you to **query specific token data based on the provided token contract address on a network**

  ### Tips

  * You may add values such as `top_pools` in the include param to include top pools along with the pools information.
  * If you would like to query token information such as socials, websites, description and etc. You can go to this endpoint [`/networks/\{network\}/tokens/\{address\}/info`](https://docs.coingecko.com/reference/token-info-contract-address) instead.

  ### Note

  * Address not found in GeckoTerminal.com will be ignored.
  * The endpoint will only return the first top most liquid pool for each token. The top pool is determined through a combination of two key factors: liquidity (`reserve_in_usd`) and 24-Hour Trading Volume (`volume_usd`)
  * If the token's market cap is not verified by the team, the API response will return `null` for its market cap value, even though it has a displayed value on GeckoTerminal, which might not be accurate as it often matches the Fully Diluted Valuation (FDV).
  * Market Cap can be verified by and sourced from CoinGecko, and the number may be higher than FDV as it may include Market Cap of tokens issued on other blockchain network.
  * Attributes specified in the `include` param will be returned under the top-level "included" key.
  * Set `include_composition=true` to surface the balance and liquidity value of the pool's base and quote tokens. (requires `include=top_pools`)
  * For tokens on a bonding curve (i.e. non-graduated tokens from launchpads), the response will include a `launchpad_details` object containing their graduation status and details.
  * Cache/Update Frequency: every 10 seconds for Pro API (Analyst, Lite, Pro, Enterprise).

# 💼 Historical Token Holders Chart by Token Address
Source: https://docs.coingecko.com/reference/token-holders-chart-token-address

reference/api-reference/onchain-pro.json get /networks/\{network\}/tokens/\{token_address\}/holders_chart
This endpoint allows you to **get the historical token holders chart based on the provided token contract address on a network**

  ### Note

  * The historical token holders chart data is currently in Beta, with ongoing improvements to data quality, coverage, and update frequency.
  * Supported chains include: Solana, EVM (Ethereum, Polygon, BNB, Arbitrum, Optimism, Base), Sui, TON, and Ronin.
  * `days` param provides the following automatic granularity:
    * `days=7` = **all data** (without fixed intervals)
    * `days=30` = **daily data** (30 daily intervals)
    * `days=max` = **weekly data**
  * 💼 Exclusive for Paid Plan subscribers (Analyst plan or above).
  * Cache/Update frequency: every 60 seconds.

# Token Info by Token Address
Source: https://docs.coingecko.com/reference/token-info-contract-address

reference/api-reference/onchain-pro.json get /networks/\{network\}/tokens/\{address\}/info
This endpoint allows you to **query token metadata (name, symbol,  CoinGecko ID, image, socials, websites, description, etc.) based on a provided token contract address on a network**

  ### Tips

  * If you would like to query token data such as decimals, total supply, price and etc. You can go to this endpoint [`/networks/\{network\}/tokens/\{address\}`](https://docs.coingecko.com/reference/token-data-contract-address) instead.
  * Cache/Update frequency: every 60 seconds.
  * Learn more about GT score [here](https://support.coingecko.com/hc/en-us/articles/38381394237593-What-is-GT-Score-How-is-GT-Score-calculated).
  * Metadata (image, websites, description, socials) may be sourced on-chain and is not vetted by the CoinGecko team. If you wish to get metadata reviewed by CoinGecko team, you may use the following endpoints:
    * [Coin Data by ID](https://docs.coingecko.com/reference/coins-id)
    * [Coin Data by Token Address](https://docs.coingecko.com/reference/coins-contract-address)

  ### Note

  * `holders` data is currently in Beta, with ongoing improvements to data quality, coverage, and update frequency.
    * Supported chains include: Solana, EVM (Ethereum, Polygon, BNB, Arbitrum, Optimism, Base), Sui, TON, and Ronin.
    * `distribution_percentage` coverage:
      * Solana: `top_10`, `11_20`, `21_40`, `rest`
      * Other chains: `top_10`, `11_30`, `31_50`, `rest`
  * For tokens on a bonding curve (i.e. non-graduated tokens from launchpads), the response will include a `launchpad_details` object containing their graduation status and details.

# Token Lists by Asset Platform ID
Source: https://docs.coingecko.com/reference/token-lists

reference/api-reference/coingecko-pro.json get /token_lists/\{asset_platform_id\}/all.json
This endpoint allows you to **get full list of tokens of a blockchain network (asset platform) that is supported by [Ethereum token list standard](https://tokenlists.org/)**

  ### Note

  * Cache/Update Frequency: 5 minutes.
  * A token will only be included in the list if the contract address is added by CoinGecko team. If you identified any missing token, you may submit a request [here](https://support.coingecko.com/hc/en-us/requests/new).

# 💼 Token OHLCV chart by Token Address
Source: https://docs.coingecko.com/reference/token-ohlcv-token-address

reference/api-reference/onchain-pro.json get /networks/\{network\}/tokens/\{token_address\}/ohlcv/\{timeframe\}
This endpoint allows you to **get the OHLCV chart (Open, High, Low, Close, Volume) of a token based on the provided token address on a network**

  ### Note

  * This endpoint will return OHLCV data of the **most liquid pool** of the specified token. You may use this endpoint [Top Pools by Token Address](https://docs.coingecko.com/update/reference/top-pools-contract-address#/) to check the top pools of a token.
  * This endpoint uses epoch/unix format for its timestamp. Example: `1708850449`.
  * [Paid plan](https://www.coingecko.com/en/api/pricing) subscribers (Analyst plan & above) can access data from **September 2021 to the present**, depending on when the pool started tracking on GeckoTerminal.
    * If no earlier data is available, an empty response will be returned.
    * Each API call can only retrieve data for a **maximum range of 6 months**. To fetch older data, use the `before_timestamp` parameter to query in multiple requests.
  * Pools with more than 2 tokens are not yet supported for this endpoint.
  * Each OHLCV array (under "ohlcv\_list") consists of 6 elements in the following order:
    * Timestamp: The epoch/unix timestamp representing the start of the time interval.
    * Open: The opening price of the asset at the beginning of the interval.
    * High: The highest price reached during the interval.
    * Low: The lowest price reached during the interval.
    * Close: The price of the asset at the end of the interval.
    * Volume: The total trading volume of the asset during the interval.
  * **Skipped Intervals**: To ensure concise and relevant data, specific timeframe intervals (e.g. minutely) with no recorded swaps are **excluded** from the response.
    * Higher granularity timeframes (e.g. 1 minute) are more likely to skip intervals due to periods of inactivity, while lower granularity timeframes (e.g. daily) are less affected.
  * For `include_empty_intervals` param:
    * When `false` (default): Only intervals with trade data are returned.
    * When `true`: All requested intervals are returned, those with no trade data are populated as follows:
      * OHLC (Open, High, Low, Close) are all set to the Close price of the previous interval.
        * *O = H = L = C = previous Close*
      * Volume (V) is set to 0, reflecting no trade activity.
  * Cache/Update Frequency: every 10 seconds for Pro API (Analyst, Lite, Pro, Enterprise).

# 💼 Past 24 Hour Trades by Token Address
Source: https://docs.coingecko.com/reference/token-trades-contract-address

reference/api-reference/onchain-pro.json get /networks/\{network\}/tokens/\{token_address\}/trades
This endpoint allows you to **query the last 300 trades in the past 24 hours, across all pools, based on the provided token contract address on a network**

  ### Note

  * Exclusive for all [Paid Plan](https://www.coingecko.com/en/api/pricing) Subscribers (Analyst, Lite, Pro and Enterprise).
  * Cache/Update Frequency: every 10 seconds for Pro API (Analyst, Lite, Pro, Enterprise).

# Tokens Data by Token Addresses
Source: https://docs.coingecko.com/reference/tokens-data-contract-addresses

reference/api-reference/onchain-pro.json get /networks/\{network\}/tokens/multi/\{addresses\}
This endpoint allows you to **query multiple tokens data based on the provided token contract addresses on a network**

  ### Tips

  * You may add values such as `top_pools` in the include param to include top pools along with the pools information.
  * If you would like to query token information such as socials, websites, description and etc. You can go to this endpoint [`/networks/\{network\}/tokens/\{address\}/info`](https://docs.coingecko.com/reference/token-info-contract-address) instead.

  ### Note

  * Addresses not found in GeckoTerminal.com will be ignored.
  * This endpoint allows querying **up to 50 contract addresses** per request. This limit is exclusive for [paid plan](https://www.coingecko.com/en/api/pricing) subscribers (Analyst plan & above).
  * The endpoint will only return the first top most liquid pool for each token. The top pool is determined through a combination of two key factors: liquidity (`reserve_in_usd`) and 24-Hour Trading Volume (`volume_usd`).
  * If the token's market cap is not verified by the team, the API response will return `null` for its market cap value, even though it has a displayed value on GeckoTerminal, which might not be accurate as it often matches the Fully Diluted Valuation (FDV).
  * Market Cap can be verified by and sourced from CoinGecko, and the number may be higher than FDV as it may include Market Cap of tokens issued on other blockchain network.
  * Attributes specified in the `include` param will be returned under the top-level "included" key.
  * Set `include_composition=true` to surface the balance and liquidity value of the pool's base and quote tokens. (requires `include=top_pools`)
  * For tokens on a bonding curve (i.e. non-graduated tokens from launchpads), the response will include a `launchpad_details` object containing their graduation status and details.
  * Cache/Update Frequency: every 10 seconds for Pro API (Analyst, Lite, Pro, Enterprise).

# Most Recently Updated Tokens List
Source: https://docs.coingecko.com/reference/tokens-info-recent-updated

reference/api-reference/onchain-pro.json get /tokens/info_recently_updated
This endpoint allows you to **query 100 most recently updated tokens info of a specific network or across all networks on GeckoTerminal**

  ### Tips

  * You may add values such as network in the include param to include network along with the updated tokens list.

  ### Note

  * Attributes specified in the `include` param will be returned under the top-level "included" key.
  * Cache/Update frequency: every 30 seconds.

# Top Pools by Token Address
Source: https://docs.coingecko.com/reference/top-pools-contract-address

reference/api-reference/onchain-pro.json get /networks/\{network\}/tokens/\{token_address\}/pools
This endpoint allows you to **query top pools based on the provided token contract address on a network**

  ### Tips

  * You may include values such as `page` to specify which page of responses you would like to show.

  ### Note

  * The ranking of the top 20 pools is established by evaluating their liquidity and trading activity to identify the most liquid ones. This ranking is determined through a combination of two key factors: liquidity (`reserve_in_usd`) and 24-Hour Trading Volume (`volume_usd`).
  * If the token's market cap is not verified by the team, the API response will return `null` for its market cap value, even though it has a displayed value on GeckoTerminal, which might not be accurate as it often matches the Fully Diluted Valuation (FDV).
  * Attributes specified in the `include` param will be returned under the top-level "included" key.
  * This endpoint returns up to 20 pools per page. Use the `page` param to navigate more results.
  * `page`: Pagination beyond 10 pages is available for [Paid Plan](https://www.coingecko.com/en/api/pricing) subscribers (Analyst plan or above).
  * Cache/Update frequency: every 30 seconds.

# Top Pools by Dex
Source: https://docs.coingecko.com/reference/top-pools-dex

reference/api-reference/onchain-pro.json get /networks/\{network\}/dexes/\{dex\}/pools
This endpoint allows you to **query all the top pools based on the provided network and decentralized exchange (DEX)**

  ### Tips

  * You may include values such as `page` to specify which page of responses you would like to show.
  * For more flexibility in retrieving an exact list of pools that match your specific needs, consider using the [/pools/megafilter](https://docs.coingecko.com/reference/pools-megafilter) endpoint.

  ### Note

  * If the token's market cap is not verified by the team, the API response will return `null` for its market cap value, even though it has a displayed value on GeckoTerminal, which might not be accurate as it often matches the Fully Diluted Valuation (FDV).
  * Attributes specified in the `include` param will be returned under the top-level "included" key.
  * This endpoint returns up to 20 pools per page. Use the `page` param to navigate more results.
  * `page`: Pagination beyond 10 pages is available for [Paid Plan](https://www.coingecko.com/en/api/pricing) subscribers (Analyst plan or above).
  * Cache/Update frequency: every 30 seconds.
  * GeckoTerminal equivalent page (example): [https://www.geckoterminal.com/base/uniswap-v3-base/pools?sort=-24h\_transactions](https://www.geckoterminal.com/base/uniswap-v3-base/pools?sort=-24h_transactions)

# Top Pools by Network
Source: https://docs.coingecko.com/reference/top-pools-network

reference/api-reference/onchain-pro.json get /networks/\{network\}/pools
This endpoint allows you to **query all the top pools based on the provided network**

  ### Tips

  * You may include values such as `page` to specify which page of responses you would like to show.
  * For more flexibility in retrieving an exact list of pools that match your specific needs, consider using the [/pools/megafilter](https://docs.coingecko.com/reference/pools-megafilter) endpoint.

  ### Note

  * If the token's market cap is not verified by the team, the API response will return `null` for its market cap value, even though it has a displayed value on GeckoTerminal, which might not be accurate as it often matches the Fully Diluted Valuation (FDV).
  * Attributes specified in the `include` param will be returned under the top-level "included" key.
  * This endpoint returns up to 20 pools per page. Use the `page` param to navigate more results.
  * `page`: Pagination beyond 10 pages is available for [Paid Plan](https://www.coingecko.com/en/api/pricing) subscribers (Analyst plan or above).
  * Cache/Update frequency: every 30 seconds.
  * GeckoTerminal equivalent page (example): [https://www.geckoterminal.com/solana/pools?sort=-24h\_transactions](https://www.geckoterminal.com/solana/pools?sort=-24h_transactions)

# 💼 Top Token Holders by Token Address
Source: https://docs.coingecko.com/reference/top-token-holders-token-address

reference/api-reference/onchain-pro.json get /networks/\{network\}/tokens/\{address\}/top_holders
This endpoint allows you to **query top token holders based on the provided token contract address on a network**

  ### Note

  * The top holders data is currently in **Beta**, with ongoing improvements to data quality, coverage, and update frequency.
  * **Supported chains include**: Solana, EVM (Ethereum, Polygon, BNB, Arbitrum, Optimism, Base), Sui, TON, and Ronin.
  * Max `holders` value:
    * Maximum 50 for non-Solana networks, 40 for Solana network.
  * 💼 Exclusive for [Paid Plan](https://www.coingecko.com/en/api/pricing) subscribers (Analyst plan or above).
  * Cache/Update frequency: every 60 seconds.

# Trending Pools List
Source: https://docs.coingecko.com/reference/trending-pools-list

reference/api-reference/onchain-pro.json get /networks/trending_pools
This endpoint allows you to **query all the trending pools across all networks on GeckoTerminal**

  ### Tips

  * You may include values such as `page` to specify which page of responses you would like to show.
  * For more flexibility in retrieving an exact list of pools that match your specific needs, consider using the [/pools/megafilter](https://docs.coingecko.com/reference/pools-megafilter) endpoint.

  ### Note

  * Trending rankings are determined by a combination of factors:
    * User engagement on geckoterminal.com
    * Market activity, such as trading volume and transactions
    * Pool security and credibility, including liquidity and honeypot checks
  * If the token's market cap is not verified by the team, the API response will return `null` for its market cap value, even though it has a displayed value on GeckoTerminal, which might not be accurate as it often matches the Fully Diluted Valuation (FDV).
  * Attributes specified in the `include` param will be returned under the top-level "included" key.
  * This endpoint returns up to 20 pools per page. Use the `page` param to navigate more results.
  * `page`: Pagination beyond 10 pages is available for [Paid Plan](https://www.coingecko.com/en/api/pricing) subscribers (Analyst plan or above).
  * Cache/Update frequency: every 30 seconds.
  * GeckoTerminal equivalent page (example): [https://www.geckoterminal.com](https://www.geckoterminal.com)

# Trending Pools by Network
Source: https://docs.coingecko.com/reference/trending-pools-network

reference/api-reference/onchain-pro.json get /networks/\{network\}/trending_pools
This endpoint allows you to **query the trending pools based on the provided network**

  ### Tips

  * You may include values such as `page` to specify which page of responses you would like to show.
  * For more flexibility in retrieving an exact list of pools that match your specific needs, consider using the [/pools/megafilter](https://docs.coingecko.com/reference/pools-megafilter) endpoint.

  ### Note

  * Trending rankings are determined by a combination of factors:
    * User engagement on geckoterminal.com
    * Market activity, such as trading volume and transactions
    * Pool security and credibility, including liquidity and honeypot checks
  * If the token's market cap is not verified by the team, the API response will return `null` for its market cap value, even though it has a displayed value on GeckoTerminal, which might not be accurate as it often matches the Fully Diluted Valuation (FDV).
  * Attributes specified in the `include` param will be returned under the top-level "included" key.
  * This endpoint returns up to 20 pools per page. Use the `page` param to navigate more results.
  * `page`: Pagination beyond 10 pages is available for [Paid Plan](https://www.coingecko.com/en/api/pricing) subscribers (Analyst plan or above).
  * Cache/Update frequency: every 30 seconds.
  * GeckoTerminal equivalent page (example): [https://www.geckoterminal.com/base/pools](https://www.geckoterminal.com/base/pools)

# Trending Search List
Source: https://docs.coingecko.com/reference/trending-search

reference/api-reference/coingecko-pro.json get /search/trending
This endpoint allows you **query trending search coins, NFTs and categories on CoinGecko in the last 24 hours**

  ### Note

  * The endpoint currently supports:
    * Top 15 trending coins (sorted by the most popular user searches).
    * Top 7 trending NFTs (sorted by the highest percentage change in floor prices).
    * Top 6 trending categories (sorted by the most popular user searches).
  * [Paid plan](https://www.coingecko.com/en/api/pricing) subscribers (Analyst plan & above) can use `show_max` param to retrieve maximum 30 coins, 10 NFTs, and 10 categories.
  * Cache / Update Frequency: every 10 minutes for all the API plans.

# 💼 Trending Search Pools
Source: https://docs.coingecko.com/reference/trending-search-pools

reference/api-reference/onchain-pro.json get /pools/trending_search
This endpoint allows you to **query all the trending search pools across all networks on GeckoTerminal**

  ### Note

  * If the token's market cap is not verified by the team, the API response will return `null` for its market cap value, even though it has a displayed value on GeckoTerminal, which might not be accurate as it often matches the Fully Diluted Valuation (FDV).
  * Attributes specified in the `include` param will be returned under the top-level "included" key.
  * Cache/Update frequency: every 60 seconds.
  * 💼 Exclusive for [Paid Plan](https://www.coingecko.com/en/api/pricing) subscribers (Analyst plan or above).

# Asset Platforms List (ID Map)
Source: https://docs.coingecko.com/v3.0.1/reference/asset-platforms-list

v3.0.1/reference/api-reference/coingecko-demo.json get /asset_platforms
This endpoint allows you to **query all the asset platforms on CoinGecko**

  ### Tips

  * You may use this endpoint to query the list of asset platforms for other endpoints that contain params like `id` or`ids`(asset platforms).
  * You may include NFT at the `filter` params to get the list of NFT-support asset platforms on CoinGecko.

# Authentication (Public/Demo)
Source: https://docs.coingecko.com/v3.0.1/reference/authentication

Authentication method for CoinGecko Public API (Demo plan users)

  ### **Notes**

  * Demo API Key is only available for CoinGecko Public Demo API Plan, the root URL for CoinGecko Public Demo API must be `https://api.coingecko.com/api/v3/`.
  * ⚠️ You are recommended to store the API key securely in your own backend and use a proxy to insert the key into the request URL.
  * The authentication method below is for CoinGecko Public Demo API only. For **paid plan users with Pro-API key**, please refer to [this page](https://docs.coingecko.com/reference/authentication) instead.
  * User Guide: [How to sign up for CoinGecko Demo API and generate an API key?](https://support.coingecko.com/hc/en-us/articles/21880397454233)
  * It's highly recommended to use the **Headers method** when making API requests for better security. Using query string parameters can risk exposing your API key.
