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
pageSha256: "ce6b7bb99ab976426385f16dd97f5c6684bf671bab29ae4b271a6652720c52c1"
contentMode: "local-full"
zh: ""
---

### Example

```json
{
    "event_id": "event_6501",
    "type": "conversation.item.input_audio_transcription.segment",
    "item_id": "msg_011",
    "content_index": 0,
    "text": "hello",
    "id": "seg_0001",
    "speaker": "spk_1",
    "start": 0.0,
    "end": 0.4
}
```

## conversation.item.input_audio_transcription.failed

Returned when input audio transcription is configured, and a transcription
request for a user message failed. These events are separate from other
`error` events so that the client can identify the related Item.
