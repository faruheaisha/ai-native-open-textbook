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
pageSha256: "998066082ea1db9f2db4b2c3dca39f5abf35bfb509ce96d75f8ad810a01aebf1"
contentMode: "local-full"
zh: ""
---

## Caching strategies and considerations

### Cache limitations

On the Claude API, [Claude Platform on AWS](https://platform.claude.com/docs/en/build-with-claude/claude-platform-on-aws), [Google Cloud](https://platform.claude.com/docs/en/build-with-claude/claude-on-vertex-ai), and [Microsoft Foundry](https://platform.claude.com/docs/en/build-with-claude/claude-in-microsoft-foundry), the minimum cacheable prompt length is:

* 512 tokens for Claude Fable 5.1, Claude Mythos 5.1, Claude Opus 5, Claude Fable 5, and [Claude Mythos 5](https://anthropic.com/glasswing)
* 2,048 tokens for [Claude Mythos Preview](https://anthropic.com/glasswing) and Claude Opus 4.7
* 4,096 tokens for Claude Opus 4.6 and Claude Opus 4.5
* 1,024 tokens for Claude Opus 4.8, Claude Sonnet 5, Claude Sonnet 4.6, Claude Sonnet 4.5, Claude Opus 4.1 ([retired, except on Bedrock and Google Cloud](https://platform.claude.com/docs/en/about-claude/model-deprecations)), Claude Opus 4 ([retired, except on Google Cloud](https://platform.claude.com/docs/en/about-claude/model-deprecations)), and Claude Sonnet 4 ([retired, except on Bedrock and Google Cloud](https://platform.claude.com/docs/en/about-claude/model-deprecations))
* 4,096 tokens for Claude Haiku 4.5
* 2,048 tokens for Claude Haiku 3.5 ([retired, except on Bedrock and Google Cloud](https://platform.claude.com/docs/en/about-claude/model-deprecations))

These minimums apply on every platform where each model is available.

Shorter prompts cannot be cached, even if marked with `cache_control`. Any requests to cache fewer than this number of tokens will be processed without caching, and no error is returned. To verify whether a prompt was cached, check the [response usage fields](https://platform.claude.com/docs/en/build-with-claude/prompt-caching#tracking-cache-performance): if both `cache_creation_input_tokens` and `cache_read_input_tokens` are 0, the prompt was not cached (likely because it did not meet the minimum length requirement).

If your prompt falls just short of the minimum for your model and platform, expanding the cached content to reach the threshold is often worthwhile. Cache reads cost significantly less than uncached input tokens, so reaching the minimum can reduce costs for frequently reused prompts.

  [Bedrock](https://platform.claude.com/docs/en/build-with-claude/claude-in-amazon-bedrock) is an AWS-operated platform. On Bedrock, see the [Bedrock prompt caching documentation](https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-caching.html) for the per-model minimums, failure behavior, and usage-field names that apply.

For concurrent requests, note that a cache entry only becomes available after the first response begins. If you need cache hits for parallel requests, wait for the first response before sending subsequent requests.

Currently, "ephemeral" is the only supported cache type, which by default has a 5-minute lifetime.

### What can be cached

Most blocks in the request can be cached. This includes:

* Tools: Tool definitions in the `tools` array
* System messages: Content blocks in the `system` array
* Text messages: Content blocks in the `messages.content` array, for both user and assistant turns
* Images & Documents: Content blocks in the `messages.content` array, in user turns
* Tool use and tool results: Content blocks in the `messages.content` array, in both user and assistant turns

Each of these elements can be cached, either automatically or by marking them with `cache_control`.

### What cannot be cached

While most request blocks can be cached, there are some exceptions:

* Thinking blocks cannot be cached directly with `cache_control`. However, thinking blocks CAN be cached alongside other content when they appear in previous assistant turns. When cached this way, they DO count as input tokens when read from cache.

* Sub-content blocks (like [citations](https://platform.claude.com/docs/en/build-with-claude/citations)) themselves cannot be cached directly. Instead, cache the top-level block.

  In the case of citations, the top-level document content blocks that serve as the source material for citations can be cached. This allows you to use prompt caching with citations effectively by caching the documents that citations will reference.

* Empty text blocks cannot be cached.

### What invalidates the cache

Modifications to cached content can invalidate some or all of the cache.

As described in [Structuring your prompt](https://platform.claude.com/docs/en/build-with-claude/prompt-caching#structuring-your-prompt), the cache follows the hierarchy: `tools` → `system` → `messages`. Changes at each level invalidate that level and all subsequent levels.

The following table shows which parts of the cache are invalidated by different types of changes. ✘ indicates that the cache is invalidated, while ✓ indicates that the cache remains valid.

| What changes                                              | Tools cache    | System cache   | Messages cache | Impact                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| --------------------------------------------------------- | -------------- | -------------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Tool definitions**                                      | ✘              | ✘              | ✘              | Modifying tool definitions (names, descriptions, parameters) invalidates the entire cache                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| **Web search toggle**                                     | ✓              | ✘              | ✘              | Enabling/disabling web search modifies the system prompt                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| **Citations toggle**                                      | ✓              | ✘              | ✘              | Enabling/disabling citations modifies the system prompt                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| **Speed setting**                                         | ✓              | ✘              | ✘              | Switching between [`speed: "fast"` and standard speed](https://platform.claude.com/docs/en/build-with-claude/fast-mode) invalidates system and message caches                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| **Tool choice**                                           | ✓              | ✓              | ✘              | Changes to `tool_choice` parameter only affect message blocks                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| **Images**                                                | ✓              | ✓              | ✘              | Adding/removing images anywhere in the prompt affects message blocks                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| **Thinking parameters**                                   | Model-specific | Model-specific | ✘              | The thinking configuration (mode, and `budget_tokens` in extended mode) is rendered into the prompt, so changing it always invalidates message blocks; tool and system caches are also invalidated on models that render the configuration ahead of them. See [Thinking and prompt caching](https://platform.claude.com/docs/en/build-with-claude/thinking#thinking-and-prompt-caching).                                                                                                                                                                                                           |
| **Effort setting**                                        | Model-specific | Model-specific | ✘              | Changing the [`output_config.effort`](https://platform.claude.com/docs/en/build-with-claude/effort) value always invalidates message blocks, with the same model-specific effect on tool and system caches as thinking parameters. Setting effort explicitly to the model's default is equivalent to omitting it and does not invalidate. On models that support [per-message effort](https://platform.claude.com/docs/en/build-with-claude/effort#change-effort-mid-conversation-beta), an effort change carried in a `role: "system"` message inside `messages` leaves the cached prefix intact. |
| **Non-tool results passed to extended thinking requests** | ✓              | ✓              | Model-specific | On Opus 4.5+ and Sonnet 4.6+, thinking blocks are preserved by default, so the cache remains valid (✓). On earlier Opus/Sonnet models and all Haiku models, all previously-cached thinking blocks are stripped from context, and any messages that follow those thinking blocks are removed from the cache (✘). For more details, see [Caching with thinking blocks](https://platform.claude.com/docs/en/build-with-claude/prompt-caching#caching-with-thinking-blocks).                                                                                                                           |
| **Dropped thinking blocks**                               | ✓              | ✓              | ✘              | When the API drops a Claude Fable 5.1 or Claude Mythos 5.1 thinking block that isn't [preserved](https://platform.claude.com/docs/en/build-with-claude/thinking#preserved-thinking) on that request (for example, one you replay to an earlier model), the cached prefix changes from that block's position onward on that request. Blocks the receiving model can read, passed back unchanged, keep the cache intact.                                                                                                                                                                             |

  On Claude Fable 5.1, Claude Mythos 5.1, Claude Fable 5, [Claude Mythos 5](https://anthropic.com/glasswing), Claude Opus 4.8, and Claude Opus 5, you can add a new system instruction partway through a conversation without invalidating the system or message caches. Append a `\{"role": "system"\}` message to `messages` instead of editing the top-level `system` field, so the cached prefix stays unchanged. This feature is not available on Claude Sonnet 5. Use the top-level `system` field instead. See [Mid-conversation system messages](https://platform.claude.com/docs/en/build-with-claude/mid-conversation-system-messages).

### Tracking cache performance

Monitor cache performance using these API response fields, within `usage` in the response (or `message_start` event if [streaming](https://platform.claude.com/docs/en/build-with-claude/streaming)):

* `cache_creation_input_tokens`: Number of tokens written to the cache when creating a new entry.
* `cache_read_input_tokens`: Number of tokens retrieved from the cache for this request.
* `input_tokens`: Number of input tokens which were not read from or used to create a cache (that is, tokens after the last cache breakpoint).

  **Understanding the token breakdown**

  The `input_tokens` field represents only the tokens that come **after the last cache breakpoint** in your request - not all the input tokens you sent.

  To calculate total input tokens:

  ```text wrap
  total_input_tokens = cache_read_input_tokens + cache_creation_input_tokens + input_tokens
  ```

  **Spatial explanation:**

  * `cache_read_input_tokens` = tokens before breakpoint already cached (reads)
  * `cache_creation_input_tokens` = tokens before breakpoint being cached now (writes)
  * `input_tokens` = tokens after your last breakpoint (not eligible for cache)

  **Example:** If you have a request with 100,000 tokens of cached content (read from cache), 0 tokens of new content being cached, and 50 tokens in your user message (after the cache breakpoint):

  * `cache_read_input_tokens`: 100,000
  * `cache_creation_input_tokens`: 0
  * `input_tokens`: 50
  * **Total input tokens processed:** 100,050 tokens

  This is important for understanding both costs and rate limits, as `input_tokens` will typically be much smaller than your total input when using caching effectively.

### Caching with thinking blocks

When using [thinking](https://platform.claude.com/docs/en/build-with-claude/thinking) with prompt caching, thinking blocks have special behavior:

**Automatic caching alongside other content:** While thinking blocks cannot be explicitly marked with `cache_control`, they get cached as part of the request content when you make subsequent API calls with tool results. This commonly happens during tool use when you pass thinking blocks back to continue the conversation.

**Input token counting:** When thinking blocks are read from cache, they count as input tokens in your usage metrics. This is important for cost calculation and token budgeting.

**Cache invalidation patterns:**

* Cache remains valid when only tool results are provided as user messages
* On Opus 4.5+ and Sonnet 4.6+, thinking blocks are preserved by default even when non-tool-result user content is added, so the cache remains valid
* On earlier Opus/Sonnet models and all Haiku models, cache gets invalidated when non-tool-result user content is added, causing all previous thinking blocks to be stripped from context
* This caching behavior occurs even without explicit `cache_control` markers

For more details on cache invalidation, see [What invalidates the cache](https://platform.claude.com/docs/en/build-with-claude/prompt-caching#what-invalidates-the-cache).

**Example with tool use:**

```text wrap
Request 1: User: "What's the weather in Paris?"
Response: [thinking_block_1] + [tool_use block 1]

Request 2:
User: ["What's the weather in Paris?"],
Assistant: [thinking_block_1] + [tool_use block 1],
User: [tool_result_1, cache=True]
Response: [thinking_block_2] + [text block 2]
# Request 2 caches its request content (not the response)
# The cache includes: user message, thinking_block_1, tool_use block 1, and tool_result_1

Request 3:
User: ["What's the weather in Paris?"],
Assistant: [thinking_block_1] + [tool_use block 1],
User: [tool_result_1, cache=True],
Assistant: [thinking_block_2] + [text block 2],
User: [Text response, cache=True]
# On earlier Opus/Sonnet and all Haiku models, non-tool-result user block causes prior thinking blocks to be stripped; on Opus 4.5+/Sonnet 4.6+ they are kept
```

On earlier Opus/Sonnet models and all Haiku models, all previous thinking blocks are removed from context at this point. On Opus 4.5+ and Sonnet 4.6+, prior thinking blocks are kept by default and remain part of the cached prefix.

For more detailed information, see [Thinking and prompt caching](https://platform.claude.com/docs/en/build-with-claude/thinking#thinking-and-prompt-caching).

### Cache storage and sharing

  Prompt caching uses [workspace](https://platform.claude.com/docs/en/manage-claude/workspaces)-level isolation. Caches are isolated per workspace, ensuring data separation between workspaces within the same organization. This applies to the Claude API, Claude Platform on AWS, and Microsoft Foundry; Bedrock and Google Cloud maintain organization-level cache isolation. If you use multiple workspaces, review your caching strategy to account for this difference.

* **Organization and workspace isolation:** Caches are isolated between organizations. Different organizations never share caches, even if they use identical prompts. Caches are also isolated per workspace within an organization on the Claude API, Claude Platform on AWS, and Microsoft Foundry; Bedrock and Google Cloud use organization-level isolation only.

* **Exact matching:** Cache hits require 100% identical prompt segments, including all text and images up to and including the block marked with cache control.

* **Output token generation:** Prompt caching has no effect on output token generation. The response you receive is identical to what you would get if prompt caching were not used.

### Best practices for effective caching

To optimize prompt caching performance:

* Start with [automatic caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching#automatic-caching) for multi-turn conversations. It handles breakpoint management automatically.
* Use [explicit block-level breakpoints](https://platform.claude.com/docs/en/build-with-claude/prompt-caching#explicit-cache-breakpoints) when you need to cache different sections with different change frequencies.
* Cache stable, reusable content like system instructions, background information, large contexts, or frequent tool definitions.
* Place cached content at the prompt's beginning for best performance.
* Use cache breakpoints strategically to separate different cacheable prefix sections.
* Place the breakpoint on the last block that stays identical across requests. For a prompt with a static prefix and a varying suffix (timestamps, per-request context, the incoming message), that is the end of the prefix, not the varying block.
* Regularly analyze cache hit rates and adjust your strategy as needed.

### Optimizing for different use cases

Tailor your prompt caching strategy to your scenario:

* Conversational agents: Reduce cost and latency for extended conversations, especially those with long instructions or uploaded documents.
* Coding assistants: Improve autocomplete and codebase Q\&A by keeping relevant sections or a summarized version of the codebase in the prompt.
* Large document processing: Incorporate complete long-form material including images in your prompt without increasing response latency.
* Detailed instruction sets: Share extensive lists of instructions, procedures, and examples to fine-tune Claude's responses. Developers often include an example or two in the prompt, but with prompt caching you can get even better performance by including 20+ diverse examples of high quality answers.
* Agentic tool use: Enhance performance for scenarios involving multiple tool calls and iterative code changes, where each step typically requires a new API call.
* Talk to books, papers, documentation, podcast transcripts, and other longform content: Bring any knowledge base alive by embedding the entire document(s) into the prompt, and letting users ask it questions.

### Troubleshooting common issues

If experiencing unexpected behavior:

  [Cache diagnostics](https://platform.claude.com/docs/en/build-with-claude/cache-diagnostics) (beta) has the API compare consecutive requests and report exactly where the prompt prefix diverged, which automatically handles many of the steps in this list.

* Ensure cached sections are identical across calls. For explicit breakpoints, verify that `cache_control` markers are in the same locations
* Check that calls are made within the cache lifetime (5 minutes by default)
* Verify that `tool_choice`, image usage, the thinking configuration, and `output_config.effort` remain consistent between calls
* Validate that you are caching at least the minimum number of tokens for your model and platform (see [Cache limitations](https://platform.claude.com/docs/en/build-with-claude/prompt-caching#cache-limitations))
* Confirm your breakpoint is on a block that stays identical across requests. Cache writes happen only at the breakpoint, and if that block changes (timestamps, per-request context, the incoming message), the prefix hash never matches. The lookback does not find stable content behind the breakpoint; it only finds entries that earlier requests wrote at their own breakpoints
* Verify that the keys in your `tool_use` content blocks have stable ordering as some languages (for example, Swift, Go) randomize key order during JSON conversion, breaking caches
* Use [cache diagnostics](https://platform.claude.com/docs/en/build-with-claude/cache-diagnostics) to have the API compare consecutive requests and report which part of the prompt diverged

  Changes to `tool_choice` or the presence/absence of images anywhere in the prompt will invalidate the cache, requiring a new cache entry to be created. For more details on cache invalidation, see [What invalidates the cache](https://platform.claude.com/docs/en/build-with-claude/prompt-caching#what-invalidates-the-cache).

***
