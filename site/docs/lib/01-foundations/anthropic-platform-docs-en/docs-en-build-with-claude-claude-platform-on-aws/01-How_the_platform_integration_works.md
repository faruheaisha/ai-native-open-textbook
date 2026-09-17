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
pageSha256: "dd27ea3e2bdb0da7faf08621c4642307d10351b35fea9ef74038ff9d191e2f2d"
contentMode: "local-full"
zh: ""
---

## How the platform integration works

Claude models run on Anthropic-managed infrastructure. This is a commercial integration for billing and access through AWS. Anthropic is the data processor for inference inputs and outputs. AWS processes billing and identity metadata under the marketplace model. Customers using Claude through Claude Platform on AWS are subject to Anthropic's [data use terms](https://www.anthropic.com/legal).

Claude Platform on AWS has the following operational characteristics: data might not reside in AWS, inference might route to Anthropic's primary cloud, and subservices might change without notice. Set the [`inference_geo`](https://platform.claude.com/docs/en/build-with-claude/claude-platform-on-aws#data-residency) parameter per request to pin inference to a specific geography.

Claude Platform on AWS follows the same data retention policy as the first-party Claude API. Zero Data Retention (ZDR) is available on request. Contact your Anthropic account representative to enable it for your organization.
