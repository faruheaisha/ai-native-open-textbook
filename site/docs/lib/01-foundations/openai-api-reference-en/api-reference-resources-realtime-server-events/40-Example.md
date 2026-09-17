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
pageSha256: "08adb41ef139988429a6bbca8260df5f139e09d89ddf0abcca9323ed10ccfd1b"
contentMode: "local-full"
zh: ""
---

### Example

```json
{
    "event_id": "event_abc123",
    "type": "output_audio_buffer.stopped",
    "response_id": "resp_abc123"
}
```

## output_audio_buffer.cleared

**WebRTC/SIP Only:** Emitted when the output audio buffer is cleared. This happens either in VAD
mode when the user has interrupted (`input_audio_buffer.speech_started`),
or when the client has emitted the `output_audio_buffer.clear` event to manually
cut off the current audio response.
[Learn more](https://developers.openai.com/api/docs/guides/realtime-conversations#client-and-server-events-for-audio-in-webrtc).
