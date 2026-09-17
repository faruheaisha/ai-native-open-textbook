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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/polymarket/references/llms-full.md"
sourceRel: "i18n/zh/skills/polymarket/references/llms-full.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/polymarket/references/llms-full.md"
sourceSha256: "f2977ee42f8298e33bc8c8a0ee646bdd5f4e91e39de2641b8e15138a3174bd62"
pageSha256: "a4aad3d8d6e2a8f3d4183a1c14b1feac3aa23fbaca4517859eeabe44eec065d7"
contentMode: "local-full"
zh: ""
---

## Trade Message

Emitted when:

* when a market order is matched ("MATCHED")
* when a limit order for the user is included in a trade ("MATCHED")
* subsequent status changes for trade ("MINED", "CONFIRMED", "RETRYING", "FAILED")

### Structure

| Name             | Type          | Description                                 |
| ---------------- | ------------- | ------------------------------------------- |
| asset\_id        | string        | asset id (token ID) of order (market order) |
| event\_type      | string        | "trade"                                     |
| id               | string        | trade id                                    |
| last\_update     | string        | time of last update to trade                |
| maker\_orders    | MakerOrder\[] | array of maker order details                |
| market           | string        | market identifier (condition ID)            |
| matchtime        | string        | time trade was matched                      |
| outcome          | string        | outcome                                     |
| owner            | string        | api key of event owner                      |
| price            | string        | price                                       |
| side             | string        | BUY/SELL                                    |
| size             | string        | size                                        |
| status           | string        | trade status                                |
| taker\_order\_id | string        | id of taker order                           |
| timestamp        | string        | time of event                               |
| trade\_owner     | string        | api key of trade owner                      |
| type             | string        | "TRADE"                                     |

Where a `MakerOrder` object is of the form:

| Name            | Type   | Description                            |
| --------------- | ------ | -------------------------------------- |
| asset\_id       | string | asset of the maker order               |
| matched\_amount | string | amount of maker order matched in trade |
| order\_id       | string | maker order ID                         |
| outcome         | string | outcome                                |
| owner           | string | owner of maker order                   |
| price           | string | price of maker order                   |

```json Response theme={null}
{
  "asset_id": "52114319501245915516055106046884209969926127482827954674443846427813813222426",
  "event_type": "trade",
  "id": "28c4d2eb-bbea-40e7-a9f0-b2fdb56b2c2e",
  "last_update": "1672290701",
  "maker_orders": [
    {
      "asset_id": "52114319501245915516055106046884209969926127482827954674443846427813813222426",
      "matched_amount": "10",
      "order_id": "0xff354cd7ca7539dfa9c28d90943ab5779a4eac34b9b37a757d7b32bdfb11790b",
      "outcome": "YES",
      "owner": "9180014b-33c8-9240-a14b-bdca11c0a465",
      "price": "0.57"
    }
  ],
  "market": "0xbd31dc8a20211944f6b70f31557f1001557b59905b7738480ca09bd4532f84af",
  "matchtime": "1672290701",
  "outcome": "YES",
  "owner": "9180014b-33c8-9240-a14b-bdca11c0a465",
  "price": "0.57",
  "side": "BUY",
  "size": "10",
  "status": "MATCHED",
  "taker_order_id": "0x06bc63e346ed4ceddce9efd6b3af37c8f8f440c92fe7da6b2d0f9e4ccbc50c42",
  "timestamp": "1672290701",
  "trade_owner": "9180014b-33c8-9240-a14b-bdca11c0a465",
  "type": "TRADE"
}
```
