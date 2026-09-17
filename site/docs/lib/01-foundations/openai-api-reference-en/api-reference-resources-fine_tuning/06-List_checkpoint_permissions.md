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
sourceRel: "api/reference/resources/fine_tuning.md"
rawUrl: "/raw/01-foundations/openai-api-reference-en/api/reference/resources/fine_tuning.md"
sourceSha256: "e0974138bdb9539a52739978d6d40b6a6890cc30d8e4e4a54c77787b424404b1"
pageSha256: "1ad403c79aa30b3a023035178f7f5d9be19853580958653114a1aedae9537f72"
contentMode: "local-full"
zh: ""
---

## List checkpoint permissions

**get** `/fine_tuning/checkpoints/\{fine_tuned_model_checkpoint\}/permissions`

**NOTE:** This endpoint requires an [admin API key](https://developers.openai.com/api/reference/resources/admin/subresources/organization/subresources/admin_api_keys).

Organization owners can use this endpoint to view all permissions for a fine-tuned model checkpoint.

### Path Parameters

- `fine_tuned_model_checkpoint: string`

### Query Parameters

- `after: optional string`

  Identifier for the last permission ID from the previous pagination request.

- `limit: optional number`

  Number of permissions to retrieve.

- `order: optional "ascending" or "descending"`

  The order in which to retrieve permissions.

  - `"ascending"`

  - `"descending"`

- `project_id: optional string`

  The ID of the project to get permissions for.

### Returns

- `data: array of object \{ id, created_at, object, project_id \}`

  - `id: string`

    The permission identifier, which can be referenced in the API endpoints.

  - `created_at: number`

    The Unix timestamp (in seconds) for when the permission was created.

  - `object: "checkpoint.permission"`

    The object type, which is always "checkpoint.permission".

    - `"checkpoint.permission"`

  - `project_id: string`

    The project identifier that the permission is for.

- `has_more: boolean`

- `object: "list"`

  - `"list"`

- `first_id: optional string or null`

- `last_id: optional string or null`

### Example

```http
curl https://api.openai.com/v1/fine_tuning/checkpoints/$FINE_TUNED_MODEL_CHECKPOINT/permissions \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "created_at": 0,
      "object": "checkpoint.permission",
      "project_id": "project_id"
    }
  ],
  "has_more": true,
  "object": "list",
  "first_id": "first_id",
  "last_id": "last_id"
}
```

### Example

```http
curl https://api.openai.com/v1/fine_tuning/checkpoints/ft:gpt-4o-mini-2024-07-18:org:weather:B7R9VjQd/permissions \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "object": "list",
  "data": [
    {
      "object": "checkpoint.permission",
      "id": "cp_zc4Q7MP6XxulcVzj4MZdwsAB",
      "created_at": 1721764867,
      "project_id": "proj_abGMw1llN8IrBb6SvvY5A1iH"
    },
    {
      "object": "checkpoint.permission",
      "id": "cp_enQCFmOTGj3syEpYVhBRLTSy",
      "created_at": 1721764800,
      "project_id": "proj_iqGMw1llN8IrBb6SvvY5A1oF"
    },
  ],
  "first_id": "cp_zc4Q7MP6XxulcVzj4MZdwsAB",
  "last_id": "cp_enQCFmOTGj3syEpYVhBRLTSy",
  "has_more": false
}
```
