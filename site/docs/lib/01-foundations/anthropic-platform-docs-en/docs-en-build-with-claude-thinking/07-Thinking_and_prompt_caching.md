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
pageSha256: "e3da43cf3ade4b850f2afec2c965c8ef5f316e9da054bd82c61b7fad3c08777b"
contentMode: "local-full"
zh: ""
---

## Thinking and prompt caching

[Prompt caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching) interacts with thinking in a few specific ways. The following rules apply in both thinking modes.

**Configuration changes invalidate caching.** The thinking configuration and the resolved [`effort`](https://platform.claude.com/docs/en/build-with-claude/effort) level are rendered into the prompt itself, so changing any of them starts a new cache prefix. Switching between `adaptive`, `enabled`, and `disabled`, changing `budget_tokens`, and changing the effort value all invalidate cache breakpoints: message-level breakpoints always miss, and tool and system-prompt breakpoints can miss too, depending on where the model renders the configuration. Treat any thinking or top-level effort change as starting the cache over. On models that support [per-message effort](https://platform.claude.com/docs/en/build-with-claude/effort#change-effort-mid-conversation-beta), an effort change carried in a `role: "system"` message inside `messages` leaves the cached prefix intact. Consecutive requests that keep the same configuration preserve the cache, and setting a parameter explicitly to its default value is equivalent to omitting it. A thinking block the API drops under either [preserved-thinking condition](https://platform.claude.com/docs/en/build-with-claude/thinking#preserved-thinking) changes the cached prefix from that block's position onward. Blocks passed back unchanged keep the cache intact. A worked demonstration with usage output is on the [Steering thinking](https://platform.claude.com/docs/en/build-with-claude/thinking-steering-and-cost#prompt-caching) page.

**Thinking blocks are cached with tool results.** During a tool-use loop, caching occurs when you make a follow-up request that includes tool results. At that point the previous conversation history, including its thinking blocks, can be cached, and those cached thinking blocks count as input tokens in your usage metrics when read from the cache. This occurs automatically, even without explicit `cache_control` markers, and behaves the same for regular and interleaved thinking. The tradeoff: thinking blocks you never see again in responses still contribute to input token usage when read from cache.

**Whether prior blocks are in context at all is per-model.** The [preservation default](https://platform.claude.com/docs/en/build-with-claude/thinking#thinking-block-preservation-by-model) governs this. On keep-all models, previous turns' thinking blocks stay cached and in context. On last-turn-only models, once you send a user message that isn't a tool result, all previous thinking blocks are stripped from context. On those models, a conversation like this:

```text wrap
User: ["What's the weather in Paris?"],
Assistant: [thinking_block_1] + [tool_use block 1],
User: [tool_result_1, cache=True],
Assistant: [thinking_block_2] + [text block 2],
User: [Text response, cache=True]
```

is processed as if the thinking blocks were never there:

```text wrap
User: ["What's the weather in Paris?"],
Assistant: [tool_use block 1],
User: [tool_result_1, cache=True],
Assistant: [text block 2],
User: [Text response, cache=True]
```

On keep-all models, the same request keeps `thinking_block_1` and `thinking_block_2` in context and in the cache.

**Degradation strips thinking from the cacheable history.** If thinking becomes disabled mid-turn and you pass thinking content in the current tool-use turn, the thinking content is stripped and thinking remains disabled for that request (see [graceful degradation](https://platform.claude.com/docs/en/build-with-claude/thinking#thinking-with-tool-use)). [Interleaved thinking](https://platform.claude.com/docs/en/build-with-claude/thinking#interleaved-thinking) amplifies cache invalidation effects, because thinking blocks can occur between multiple tool calls.

  Thinking-heavy tasks often take longer than the default 5-minute cache lifetime to complete. Consider the [1-hour cache duration](https://platform.claude.com/docs/en/build-with-claude/prompt-caching#1-hour-cache-duration) to maintain cache hits across longer thinking sessions and multistep workflows.
