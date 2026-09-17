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
sourceRel: "docs/en/api/beta/messages/batches.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/api/beta/messages/batches.md"
sourceSha256: "f8c5141712b7488424ab9999f688685bb3640d87a0547cd59a1cf5d86afa882a"
pageSha256: "ff930a4b86df3953695216d367d79f6189131d9daefca892f0794992786d0674"
contentMode: "local-full"
zh: ""
---

### Beta Message Batch Request Counts

- `BetaMessageBatchRequestCounts object`

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
