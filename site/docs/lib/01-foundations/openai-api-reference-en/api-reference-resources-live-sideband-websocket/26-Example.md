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
pageSha256: "0342e5b9524ccebecb58fcd27798b2fdd8dd2332ac83b51fcbbdf2c0ebb538c9"
contentMode: "local-full"
zh: ""
---

#### Example

```json
{
  "type": "session.input_audio.unmuted",
  "event_id": "evt_unmuted_001",
  "client_event_id": "evt_unmute_001"
}
```

### session.instructions.appended

Returned when a session.instructions.append command is accepted into the Live session timeline. Acknowledges the appended instructions without guaranteeing that the model has acted on them.
