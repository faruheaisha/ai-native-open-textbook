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
pageSha256: "cbf944a1a76bb593d6a0c9599c9fdb47e668e2521d81ae9d4ca4157ec57bc2c0"
contentMode: "local-full"
zh: ""
---

#### Example

```json
{
  "type": "session.output_transcript.delta",
  "event_id": "evt_output_transcript_001",
  "delta": "Would you like me to reserve that table?",
  "start_ms": 5400,
  "end_ms": 7200
}
```

### session.delegation.created

Returned when the Live model delegates work to your application or a Responses backend. Contains delegation metadata and the position on the session timeline where the work was delegated.
