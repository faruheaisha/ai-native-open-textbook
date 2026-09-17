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
sourceRel: "api/reference/resources/responses/methods/create.md"
rawUrl: "/raw/01-foundations/openai-api-reference-en/api/reference/resources/responses/methods/create.md"
sourceSha256: "711abcd1b51022b909a6ab8d80506580cfd72a3beedb95d2fc57fc93465a8a52"
pageSha256: "9ae20033a1f390a56e1788c73278b5d97485eab8684994b77a21055c9b3ba6f7"
contentMode: "local-full"
zh: ""
---

#### Response

```json
{
  "id": "resp_67ccd7eca01881908ff0b5146584e408072912b2993db808",
  "object": "response",
  "created_at": 1741477868,
  "status": "completed",
  "completed_at": 1741477869,
  "error": null,
  "incomplete_details": null,
  "instructions": null,
  "max_output_tokens": null,
  "model": "gpt-6-astra",
  "output": [
    {
      "type": "message",
      "id": "msg_67ccd7f7b5848190a6f3e95d809f6b44072912b2993db808",
      "status": "completed",
      "role": "assistant",
      "content": [
        {
          "type": "output_text",
          "text": "The classic tongue twister...",
          "annotations": []
        }
      ]
    }
  ],
  "parallel_tool_calls": true,
  "previous_response_id": null,
  "reasoning": {
    "effort": "high",
    "summary": null
  },
  "store": true,
  "temperature": 1.0,
  "text": {
    "format": {
      "type": "text"
    }
  },
  "tool_choice": "auto",
  "tools": [],
  "top_p": 1.0,
  "truncation": "disabled",
  "usage": {
    "input_tokens": 81,
    "input_tokens_details": {
      "cached_tokens": 0,
      "cache_write_tokens": 0
    },
    "output_tokens": 1035,
    "output_tokens_details": {
      "reasoning_tokens": 832
    },
    "total_tokens": 1116
  },
  "user": null,
  "metadata": {}
}
```

### Streaming

```http
curl https://api.openai.com/v1/responses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "model": "gpt-6-astra",
    "instructions": "You are a helpful assistant.",
    "input": "Hello!",
    "stream": true
  }'
```
