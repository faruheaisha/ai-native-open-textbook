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
pageSha256: "3a05be4a5ef0e4667f32afb2e5f9cde1b557107aca41c83bf6e92569ce1528f2"
contentMode: "local-full"
zh: ""
---

## Thinking and effort

The `thinking` parameter controls whether Claude thinks in [thinking blocks](https://platform.claude.com/docs/en/build-with-claude/thinking) before answering; the `effort` parameter controls how much work Claude puts into the whole response, which in adaptive mode includes how often and how deeply it thinks. Don't pass `adaptive` as an `effort` value: `adaptive` is a thinking mode, not an effort level.

To learn what each effort level does to thinking behavior, see the [per-level thinking behavior table](https://platform.claude.com/docs/en/build-with-claude/thinking-steering-and-cost#effort-levels) on the [Steering thinking](https://platform.claude.com/docs/en/build-with-claude/thinking-steering-and-cost) page. The [Effort](https://platform.claude.com/docs/en/build-with-claude/effort) page documents the parameter itself, including which levels each model supports. On Claude Opus 4.5, the only extended-thinking-only model that supports effort, effort composes with `budget_tokens`. See [Budget rules and tuning](https://platform.claude.com/docs/en/build-with-claude/extended-thinking#budget-rules-and-tuning).

With the two controls separated this way, pick the one that matches your goal:

* **Lower cost or latency on a thinking-enabled workload:** lower `effort` first. It scales the whole response down, thinking included.
* **Claude is thinking too rarely or too shallowly:** raise `effort`, or see [Steering how often Claude thinks](https://platform.claude.com/docs/en/build-with-claude/thinking-steering-and-cost#tuning-thinking-behavior) on the steering page.
* **You need thinking fully off:** use `thinking: \{type: "disabled"\}` on models that allow it (see the [per-model configuration table](https://platform.claude.com/docs/en/build-with-claude/thinking-troubleshooting#supported-models)).
* **You need a hard ceiling on spend:** use `max_tokens`. Effort is soft guidance. `max_tokens` is a strict limit.
