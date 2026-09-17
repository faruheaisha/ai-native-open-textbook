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
sourceRel: "docs/en/build-with-claude/context-editing.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/build-with-claude/context-editing.md"
sourceSha256: "69cc82d4054f45a2f7ea239a67c946153f54af5b92acae1915b2166281ec6469"
pageSha256: "51372e034140184f242541bd9778e61b853191afd1c22a70f7415ef8eaa796e2"
contentMode: "local-full"
zh: ""
---

## Overview

  For most use cases, [server-side compaction](https://platform.claude.com/docs/en/build-with-claude/compaction) is the primary strategy for managing context in long-running conversations. The strategies on this page are useful for specific scenarios where you need more fine-grained control over what content is cleared.

Context editing allows you to selectively clear specific content from conversation history as it grows. Beyond optimizing costs and staying within limits, this is about actively curating what Claude sees: context is a finite resource with diminishing returns, and irrelevant content degrades model focus. Context editing gives you fine-grained runtime control over that curation. For the broader principles behind context management, see [Effective context engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents). This page covers:

* **Tool result clearing** - Best for agentic workflows with heavy tool use where old tool results are no longer needed
* **Thinking block clearing** - For managing thinking blocks when using extended thinking, with options to preserve recent thinking for context continuity
* **Client-side SDK compaction** - An SDK-based alternative for summary-based context management (server-side compaction is generally preferred)

| Approach        | Where it runs | Strategies                                                                                            | How it works                                                                                                                                                                                                                                                                                                                                                                                                |
| --------------- | ------------- | ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Server-side** | API           | Tool result clearing (`clear_tool_uses_20250919`) Thinking block clearing (`clear_thinking_20251015`) | Applied before the prompt reaches Claude. Clears specific content from conversation history. Each strategy can be configured independently.                                                                                                                                                                                                                                                                 |
| **Client-side** | SDK           | Compaction                                                                                            | Available in [TypeScript and Ruby SDKs](https://platform.claude.com/docs/en/cli-sdks-libraries/overview) when using [`tool_runner`](https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-runner). Generates a summary and replaces full conversation history. See [Client-side compaction](https://platform.claude.com/docs/en/build-with-claude/context-editing#client-side-compaction-sdk). |
