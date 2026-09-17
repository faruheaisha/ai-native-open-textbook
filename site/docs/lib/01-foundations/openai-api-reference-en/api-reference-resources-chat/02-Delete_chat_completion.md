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
sourceRel: "api/reference/resources/chat.md"
rawUrl: "/raw/01-foundations/openai-api-reference-en/api/reference/resources/chat.md"
sourceSha256: "820a591725a8a10266fc0e23b805ae10b81400acaad4be8af5938c0cc2d1ebcd"
pageSha256: "b60bc6d67c7f87963fdd344de7c0d8663cf984aab66f7f141bc60fbc134454f6"
contentMode: "local-full"
zh: ""
---

## Delete chat completion

**delete** `/chat/completions/\{completion_id\}`

Delete a stored chat completion. Only Chat Completions that have been
created with the `store` parameter set to `true` can be deleted.

### Path Parameters

- `completion_id: string`

### Returns

- `ChatCompletionDeleted object \{ id, deleted, object \}`

  - `id: string`

    The ID of the chat completion that was deleted.

  - `deleted: boolean`

    Whether the chat completion was deleted.

  - `object: "chat.completion.deleted"`

    The type of object being deleted.

    - `"chat.completion.deleted"`

### Example

```http
curl https://api.openai.com/v1/chat/completions/$COMPLETION_ID \
    -X DELETE \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "chat.completion.deleted"
}
```

### Example

```http
curl -X DELETE https://api.openai.com/v1/chat/completions/chat_abc123 \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
  "object": "chat.completion.deleted",
  "id": "chatcmpl-AyPNinnUqUDYo9SAdA52NobMflmj2",
  "deleted": true
}
```
