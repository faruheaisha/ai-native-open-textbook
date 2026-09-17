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
sourceRel: "api/reference/resources/vector_stores/subresources/files/methods/delete.md"
rawUrl: "/raw/01-foundations/openai-api-reference-en/api/reference/resources/vector_stores/subresources/files/methods/delete.md"
sourceSha256: "746c82d2d7b44f88c6af8dcb9dbfb2040937f4d3155ecefe63b9ee3fb37d50f8"
pageSha256: "746c82d2d7b44f88c6af8dcb9dbfb2040937f4d3155ecefe63b9ee3fb37d50f8"
contentMode: "local-full"
zh: ""
---

# OpenAI API 参考（字段级）

> For the complete documentation index, see [llms.txt](https://developers.openai.com/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

## Delete vector store file

**delete** `/vector_stores/\{vector_store_id\}/files/\{file_id\}`

Delete a vector store file. This will remove the file from the vector store but the file itself will not be deleted. To delete the file, use the [delete file](https://developers.openai.com/api/reference/resources/files/methods/delete) endpoint.

### Path Parameters

- `vector_store_id: string`

- `file_id: string`

### Returns

- `VectorStoreFileDeleted object \{ id, deleted, object \}`

  - `id: string`

  - `deleted: boolean`

  - `object: "vector_store.file.deleted"`

    - `"vector_store.file.deleted"`

### Example

```http
curl https://api.openai.com/v1/vector_stores/$VECTOR_STORE_ID/files/$FILE_ID \
    -X DELETE \
    -H 'OpenAI-Beta: assistants=v2' \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "vector_store.file.deleted"
}
```

### Example

```http
curl https://api.openai.com/v1/vector_stores/vs_abc123/files/file-abc123 \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -H "OpenAI-Beta: assistants=v2" \
  -X DELETE
```

#### Response

```json
{
  id: "file-abc123",
  object: "vector_store.file.deleted",
  deleted: true
}
```
