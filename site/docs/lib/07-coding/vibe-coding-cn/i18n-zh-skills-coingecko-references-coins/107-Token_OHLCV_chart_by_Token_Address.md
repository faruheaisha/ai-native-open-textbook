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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/coins.md"
sourceRel: "i18n/zh/skills/coingecko/references/coins.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/coingecko/references/coins.md"
sourceSha256: "fb2cd6385ac7d21732c4716db3c685f6c264d3d3a3fe9b8efd0973eb2605d330"
pageSha256: "47156ef2eb79ce6ae5d72a9006e850e01d963f87c72a0f066bd4607950b0e889"
contentMode: "local-full"
zh: ""
---

## 💼 Token OHLCV chart by Token Address

**URL:** llms-txt#💼-token-ohlcv-chart-by-token-address

Source: https://docs.coingecko.com/reference/token-ohlcv-token-address

reference/api-reference/onchain-pro.json get /networks/\{network\}/tokens/\{token_address\}/ohlcv/\{timeframe\}
This endpoint allows you to **get the OHLCV chart (Open, High, Low, Close, Volume) of a token based on the provided token address on a network**

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
