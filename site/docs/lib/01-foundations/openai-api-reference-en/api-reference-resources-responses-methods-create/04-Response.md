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
pageSha256: "42caf34d002c993ac5e5d29d9f37afc37c6ba617b5ebcb3e5ca963be34e5e2ac"
contentMode: "local-full"
zh: ""
---

#### Response

```json
{
  "id": "resp_67ca09c5efe0819096d0511c92b8c890096610f474011cc0",
  "object": "response",
  "created_at": 1741294021,
  "status": "completed",
  "completed_at": 1741294022,
  "error": null,
  "incomplete_details": null,
  "instructions": null,
  "max_output_tokens": null,
  "model": "gpt-6-astra",
  "output": [
    {
      "type": "function_call",
      "id": "fc_67ca09c6bedc8190a7abfec07b1a1332096610f474011cc0",
      "call_id": "call_unLAR8MvFNptuiZK6K6HCy5k",
      "name": "get_current_weather",
      "arguments": "{\"location\":\"Boston, MA\",\"unit\":\"celsius\"}",
      "status": "completed"
    }
  ],
  "parallel_tool_calls": true,
  "previous_response_id": null,
  "reasoning": {
    "effort": null,
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
  "tools": [
    {
      "type": "function",
      "description": "Get the current weather in a given location",
      "name": "get_current_weather",
      "parameters": {
        "type": "object",
        "properties": {
          "location": {
            "type": "string",
            "description": "The city and state, e.g. San Francisco, CA"
          },
          "unit": {
            "type": "string",
            "enum": [
              "celsius",
              "fahrenheit"
            ]
          }
        },
        "required": [
          "location",
          "unit"
        ]
      },
      "strict": true
    }
  ],
  "top_p": 1.0,
  "truncation": "disabled",
  "usage": {
    "input_tokens": 291,
    "output_tokens": 23,
    "output_tokens_details": {
      "reasoning_tokens": 0
    },
    "total_tokens": 314
  },
  "user": null,
  "metadata": {}
}
```

### Image input

```http
curl https://api.openai.com/v1/responses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "model": "gpt-6-astra",
    "input": [
      {
        "role": "user",
        "content": [
          {"type": "input_text", "text": "what is in this image?"},
          {
            "type": "input_image",
            "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg"
          }
        ]
      }
    ]
  }'
```
