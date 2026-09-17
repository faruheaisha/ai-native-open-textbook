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
pageSha256: "23c31e51f61177934613972b40be20b0a0e3f9305188838bb445f4f296304ada"
contentMode: "local-full"
zh: ""
---

## Book Message

Emitted When:

* First subscribed to a market
* When there is a trade that affects the book

### Structure

| Name        | Type            | Description                                                                 |
| ----------- | --------------- | --------------------------------------------------------------------------- |
| event\_type | string          | "book"                                                                      |
| asset\_id   | string          | asset ID (token ID)                                                         |
| market      | string          | condition ID of market                                                      |
| timestamp   | string          | unix timestamp the current book generation in milliseconds (1/1,000 second) |
| hash        | string          | hash summary of the orderbook content                                       |
| buys        | OrderSummary\[] | list of type (size, price) aggregate book levels for buys                   |
| sells       | OrderSummary\[] | list of type (size, price) aggregate book levels for sells                  |

Where a `OrderSummary` object is of the form:

| Name  | Type   | Description                        |
| ----- | ------ | ---------------------------------- |
| price | string | size available at that price level |
| size  | string | price of the orderbook level       |

```json Response theme={null}
{
  "event_type": "book",
  "asset_id": "65818619657568813474341868652308942079804919287380422192892211131408793125422",
  "market": "0xbd31dc8a20211944f6b70f31557f1001557b59905b7738480ca09bd4532f84af",
  "bids": [
    { "price": ".48", "size": "30" },
    { "price": ".49", "size": "20" },
    { "price": ".50", "size": "15" }
  ],
  "asks": [
    { "price": ".52", "size": "25" },
    { "price": ".53", "size": "60" },
    { "price": ".54", "size": "10" }
  ],
  "timestamp": "123456789000",
  "hash": "0x0...."
}
```
