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
pageSha256: "bf2acba87810b10a587f483d6007bbde2c69c281982321b2214dd184dba6b926"
contentMode: "local-full"
zh: ""
---

### Example

```json
{
  "type": "error",
  "event_id": "event_123",
  "session_id": "sess_123",
  "error": {
    "type": "server_error",
    "code": null,
    "message": "The session failed due to an internal server error.",
    "param": null
  }
}
```
