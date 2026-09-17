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
pageSha256: "02a2d1d408409df44a6d90ec4ef6eacf029fcc2ba138083cca7b6bed92c84198"
contentMode: "local-full"
zh: ""
---

## Pricing

Prompt caching introduces a new pricing structure. The following table shows the price per million tokens for each supported model:

| Model                                                                                                                                 | Base input tokens | 5m cache writes | 1h cache writes | Cache hits and refreshes | Output tokens |
| ------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | --------------- | --------------- | ------------------------ | ------------- |
| Claude Fable 5.1                                                                                                                      | $10 / MTok        | $12.50 / MTok   | $20 / MTok      | $0.25 / MTok1            | $50 / MTok    |
| Claude Mythos 5.1 ([limited availability](https://anthropic.com/glasswing))                                                           | $10 / MTok        | $12.50 / MTok   | $20 / MTok      | $0.25 / MTok1            | $50 / MTok    |
| Claude Fable 5                                                                                                                        | $10 / MTok        | $12.50 / MTok   | $20 / MTok      | $1 / MTok                | $50 / MTok    |
| Claude Mythos 5 ([limited availability](https://anthropic.com/glasswing))                                                             | $10 / MTok        | $12.50 / MTok   | $20 / MTok      | $1 / MTok                | $50 / MTok    |
| Claude Opus 5                                                                                                                         | $5 / MTok         | $6.25 / MTok    | $10 / MTok      | $0.50 / MTok             | $25 / MTok    |
| Claude Opus 4.8                                                                                                                       | $5 / MTok         | $6.25 / MTok    | $10 / MTok      | $0.50 / MTok             | $25 / MTok    |
| Claude Opus 4.7                                                                                                                       | $5 / MTok         | $6.25 / MTok    | $10 / MTok      | $0.50 / MTok             | $25 / MTok    |
| Claude Opus 4.6                                                                                                                       | $5 / MTok         | $6.25 / MTok    | $10 / MTok      | $0.50 / MTok             | $25 / MTok    |
| Claude Opus 4.5                                                                                                                       | $5 / MTok         | $6.25 / MTok    | $10 / MTok      | $0.50 / MTok             | $25 / MTok    |
| Claude Opus 4.1 ([retired, except on Bedrock and Google Cloud](https://platform.claude.com/docs/en/about-claude/model-deprecations))  | $15 / MTok        | $18.75 / MTok   | $30 / MTok      | $1.50 / MTok             | $75 / MTok    |
| Claude Opus 4 ([retired, except on Google Cloud](https://platform.claude.com/docs/en/about-claude/model-deprecations))                | $15 / MTok        | $18.75 / MTok   | $30 / MTok      | $1.50 / MTok             | $75 / MTok    |
| Claude Sonnet 5                                                                                                                       | $2 / MTok         | $2.50 / MTok    | $4 / MTok       | $0.20 / MTok             | $10 / MTok    |
| Claude Sonnet 4.6                                                                                                                     | $3 / MTok         | $3.75 / MTok    | $6 / MTok       | $0.30 / MTok             | $15 / MTok    |
| Claude Sonnet 4.5                                                                                                                     | $3 / MTok         | $3.75 / MTok    | $6 / MTok       | $0.30 / MTok             | $15 / MTok    |
| Claude Sonnet 4 ([retired, except on Bedrock and Google Cloud](https://platform.claude.com/docs/en/about-claude/model-deprecations))  | $3 / MTok         | $3.75 / MTok    | $6 / MTok       | $0.30 / MTok             | $15 / MTok    |
| Claude Haiku 4.5                                                                                                                      | $1 / MTok         | $1.25 / MTok    | $2 / MTok       | $0.10 / MTok             | $5 / MTok     |
| Claude Haiku 3.5 ([retired, except on Bedrock and Google Cloud](https://platform.claude.com/docs/en/about-claude/model-deprecations)) | $0.80 / MTok      | $1 / MTok       | $1.60 / MTok    | $0.08 / MTok             | $4 / MTok     |

*1 Cache hits and refreshes on Claude Fable 5.1 and Claude Mythos 5.1 are priced at 0.025x the base input price. All other models use the standard 0.1x multiplier.*

  The previous table reflects the following pricing multipliers for prompt caching:

  * 5-minute cache write tokens are 1.25 times the base input tokens price
  * 1-hour cache write tokens are 2 times the base input tokens price
  * Cache read tokens are 0.1 times the base input tokens price (see the table footnote for per-model exceptions)

  These multipliers stack with other pricing modifiers such as the Batch API discount and data residency. See [pricing](https://platform.claude.com/docs/en/about-claude/pricing) for full details.

***
