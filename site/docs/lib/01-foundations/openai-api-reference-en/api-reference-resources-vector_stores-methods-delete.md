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
sourceRel: "api/reference/resources/vector_stores/methods/delete.md"
rawUrl: "/raw/01-foundations/openai-api-reference-en/api/reference/resources/vector_stores/methods/delete.md"
sourceSha256: "39ad5c2f3550cb14befc51949e1300520d5bb8ceacde8bf5a3a686dd47e2ca5f"
pageSha256: "39ad5c2f3550cb14befc51949e1300520d5bb8ceacde8bf5a3a686dd47e2ca5f"
contentMode: "local-full"
zh: ""
---

# OpenAI API 参考（字段级）

> For the complete documentation index, see [llms.txt](https://developers.openai.com/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

## Delete vector store

**delete** `/vector_stores/\{vector_store_id\}`

Delete a vector store.

### Path Parameters

- `vector_store_id: string`

### Returns

- `VectorStoreDeleted object \{ id, deleted, object \}`

  - `id: string`

  - `deleted: boolean`

  - `object: "vector_store.deleted"`

    - `"vector_store.deleted"`

### Example

```http
curl https://api.openai.com/v1/vector_stores/$VECTOR_STORE_ID \
    -X DELETE \
    -H 'OpenAI-Beta: assistants=v2' \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "vector_store.deleted"
}
```

### Example

```http
curl https://api.openai.com/v1/vector_stores/vs_abc123 \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -H "OpenAI-Beta: assistants=v2" \
  -X DELETE
```

#### Response

```json
{
  id: "vs_abc123",
  object: "vector_store.deleted",
  deleted: true
}
```
