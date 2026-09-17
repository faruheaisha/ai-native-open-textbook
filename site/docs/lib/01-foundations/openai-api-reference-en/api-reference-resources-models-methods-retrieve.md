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
sourceRel: "api/reference/resources/models/methods/retrieve.md"
rawUrl: "/raw/01-foundations/openai-api-reference-en/api/reference/resources/models/methods/retrieve.md"
sourceSha256: "93bc36e55a5aff5e3d55f459126047f86718f847f5c530f58d954e0830797287"
pageSha256: "93bc36e55a5aff5e3d55f459126047f86718f847f5c530f58d954e0830797287"
contentMode: "local-full"
zh: ""
---

# OpenAI API 参考（字段级）

> For the complete documentation index, see [llms.txt](https://developers.openai.com/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

## Retrieve model

**get** `/models/\{model\}`

Retrieves a model instance, providing basic information about the model such as the owner and permissioning.

### Path Parameters

- `model: string`

### Returns

- `Model object \{ id, created, object, 2 more \}`

  Describes an OpenAI model offering that can be used with the API.

  - `id: string`

    The model identifier, which can be referenced in the API endpoints.

  - `created: number`

    The Unix timestamp (in seconds) when the model was created.

  - `object: "model"`

    The object type, which is always "model".

    - `"model"`

  - `owned_by: string`

    The organization that owns the model.

  - `shutdown_date: optional string or null`

    The date when the model will shut down, or null if not announced.

### Example

```http
curl https://api.openai.com/v1/models/$MODEL \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "id": "id",
  "created": 0,
  "object": "model",
  "owned_by": "owned_by",
  "shutdown_date": "2019-12-27"
}
```

### Example

```http
curl https://api.openai.com/v1/models/gpt-6-astra \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "id": "gpt-6-astra",
  "object": "model",
  "created": 1686935002,
  "owned_by": "openai",
  "shutdown_date": "2026-10-23"
}
```
