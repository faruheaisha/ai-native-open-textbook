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
sourceRel: "docs/en/build-with-claude/prompt-caching.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/build-with-claude/prompt-caching.md"
sourceSha256: "89fd9a1e988ae4902de1047706ee788003060cb232e444ad4cf37a11421d42a4"
pageSha256: "cc46859d16cba23be329d56f63eb00fe5c1dcbc3a5485039f4520a59e4de30cf"
contentMode: "local-full"
zh: ""
---

## 1-hour cache duration

If you find that 5 minutes is too short, Anthropic also offers a 1-hour cache duration [at additional cost](https://platform.claude.com/docs/en/build-with-claude/prompt-caching#pricing).

  The 1-hour cache duration is available on the Claude API, [Amazon Bedrock](https://platform.claude.com/docs/en/build-with-claude/claude-in-amazon-bedrock), [Amazon Bedrock (Opus 4.6 and earlier)](https://platform.claude.com/docs/en/build-with-claude/claude-on-amazon-bedrock-legacy), [Claude Platform on AWS](https://platform.claude.com/docs/en/build-with-claude/claude-platform-on-aws), [Google Cloud](https://platform.claude.com/docs/en/build-with-claude/claude-on-vertex-ai), and [Microsoft Foundry](https://platform.claude.com/docs/en/build-with-claude/claude-in-microsoft-foundry).

To use the extended cache, include `ttl` in the `cache_control` definition like this:

```json
"cache_control": {
  "type": "ephemeral",
  "ttl": "1h"
}
```

The response includes detailed cache information like the following:

```json Output
{
  "usage": {
    "input_tokens": 2048,
    "cache_read_input_tokens": 1800,
    "cache_creation_input_tokens": 248,
    "output_tokens": 503,

    "cache_creation": {
      "ephemeral_5m_input_tokens": 148,
      "ephemeral_1h_input_tokens": 100
    }
  }
}
```

Note that the current `cache_creation_input_tokens` field equals the sum of the values in the `cache_creation` object.

If you see `ephemeral_5m_input_tokens` writes you didn't request while using server tools such as web search, see [Tool use with prompt caching](https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-use-with-prompt-caching#server-tool-results-are-cached-automatically).

### When to use the 1-hour cache

If you have prompts that are used at a regular cadence (that is, system prompts that are used more frequently than every 5 minutes), continue to use the 5-minute cache, because this will continue to be refreshed at no additional charge.

The 1-hour cache is best used in the following scenarios:

* When you have prompts that are likely used less frequently than 5 minutes, but more frequently than every hour. For example, when an agentic side-agent will take longer than 5 minutes, or when storing a long chat conversation with a user and you generally expect that user may not respond in the next 5 minutes.
* When latency is important and your follow up prompts may be sent beyond 5 minutes.
* When you want to improve your rate limit utilization, because cache hits are not deducted against your rate limit.

  The 5-minute and 1-hour cache behave the same with respect to latency. You will generally see improved time-to-first-token for long documents.

### Mixing different TTLs

You can use both 1-hour and 5-minute cache controls in the same request, but with an important constraint: Cache entries with longer TTL must appear before shorter TTLs (that is, a 1-hour cache entry must appear before any 5-minute cache entries).

When mixing TTLs, the API determines three billing locations in your prompt:

1. Position `A`: The token count at the highest cache hit (or 0 if no hits).
2. Position `B`: The token count at the highest 1-hour `cache_control` block after `A` (or equals `A` if none exist).
3. Position `C`: The token count at the last `cache_control` block.

  If `B` or `C` is larger than `A`, it is necessarily a cache miss, because `A` is the highest cache hit.

You'll be charged for:

1. Cache read tokens for `A`.
2. 1-hour cache write tokens for `(B - A)`.
3. 5-minute cache write tokens for `(C - B)`.

Here are three examples. This depicts the input tokens of 3 requests, each of which has different cache hits and cache misses. Each has a different calculated pricing, shown in the colored boxes, as a result. ![Mixing TTLs Diagram](https://platform.claude.com/docs/images/prompt-cache-mixed-ttl.svg)

***
