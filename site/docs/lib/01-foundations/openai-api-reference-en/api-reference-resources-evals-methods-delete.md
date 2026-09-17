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
sourceRel: "api/reference/resources/evals/methods/delete.md"
rawUrl: "/raw/01-foundations/openai-api-reference-en/api/reference/resources/evals/methods/delete.md"
sourceSha256: "39645ed51f71412f8fb62a0889834b8810fc0eefb6ec92cd70fc5f71ea8687b0"
pageSha256: "39645ed51f71412f8fb62a0889834b8810fc0eefb6ec92cd70fc5f71ea8687b0"
contentMode: "local-full"
zh: ""
---

# OpenAI API 参考（字段级）

> For the complete documentation index, see [llms.txt](https://developers.openai.com/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

## Delete an eval

**delete** `/evals/\{eval_id\}`

Delete an evaluation.

### Path Parameters

- `eval_id: string`

### Returns

- `deleted: boolean`

- `eval_id: string`

- `object: string`

### Example

```http
curl https://api.openai.com/v1/evals/$EVAL_ID \
    -X DELETE \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "deleted": true,
  "eval_id": "eval_abc123",
  "object": "eval.deleted"
}
```

### Example

```http
curl https://api.openai.com/v1/evals/eval_abc123 \
  -X DELETE \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "object": "eval.deleted",
  "deleted": true,
  "eval_id": "eval_abc123"
}
```
