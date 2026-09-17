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
pageSha256: "e910921881d89c64e5b7c6085cfc40728d5078c8aa0326c7dcdf0331077c103c"
contentMode: "local-full"
zh: ""
---

### Example

```http
curl -X DELETE https://api.openai.com/v1/conversations/conv_123 \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "id": "conv_123",
  "object": "conversation.deleted",
  "deleted": true
}
```

## Retrieve a conversation

**get** `/conversations/\{conversation_id\}`

Get a conversation
