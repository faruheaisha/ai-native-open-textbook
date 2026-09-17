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
pageSha256: "75ebff5d2ea7575c8080a445b0f2278c51d187cd2c0308ded2aa066e6caf3529"
contentMode: "local-full"
zh: ""
---

## Message Format

### Binance Source Message Format

When subscribed to Binance crypto prices (`crypto_prices`), you'll receive messages with the following structure:

```json  theme={null}
{
  "topic": "crypto_prices",
  "type": "update", 
  "timestamp": 1753314064237,
  "payload": {
    "symbol": "solusdt",
    "timestamp": 1753314064213,
    "value": 189.55
  }
}
```

### Chainlink Source Message Format

When subscribed to Chainlink crypto prices (`crypto_prices_chainlink`), you'll receive messages with the following structure:

```json  theme={null}
{
  "topic": "crypto_prices_chainlink",
  "type": "update", 
  "timestamp": 1753314064237,
  "payload": {
    "symbol": "eth/usd",
    "timestamp": 1753314064213,
    "value": 3456.78
  }
}
```
