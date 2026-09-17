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
pageSha256: "d79a3f1bbaf1ae88d577f19e49209040f73b7cf8faca145c042906b9494b6602"
contentMode: "local-full"
zh: ""
---

## Thinking and the context window

`max_tokens`, which includes all thinking Claude generates in the current turn, is enforced as a strict limit. On Claude 4.5 models and newer, if input tokens plus `max_tokens` exceeds the context window size, the API accepts the request. If generation then reaches the context window limit, it stops with `stop_reason: "model_context_window_exceeded"` instead of returning an error. On earlier models, the API returns a validation error instead. See [Handling stop reasons](https://platform.claude.com/docs/en/build-with-claude/handling-stop-reasons).

How thinking counts against the window depends on when it was generated:

* **Current-turn thinking** always counts toward `max_tokens`, is billed as output tokens, and occupies context window space for the turn that generated it.
* **Prior-turn thinking** depends on the [preservation default](https://platform.claude.com/docs/en/build-with-claude/thinking#thinking-block-preservation-by-model). On [models that keep all prior turns](https://platform.claude.com/docs/en/build-with-claude/thinking#thinking-block-preservation-by-model), previous thinking blocks remain in context, count toward the window, and are billed as input tokens like the rest of the conversation history. On models that keep only the last turn, the API strips older thinking blocks automatically when you pass them back, so they don't consume window space or input tokens.

In practice:

* On keep-all models, budget your context window as if thinking were ordinary conversation history, because it is. Long agentic sessions accumulate thinking in context. Use [thinking block clearing](https://platform.claude.com/docs/en/build-with-claude/context-editing#thinking-block-clearing) if you need to reclaim space.
* On last-turn-only models, thinking is a per-turn cost only: each turn's thinking counts against that turn's `max_tokens` and then drops out of the window.

The following diagrams illustrate the last-turn-only (stripping) regime. The first shows a multi-turn conversation: each turn's thinking block is generated in the output but not carried into later turns' input.

![Diagram of thinking on a model that strips previous thinking blocks: each turn's thinking block is generated in the output and not carried into later turns' input](https://platform.claude.com/docs/images/context-window-thinking.svg)

The second shows the same regime with tool use: thinking stays in context alongside its tool result for the duration of the assistant turn, then drops out on the next user turn.

![Diagram of thinking with tool use on a model that strips previous thinking blocks: thinking is kept with its tool result, then dropped on the next user turn](https://platform.claude.com/docs/images/context-window-thinking-tools.svg)

Use the [token counting API](https://platform.claude.com/docs/en/build-with-claude/token-counting) to get accurate counts for your specific use case, especially for multi-turn conversations that include thinking.
