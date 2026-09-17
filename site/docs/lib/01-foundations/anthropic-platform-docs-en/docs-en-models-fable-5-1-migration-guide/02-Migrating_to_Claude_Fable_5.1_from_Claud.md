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
pageSha256: "5b88dd6e2d813d1e3dd023913e4b0f6b8d8da8c08808e88d9c561e4765c964f8"
contentMode: "local-full"
zh: ""
---

## Migrating to Claude Fable 5.1 from Claude Opus 5

Claude Fable 5.1 uses the same [Messages API](https://platform.claude.com/docs/en/build-with-claude/working-with-messages) and [tool use](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview) patterns as Claude Opus 5. It keeps the [1M token context window](https://platform.claude.com/docs/en/build-with-claude/context-windows) by default, [128k max output tokens](https://platform.claude.com/docs/en/models/overview), the 512-token prompt caching minimum, and [mid-conversation system message](https://platform.claude.com/docs/en/build-with-claude/mid-conversation-system-messages) support. The prefill restriction, the sampling-parameter restriction, and the `"omitted"` default for `thinking.display` also carry over. Apply everything in [Migrating to Claude Fable 5.1 from Claude Fable 5](https://platform.claude.com/docs/en/models/fable-5-1/migration-guide#migrating-from-claude-fable-5-to-claude-fable-5-1), plus the following.

### Update your model name

```python
model = "claude-opus-5"  # Before
model = "claude-fable-5-1"  # After

# Or, for the Project Glasswing model with the same capabilities:
model = "claude-mythos-5-1"  # After
```

### What changed

1. **Thinking can no longer be disabled:** Claude Opus 5 accepts `thinking: \{type: "disabled"\}` at an [effort](https://platform.claude.com/docs/en/build-with-claude/effort) level of `high` or lower. On `claude-fable-5-1` and `claude-mythos-5-1`, [adaptive thinking](https://platform.claude.com/docs/en/build-with-claude/thinking) is always on, and `thinking: \{type: "disabled"\}` returns a 400 error at any effort level. Remove the field, control token spend with lower effort levels, and revisit `max_tokens` for workloads that ran with thinking disabled.

2. **Forced tool choice is not supported:** Claude Opus 5 accepts `tool_choice` `any` and `tool`. `claude-fable-5-1` returns a 400 error. See [Breaking changes](https://platform.claude.com/docs/en/models/fable-5-1/migration-guide#fable-5-1-breaking-changes).

3. **Preserved thinking across models:** Claude Fable 5.1 reads Claude Opus 5's thinking blocks: conversations moving from `claude-opus-5` to `claude-fable-5-1` keep their reasoning. Claude Opus 5 can't read Claude Fable 5.1's blocks. Claude Fable 5.1's blocks also [stop being valid when earlier turns change](https://platform.claude.com/docs/en/models/fable-5-1/migration-guide#fable-5-1-preserved-thinking): if your code edits earlier messages, rebuilds `system` or `tools`, or compacts on the client between requests, Claude Opus 5 didn't object, but `claude-fable-5-1` rejects or drops every later thinking block. Run the three-step check in that section before switching traffic. See [Breaking changes](https://platform.claude.com/docs/en/models/fable-5-1/migration-guide#fable-5-1-breaking-changes).

4. **Text between tool calls is returned in thinking blocks:** On Claude Opus 5, text the model writes between tool calls comes back as `text` blocks. On `claude-fable-5-1`, as on Claude Fable 5, that narration comes back as progress-update `thinking` blocks, one before each tool call. Under the default `thinking.display` of `"omitted"`, they carry no readable text. If your interface renders that narration, set `display: "updates"` (beta) to receive progress updates as text while reasoning stays hidden, or `"summarized"` to receive both. Then render the non-empty `thinking` blocks between `tool_use` blocks. See [Progress updates between tool calls](https://platform.claude.com/docs/en/build-with-claude/thinking#progress-updates).

5. **Safety classifiers and fallback routing:** Claude Fable 5.1 runs safety classifiers covering the same `stop_details` categories as Claude Fable 5, a broader set than Claude Opus 5's cybersecurity-only classifiers. Expect `stop_details.category` values beyond `"cyber"`, such as `"bio"` and `"reasoning_extraction"`; see the [refusal category table](https://platform.claude.com/docs/en/build-with-claude/refusals-and-fallback#refusal-response) for the full set. For `fallbacks` configuration and permitted targets, see [Use `fallbacks: "default"` for refusals](https://platform.claude.com/docs/en/models/fable-5-1/migration-guide#fable-5-1-recommended-changes).

6. **Pricing:** $10 USD per million input tokens and $50 USD per million output tokens, compared with $5 USD and $25 USD for Claude Opus 5. Prompt cache reads are $0.25 USD per million tokens, half the Claude Opus 5 rate. See [Claude pricing](https://platform.claude.com/docs/en/about-claude/pricing).

7. **Data retention:** Claude Fable 5.1 and Claude Mythos 5.1 require 30-day data retention, aren't available under zero data retention (ZDR) arrangements unless expressly authorized by Anthropic, and are designated Covered Models. Claude Opus 5 is available under ZDR. See [Model-specific data retention requirements](https://platform.claude.com/docs/en/manage-claude/api-and-data-retention#model-specific-data-retention-requirements).

### Migration checklist

* If your organization has a zero data retention (ZDR) arrangement, confirm eligibility first: these models aren't available under ZDR unless expressly authorized by Anthropic. See [Model-specific data retention requirements](https://platform.claude.com/docs/en/manage-claude/api-and-data-retention#model-specific-data-retention-requirements).
* Update the model name from `claude-opus-5` to `claude-fable-5-1` (or `claude-mythos-5-1`).
* Remove any `thinking: \{type: "disabled"\}` configuration: it returns a 400 error on `claude-fable-5-1`. Control token spend with lower [effort](https://platform.claude.com/docs/en/build-with-claude/effort) levels, and revisit `max_tokens`.
* Replace forced `tool_choice` (`any` or `tool`) with `auto` plus an explicit instruction (`user` turn or mid-conversation system message) and `strict: true` tools, or with JSON outputs.
* If your interface renders text between tool calls, set `display: "updates"` (beta) or `"summarized"` and render the non-empty `thinking` blocks.
* Apply the preserved-thinking, history-editing, behavior, effort, and fallback items from the [Claude Fable 5 checklist](https://platform.claude.com/docs/en/models/fable-5-1/migration-guide#migration-checklist-fable-5-1-from-fable-5).
* Re-baseline cost on your own workloads. The tokenizer is unchanged. Per-token pricing differs.
