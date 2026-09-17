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
pageSha256: "86042877bbe68201b8897653ddd3e385a2c26c9f6392d27dec87803a0c4286c9"
contentMode: "local-full"
zh: ""
---

#### Example

```json
{
  "type": "session.input_audio.muted",
  "event_id": "evt_muted_001",
  "client_event_id": "evt_mute_001"
}
```

### session.input_audio.unmuted

Returned when a session.input_audio.unmute command is accepted. Input audio is sent to the model again.
