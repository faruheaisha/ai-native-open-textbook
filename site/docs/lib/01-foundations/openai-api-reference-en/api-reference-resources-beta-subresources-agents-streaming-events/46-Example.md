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
pageSha256: "7c52c61683e791b066b11242ddf526f5afd1d75d4c46533a81148b3ac616f6e3"
contentMode: "local-full"
zh: ""
---

### Example

```json
{
  "type": "agent.session.turn.content_part.done",
  "event_id": "event_id",
  "session_id": "session_id",
  "turn_id": "turn_id",
  "item_id": "item_id",
  "output_index": 0,
  "content_index": 0,
  "part": {
    "type": "output_text",
    "text": "text"
  }
}
```

## agent.session.turn.output_text.delta

Emitted when text is appended to an output text content part.
