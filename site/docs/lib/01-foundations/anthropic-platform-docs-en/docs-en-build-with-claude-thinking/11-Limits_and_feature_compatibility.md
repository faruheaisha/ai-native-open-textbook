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
sourceRel: "docs/en/build-with-claude/thinking.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/build-with-claude/thinking.md"
sourceSha256: "9baa0fba3a60b873c42b66b2ab09b9b42ec60b2d7d45aa79f9500646e562eadd"
pageSha256: "5d37a49fc3aa913fbd8ae6538170363d81207d969e911ceb067e193089ed4f35"
contentMode: "local-full"
zh: ""
---

## Limits and feature compatibility

### Sampling parameters

On Claude Fable 5.1, Claude Mythos 5.1, Claude Fable 5, Claude Mythos 5, Claude Mythos Preview, Claude Opus 5, Claude Opus 4.8, Claude Opus 4.7, and Claude Sonnet 5, non-default `temperature`, `top_p`, or `top_k` values return a 400 error on every request, regardless of whether thinking is used. On older models, the restriction applies only while thinking is on: `temperature` and `top_k` are incompatible with thinking, and `top_p` is allowed at values between 0.95 and 1.

### Response prefill and forced tool use

You can't prefill the assistant response while thinking is on. Forced tool use (`tool_choice: \{"type": "any"\}` or `\{"type": "tool", ...\}`) is incompatible with manual extended thinking but works with adaptive thinking. The exceptions are Claude Fable 5.1 and Claude Mythos 5.1, which reject forced tool use on every request with a 400 error. On those models, use `tool_choice: \{"type": "auto"\}` with [strict tool use](https://platform.claude.com/docs/en/agents-and-tools/tool-use/strict-tool-use) or [structured outputs](https://platform.claude.com/docs/en/build-with-claude/structured-outputs) instead. See [Thinking with tool use](https://platform.claude.com/docs/en/build-with-claude/thinking#thinking-with-tool-use).

### Output limits

Each model accepts `max_tokens` up to the ceiling listed here. On the [Message Batches API](https://platform.claude.com/docs/en/build-with-claude/batch-processing#extended-output-beta), the `output-300k-2026-03-24` [beta header](https://platform.claude.com/docs/en/api/beta-headers) raises that ceiling for the models with a batches ceiling listed.

| Model                 | Max output tokens | Batches beta ceiling |
| --------------------- | ----------------- | -------------------- |
| Claude Fable 5.1      | 128k              | —                    |
| Claude Mythos 5.1     | 128k              | —                    |
| Claude Fable 5        | 128k              | —                    |
| Claude Mythos 5       | 128k              | —                    |
| Claude Mythos Preview | 128k              | Not available        |
| Claude Opus 5         | 128k              | 300k                 |
| Claude Opus 4.8       | 128k              | 300k                 |
| Claude Opus 4.7       | 128k              | 300k                 |
| Claude Sonnet 5       | 128k              | 300k                 |
| Claude Opus 4.6       | 128k              | 300k                 |
| Claude Sonnet 4.6     | 128k              | 300k                 |
| Claude Haiku 4.5      | 64k               | Not available        |
| Claude Sonnet 4.5     | 64k               | Not available        |
| Claude Opus 4.5       | 64k               | Not available        |

See the [models overview](https://platform.claude.com/docs/en/models/overview) for limits on legacy models.

### Long requests

The SDKs require streaming when `max_tokens` is greater than 21,333, to avoid HTTP timeouts on long-running requests. This is a client-side validation, not an API restriction. If you don't need to process events incrementally, use `.stream()` with `.get_final_message()` (Python) or `.finalMessage()` (TypeScript) to get the complete `Message` object without handling individual events. See [Streaming Messages](https://platform.claude.com/docs/en/build-with-claude/streaming#get-the-final-message-without-handling-events). Expect longer response times when thinking is active, because generating thinking blocks adds processing time. For workloads that push thinking above roughly 32k tokens per request, use [batch processing](https://platform.claude.com/docs/en/build-with-claude/batch-processing) to avoid networking issues: such requests can run long enough to hit system timeouts and open connection limits.
