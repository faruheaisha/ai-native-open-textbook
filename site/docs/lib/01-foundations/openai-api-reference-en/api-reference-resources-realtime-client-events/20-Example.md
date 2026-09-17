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
sourceRel: "api/reference/resources/realtime/client-events.md"
rawUrl: "/raw/01-foundations/openai-api-reference-en/api/reference/resources/realtime/client-events.md"
sourceSha256: "e5a80993ba40bb1f036ff2b5a28b932938a9edd0419e361d3019481770cb5e4a"
pageSha256: "c20f18620c54ae6e587ce74a5c29a4d0f88ee39d26b822a3482e04c5d385b0f5"
contentMode: "local-full"
zh: ""
---

### Example

```json
{
    "type": "response.cancel",
    "response_id": "resp_12345"
}
```

## output_audio_buffer.clear

**WebRTC/SIP Only:** Emit to cut off the current audio response. This will trigger the server to
stop generating audio and emit a `output_audio_buffer.cleared` event. This
event should be preceded by a `response.cancel` client event to stop the
generation of the current response.
[Learn more](https://developers.openai.com/api/docs/guides/realtime-conversations#client-and-server-events-for-audio-in-webrtc).
