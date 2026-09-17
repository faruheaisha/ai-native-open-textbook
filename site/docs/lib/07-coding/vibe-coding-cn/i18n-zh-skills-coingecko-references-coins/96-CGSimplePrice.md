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
pageSha256: "48d2cebf3f1fde8b64963ea44f409f267b4259f4c759367b69954f1cdb67740f"
contentMode: "local-full"
zh: ""
---

## CGSimplePrice

**URL:** llms-txt#cgsimpleprice

**Contents:**
  - Data Payload
- 1. Establish Connection to Websocket
- 2. Subscribe to a specific channel - CGSimplePrice
- 3. Stream CGSimplePrice
- Tips:
  - Un-subscribe to stop streaming CGSimplePrice data

Source: https://docs.coingecko.com/websocket/cgsimpleprice

Subscribe to receive real-time price updates for tokens, as seen on CoinGecko.com

This Websocket channel allows you to subscribe to real-time updates of price changes for token.

* Lookup by Coin ID
* It will return price & market data of the top pool of the specified token

**Update Frequency**: as fast as \~10s, for large cap and actively traded coins.

|      | Field                             | Type    | Description                                                                                          | Example                |
| ---- | --------------------------------- | ------- | ---------------------------------------------------------------------------------------------------- | ---------------------- |
| `c`  | `channel_type`                    | string  | Indicates the type of channel subscribed to.                                                         | C1                     |
| `i`  | `coin_id`                         | string  | Identifier of the coins. Check full list of IDs [here](https://api.coingecko.com/api/v3/coins/list). | `ethereum`, `usd-coin` |
| `p`  | `usd_price`                       | string  | Current token price in USD.                                                                          | 3639.78228844745       |
| `pp` | `usd_price_24h_change_percentage` | float   | Percentage change in token price over the last 24 hours.                                             | 3.566                  |
| `m`  | `usd_market_cap`                  | float   | Market capitalization in USD.                                                                        | 123                    |
| `v`  | `usd_24h_vol`                     | float   | 24-hour trading volume in USD.                                                                       | 31233333.33            |
| `t`  | `last_updated_at`                 | integer | Timestamp of the last data update in UNIX time.                                                      | 1709542750             |

**Tips**: The Websocket payload will use the value `null` when specific data is unavailable. Ensure your application is capable of handling null values for fields that may not always have data.
