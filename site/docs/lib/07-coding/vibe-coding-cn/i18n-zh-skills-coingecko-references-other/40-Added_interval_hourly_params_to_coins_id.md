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
pageSha256: "63fd73ce528bb40ffd8fffd6e665fa2805ee05c59923ed4963d1514fd3cd5ad2"
contentMode: "local-full"
zh: ""
---

## Added interval hourly params to /coins/id/ohlc

We've expanded functionality to include support for the `interval=hourly` parameter within the [/coins//ohlc](https://docs.coingecko.com/reference/coins-id-ohlc) endpoint.

Users can use this parameter to retrieve OHLC (Open/High/Low/Close) data on a hourly interval for up to 90 days of the date range.

Example of endpoint request:

`https://pro-api.coingecko.com/api/v3/coins/bitcoin/ohlc?vs_currency=usd&days=1&interval=hourly&x_cg_pro_api_key=YOUR_API_KEY`

  ## Added support for inactive coins in /coins/list and historical data endpoints

🗓️ **April 30, 2024**

We've now enhanced the [/coins/list](https://docs.coingecko.com/reference/coins-list) endpoint to include inactive coins

* You may access the inactive coins by specifying `status=inactive` in your query
  * Example of endpoint request:\
    `https://pro-api.coingecko.com/api/v3/coins/list?include_platform=false&status=inactive&x_cg_pro_api_key=YOUR_API_KEY`

Additionally, historical data for inactive coins can be queried using their IDs in the following endpoints:

* [/coins//history](https://docs.coingecko.com/reference/coins-id-history)
  * [/coins//market\_chart](https://docs.coingecko.com/reference/coins-id-market-chart)
  * [/coins//market\_chart/range](https://docs.coingecko.com/reference/coins-id-market-chart-range)
  * [/coins//contract//market\_chart](https://docs.coingecko.com/reference/contract-address-market-chart)
  * [/coins//contract//market\_chart/range](https://docs.coingecko.com/reference/contract-address-market-chart-range)

Please note that these features are available exclusively for **paid plan subscribers only**

  ## Introduced /key endpoint

🗓️ **March 27, 2024**

We've introduced a new endpoint [/key](https://docs.coingecko.com/reference/api-usage) for conveniently monitoring your account's API usage, including rate limits and remaining credits.

**Example of responses**:

  ## Multiple Improvements (Onchain/GT)

🗓️ **February 28, 2024**

* image\_url is now returned in the token response for pools and tokens endpoints:

Example of responses:

* We've added sorting parameters such as order= `h24_volume_usd_desc` and order=` h24_tx_count_desc` for /pools endpoints
  * The 'token' parameter within the [/ohlcv ](https://docs.coingecko.com/reference/pool-ohlcv-contract-address) endpoint can now accept a token address, provided it exists in the queried pool, to return OHLCV data\
    Example of endpoint request (**token=0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2**):\
    `https://pro-api.coingecko.com/api/v3/onchain/networks/eth/pools/0x06da0fd433c1a5d7a4faa01111c044910a184553/ohlcv/day?token=0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2&x_cg_pro_api_key=YOUR_API_KEY`
  * [/ohlcv ](https://docs.coingecko.com/reference/pool-ohlcv-contract-address) endpoint now includes the base and target token metadata in the response\
    Example of responses:
