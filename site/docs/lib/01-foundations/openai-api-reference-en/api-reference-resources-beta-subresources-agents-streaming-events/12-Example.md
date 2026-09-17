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
pageSha256: "e8b127c59a8965873967d798e73354cb167e13dd115c23d61cec0601b8b863c8"
contentMode: "local-full"
zh: ""
---

### Example

```json
{
  "type": "agent.session.turn.completed",
  "event_id": "event_id",
  "session_id": "session_id",
  "turn_id": "turn_id",
  "turn": {
    "id": "id",
    "object": "agent.session.turn",
    "session_id": "session_id",
    "agent_id": "agent_id",
    "subagent_id": "subagent_id",
    "status": "queued",
    "created_at": 0,
    "started_at": 0,
    "completed_at": 0,
    "error": {
      "code": "context_length_exceeded",
      "message": "message"
    },
    "usage": {
      "input_tokens": 0,
      "input_tokens_details": {
        "cached_tokens": 0
      },
      "output_tokens": 0,
      "output_tokens_details": {
        "reasoning_tokens": 0
      },
      "total_tokens": 0
    }
  },
  "usage": {
    "input_tokens": 0,
    "input_tokens_details": {
      "cached_tokens": 0
    },
    "output_tokens": 0,
    "output_tokens_details": {
      "reasoning_tokens": 0
    },
    "total_tokens": 0
  }
}
```

## agent.session.turn.failed

Emitted when a turn fails.
