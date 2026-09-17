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
pageSha256: "0c9d97004f829fcc15ef8fbf926fcd8338a831f27ed6ea49b7c49f8aa826c680"
contentMode: "local-full"
zh: ""
---

## Subscription Management

### Subscribe to Topics

To subscribe to data streams, send a JSON message with this structure:

```json  theme={null}
{
  "action": "subscribe",
  "subscriptions": [
    {
      "topic": "topic_name",
      "type": "message_type",
      "filters": "optional_filter_string",
      "clob_auth": {
        "key": "api_key",
        "secret": "api_secret", 
        "passphrase": "api_passphrase"
      },
      "gamma_auth": {
        "address": "wallet_address"
      }
    }
  ]
}
```

### Unsubscribe from Topics

To unsubscribe from data streams, send a similar message with `"action": "unsubscribe"`.
