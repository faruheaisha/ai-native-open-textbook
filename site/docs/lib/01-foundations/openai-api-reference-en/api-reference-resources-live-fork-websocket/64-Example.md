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
sourceRel: "api/reference/resources/live/fork-websocket.md"
rawUrl: "/raw/01-foundations/openai-api-reference-en/api/reference/resources/live/fork-websocket.md"
sourceSha256: "9e6521e93be8aca435d9a5de6a3905a8388040ba12e0775d313c91a93fe91796"
pageSha256: "3d005a6919060dd1d2d50d57f6403f4a7da577f588dcee5895ba869e081760bd"
contentMode: "local-full"
zh: ""
---

#### Example

```json
{
  "type": "transport.answered",
  "event_id": "event_call_2",
  "session_id": "live_u0_123"
}
```

### transport.failed

An asynchronous outbound SIP setup failure. Delivered only to sideband observers.
