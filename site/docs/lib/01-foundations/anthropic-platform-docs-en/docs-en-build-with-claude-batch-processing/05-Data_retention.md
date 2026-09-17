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
sourceRel: "docs/en/build-with-claude/batch-processing.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/build-with-claude/batch-processing.md"
sourceSha256: "e1df24b2de12d22c8eed0e85d4dbc46cf6c2e1c8300d6d635d0667fd22a439c4"
pageSha256: "62bae8f8ae4d4b4a83931da70218c51099ed0076f8774016620173f73372994b"
contentMode: "local-full"
zh: ""
---

## Data retention

Batch processing stores request and response data for up to 29 days after batch creation. You can delete a message batch at any time after processing using the `DELETE /v1/messages/batches/\{batch_id\}` endpoint. To delete an in-progress batch, cancel it first. Asynchronous processing requires server-side storage of both inputs and outputs until batch completion and result retrieval.

For ZDR eligibility across all features, see [API and data retention](https://platform.claude.com/docs/en/manage-claude/api-and-data-retention).
