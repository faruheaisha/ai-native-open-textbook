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
pageSha256: "9ec072e464d7342219d7cf1508a434ecc15b245bf507715a91172766dd60d049"
contentMode: "local-full"
zh: ""
---

### Example

```http
curl https://api.openai.com/v1/evals/egroup_67abd54d9b0081909a86353f6fb9317a/runs \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
  "object": "list",
  "data": [
    {
      "object": "eval.run",
      "id": "evalrun_67e0c7d31560819090d60c0780591042",
      "eval_id": "eval_67e0c726d560819083f19a957c4c640b",
      "report_url": "https://platform.openai.com/evaluations/eval_67e0c726d560819083f19a957c4c640b",
      "status": "completed",
      "model": "o3-mini",
      "name": "bulk_with_negative_examples_o3-mini",
      "created_at": 1742784467,
      "result_counts": {
        "total": 1,
        "errored": 0,
        "failed": 0,
        "passed": 1
      },
      "per_model_usage": [
        {
          "model_name": "o3-mini",
          "invocation_count": 1,
          "prompt_tokens": 563,
          "completion_tokens": 874,
          "total_tokens": 1437,
          "cached_tokens": 0
        }
      ],
      "per_testing_criteria_results": [
        {
          "testing_criteria": "Push Notification Summary Grader-1808cd0b-eeec-4e0b-a519-337e79f4f5d1",
          "passed": 1,
          "failed": 0
        }
      ],
      "data_source": {
        "type": "completions",
        "source": {
          "type": "file_content",
          "content": [
            {
              "item": {
                "notifications": "\n- New message from Sarah: \"Can you call me later?\"\n- Your package has been delivered!\n- Flash sale: 20% off electronics for the next 2 hours!\n"
              }
            }
          ]
        },
        "input_messages": {
          "type": "template",
          "template": [
            {
              "type": "message",
              "role": "developer",
              "content": {
                "type": "input_text",
                "text": "\n\n\n\nYou are a helpful assistant that takes in an array of push notifications and returns a collapsed summary of them.\nThe push notification will be provided as follows:\n<push_notifications>\n...notificationlist...\n</push_notifications>\n\nYou should return just the summary and nothing else.\n\n\nYou should return a summary that is concise and snappy.\n\n\nHere is an example of a good summary:\n<push_notifications>\n- Traffic alert: Accident reported on Main Street.- Package out for delivery: Expected by 5 PM.- New friend suggestion: Connect with Emma.\n</push_notifications>\n<summary>\nTraffic alert, package expected by 5pm, suggestion for new friend (Emily).\n</summary>\n\n\nHere is an example of a bad summary:\n<push_notifications>\n- Traffic alert: Accident reported on Main Street.- Package out for delivery: Expected by 5 PM.- New friend suggestion: Connect with Emma.\n</push_notifications>\n<summary>\nTraffic alert reported on main street. You have a package that will arrive by 5pm, Emily is a new friend suggested for you.\n</summary>\n"
              }
            },
            {
              "type": "message",
              "role": "user",
              "content": {
                "type": "input_text",
                "text": "<push_notifications>{{item.notifications}}</push_notifications>"
              }
            }
          ]
        },
        "model": "o3-mini",
        "sampling_params": null
      },
      "error": null,
      "metadata": {}
    }
  ],
  "first_id": "evalrun_67e0c7d31560819090d60c0780591042",
  "last_id": "evalrun_67e0c7d31560819090d60c0780591042",
  "has_more": true
}
```

## Get an eval run

**get** `/evals/\{eval_id\}/runs/\{run_id\}`

Get an evaluation run by ID.
