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
pageSha256: "3c4e031bc0c15973310a2bff462e27cbd9610d617ea30f2a4b9b68d115fa4722"
contentMode: "local-full"
zh: ""
---

### Example

```json
{
    "event_id": "event_abc123",
    "type": "output_audio_buffer.started",
    "response_id": "resp_abc123"
}
```

## output_audio_buffer.stopped

**WebRTC/SIP Only:** Emitted when the output audio buffer has been completely drained on the server,
and no more audio is forthcoming. This event is emitted after the full response
data has been sent to the client (`response.done`).
[Learn more](https://developers.openai.com/api/docs/guides/realtime-conversations#client-and-server-events-for-audio-in-webrtc).
