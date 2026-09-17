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
pageSha256: "e3bce71824961c2a8e524ac06a93c962f6c2ed820398f23bfcb0a1c585e7d649"
contentMode: "local-full"
zh: ""
---

### Example

```json
{
  "type": "agent.session.failed",
  "event_id": "event_id",
  "session": {
    "metadata": {
      "foo": "string"
    },
    "id": "id",
    "object": "agent.session",
    "created_at": 0,
    "last_active_at": 0,
    "status": "idle",
    "required_actions": [
      {
        "type": "function_call",
        "turn_id": "turn_id",
        "call_id": "call_id",
        "name": "name",
        "arguments": {}
      }
    ],
    "error": "error",
    "agent": {
      "id": "id",
      "name": "name",
      "model": "model",
      "reasoning": {
        "effort": "none",
        "summary": "concise"
      },
      "text": {
        "format": {
          "type": "text"
        },
        "verbosity": "low"
      },
      "service_tier": "auto",
      "instructions": "instructions",
      "tools": [
        {
          "type": "function",
          "name": "name",
          "description": "description",
          "parameters": {
            "foo": "bar"
          },
          "defer_loading": true
        }
      ],
      "multi_agent": {
        "enabled": true,
        "max_concurrent_subagents": 1
      }
    },
    "environment": {
      "type": "none"
    },
    "vault_ids": [
      "string"
    ],
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
}
```

## agent.session.environment.pending

Emitted while a session environment is being prepared.
