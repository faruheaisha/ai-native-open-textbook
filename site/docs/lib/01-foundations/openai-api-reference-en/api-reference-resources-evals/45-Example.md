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
pageSha256: "8e31c63ca836f1eb1cd14b6a748de30b150d432277a9ef6e85d648fec3cd6562"
contentMode: "local-full"
zh: ""
---

### Example

```http
curl https://api.openai.com/v1/evals/$EVAL_ID/runs \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "created_at": 0,
      "data_source": {
        "source": {
          "content": [
            {
              "item": {
                "foo": "bar"
              },
              "sample": {
                "foo": "bar"
              }
            }
          ],
          "type": "file_content"
        },
        "type": "jsonl"
      },
      "error": {
        "code": "code",
        "message": "message"
      },
      "eval_id": "eval_id",
      "metadata": {
        "foo": "string"
      },
      "model": "model",
      "name": "name",
      "object": "eval.run",
      "per_model_usage": [
        {
          "cached_tokens": 0,
          "completion_tokens": 0,
          "invocation_count": 0,
          "model_name": "model_name",
          "prompt_tokens": 0,
          "total_tokens": 0
        }
      ],
      "per_testing_criteria_results": [
        {
          "failed": 0,
          "passed": 0,
          "testing_criteria": "testing_criteria"
        }
      ],
      "report_url": "https://example.com",
      "result_counts": {
        "errored": 0,
        "failed": 0,
        "passed": 0,
        "total": 0
      },
      "status": "status"
    }
  ],
  "first_id": "first_id",
  "has_more": true,
  "last_id": "last_id",
  "object": "list"
}
```
