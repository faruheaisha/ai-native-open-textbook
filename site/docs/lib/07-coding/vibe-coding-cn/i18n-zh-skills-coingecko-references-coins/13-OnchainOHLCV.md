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
pageSha256: "c05a24a00e813c23e357d337b91a961e7f44af0cd6482bce7043e55845bf3290"
contentMode: "local-full"
zh: ""
---

## OnchainOHLCV

**URL:** llms-txt#onchainohlcv

**Contents:**
  - Data Payload
- 1. Establish Connection to Websocket
- 2. Subscribe to a specific channel - OnchainOHLCV
- 3. Stream OnchainOHLCV data
- Tips:
  - Un-subscribe to stop streaming OnchainOHLCV data

Source: https://docs.coingecko.com/websocket/wssonchainohlcv

Subscribe to receive real-time OHLCV updates for pools, as seen on GeckoTerminal.com

This Websocket channel allows you to subscribe to real-time OHLCV updates of a pool.

* Lookup by Network + Pool Address
* It will return **O**pen, **H**igh, **L**ow, **C**lose price and **V**olume data the specified pool.

**Update Frequency**: as fast as 1s, for actively traded pools.

**Tips**: use this Rest API endpoint [Top Pools by Token Address](https://docs.coingecko.com/reference/top-pools-contract-address#/) to obtain contract address of the most liquid pool.

  ### **Notes**

* Interval options: 1s / 1m / 5m / 1h / 2h / 4h / 8h
  * You may stream the pool ohlcv data based on `base` or `quote` token of a pool.
  * Please note that your subscription quota is based on the number of **unique data streams** you request. Each unique combination of an interval and token for a given pool is considered a **distinct subscription** and will count towards your max subscription limit.

|      | Field          | Type    | Description                                                                                                                | Example                    |
| ---- | -------------- | ------- | -------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `ch` | `channel_type` | string  | Indicates the type of channel subscribed to.                                                                               | G3                         |
| `n`  | `network_id`   | string  | Identifier of the blockchain network. Check full list of IDs [here](https://api.geckoterminal.com/api/v2/networks?page=1). | eth                        |
| `pa` | `pool_address` | string  | Contract address of the pool.                                                                                              | `0x88e6a0c2dd6fcb..3f5640` |
| `to` | `token`        | string  | `base` or `quote` token                                                                                                    | `base`                     |
| `i`  | `interval`     | string  | Interval or resolution of the candle: 1s / 1m / 5m / 1h / 2h / 4h / 8h                                                     | 1m                         |
| `o`  | `open`         | float   | Open price in USD                                                                                                          | 3539                       |
| `h`  | `high`         | float   | High price in USD                                                                                                          | 3541                       |
| `l`  | `low`          | float   | Low price in USD                                                                                                           | 3530                       |
| `c`  | `close`        | float   | Close price in USD                                                                                                         | 3531                       |
| `v`  | `volume`       | float   | Volume in USD                                                                                                              | 323333                     |
| `t`  | `timestamp`    | integer | Opening timestamp of candle interval                                                                                       | 1753803600                 |

**Tips**: The Websocket payload will use the value `null` when specific data is unavailable. Ensure your application is capable of handling null values for fields that may not always have data.
