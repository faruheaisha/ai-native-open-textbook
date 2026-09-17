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
sourceRel: "docs/en/managed-agents/events-and-streaming.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/managed-agents/events-and-streaming.md"
sourceSha256: "b681673ea44583d365ff7c008a149752bfe4251979591e4b054076f37e5ece85"
pageSha256: "df6977970a011355d26ac7a4abdea38bfe5ffb0556baa424cc31747419da7527"
contentMode: "local-full"
zh: ""
---

## Debugging tips

* **Check session events:** Session errors are conveyed through the `session.error` event
* **Review tool results:** Tool execution failures often explain unexpected agent behavior
* **Track token usage:** Monitor token consumption to optimize prompts and reduce costs
* **Use system prompts:** Add logging instructions to the system prompt to make the agent explain its reasoning
* **Troubleshoot previews:** If a stream that opts in to event deltas doesn't behave as you expect, see [Troubleshoot previews](https://platform.claude.com/docs/en/managed-agents/events-and-streaming#troubleshoot-previews)
