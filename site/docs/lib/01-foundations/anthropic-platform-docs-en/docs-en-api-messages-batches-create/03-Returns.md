---
title: "Anthropic 平台文档（英文全量）"
sourceId: "01-foundations/anthropic-platform-docs-en"
sourceTitle: "Anthropic 平台文档（英文全量）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://platform.claude.com/docs"
entryUrl: "https://platform.claude.com/docs"
sourceRel: "docs/en/api/messages/batches/create.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/api/messages/batches/create.md"
sourceSha256: "1484537f56045315ee878c01c6fb7c9a30535eb84d87cec482461abfa180a9ce"
pageSha256: "2cf2bf467385a404d24e8ede09988a139f261eb0452ff85173d71f2affcfeaf0"
contentMode: "local-full"
zh: ""
---

## Returns

- `MessageBatch object`

  - `type: "message_batch"`

    Object type.

    For Message Batches, this is always `"message_batch"`.

    default: message_batch

  - `id: string`

    Unique object identifier.

    The format and length of IDs may change over time.

  - `archived_at: string or null`

    RFC 3339 datetime string representing the time at which the Message Batch was archived and its results became unavailable.

    format: date-time

  - `cancel_initiated_at: string or null`

    RFC 3339 datetime string representing the time at which cancellation was initiated for the Message Batch. Specified only if cancellation was initiated.

    format: date-time

  - `created_at: string`

    RFC 3339 datetime string representing the time at which the Message Batch was created.

    format: date-time

  - `ended_at: string or null`

    RFC 3339 datetime string representing the time at which processing for the Message Batch ended. Specified only once processing ends.

    Processing ends when every request in a Message Batch has either succeeded, errored, canceled, or expired.

    format: date-time

  - `expires_at: string`

    RFC 3339 datetime string representing the time at which the Message Batch will expire and end processing, which is 24 hours after creation.

    format: date-time

  - `processing_status: "in_progress" or "canceling" or "ended"`

    Processing status of the Message Batch.

    - `"in_progress"`

    - `"canceling"`

    - `"ended"`

  - `request_counts: MessageBatchRequestCounts`

    Tallies requests within the Message Batch, categorized by their status.

    Requests start as `processing` and move to one of the other statuses only once processing of the entire batch ends. The sum of all values always matches the total number of requests in the batch.

    - `canceled: number`

      Number of requests in the Message Batch that have been canceled.

      This is zero until processing of the entire Message Batch has ended.

      default: 0

    - `errored: number`

      Number of requests in the Message Batch that encountered an error.

      This is zero until processing of the entire Message Batch has ended.

      default: 0

    - `expired: number`

      Number of requests in the Message Batch that have expired.

      This is zero until processing of the entire Message Batch has ended.

      default: 0

    - `processing: number`

      Number of requests in the Message Batch that are processing.

      default: 0

    - `succeeded: number`

      Number of requests in the Message Batch that have completed successfully.

      This is zero until processing of the entire Message Batch has ended.

      default: 0

  - `results_url: string or null`

    URL to a `.jsonl` file containing the results of the Message Batch requests. Specified only once processing ends.

    Results in the file are not guaranteed to be in the same order as requests. Use the `custom_id` field to match results to requests.
