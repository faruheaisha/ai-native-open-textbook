---
title: "Coins Categories List with Market Data"
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
pageSha256: "25ac85f2414cc29406c15f1f97de3d6733a12f5e4dcbb476389ecebbcf9454b9"
contentMode: "local-full"
zh: ""
---

# Coins Categories List with Market Data
Source: https://docs.coingecko.com/v3.0.1/reference/coins-categories

v3.0.1/reference/api-reference/coingecko-demo.json get /coins/categories
This endpoint allows you to **query all the coins categories with market data (market cap, volume, ...) on CoinGecko**

  ### Note

  * CoinGecko Equivalent Page: [https://www.coingecko.com/en/categories](https://www.coingecko.com/en/categories)
  * Cache / Update Frequency: every 5 minutes for all the API plans.

# Coins Categories List (ID Map)
Source: https://docs.coingecko.com/v3.0.1/reference/coins-categories-list

v3.0.1/reference/api-reference/coingecko-demo.json get /coins/categories/list
This endpoint allows you to **query all the coins categories on CoinGecko**

  ### Tips

  * You may use this endpoint to query the list of categories for other endpoints that contain params like `category`.

  ### Note

  * CoinGecko Equivalent Page: [https://www.coingecko.com/en/categories](https://www.coingecko.com/en/categories)
  * Cache / Update Frequency: every 5 minutes for all the API plans.

# Coin Data by Token Address
Source: https://docs.coingecko.com/v3.0.1/reference/coins-contract-address

v3.0.1/reference/api-reference/coingecko-demo.json get /coins/\{id\}/contract/\{contract_address\}
This endpoint allows you to **query all the metadata (image, websites, socials, description, contract address, etc.) and market data (price, ATH, exchange tickers, etc.) of a coin from the CoinGecko coin page based on an asset platform and a particular token contract address**

  ### Notice

  * Please note that the `twitter_followers` data field will no longer be supported by our API starting on May 15, 2025. Please refer to [changelog](https://docs.coingecko.com/changelog#upcoming-change-notice:-removal-of-twitter-followers-data) for more details.

  ### Tips

  * You may obtain the asset platform and contract address via several ways:
    * refers to respective coin page and find 'contract address'.
    * refers to [`/coins/list`](https://docs.coingecko.com/v3.0.1/reference/coins-list) endpoint (`include platform = true`).

  ### Note

  * Coin descriptions may include newline characters represented as `\r\n` (escape sequences), which may require processing for proper formatting.
  * Cache / Update Frequency: every 60 seconds for all the API plans.

# Coin Data by ID
Source: https://docs.coingecko.com/v3.0.1/reference/coins-id

v3.0.1/reference/api-reference/coingecko-demo.json get /coins/\{id\}
This endpoint allows you to **query all the metadata (image, websites, socials, description, contract address, etc.) and market data (price, ATH, exchange tickers, etc.) of a coin from the CoinGecko coin page based on a particular coin ID**

  ### Tips

  * You may obtain the coin `id` (API ID) via several ways:
    * refers to respective coin page and find "API ID".
    * refers to [`/coins/list`](https://docs.coingecko.com/v3.0.1/reference/coins-list) endpoint.
    * refers to Google Sheets [here](https://docs.google.com/spreadsheets/d/1wTTuxXt8n9q7C4NDXqQpI3wpKu1_5bGVmP9Xz0XGSyU/edit?usp=sharing).
  * You may also flag to include more data such as tickers, market data, community data, developer data and sparkline.
  * You may refer to `last_updated` in the endpoint response to check whether the price is stale.

  ### Note

  * Tickers are limited to 100 items, to get more tickers, please go to [/coins/\{id\}/tickers](https://docs.coingecko.com/v3.0.1/reference/coins-id-tickers).
  * Coin descriptions may include newline characters represented as `\r\n` (escape sequences), which may require processing for proper formatting.
  * When `dex_pair_format=symbol`, the DEX pair `base` and `target` are displayed in symbol format (e.g. `WETH`, `USDC`) instead of as contract addresses.
  * Cache/Update Frequency:
    * Every 60 seconds for all the API plans.
    * Community data for Telegram will be updated on weekly basis (Reddit & Twitter community data are no longer supported).

# Coin Historical Data by ID
Source: https://docs.coingecko.com/v3.0.1/reference/coins-id-history

v3.0.1/reference/api-reference/coingecko-demo.json get /coins/\{id\}/history
This endpoint allows you to **query the historical data (price, market cap, 24hrs volume, ...) at a given date for a coin based on a particular coin ID**

  ### Tips

  * You may obtain the coin ID (API ID) via several ways:
    * refers to respective coin page and find 'API ID'.
    * refers to [`/coins/list`](https://docs.coingecko.com/v3.0.1/reference/coins-list) endpoint.
    * refers to Google Sheets [here](https://docs.google.com/spreadsheets/d/1wTTuxXt8n9q7C4NDXqQpI3wpKu1_5bGVmP9Xz0XGSyU/edit?usp=sharing).

  ### Note

  * The data returned is at `00:00:00 UTC`.
  * The last completed UTC day (00:00) is available 35 minutes after midnight on the next UTC day (00:35).
  * Access to historical data via the Public API (Demo plan) is **restricted to the past 365 days** only. To access the complete range of historical data, please subscribe to one of our [paid plans](https://www.coingecko.com/en/api/pricing) to obtain a Pro-API key.

# Coin Historical Chart Data by ID
Source: https://docs.coingecko.com/v3.0.1/reference/coins-id-market-chart

v3.0.1/reference/api-reference/coingecko-demo.json get /coins/\{id\}/market_chart
This endpoint allows you to **get the historical chart data of a coin including time in UNIX, price, market cap and 24hr volume based on particular coin ID**

  ### Tips

  * You may obtain the coin ID (API ID) via several ways:
    * refers to respective coin page and find 'API ID'.
    * refers to [`/coins/list`](https://docs.coingecko.com/v3.0.1/reference/coins-list) endpoint.
    * refers to google sheets [here](https://docs.google.com/spreadsheets/d/1wTTuxXt8n9q7C4NDXqQpI3wpKu1_5bGVmP9Xz0XGSyU/edit?usp=sharing).
  * You may use tools like [epoch converter ](https://www.epochconverter.com) to convert human readable date to UNIX timestamp.

  ### Note

  * You may leave the interval as empty for automatic granularity:
    * 1 day from current time = **5-minutely** data
    * 2 - 90 days from current time = **hourly** data
    * above 90 days from current time = **daily** data (00:00 UTC)
  * Cache / Update Frequency:
    * Every 30 seconds for all the API plans (for last data point).
    * The last completed UTC day (00:00) data is now available **10 minutes after midnight** on the next UTC day (00:10).
  * Access to historical data via the Public API (Demo plan) is **restricted to the past 365 days** only. To access the complete range of historical data, please subscribe to one of our [paid plans](https://www.coingecko.com/en/api/pricing) to obtain a Pro-API key.

# Coin Historical Chart Data within Time Range by ID
Source: https://docs.coingecko.com/v3.0.1/reference/coins-id-market-chart-range

v3.0.1/reference/api-reference/coingecko-demo.json get /coins/\{id\}/market_chart/range
This endpoint allows you to **get the historical chart data of a coin within certain time range in UNIX along with price, market cap and 24hr volume based on particular coin ID**

  ### Tips

  * You may obtain the coin ID (API ID) via several ways:
    * refers to respective coin page and find 'API ID'.
    * refers to [`/coins/list`](https://docs.coingecko.com/v3.0.1/reference/coins-list) endpoint.
    * refers to google sheets [here](https://docs.google.com/spreadsheets/d/1wTTuxXt8n9q7C4NDXqQpI3wpKu1_5bGVmP9Xz0XGSyU/edit?usp=sharing).

  ### Note

  * You may leave the interval params as empty for automatic granularity:
    * 1 day from current time = **5-minutely** data
    * 1 day from any time (except current time) = **hourly** data
    * 2 - 90 days from any time = **hourly** data
    * above 90 days from any time = **daily** data (00:00 UTC)
  * Cache / Update Frequency:\
    Based on days range (all the API plans)
    * 1 day = 30 seconds cache
    * 2 -90 days = 30 minutes cache
    * 90 days = 12 hours cache
  * The last completed UTC day (00:00) is available 35 minutes after midnight on the next UTC day (00:35). The cache will always expire at 00:40 UTC.
  * Access to historical data via the Public API (Demo plan) is **restricted to the past 365 days** only. To access the complete range of historical data, please subscribe to one of our [paid plans](https://www.coingecko.com/en/api/pricing) to obtain a Pro-API key.

# Coin OHLC Chart by ID
Source: https://docs.coingecko.com/v3.0.1/reference/coins-id-ohlc

v3.0.1/reference/api-reference/coingecko-demo.json get /coins/\{id\}/ohlc
This endpoint allows you to **get the OHLC chart (Open, High, Low, Close) of a coin based on particular coin ID**

  ### Tips

  * You may obtain the coin ID (API ID) via several ways:
    * refers to respective coin page and find 'API ID'.
    * refers to [`/coins/list`](https://docs.coingecko.com/v3.0.1/reference/coins-list) endpoint.
    * refers to google sheets [here](https://docs.google.com/spreadsheets/d/1wTTuxXt8n9q7C4NDXqQpI3wpKu1_5bGVmP9Xz0XGSyU/edit?usp=sharing).
  * For historical chart data with better granularity, you may consider using [/coins/\\{id\}/market\_chart](https://docs.coingecko.com/v3.0.1/reference/coins-id-market-chart) endpoint.

  ### Note

  * The timestamp displayed in the payload (response) indicates the end (or close) time of the OHLC data.
  * Data granularity (candle's body) is automatic:
    * 1 - 2 days: 30 minutes
    * 3 - 30 days: 4 hours
    * 31 days and beyond: 4 days
  * Cache / Update Frequency:
    * Every 15 minutes for all the API plans.
    * The last completed UTC day (00:00) is available 35 minutes after midnight on the next UTC day (00:35).
  * Access to historical data via the Public API (Demo plan) is **restricted to the past 365 days** only. To access the complete range of historical data, please subscribe to one of our [paid plans](https://www.coingecko.com/en/api/pricing) to obtain a Pro-API key.

# Coin Tickers by ID
Source: https://docs.coingecko.com/v3.0.1/reference/coins-id-tickers

v3.0.1/reference/api-reference/coingecko-demo.json get /coins/\{id\}/tickers
This endpoint allows you to **query the coin tickers on both centralized exchange (CEX) and decentralized exchange (DEX) based on a particular coin ID**

  ### Tips

  * You may obtain the coin ID (API ID) via several ways:
    * refers to respective coin page and find 'API ID'.
    * refers to [`/coins/list`](https://docs.coingecko.com/v3.0.1/reference/coins-list) endpoint.
    * refers to google sheets [here](https://docs.google.com/spreadsheets/d/1wTTuxXt8n9q7C4NDXqQpI3wpKu1_5bGVmP9Xz0XGSyU/edit?usp=sharing).
  * You may specify the `exchange_ids` if you want to retrieve tickers for specific exchange only.
  * You may include values such as  `page` to specify which page of responses you would like to show.
  * You may also flag to include more data such as exchange logo and depth.

  ### Note

  * The tickers are paginated to 100 items.
  * When `dex_pair_format=symbol`, the DEX pair `base` and `target` are displayed in symbol format (e.g. `WETH`, `USDC`) instead of as contract addresses.
  * When order is sorted by `volume`, ***converted\_volume*** will be used instead of ***volume***.
  * Cache / Update Frequency: every 2 minutes for all the API plans.

# Coins List (ID Map)
Source: https://docs.coingecko.com/v3.0.1/reference/coins-list

v3.0.1/reference/api-reference/coingecko-demo.json get /coins/list
This endpoint allows you to **query all the supported coins on CoinGecko with coins ID, name and symbol**

  ### Tips

  * You may use this endpoint to query the list of coins with coin ID for other endpoints that contain params like `id` or `ids` (coin ID).

  ### Note

  * There is no pagination required for this endpoint.
  * Access to inactive coins via the Public API (Demo plan) is restricted. To access them, please subscribe to one of our paid plans to obtain a Pro-API key.
  * Cache/Update Frequency:
    * Every 30 minutes for Public API.
    * Every 5 minutes for Pro API (Analyst, Lite, Pro, Enterprise).

# Coins List with Market Data
Source: https://docs.coingecko.com/v3.0.1/reference/coins-markets

v3.0.1/reference/api-reference/coingecko-demo.json get /coins/markets
This endpoint allows you to **query all the supported coins with price, market cap, volume and market related data**

  ### Tips

  * You can retrieve specific coins using their unique `ids`, `names`, or `symbols` instead of returning the whole list.
  * To filter results based on the coin's category, use the `category` param (refer to [`/coins/categories/list`](https://docs.coingecko.com/v3.0.1/reference/coins-categories-list) for available categories).
  * Use the `per_page` and `page` params to manage the number of results you receive and navigate through the data.

  ### Note

  * When multiple lookup params are provided, the following priority order is applied: `category` (highest) > `ids` > `names` > `symbols` (lowest).
  * When searching by `name`, you need to URL-encode any spaces (e.g. "Binance Coin" becomes "Binance%20Coin").
  * The `include_tokens=all` param is exclusively for use with the `symbols` lookup and is limited to maximum of 50 symbols per request.
  * Wildcard searches are not supported for lookup params (`ids`, `names`, `symbols`).
  * Cache/Update Frequency:
    * Every 60 seconds for Public API.
    * Every 45 seconds for Pro API (Analyst, Lite, Pro, Enterprise).

# Crypto Treasury Holdings by Coin ID
Source: https://docs.coingecko.com/v3.0.1/reference/companies-public-treasury

v3.0.1/reference/api-reference/coingecko-demo.json get /\{entity\}/public_treasury/\{coin_id\}
This endpoint allows you **query public companies & governments' cryptocurrency holdings** by Coin ID

  ### Note

  * The responses are sorted in descending order based on total holdings.
  * CoinGecko equivalent page: [https://www.coingecko.com/en/treasuries/bitcoin](https://www.coingecko.com/en/treasuries/bitcoin)
  * Cache / Update Frequency: every 5 minutes for all the API plans.

# Coin Historical Chart Data by Token Address
Source: https://docs.coingecko.com/v3.0.1/reference/contract-address-market-chart

v3.0.1/reference/api-reference/coingecko-demo.json get /coins/\{id\}/contract/\{contract_address\}/market_chart
This endpoint allows you to **get the historical chart data including time in UNIX, price, market cap and 24hr volume based on asset platform and particular token contract address**

  ### Tips

  * You may obtain the asset platform and contract address via several ways:
    * refers to respective coin page and find 'contract address'.
    * refers to [`/coins/list`](https://docs.coingecko.com/v3.0.1/reference/coins-list) endpoint (`include platform = true`).

  ### Note

  * You may leave the interval as empty for automatic granularity:
    * 1 day from current time = **5-minutely** data
    * 2 - 90 days from current time = **hourly** data
    * above 90 days from current time = **daily** data (00:00 UTC)
  * Cache / Update Frequency:
    * Every 5 minutes for all the API plans.
    * The last completed UTC day (00:00) is available 35 minutes after midnight on the next UTC day (00:35). The cache will always expire at 00:40 UTC.
  * Access to historical data via the Public API (Demo plan) is **restricted to the past 365 days** only. To access the complete range of historical data, please subscribe to one of our [paid plans](https://www.coingecko.com/en/api/pricing) to obtain a Pro-API key.

# Coin Historical Chart Data within Time Range by Token Address
Source: https://docs.coingecko.com/v3.0.1/reference/contract-address-market-chart-range

v3.0.1/reference/api-reference/coingecko-demo.json get /coins/\{id\}/contract/\{contract_address\}/market_chart/range
This endpoint allows you to **get the historical chart data within certain time range in UNIX along with price, market cap and 24hr volume based on asset platform and particular token contract address**

  ### Tips

  * You may obtain the asset platform and contract address via several ways:
    * refers to respective coin page and find 'contract address'.
    * refers to [`/coins/list`](https://docs.coingecko.com/v3.0.1/reference/coins-list) endpoint (`include platform = true`).

  ### Note

  * You may leave the interval params as empty for automatic granularity:
    * 1 day from current time = **5-minutely** data
    * 1 day from any time (except current time) = **hourly** data
    * 2 - 90 days from any time = **hourly** data
    * above 90 days from any time = **daily** data (00:00 UTC)
  * Cache / Update Frequency:\
    Based on days range (all the API plans)
    * 1 day = 30 seconds cache
    * 2 -90 days = 30 minutes cache
    * 90 days = 12 hours cache
  * The last completed UTC day (00:00) is available 35 minutes after midnight on the next UTC day (00:35). The cache will always expire at 00:40 UTC.
  * Access to historical data via the Public API (Demo plan) is **restricted to the past 365 days** only. To access the complete range of historical data, please subscribe to one of our [paid plans](https://www.coingecko.com/en/api/pricing) to obtain a Pro-API key.

# Crypto Global Market Data
Source: https://docs.coingecko.com/v3.0.1/reference/crypto-global

v3.0.1/reference/api-reference/coingecko-demo.json get /global
This endpoint allows you **query cryptocurrency global data including active cryptocurrencies, markets, total crypto market cap and etc**

  ### Note

  * Cache / Update Frequency: every 10 minutes for all the API plans.

# Derivatives Exchanges List with Data
Source: https://docs.coingecko.com/v3.0.1/reference/derivatives-exchanges

v3.0.1/reference/api-reference/coingecko-demo.json get /derivatives/exchanges
This endpoint allows you to **query all the derivatives exchanges with related data (ID, name, open interest, ...) on CoinGecko**

  ### Tips

  * You may include values such as `per_page` and `page` to specify how many results you would like to show in the responses per page and which page of responses you would like to show.

  ### Note

  * Cache / Update Frequency: every 60 seconds for all the API plans.

# Derivatives Exchange Data by ID
Source: https://docs.coingecko.com/v3.0.1/reference/derivatives-exchanges-id

v3.0.1/reference/api-reference/coingecko-demo.json get /derivatives/exchanges/\{id\}
This endpoint allows you to **query the derivatives exchange's related data (ID, name, open interest, ...) based on the exchanges' ID**

  ### Tips

  * For `include_tickers` param, you may change the value to either `all` to include all the tickers or `unexpired` to include unexpired tickers in the responses. You may leave it blank to omit the tickers data.

  ### Note

  * Cache / Update Frequency: every 30 seconds for all the API plans.

# Derivatives Exchanges List (ID Map)
Source: https://docs.coingecko.com/v3.0.1/reference/derivatives-exchanges-list

v3.0.1/reference/api-reference/coingecko-demo.json get /derivatives/exchanges/list
This endpoint allows you to **query all the derivatives exchanges with ID and name on CoinGecko**

  ### Tips

  * You may use this endpoint to query the list of exchanges for other endpoints that contain params like `id` (derivatives exchange's ID)

  ### Note

  * Cache / Update Frequency: every 5 minutes for all the API plans.

# Derivatives Tickers List
Source: https://docs.coingecko.com/v3.0.1/reference/derivatives-tickers

v3.0.1/reference/api-reference/coingecko-demo.json get /derivatives
This endpoint allows you to **query all the tickers from derivatives exchanges on CoinGecko**

  ### Note

  * Data for `open_interest` and `volume_24h` in the endpoint responses are in USD.
  * Cache / Update Frequency: every 30 seconds for all the API plans.

# Supported Dexes List by Network (ID Map)
Source: https://docs.coingecko.com/v3.0.1/reference/dexes-list

v3.0.1/reference/api-reference/onchain-demo.json get /networks/\{network\}/dexes
This endpoint allows you to **query all the supported decentralized exchanges (DEXs) based on the provided network on GeckoTerminal**

  ### Tips

  * You may use this endpoint to query the list of DEXs with DEX ID for other endpoints that contain params like `dex`.
  * You may include values such as `page` to specify which page of responses you would like to show.

# Endpoint Overview
Source: https://docs.coingecko.com/v3.0.1/reference/endpoint-overview

  ### Notes

  Any exclusive endpoints for Pro-API users (any paid plan subscribers) will not be included here.

  For a full list of endpoints, please visit [Pro API Documentation](https://docs.coingecko.com/reference/endpoint-overview) instead.
