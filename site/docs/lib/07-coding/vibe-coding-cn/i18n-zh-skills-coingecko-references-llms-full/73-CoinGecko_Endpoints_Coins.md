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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/llms-full.md"
sourceRel: "i18n/zh/skills/coingecko/references/llms-full.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/coingecko/references/llms-full.md"
sourceSha256: "a3cd0a16407a7e6b85ceb3cc714181ec1aecb3fdb5043afd1a82ec9cfdea8ec8"
pageSha256: "8f885f663b1ca98ebb105341c9a975c659c88a2ec2b09b0e41bc383ad4823aea"
contentMode: "local-full"
zh: ""
---

## CoinGecko Endpoints: Coins

| Endpoint                                                                                               | Description                                                                                                                                                                            |
| ------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [/ping](https://docs.coingecko.com/reference/ping-server)                                                                        | Check the API server status                                                                                                                                                            |
| 💼 [/key](https://docs.coingecko.com/reference/api-usage)                                                                        | Check account's API usage                                                                                                                                                              |
| [/simple/price](https://docs.coingecko.com/reference/simple-price)                                                               | Query the prices of one or more coins by using their unique Coin API IDs                                                                                                               |
| [/simple/token\_price/\\{id\}](https://docs.coingecko.com/reference/simple-token-price)                                            | Query the prices of one or more coins by using their unique Coin API IDs                                                                                                               |
| [/simple/supported\_vs\_currencies](https://docs.coingecko.com/reference/simple-supported-currencies)                            | Query all the supported currencies on CoinGecko                                                                                                                                        |
| [/coins/list](https://docs.coingecko.com/reference/coins-list)                                                                   | Query all the supported coins on CoinGecko with coins ID, name and symbol                                                                                                              |
| [/coins/markets](https://docs.coingecko.com/reference/coins-markets)                                                             | Query all the supported coins with price, market cap, volume and market related data                                                                                                   |
| [/coins/\\{id\}](https://docs.coingecko.com/reference/coins-id)                                                                    | Query all the metadata (image, websites, socials, description, contract address, etc.) from the CoinGecko coin page based on a particular coin ID                                      |
| [/coins/\\{id\}/tickers](https://docs.coingecko.com/reference/coins-id-tickers)                                                    | Query the coin tickers on both centralized exchange (CEX) and decentralized exchange (DEX) based on a particular coin ID                                                               |
| [/coins/\\{id\}/history](https://docs.coingecko.com/reference/coins-id-history)                                                    | Query the historical data (price, market cap, 24hr volume, ...) at a given date for a coin based on a particular coin ID                                                               |
| [/coins/\\{id\}/market\_chart](https://docs.coingecko.com/reference/coins-id-market-chart)                                         | Get the historical chart data of a coin including time in UNIX, price, market cap and 24hr volume based on particular coin ID                                                          |
| [/coins/\\{id\}/market\_chart/range](https://docs.coingecko.com/reference/coins-id-market-chart-range)                             | Get the historical chart data of a coin within certain time range in UNIX along with price, market cap and 24hr volume based on particular coin ID                                     |
| [/coins-id-ohlc](https://docs.coingecko.com/reference/coins-id-ohlc)                                                             | Get the OHLC chart (Open, High, Low, Close) of a coin based on particular coin ID                                                                                                      |
| 💼 [/coins/\\{id\}/ohlc/range](https://docs.coingecko.com/reference/coins-id-ohlc-range)                                           | Get the OHLC chart (Open, High, Low, Close) of a coin within a range of timestamp based on particular coin ID                                                                          |
| 💼 [/coins/top\_gainers\_losers](https://docs.coingecko.com/reference/coins-top-gainers-losers)                                  | Query the top 30 coins with largest price gain and loss by a specific time duration                                                                                                    |
| 💼 [/coins/list/new](https://docs.coingecko.com/reference/coins-list-new)                                                        | Query the latest 200 coins that recently listed on CoinGecko                                                                                                                           |
| 👑 [/coins/\\{id\}/circulating\_supply\_chart](https://docs.coingecko.com/reference/coins-id-circulating-supply-chart)             | Query historical circulating supply of a coin by number of days away from now based on provided coin ID                                                                                |
| 👑 [/coins/\\{id\}/circulating\_supply\_chart/range](https://docs.coingecko.com/reference/coins-id-circulating-supply-chart-range) | Query historical circulating supply of a coin, within a range of timestamp based on the provided coin ID                                                                               |
| 👑 [/coins/\\{id\}/total\_supply\_chart](https://docs.coingecko.com/reference/coins-id-total-supply-chart)                         | Query historical total supply of a coin by number of days away from now based on provided coin ID                                                                                      |
| 👑 [/coins/\\{id\}/total\_supply\_chart/range](https://docs.coingecko.com/reference/coins-id-total-supply-chart-range)             | Query historical total supply of a coin, within a range of timestamp based on the provided coin ID                                                                                     |
| [/coins/../contract/..](https://docs.coingecko.com/reference/coins-contract-address)                                             | Query all the metadata (image, websites, socials, description, contract address, etc.) from the CoinGecko coin page based on an asset platform and a particular token contract address |
| [/coins/../contract/../market\_chart](https://docs.coingecko.com/reference/contract-address-market-chart)                        | Get the historical chart data including time in UNIX, price, market cap and 24hr volume based on asset platform and particular token contract address                                  |
| [/coins/../contract/../market\_chart/range](https://docs.coingecko.com/reference/contract-address-market-chart-range)            | Get the historical chart data within certain time range in UNIX along with price, market cap and 24hr volume based on asset platform and particular token contract address             |
| [/coins/categories/list](https://docs.coingecko.com/reference/coins-categories-list)                                             | Query all the coins categories on CoinGecko                                                                                                                                            |
| [/coins/categories](https://docs.coingecko.com/reference/coins-categories)                                                       | Query all the coins categories with market data (market cap, volume, ...) on CoinGecko                                                                                                 |
