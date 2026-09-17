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
pageSha256: "4f3927d8bc04e7abb0c28ddbe1b99471c10573385b86ac823d116618fed2ede1"
contentMode: "local-full"
zh: ""
---

## Redacted thinking blocks

In addition to regular `thinking` blocks, the API may return `redacted_thinking` blocks when portions of Claude's reasoning are safety-redacted. A `redacted_thinking` block contains encrypted thinking content in a `data` field, with no readable text:

```json
{
  "type": "redacted_thinking",
  "data": "..."
}
```

The `data` field is opaque and encrypted. Like the `signature` field on regular thinking blocks, pass `redacted_thinking` blocks back to the API unchanged when continuing a multi-turn conversation with [tools](https://platform.claude.com/docs/en/build-with-claude/thinking#thinking-with-tool-use).

  If your code filters content blocks by type (for example, `block.type == "thinking"`) when round-tripping responses with tool use, also include `redacted_thinking` blocks. Filtering on `block.type == "thinking"` alone silently drops `redacted_thinking` blocks and breaks the multi-turn protocol described in [Preserving thinking blocks](https://platform.claude.com/docs/en/build-with-claude/thinking#preserving-thinking-blocks).

  `redacted_thinking` blocks are a distinct content block type returned when thinking is safety-redacted. This is separate from the [`display: "omitted"`](https://platform.claude.com/docs/en/build-with-claude/thinking#controlling-thinking-display) option, which returns regular `thinking` blocks with an empty `thinking` field.
