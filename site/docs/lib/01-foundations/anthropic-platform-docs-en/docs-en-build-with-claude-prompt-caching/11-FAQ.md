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
pageSha256: "3f7545234a97d1c01474909b4e1e6a785ad1f271381207400f808f9842bd48aa"
contentMode: "local-full"
zh: ""
---

## FAQ

    **In most cases, a single cache breakpoint at the end of your static content is sufficient.** Cache writes happen only at the block you mark. Place it on the last block that stays identical across requests, and every subsequent request reads that same entry. If a later block varies per request (a timestamp, the incoming message), keep the breakpoint before it, on the last stable block.

    You only need multiple breakpoints if:

    * A growing conversation pushes your breakpoint 20 or more blocks past the last cache write, putting the prior entry outside the lookback window
    * You want to cache sections that update at different frequencies independently
    * You need explicit control over what gets cached for cost optimization

    Example: If you have system instructions (rarely change) and RAG context (changes daily), you might use two breakpoints to cache them separately.

    No, cache breakpoints themselves are free. You only pay for:

    * Writing content to cache (25% more than base input tokens for 5-minute TTL)
    * Reading from cache (a fraction of the base input token price, see [Pricing](https://platform.claude.com/docs/en/build-with-claude/prompt-caching#pricing))
    * Regular input tokens for uncached content

    The number of breakpoints doesn't affect pricing - only the amount of content cached and read matters.

    The usage response includes three separate input token fields that together represent your total input:

    ```text wrap
    total_input_tokens = cache_read_input_tokens + cache_creation_input_tokens + input_tokens
    ```

    * `cache_read_input_tokens`: Tokens retrieved from cache (everything before cache breakpoints that was cached)
    * `cache_creation_input_tokens`: New tokens being written to cache (at cache breakpoints)
    * `input_tokens`: Tokens **after the last cache breakpoint** that aren't cached

    **Important:** `input_tokens` does NOT represent all input tokens - only the portion after your last cache breakpoint. If you have cached content, `input_tokens` will typically be much smaller than your total input.

    **Example:** With a 200k token document cached and a 50 token user question:

    * `cache_read_input_tokens`: 200,000
    * `cache_creation_input_tokens`: 0
    * `input_tokens`: 50
    * **Total:** 200,050 tokens

    This breakdown is critical for understanding both your costs and rate limit usage. See [Tracking cache performance](https://platform.claude.com/docs/en/build-with-claude/prompt-caching#tracking-cache-performance) for more details.

    The cache's default minimum lifetime (TTL) is 5 minutes. This lifetime is refreshed each time the cached content is used.

    If you find that 5 minutes is too short, Anthropic also offers a [1-hour cache TTL](https://platform.claude.com/docs/en/build-with-claude/prompt-caching#1-hour-cache-duration).

    The lifetime is measured from the start of the request that writes or reads the cache entry, not from the end of its response. Time spent generating a response counts against the lifetime, so the window for a follow-up request to reuse the cache is the lifetime minus the generation time.

    If your requests produce long responses and the next request might not start until after the lifetime elapses, use the [1-hour cache TTL](https://platform.claude.com/docs/en/build-with-claude/prompt-caching#1-hour-cache-duration).

    You can define up to 4 cache breakpoints (using `cache_control` parameters) in your prompt.

    Prompt caching is supported on all [active Claude models](https://platform.claude.com/docs/en/models/overview).

    Changing thinking parameters (switching modes, or changing the budget in extended mode) invalidates cached message prefixes, and can invalidate cached system prompts and tools as well, because the thinking configuration is rendered into the prompt. The [`output_config.effort`](https://platform.claude.com/docs/en/build-with-claude/effort) value behaves the same way.

    For more details on cache invalidation, see [What invalidates the cache](https://platform.claude.com/docs/en/build-with-claude/prompt-caching#what-invalidates-the-cache).

    For more on thinking, including its interaction with tool use and prompt caching, see [Thinking and prompt caching](https://platform.claude.com/docs/en/build-with-claude/thinking#thinking-and-prompt-caching).

    The easiest way is to add `"cache_control": \{"type": "ephemeral"\}` at the top level of your request body ([automatic caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching#automatic-caching)). Alternatively, include at least one `cache_control` breakpoint on individual content blocks ([explicit cache breakpoints](https://platform.claude.com/docs/en/build-with-claude/prompt-caching#explicit-cache-breakpoints)).

    Yes, prompt caching can be used alongside other API features like tool use and vision capabilities. However, changing whether there are images in a prompt or modifying tool use settings will break the cache.

    For more details on cache invalidation, see [What invalidates the cache](https://platform.claude.com/docs/en/build-with-claude/prompt-caching#what-invalidates-the-cache).

    Prompt caching introduces a new pricing structure where 5-minute cache writes cost 25% more than base input tokens, 1-hour cache writes cost 2x base input tokens, and cache hits cost a fraction of the base input token price (see [Pricing](https://platform.claude.com/docs/en/build-with-claude/prompt-caching#pricing) for the per-model multiplier).

    Currently, there's no way to manually clear the cache. Cached prefixes automatically expire after a minimum of 5 minutes of inactivity.

    You can monitor cache performance using the `cache_creation_input_tokens` and `cache_read_input_tokens` fields in the API response.

    See [What invalidates the cache](https://platform.claude.com/docs/en/build-with-claude/prompt-caching#what-invalidates-the-cache) for more details on cache invalidation, including a list of changes that require creating a new cache entry.

    Prompt caching is designed with strong privacy and data separation measures:

    1. Cache keys are generated using a cryptographic hash of the prompts up to the cache control point. This means only requests with identical prompts can access a specific cache.

    2. On the Claude API, Claude Platform on AWS, and Microsoft Foundry, caches are isolated per workspace within an organization. On Bedrock and Google Cloud, caches are isolated per organization. In every case, caches are never shared across organizations, even for identical prompts. See [Cache storage and sharing](https://platform.claude.com/docs/en/build-with-claude/prompt-caching#cache-storage-and-sharing) for details.

    3. The caching mechanism is designed to maintain the integrity and privacy of each unique conversation or context.

    4. It's safe to use `cache_control` anywhere in your prompts. For caching to produce reads, place the breakpoint at the end of a stable prefix: placing it on a block that changes every request (such as a timestamp or the user's arbitrary input) writes a fresh entry each time and never hits.

    These measures ensure that prompt caching maintains data privacy and security while offering performance benefits.

    Yes, it is possible to use prompt caching with your [Batches API](https://platform.claude.com/docs/en/build-with-claude/batch-processing) requests. However, because asynchronous batch requests can be processed concurrently and in any order, cache hits are provided on a best-effort basis.

    The [1-hour cache](https://platform.claude.com/docs/en/build-with-claude/prompt-caching#1-hour-cache-duration) can help improve your cache hits. The most cost effective way of using it is the following:

    * Gather a set of message requests that have a shared prefix.
    * Send a batch request with a single request that has this shared prefix and a 1-hour cache block. This writes the prefix to the 1-hour cache.
    * As soon as this is complete, submit the rest of the requests. You will have to monitor the job to know when it completes.

    This is typically better than using the 5-minute cache because it's common for batch requests to take between 5 minutes and 1 hour to complete.

    This error typically appears when you have upgraded your SDK or you are using outdated code examples. Prompt caching no longer requires the beta prefix. Instead of:

      ```python Python
      client.beta.prompt_caching.messages.create(**params)
      ```

    Use:

      ```python Python
      client.messages.create(**params)
      ```

    This error typically appears when you have upgraded your SDK or you are using outdated code examples. Prompt caching no longer requires the beta prefix. Instead of:

    ```typescript TypeScript
    client.beta.promptCaching.messages.create(/* ... */);
    ```

    Simply use:

    ```typescript
    client.messages.create(/* ... */);
    ```
