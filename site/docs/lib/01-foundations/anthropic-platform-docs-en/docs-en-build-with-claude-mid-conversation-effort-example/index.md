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
sourceRel: "docs/en/build-with-claude/mid-conversation-effort-example.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/build-with-claude/mid-conversation-effort-example.md"
sourceSha256: "88a2fa6d07b354b90d37bbab7c6c1f65502776a31e4be76eaefe73d788798fbd"
pageSha256: "bdc0f65074a424dc25b68e4026fbd0d19556f9b1e35d51ce20d1fc69a0ed42e7"
contentMode: "local-full"
zh: ""
---

An orchestration mode is a session-level switch: when it is on, the model puts maximum thoroughness behind every substantive request, scouting the task itself and then fanning work out to parallel subagents by default. When it is off, the same orchestration tool goes back to per-request opt-in.

The mode is not an API parameter. It is built entirely from documented pieces:

1. **An effort level:** requests run at a documented [Effort](https://platform.claude.com/docs/en/build-with-claude/effort) value such as `xhigh`. There is no hidden level above the ones on that page. This example sets effort at the top level of each request, which needs no beta header.
2. **A mode reminder:** a [mid-conversation system message](https://platform.claude.com/docs/en/build-with-claude/mid-conversation-system-messages) tells the model the mode is active, with a one-line refresher every several turns and an exit notice when the mode is turned off. The top-level `system` field never changes, so the cached prefix stays intact.
3. **Standing consent in the tool description:** the orchestration tool's description states that while the mode is on, the model should author and run a workflow for every substantive task without asking first.

  This example uses mid-conversation system messages; for the models and platforms that support them, see [Mid-conversation system messages](https://platform.claude.com/docs/en/build-with-claude/mid-conversation-system-messages). The fan-out itself multiplies token usage: a single request can spawn many subagent conversations, so reserve the mode for work that justifies the cost.

## 本篇目录

- [Set up the loop](https://platform.claude.com/docs)
- [Define the mode reminders](https://platform.claude.com/docs)
- [Grant standing consent in the tool description](https://platform.claude.com/docs)
- [Run the bash tool locally](https://platform.claude.com/docs)
- [Run one subagent](https://platform.claude.com/docs)
- [Journal results so reruns resume](https://platform.claude.com/docs)
- [Fan out, then verify](https://platform.claude.com/docs)
- [Toggle the mode with mid-conversation system messages](https://platform.claude.com/docs)
- [Run it](https://platform.claude.com/docs)
- [Toward a production harness](https://platform.claude.com/docs)
- [Related](https://platform.claude.com/docs)
