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
sourceRel: "docs/en/models/fable-5-1/migration-guide.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/models/fable-5-1/migration-guide.md"
sourceSha256: "d553e657a85ea3b35446879d56e77ca4b90a93d47ce4882b847f0ffdd810a18a"
pageSha256: "153f03e82524635051f3d5e4fb6da3ca4e8e382d4f0478d30e8761bbbdb61ae8"
contentMode: "local-full"
zh: ""
---

## Migrating to Claude Mythos 5.1 from Claude Mythos 5

[Claude Mythos 5.1](https://anthropic.com/glasswing) is the access-gated counterpart to Claude Fable 5.1. Confirm your organization's access with your Anthropic account team before switching model IDs.

The API-level delta matches [Migrating to Claude Fable 5.1 from Claude Fable 5](https://platform.claude.com/docs/en/models/fable-5-1/migration-guide#migrating-from-claude-fable-5-to-claude-fable-5-1): forced tool choice returns a 400 error, and thinking blocks are preserved only for the model that produced them or a newer one (Claude Mythos 5.1 reads Claude Mythos 5's blocks, not the reverse). Unlike Claude Fable 5.1, Claude Mythos 5.1 doesn't run the conversation check, so editing earlier turns doesn't [invalidate thinking blocks](https://platform.claude.com/docs/en/models/fable-5-1/migration-guide#fable-5-1-preserved-thinking), though it still restarts the prompt cache.

### Update your model name

```python
model = "claude-mythos-5"  # Before
model = "claude-mythos-5-1"  # After
```

### Migration checklist

* Update the model name from `claude-mythos-5` to `claude-mythos-5-1`.
* Replace forced `tool_choice` (`any` or `tool`) with `auto` plus an explicit instruction (`user` turn or mid-conversation system message) and `strict: true` tools, or with JSON outputs.
* Handle `stop_reason: "refusal"` and read `stop_details.category` before response content. See [Refusals and fallback](https://platform.claude.com/docs/en/build-with-claude/refusals-and-fallback).
* Keep passing `thinking` blocks back unchanged on every turn, including empty ones.
* If your code builds the `messages` array itself, keep conversation history append-only to keep the prompt cache warm. Claude Mythos 5.1 doesn't run the [conversation check](https://platform.claude.com/docs/en/build-with-claude/thinking#preserved-in-conversation), so edits don't invalidate its thinking blocks.
* Apply the behavior and recommended changes from the [Claude Fable 5 section](https://platform.claude.com/docs/en/models/fable-5-1/migration-guide#migrating-from-claude-fable-5-to-claude-fable-5-1), except the history-editing items, which don't apply to Claude Mythos 5.1.
* Re-evaluate `effort` with a fresh sweep and re-baseline cost and latency. Prompt cache reads cost a quarter of the Claude Mythos 5 rate.
