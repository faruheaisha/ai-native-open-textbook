---
title: "OnchainTrade"
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
pageSha256: "581800b229ebe27e515c24412822ca94ad4219343a608b01bb93bdf6ccd235c0"
contentMode: "local-full"
zh: ""
---

# OnchainTrade
Source: https://docs.coingecko.com/websocket/wss-onchain-trade

Subscribe to receive real-time transaction (trade/swap) updates for pools, as seen on GeckoTerminal.com

This Websocket channel allows you to subscribe to real-time updates of token trades of a pool.

* Lookup by Network + Pool Address
* It will return transaction type (buy/sell), tx hash, amount of token transacted, volume, and current price data of the specified pool.

**Update Frequency**: as fast as 0.1s, for actively traded pools.

**Tips**: use this Rest API endpoint [Top Pools by Token Address](https://docs.coingecko.com/reference/top-pools-contract-address) to obtain contract address of the most liquid pool.

### Data Payload

|      | Field                     | Type    | Description                                                                                                                | Example                    |
| ---- | ------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `ch` | `channel_type`            | string  | Indicates the type of channel subscribed to.                                                                               | G2                         |
| `n`  | `network_id`              | string  | Identifier of the blockchain network. Check full list of IDs [here](https://api.geckoterminal.com/api/v2/networks?page=1). | eth                        |
| `pa` | `pool_address`            | string  | Contract address of the pool.                                                                                              | `0x88e6a0c2dd6fcb..3f5640` |
| `tx` | `tx_hash`                 | string  | transaction hash                                                                                                           | `0x0b8ac5a16c2d5a..4d422`  |
| `ty` | `type`                    | string  | type of transaction (`b` for buy or `s` for sell)                                                                          | b                          |
| `to` | `token_amount`            | float   | Amount of token transacted.                                                                                                | 100                        |
| `vo` | `volume_in_usd`           | float   | The transaction value in USD.                                                                                              | 1000                       |
| `pc` | `price_in_token_currency` | float   | Current token price in target token currency                                                                               | 3639.78228844745           |
| `pu` | `price_in_usd`            | float   | Current token price in USD                                                                                                 | 3.566                      |
| `t`  | `last_updated_at`         | integer | Timestamp of the last data update in UNIX time.                                                                            | 1752072129000              |

**Tips**: The Websocket payload will use the value `null` when specific data is unavailable. Ensure your application is capable of handling null values for fields that may not always have data.

***
