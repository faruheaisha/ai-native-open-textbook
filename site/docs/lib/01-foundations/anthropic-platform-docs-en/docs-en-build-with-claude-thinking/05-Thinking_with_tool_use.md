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
pageSha256: "acf70d4c0077a9f47505d2c213594a0b2f4af9be8fceebe7ff1b0b399ac994f4"
contentMode: "local-full"
zh: ""
---

## Thinking with tool use

Thinking works alongside [tool use](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview), letting Claude reason through tool selection and process tool results. Two constraints apply:

1. **Tool choice limitation (manual mode):** tool use with manual extended thinking (`thinking: \{type: "enabled"\}`) only supports `tool_choice: \{"type": "auto"\}` (the default) or `tool_choice: \{"type": "none"\}`. Using `tool_choice: \{"type": "any"\}` or `tool_choice: \{"type": "tool", "name": "..."\}` results in an error because these options force tool use, which is incompatible with manual extended thinking. Adaptive thinking, including on models where thinking is on by default, supports forced tool use, except on Claude Fable 5.1 and Claude Mythos 5.1 (see [Response prefill and forced tool use](https://platform.claude.com/docs/en/build-with-claude/thinking#limits-and-feature-compatibility)).
2. **Preserving thinking blocks:** when you return tool results, you must pass the thinking blocks from the assistant message back to the API, complete and unmodified. See [Preserving thinking blocks](https://platform.claude.com/docs/en/build-with-claude/thinking#preserving-thinking-blocks).

**A tool-use loop is one assistant turn.** From the model's perspective, an assistant turn doesn't complete until Claude finishes its full response, which may include multiple tool calls and results. This whole sequence is a single assistant turn:

```text wrap
User: "What's the weather in Paris?"
Assistant: [thinking] + [tool_use: get_weather]
User: [tool_result: "20°C, sunny"]
Assistant: [text: "The weather in Paris is 20°C and sunny"]
```

The entire turn runs in a single thinking mode: you can't toggle thinking in the middle of a turn, including during the tool-use loop. In extended (manual) mode, the API additionally enforces that the final assistant turn of a thinking-enabled request begins with a thinking block. Adaptive mode relaxes this: no assistant turn needs to start with one.

**Mid-turn conflicts degrade gracefully.** If you toggle thinking mid-turn (for example, between sending a tool call and returning its result), the API doesn't error. Instead, it silently disables thinking for that request. To preserve model quality, the API may strip thinking blocks that would create an invalid turn structure, or disable thinking when the conversation history is incompatible with thinking being enabled. To confirm whether thinking was active, check for the presence of `thinking` blocks in the response.

**Toggle between turns, not within them.** Plan your thinking strategy at the start of each turn. Complete the assistant turn, then change the thinking configuration for the next one:

```text wrap
User: "What's the weather?"
Assistant: [tool_use] (thinking disabled)
User: [tool_result]
Assistant: [text: "It's sunny"]
User: "What about tomorrow?"
Assistant: [thinking] + [text: "..."] (thinking enabled - new turn)
```

Toggling thinking modes also invalidates prompt caching. See [Thinking and prompt caching](https://platform.claude.com/docs/en/build-with-claude/thinking#thinking-and-prompt-caching).

### Preserving thinking blocks

When Claude invokes a tool, it pauses construction of its response to await external information. When you return the tool result, Claude continues building that same response, so its earlier reasoning must still be present. Pass every `thinking` block back to the API complete and unmodified, alongside the `tool_use` block it accompanied. This matters for two reasons:

1. **Reasoning continuity:** the thinking blocks capture the step-by-step reasoning that led to the tool requests. Including them lets Claude continue reasoning from where it left off.
2. **Context maintenance:** tool results appear as user messages in the API structure, but they're part of one continuous reasoning flow. Preserving thinking blocks maintains that flow across API calls.

In short:

* **Required:** within a tool-use turn, pass thinking blocks back.
* **Recommended:** across turns, pass everything back.
* **Allowed:** outside tool use, omit prior turns' thinking.

You don't need to prune old thinking yourself. Pass all thinking blocks back in multi-turn conversations, and the API automatically filters them, keeps the blocks needed to preserve the model's reasoning, and bills input tokens only for the blocks actually shown to Claude. Which prior-turn blocks are kept is per-model. See [Thinking block preservation by model](https://platform.claude.com/docs/en/build-with-claude/thinking#thinking-block-preservation-by-model). To override the default, use the [`clear_thinking_20251015` context-editing strategy](https://platform.claude.com/docs/en/build-with-claude/context-editing#thinking-block-clearing).

Within the latest assistant message, the sequence of consecutive `thinking` blocks must match what the model generated in the original request: you can't rearrange, edit, or partially drop them. This includes [`redacted_thinking` blocks](https://platform.claude.com/docs/en/build-with-claude/thinking#redacted-thinking-blocks).

  Modified thinking blocks are rejected with a 400 error. See [A 400 error says thinking blocks cannot be modified](https://platform.claude.com/docs/en/build-with-claude/thinking-troubleshooting#error-thinking-blocks-modified) for the exact message, the common causes, and the fix. The one exception: text placed in the empty `thinking` field of an [omitted](https://platform.claude.com/docs/en/build-with-claude/thinking#controlling-thinking-display) block is ignored rather than rejected.

For a complete two-turn walkthrough with code in every SDK, see [Thinking in tool and multi-turn workflows](https://platform.claude.com/docs/en/build-with-claude/thinking-tool-workflows#two-turn-tool-use-round-trip). It defines a tool, receives a thinking-plus-tool-use response, and echoes the assistant turn back with the tool result.

### Interleaved thinking

Interleaved thinking lets Claude think between tool calls, reasoning about each tool result before acting on it. With interleaved thinking, Claude can:

* Reason about the results of a tool call before deciding what to do next
* Chain multiple tool calls with reasoning steps in between
* Make more nuanced decisions based on intermediate results

  Consecutive tool calls do not require interleaved thinking. Claude can chain tool calls with or without interleaved thinking. Interleaving changes where thinking blocks appear between tool calls, not whether tool calls can chain.

With adaptive thinking, interleaved thinking is automatic on every model that supports adaptive thinking. No beta header is needed. On Claude Fable 5.1, Claude Mythos 5.1, Claude Fable 5, Claude Mythos 5, Claude Mythos Preview, Claude Opus 5, Claude Opus 4.8, and Claude Opus 4.7, reasoning between tool calls always appears in thinking blocks. Claude Haiku 4.5 does not support interleaved thinking. On models using manual extended thinking, interleaving requires a beta header and changes how the thinking budget is counted. [Interleaved thinking in manual mode](https://platform.claude.com/docs/en/build-with-claude/extended-thinking#interleaved-thinking) covers the per-model rules and platform-specific header behavior.

With interleaved thinking, the thinking allocation can span the entire assistant turn rather than a single response. Interleaved thinking is only supported for [tools used through the Messages API](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview).

For a worked comparison showing what interleaved thinking changes in a two-tool workflow, see [How interleaved thinking changes the flow](https://platform.claude.com/docs/en/build-with-claude/thinking-tool-workflows#how-interleaved-thinking-changes-the-flow).

### Progress updates between tool calls

On Claude Fable 5.1, Claude Mythos 5.1, and Claude Fable 5, the model can write a progress update between tool calls. A progress update is a sentence or two on what the model just found and what it's about to do next, written for the person watching the agent rather than as reasoning. Each one comes back as its own `thinking` block with its own `signature`, separate from any reasoning block at the same point. It sits immediately before the `tool_use` or `server_tool_use` block it introduces. At most one progress update precedes each tool call, and the model can skip any of them. Progress updates aren't [interleaved thinking](https://platform.claude.com/docs/en/build-with-claude/thinking#interleaved-thinking): they appear whether or not reasoning blocks appear between tool calls, and a response can contain both.

What a progress-update block contains depends on [`display`](https://platform.claude.com/docs/en/build-with-claude/thinking#controlling-thinking-display):

| `display`                                 | Reasoning blocks       | Progress-update blocks                                   |
| ----------------------------------------- | ---------------------- | -------------------------------------------------------- |
| `"omitted"` (the default on these models) | Empty `thinking` field | Empty `thinking` field                                   |
| `"updates"` (beta)                        | Empty `thinking` field | Summary text                                             |
| `"summarized"`                            | Summary text           | Summary text, not distinguishable from a reasoning block |

Use `display: "updates"` for an agent interface that keeps reasoning hidden and shows the user a status line at each step. Under it, any `thinking` block with non-empty text is a progress update, so render those and nothing else. It's in beta and requires the beta header `thinking-display-updates-2026-08-18` (on Amazon Bedrock, Google Cloud, and Microsoft Foundry, pass the beta value as described in [Beta headers](https://platform.claude.com/docs/en/api/beta-headers)). Without it, the value is rejected with the same 400 `invalid_request_error` as an unknown `display` value.

```json
{
  "model": "claude-fable-5-1",
  "max_tokens": 16000,
  "thinking": { "type": "adaptive", "display": "updates" },
  "tools": [
    {
      "name": "edit_file",
      "description": "Replace the contents of a file in the repository.",
      "input_schema": {
        "type": "object",
        "properties": {
          "path": { "type": "string" },
          "content": { "type": "string" }
        },
        "required": ["path", "content"]
      }
    }
  ],
  "messages": [
    {
      "role": "user",
      "content": "The login test fails after an hour of uptime. Find out why and fix it."
    }
  ]
}
```

Under `"updates"`, the start of the response that follows a `tool_result` looks like this. The first block is reasoning and stays empty, as it would under `"omitted"`. The second carries text, so it's a progress update. Under `"summarized"` both blocks carry text, and under `"omitted"` both are empty.

```json Output
{
  "content": [
    {
      "type": "thinking",
      "thinking": "",
      "signature": "EqMBCkYICxIM..."
    },
    {
      "type": "thinking",
      "thinking": "Confirmed the retry path never refreshes the expired token. Editing auth.py to add the refresh call.",
      "signature": "Es8CCkYICxIM..."
    },
    {
      "type": "tool_use",
      "id": "toolu_01D7FLrfh4GYq7yT1ULFeyMV",
      "name": "edit_file",
      "input": { "path": "auth.py", "content": "..." }
    }
  ]
}
```

Keep the following in mind when working with progress updates:

* Pass progress-update blocks back unchanged with the rest of the assistant turn, like any other `thinking` block.
* The text you receive is a summary of the progress update, normally a sentence or two. Don't rely on its length. The progress update counts toward `usage.output_tokens` at its full length, not the summary's.
* A progress-update block can come back with an empty `thinking` field under any `display` value. Render nothing for an empty block. Under `"updates"` it looks the same as an empty reasoning block and needs no separate handling.
* When a response stops on `max_tokens`, `model_context_window_exceeded`, or `stop_sequence` soon after a tool call or tool result, its last block can be a progress-update block standing in for the work the model hadn't finished. Under `"updates"` and `"summarized"` its text is exactly `This part of the response was interrupted before it finished.` and you can show it like any other update. Under `"omitted"` it's empty. To continue, pass the assistant turn back unchanged and append a new `user` message (with a `tool_result` for each `tool_use` block in that turn).
* When [streaming](https://platform.claude.com/docs/en/build-with-claude/thinking#streaming-thinking), expect a pause of several seconds before a progress-update block opens. See the `"updates"` trace in [Streaming thinking](https://platform.claude.com/docs/en/build-with-claude/thinking#streaming-thinking).
* These models write fewer progress updates at higher [effort](https://platform.claude.com/docs/en/build-with-claude/effort) and in long tool chains. If your interface depends on them, see [Ask for user-facing progress updates](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-1#ask-for-user-facing-progress-updates).

### Thinking block preservation by model

Whether thinking blocks from previous assistant turns stay in context by default depends on the model:

* **Keep all prior turns:** Claude Opus 4.5 and later Opus models, Claude Sonnet 4.6 and later Sonnet models, Claude Fable 5.1, Claude Mythos 5.1, Claude Fable 5, Claude Mythos 5, and Claude Mythos Preview.
* **Keep the last turn only:** earlier Opus and Sonnet models, and all Haiku models through Claude Haiku 4.5. When you pass older thinking blocks back, the API strips them automatically. You don't need to remove them yourself.

Preservation brings two benefits:

* **Cache optimization:** preserved thinking blocks enable cache hits during tool use, as they are passed back with tool results and cached incrementally across the assistant turn, resulting in token savings in multistep workflows.
* **No intelligence impact:** preserving thinking blocks has no negative effect on model performance.

The tradeoff is context usage: long conversations consume more context space on keep-all models, because retained thinking blocks count as input like any other conversation history (see [Thinking and the context window](https://platform.claude.com/docs/en/build-with-claude/thinking#thinking-and-the-context-window)). The behavior is automatic in both regimes. No code changes or beta headers are required, and you should keep passing complete, unmodified thinking blocks back as described in [Preserving thinking blocks](https://platform.claude.com/docs/en/build-with-claude/thinking#preserving-thinking-blocks). To override the default in either direction, use [thinking block clearing](https://platform.claude.com/docs/en/build-with-claude/context-editing#thinking-block-clearing).

**Switching models mid-conversation.** Keep passing thinking blocks back unchanged when you switch models, for example after a [classifier refusal fallback](https://platform.claude.com/docs/en/build-with-claude/refusals-and-fallback). A thinking block is readable only by the model that produced it or a newer one, and the API ignores or drops the blocks the target model can't read. On Claude Fable 5.1 and Claude Mythos 5.1 the direction matters: they read every earlier model's thinking blocks and no earlier model reads theirs, so switching up to them keeps the conversation's reasoning and switching down drops it (see [Preserved thinking](https://platform.claude.com/docs/en/build-with-claude/thinking#preserved-for-model) for the exact list and for how dropped blocks are billed and reported). Strip prior `thinking` and `redacted_thinking` blocks yourself only to save input tokens on models that ignore rather than drop them, and never when redeeming a [fallback credit](https://platform.claude.com/docs/en/build-with-claude/fallback-credit), which requires the body unchanged.
