---
title: "💼 Categories List"
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
pageSha256: "569fcf96723e3ce1967a7503d1d4e82bc6315f53825e2a41e3725eb1e11af8a2"
contentMode: "local-full"
zh: ""
---

# 💼 Categories List
Source: https://docs.coingecko.com/reference/categories-list

reference/api-reference/onchain-pro.json get /categories
This endpoint allows you to **query all the supported categories on GeckoTerminal**

  ### Tips

  * You can retrieve pools or tokens of a specific category with this endpoint: [Pools by Category ID](https://docs.coingecko.com/reference/pools-category).
  * GeckoTerminal categories are different from [CoinGecko categories](https://docs.coingecko.com/reference/coins-categories-list).

  ### Note

  * This endpoint returns 50 categories per page.
  * GeckoTerminal Equivalent Page: [https://www.geckoterminal.com/category](https://www.geckoterminal.com/category)
  * Cache/Update frequency: every 60 seconds.
  * Exclusive for all Paid Plan Subscribers (Analyst, Lite, Pro and Enterprise).

# Coins Categories List with Market Data
Source: https://docs.coingecko.com/reference/coins-categories

reference/api-reference/coingecko-pro.json get /coins/categories
This endpoint allows you to **query all the coins categories with market data (market cap, volume, ...) on CoinGecko**

  ### Note

  * CoinGecko Equivalent Page: [https://www.coingecko.com/en/categories](https://www.coingecko.com/en/categories).
  * Cache / Update Frequency: every 5 minutes for all the API plans.
  * CoinGecko categories are different from [GeckoTerminal categories](https://docs.coingecko.com/reference/categories-list).

# Coins Categories List (ID Map)
Source: https://docs.coingecko.com/reference/coins-categories-list

reference/api-reference/coingecko-pro.json get /coins/categories/list
This endpoint allows you to **query all the coins categories on CoinGecko**

  ### Tips

  * You may use this endpoint to query the list of categories for other endpoints that contain params like `category`.

  ### Note

  * CoinGecko Equivalent Page: [https://www.coingecko.com/en/categories](https://www.coingecko.com/en/categories).
  * Cache / Update Frequency:  every 5 minutes for all the API plans.
  * CoinGecko categories are different from [GeckoTerminal categories](https://docs.coingecko.com/reference/categories-list).

# Coin Data by Token Address
Source: https://docs.coingecko.com/reference/coins-contract-address

reference/api-reference/coingecko-pro.json get /coins/\{id\}/contract/\{contract_address\}
This endpoint allows you to **query all the metadata (image, websites, socials, description, contract address, etc.) and market data (price, ATH, exchange tickers, etc.) of a coin from the CoinGecko coin page based on an asset platform and a particular token contract address**

  ### Notice

  * Please note that the `twitter_followers` data field will no longer be supported by our API starting on May 15, 2025. Please refer to [changelog](https://docs.coingecko.com/changelog#upcoming-change-notice:-removal-of-twitter-followers-data) for more details.

  ### Tips

  * You may obtain the asset platform and contract address via several ways:
    * refers to respective coin page and find 'contract address'.
    * refers to [`/coins/list`](https://docs.coingecko.com/reference/coins-list) endpoint (`include platform = true`).

  ### Note

  * Coin descriptions may include newline characters represented as `\r\n` (escape sequences), which may require processing for proper formatting.
  * Cache / Update Frequency: every 60 seconds for all the API plans.

# Coin Data by ID
Source: https://docs.coingecko.com/reference/coins-id

reference/api-reference/coingecko-pro.json get /coins/\{id\}
This endpoint allows you to **query all the metadata (image, websites, socials, description, contract address, etc.) and market data (price, ATH, exchange tickers, etc.) of a coin from the CoinGecko coin page based on a particular coin ID**

  ### Tips

  * You may obtain the coin `id` (API ID) via several ways:
    * refers to respective coin page and find "API ID".
    * refers to [`/coins/list`](https://docs.coingecko.com/reference/coins-list) endpoint.
    * refers to Google Sheets [here](https://docs.google.com/spreadsheets/d/1wTTuxXt8n9q7C4NDXqQpI3wpKu1_5bGVmP9Xz0XGSyU/edit?usp=sharing).
  * You may also flag to include more data such as tickers, market data, community data, developer data and sparkline.
  * You may refer to `last_updated` in the endpoint response to check whether the price is stale.

  ### Note

  * Tickers are limited to 100 items, to get more tickers, please go to [/coins/\{id\}/tickers](https://docs.coingecko.com/reference/coins-id-tickers).
  * Coin descriptions may include newline characters represented as `\r\n` (escape sequences), which may require processing for proper formatting.
  * When `dex_pair_format=symbol`, the DEX pair `base` and `target` are displayed in symbol format (e.g. `WETH`, `USDC`) instead of as contract addresses.
  * Cache/Update Frequency:
    * Every 60 seconds for all the API plans.
    * Community data for Telegram will be updated on weekly basis (Reddit & Twitter community data are no longer supported).

# 👑 Circulating Supply Chart by ID
Source: https://docs.coingecko.com/reference/coins-id-circulating-supply-chart

reference/api-reference/coingecko-pro.json get /coins/\{id\}/circulating_supply_chart
This endpoint allows you to **query historical circulating supply of a coin by number of days away from now based on provided coin ID**

  ### Note

  * You may leave the interval params as empty for automatic granularity:
    * 1 day from now = **5-minutely** data
    * 2-90 days from now = **hourly** data
    * 91 days & above from now = **daily** data (00:00 UTC)
  * Data Availability: from 22 June 2019.
  * Cache/Update Frequency: 5 minutes.
  * The last completed UTC day (00:00) is available 35 minutes after midnight on the next UTC day (00:35).
  * Exclusive for Enterprise Plan Subscribers only.

# 👑 Circulating Supply Chart within Time Range by ID
Source: https://docs.coingecko.com/reference/coins-id-circulating-supply-chart-range

reference/api-reference/coingecko-pro.json get /coins/\{id\}/circulating_supply_chart/range
This endpoint allows you to **query historical circulating supply of a coin, within a range of timestamp based on the provided coin ID**

  ### Tips

  * Supports ISO date strings (`YYYY-MM-DD` or\
    `YYYY-MM-DDTHH:MM`, recommended for best compatibility) or UNIX timestamps.

  ### Note

  * You may leave the interval params as empty for automatic granularity:
    * date range is 1 day from now = **5-minutely** data
    * date range is within 2-90 days from now = **hourly** data
    * date range is 91 days & above from now = **daily** data (00:00 UTC)
  * Data Availability: from 22 June 2019.
  * Cache/Update Frequency: 5 minutes.
  * The last completed UTC day (00:00) is available 35 minutes after midnight on the next UTC day (00:35).
  * Exclusive for Enterprise Plan Subscribers only.

# Coin Historical Data by ID
Source: https://docs.coingecko.com/reference/coins-id-history

reference/api-reference/coingecko-pro.json get /coins/\{id\}/history
This endpoint allows you to **query the historical data (price, market cap, 24hrs volume, ...) at a given date for a coin based on a particular coin ID**

  ### Tips

  * You may obtain the coin ID (API ID) via several ways:
    * refers to respective coin page and find 'API ID'.
    * refers to [`/coins/list`](https://docs.coingecko.com/reference/coins-list) endpoint.
    * refers to google sheets [here](https://docs.google.com/spreadsheets/d/1wTTuxXt8n9q7C4NDXqQpI3wpKu1_5bGVmP9Xz0XGSyU/edit?usp=sharing).

  ### Note

  * The data returned is at `00:00:00 UTC`
  * The last completed UTC day (00:00) is available 35 minutes after midnight on the next UTC day (00:35).

# Coin Historical Chart Data by ID
Source: https://docs.coingecko.com/reference/coins-id-market-chart

reference/api-reference/coingecko-pro.json get /coins/\{id\}/market_chart
This endpoint allows you to **get the historical chart data of a coin including time in UNIX, price, market cap and 24hr volume based on particular coin ID**

  ### Tips

  * You may obtain the coin ID (API ID) via several ways:
    * refers to respective coin page and find 'API ID'.
    * refers to [`/coins/list`](https://docs.coingecko.com/reference/coins-list) endpoint.
    * refers to google sheets [here](https://docs.google.com/spreadsheets/d/1wTTuxXt8n9q7C4NDXqQpI3wpKu1_5bGVmP9Xz0XGSyU/edit?usp=sharing).
  * You may use tools like [epoch converter ](https://www.epochconverter.com) to convert human readable date to UNIX timestamp.

  ### Note

  * You may leave the interval params as empty for automatic granularity:
    * 1 day from current time = **5-minutely** data
    * 2 - 90 days from current time = **hourly** data
    * above 90 days from current time = **daily** data (00:00 UTC)
  * For **non-Enterprise plan subscribers** who would like to get hourly data, please leave the interval params empty for auto granularity.
  * The **5-minutely** and **hourly** interval params are also exclusively available to **Enterprise plan subscribers,** bypassing auto-granularity:
    * `interval=5m`: 5-minutely historical data (responses include information from the past 10 days, up until now).
    * `interval=hourly`: hourly historical data (responses include information from the past 100 days, up until now).
  * Cache / Update Frequency:
    * Every 30 seconds for all the API plans (for last data point).
    * The last completed UTC day (00:00) data is available **10 minutes after midnight** on the next UTC day (00:10).

# Coin Historical Chart Data within Time Range by ID
Source: https://docs.coingecko.com/reference/coins-id-market-chart-range

reference/api-reference/coingecko-pro.json get /coins/\{id\}/market_chart/range
This endpoint allows you to **get the historical chart data of a coin within certain time range in UNIX along with price, market cap and 24hr volume based on particular coin ID**

  ### Tips

  * You may obtain the coin ID (API ID) via several ways:
    * refers to respective coin page and find 'API ID'.
    * refers to [`/coins/list`](https://docs.coingecko.com/reference/coins-list) endpoint.
    * refers to google sheets [here](https://docs.google.com/spreadsheets/d/1wTTuxXt8n9q7C4NDXqQpI3wpKu1_5bGVmP9Xz0XGSyU/edit?usp=sharing).
  * Supports ISO date strings (`YYYY-MM-DD` or\
    `YYYY-MM-DDTHH:MM`, recommended for best compatibility) or UNIX timestamps.

  ### Note

  * You may leave the interval params as empty for automatic granularity:
    * 1 day from current time = **5-minutely** data
    * 1 day from any time (except current time) = **hourly** data
    * 2 - 90 days from any time = **hourly** data
    * above 90 days from any time = **daily** data (00:00 UTC)
  * For **non-Enterprise plan subscribers** who would like to get hourly data, please leave the interval params empty for auto granularity.
  * The **5-minutely** and **hourly** interval params are also exclusively available to **Enterprise plan subscribers**, bypassing auto-granularity:
    * `interval=5m`: 5-minutely historical data, supports up to **any 10 days** date range per request.
    * `interval=hourly`: hourly historical data, supports up to **any 100 days** date range per request.
  * Data availability:
    * `interval=5m`: Available from 9 February 2018 onwards.
    * `interval=hourly`: Available from 30 Jan 2018 onwards.
  * Cache / Update Frequency:\
    Based on days range (all the API plans)
    * 1 day = 30 seconds cache
    * 2 -90 days = 30 minutes cache
    * 90 days = 12 hours cache
    * The last completed UTC day (00:00) is available 35 minutes after midnight on the next UTC day (00:35). The cache will always expire at 00:40 UTC.

# Coin OHLC Chart by ID
Source: https://docs.coingecko.com/reference/coins-id-ohlc

reference/api-reference/coingecko-pro.json get /coins/\{id\}/ohlc
This endpoint allows you to **get the OHLC chart (Open, High, Low, Close) of a coin based on particular coin ID**

  ### Tips

  * You may obtain the coin ID (API ID) via several ways:
    * refers to respective coin page and find 'API ID'.
    * refers to [`/coins/list`](https://docs.coingecko.com/reference/coins-list) endpoint.
    * refers to Google Sheets [here](https://docs.google.com/spreadsheets/d/1wTTuxXt8n9q7C4NDXqQpI3wpKu1_5bGVmP9Xz0XGSyU/edit?usp=sharing).
  * For historical chart data with better granularity, you may consider using [/coins/\\{id\}/market\_chart](https://docs.coingecko.com/reference/coins-id-market-chart) endpoint.

  ### Note

  * The timestamp displayed in the payload (response) indicates the end (or close) time of the OHLC data.
  * Data granularity (candle's body) is automatic:
    * 1 - 2 days: 30 minutes
    * 3 - 30 days: 4 hours
    * 31 days and beyond: 4 days
  * Cache / Update Frequency:
    * Every 15 minutes for all the API plans
    * The last completed UTC day (00:00) is available 35 minutes after midnight on the next UTC day (00:35).
  * Exclusive **daily** and **hourly** candle interval parameter for all paid plan subscribers (`interval = daily`, `interval=hourly`)
    * '**daily**' interval is available for **1 / 7 / 14 / 30 / 90 / 180** days only.
    * '**hourly**' interval is available for  **1 / 7 / 14 / 30 / 90** days only.

# 💼 Coin OHLC Chart within Time Range by ID
Source: https://docs.coingecko.com/reference/coins-id-ohlc-range

reference/api-reference/coingecko-pro.json get /coins/\{id\}/ohlc/range
This endpoint allows you to **get the OHLC chart (Open, High, Low, Close) of a coin within a range of timestamp based on particular coin ID**

  ### Tips

  * You may obtain the coin ID (API ID) via several ways:
    * refers to respective coin page and find 'API ID'.
    * refers to [`/coins/list`](https://docs.coingecko.com/reference/coins-list) endpoint.
    * refers to google sheets [here](https://docs.google.com/spreadsheets/d/1wTTuxXt8n9q7C4NDXqQpI3wpKu1_5bGVmP9Xz0XGSyU/edit?usp=sharing).
  * For historical chart data with better granularity, you may consider using [/coins/\{`id`\}/market\_chart](https://docs.coingecko.com/reference/coins-id-market-chart) endpoint.
  * Supports ISO date strings (`YYYY-MM-DD` or\
    `YYYY-MM-DDTHH:MM`, recommended for best compatibility) or UNIX timestamps.

  ### Note

  * The timestamp displayed in the payload (response) indicates the end (or close) time of the OHLC data.
  * Interval Options:
    * Daily Interval (`interval=daily`):
      * up to 180 days per request/ 180 daily interval candles.
    * Hourly Interval (`interval=hourly`):
      * up to 31 days per request/ 744 hourly interval candles.
  * Data availability:
    * Available from 9 February 2018 onwards (`1518147224` epoch time).
  * Exclusive for Paid Plan Subscribers (Analyst, Lite, Pro and Enterprise).
  * Cache / Update Frequency:
    * Every 15 minutes for all the API plans.

# Coin Tickers by ID
Source: https://docs.coingecko.com/reference/coins-id-tickers

reference/api-reference/coingecko-pro.json get /coins/\{id\}/tickers
This endpoint allows you to **query the coin tickers on both centralized exchange (CEX) and decentralized exchange (DEX) based on a particular coin ID**

  ### Tips

  * You may obtain the coin ID (API ID) via several ways:
    * refers to respective coin page and find 'API ID'.
    * refers to [`/coins/list`](https://docs.coingecko.com/reference/coins-list) endpoint.
    * refers to google sheets [here](https://docs.google.com/spreadsheets/d/1wTTuxXt8n9q7C4NDXqQpI3wpKu1_5bGVmP9Xz0XGSyU/edit?usp=sharing).
  * You may specify the `exchange_ids` if you want to retrieve tickers for specific exchange only.
  * You may include values such as  `page` to specify which page of responses you would like to show.
  * You may also flag to include more data such as exchange logo and depth.

  ### Note

  * The tickers are paginated to 100 items.
  * When `dex_pair_format=symbol`, the DEX pair `base` and `target` are displayed in symbol format (e.g. `WETH`, `USDC`) instead of as contract addresses.
  * When order is sorted by `volume`, ***converted\_volume*** will be used instead of ***volume***.
  * Cache / Update Frequency:  every 2 minutes for all the API plans.

# 👑 Total Supply Chart by ID
Source: https://docs.coingecko.com/reference/coins-id-total-supply-chart

reference/api-reference/coingecko-pro.json get /coins/\{id\}/total_supply_chart
This endpoint allows you to **query historical total supply of a coin by number of days away from now based on provided coin ID**

  ### Note

  * You may leave the interval params as empty for automatic granularity:
    * 1 day from now = **5-minutely** data
    * 2-90 days from now = **hourly** data
    * 91 days & above from now = **daily** data (00:00 UTC)
  * Data Availability: from 22 June 2019
  * Cache/Update Frequency: 5 minutes.
  * The last completed UTC day (00:00) is available 35 minutes after midnight on the next UTC day (00:35).
  * Exclusive for Enterprise Plan Subscribers only.

# 👑 Total Supply Chart within time range by ID
Source: https://docs.coingecko.com/reference/coins-id-total-supply-chart-range

reference/api-reference/coingecko-pro.json get /coins/\{id\}/total_supply_chart/range
This endpoint allows you to **query historical total supply of a coin, within a range of timestamp based on the provided coin ID**

  ### Tips

  * Supports ISO date strings (`YYYY-MM-DD` or\
    `YYYY-MM-DDTHH:MM`, recommended for best compatibility) or UNIX timestamps.

  ### Note

  * Cache/Update Frequency: 5 minutes.
  * The data is provided at daily intervals (00:00:00 UTC).
  * Data Availability: from 22 June 2019
  * The last completed UTC day (00:00) is available 35 minutes after midnight on the next UTC day (00:35).
  * Exclusive for Enterprise Plan Subscribers only.

# Coins List (ID Map)
Source: https://docs.coingecko.com/reference/coins-list

reference/api-reference/coingecko-pro.json get /coins/list
This endpoint allows you to **query all the supported coins on CoinGecko with coins ID, name and symbol**

  ### Tips

  * You may use this endpoint to query the list of coins with coin id for other endpoints that contain params like `id` or `ids` (coin ID).
  * By default, this endpoint returns full list of active coins that are currently listed on CoinGecko.com , you can also flag `status=inactive` to retrieve coins that are no longer available on CoinGecko.com . The inactive coin IDs can also be used with [selected historical data](https://docs.coingecko.com/changelog#april-2024) endpoints.

  ### Note

  * There is no pagination required for this endpoint.
  * Cache/Update Frequency: every 5 minutes for Pro API (Analyst, Lite, Pro, Enterprise).

# 💼 Recently Added Coins
Source: https://docs.coingecko.com/reference/coins-list-new

reference/api-reference/coingecko-pro.json get /coins/list/new
This endpoint allows you to **query the latest 200 coins that recently listed on CoinGecko**

  ### Note

  * CoinGecko equivalent page: [https://www.coingecko.com/en/new-cryptocurrencies](https://www.coingecko.com/en/new-cryptocurrencies).
  * Cache/Update Frequency: Every 30 seconds.
  * Exclusive for Paid Plan Subscribers (Analyst, Lite, Pro and Enterprise).

# Coins List with Market Data
Source: https://docs.coingecko.com/reference/coins-markets

reference/api-reference/coingecko-pro.json get /coins/markets
This endpoint allows you to **query all the supported coins with price, market cap, volume and market related data**

  ### Tips

  * You can retrieve specific coins using their unique `ids`, `names`, or `symbols` instead of returning the whole list.
  * To filter results based on the coin's category, use the `category` param (refer to [`/coins/categories/list`](https://docs.coingecko.com/reference/coins-categories-list) for available categories).
  * Use the `per_page` and `page` params to manage the number of results you receive and navigate through the data.

  ### Note

  * When multiple lookup params are provided, the following priority order is applied: `category` (highest) > `ids` > `names` > `symbols` (lowest).
  * When searching by `name`, you need to URL-encode any spaces (e.g. "Binance Coin" becomes "Binance%20Coin").
  * The `include_tokens=all` param is exclusively for use with the `symbols` lookup and is limited to maximum of 50 symbols per request.
  * Wildcard searches are not supported for lookup params (`ids`, `names`, `symbols`).
  * Cache/Update Frequency: every 45 seconds for Pro API (Analyst, Lite, Pro, Enterprise).

# 💼 Top Gainers & Losers
Source: https://docs.coingecko.com/reference/coins-top-gainers-losers

reference/api-reference/coingecko-pro.json get /coins/top_gainers_losers
This endpoint allows you to **query the top 30 coins with largest price gain and loss by a specific time duration**

  ### Note

  * The endpoint response only includes coins with a 24-hour trading volume of at least \$50,000.
  * CoinGecko equivalent page: [https://www.coingecko.com/en/crypto-gainers-losers](https://www.coingecko.com/en/crypto-gainers-losers).
  * Cache/Update Frequency: Every 5 minutes.
  * Exclusive for Paid Plan Subscribers (Analyst, Lite, Pro and Enterprise).

# Crypto Treasury Holdings by Coin ID
Source: https://docs.coingecko.com/reference/companies-public-treasury

reference/api-reference/coingecko-pro.json get /\{entity\}/public_treasury/\{coin_id\}
This endpoint allows you **query public companies & governments' cryptocurrency holdings** by Coin ID

  ### Note

  * The responses are sorted in descending order based on total holdings.
  * CoinGecko equivalent page: [https://www.coingecko.com/en/treasuries/bitcoin](https://www.coingecko.com/en/treasuries/bitcoin)
  * Cache / Update Frequency: every 5 minutes for all the API plans.

# Coin Historical Chart Data by Token Address
Source: https://docs.coingecko.com/reference/contract-address-market-chart

reference/api-reference/coingecko-pro.json get /coins/\{id\}/contract/\{contract_address\}/market_chart
This endpoint allows you to **get the historical chart data including time in UNIX, price, market cap and 24hr volume based on asset platform and particular token contract address**

  ### Tips

  * You may obtain the asset platform and contract address via several ways:
    * refers to respective coin page and find 'contract address'.
    * refers to [`/coins/list`](https://docs.coingecko.com/reference/coins-list) endpoint (`include platform = true`).

  ### Note

  * You may leave the interval params as empty for automatic granularity:
    * 1 day from current time = **5-minutely** data
    * 2 - 90 days from current time = **hourly** data
    * above 90 days from current time = **daily** data (00:00 UTC)
  * For **non-Enterprise plan subscribers** who would like to get hourly data, please leave the interval params empty for auto granularity.
  * The **5-minutely** and **hourly** interval params are also exclusively available to **Enterprise plan subscribers,** bypassing auto-granularity:
    * `interval=5m`: 5-minutely historical data (responses include information from the past 10 days up until now)
    * `interval=hourly`: hourly historical data (responses include information from the past 100 days, up until now)
  * Cache / Update Frequency:
    * Every 5 minutes for all the API plans.
    * The last completed UTC day (00:00) is available 35 minutes after midnight on the next UTC day (00:35). The cache will always expire at 00:40 UTC.

# Coin Historical Chart Data within Time Range by Token Address
Source: https://docs.coingecko.com/reference/contract-address-market-chart-range

reference/api-reference/coingecko-pro.json get /coins/\{id\}/contract/\{contract_address\}/market_chart/range
This endpoint allows you to **get the historical chart data within certain time range in UNIX along with price, market cap and 24hr volume based on asset platform and particular token contract address**

  ### Tips

  * You may obtain the asset platform and contract address via several ways:
    * refers to respective coin page and find 'contract address'.
    * refers to [`/coins/list`](https://docs.coingecko.com/reference/coins-list) endpoint (`include platform = true`).
  * Supports ISO date strings (`YYYY-MM-DD` or\
    `YYYY-MM-DDTHH:MM`, recommended for best compatibility) or UNIX timestamps.

  ### Note

  * You may leave the interval params as empty for automatic granularity:
    * 1 day from current time = **5-minutely** data
    * 1 day from any time (except current time) = **hourly** data
    * 2 - 90 days from any time = **hourly** data
    * above 90 days from any time = **daily** data (00:00 UTC)
  * For **non-Enterprise plan subscribers** who would like to get hourly data, please leave the interval params empty for auto granularity.
  * The **5-minutely** and **hourly** interval params are also exclusively available to **Enterprise plan subscribers**, bypassing auto-granularity:
    * `interval=5m`: 5-minutely historical data (responses include information from the past 10 days, up until now)
    * `interval=hourly`: hourly historical data (responses include information from the past 100 days, up until now)
  * Data availability:
    * `interval=5m`: Available from 9 February 2018 onwards
    * `interval=hourly`: Available from 30 Jan 2018 onwards
  * Cache / Update Frequency:\
    Based on days range (all the API plans)
    * 1 day = 30 seconds cache
    * 2 -90 days = 30 minutes cache
    * 90 days = 12 hours cache
    * The last completed UTC day (00:00) is available 35 minutes after midnight on the next UTC day (00:35). The cache will always expire at 00:40 UTC

# Crypto Global Market Data
Source: https://docs.coingecko.com/reference/crypto-global

reference/api-reference/coingecko-pro.json get /global
This endpoint allows you **query cryptocurrency global data including active cryptocurrencies, markets, total crypto market cap and etc**

  ### Note

  * Cache / Update Frequency: every 10 minutes for all the API plans.

# Derivatives Exchanges List with Data
Source: https://docs.coingecko.com/reference/derivatives-exchanges

reference/api-reference/coingecko-pro.json get /derivatives/exchanges
This endpoint allows you to **query all the derivatives exchanges with related data (ID, name, open interest, ...) on CoinGecko**

  ### Tips

  * You may include values such as `per_page` and `page` to specify how many results you would like to show in the responses per page and which page of responses you would like to show.

  ### Note

  * Cache / Update Frequency: every 60 seconds for all the API plans.

# Derivatives Exchange Data by ID
Source: https://docs.coingecko.com/reference/derivatives-exchanges-id

reference/api-reference/coingecko-pro.json get /derivatives/exchanges/\{id\}
This endpoint allows you to **query the derivatives exchange's related data (ID, name, open interest, ...) based on the exchanges' ID**

  ### Tips

  * For `include_tickers` param, you may change the value to either `all` to include all the tickers or `unexpired` to include unexpired tickers in the responses. You may leave it blank to omit the tickers data.

  ### Note

  * Cache / Update Frequency: every 30 seconds for all the API plans.

# Derivatives Exchanges List (ID Map)
Source: https://docs.coingecko.com/reference/derivatives-exchanges-list

reference/api-reference/coingecko-pro.json get /derivatives/exchanges/list
This endpoint allows you to **query all the derivatives exchanges with ID and name on CoinGecko**

  ### Tips

  * You may use this endpoint to query the list of exchanges for other endpoints that contain params like `id` (derivatives exchange's ID).

  ### Note

  * Cache / Update Frequency: every 5 minutes for all the API plans.

# Derivatives Tickers List
Source: https://docs.coingecko.com/reference/derivatives-tickers

reference/api-reference/coingecko-pro.json get /derivatives
This endpoint allows you to **query all the tickers from derivatives exchanges on CoinGecko**

  ### Note

  * Data for `open_interest` and `volume_24h` in the endpoint responses are in USD.
  * Cache / Update Frequency: every 30 seconds for all the API plans.

# Supported Dexes List by Network (ID Map)
Source: https://docs.coingecko.com/reference/dexes-list

reference/api-reference/onchain-pro.json get /networks/\{network\}/dexes
This endpoint allows you to **query all the supported decentralized exchanges (DEXs) based on the provided network on GeckoTerminal**

  ### Tips

  * You may use this endpoint to query the list of DEXs with DEX ID for other endpoints that contain params like `dex`.
  * You may include values such as `page` to specify which page of responses you would like to show.

# Endpoint Overview
Source: https://docs.coingecko.com/reference/endpoint-overview

  ### Notes

  For Pro-API users (any [paid plan](https://www.coingecko.com/en/api/pricing) subscribers), you get to access all the endpoints listed below, except those that marked with 👑.

  * Some endpoints may have parameters or data access that are exclusive to different plan subscribers, please refer to the endpoint reference for details.

  * In the API Reference section, the distinction between Paid Plan and Enterprise Plan endpoint access will be marked as below:

    * 💼 — exclusive for any [Paid Plan](https://www.coingecko.com/en/api/pricing) subscribers: Analyst / Lite / Pro
    * 👑 — exclusive for [Enterprise Plan](https://www.coingecko.com/en/api/enterprise) subscribers only.
