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
pageSha256: "ef9f035c8cc1c007ee4588af60468ac5064e123d8a1756ea7d2c864e69f5bb44"
contentMode: "local-full"
zh: ""
---

## FAQ

    Batches may take up to 24 hours for processing, but many finish sooner. Actual processing time depends on the size of the batch, current demand, and your request volume. It is possible for a batch to expire and not complete within 24 hours.

    See [Supported models](https://platform.claude.com/docs/en/build-with-claude/batch-processing#supported-models) for the list of supported models.

    Yes, the Message Batches API supports nearly all features available in the Messages API, including most beta features. A small number of parameters (`stream`, `speed`, and `max_tokens: 0`) are not supported. See [What can be batched](https://platform.claude.com/docs/en/build-with-claude/batch-processing#what-can-be-batched) for the full list.

    The Message Batches API offers a 50% discount on all usage compared to standard API prices. This applies to input tokens, output tokens, and any special tokens. For more on pricing, visit [Pricing](https://claude.com/pricing#anthropic-api).

    No, once a batch has been submitted, it cannot be modified. If you need to make changes, you should cancel the current batch and submit a new one. Note that cancellation may not take immediate effect.

    The Message Batches API has HTTP requests-based rate limits in addition to limits on the number of requests in need of processing. See [Message Batches API rate limits](https://platform.claude.com/docs/en/api/rate-limits#message-batches-api). Usage of the Batches API does not affect rate limits in the Messages API.

    When you retrieve the results, each request has a `result` field indicating whether it `succeeded`, `errored`, was `canceled`, or `expired`. For `errored` results, additional error information is provided. View the error response object in the [API reference](https://platform.claude.com/docs/en/api/messages/batches/create).

    The Message Batches API is designed with strong privacy and data separation measures:

    1. Batches and their results are isolated within the Workspace in which they were created. This means they can only be accessed by API requests in that same Workspace.
    2. Each request within a batch is processed independently, with no data leakage between requests.
    3. Results are only available for a limited time (29 days), and follow Anthropic's [data retention policy](https://support.claude.com/en/articles/7996866-how-long-do-you-store-personal-data).
    4. Downloading batch results in the Console can be disabled on the organization-level or on a per-workspace basis.

    Yes, it is possible to use prompt caching with Message Batches API. However, because asynchronous batch requests can be processed concurrently and in any order, cache hits are provided on a best-effort basis.
