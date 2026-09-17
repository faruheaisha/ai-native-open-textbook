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
sourceRel: "api/reference/resources/responses.md"
rawUrl: "/raw/01-foundations/openai-api-reference-en/api/reference/resources/responses.md"
sourceSha256: "90f6bdcd76226476e4a8331be55ea8591382a62110d2ff0511d19809b0693fe6"
pageSha256: "cd4d88d100bff2ce45379768ec6145a7b9d91d44e69756efc445eb58c82574ab"
contentMode: "local-full"
zh: ""
---

## Delete a model response

**delete** `/responses/\{response_id\}`

Deletes a model response with the given ID.

### Path Parameters

- `response_id: string`

### Example

```http
curl https://api.openai.com/v1/responses/$RESPONSE_ID \
    -X DELETE \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

### Example

```http
curl -X DELETE https://api.openai.com/v1/responses/resp_123 \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "id": "resp_6786a1bec27481909a17d673315b29f6",
  "object": "response",
  "deleted": true
}
```
