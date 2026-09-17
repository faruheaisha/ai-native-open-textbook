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
sourceRel: "docs/en/build-with-claude/structured-outputs.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/build-with-claude/structured-outputs.md"
sourceSha256: "4e500fed30c759764ba06bcd96b9df7160ecb8e5e7611aae9bc229086e0b9204"
pageSha256: "3dcf8c35580d6d8ac0d5c3a051150764c8bc517d55f45ef53d9fadbf5a2347e7"
contentMode: "local-full"
zh: ""
---

## Compatibility
- [ZDR](https://platform.claude.com/docs/en/manage-claude/api-and-data-retention): eligible (excludes [Covered Models](https://platform.claude.com/docs/en/manage-claude/api-and-data-retention#model-specific-data-retention-requirements))
- Supported models: `claude-fable-5-1`, `claude-mythos-5-1`, `claude-fable-5`, `claude-mythos-5`, `claude-mythos-preview`, `claude-opus-5`, `claude-opus-4-8`, `claude-opus-4-7`, `claude-opus-4-6`, `claude-sonnet-5`, `claude-sonnet-4-6`, `claude-sonnet-4-5-20250929`, `claude-opus-4-5-20251101`, `claude-haiku-4-5-20251001`
- Platforms: Claude API, Claude Platform on AWS, Amazon Bedrock [1], Google Cloud, Microsoft Foundry
1. On Amazon Bedrock, structured outputs are available for Claude Opus 4.6, Claude Sonnet 4.6, Claude Sonnet 4.5, Claude Opus 4.5, and Claude Haiku 4.5.

Structured outputs constrain Claude's responses to follow a specific schema, ensuring valid, parseable output for downstream processing. Structured outputs provide two complementary features:

* **JSON outputs** (`output_config.format`): Get Claude's response in a specific JSON format
* **Strict tool use** (`strict: true`): Guarantee schema validation on tool names and inputs

You can use these features independently or together in the same request.

  **Migrating from beta?** The `output_format` parameter has moved to `output_config.format`, and beta headers are no longer required. The API continues to accept the old beta header (`structured-outputs-2025-11-13`) and the `output_format` request field for a transition period, but the Python SDK (v1.0 and later) does not accept `output_format=\{...\}` on `client.beta.messages.create()` or `count_tokens()` and raises a `TypeError`; use `output_config` instead. See the following code examples for the updated API shape.
