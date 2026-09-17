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
sourceRel: "docs/en/build-with-claude/claude-platform-on-aws.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/build-with-claude/claude-platform-on-aws.md"
sourceSha256: "0ff935251ef5bee607ae9d604d1c665269af87e8eda7c66c98362c1d5906779c"
pageSha256: "4d48667b3ef8ebe1d6ff8538c5dacebd7e97ddaafd1c26c1a469d1a8903bd248"
contentMode: "local-full"
zh: ""
---

## Rate limits and quotas

Organizations on Claude Platform on AWS are placed on the Start tier. Anthropic manages rate limits directly, not through AWS quota systems.

Organizations on Claude Platform on AWS do not move between usage tiers automatically. Usage-based tier advancement applies to first-party Claude API organizations, not to organizations billed through AWS Marketplace. The self-service **Request rate limit increase** flow in the Claude Console is also not available: the Rate limits page directs you to your Anthropic account representative instead.

To request higher limits, contact your Anthropic account representative or [Anthropic support](https://support.claude.com). Include the following in your request:

* The models you need raised
* Peak input tokens per minute and output tokens per minute for each model (not daily totals)
* The approximate share of your input that is cached or repeated context (cache reads don't count toward input-token limits for most models; see [cache-aware ITPM](https://platform.claude.com/docs/en/api/rate-limits#cache-aware-itpm))

Usage tiers are fixed steps: each tier pairs rate limits with a [monthly spend cap](https://platform.claude.com/docs/en/build-with-claude/claude-platform-on-aws#spend-limits), and moving to a higher tier raises both. For tier details and per-model limits, see [Rate limits](https://platform.claude.com/docs/en/api/rate-limits).
