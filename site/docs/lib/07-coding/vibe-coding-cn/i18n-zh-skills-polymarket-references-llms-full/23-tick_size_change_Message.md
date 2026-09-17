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
pageSha256: "f6b914063ac277f766ffa9595c6c56c0b2bf8b1b714bedb3b8cf3d4d7437628a"
contentMode: "local-full"
zh: ""
---

## tick\_size\_change Message

Emitted When:

* The minimum tick size of the market changes. This happens when the book's price reaches the limits: price > 0.96 or price \< 0.04

### Structure

| Name            | Type   | Description                |
| --------------- | ------ | -------------------------- |
| event\_type     | string | "price\_change"            |
| asset\_id       | string | asset ID (token ID)        |
| market          | string | condition ID of market     |
| old\_tick\_size | string | previous minimum tick size |
| new\_tick\_size | string | current minimum tick size  |
| side            | string | buy/sell                   |
| timestamp       | string | time of event              |

```json Response theme={null}
{
"event_type": "tick_size_change",
"asset_id": "65818619657568813474341868652308942079804919287380422192892211131408793125422",\
"market": "0xbd31dc8a20211944f6b70f31557f1001557b59905b7738480ca09bd4532f84af",
"old_tick_size": "0.01",
"new_tick_size": "0.001",
"timestamp": "100000000"
}
```
