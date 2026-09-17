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
pageSha256: "81337df433d21aa00449e4792140744e6d2b6a17d0426821682cca9b0c31a60e"
contentMode: "local-full"
zh: ""
---

### Example

```http
curl https://api.openai.com/v1/conversations/conv_123/items/msg_abc \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "type": "message",
  "id": "msg_abc",
  "status": "completed",
  "role": "user",
  "content": [
    {"type": "input_text", "text": "Hello!"}
  ]
}
```

## Domain Types
