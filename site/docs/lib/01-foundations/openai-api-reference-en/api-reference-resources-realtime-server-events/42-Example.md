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
pageSha256: "4b08e3b2b354c0e6ad27422dd639ea4e1a4c7e328cf2981d43ab434ea995903a"
contentMode: "local-full"
zh: ""
---

### Example

```json
{
    "event_id": "event_abc123",
    "type": "output_audio_buffer.cleared",
    "response_id": "resp_abc123"
}
```

## response.created

Returned when a new Response is created. The first event of response creation,
where the response is in an initial state of `in_progress`.
