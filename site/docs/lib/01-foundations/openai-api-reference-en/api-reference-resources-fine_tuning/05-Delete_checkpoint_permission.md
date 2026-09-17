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
pageSha256: "b0594db7422b8308ccbcaae8b43738c2f872413eb2d558cd34c57d80c0e7ef86"
contentMode: "local-full"
zh: ""
---

## Delete checkpoint permission

**delete** `/fine_tuning/checkpoints/\{fine_tuned_model_checkpoint\}/permissions/\{permission_id\}`

**NOTE:** This endpoint requires an [admin API key](https://developers.openai.com/api/reference/resources/admin/subresources/organization/subresources/admin_api_keys).

Organization owners can use this endpoint to delete a permission for a fine-tuned model checkpoint.

### Path Parameters

- `fine_tuned_model_checkpoint: string`

- `permission_id: string`

### Returns

- `id: string`

  The ID of the fine-tuned model checkpoint permission that was deleted.

- `deleted: boolean`

  Whether the fine-tuned model checkpoint permission was successfully deleted.

- `object: "checkpoint.permission"`

  The object type, which is always "checkpoint.permission".

  - `"checkpoint.permission"`

### Example

```http
curl https://api.openai.com/v1/fine_tuning/checkpoints/$FINE_TUNED_MODEL_CHECKPOINT/permissions/$PERMISSION_ID \
    -X DELETE \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "checkpoint.permission"
}
```

### Example

```http
curl https://api.openai.com/v1/fine_tuning/checkpoints/ft:gpt-4o-mini-2024-07-18:org:weather:B7R9VjQd/permissions/cp_zc4Q7MP6XxulcVzj4MZdwsAB \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "object": "checkpoint.permission",
  "id": "cp_zc4Q7MP6XxulcVzj4MZdwsAB",
  "deleted": true
}
```
