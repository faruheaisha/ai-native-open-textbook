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
pageSha256: "89dec4311ee3d14da79c2a98ed6c4211a61117327b46d4ebb14e22c4e53140df"
contentMode: "local-full"
zh: ""
---

### Example

```json
{
    "event_id": "event_890",
    "type": "error",
    "error": {
        "type": "invalid_request_error",
        "code": "invalid_event",
        "message": "The 'type' field is missing.",
        "param": null,
        "event_id": "event_567"
    }
}
```

## session.created

Returned when a Session is created. Emitted automatically when a new
connection is established as the first server event. This event will contain
the default Session configuration.
