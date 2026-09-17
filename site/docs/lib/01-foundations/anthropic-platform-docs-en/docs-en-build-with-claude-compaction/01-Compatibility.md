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
sourceRel: "docs/en/build-with-claude/compaction.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/build-with-claude/compaction.md"
sourceSha256: "ef6ae7f3db36c52dbf64d94eb4e299753f9fbfa31984a8699ff31a69f9de801b"
pageSha256: "257a2d7f7c2d494f1340283cb04836259d5631559488d8c20a3cdf9f6c09aa89"
contentMode: "local-full"
zh: ""
---

## Compatibility
- Status: Beta
- [Beta header](https://platform.claude.com/docs/en/api/beta-headers): `compact-2026-01-12`
- [ZDR](https://platform.claude.com/docs/en/manage-claude/api-and-data-retention): eligible (excludes [Covered Models](https://platform.claude.com/docs/en/manage-claude/api-and-data-retention#model-specific-data-retention-requirements))
- Supported models: `claude-fable-5-1`, `claude-mythos-5-1`, `claude-fable-5`, `claude-mythos-5`, `claude-mythos-preview`, `claude-opus-5`, `claude-opus-4-8`, `claude-opus-4-7`, `claude-opus-4-6`, `claude-sonnet-5`, `claude-sonnet-4-6`
- Platforms: Claude API (beta), Claude Platform on AWS (beta), Amazon Bedrock (beta), Google Cloud (beta), Microsoft Foundry (beta)

  Server-side compaction is the recommended strategy for managing context in long-running conversations and agentic workflows. It handles context management automatically, without client-side summarization code.

Compaction extends the effective context length for long-running conversations and tasks by automatically summarizing older context when approaching the context window limit. It also keeps the active context small: as a conversation grows, response quality degrades, so compaction replaces older content with a concise summary.

  For a deeper look at why long contexts degrade and how compaction helps, see [Effective context engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents).

This is ideal for:

* Chat-based, multi-turn conversations where you want users to use one chat for a long period of time
* Task-oriented prompts that require a lot of follow-up work (often tool use) that might exceed the context window
