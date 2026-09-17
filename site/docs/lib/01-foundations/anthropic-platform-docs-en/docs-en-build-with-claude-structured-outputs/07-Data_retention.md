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
pageSha256: "18d92783be27f21f522bcacb0ad63a2a7504247db291a8b3c108b864b97b0d8b"
contentMode: "local-full"
zh: ""
---

## Data retention

Prompts and responses are processed with ZDR when using structured outputs. However, the JSON schema itself is temporarily cached for up to 24 hours since last use for optimization purposes. No prompt or response data is retained beyond the API response.

Structured outputs are HIPAA eligible, but **PHI must not be included in JSON schema definitions**. The API compiles JSON schemas into grammars that are cached separately from message content, and these cached schemas do not receive the same PHI protections as prompts and responses. Do not include PHI in schema property names, `enum` values, `const` values, or `pattern` regular expressions. PHI should only appear in message content (prompts and responses), where it is protected under HIPAA safeguards.

For ZDR and HIPAA eligibility across all features, see [API and data retention](https://platform.claude.com/docs/en/manage-claude/api-and-data-retention).
