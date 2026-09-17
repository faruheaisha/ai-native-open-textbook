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
pageSha256: "6e74e22c793a65bdef9f89e137609642d94523e5d702a85965569629e01adc97"
contentMode: "local-full"
zh: ""
---

#### Example

```json
{
  "type": "session.input_audio.mute",
  "event_id": "evt_mute_001"
}
```

### session.input_audio.unmute

Resume audio input to a Live model after muting it. The server acknowledges with `session.input_audio.unmuted`.
