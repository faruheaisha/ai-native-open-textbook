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
pageSha256: "4bb8cef6d049e4f2005da63c8df63b1588cec2d3f9defe1d38b8f20fbe061de0"
contentMode: "local-full"
zh: ""
---

### Example

```http
curl https://api.openai.com/v1/conversations/$CONVERSATION_ID \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -d '{
          "metadata": {
            "foo": "string"
          }
        }'
```

#### Response

```json
{
  "id": "id",
  "created_at": 0,
  "metadata": {},
  "object": "conversation"
}
```
