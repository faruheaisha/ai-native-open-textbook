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
sourceRel: "api/reference/resources/evals.md"
rawUrl: "/raw/01-foundations/openai-api-reference-en/api/reference/resources/evals.md"
sourceSha256: "8f940ae3c16748ec2321b258d8d2330f315132b3e34fb7b04a9a359d56c9590e"
pageSha256: "34ab5f980f7a7e5c3b10fdaebce651a86f6f01f01a2aa427a49ffa0da9d9664a"
contentMode: "local-full"
zh: ""
---

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
