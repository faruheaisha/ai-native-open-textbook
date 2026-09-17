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
pageSha256: "2105804ed282f12c0cd2a5f08d9b1546a8dca6e0f57bd8a8b0ab42c0735b8509"
contentMode: "local-full"
zh: ""
---

## Migrating to Claude Fable 5.1 from Claude Opus 4.8 or earlier

First apply [Migrating to Claude Mythos 5 and Claude Fable 5 from Claude Opus 4.8](https://platform.claude.com/docs/en/models/fable-5/migration-guide#migrating-from-claude-opus-48) for the API-level changes from Claude Opus 4.8. It covers adaptive thinking, thinking output, refusals, effort, the caching minimum, pricing, and data retention. Then apply the remaining delta in [Migrating to Claude Fable 5.1 from Claude Fable 5](https://platform.claude.com/docs/en/models/fable-5-1/migration-guide#migrating-from-claude-fable-5-to-claude-fable-5-1). On Claude Opus 4.7 or earlier, start with the matching [Migrating to Claude Opus 5](https://platform.claude.com/docs/en/models/opus-5/migration-guide) section.

### Update your model name

```python
model = "claude-opus-4-8"  # Before
model = "claude-fable-5-1"  # After

# Or, for the Project Glasswing model with the same capabilities:
model = "claude-mythos-5-1"  # After
```

### Migration checklist

* If your organization has a zero data retention (ZDR) arrangement, confirm eligibility first: these models aren't available under ZDR unless expressly authorized by Anthropic. Claude Opus 4.8 is available under ZDR.
* Update the model name from `claude-opus-4-8` to `claude-fable-5-1` (or `claude-mythos-5-1`).
* Remove any `thinking: \{type: "disabled"\}` configuration and revisit `max_tokens`. Requests without a `thinking` field run with adaptive thinking.
* Replace forced `tool_choice` (`any` or `tool`) with `auto` plus an explicit instruction (`user` turn or mid-conversation system message) and `strict: true` tools, or with JSON outputs.
* Pass `thinking` blocks back unchanged and treat their text as display-only. Claude Fable 5.1 reads Claude Opus 4.8's thinking blocks: a conversation that moves onto `claude-fable-5-1` keeps its earlier reasoning. Claude Opus 4.8 can't read Claude Fable 5.1's blocks.
* If your code builds the `messages` array itself, check whether it [edits earlier turns](https://platform.claude.com/docs/en/models/fable-5-1/migration-guide#fable-5-1-preserved-thinking). Integrations written for Claude Opus 4.8 and earlier often truncate old turns, strip or rebuild earlier messages, or refresh the `system` prompt each request, and Claude Opus 4.8 never objected. On `claude-fable-5-1` each of those invalidates later thinking blocks.
* Handle `stop_reason: "refusal"`, read `stop_details.category`, and consider `fallbacks: "default"` (beta).
* Apply the preserved-thinking, history-editing, behavior, per-message effort, and progress-update items from the [Claude Fable 5 checklist](https://platform.claude.com/docs/en/models/fable-5-1/migration-guide#migration-checklist-fable-5-1-from-fable-5).
* Re-evaluate `effort` (start at `high`), review prompts near the 512-token caching minimum, and re-baseline cost and latency. Per-token pricing differs.
