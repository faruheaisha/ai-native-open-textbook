---
title: "OpenAI API 参考（字段级）"
sourceId: "01-foundations/openai-api-reference-en"
sourceTitle: "OpenAI API 参考（字段级）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://developers.openai.com/api/reference"
entryUrl: "https://developers.openai.com/api/reference"
sourceRel: "api/reference/resources/live/sideband-websocket.md"
rawUrl: "/raw/01-foundations/openai-api-reference-en/api/reference/resources/live/sideband-websocket.md"
sourceSha256: "3931e3ed281fce5bf05f32a67301bdd3963d7f23e08d45dc8483e7bc1c4302aa"
pageSha256: "dadc1de8e2d785ad320db1ec3e5ca47ffa8e126addc5eb0e4e655977f5f6d3ee"
contentMode: "local-full"
zh: ""
---

#### Example

```json
{
  "type": "session.usage.updated",
  "event_id": "evt_usage_001",
  "usage": {
    "seconds": 32.5
  },
  "context_window": {
    "usage_ratio": 0.12
  }
}
```

### session.closed

Returned after the Live session finishes finalizing, with the close reason, final session snapshot, and cumulative audio usage. A connection closing without this event does not confirm successful finalization.
