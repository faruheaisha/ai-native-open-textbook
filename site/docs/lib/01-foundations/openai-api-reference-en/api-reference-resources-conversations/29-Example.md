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
sourceRel: "api/reference/resources/conversations.md"
rawUrl: "/raw/01-foundations/openai-api-reference-en/api/reference/resources/conversations.md"
sourceSha256: "6123458c0e5f960336caab8f4ed471cfe0776f9b3a73f4f86126c614cfabefca"
pageSha256: "40a324b6eef92c7ca783f45fd99416f6cb8d9ec79cd87db079171180511d883d"
contentMode: "local-full"
zh: ""
---

### Example

```http
curl https://api.openai.com/v1/conversations/$CONVERSATION_ID/items \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -d '{
          "items": [
            {
              "content": "string",
              "role": "user",
              "type": "message"
            }
          ]
        }'
```

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "content": [
        {
          "text": "text",
          "type": "input_text",
          "prompt_cache_breakpoint": {
            "mode": "explicit"
          }
        }
      ],
      "role": "unknown",
      "status": "in_progress",
      "type": "message",
      "phase": "commentary"
    }
  ],
  "first_id": "first_id",
  "has_more": true,
  "last_id": "last_id",
  "object": "list"
}
```
