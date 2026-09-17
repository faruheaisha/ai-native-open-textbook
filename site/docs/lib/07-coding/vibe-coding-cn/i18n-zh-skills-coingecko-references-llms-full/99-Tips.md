---
title: "OnchainOHLCV"
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
pageSha256: "11af4c704fbfe639a23eba9c8c740881551228144774900e94645c8ea2945456"
contentMode: "local-full"
zh: ""
---

# OnchainOHLCV
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

### Data Payload

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

***
