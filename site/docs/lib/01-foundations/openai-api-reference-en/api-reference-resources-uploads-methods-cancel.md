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
sourceRel: "api/reference/resources/uploads/methods/cancel.md"
rawUrl: "/raw/01-foundations/openai-api-reference-en/api/reference/resources/uploads/methods/cancel.md"
sourceSha256: "6d08c1f14648cb01faf1eb97c899917ea276b303f8b4c97cb11a3307700e301b"
pageSha256: "6d08c1f14648cb01faf1eb97c899917ea276b303f8b4c97cb11a3307700e301b"
contentMode: "local-full"
zh: ""
---

# OpenAI API 参考（字段级）

> For the complete documentation index, see [llms.txt](https://developers.openai.com/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

## Cancel upload

**post** `/uploads/\{upload_id\}/cancel`

Cancels the Upload. No Parts may be added after an Upload is cancelled.

Returns the Upload object with status `cancelled`.

### Path Parameters

- `upload_id: string`

### Returns

- `Upload object \{ id, bytes, created_at, 6 more \}`

  The Upload object can accept byte chunks in the form of Parts.

  - `id: string`

    The Upload unique identifier, which can be referenced in API endpoints.

  - `bytes: number`

    The intended number of bytes to be uploaded.

  - `created_at: number`

    The Unix timestamp (in seconds) for when the Upload was created.

  - `expires_at: number`

    The Unix timestamp (in seconds) for when the Upload will expire.

  - `filename: string`

    The name of the file to be uploaded.

  - `purpose: string`

    The intended purpose of the file. [Please refer here](https://developers.openai.com/api/reference/resources/files#(resource) files > (model) file_object > (schema) > (property) purpose) for acceptable values.

  - `status: "pending" or "completed" or "cancelled" or "expired"`

    The status of the Upload.

    - `"pending"`

    - `"completed"`

    - `"cancelled"`

    - `"expired"`

  - `file: optional FileObject or null`

    The `File` object represents a document that has been uploaded to OpenAI.

    - `id: string`

      The file identifier, which can be referenced in the API endpoints.

    - `bytes: number`

      The size of the file, in bytes.

    - `created_at: number`

      The Unix timestamp (in seconds) for when the file was created.

    - `filename: string`

      The name of the file.

    - `object: "file"`

      The object type, which is always `file`.

      - `"file"`

    - `purpose: "assistants" or "assistants_output" or "batch" or 5 more`

      The intended purpose of the file. Supported values are `assistants`, `assistants_output`, `batch`, `batch_output`, `fine-tune`, `fine-tune-results`, `vision`, and `user_data`.

      - `"assistants"`

      - `"assistants_output"`

      - `"batch"`

      - `"batch_output"`

      - `"fine-tune"`

      - `"fine-tune-results"`

      - `"vision"`

      - `"user_data"`

    - `status: "uploaded" or "processed" or "error"`

      Deprecated. The current status of the file, which can be either `uploaded`, `processed`, or `error`.

      - `"uploaded"`

      - `"processed"`

      - `"error"`

    - `expires_at: optional number`

      The Unix timestamp (in seconds) for when the file will expire.

    - `status_details: optional string`

      Deprecated. For details on why a fine-tuning training file failed validation, see the `error` field on `fine_tuning.job`.

  - `object: optional "upload"`

    The object type, which is always "upload".

    - `"upload"`

### Example

```http
curl https://api.openai.com/v1/uploads/$UPLOAD_ID/cancel \
    -X POST \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "id": "id",
  "bytes": 0,
  "created_at": 0,
  "expires_at": 0,
  "filename": "filename",
  "purpose": "purpose",
  "status": "pending",
  "file": {
    "id": "id",
    "bytes": 0,
    "created_at": 0,
    "filename": "filename",
    "object": "file",
    "purpose": "assistants",
    "status": "uploaded",
    "expires_at": 0,
    "status_details": "status_details"
  },
  "object": "upload"
}
```

### Example

```http
curl https://api.openai.com/v1/uploads/upload_abc123/cancel
```

#### Response

```json
{
  "id": "upload_abc123",
  "object": "upload",
  "bytes": 2147483648,
  "created_at": 1719184911,
  "filename": "training_examples.jsonl",
  "purpose": "fine-tune",
  "status": "cancelled",
  "expires_at": 1719127296
}
```
