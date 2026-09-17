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
pageSha256: "c4c7f0828408da19a3d5820f09f2c421aebe9981221de479f19cc17399eb635b"
contentMode: "local-full"
zh: ""
---

## price\_change Message

&lt;div style=&#123;&#123;backgroundColor: '#fff3cd', border: '1px solid #ffeaa7', borderRadius: '4px', padding: '12px', marginBottom: '16px'&#125;&#125;>
  <strong>⚠️ Breaking Change Notice:</strong> The price\_change message schema will be updated on September 15, 2025 at 11 PM UTC. Please see the [migration guide](https://docs.polymarket.com/developers/CLOB/websocket/market-channel-migration-guide) for details.


Emitted When:

* A new order is placed
* An order is cancelled

### Structure

| Name           | Type           | Description                    |
| -------------- | -------------- | ------------------------------ |
| event\_type    | string         | "price\_change"                |
| market         | string         | condition ID of market         |
| price\_changes | PriceChange\[] | array of price change objects  |
| timestamp      | string         | unix timestamp in milliseconds |

Where a `PriceChange` object is of the form:

| Name      | Type   | Description                        |
| --------- | ------ | ---------------------------------- |
| asset\_id | string | asset ID (token ID)                |
| price     | string | price level affected               |
| size      | string | new aggregate size for price level |
| side      | string | "BUY" or "SELL"                    |
| hash      | string | hash of the order                  |
| best\_bid | string | current best bid price             |
| best\_ask | string | current best ask price             |

```json Response theme={null}
{
    "market": "0x5f65177b394277fd294cd75650044e32ba009a95022d88a0c1d565897d72f8f1",
    "price_changes": [
        {
            "asset_id": "71321045679252212594626385532706912750332728571942532289631379312455583992563",
            "price": "0.5",
            "size": "200",
            "side": "BUY",
            "hash": "56621a121a47ed9333273e21c83b660cff37ae50",
            "best_bid": "0.5",
            "best_ask": "1"
        },
        {
            "asset_id": "52114319501245915516055106046884209969926127482827954674443846427813813222426",
            "price": "0.5",
            "size": "200",
            "side": "SELL",
            "hash": "1895759e4df7a796bf4f1c5a5950b748306923e2",
            "best_bid": "0",
            "best_ask": "0.5"
        }
    ],
    "timestamp": "1757908892351",
    "event_type": "price_change"
}
```
