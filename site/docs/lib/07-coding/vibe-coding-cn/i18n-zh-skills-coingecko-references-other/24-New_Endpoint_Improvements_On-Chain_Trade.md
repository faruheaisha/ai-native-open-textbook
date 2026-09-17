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
pageSha256: "8701d948ab1eba453b70bf2281cb1f1b875876b3091f3ef6827dd0c9ae552540"
contentMode: "local-full"
zh: ""
---

## New Endpoint & Improvements: On-Chain Trades, Net Buy Volume, and More

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

### Improved Endpoint - On-Chain OHLCV endpoint

[Pool OHLCV chart by Pool Address](https://docs.coingecko.com/reference/pool-ohlcv-contract-address) endpoint now supports to include empty intervals by flagging `include_empty_intervals=true` .

* By default, specific timeframe intervals (e.g. minutely) with no recorded swaps are excluded (or **skipped**) from the response.
  * This new parameter option provides the flexibility to get **padded** data, when there's no trade data.

### Improved Endpoints - Support Large Images

The following endpoints now support more size options for coin logo image:

* [Token Info by Token Address](https://docs.coingecko.com/reference/token-info-contract-address)
  * [Pool Tokens Info by Pool Address](https://docs.coingecko.com/reference/pool-token-info-contract-addres)

### Improved Endpoints - Support Normalized Supply Data

The following endpoints now support `normalized_total_supply`:

* [Token Data by Token Address](https://docs.coingecko.com/reference/token-data-contract-address)
  * [Tokens Data by Token Addresses](https://docs.coingecko.com/reference/tokens-data-contract-addresses)

### Improved Endpoints - Support Pool 'Name' and 'Fee' Data

The following endpoints now support `pool_name` and `pool_fee`:

* [Specific Pool Data by Pool Address](https://docs.coingecko.com/reference/pool-address)
  * [Multiple Pools Data by Pool Addresses](https://docs.coingecko.com/reference/pools-addresses)

### Improved Endpoints - Support Symbols of DEX Pairs

The following endpoints now allow to flag `dex_pair_format=symbol` to return DEX pair symbols instead of contract address.

* [Coin Data by ID](https://docs.coingecko.com/reference/coins-id)
  * [Coin Tickers by ID](https://docs.coingecko.com/reference/coins-id-tickers)
  * [Exchange Tickers by ID](https://docs.coingecko.com/reference/exchanges-id-tickers)
  * [Exchange Data by ID](https://docs.coingecko.com/reference/exchanges-id)

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
