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
sourceRel: "api/reference/resources/containers/subresources/files/subresources/content/methods/retrieve.md"
rawUrl: "/raw/01-foundations/openai-api-reference-en/api/reference/resources/containers/subresources/files/subresources/content/methods/retrieve.md"
sourceSha256: "13d3808a32ef9d94d4106471b82f003c6ed7a12700590a8c9724f2d6e7353473"
pageSha256: "13d3808a32ef9d94d4106471b82f003c6ed7a12700590a8c9724f2d6e7353473"
contentMode: "local-full"
zh: ""
---

# OpenAI API 参考（字段级）

> For the complete documentation index, see [llms.txt](https://developers.openai.com/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

## Retrieve container file content

**get** `/containers/\{container_id\}/files/\{file_id\}/content`

Retrieve Container File Content

### Path Parameters

- `container_id: string`

- `file_id: string`

### Example

```http
curl https://api.openai.com/v1/containers/$CONTAINER_ID/files/$FILE_ID/content \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

### Example

```http
curl https://api.openai.com/v1/containers/container_123/files/cfile_456/content \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
<binary content of the file>
```
