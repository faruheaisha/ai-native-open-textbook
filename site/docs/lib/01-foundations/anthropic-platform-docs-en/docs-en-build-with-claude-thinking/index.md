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
pageSha256: "cd33a1f9286a1224fb9b4ad36baf43d11c5de3ecbbf7c1c18c7999dac54ae939"
contentMode: "local-full"
zh: ""
---

To learn how zero data retention (ZDR) applies to this feature, see [API and data retention](https://platform.claude.com/docs/en/manage-claude/api-and-data-retention).

A model that answers in a single pass has to get everything right on the first try: no scratch work, no checking, no changing course halfway through. For a proof, a tricky bug, or a long agentic task, the first approach is often not the best one.

Thinking removes that constraint. When thinking is active, Claude works through the problem in its own words before answering: it restates what is being asked, tries approaches, checks intermediate results, and abandons paths that do not hold up. That reasoning arrives in `thinking` content blocks ahead of the response, and Claude draws on it to produce the final answer. This is why thinking improves performance on complex tasks like math, coding, analysis, and long-running agentic work, where the quality of the answer depends on intermediate work that would otherwise be compressed into the response itself or skipped.

Thinking has a cost: the tokens Claude spends reasoning are billed as output tokens, even when the thinking text isn't returned to you, and they count toward `max_tokens` alongside the response text. This page covers how thinking behaves across the API surface: turning it on, reading its output, and managing its interactions with tools, streaming, caching, and the context window.

## 本篇目录

- [How thinking works](https://platform.claude.com/docs)
- [Configuring thinking](https://platform.claude.com/docs)
- [Reading thinking output](https://platform.claude.com/docs)
- [Thinking and effort](https://platform.claude.com/docs)
- [Thinking with tool use](https://platform.claude.com/docs)
- [Preserved thinking](https://platform.claude.com/docs)
- [Thinking and prompt caching](https://platform.claude.com/docs)
- [Thinking and the context window](https://platform.claude.com/docs)
- [Thinking encryption](https://platform.claude.com/docs)
- [Redacted thinking blocks](https://platform.claude.com/docs)
- [Limits and feature compatibility](https://platform.claude.com/docs)
- [Next steps](https://platform.claude.com/docs)
