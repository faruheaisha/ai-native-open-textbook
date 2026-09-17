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
sourceRel: "api/reference/resources/responses/subresources/input_items/methods/list.md"
rawUrl: "/raw/01-foundations/openai-api-reference-en/api/reference/resources/responses/subresources/input_items/methods/list.md"
sourceSha256: "3c778702ff10b5942649794eba3ea201175667c74dcc72d6806283917b0168bf"
pageSha256: "50dbfdb6bedaf8de4c250d53f85f00d34966dcf90ed356a8571f360a590ee326"
contentMode: "local-full"
zh: ""
---

### Example

```http
curl https://api.openai.com/v1/responses/resp_abc123/input_items \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "object": "list",
  "data": [
    {
      "id": "msg_abc123",
      "type": "message",
      "role": "user",
      "content": [
        {
          "type": "input_text",
          "text": "Tell me a three sentence bedtime story about a unicorn."
        }
      ]
    }
  ],
  "first_id": "msg_abc123",
  "last_id": "msg_abc123",
  "has_more": false
}
```
