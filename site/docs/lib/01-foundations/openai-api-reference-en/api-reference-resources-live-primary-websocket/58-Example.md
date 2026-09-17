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
pageSha256: "a6feae4e1ccac0dfc4506e42e5a63685523ec46ac28642a3e3bd7ee0fa88632f"
contentMode: "local-full"
zh: ""
---

#### Example

```json
{
  "type": "transport.dtmf.received",
  "event_id": "event_dtmf_1",
  "event": "5"
}
```

### transport.dtmf.send

A SIP DTMF keypress successfully sent by the hosted tool. Delivered only to sideband observers; this is not a client command.
