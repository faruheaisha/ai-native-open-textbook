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
sourceRel: "api/reference/resources/models/methods/list.md"
rawUrl: "/raw/01-foundations/openai-api-reference-en/api/reference/resources/models/methods/list.md"
sourceSha256: "d61fe606bec272416967ae4feb35a68732e88f42b707283f5c9304b400b4e7a7"
pageSha256: "d61fe606bec272416967ae4feb35a68732e88f42b707283f5c9304b400b4e7a7"
contentMode: "local-full"
zh: ""
---

# OpenAI API 参考（字段级）

> For the complete documentation index, see [llms.txt](https://developers.openai.com/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

## List models

**get** `/models`

Lists the currently available models, and provides basic information about each one such as the owner and availability.

### Returns

- `data: array of Model`

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

- `object: "list"`

  - `"list"`

### Example

```http
curl https://api.openai.com/v1/models \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "created": 0,
      "object": "model",
      "owned_by": "owned_by",
      "shutdown_date": "2019-12-27"
    }
  ],
  "object": "list"
}
```

### Example

```http
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "object": "list",
  "data": [
    {
      "id": "model-id-0",
      "object": "model",
      "created": 1686935002,
      "owned_by": "organization-owner",
      "shutdown_date": null
    },
    {
      "id": "model-id-1",
      "object": "model",
      "created": 1686935002,
      "owned_by": "organization-owner",
      "shutdown_date": null
    },
    {
      "id": "model-id-2",
      "object": "model",
      "created": 1686935002,
      "owned_by": "openai",
      "shutdown_date": "2026-10-23"
    },
  ]
}
```
