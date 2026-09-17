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
pageSha256: "dfcfc4d731e3bdc7ea0b3c02411d51acc806140b1d54d7dd326d32b6b2042bcf"
contentMode: "local-full"
zh: ""
---

## OnchainSimpleTokenPrice

**URL:** llms-txt#onchainsimpletokenprice

**Contents:**
  - Data Payload
- 1. Establish Connection to Websocket
- 2. Subscribe to a specific channel - OnchainSimpleTokenPrice
- 3. Stream OnchainSimpleTokenPrice data
- Tips:
  - Un-subscribe to stop streaming OnchainSimpleTokenPrice data

Source: https://docs.coingecko.com/websocket/onchainsimpletokenprice

Subscribe to receive real-time price updates for tokens, as seen on GeckoTerminal.com

This Websocket channel allows you to subscribe to real-time updates of price changes for token.

* Lookup by Network + Token Address
* It will return price and market data of the top pool of the specified token

**Update Frequency**: as fast as 1s, for actively traded tokens.

|      | Field                             | Type    | Description                                                                                                                | Example                                      |
| ---- | --------------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `c`  | `channel_type`                    | string  | Indicates the type of channel subscribed to.                                                                               | G1                                           |
| `n`  | `network_id`                      | string  | Identifier of the blockchain network. Check full list of IDs [here](https://api.geckoterminal.com/api/v2/networks?page=1). | `eth`                                        |
| `ta` | `token_address`                   | string  | Contract address of the token on the blockchain.                                                                           | `0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2` |
| `p`  | `usd_price`                       | float   | Current token price in USD.                                                                                                | 3639.78228844745                             |
| `pp` | `usd_price_24h_change_percentage` | float   | Percentage change in token price over the last 24 hours.                                                                   | 3.566                                        |
| `m`  | `usd_market_cap`                  | float   | Market capitalization in USD.                                                                                              | 123                                          |
| `v`  | `usd_24h_vol`                     | float   | 24-hour trading volume in USD.                                                                                             | 31233333.33                                  |
| `t`  | `last_updated_at`                 | integer | Timestamp of the last data update in UNIX time.                                                                            | 1709542750                                   |

**Tips**: The Websocket payload will use the value `null` when specific data is unavailable. Ensure your application is capable of handling null values for fields that may not always have data.
