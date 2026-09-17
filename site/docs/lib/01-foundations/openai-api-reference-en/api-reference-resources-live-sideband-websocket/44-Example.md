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
pageSha256: "dc58da199704cfef697794e22fe4a3ced13b4ddd0880acaf0dcda5e0e918e027"
contentMode: "local-full"
zh: ""
---

#### Example

```json
{
  "type": "session.closed",
  "event_id": "evt_closed_001",
  "client_event_id": "evt_close_001",
  "reason": "close_requested",
  "session": {
    "id": "live_abc123",
    "model": "gpt-live-1",
    "status": "active",
    "expires_at": 1788555600,
    "instructions": "Help the caller plan a restaurant reservation. Confirm details before booking.",
    "input": [],
    "audio": {
      "format": {
        "type": "audio/pcm",
        "rate": 24000
      },
      "output": {
        "voice": "marin"
      }
    },
    "delegation": {
      "type": "client"
    }
  },
  "usage": {
    "seconds": 45.8
  }
}
```

### error

Reports an error in the Live session, such as an invalid client command. Use error.client_event_id, when present, to identify the command that caused the error.
