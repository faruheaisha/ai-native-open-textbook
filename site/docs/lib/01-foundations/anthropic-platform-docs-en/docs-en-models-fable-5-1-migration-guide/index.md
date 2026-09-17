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
pageSha256: "1d46078ff2011c24c3954866ac36249c70371553b345e781d7c5e41fd930a933"
contentMode: "local-full"
zh: ""
---

This guide covers migrating [Messages API](https://platform.claude.com/docs/en/build-with-claude/working-with-messages) code. If you use [Claude Managed Agents](https://platform.claude.com/docs/en/managed-agents/overview), no changes beyond updating the model name are required.

  **Automate your migration with the Claude API skill.** In Claude Code, run `/claude-api migrate` to invoke the bundled [Claude API skill](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/claude-api-skill#migrating-to-a-newer-claude-model). It works for any current Claude model as the target:

  ```text wrap
  /claude-api migrate this project to claude-fable-5-1
  ```

  The skill applies the model ID swap and, as needed, breaking parameter changes, prefill replacement, and effort calibration for your target model across your code base, then produces a checklist of items to verify manually. It asks you to confirm the migration scope (entire working directory, a subdirectory, or a specific file list) before editing any files. The skill also detects Amazon Bedrock and Claude Platform on AWS clients and adjusts model ID formats and feature changes for those platforms.

[Claude Fable 5.1](https://platform.claude.com/docs/en/models/fable-5-1/whats-new-fable-5-1) succeeds Claude Fable 5 at the same input and output prices, with cache reads at a quarter of the cost. It's available on the Claude API, [Amazon Bedrock](https://platform.claude.com/docs/en/build-with-claude/claude-in-amazon-bedrock), [Claude Platform on AWS](https://platform.claude.com/docs/en/build-with-claude/claude-platform-on-aws), [Google Cloud](https://platform.claude.com/docs/en/build-with-claude/claude-on-vertex-ai), and [Microsoft Foundry](https://platform.claude.com/docs/en/build-with-claude/claude-in-microsoft-foundry). [Claude Mythos 5.1](https://anthropic.com/glasswing) shares the same capabilities and is offered only to approved customers in Project Glasswing. For behavioral differences and prompting patterns, see [Prompting Claude Fable 5.1](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-1).

The baseline settings shared by `claude-fable-5-1` and `claude-mythos-5-1`:

* **Thinking:** [Adaptive thinking](https://platform.claude.com/docs/en/build-with-claude/thinking) is always on, unchanged from Claude Fable 5. The model decides when and how much to think. No `thinking` configuration is required. Both `thinking: \{type: "disabled"\}` and manual extended thinking (`thinking: \{type: "enabled", budget_tokens: N\}`) return a 400 error.
* **Prefill:** Prefilling the assistant message returns a 400 error, unchanged from Claude Fable 5. Use system prompt instructions instead.
* **Tool choice:** `\{type: "auto"\}` (the default) and `\{type: "none"\}` are supported. Forcing a tool call with `\{type: "any"\}` or `\{type: "tool", name: "..."\}` returns a 400 error. See [Breaking changes](https://platform.claude.com/docs/en/models/fable-5-1/migration-guide#fable-5-1-breaking-changes).
* **Preserved thinking across models:** Claude Fable 5.1 reads thinking blocks from Claude Opus 5, Claude Fable 5, Claude Mythos 5, and earlier Claude models. None of those models can read Claude Fable 5.1's blocks. See [Breaking changes](https://platform.claude.com/docs/en/models/fable-5-1/migration-guide#fable-5-1-breaking-changes).
* **Context window and output:** A [1M token context window](https://platform.claude.com/docs/en/build-with-claude/context-windows) by default, and up to 128k output tokens per request.
* **Pricing:** $10 USD per million input tokens and $50 USD per million output tokens, the same as Claude Fable 5. Prompt cache reads are $0.25 USD per million tokens, a quarter of the Claude Fable 5 rate. See [Claude pricing](https://platform.claude.com/docs/en/about-claude/pricing).
* **Data retention:** Both models require 30-day data retention, aren't available under zero data retention (ZDR) arrangements unless expressly authorized by Anthropic, and are designated Covered Models, the same as Claude Fable 5 and Claude Mythos 5. On the Claude API, a request from an organization or workspace without 30-day retention returns a 400 `invalid_request_error`. Organizations with a ZDR arrangement should contact their Anthropic account team, or configure retention per workspace. See [Model-specific data retention requirements](https://platform.claude.com/docs/en/manage-claude/api-and-data-retention#model-specific-data-retention-requirements) for per-platform details.

Where the two models diverge:

* **Availability:** Claude Fable 5.1 doesn't require access approval. Claude Mythos 5.1 is available only to approved customers in [Project Glasswing](https://anthropic.com/glasswing). Contact your Anthropic account team for access.
* **Safety classifiers:** Claude Fable 5.1 runs safety classifiers covering the same `stop_details` categories as Claude Fable 5. A declined request returns `stop_reason: "refusal"` with a `stop_details.category`, and can fall back to another model with the `fallbacks` parameter or a client-side retry. See [Refusals and fallback](https://platform.claude.com/docs/en/build-with-claude/refusals-and-fallback).
* **Priority Tier:** Neither model is supported on [Priority Tier](https://platform.claude.com/docs/en/api/service-tiers#supported-models). Claude Fable 5 is.

## 本篇目录

- [Migrating to Claude Fable 5.1 from Claude Fable 5](https://platform.claude.com/docs)
- [Migrating to Claude Fable 5.1 from Claude Opus 5](https://platform.claude.com/docs)
- [Migrating to Claude Fable 5.1 from Claude Opus 4.8 or earlier](https://platform.claude.com/docs)
- [Migrating to Claude Mythos 5.1 from Claude Mythos 5](https://platform.claude.com/docs)
