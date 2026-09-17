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
pageSha256: "5afc7787b574e0b87316db6f4d5dcd3d18ef01c13d8118c86c9403e04db486aa"
contentMode: "local-full"
zh: ""
---

#### Example

```json
{
  "type": "session.close",
  "event_id": "evt_close_001"
}
```

## Server events

### session.started

Returned when a Live session has started. Contains the resolved session configuration, including server defaults.
