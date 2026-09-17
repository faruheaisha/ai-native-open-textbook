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
pageSha256: "a6c135bdb09513d09a99d05b898d5850e5498cc6d7ddb30207a01c5a7518e45e"
contentMode: "local-full"
zh: ""
---

#### Example

```json
{
  "type": "session.instructions.appended",
  "event_id": "evt_instructions_002",
  "client_event_id": "evt_instructions_001",
  "start_ms": 1200,
  "end_ms": 1400
}
```

### session.thinking.appended

Returned when a session.thinking.append command is accepted into the Live session timeline. Acknowledges the added reasoning context without guaranteeing any spoken output.
