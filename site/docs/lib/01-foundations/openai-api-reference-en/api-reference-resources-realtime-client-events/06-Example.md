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
pageSha256: "8653012a8832b157d43b1482850d3527dab02a7444f326cc480af7a805a7635c"
contentMode: "local-full"
zh: ""
---

### Example

```json
{
    "event_id": "event_789",
    "type": "input_audio_buffer.commit"
}
```

## input_audio_buffer.clear

Send this event to clear the audio bytes in the buffer. The server will
respond with an `input_audio_buffer.cleared` event.
