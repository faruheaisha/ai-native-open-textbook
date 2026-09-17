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
pageSha256: "ede0fde306ecd2d6ab9d5ca5d4052cc032f5ab6788ebdc7c7c61602cb0cfa671"
contentMode: "local-full"
zh: ""
---

## Migrating to Claude Opus 5 from Claude Opus 4.8

  This section covers the delta from Claude Opus 4.8 only. If your code is on Claude Opus 4.7 or earlier, use these sections instead: [Migrating to Claude Opus 5 from Claude Opus 4.7](https://platform.claude.com/docs/en/models/opus-5/migration-guide#migrating-from-claude-opus-47) or [Migrating to Claude Opus 5 from Claude Opus 4.6 and earlier Opus models](https://platform.claude.com/docs/en/models/opus-5/migration-guide#migrating-from-claude-opus-46). They include this delta plus the breaking changes from earlier models (sampling parameters rejected, manual extended thinking rejected, prefill removed, new tokenizer).

### Update your model name

```python
# Opus migration
model = "claude-opus-4-8"  # Before
model = "claude-opus-5"  # After
```

`claude-opus-5` is a fixed model ID with no date suffix, the same scheme as `claude-opus-4-8` and `claude-sonnet-5`.

### Breaking changes

1. **Thinking on by default:** On Claude Opus 4.8, requests without a `thinking` field run without thinking; on Claude Opus 5, the same requests run with [adaptive thinking](https://platform.claude.com/docs/en/build-with-claude/thinking). `max_tokens` remains a hard limit on total output, thinking plus response text, so revisit it for workloads that ran without thinking on Claude Opus 4.8. Thinking tokens are billed as output tokens even when the thinking text is not returned to you, so although per-token pricing is unchanged, a workload that ran without thinking on Claude Opus 4.8 can produce more output tokens per request on Claude Opus 5; see [Cost control](https://platform.claude.com/docs/en/build-with-claude/thinking-steering-and-cost#cost-control). To preserve the old behavior, pass `thinking: \{type: "disabled"\}`, subject to the effort cap in the next item; note that with thinking disabled the model can occasionally emit tool calls as plain text or include internal XML tags in its visible output, so prefer lower effort levels with thinking enabled where you can, and see [Running with thinking disabled](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5#running-with-thinking-disabled) for mitigations where you can't.

   The response shape changes with it. With thinking on, a response can begin with one or more `thinking` blocks before the first `text` block, and because `thinking.display` defaults to `"omitted"` on Claude Opus 5, those blocks arrive with an empty `thinking` field alongside their `signature`. Code that reads the reply by position, such as `content[0].text` or a stream handler that treats the first `content_block_start` event as text, breaks on these responses. Select content blocks by their `type` field instead: read `text` from the blocks whose `type` is `"text"`, and branch on the block type when handling stream events. To receive readable thinking summaries instead of an empty `thinking` field, set `display: "summarized"`; see [Controlling thinking display](https://platform.claude.com/docs/en/build-with-claude/thinking#controlling-thinking-display).

   If you run a tool-use loop, pass the `thinking` blocks from each assistant response back to the API complete and unmodified when you return tool results, including blocks whose `thinking` field is empty. Echo the assistant message as received rather than filtering its content blocks by type or rebuilding it: the API rejects edited, reordered, or partially dropped thinking blocks with a 400 error. See [Preserving thinking blocks](https://platform.claude.com/docs/en/build-with-claude/thinking#preserving-thinking-blocks).

2. **Disabling thinking is capped at `high` effort:** You can still turn thinking off with `thinking: \{type: "disabled"\}`, but only at an [effort](https://platform.claude.com/docs/en/build-with-claude/effort) level of `high` or below. A request that combines `thinking: \{type: "disabled"\}` with effort `xhigh` or `max` returns a 400 error. Claude Opus 4.8 accepts this combination, so audit requests that disable thinking before you migrate.

   The check is enforced on each request: every request's effort and thinking configuration is validated independently, so a request that raises effort to `xhigh` or `max` while thinking is disabled is rejected even if earlier requests in the conversation were accepted.

   Before (accepted on Claude Opus 4.8, rejected on Claude Opus 5):

   ```python
   client.messages.create(
       model="claude-opus-4-8",
       max_tokens=16000,
       thinking={"type": "disabled"},
       output_config={"effort": "xhigh"},
       messages=[{"role": "user", "content": "..."}],
   )
   ```

   After (Claude Opus 5), either remove the `thinking` field to re-enable thinking:

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

### Recommended changes

These are not required but will improve your experience:

1. **Test `max` effort for capability-critical work:** Claude Opus 5 supports the full set of [effort levels](https://platform.claude.com/docs/en/build-with-claude/effort) (`low`, `medium`, `high`, `xhigh`, `max`). Where maximum capability matters more than token spend, test `max` effort. It can deliver gains on the most demanding tasks but may show diminishing returns from increased token usage and can be prone to overthinking on simpler ones. If you run at `xhigh` or `max` effort, set a large `max_tokens` so the model has room to think and act; start at 64k tokens and tune from there.

2. **Consider automatic fallbacks:** Claude Opus 5 ships with cybersecurity safety classifiers whose cyber-category refusals can fall back to Claude Opus 4.8. To re-run refused requests on another model automatically, consider the `fallbacks` parameter with the `"default"` mode (`fallbacks: "default"`), which selects a recommended fallback model based on the refusal category instead of a hand-maintained model list. Server-side fallback is in beta; the `"default"` mode requires the `server-side-fallback-2026-07-01` beta header. See [Refusals and fallback](https://platform.claude.com/docs/en/build-with-claude/refusals-and-fallback).

3. **Cache shorter prompts:** The minimum cacheable prompt length on Claude Opus 5 is 512 tokens, down from 1,024 tokens on Claude Opus 4.8. Prompts that were too short to cache on Claude Opus 4.8 can now create cache entries, with no code changes required. See [Prompt caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching#cache-limitations) for per-model minimums.

4. **Change tools mid-conversation (beta):** You can add or remove tools between turns of a conversation without invalidating [prompt cache](https://platform.claude.com/docs/en/build-with-claude/prompt-caching) hits on earlier turns. Send the beta header `mid-conversation-tool-changes-2026-07-01`. This is useful for agentic workloads that expose tools progressively or retire them as a task advances; without it, a changed tool list invalidates the cached prefix.

5. **Re-tune length and verbosity prompts:** Default visible responses and written deliverables run longer on Claude Opus 5 than on Claude Opus 4.8, and lowering effort reduces thinking volume without reliably shortening the visible response. Prompt explicitly for conciseness or a target length instead. See [Response length and verbosity](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5#response-length-and-verbosity) and [Written deliverable length](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5#written-deliverable-length).

6. **Remove carried-over verification instructions and constrain scope:** Claude Opus 5 verifies its own work without being told to, so remove explicit verification or self-check instructions carried over from prompts tuned for earlier models; leaving them in causes over-verification. For narrow tasks, constrain the task scope explicitly. In multi-agent frameworks, give explicit guidance on which scenarios warrant delegation or cap the number of subagents, because Claude Opus 5 delegates more readily than earlier models. See [Task scope and over-verification](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5#task-scope-and-over-verification) and [Controlling subagent spawning](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5#controlling-subagent-spawning).

### Migration checklist

* Update the model name from `claude-opus-4-8` to `claude-opus-5`.
* Review workloads that ran without a `thinking` field: they run with thinking on Claude Opus 5. Revisit `max_tokens`, which remains a hard limit on total output (thinking plus response text), or pass `thinking: \{type: "disabled"\}` at effort `high` or below to preserve the old behavior. If you disable thinking, review [Running with thinking disabled](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5#running-with-thinking-disabled) for the output artifacts that can appear and their prompting mitigations.
* Update response parsing that reads content by position, such as `content[0].text` or a stream handler that assumes the first content block is text: with thinking on, `thinking` blocks arrive before `text` blocks. Select content blocks by `type` instead.
* If you run a tool-use loop, pass `thinking` blocks back complete and unmodified when you return tool results; modified blocks return a 400 error. See [Preserving thinking blocks](https://platform.claude.com/docs/en/build-with-claude/thinking#preserving-thinking-blocks).
* Verify any code that parses the `thinking` field treats it as display text only. `thinking.display` defaults to `"omitted"` on Claude Opus 5, the same as on Claude Opus 4.8, so thinking blocks arrive with an empty `thinking` field; set `display: "summarized"` to receive readable summaries. See [Controlling thinking display](https://platform.claude.com/docs/en/build-with-claude/thinking#controlling-thinking-display).
* Audit requests that disable thinking: `thinking: \{type: "disabled"\}` with effort `xhigh` or `max` returns a 400 error, enforced on each request. Re-enable thinking or lower the effort to `high` or below.
* Re-evaluate your `effort` setting: run a fresh [effort](https://platform.claude.com/docs/en/build-with-claude/effort) sweep on your own evals rather than carrying over a setting tuned for an earlier model. `low` and `medium` effort are worth testing as cost and latency controls, and test `max` effort where maximum capability matters more than token spend. If you run at `xhigh` or `max` effort, raise `max_tokens` to at least 64k as a starting point.
* Review prompts near the caching minimum: prompts of 512 tokens or more can now create cache entries, down from 1,024 tokens on Claude Opus 4.8.
* Handle `stop_reason: "refusal"`, and consider `fallbacks: "default"` (beta) to re-run refused requests on a recommended fallback model automatically.
* If your organization has a [Priority Tier](https://platform.claude.com/docs/en/api/service-tiers#supported-models) commitment, plan capacity separately: Priority Tier is not supported on Claude Opus 5, while Claude Opus 4.8 keeps it.
* For agentic workloads, consider [task budgets](https://platform.claude.com/docs/en/build-with-claude/task-budgets) (beta) and mid-conversation tool changes (beta).
* Re-tune length and verbosity prompts: default visible responses and written deliverables run longer on Claude Opus 5, and lowering effort reduces thinking volume without reliably shortening the visible response. Prompt explicitly for conciseness or a target length. See [Response length and verbosity](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5#response-length-and-verbosity) and [Written deliverable length](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5#written-deliverable-length).
* Remove verification and self-check instructions carried over from prompts tuned for earlier models (they cause over-verification on Claude Opus 5), constrain task scope explicitly for narrow tasks, and in multi-agent frameworks steer or cap subagent delegation. See [Task scope and over-verification](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5#task-scope-and-over-verification) and [Controlling subagent spawning](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5#controlling-subagent-spawning).
* Re-baseline cost and latency on your own workloads. Per-token pricing is unchanged from Claude Opus 4.8, but thinking tokens are billed as output tokens, so workloads that ran without thinking can produce more output tokens per request.
