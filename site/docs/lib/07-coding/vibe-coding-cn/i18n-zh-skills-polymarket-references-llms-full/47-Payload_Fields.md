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
pageSha256: "6c6a30da054687c82e35705666121670466039565b3783de430e1a35b4f71f33"
contentMode: "local-full"
zh: ""
---

## Payload Fields

| Field       | Type   | Description                                                                                                                                                |
| ----------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `symbol`    | string | Trading pair symbol<br />**Binance**: lowercase concatenated (e.g., "solusdt", "btcusdt")<br />**Chainlink**: slash-separated (e.g., "eth/usd", "btc/usd") |
| `timestamp` | number | Price timestamp in Unix milliseconds                                                                                                                       |
| `value`     | number | Current price value in the quote currency                                                                                                                  |
