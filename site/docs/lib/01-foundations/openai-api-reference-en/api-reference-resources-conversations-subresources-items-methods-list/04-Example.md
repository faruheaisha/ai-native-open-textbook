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
sourceRel: "api/reference/resources/conversations/subresources/items/methods/list.md"
rawUrl: "/raw/01-foundations/openai-api-reference-en/api/reference/resources/conversations/subresources/items/methods/list.md"
sourceSha256: "edd9d5aa40946ed5e1770c24398e3cb185365348a09ec84f3d525e5a04981649"
pageSha256: "da7fb25a6d15a2e243d1a18a0c4330ad27e7408be3b51ddd68c096bc77dd2ac6"
contentMode: "local-full"
zh: ""
---

### Example

```http
curl https://api.openai.com/v1/conversations/$CONVERSATION_ID/items \
    -H "Authorization: Bearer $OPENAI_API_KEY"
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
