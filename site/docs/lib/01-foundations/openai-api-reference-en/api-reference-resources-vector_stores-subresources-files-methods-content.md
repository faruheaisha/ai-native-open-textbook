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
sourceRel: "api/reference/resources/vector_stores/subresources/files/methods/content.md"
rawUrl: "/raw/01-foundations/openai-api-reference-en/api/reference/resources/vector_stores/subresources/files/methods/content.md"
sourceSha256: "0ea1ccd952981f77c300ee373558fb59af3fa16fea23ee4c7b85845df8d8585f"
pageSha256: "0ea1ccd952981f77c300ee373558fb59af3fa16fea23ee4c7b85845df8d8585f"
contentMode: "local-full"
zh: ""
---

# OpenAI API 参考（字段级）

> For the complete documentation index, see [llms.txt](https://developers.openai.com/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

## Retrieve vector store file content

**get** `/vector_stores/\{vector_store_id\}/files/\{file_id\}/content`

Retrieve the parsed contents of a vector store file.

### Path Parameters

- `vector_store_id: string`

- `file_id: string`

### Returns

- `data: array of object \{ text, type \}`

  Parsed content of the file.

  - `text: optional string`

    The text content

  - `type: optional string`

    The content type (currently only `"text"`)

- `has_more: boolean`

  Indicates if there are more content pages to fetch.

- `next_page: string or null`

  The token for the next page, if any.

- `object: "vector_store.file_content.page"`

  The object type, which is always `vector_store.file_content.page`

  - `"vector_store.file_content.page"`

### Example

```http
curl https://api.openai.com/v1/vector_stores/$VECTOR_STORE_ID/files/$FILE_ID/content \
    -H 'OpenAI-Beta: assistants=v2' \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "data": [
    {
      "text": "text",
      "type": "type"
    }
  ],
  "has_more": true,
  "next_page": "next_page",
  "object": "vector_store.file_content.page"
}
```

### Example

```http
curl \
https://api.openai.com/v1/vector_stores/vs_abc123/files/file-abc123/content \
-H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "file_id": "file-abc123",
  "filename": "example.txt",
  "attributes": {"key": "value"},
  "content": [
    {"type": "text", "text": "..."},
    ...
  ]
}
```
