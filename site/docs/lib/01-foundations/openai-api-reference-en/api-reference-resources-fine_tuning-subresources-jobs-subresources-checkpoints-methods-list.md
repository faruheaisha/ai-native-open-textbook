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
sourceRel: "api/reference/resources/fine_tuning/subresources/jobs/subresources/checkpoints/methods/list.md"
rawUrl: "/raw/01-foundations/openai-api-reference-en/api/reference/resources/fine_tuning/subresources/jobs/subresources/checkpoints/methods/list.md"
sourceSha256: "f844ed0c4e882f692c6eafe711b815efdedd7d48d5687290f0dace2f44a687e7"
pageSha256: "f844ed0c4e882f692c6eafe711b815efdedd7d48d5687290f0dace2f44a687e7"
contentMode: "local-full"
zh: ""
---

# OpenAI API 参考（字段级）

> For the complete documentation index, see [llms.txt](https://developers.openai.com/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

## List fine-tuning checkpoints

**get** `/fine_tuning/jobs/\{fine_tuning_job_id\}/checkpoints`

List checkpoints for a fine-tuning job.

### Path Parameters

- `fine_tuning_job_id: string`

### Query Parameters

- `after: optional string`

  Identifier for the last checkpoint ID from the previous pagination request.

- `limit: optional number`

  Number of checkpoints to retrieve.

### Returns

- `data: array of FineTuningJobCheckpoint`

  - `id: string`

    The checkpoint identifier, which can be referenced in the API endpoints.

  - `created_at: number`

    The Unix timestamp (in seconds) for when the checkpoint was created.

  - `fine_tuned_model_checkpoint: string`

    The name of the fine-tuned checkpoint model that is created.

  - `fine_tuning_job_id: string`

    The name of the fine-tuning job that this checkpoint was created from.

  - `metrics: object \{ full_valid_loss, full_valid_mean_token_accuracy, step, 4 more \}`

    Metrics at the step number during the fine-tuning job.

    - `full_valid_loss: optional number`

    - `full_valid_mean_token_accuracy: optional number`

    - `step: optional number`

    - `train_loss: optional number`

    - `train_mean_token_accuracy: optional number`

    - `valid_loss: optional number`

    - `valid_mean_token_accuracy: optional number`

  - `object: "fine_tuning.job.checkpoint"`

    The object type, which is always "fine_tuning.job.checkpoint".

    - `"fine_tuning.job.checkpoint"`

  - `step_number: number`

    The step number that the checkpoint was created at.

- `has_more: boolean`

- `object: "list"`

  - `"list"`

- `first_id: optional string or null`

- `last_id: optional string or null`

### Example

```http
curl https://api.openai.com/v1/fine_tuning/jobs/$FINE_TUNING_JOB_ID/checkpoints \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "created_at": 0,
      "fine_tuned_model_checkpoint": "fine_tuned_model_checkpoint",
      "fine_tuning_job_id": "fine_tuning_job_id",
      "metrics": {
        "full_valid_loss": 0,
        "full_valid_mean_token_accuracy": 0,
        "step": 0,
        "train_loss": 0,
        "train_mean_token_accuracy": 0,
        "valid_loss": 0,
        "valid_mean_token_accuracy": 0
      },
      "object": "fine_tuning.job.checkpoint",
      "step_number": 0
    }
  ],
  "has_more": true,
  "object": "list",
  "first_id": "first_id",
  "last_id": "last_id"
}
```

### Example

```http
curl https://api.openai.com/v1/fine_tuning/jobs/ftjob-abc123/checkpoints \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "object": "list",
  "data": [
    {
      "object": "fine_tuning.job.checkpoint",
      "id": "ftckpt_zc4Q7MP6XxulcVzj4MZdwsAB",
      "created_at": 1721764867,
      "fine_tuned_model_checkpoint": "ft:gpt-4o-mini-2024-07-18:my-org:custom-suffix:96olL566:ckpt-step-2000",
      "metrics": {
        "full_valid_loss": 0.134,
        "full_valid_mean_token_accuracy": 0.874
      },
      "fine_tuning_job_id": "ftjob-abc123",
      "step_number": 2000
    },
    {
      "object": "fine_tuning.job.checkpoint",
      "id": "ftckpt_enQCFmOTGj3syEpYVhBRLTSy",
      "created_at": 1721764800,
      "fine_tuned_model_checkpoint": "ft:gpt-4o-mini-2024-07-18:my-org:custom-suffix:7q8mpxmy:ckpt-step-1000",
      "metrics": {
        "full_valid_loss": 0.167,
        "full_valid_mean_token_accuracy": 0.781
      },
      "fine_tuning_job_id": "ftjob-abc123",
      "step_number": 1000
    }
  ],
  "first_id": "ftckpt_zc4Q7MP6XxulcVzj4MZdwsAB",
  "last_id": "ftckpt_enQCFmOTGj3syEpYVhBRLTSy",
  "has_more": true
}
```
