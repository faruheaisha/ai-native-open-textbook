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
pageSha256: "29fb9f882eb82419f801706082f66e507fc4a33592ddd1b5caad1bbe52c885b7"
contentMode: "local-full"
zh: ""
---

## Improved 5-minutely data for Historical Chart Data endpoints

🗓️ **January 09, 2025**

For the following 4 historical chart endpoints, the data of the *last 48 hours from now* is no longer excluded.

* [Coin Historical Chart Data by ID](https://docs.coingecko.com/reference/coins-id-market-chart)
  * [Coin Historical Chart Data within Time Range by ID](https://docs.coingecko.com/reference/coins-id-market-chart-range)
  * [Coin Historical Chart Data by Token Address](https://docs.coingecko.com/reference/contract-address-market-chart)
  * [Coin Historical Chart Data within Time Range by Token Address](https://docs.coingecko.com/reference/contract-address-market-chart-range)

**Note:** The **5-minutely** and **hourly** interval params are exclusively available to Enterprise plan subscribers, bypassing auto-granularity:

* `interval=5m`: 5-minutely historical data, supports up to any 10 days date range per request.
  * `interval=hourly`: hourly historical data, supports up to any 100 days date range per request.
  * **Data availability:**
    * `interval=5m`: Available from 9 February 2018 onwards
    * `interval=hourly`: Available from 30 Jan 2018 onwards

For non-Enterprise plan subscribers who would like to get hourly data, please leave the `interval` params empty for auto granularity:

* 1 day from current time = 5-minutely data
  * 1 day from any time (except current time) = hourly data
  * 2 - 90 days from any time = hourly data
  * above 90 days from any time = daily data (00:00 UTC)

  ## Added: Onchain Categories Data, CG data improvements

🗓️ **December 24, 2024**

### NEW: Onchain Categories : Get Categories on GeckoTerminal.com

This new [Categories List](https://docs.coingecko.com/reference/categories-list) endpoint allows you to query all the categories supported on GeckoTerminal.com such as 'Pump Fun' and 'Animal'.

* This endpoint is exclusively available for [Analyst/Lite/Pro/Enterprise plan](https://www.coingecko.com/en/api/pricing) subscribers only.

### NEW: Onchain Catergory Pools: Get Pools of a specific Category

This new [Pools by Category ID](https://docs.coingecko.com/reference/pools-category) endpoint allows you to query all the pools of a specific category on GeckoTerminal.com.

* This endpoint is exclusively available for [Analyst/Lite/Pro/Enterprise plan](https://www.coingecko.com/en/api/pricing) subscribers only.
  * You can also obtain tokens of a specific category, by flagging `include=base_token`

### Onchain Token Info: Added Categories Data

You can now obtain the categories of a token via the following endpoints:

1. [Token Info by Token Address](https://docs.coingecko.com/reference/token-info-contract-address)
  2. [Pool Tokens Info by Pool Address](https://docs.coingecko.com/reference/pool-token-info-contract-address)

### Onchain New Pools Data: Bug Fixed

Previously, this [/networks/new\_pools](https://docs.coingecko.com/reference/latest-pools-network) endpoint omitted new pools that are created within the last 24 hours.

It now returns all newly created pools in the last 48 hours.

### CoinGecko Exchange Data: Added support of inactive exchange id

You now query the the list of id of delisted exchanges with [Exchanges List (ID Map)](https://docs.coingecko.com/reference/exchanges-list) endpoint, by flagging `status=inactive `

**Tips**: you may query to get historical volume delisted exchanges for via the following endpoints:

* [Exchange Volume Chart by ID](https://docs.coingecko.com/reference/exchanges-id-volume-chart)
  * [Exchange Volume Chart within Time Range by ID](https://docs.coingecko.com/reference/exchanges-id-volume-chart-range)

### CoinGecko Historical Chart Data: Faster Last UTC Day (00:00) Data Update

For [Coin Historical Chart Data by ID](https://docs.coingecko.com/reference/coins-id-market-chart) endpoint, the last completed UTC day (00:00) data is now available **10 minutes after midnight** on the next UTC day (00:10).

Previously, the last completed UTC day (00:00) was only made available **35 minutes** after midnight.
