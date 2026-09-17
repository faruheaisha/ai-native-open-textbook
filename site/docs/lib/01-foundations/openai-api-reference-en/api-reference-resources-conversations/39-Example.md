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
pageSha256: "b87b5c897c7c3b415055626c3101b4416f04809cc21ae47eeaffddb27b0acffc"
contentMode: "local-full"
zh: ""
---

### Example

```http
curl "https://api.openai.com/v1/conversations/conv_123/items?limit=10" \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "object": "list",
  "data": [
    {
      "type": "message",
      "id": "msg_abc",
      "status": "completed",
      "role": "user",
      "content": [
        {"type": "input_text", "text": "Hello!"}
      ]
    }
  ],
  "first_id": "msg_abc",
  "last_id": "msg_abc",
  "has_more": false
}
```

## Retrieve an item

**get** `/conversations/\{conversation_id\}/items/\{item_id\}`

Get a single item from a conversation with the given IDs.
