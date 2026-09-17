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
sourceRel: "api/reference/resources/containers/subresources/files/methods/create.md"
rawUrl: "/raw/01-foundations/openai-api-reference-en/api/reference/resources/containers/subresources/files/methods/create.md"
sourceSha256: "07b4c3e33cc4c9a7fb3ca5150da8df0e58d10b6f39e16b548820a7cfe4173b48"
pageSha256: "07b4c3e33cc4c9a7fb3ca5150da8df0e58d10b6f39e16b548820a7cfe4173b48"
contentMode: "local-full"
zh: ""
---

# OpenAI API 参考（字段级）

> For the complete documentation index, see [llms.txt](https://developers.openai.com/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

## Create container file

**post** `/containers/\{container_id\}/files`

Create a Container File

You can send either a multipart/form-data request with the raw file content, or a JSON request with a file ID.

### Path Parameters

- `container_id: string`

### Body Parameters

- `file: optional string`

  The File object (not file name) to be uploaded.

- `file_id: optional string`

  Name of the file to create.

### Returns

- `id: string`

  Unique identifier for the file.

- `bytes: number`

  Size of the file in bytes.

- `container_id: string`

  The container this file belongs to.

- `created_at: number`

  Unix timestamp (in seconds) when the file was created.

- `object: string`

  The type of this object (`container.file`).

- `path: string`

  Path of the file in the container.

- `source: string`

  Source of the file (e.g., `user`, `assistant`).

### Example

```http
curl https://api.openai.com/v1/containers/$CONTAINER_ID/files \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -d '{}'
```

#### Response

```json
{
  "id": "id",
  "bytes": 0,
  "container_id": "container_id",
  "created_at": 0,
  "object": "object",
  "path": "path",
  "source": "source"
}
```

### Example

```http
curl https://api.openai.com/v1/containers/cntr_682e0e7318108198aa783fd921ff305e08e78805b9fdbb04/files \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -F file="@example.txt"
```

#### Response

```json
{
  "id": "cfile_682e0e8a43c88191a7978f477a09bdf5",
  "object": "container.file",
  "created_at": 1747848842,
  "bytes": 880,
  "container_id": "cntr_682e0e7318108198aa783fd921ff305e08e78805b9fdbb04",
  "path": "/mnt/data/88e12fa445d32636f190a0b33daed6cb-tsconfig.json",
  "source": "user"
}
```
