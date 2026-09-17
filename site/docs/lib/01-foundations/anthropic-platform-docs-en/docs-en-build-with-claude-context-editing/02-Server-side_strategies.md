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
sourceRel: "docs/en/build-with-claude/context-editing.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/build-with-claude/context-editing.md"
sourceSha256: "69cc82d4054f45a2f7ea239a67c946153f54af5b92acae1915b2166281ec6469"
pageSha256: "274e7848b28d739a5458084b4ca9eb09bf92ad1d38103fab3359b8f0049513d3"
contentMode: "local-full"
zh: ""
---

## Server-side strategies

  Context editing is in beta with support for tool result clearing and thinking block clearing. To enable it, use the beta header `context-management-2025-06-27` in your API requests.

  Share feedback on this feature through the [feedback form](https://forms.gle/YXC2EKGMhjN1c4L88).

### Tool result clearing

The `clear_tool_uses_20250919` strategy clears tool results when conversation context grows beyond your configured threshold. This is particularly useful for agentic workflows with heavy tool use. Older tool results (like file contents or search results) are no longer needed once Claude has processed them.

When activated, the API automatically clears the oldest tool results in chronological order. The API replaces each cleared result with placeholder text indicating to Claude that it was removed. By default, only tool results are cleared. You can optionally clear both tool results and tool calls (the tool use parameters) by setting `clear_tool_inputs` to true.

### Thinking block clearing

The `clear_thinking_20251015` strategy manages `thinking` blocks in conversations when extended thinking is enabled. This strategy gives you control over thinking preservation: you can choose to keep more thinking blocks to maintain reasoning continuity, or clear them more aggressively to save context space.

  **Default behavior:** The default varies by model class.

  | Model class      | Keep all prior thinking     | Keep only the last turn's thinking  |
  | ---------------- | --------------------------- | ----------------------------------- |
  | Opus             | Claude Opus 4.5 and later   | Claude Opus 4.1 and earlier         |
  | Sonnet           | Claude Sonnet 4.6 and later | Claude Sonnet 4.5 and earlier       |
  | Haiku            | (none)                      | All models through Claude Haiku 4.5 |
  | Fable and Mythos | All models                  | (none)                              |

  Use this strategy to override the default. If your code runs across multiple model tiers, set `keep` explicitly rather than relying on the per-model default.

An assistant conversation turn may include multiple content blocks (for example, when using tools) and multiple thinking blocks (for example, with [interleaved thinking](https://platform.claude.com/docs/en/build-with-claude/thinking#interleaved-thinking)).

### Context editing happens server-side

Context editing is applied server-side before the prompt reaches Claude. Your client application maintains the full, unmodified conversation history. You do not need to sync your client state with the edited version. Continue managing your full conversation history locally as you normally would.

On Claude Fable 5.1, server-side context management never invalidates thinking blocks. Client-side edits to earlier turns can invalidate the thinking blocks in every later assistant turn. For new accounts created on or after August 31, 2026, a request that replays an invalidated block is rejected unless you opt into dropping it. See [Preserved thinking](https://platform.claude.com/docs/en/build-with-claude/thinking#preserved-in-conversation).

### Context editing and prompt caching

Context editing's interaction with [prompt caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching) varies by strategy:

* **Tool result clearing:** Invalidates cached prompt prefixes when content is cleared. To account for this, clear enough tokens to make the cache invalidation worthwhile. Use the `clear_at_least` parameter to ensure a minimum number of tokens is cleared each time. You'll incur cache write costs each time content is cleared, but subsequent requests can reuse the newly cached prefix.

* **Thinking block clearing:** When thinking blocks are **kept** in context (not cleared), the prompt cache is preserved, enabling cache hits and reducing input token costs. When thinking blocks are **cleared**, the cache is invalidated at the point where clearing occurs. Configure the `keep` parameter based on whether you want to prioritize cache performance or context window availability.
