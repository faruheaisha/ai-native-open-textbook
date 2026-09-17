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
sourceRel: "api/reference/resources/models/methods/delete.md"
rawUrl: "/raw/01-foundations/openai-api-reference-en/api/reference/resources/models/methods/delete.md"
sourceSha256: "5892051eb14bf5c0209121621a33ca4dea1872091f16075e2ce355341b980f2d"
pageSha256: "5892051eb14bf5c0209121621a33ca4dea1872091f16075e2ce355341b980f2d"
contentMode: "local-full"
zh: ""
---

# OpenAI API 参考（字段级）

> For the complete documentation index, see [llms.txt](https://developers.openai.com/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

## Delete a fine-tuned model

**delete** `/models/\{model\}`

Delete a fine-tuned model. You must have the Owner role in your organization to delete a model.

### Path Parameters

- `model: string`

### Returns

- `ModelDeleted object \{ id, deleted, object \}`

  - `id: string`

  - `deleted: boolean`

  - `object: string`

### Example

```http
curl https://api.openai.com/v1/models/$MODEL \
    -X DELETE \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "object"
}
```

### Example

```http
curl https://api.openai.com/v1/models/ft:gpt-4o-mini:acemeco:suffix:abc123 \
  -X DELETE \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "id": "ft:gpt-4o-mini:acemeco:suffix:abc123",
  "object": "model",
  "deleted": true
}
```
