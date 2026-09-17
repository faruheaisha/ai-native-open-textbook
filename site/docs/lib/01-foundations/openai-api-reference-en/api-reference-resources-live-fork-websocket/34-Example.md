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
sourceRel: "api/reference/resources/live/fork-websocket.md"
rawUrl: "/raw/01-foundations/openai-api-reference-en/api/reference/resources/live/fork-websocket.md"
sourceSha256: "9e6521e93be8aca435d9a5de6a3905a8388040ba12e0775d313c91a93fe91796"
pageSha256: "b6d8df036c49a8fd1abde35a79a8de525b4865ed0c6fa7d7d8d18f59fa006e60"
contentMode: "local-full"
zh: ""
---

#### Example

```json
{
  "type": "session.thinking.appended",
  "event_id": "evt_thinking_002",
  "client_event_id": "evt_thinking_001",
  "start_ms": 4600,
  "end_ms": 4800
}
```

### session.commentary.appended

Returned when a session.commentary.append command is accepted into the Live session timeline. Acknowledges the added commentary without guaranteeing exact wording or completed audio playback.
