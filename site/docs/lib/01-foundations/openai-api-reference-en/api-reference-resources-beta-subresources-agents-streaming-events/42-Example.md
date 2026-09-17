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
pageSha256: "9aecbf55caaa649be6778dc8daede052b1c39e8935ae837d05c734dd4ee162f5"
contentMode: "local-full"
zh: ""
---

### Example

```json
{
  "type": "agent.session.turn.item.done",
  "event_id": "event_id",
  "session_id": "session_id",
  "turn_id": "turn_id",
  "output_index": 0,
  "item": {
    "type": "message",
    "id": "id",
    "turn_id": "turn_id",
    "role": "assistant",
    "status": "in_progress",
    "content": [
      {
        "type": "output_text",
        "text": "text"
      }
    ],
    "phase": "commentary"
  }
}
```

## agent.session.turn.content_part.added

Emitted when an output text content part is added.
