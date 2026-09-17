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
sourceRel: "api/reference/resources/live/primary-websocket.md"
rawUrl: "/raw/01-foundations/openai-api-reference-en/api/reference/resources/live/primary-websocket.md"
sourceSha256: "4558a25169681bbcab3ba8bc8e5bc27bbf2495d07378248f8dc8ef05d4b5ca8b"
pageSha256: "1a259b124f61575afd94b8d5ce2c31a6739e4a1e21eba7b16684a3df4394a2c0"
contentMode: "local-full"
zh: ""
---

#### Example

```json
{
  "type": "error",
  "event_id": "evt_error_001",
  "error": {
    "type": "invalid_request_error",
    "code": "unknown_parameter",
    "message": "Unknown parameter: 'session.voice'.",
    "param": "session.voice",
    "client_event_id": "evt_invalid_001"
  }
}
```

### info

An informational notice about the Live session, such as the event permissions applied to a frontend data channel.
