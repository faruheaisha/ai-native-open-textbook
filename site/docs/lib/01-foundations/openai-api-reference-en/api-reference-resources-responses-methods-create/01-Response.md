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
pageSha256: "afa54ea27104cd1d9c91062d73e2646f61d9ede6881c9cd44ce5711ae0626a3d"
contentMode: "local-full"
zh: ""
---

#### Response

```json
{
  "id": "id",
  "created_at": 0,
  "error": {
    "code": "server_error",
    "message": "message",
    "misalignment": {
      "detailed_explanation": "detailed_explanation",
      "error_type": "potentially_unintended_data_transfer",
      "steer": {
        "message": "message"
      }
    }
  },
  "incomplete_details": {
    "reason": "max_output_tokens"
  },
  "instructions": "string",
  "metadata": {
    "foo": "string"
  },
  "model": "gpt-6-astra",
  "object": "response",
  "output": [
    {
      "id": "id",
      "content": [
        {
          "annotations": [
            {
              "file_id": "file_id",
              "filename": "filename",
              "index": 0,
              "type": "file_citation"
            }
          ],
          "logprobs": [
            {
              "token": "token",
              "bytes": [
                0
              ],
              "logprob": 0,
              "top_logprobs": [
                {
                  "token": "token",
                  "bytes": [
                    0
                  ],
                  "logprob": 0
                }
              ]
            }
          ],
          "text": "text",
          "type": "output_text"
        }
      ],
      "role": "assistant",
      "status": "in_progress",
      "type": "message",
      "phase": "commentary"
    }
  ],
  "parallel_tool_calls": true,
  "temperature": 1,
  "tool_choice": "none",
  "tools": [
    {
      "name": "name",
      "parameters": {
        "foo": "bar"
      },
      "strict": true,
      "type": "function",
      "allowed_callers": [
        "direct"
      ],
      "async": true,
      "defer_loading": true,
      "description": "description",
      "output_schema": {
        "foo": "bar"
      }
    }
  ],
  "top_p": 1,
  "background": true,
  "completed_at": 0,
  "conversation": {
    "id": "id"
  },
  "max_output_tokens": 0,
  "max_tool_calls": 0,
  "moderation": {
    "input": {
      "categories": {
        "foo": true
      },
      "category_applied_input_types": {
        "foo": [
          "text"
        ]
      },
      "category_scores": {
        "foo": 0
      },
      "flagged": true,
      "model": "model",
      "type": "moderation_result"
    },
    "output": {
      "categories": {
        "foo": true
      },
      "category_applied_input_types": {
        "foo": [
          "text"
        ]
      },
      "category_scores": {
        "foo": 0
      },
      "flagged": true,
      "model": "model",
      "type": "moderation_result"
    }
  },
  "output_text": "output_text",
  "previous_response_id": "previous_response_id",
  "prompt": {
    "id": "id",
    "variables": {
      "foo": "string"
    },
    "version": "version"
  },
  "prompt_cache_diagnostics": {
    "cache_missed_tokens": 0,
    "reason": "model_changed",
    "type": "cache_miss",
    "comparison_reusable_tokens": 0
  },
  "prompt_cache_key": "prompt-cache-key-1234",
  "prompt_cache_options": {
    "mode": "implicit",
    "ttl": "30m",
    "comparison_response_id": "comparison_response_id"
  },
  "prompt_cache_retention": "in_memory",
  "reasoning": {
    "context": "auto",
    "effort": "none",
    "generate_summary": "auto",
    "mode": "standard",
    "summary": "auto"
  },
  "safety_identifier": "safety-identifier-1234",
  "service_tier": "auto",
  "status": "completed",
  "text": {
    "format": {
      "type": "text"
    },
    "verbosity": "low"
  },
  "top_logprobs": 0,
  "truncation": "auto",
  "usage": {
    "input_tokens": 0,
    "input_tokens_details": {
      "cache_write_tokens": 0,
      "cached_tokens": 0
    },
    "output_tokens": 0,
    "output_tokens_details": {
      "reasoning_tokens": 0
    },
    "total_tokens": 0
  },
  "user": "user-1234"
}
```

### File input

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
          {"type": "input_text", "text": "what is in this file?"},
          {
            "type": "input_file",
            "file_url": "https://www.berkshirehathaway.com/letters/2024ltr.pdf",
            "detail": "auto"
          }
        ]
      }
    ]
  }'
```
