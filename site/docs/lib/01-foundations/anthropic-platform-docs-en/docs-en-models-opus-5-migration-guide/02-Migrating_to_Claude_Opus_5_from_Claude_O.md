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
sourceRel: "docs/en/models/opus-5/migration-guide.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/models/opus-5/migration-guide.md"
sourceSha256: "2c90776b634505f2d6035e2f08ffac4bf934f8e5be4f77391f159416c7bd5cc5"
pageSha256: "df9246ff6dbb32ce27fc8f96e11ce54369c8ebb8513c50058fb938d2d1d62b66"
contentMode: "local-full"
zh: ""
---

## Migrating to Claude Opus 5 from Claude Opus 4.7

Claude Opus 5 should have strong out-of-the-box performance on existing Claude Opus 4.7 prompts and evals, at the same pricing of $5 USD per million input tokens and $25 USD per million output tokens. It supports the same set of features as Claude Opus 4.7, including the [1M token context window](https://platform.claude.com/docs/en/build-with-claude/context-windows), [128k max output tokens](https://platform.claude.com/docs/en/models/overview), [adaptive thinking](https://platform.claude.com/docs/en/build-with-claude/thinking), [prompt caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching), [batch processing](https://platform.claude.com/docs/en/build-with-claude/batch-processing), the [Files API](https://platform.claude.com/docs/en/build-with-claude/files), [PDF support](https://platform.claude.com/docs/en/build-with-claude/pdf-support), [vision](https://platform.claude.com/docs/en/build-with-claude/vision), and server-side and client-side [tools](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview), with two exceptions: [web fetch](https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-fetch-tool) is not available on Claude Opus 5, and [Priority Tier](https://platform.claude.com/docs/en/api/service-tiers#supported-models) is not supported on Claude Opus 5. It also adds [mid-conversation system messages](https://platform.claude.com/docs/en/build-with-claude/mid-conversation-system-messages) and publicly documents [refusal stop details](https://platform.claude.com/docs/en/build-with-claude/refusals-and-fallback#refusal-response). On the Claude API and Google Cloud, Claude Opus 5 also supports [computer use](https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool) as the stable `computer_toolset_20260801` toolset and the [browser use tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/browser-use-tool) for tasks inside webpages, neither of which Claude Opus 4.7 supports; existing integrations on the earlier `computer_20251124` version continue to work unchanged on both models. To upgrade an existing integration, see [Migrate from `computer_20251124`](https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool#migrate-from-computer-20251124).

  If your code is on Claude Opus 4.6 or earlier, use [Migrating to Claude Opus 5 from Claude Opus 4.6 and earlier Opus models](https://platform.claude.com/docs/en/models/opus-5/migration-guide#migrating-from-claude-opus-46) instead. That section includes breaking changes (sampling parameters rejected, manual extended thinking rejected, new tokenizer) that the upgrade from Claude Opus 4.7 alone does not cover.

### Update your model name

```python
# Opus migration
model = "claude-opus-4-7"  # Before
model = "claude-opus-5"  # After
```

### Breaking changes

1. **Thinking on by default:** On Claude Opus 4.7, requests without a `thinking` field run without thinking; on Claude Opus 5, the same requests run with [adaptive thinking](https://platform.claude.com/docs/en/build-with-claude/thinking). `max_tokens` remains a hard limit on total output, thinking plus response text, so revisit it for workloads that ran without thinking on Claude Opus 4.7. Thinking tokens are billed as output tokens even when the thinking text is not returned to you, so although per-token pricing is unchanged, a workload that ran without thinking on Claude Opus 4.7 can produce more output tokens per request on Claude Opus 5; see [Cost control](https://platform.claude.com/docs/en/build-with-claude/thinking-steering-and-cost#cost-control). To preserve the old behavior, pass `thinking: \{type: "disabled"\}`, subject to the effort cap in the next item; note that with thinking disabled the model can occasionally emit tool calls as plain text or include internal XML tags in its visible output, so prefer lower effort levels with thinking enabled where you can, and see [Running with thinking disabled](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5#running-with-thinking-disabled) for mitigations where you can't.

   The response shape changes with it. With thinking on, a response can begin with one or more `thinking` blocks before the first `text` block, and because `thinking.display` defaults to `"omitted"` on Claude Opus 5, those blocks arrive with an empty `thinking` field alongside their `signature`. Code that reads the reply by position, such as `content[0].text` or a stream handler that treats the first `content_block_start` event as text, breaks on these responses. Select content blocks by their `type` field instead: read `text` from the blocks whose `type` is `"text"`, and branch on the block type when handling stream events. To receive readable thinking summaries instead of an empty `thinking` field, set `display: "summarized"`; see [Controlling thinking display](https://platform.claude.com/docs/en/build-with-claude/thinking#controlling-thinking-display).

   If you run a tool-use loop, pass the `thinking` blocks from each assistant response back to the API complete and unmodified when you return tool results, including blocks whose `thinking` field is empty. Echo the assistant message as received rather than filtering its content blocks by type or rebuilding it: the API rejects edited, reordered, or partially dropped thinking blocks with a 400 error. See [Preserving thinking blocks](https://platform.claude.com/docs/en/build-with-claude/thinking#preserving-thinking-blocks).

2. **Disabling thinking is capped at `high` effort:** You can turn thinking off with `thinking: \{type: "disabled"\}`, but only at an [effort](https://platform.claude.com/docs/en/build-with-claude/effort) level of `high` or below. A request that combines `thinking: \{type: "disabled"\}` with effort `xhigh` or `max` returns a 400 error. Claude Opus 4.7 accepts this combination, so audit requests that disable thinking before you migrate.

   The check is enforced on each request: every request's effort and thinking configuration is validated independently, so a request that raises effort to `xhigh` or `max` while thinking is disabled is rejected even if earlier requests in the conversation were accepted.

   Before (accepted on Claude Opus 4.7, rejected on Claude Opus 5):

   ```python
   client.messages.create(
       model="claude-opus-4-7",
       max_tokens=16000,
       thinking={"type": "disabled"},
       output_config={"effort": "xhigh"},
       messages=[{"role": "user", "content": "..."}],
   )
   ```

   After (Claude Opus 5), either remove the `thinking` field to run with thinking:

   ```python
   client.messages.create(
       model="claude-opus-5",
       max_tokens=16000,
       output_config={"effort": "xhigh"},  # thinking is on by default
       messages=[{"role": "user", "content": "..."}],
   )
   ```

   or keep thinking disabled and lower the effort:

   ```python
   client.messages.create(
       model="claude-opus-5",
       max_tokens=16000,
       thinking={"type": "disabled"},
       output_config={"effort": "high"},  # or "medium", "low"
       messages=[{"role": "user", "content": "..."}],
   )
   ```

### What changed

The following items are not breaking changes; they describe behavior differences worth checking after you swap the model ID.

1. **Sampling parameters (unchanged):** Setting `temperature`, `top_p`, or `top_k` to a non-default value returns a 400 error on Claude Opus 5, the same as on Claude Opus 4.7. Most SDKs still define these fields for compatibility with earlier models, so code that sets them type-checks even though the API rejects the request. The Python SDK (v1.0 and later) does not define them, and passing them raises a `TypeError`. If you removed these parameters when migrating to Opus 4.7, no further changes are needed.

2. **Effort default is `high`:** The [effort parameter](https://platform.claude.com/docs/en/build-with-claude/effort) default on Claude Opus 5 is `high` on the Claude API and Claude Code. If you already set effort explicitly, your setting is unchanged.

3. **Effort levels recalibrated:** The token allocation behind each effort level changes on Claude Opus 5 compared to Claude Opus 4.7, and Claude Opus 5 supports the full set of effort levels (`low`, `medium`, `high`, `xhigh`, `max`). Run a fresh effort sweep on your own evals rather than carrying over a setting tuned for Claude Opus 4.7. `low` and `medium` effort are worth testing as cost and latency controls, and test `max` effort where maximum capability matters more than token spend. If you run at `xhigh` or `max` effort, set a large `max_tokens` so the model has room to think and act; start at 64k tokens and tune from there. See [Effort](https://platform.claude.com/docs/en/build-with-claude/effort).

4. **1M context window is the default:** Claude Opus 5 serves the full 1M token [context window](https://platform.claude.com/docs/en/build-with-claude/context-windows) by default with no beta header and no long-context premium. If your client passes a context-window beta header for compatibility with older models, you can remove it on Claude Opus 5.

5. **Mid-conversation system messages:** Claude Opus 5 accepts `role: "system"` messages immediately after a user turn in the `messages` array (subject to [placement rules](https://platform.claude.com/docs/en/build-with-claude/mid-conversation-system-messages#limitations)). Use the top-level `system` field for instructions that apply from the start. Claude Opus 4.7 rejects `role: "system"` in `messages` with a 400 error. If you maintain code paths that rebuild the full message history to update instructions, you can simplify them and preserve [prompt cache](https://platform.claude.com/docs/en/build-with-claude/prompt-caching) hits on earlier turns.

6. **Refusal stop details:** The `stop_details` object on refusal responses (available since Claude Opus 4.7) is now publicly documented. When the model declines a request, it identifies the category of refusal, in addition to the existing `refusal` stop reason. No beta header is required, and there is no opt-out. See [Handling stop reasons](https://platform.claude.com/docs/en/build-with-claude/handling-stop-reasons).

7. **Lower prompt caching minimum:** The minimum cacheable prompt length on Claude Opus 5 is 512 tokens, lower than on Claude Opus 4.7. Prompts that were too short to cache on Claude Opus 4.7 can now create cache entries, with no code changes required. See [Prompt caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching#cache-limitations) for per-model minimums.

8. **Fast mode:** Claude Opus 5 supports [fast mode](https://platform.claude.com/docs/en/build-with-claude/fast-mode) (research preview); fast mode is not available on Claude Opus 4.7, where requests with `speed: "fast"` return an error. The `speed: "fast"` parameter and `fast-mode-2026-02-01` beta header work unchanged on Claude Opus 5.

### Recommended changes

These are not required but will improve your experience:

1. **Consider automatic fallbacks:** Claude Opus 5 ships with cybersecurity safety classifiers whose cyber-category refusals can fall back to Claude Opus 4.8. To re-run refused requests on another model automatically, consider the `fallbacks` parameter with the `"default"` mode (`fallbacks: "default"`), which selects a recommended fallback model based on the refusal category instead of a hand-maintained model list. Server-side fallback is in beta; the `"default"` mode requires the `server-side-fallback-2026-07-01` beta header. See [Refusals and fallback](https://platform.claude.com/docs/en/build-with-claude/refusals-and-fallback).

2. **Change tools mid-conversation (beta):** You can add or remove tools between turns of a conversation without invalidating [prompt cache](https://platform.claude.com/docs/en/build-with-claude/prompt-caching) hits on earlier turns. Send the beta header `mid-conversation-tool-changes-2026-07-01`. This is useful for agentic workloads that expose tools progressively or retire them as a task advances; without it, a changed tool list invalidates the cached prefix.

3. **Re-tune length and verbosity prompts:** Default visible responses and written deliverables run longer on Claude Opus 5 than on earlier Opus models, and lowering effort reduces thinking volume without reliably shortening the visible response. Prompt explicitly for conciseness or a target length instead. See [Response length and verbosity](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5#response-length-and-verbosity) and [Written deliverable length](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5#written-deliverable-length).

4. **Remove carried-over verification instructions and constrain scope:** Claude Opus 5 verifies its own work without being told to, so remove explicit verification or self-check instructions carried over from prompts tuned for earlier models; leaving them in causes over-verification. For narrow tasks, constrain the task scope explicitly. In multi-agent frameworks, give explicit guidance on which scenarios warrant delegation or cap the number of subagents, because Claude Opus 5 delegates more readily than earlier models. See [Task scope and over-verification](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5#task-scope-and-over-verification) and [Controlling subagent spawning](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5#controlling-subagent-spawning).

### Migration checklist

* Update model name from `claude-opus-4-7` to `claude-opus-5` (or update aliases).
* Review workloads that ran without a `thinking` field: they run with thinking on Claude Opus 5. Revisit `max_tokens`, which remains a hard limit on total output (thinking plus response text), or pass `thinking: \{type: "disabled"\}` at effort `high` or below to preserve the old behavior. If you disable thinking, review [Running with thinking disabled](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5#running-with-thinking-disabled) for the output artifacts that can appear and their prompting mitigations.
* Update response parsing that reads content by position, such as `content[0].text` or a stream handler that assumes the first content block is text: with thinking on, `thinking` blocks arrive before `text` blocks. Select content blocks by `type` instead.
* If you run a tool-use loop, pass `thinking` blocks back complete and unmodified when you return tool results; modified blocks return a 400 error. See [Preserving thinking blocks](https://platform.claude.com/docs/en/build-with-claude/thinking#preserving-thinking-blocks).
* Verify any code that parses the `thinking` field treats it as display text only. `thinking.display` defaults to `"omitted"` on Claude Opus 5, the same as on Claude Opus 4.7, so thinking blocks arrive with an empty `thinking` field; set `display: "summarized"` to receive readable summaries. See [Controlling thinking display](https://platform.claude.com/docs/en/build-with-claude/thinking#controlling-thinking-display).
* Audit requests that disable thinking: `thinking: \{type: "disabled"\}` with effort `xhigh` or `max` returns a 400 error, enforced on each request. Re-enable thinking or lower the effort to `high` or below.
* If you removed sampling parameters during the Opus 4.7 migration, no action is needed. If you re-added them with a 400-retry path, remove that retry path.
* Re-evaluate your `effort` setting: run a fresh [effort](https://platform.claude.com/docs/en/build-with-claude/effort) sweep on your own evals rather than carrying over a setting tuned for Claude Opus 4.7. Test `low` and `medium` effort as cost and latency controls, and `max` effort where maximum capability matters more than token spend. If you run at `xhigh` or `max` effort, raise `max_tokens` to at least 64k as a starting point.
* Remove any context-window beta header. The 1M context window is the default on the Claude API, Amazon Bedrock, Google Cloud, and Microsoft Foundry.
* If you rebuild conversation history to update instructions, consider switching to a mid-conversation system message to preserve prompt cache hits.
* Verify your stop-reason handling reads `stop_details` on refusals (available since Claude Opus 4.7; now publicly documented), and consider `fallbacks: "default"` (beta) to re-run refused requests on a recommended fallback model automatically.
* Review prompts near the caching minimum: prompts of 512 tokens or more can now create cache entries.
* If you use [web fetch](https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-fetch-tool), plan an alternative: it is not available on Claude Opus 5.
* If your organization has a [Priority Tier](https://platform.claude.com/docs/en/api/service-tiers#supported-models) commitment, note that Priority Tier is not supported on Claude Opus 5.
* If you used fast mode on Claude Opus 4.7, no request changes are needed beyond the model ID: `speed: "fast"` and the `fast-mode-2026-02-01` beta header work unchanged on Claude Opus 5.
* For agentic workloads, consider [task budgets](https://platform.claude.com/docs/en/build-with-claude/task-budgets) (beta) and mid-conversation tool changes (beta).
* Re-tune length and verbosity prompts, and remove verification and self-check instructions carried over from prompts tuned for earlier models.
* Re-baseline cost and latency at your chosen effort level. Per-token pricing is unchanged from Claude Opus 4.7, but thinking tokens are billed as output tokens, so workloads that ran without thinking can produce more output tokens per request.
