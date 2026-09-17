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
pageSha256: "1f263b848939f40a51a6288a3ed6a2ac0170e2d485872f348a3061ed99dcca38"
contentMode: "local-full"
zh: ""
---

## How the Message Batches API works

When you send a request to the Message Batches API:

1. The system creates a new Message Batch with the provided Messages requests.
2. The batch is then processed asynchronously, with each request handled independently.
3. You can poll for the status of the batch and retrieve results when processing has ended for all requests.

This is especially useful for bulk operations that don't require immediate results, such as:

* Large-scale evaluations: Process thousands of test cases efficiently.
* Content moderation: Analyze large volumes of user-generated content asynchronously.
* Data analysis: Generate insights or summaries for large datasets.
* Bulk content generation: Create large amounts of text for various purposes (for example, product descriptions, article summaries).

### Batch limitations

* A Message Batch is limited to either 100,000 Message requests or 256 MB in size, whichever is reached first.
* The system processes each batch as fast as possible, with most batches completing within 1 hour. You can access batch results when all messages have completed or after 24 hours, whichever comes first. Batches expire if processing does not complete within 24 hours.
* Batch results are available for 29 days after creation. After that, you may still view the Batch, but its results will no longer be available for download.
* Batches are scoped to a [Workspace](https://platform.claude.com/settings/workspaces). You may view all batches (and their results) that were created within the Workspace your request runs in.
* Rate limits apply to both Batches API HTTP requests and the number of requests within a batch waiting to be processed. See [Message Batches API rate limits](https://platform.claude.com/docs/en/api/rate-limits#message-batches-api). Additionally, processing may be slowed down based on current demand and your request volume. In that case, you may see more requests expiring after 24 hours.
* Because of high throughput and concurrent processing, batches may go slightly over your Workspace's configured [spend limit](https://platform.claude.com/settings/billing).
* Each batched request must have `max_tokens` of at least `1`. `max_tokens: 0` ([cache pre-warming](https://platform.claude.com/docs/en/build-with-claude/prompt-caching#pre-warming-the-cache)) is not supported inside a batch, because an ephemeral cache entry written during batch processing would likely expire before the follow-up request runs.

### Supported models

All [active models](https://platform.claude.com/docs/en/models/overview) support the Message Batches API.

### What can be batched

Almost any request you can make to the Messages API can be included in a batch. This includes:

* Vision
* Tool use, including all [server tools](https://platform.claude.com/docs/en/agents-and-tools/tool-use/server-tools) (web search, web fetch, code execution, MCP connectors, advisor, and tool search)
* System messages
* Multi-turn conversations
* Extended thinking
* Most beta features

Because each request in the batch is processed independently, you can mix different types of requests within a single batch.

A small number of Messages API parameters are **not** supported in batch requests. Including any of these returns a validation error:

| Parameter                                                                              | Why                                                                                                                |
| -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `stream: true`                                                                         | Batch results come back as a single file, not a stream.                                                            |
| `speed` ([Fast mode](https://platform.claude.com/docs/en/build-with-claude/fast-mode)) | Fast mode tunes synchronous latency, which doesn't apply to asynchronous batch processing.                         |
| `max_tokens: 0`                                                                        | See [Batch limitations](https://platform.claude.com/docs/en/build-with-claude/batch-processing#batch-limitations). |

  Because batches can take longer than 5 minutes to process, consider using the [1-hour cache duration](https://platform.claude.com/docs/en/build-with-claude/prompt-caching#1-hour-cache-duration) with prompt caching for better cache hit rates when processing batches with shared context.
