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
pageSha256: "d20ee77cc4b316b78024db74db454f9d8e5f56386d4696a055b7f3cea2379979"
contentMode: "local-full"
zh: ""
---

#### Example

```json
{
  "type": "session.instructions.append",
  "event_id": "evt_instructions_001",
  "delegation_id": null,
  "content": "The caller prefers outdoor seating."
}
```

### session.thinking.append

Provide silent reasoning or progress context to the Live model, optionally for an existing client delegation.
