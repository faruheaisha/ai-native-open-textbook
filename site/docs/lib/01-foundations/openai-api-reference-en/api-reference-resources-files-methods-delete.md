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
sourceRel: "api/reference/resources/files/methods/delete.md"
rawUrl: "/raw/01-foundations/openai-api-reference-en/api/reference/resources/files/methods/delete.md"
sourceSha256: "d8e03447a8110f25ba783bab443effc570afa0f6fe2b4b731b93091d92662db5"
pageSha256: "d8e03447a8110f25ba783bab443effc570afa0f6fe2b4b731b93091d92662db5"
contentMode: "local-full"
zh: ""
---

# OpenAI API 参考（字段级）

> For the complete documentation index, see [llms.txt](https://developers.openai.com/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

## Delete file

**delete** `/files/\{file_id\}`

Delete a file and remove it from all vector stores.

### Path Parameters

- `file_id: string`

### Returns

- `FileDeleted object \{ id, deleted, object \}`

  - `id: string`

  - `deleted: boolean`

  - `object: "file"`

    - `"file"`

### Example

```http
curl https://api.openai.com/v1/files/$FILE_ID \
    -X DELETE \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "file"
}
```

### Example

```http
curl https://api.openai.com/v1/files/file-abc123 \
  -X DELETE \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "id": "file-abc123",
  "object": "file",
  "deleted": true
}
```
