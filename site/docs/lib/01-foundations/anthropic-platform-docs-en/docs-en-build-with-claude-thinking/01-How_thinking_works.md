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
pageSha256: "86df438372e1e583becb9f87c24907d5b7230b92e855e6960eb4ba852ead4a0b"
contentMode: "local-full"
zh: ""
---

## How thinking works

![Diagram of how thinking works: Claude evaluates the request and decides whether to think; with tool use, thinking can recur between tool calls; one response returns thinking blocks, then text blocks](https://platform.claude.com/docs/images/how-thinking-works.svg)

Whether Claude thinks on a given request, and how deeply, depends on your thinking configuration and the complexity of the request.

Here is what thinking looks like in a response: one or more `thinking` content blocks arrive before the `text` blocks. The thinking block is still generated content, like the `text` block that follows it, but it is separated from the canonical response. Each thinking block also carries a `signature` field, an encrypted copy of the full reasoning that you pass back unchanged in multi-turn and tool-use conversations (see [Thinking encryption](https://platform.claude.com/docs/en/build-with-claude/thinking#thinking-encryption)):

```json
{
  "content": [
    {
      "type": "thinking",
      "thinking": "Let me break this down. The question has two parts, so I'll start with the simpler one and use its result to constrain the second...",
      "signature": "WaUjzkypQ2mUEVM36O2Txu...."
    },
    {
      "type": "text",
      "text": "Based on my analysis..."
    }
  ]
}
```

You don't always see this text, and what you see is never the raw chain of thought: the text in a thinking block is a [summary of Claude's reasoning](https://platform.claude.com/docs/en/build-with-claude/thinking#summarized-thinking). The `display` field on the thinking configuration controls whether that summary is returned at all: `"summarized"` returns it, while `"omitted"`, the default on many models, returns thinking blocks with an empty `thinking` field. Either way the block is billed the same and passed back the same in multi-turn conversations. See [Controlling thinking display](https://platform.claude.com/docs/en/build-with-claude/thinking#controlling-thinking-display) for per-model defaults and details.

If Claude uses tools, thinking can also appear between tool calls. See [Thinking with tool use](https://platform.claude.com/docs/en/build-with-claude/thinking#thinking-with-tool-use). For the full response format, see the [Messages API reference](https://platform.claude.com/docs/en/api/messages/create).
