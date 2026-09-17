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
sourceRel: "docs/en/agents-and-tools/tool-use/advisor-tool.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/agents-and-tools/tool-use/advisor-tool.md"
sourceSha256: "e798608a5dfa622e88c58c702ea92d194e53b19d6d35af59857ed01dddea26ab"
pageSha256: "3529850e6fc7ec73c1daf0c00bcffcebb609768004b42e2c786153edbe547417"
contentMode: "local-full"
zh: ""
---

## How it works

When you add the advisor tool to your `tools` array, the executor model determines when to call it, like any other tool. When the executor calls the advisor:

1. The executor emits a [`server_tool_use`](https://platform.claude.com/docs/en/agents-and-tools/tool-use/server-tools) block with `name: "advisor"` and an empty `input`. The executor signals timing, and the server supplies context.
2. Anthropic runs a separate inference pass on the advisor model server-side. The advisor runs under its own Anthropic-supplied system prompt and receives the executor's full transcript as quoted context in its input. That transcript includes your system prompt, the tool definitions, the prior turns and tool results, and the text the executor has produced so far in this turn.
3. The advisor's response returns to the executor as an `advisor_tool_result` block.
4. The executor continues generating, informed by the advice.

All of this occurs inside a single `/v1/messages` request, with no extra round trips on your side. The exception is a turn that pauses mid-call, which you resume with a follow-up request (see [Resuming a paused turn](https://platform.claude.com/docs/en/agents-and-tools/tool-use/advisor-tool#resuming-a-paused-turn)).

The advisor itself runs without tools and without context management. Its thinking blocks are dropped before the result returns. Only the advice text reaches the executor.
