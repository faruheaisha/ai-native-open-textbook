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
pageSha256: "6c249137291d0631577684b3e3a27c175a14c81850f5f4d107c747c32e3f7b31"
contentMode: "local-full"
zh: ""
---

### Example

```http
curl https://api.openai.com/v1/responses/$RESPONSE_ID/input_items \
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
      "role": "user",
      "type": "message",
      "status": "in_progress"
    }
  ],
  "first_id": "first_id",
  "has_more": true,
  "last_id": "last_id",
  "object": "list"
}
```
