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
sourceRel: "api/reference/resources/beta/subresources/agents/streaming-events.md"
rawUrl: "/raw/01-foundations/openai-api-reference-en/api/reference/resources/beta/subresources/agents/streaming-events.md"
sourceSha256: "e06665a555636995fe1eb8261151942e9a4dfd0159109c2ca45291045c49af22"
pageSha256: "228e505fa2b445b782c3267152d8909c1431613d84c32f304aacff2a2f2f0285"
contentMode: "local-full"
zh: ""
---

### Example

```json
{
  "type": "agent.session.environment.pending",
  "event_id": "event_id",
  "session_id": "session_id",
  "turn_id": "turn_id",
  "environment": {
    "id": "id",
    "type": "type",
    "status": "pending",
    "error": {
      "type": "type",
      "code": "code",
      "message": "message"
    }
  }
}
```

## agent.session.environment.connected

Emitted when a session environment connects.
