---
title: "10-mins Tutorial Guide"
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
pageSha256: "4957348aa3c4e0bf036067b4cc440927292624ac54cb650aa3e18d3c134ca9da"
contentMode: "local-full"
zh: ""
---

# 10-mins Tutorial Guide
Source: https://docs.coingecko.com/docs/10-mins-tutorial-guide

New to CoinGecko API? Fret not. Whether you're a programmer or someone with zero coding experience, we've got you covered!

If you are not a developer and prefer to learn only specific tutorials on Google Sheet/Excel, feel free to check [👶 Tutorials (Beginner-friendly)](https://docs.coingecko.com/docs/tutorials-beginner-friendly)

| Tutorial Steps                                                    | Description                                                                                      |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| [1. Get data by ID or Address](https://docs.coingecko.com/docs/1-get-data-by-id-or-address) | Learn how to use different endpoints by obtaining Coin ID and token's contract address at first. |
| [2. Get Historical Data](https://docs.coingecko.com/docs/2-get-historical-data)             | Learn how to get historical data of a coin by using different historical endpoints.              |
| [3. Get Exchanges & NFT Data](https://docs.coingecko.com/docs/3-get-exchanges-nft-data)     | Learn how to query exchanges and NFT data by accessing different endpoints.                      |
| [4. Get On-chain Data](https://docs.coingecko.com/docs/4-get-on-chain-data)                 | Learn how to use `/onchain` GT endpoints to query onchain data.                                  |

# 2. Get Historical Data
Source: https://docs.coingecko.com/docs/2-get-historical-data

  ### **Tips**

  * Most of the historical data are returned and queried using UNIX Timestamp.
    * If you are not familiar with UNIX Timestamp, you may use tool like [epochconverter.com](https://www.epochconverter.com/) to convert between UNIX Timestamp and human readable date.
  * You may use either coin ID or contract address to get the historical data.

There are five different endpoints to get historical data of a coin:

| Endpoint                                                                                                         | Description                                                                                                                                              |
| ---------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [/coins/\\{id\}/history](https://docs.coingecko.com/reference/coins-id-history)                                                              | Get the historical data (price, market cap, 24hrs volume, etc.) at a given date for a coin based on a particular coin ID.                                |
| [/coins/\\{id\}/market\_chart](https://docs.coingecko.com/reference/coins-id-market-chart)                                                   | Get the historical chart data of a coin including time in UNIX, price, market cap and 24hrs volume based on particular coin ID.                          |
| [/coins/\\{id\}/market\_chart/range](https://docs.coingecko.com/reference/coins-id-market-chart-range)                                       | Get the historical chart data of a coin within certain time range in UNIX along with price, market cap and 24hrs volume based on particular coin ID.     |
| [/coins/\\{id\}/contract/\\{contract\_address\}/market\_chart](https://docs.coingecko.com/reference/contract-address-market-chart)             | Get the historical chart data of a coin including time in UNIX, price, market cap and 24hrs volume based on token contract address.                      |
| [/coins/\\{id\}/contract/\\{contract\_address\}/market\_chart/range](https://docs.coingecko.com/reference/contract-address-market-chart-range) | Get the historical chart data of a coin within certain time range in UNIX along with price, market cap and 24hrs volume based on token contract address. |

  ### **Notes**

  The data granularity (interval) for [/market\_chart](https://docs.coingecko.com/reference/coins-id-market-chart) and [/market\_chart/range](https://docs.coingecko.com/reference/coins-id-market-chart-range) endpoints is automatic and based on the date range:

  * 1 day from current time = 5-minutely data
  * 1 day from anytime (except from current time) = hourly data
  * 2-90 days from current time or anytime = hourly data
  * above 90 days from current time or anytime = daily data (00:00 UTC)

# 3. Get Exchanges & NFT Data
Source: https://docs.coingecko.com/docs/3-get-exchanges-nft-data

You can get Exchange and NFT data just like how you get the coins data:

1. Get the ID (exchange or NFT) from `/list` endpoint.
2. Use the ID to query latest or historical market data

| Type                   | Coins                                                          | NFTs                                                         | Exchanges                                                              | Derivatives                                                            |
| ---------------------- | -------------------------------------------------------------- | ------------------------------------------------------------ | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Get Full List with IDs | [/coins/list](https://docs.coingecko.com/reference/coins-list)                           | [/nfts/list](https://docs.coingecko.com/reference/nfts-list)                           | [/exchanges/list](https://docs.coingecko.com/reference/exchanges-list)                           | [/derivatives/exchanges/list](https://docs.coingecko.com/reference/derivatives-exchanges-list)   |
| Get latest market data | [/coins/\\{id\}](https://docs.coingecko.com/reference/coins-id)                            | [/nfts/\\{id\}](https://docs.coingecko.com/reference/nfts-id)                            | [/exchanges/\\{id\}](https://docs.coingecko.com/reference/exchanges-id)                            | [/derivatives/exchanges/\\{id\}](https://docs.coingecko.com/reference/derivatives-exchanges-id)    |
| Get Historical Data    | [/coins/\\{id\}/market\_chart](https://docs.coingecko.com/reference/coins-id-market-chart) | [/nfts/\\{id\}/market\_chart](https://docs.coingecko.com/reference/nfts-id-market-chart) | [/exchanges/\\{id\}/volume\_chart](https://docs.coingecko.com/reference/exchanges-id-volume-chart) | [/exchanges/\\{id\}/volume\_chart](https://docs.coingecko.com/reference/exchanges-id-volume-chart) |

# 4. Get On-chain Data
Source: https://docs.coingecko.com/docs/4-get-on-chain-data

Here are some of the important parameters to take note while using Onchain DEX API Endpoints:

* Blockchain Networks
* DEXs
* Pool Contract Address
* Token Contract Address
