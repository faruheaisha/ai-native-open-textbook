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
sourceRel: "api/reference/resources/fine_tuning.md"
rawUrl: "/raw/01-foundations/openai-api-reference-en/api/reference/resources/fine_tuning.md"
sourceSha256: "e0974138bdb9539a52739978d6d40b6a6890cc30d8e4e4a54c77787b424404b1"
pageSha256: "436935017cee150aa8a5b857d04dbed590dc4806e8689c5d116830d2cec810aa"
contentMode: "local-full"
zh: ""
---

## List fine-tuning events

**get** `/fine_tuning/jobs/\{fine_tuning_job_id\}/events`

Get status updates for a fine-tuning job.

### Path Parameters

- `fine_tuning_job_id: string`

### Query Parameters

- `after: optional string`

  Identifier for the last event from the previous pagination request.

- `limit: optional number`

  Number of events to retrieve.

### Returns

- `data: array of FineTuningJobEvent`

  - `id: string`

    The object identifier.

  - `created_at: number`

    The Unix timestamp (in seconds) for when the fine-tuning job was created.

  - `level: "info" or "warn" or "error"`

    The log level of the event.

    - `"info"`

    - `"warn"`

    - `"error"`

  - `message: string`

    The message of the event.

  - `object: "fine_tuning.job.event"`

    The object type, which is always "fine_tuning.job.event".

    - `"fine_tuning.job.event"`

  - `data: optional unknown`

    The data associated with the event.

  - `type: optional "message" or "metrics"`

    The type of event.

    - `"message"`

    - `"metrics"`

- `has_more: boolean`

- `object: "list"`

  - `"list"`

### Example

```http
curl https://api.openai.com/v1/fine_tuning/jobs/$FINE_TUNING_JOB_ID/events \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "created_at": 0,
      "level": "info",
      "message": "message",
      "object": "fine_tuning.job.event",
      "data": {},
      "type": "message"
    }
  ],
  "has_more": true,
  "object": "list"
}
```

### Example

```http
curl https://api.openai.com/v1/fine_tuning/jobs/ftjob-abc123/events \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "object": "list",
  "data": [
    {
      "object": "fine_tuning.job.event",
      "id": "ft-event-ddTJfwuMVpfLXseO0Am0Gqjm",
      "created_at": 1721764800,
      "level": "info",
      "message": "Fine tuning job successfully completed",
      "data": null,
      "type": "message"
    },
    {
      "object": "fine_tuning.job.event",
      "id": "ft-event-tyiGuB72evQncpH87xe505Sv",
      "created_at": 1721764800,
      "level": "info",
      "message": "New fine-tuned model created: ft:gpt-4o-mini:openai::7p4lURel",
      "data": null,
      "type": "message"
    }
  ],
  "has_more": true
}
```
