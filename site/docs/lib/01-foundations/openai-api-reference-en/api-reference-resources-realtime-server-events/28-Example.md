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
sourceRel: "api/reference/resources/realtime/server-events.md"
rawUrl: "/raw/01-foundations/openai-api-reference-en/api/reference/resources/realtime/server-events.md"
sourceSha256: "4595bc318a41e7e43d9ea10eda8ce73d0a7f3740791946b9eeb2fb3cc8bab8a6"
pageSha256: "b81f0c822ddd1e1fb7ff108ef2bab680ea92e7a99b921a03d53ca15011a9def6"
contentMode: "local-full"
zh: ""
---

### Example

```json
{
    "type":" input_audio_buffer.dtmf_event_received",
    "event": "9",
    "received_at": 1763605109,
}
```

## input_audio_buffer.cleared

Returned when the input audio buffer is cleared by the client with a
`input_audio_buffer.clear` event.
