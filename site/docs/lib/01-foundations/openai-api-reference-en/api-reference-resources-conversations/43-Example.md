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
pageSha256: "612e0c8444b06ed676ec1d39ccdedd620894a3085a7f1526d88633c38c48f326"
contentMode: "local-full"
zh: ""
---

### Example

```http
curl https://api.openai.com/v1/conversations/$CONVERSATION_ID/items/$ITEM_ID \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
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
```
