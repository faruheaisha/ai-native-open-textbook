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
sourceRel: "api/reference/resources/live/primary-websocket.md"
rawUrl: "/raw/01-foundations/openai-api-reference-en/api/reference/resources/live/primary-websocket.md"
sourceSha256: "4558a25169681bbcab3ba8bc8e5bc27bbf2495d07378248f8dc8ef05d4b5ca8b"
pageSha256: "7b5e2ade68cb5c5f4d172847ce3890d0252d817f075c2185d9bc3fe02d38cbbc"
contentMode: "local-full"
zh: ""
---

#### Example

```json
{
  "type": "session.output_audio.delta",
  "delta": "AACAAIAAAIAAAP9/AIAAgA==",
  "start_ms": 1000,
  "end_ms": 1200
}
```

### session.input_transcript.delta

A transcript fragment for user input audio in the Live session. Accumulate fragments in delivery order; these events do not define complete turns or include a transcript-done event.
