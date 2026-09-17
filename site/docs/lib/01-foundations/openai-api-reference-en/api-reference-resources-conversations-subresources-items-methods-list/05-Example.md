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
pageSha256: "18a7f61f1a8529231504ed1d3c0e634ddb1dd4046ec34ba6441669b8d60674fc"
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
