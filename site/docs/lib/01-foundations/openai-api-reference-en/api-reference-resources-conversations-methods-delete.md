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
sourceRel: "api/reference/resources/conversations/methods/delete.md"
rawUrl: "/raw/01-foundations/openai-api-reference-en/api/reference/resources/conversations/methods/delete.md"
sourceSha256: "fa7d96be6bfd17d17fbeb6433b32e8504353f797ec4dc443aeff50babe156c63"
pageSha256: "fa7d96be6bfd17d17fbeb6433b32e8504353f797ec4dc443aeff50babe156c63"
contentMode: "local-full"
zh: ""
---

# OpenAI API 参考（字段级）

> For the complete documentation index, see [llms.txt](https://developers.openai.com/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

## Delete a conversation

**delete** `/conversations/\{conversation_id\}`

Delete a conversation. Items in the conversation will not be deleted.

### Path Parameters

- `conversation_id: string`

### Returns

- `ConversationDeletedResource object \{ id, deleted, object \}`

  - `id: string`

  - `deleted: boolean`

  - `object: "conversation.deleted"`

    - `"conversation.deleted"`

### Example

```http
curl https://api.openai.com/v1/conversations/$CONVERSATION_ID \
    -X DELETE \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "conversation.deleted"
}
```

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
