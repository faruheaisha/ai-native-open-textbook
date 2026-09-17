---
title: "claude-code-docs-official"
sourceId: "09-harness/claude-code-docs-official"
sourceTitle: "claude-code-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://code.claude.com/docs"
entryUrl: "https://code.claude.com/docs"
sourceRel: "en/model-config.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/model-config.md"
sourceSha256: "a8b6116a31f02c7ae380d0a2e8d33a5293115aefe25fb82599fd77af15b7432f"
pageSha256: "86733d4fa761ae173c4fc0d3d5be56f30d8ba11ce61e137f44b12865373d3c39"
contentMode: "local-full"
zh: ""
---

## Context window and auto-compaction

The auto-compact window is how full the context window can get before Claude Code compacts the conversation. For what compaction keeps and drops per mechanism, see [What survives compaction](https://code.claude.com/docs/en/context-window#what-survives-compaction).

### Set the auto-compact window

You can set the auto-compact window in three places:

* **For this session and later ones**: run `/autocompact` with a value, like `/autocompact 500k`. Claude Code saves it to your user settings as [`autoCompactWindow`](https://code.claude.com/docs/en/settings-reference#autocompactwindow) and applies it to the current session; if a higher-priority [settings scope](https://code.claude.com/docs/en/settings#settings-precedence) such as managed settings sets the key, the command saves your value but the session keeps that scope's window, and the command says so. Run `/autocompact auto` to return to the window tuned for your model.
* **For one launch**: pass [`--autocompact`](https://code.claude.com/docs/en/cli-reference#cli-flags) when starting Claude Code. The flag overrides your saved setting for that launch without changing it, and `claude --autocompact auto` runs the session at the tuned window even if your saved setting has a value. Unlike `/autocompact`, the flag isn't preempted by a higher-priority settings scope such as managed settings.
* **In scripts and cloud environments**: set [`CLAUDE_CODE_AUTO_COMPACT_WINDOW`](https://code.claude.com/docs/en/env-vars). While it's set, it takes precedence over the command, the flag, and the setting, and `/autocompact` reports the override instead of changing the window.

The command and the flag accept a window size from 100K to 1M tokens, in any of these forms:

* A plain token count, such as `200000`
* A `k` or `M` suffix, such as `500k` or `1M`
* A bare number from 100 to 1000, meaning thousands, so `200` sets 200,000

The environment variable accepts only the plain token count. Claude Code caps the window at the model's context window.

### Default auto-compact thresholds

If you don't set an auto-compact window, Claude Code compacts when the conversation reaches the model's context limit, except in these sessions:

* [Cloud sessions](https://code.claude.com/docs/en/claude-code-on-the-web) compact as the conversation approaches the model's limit
* Sonnet 4.6 and Opus 4.6 without [extended context](#extended-context) compact at the 200K boundary, and so do Opus 4.8 and Opus 5 when they run with a 200K context window, such as on Amazon Bedrock, Google Cloud's Agent Platform, and Microsoft Foundry
* When you set [`CLAUDE_CODE_DISABLE_1M_CONTEXT=1`](https://code.claude.com/docs/en/env-vars), models with a native 1M window, such as Sonnet 5 and the Fable models, compact at the 200K boundary
* Models running with a native 1M window, such as Sonnet 5, the Fable models, and Opus 4.7 and later on the Anthropic API, compact before the window fills, at about 967K tokens by default. On Amazon Bedrock, Google Cloud's Agent Platform, and Microsoft Foundry, [Pin models for third-party deployments](#pin-models-for-third-party-deployments) says which models run with that window; for the configurations that budget Sonnet 5 at 200K instead, see [Sonnet 5 context window](#sonnet-5-context-window)
* Sessions on a model ID Claude Code doesn't recognize, such as an [LLM gateway](https://code.claude.com/docs/en/llm-gateway) alias, compact at the context window Claude Code assumes for the ID; see [Correct the window for a gateway or custom model ID](#correct-the-window-for-a-gateway-or-custom-model-id)

### Correct the window for a gateway or custom model ID

On an [LLM gateway](https://code.claude.com/docs/en/llm-gateway) or other custom deployment, Claude Code can assume a context window for the model ID that differs from the model's real window, whether or not it resolves the ID to a Claude model. Set [`CLAUDE_CODE_MAX_CONTEXT_TOKENS`](https://code.claude.com/docs/en/env-vars) to the window Claude Code should assume instead.

How the variable applies depends on the ID. Claude Code treats an ID as a provider or custom spelling when it doesn't start with `claude-`, in any casing, or when it carries a suffix that Claude Code strips when reading the ID, such as the `@YYYYMMDD` date used on Google Cloud's Agent Platform. Before v2.1.259, Claude Code didn't count a stripped suffix, so an unrecognized `claude-` ID with a date suffix was treated as a bare `claude-` name.

An unrecognized provider or custom spelling, the same spelling with `[1m]`, and every other ID are three separate cases:

* If Claude Code can't resolve a provider or custom spelling to a model it recognizes and the ID doesn't contain `[1m]`, the variable applies directly and proactive compaction continues at the declared window.
* If Claude Code can't resolve a provider or custom spelling to a model it recognizes and the ID contains `[1m]`, in any casing, Claude Code assumes a 1M window for it and the variable doesn't apply on its own. To correct the window while keeping proactive compaction, also set [`CLAUDE_CODE_DISABLE_1M_CONTEXT=1`](https://code.claude.com/docs/en/env-vars). With that variable set, Claude Code sizes the ID like the same spelling without `[1m]`, so `CLAUDE_CODE_MAX_CONTEXT_TOKENS` applies when it would apply to that untagged spelling.

  With a declared window above 200K, Claude Code then shows a [startup warning](https://code.claude.com/docs/en/errors#the-200k-limit-isnt-enforced) that the 200K limit isn't enforced. The warning is expected in this configuration.
* If the ID resolves to a model Claude Code recognizes, or the ID is a bare `claude-` name with no suffix for Claude Code to strip, in any casing, the variable takes effect only when you also set [`DISABLE_COMPACT`](https://code.claude.com/docs/en/env-vars), which disables all compaction.

  For example, an ID that contains a Claude model name that Claude Code knows, such as `anthropic/claude-opus-4-8`, `us.anthropic.claude-…-v1:0`, or the dated `claude-sonnet-4-5@20250929`, resolves to that model. This includes IDs that also contain `[1m]`: Claude Code resolves `claude-opus-4-8[1m]` to Opus 4.8 even with `CLAUDE_CODE_DISABLE_1M_CONTEXT` set.

For a model ID Claude Code doesn't recognize, set [`CLAUDE_CODE_DISABLE_UNKNOWN_MODEL_WINDOW_ENFORCEMENT=1`](https://code.claude.com/docs/en/env-vars) to have Claude Code compact only after the API rejects the conversation with a [too-long error Claude Code recognizes](https://code.claude.com/docs/en/errors#prompt-is-too-long). Claude Code doesn't run that recovery when a gateway [rewrites the error](https://code.claude.com/docs/en/llm-gateway-connect#troubleshoot-gateway-errors) to wording Claude Code doesn't recognize.
