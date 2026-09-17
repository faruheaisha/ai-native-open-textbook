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
pageSha256: "8cf2f353ee2b9990aae18b6f0e1bc2f9b5c11354c00b72d030749d186c29d595"
contentMode: "local-full"
zh: ""
---

### Example

```http
curl https://api.openai.com/v1/evals/eval_123abc/runs/evalrun_abc456 \
  -X DELETE \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
  "object": "eval.run.deleted",
  "deleted": true,
  "run_id": "evalrun_abc456"
}
```

## Get eval runs

**get** `/evals/\{eval_id\}/runs`

Get a list of runs for an evaluation.
