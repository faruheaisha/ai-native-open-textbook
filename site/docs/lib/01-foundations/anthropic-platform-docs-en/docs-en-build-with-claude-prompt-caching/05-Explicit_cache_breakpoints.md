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
sourceRel: "docs/en/build-with-claude/prompt-caching.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/build-with-claude/prompt-caching.md"
sourceSha256: "89fd9a1e988ae4902de1047706ee788003060cb232e444ad4cf37a11421d42a4"
pageSha256: "380d7fa96ad38152ab02c5a7f7accbaae60c43db8b3d82e502e60f5a68b0e246"
contentMode: "local-full"
zh: ""
---

## Explicit cache breakpoints

For more control over caching, you can place `cache_control` directly on individual content blocks. This is useful when you need to cache different sections that change at different frequencies, or need fine-grained control over exactly what gets cached.

### Structuring your prompt

Place static content (tool definitions, system instructions, context, examples) at the beginning of your prompt. Mark the end of the reusable content for caching using the `cache_control` parameter.

Cache prefixes are created in the following order: `tools`, `system`, then `messages`. This order forms a hierarchy where each level builds upon the previous ones.

#### How automatic prefix checking works

You can use just one cache breakpoint at the end of your static content, and the system will automatically find the longest prefix that a prior request already wrote to the cache. Understanding how this works helps you optimize your caching strategy.

**Three core principles:**

1. **Cache writes happen only at your breakpoint.** Marking a block with `cache_control` writes exactly one cache entry: a hash of the prefix ending at that block. The system does not write entries for any earlier position. Because the hash is cumulative, covering everything up to and including the breakpoint, changing any block at or before the breakpoint produces a different hash on the next request.

2. **Cache reads look backward for entries that prior requests wrote.** On each request the system computes the prefix hash at your breakpoint and checks for a matching cache entry. If none exists, it walks backward one block at a time, checking whether the prefix hash at each earlier position matches something already in the cache. It is looking for prior writes, not for stable content.

3. **The lookback window is 20 blocks.** The system checks at most 20 positions per breakpoint, counting the breakpoint itself as the first. If the system finds no matching entry in that window, checking stops (or resumes from the next explicit breakpoint, if any). On the Claude API, a run of consecutive `tool_use` blocks counts as one position, and so does a run of consecutive `tool_result` blocks, so a turn with many parallel tool calls doesn't push the previous request's entry out of the window on its own.

**Example: Lookback in a growing conversation**

You append new blocks each turn and set `cache_control` on the final block of each request:

* **Turn 1:** 10 blocks, breakpoint on block 10. No prior cache entries exist. The system writes an entry at block 10.
* **Turn 2:** 15 blocks, breakpoint on block 15. Block 15 has no entry, so the system walks back to block 10 and finds the turn-1 entry. Cache hit at block 10; the system processes only blocks 11 through 15 fresh and writes a new entry at block 15.
* **Turn 3:** 35 blocks, breakpoint on block 35. The system checks 20 positions (blocks 35 through 16) and finds nothing. The turn-2 entry at block 15 is one position outside the window, so there is no cache hit. Adding a second breakpoint at block 15 starts a second lookback window there, which finds the turn-2 entry.

**Common mistake: Breakpoint on content that changes every request**

Your prompt has a large static system context (blocks 1 through 5) followed by a per-request block containing a timestamp and the user message (block 6). You set `cache_control` on block 6:

* **Request 1:** Cache write at block 6. The hash includes the timestamp.
* **Request 2:** The timestamp differs, so the prefix hash at block 6 differs. The lookback walks through blocks 5, 4, 3, 2, and 1, but the system never wrote an entry at any of those positions. No cache hit. You pay for a fresh cache write on every request and never get a read.

The lookback does not find stable content behind your breakpoint and cache it. It finds entries that prior requests already wrote, and writes happen only at breakpoints. Move `cache_control` to block 5, the last block that stays the same across requests, and every subsequent request reads the cached prefix. [Automatic caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching#automatic-caching) hits the same trap: it places the breakpoint on the last cacheable block, which in this structure is the one that changes every request, so use an explicit breakpoint on block 5 instead.

**Key takeaway:** Place `cache_control` on the last block whose prefix is identical across the requests you want to share a cache. In a growing conversation the final block works as long as each turn adds fewer than 20 blocks: earlier content never changes, so the next request's lookback finds the prior write. For a prompt with a varying suffix (timestamps, per-request context, the incoming message), place the breakpoint at the end of the static prefix, not on the varying block.

#### When to use multiple breakpoints

You can define up to 4 cache breakpoints if you want to:

* Cache different sections that change at different frequencies (for example, tools rarely change, but context updates daily)
* Have more control over exactly what gets cached
* Ensure a cache hit when a growing conversation pushes your breakpoint 20 or more blocks past the last cache write

  **Important limitation:** The lookback can only find entries that earlier requests already wrote. If a growing conversation pushes your breakpoint 20 or more blocks past the last write, the lookback window misses it. Add a second breakpoint closer to that position from the start so a write accumulates there before you need it.

### Understanding cache breakpoint costs

**Cache breakpoints themselves don't add any cost.** You are only charged for:

* **Cache writes:** When new content is written to the cache (25% more than base input tokens for 5-minute TTL)
* **Cache reads:** When cached content is used (10% of base input token price, or 2.5% on Claude Fable 5.1 and Claude Mythos 5.1)
* **Regular input tokens:** For any uncached content

Adding more `cache_control` breakpoints doesn't increase your costs - you still pay the same amount based on what content is actually cached and read. The breakpoints give you control over what sections can be cached independently.

***
