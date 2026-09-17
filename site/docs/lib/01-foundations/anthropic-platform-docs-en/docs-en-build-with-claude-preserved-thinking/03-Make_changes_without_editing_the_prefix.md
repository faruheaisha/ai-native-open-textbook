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
sourceRel: "docs/en/build-with-claude/preserved-thinking.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/build-with-claude/preserved-thinking.md"
sourceSha256: "24e105f4706c02664d4c6d281aa215750ea7e6a1accb398059f53594d20472c5"
pageSha256: "d0c5252369fed55748ac8ec08fa6ddb66b832e5e94b9f147e748469b002767a5"
contentMode: "local-full"
zh: ""
---

## Make changes without editing the prefix

Each common prefix edit has a replacement that gives the model the same information and leaves earlier bytes unchanged, so later thinking stays valid. Find the edit your code makes today in the first column:

| Instead of                                                                              | Use                                                                                                                                                                                                                                                                                                            | Beta header                                             |
| --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| Rebuilding the top-level `system` prompt                                                | A [mid-conversation system message](https://platform.claude.com/docs/en/build-with-claude/preserved-thinking#new-instructions)                                                                                                                                                                                 | None                                                    |
| Injecting a reminder and deleting it on the next request                                | A [turn-scoped system message](https://platform.claude.com/docs/en/build-with-claude/preserved-thinking#per-turn-reminders) (`clear_at: "next_user_message"`)                                                                                                                                                  | `mid-conversation-system-clear-at-2026-08-21`           |
| Adding or removing entries in `tools`                                                   | [`tool_addition` and `tool_removal` blocks](https://platform.claude.com/docs/en/build-with-claude/preserved-thinking#tool-changes)                                                                                                                                                                             | `mid-conversation-tool-changes-2026-07-01`              |
| Changing top-level `output_config.effort` (restarts the cache, doesn't affect thinking) | A [per-message `output_config`](https://platform.claude.com/docs/en/build-with-claude/preserved-thinking#effort-changes)                                                                                                                                                                                       | `mid-conversation-output-config-2026-07-01`             |
| Dropping or summarizing old turns on the client                                         | Server-side [compaction or context editing](https://platform.claude.com/docs/en/build-with-claude/preserved-thinking#server-side-trimming), or [client-side compaction](https://platform.claude.com/docs/en/build-with-claude/preserved-thinking#custom-compaction-on-the-client) that keeps no stale thinking | `compact-2026-01-12` or `context-management-2025-06-27` |
| An image or document URL whose bytes change between requests                            | A [`file_id` from the Files API](https://platform.claude.com/docs/en/build-with-claude/preserved-thinking#files-by-id), or base64                                                                                                                                                                              | None                                                    |

All of these assume you [send assistant turns back exactly as returned](https://platform.claude.com/docs/en/build-with-claude/preserved-thinking#append-assistant-turns-exactly-as-returned). To use several betas in one request, combine the values in one `anthropic-beta` header. The same names apply on Amazon Bedrock and Google Cloud (see [Beta headers](https://platform.claude.com/docs/en/api/beta-headers)):

```text wrap
anthropic-beta: thinking-binding-controls-2026-08-01,mid-conversation-system-clear-at-2026-08-21,mid-conversation-tool-changes-2026-07-01
```

### Send assistant turns back exactly as returned

Store the `content` array from each response and send it back unchanged as the assistant turn: every block type, in the order received, including `thinking` blocks whose `thinking` field is empty. A serializer that drops unknown block types, drops empty fields, or reorders blocks edits the prefix for every later turn.

### Add instructions with a mid-conversation system message

Some harnesses rebuild the top-level `system` prompt on each request to carry the current time, a token budget, a mode flag, or newly discovered project context. That invalidates every thinking block in the conversation. Instead, freeze `system` at session start. When something changes, append a [`role: "system"` message](https://platform.claude.com/docs/en/build-with-claude/mid-conversation-system-messages) at the point in `messages` where the change becomes true:

```json
{
  "role": "system",
  "content": "The user switched the workspace to read-only mode. Do not write files until told otherwise."
}
```

The model treats this message with system-prompt authority, and everything before it stays unchanged. In a tool loop, place the message after the `tool_result` user message, never between an assistant `tool_use` and its `tool_result` (see [Limitations](https://platform.claude.com/docs/en/build-with-claude/mid-conversation-system-messages#limitations)). Once sent, the message is part of the prefix for later thinking: leave it in place on later requests.

### Send per-turn reminders as turn-scoped system messages

The most common prefix edit is the per-turn nudge: a line such as "request independent reads together" or "you haven't updated the user in a while" that your code appends after each batch of tool results. To keep reminders from piling up, send each nudge as a [mid-conversation system message](https://platform.claude.com/docs/en/build-with-claude/mid-conversation-system-messages) with `clear_at: "next_user_message"`, placed after the `tool_result` user message. `clear_at` requires the beta header `mid-conversation-system-clear-at-2026-08-21`. The following `messages` array is the request after two tool calls and their results. `messages[3]` is the previous request's nudge, left in place, and `messages[6]` is this request's copy:

```json
[
  { "role": "user", "content": "Fix the failing test." },
  {
    "role": "assistant",
    "content": [
      { "type": "thinking", "thinking": "", "signature": "..." },
      {
        "type": "tool_use",
        "id": "toolu_01",
        "name": "read_file",
        "input": { "path": "tests/test_auth.py" }
      }
    ]
  },
  {
    "role": "user",
    "content": [{ "type": "tool_result", "tool_use_id": "toolu_01", "content": "..." }]
  },
  {
    "role": "system",
    "clear_at": "next_user_message",
    "content": "Request every independent read in one turn."
  },
  {
    "role": "assistant",
    "content": [
      { "type": "thinking", "thinking": "", "signature": "..." },
      {
        "type": "tool_use",
        "id": "toolu_02",
        "name": "read_file",
        "input": { "path": "src/auth.py" }
      }
    ]
  },
  {
    "role": "user",
    "content": [{ "type": "tool_result", "tool_use_id": "toolu_02", "content": "..." }]
  },
  {
    "role": "system",
    "clear_at": "next_user_message",
    "content": "Request every independent read in one turn."
  }
]
```

A user message that contains only `tool_result` blocks counts as the "next user message", so `messages[3]` is already cleared. It adds nothing to what the model sees and costs no input tokens, but because it's still in the array, the thinking in `messages[4]` stays valid. `messages[6]` is the copy the model sees this turn. On later requests, keep both where they are and append a fresh copy after the next `tool_result` message.

### Add or remove tools with `tool_addition` and `tool_removal`

Editing the `tools` array mid-session invalidates preserved thinking blocks. Instead, declare every tool the session might need in `tools` on the first request and never change the array. To change which tools the model can use from some point on, append a `role: "system"` message that carries a `tool_removal` or `tool_addition` block. These are [mid-conversation tool changes](https://platform.claude.com/docs/en/build-with-claude/mid-conversation-system-messages#mid-conversation-tool-changes) and need the beta header `mid-conversation-tool-changes-2026-07-01`. For example, to withdraw a dangerous tool after a mode switch:

```json
{
  "role": "system",
  "content": [
    { "type": "tool_removal", "tool": { "type": "tool_reference", "name": "delete_branch" } },
    { "type": "text", "text": "Branch deletion is disabled for the rest of this session." }
  ]
}
```

To offer a tool later instead, declare it in `tools` with `defer_loading: true` so the model doesn't see it at first. When it becomes available, append a `tool_addition` block:

```json
{
  "role": "system",
  "content": [
    { "type": "tool_addition", "tool": { "type": "tool_reference", "name": "deploy" } },
    { "type": "text", "text": "Authentication succeeded. Deployment is now available." }
  ]
}
```

Sometimes you can't declare a tool up front because you don't know its schema yet. An MCP server discovered at runtime is the common case. Append that tool to `tools` with `defer_loading: true`, then offer it with a `tool_addition` block. Adding a deferred tool is safe: the prefix check ignores a deferred tool until a `tool_addition` block references it, so earlier thinking stays valid. Adding a tool without `defer_loading: true` changes the prefix and invalidates earlier thinking.

The `role: "system"` messages that carry these blocks join the prefix for later thinking. Leave them in place on later requests.

### Change effort with a per-message `output_config`

Changing top-level `output_config.effort` between requests doesn't invalidate thinking, because effort isn't part of the prefix. Changing top-level effort does restart the prompt cache. On Claude Fable 5.1, use [per-message effort](https://platform.claude.com/docs/en/build-with-claude/effort#change-effort-mid-conversation-beta) instead: append a `role: "system"` message with empty `content` and the new level. It needs the beta header `mid-conversation-output-config-2026-07-01`.

```json
{ "role": "system", "content": [], "output_config": { "effort": "low" } }
```

The new level takes effect from the next `user` turn. Once sent, the message is part of `messages` and therefore part of the prefix for later thinking: leave it in place on later requests, and append another one to change effort again.

### Trim context on the server

The second most common prefix edit is client-side trimming: dropping or summarizing the oldest turns and keeping the recent ones verbatim. The kept turns' thinking blocks were produced while the removed history was still in place, so they fail the check. The server-side equivalents don't count as edits, because the check compares the conversation as you sent it:

* [Compaction](https://platform.claude.com/docs/en/build-with-claude/compaction) summarizes older turns into a compaction block when the context approaches a threshold you set, and the checked prefix restarts from that block. Its [`instructions` parameter](https://platform.claude.com/docs/en/build-with-claude/compaction#custom-summarization-instructions) takes your own summarization prompt, such as "preserve every ticker, position size, and stated assumption".
* [Context editing](https://platform.claude.com/docs/en/build-with-claude/context-editing) clears old tool results or old thinking blocks by rule, oldest first. The strategies are `clear_tool_uses_20250919` and `clear_thinking_20251015`.

### Compact on the client

You can still compact on the client. Once you rewrite anything earlier in the conversation, don't send back a thinking block that was produced before the rewrite.

#### Simple compaction (recommended)

When the conversation grows too long, summarize the whole session into one user message and send only that message plus the next instruction. Nothing earlier is replayed, so there's no thinking left to fail the check, and the model reasons afresh from the summary.

![Simple compaction: request 4 sends the full history with thinking on each assistant turn; request 5 sends one user message holding a summary of turns 1 to 4 plus the next instruction, so no earlier thinking is sent and nothing is checked](https://platform.claude.com/docs/images/preserved-thinking-simple-compaction.svg)

```json
[
  {
    "role": "user",
    "content": "<summary of the session so far>\n\n<the next instruction>"
  }
]
```

Claude models are trained on long-horizon tasks with this scheme and for most workloads it performs well.

#### Keep-tail compaction

Keep-tail compaction summarizes the older turns and keeps the most recent turns verbatim, so the model still sees the last few exchanges word for word. As usually written it breaks the rule: the kept assistant turns still carry thinking blocks that were produced when the original turns, not the summary, came before them. Those blocks fail.

![Keep-tail compaction: the history is replaced by a summary of turns 1 and 2 followed by turns 3 to 5 verbatim; the thinking on assistant turns 3 and 4 was produced after the original turns, not the summary, so it fails; the same request sent with prefix\_mismatch\_behavior drop\_block succeeds, the API drops those two blocks and lists them in input\_transformations](https://platform.claude.com/docs/images/preserved-thinking-keep-tail-compaction.svg)

Fix: keep the turns exactly as they are and send `prefix_mismatch_behavior: "drop_block"`. The API drops the stale thinking blocks, the model reads the kept turns' `text` and `tool_use` blocks, and the request succeeds.

Pass the compacted history as `messages` and set `block_binding` on the `thinking` configuration. In the following example, `compacted_messages` is the array your compaction step produced: the summary message followed by the kept turns exactly as the API returned them, `thinking` blocks included:

  ```bash cURL
  curl https://api.anthropic.com/v1/messages \
    -H "content-type: application/json" \
    -H "x-api-key: $ANTHROPIC_API_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -H "anthropic-beta: thinking-binding-controls-2026-08-01" \
    -d "{
      \"model\": \"claude-fable-5-1\",
      \"max_tokens\": 16000,
      \"thinking\": {
        \"type\": \"adaptive\",
        \"block_binding\": { \"prefix_mismatch_behavior\": \"drop_block\" }
      },
      \"messages\": $COMPACTED_MESSAGES
    }"
  ```

  ```bash CLI
  ant beta:messages create --beta thinking-binding-controls-2026-08-01 <<YAML
  model: claude-fable-5-1
  max_tokens: 16000
  thinking:
    type: adaptive
    block_binding:
      prefix_mismatch_behavior: drop_block
  messages: $COMPACTED_MESSAGES
  YAML
  ```

  ```python Python
  client = anthropic.Anthropic()

  # compacted_messages: the summary message, then the kept turns as returned
  response = client.beta.messages.create(
      model="claude-fable-5-1",
      max_tokens=16000,
      thinking={
          "type": "adaptive",
          "block_binding": {"prefix_mismatch_behavior": "drop_block"},
      },
      messages=compacted_messages,
      betas=["thinking-binding-controls-2026-08-01"],
  )

  print(response.input_transformations)
  ```

  ```typescript TypeScript
  const client = new Anthropic();

  // compactedMessages: the summary message, then the kept turns as returned
  const response = await client.beta.messages.create({
    model: "claude-fable-5-1",
    max_tokens: 16000,
    thinking: {
      type: "adaptive",
      block_binding: { prefix_mismatch_behavior: "drop_block" }
    },
    messages: compactedMessages,
    betas: ["thinking-binding-controls-2026-08-01"]
  });

  console.log(response.input_transformations);
  ```

  ```csharp C#
  AnthropicClient client = new();

  // compactedMessages: the summary message, then the kept turns as returned
  var response = await client.Beta.Messages.Create(
      new()
      {
          Model = "claude-fable-5-1",
          MaxTokens = 16000,
          Thinking = new BetaThinkingConfigAdaptive
          {
              BlockBinding = new()
              {
                  PrefixMismatchBehavior = BetaThinkingPrefixMismatchBehavior.DropBlock,
              },
          },
          Messages = compactedMessages,
          Betas = [AnthropicBeta.ThinkingBindingControls2026_08_01],
      }
  );

  Console.WriteLine(response.InputTransformations?.Count ?? 0);
  ```

  ```go Go
  client := anthropic.NewClient()

  // compactedMessages: the summary message, then the kept turns as returned
  response, err := client.Beta.Messages.New(context.TODO(), anthropic.BetaMessageNewParams{
  	Model:     "claude-fable-5-1",
  	MaxTokens: 16000,
  	Thinking: anthropic.BetaThinkingConfigParamUnion{
  		OfAdaptive: &anthropic.BetaThinkingConfigAdaptiveParam{
  			BlockBinding: anthropic.BetaThinkingBlockBindingParam{
  				PrefixMismatchBehavior: anthropic.BetaThinkingPrefixMismatchBehaviorDropBlock,
  			},
  		},
  	},
  	Messages: compactedMessages,
  	Betas:    []anthropic.AnthropicBeta{anthropic.AnthropicBetaThinkingBindingControls2026_08_01},
  })
  if err != nil {
  	log.Fatal(err)
  }

  fmt.Println(len(response.InputTransformations))
  ```

  ```java Java
  import com.anthropic.models.beta.AnthropicBeta;
  import com.anthropic.models.beta.messages.BetaMessage;
  import com.anthropic.models.beta.messages.BetaThinkingBlockBinding;
  import com.anthropic.models.beta.messages.BetaThinkingConfigAdaptive;
  import com.anthropic.models.beta.messages.BetaThinkingPrefixMismatchBehavior;
  import com.anthropic.models.beta.messages.MessageCreateParams;

  void main() {
      AnthropicClient client = AnthropicOkHttpClient.fromEnv();

      // compactedMessages: the summary message, then the kept turns as returned
      MessageCreateParams params = MessageCreateParams.builder()
          .model("claude-fable-5-1")
          .maxTokens(16000L)
          .thinking(BetaThinkingConfigAdaptive.builder()
              .blockBinding(BetaThinkingBlockBinding.builder()
                  .prefixMismatchBehavior(BetaThinkingPrefixMismatchBehavior.DROP_BLOCK)
                  .build())
              .build())
          .messages(compactedMessages)
          .addBeta(AnthropicBeta.THINKING_BINDING_CONTROLS_2026_08_01)
          .build();

      BetaMessage response = client.beta().messages().create(params);

      IO.println(response.inputTransformations());
  }
  ```

  ```php PHP
  use Anthropic\Beta\AnthropicBeta;
  use Anthropic\Beta\Messages\BetaThinkingBlockBinding;
  use Anthropic\Beta\Messages\BetaThinkingConfigAdaptive;
  use Anthropic\Beta\Messages\BetaThinkingPrefixMismatchBehavior;
  use Anthropic\Client;

  $client = new Client();

  // $compactedMessages: the summary message, then the kept turns as returned
  $response = $client->beta->messages->create(
      model: 'claude-fable-5-1',
      maxTokens: 16000,
      thinking: BetaThinkingConfigAdaptive::with(
          blockBinding: BetaThinkingBlockBinding::with(
              prefixMismatchBehavior: BetaThinkingPrefixMismatchBehavior::DROP_BLOCK,
          ),
      ),
      messages: $compactedMessages,
      betas: [AnthropicBeta::THINKING_BINDING_CONTROLS_2026_08_01],
  );

  var_dump($response->inputTransformations);
  ```

  ```ruby Ruby
  client = Anthropic::Client.new

  # compacted_messages: the summary message, then the kept turns as returned
  response = client.beta.messages.create(
    model: "claude-fable-5-1",
    max_tokens: 16_000,
    thinking: {
      type: "adaptive",
      block_binding: {prefix_mismatch_behavior: "drop_block"}
    },
    messages: compacted_messages,
    betas: [Anthropic::AnthropicBeta::THINKING_BINDING_CONTROLS_2026_08_01]
  )

  puts response.input_transformations
  ```

The response carries the new assistant turn as usual, plus one `input_transformations` entry per dropped block. For the history in the diagram, that's the thinking on assistant turns 3 and 4:

```json
{
  "input_transformations": [
    {
      "type": "thinking_dropped",
      "path": "messages.2.content.0",
      "reason": "prefix_binding_mismatch"
    },
    {
      "type": "thinking_dropped",
      "path": "messages.4.content.0",
      "reason": "prefix_binding_mismatch"
    }
  ]
}
```

Keep sending `"drop_block"` on later requests for as long as those two turns stay in the history. Thinking the model produces from this request onward follows the summary and stays valid. If you'd rather not depend on the beta header, the alternative is to strip the `thinking` and `redacted_thinking` blocks from the kept assistant turns yourself when you build the compacted history.

#### Patterns that don't work with preserved thinking

* **Background compaction.** Building the summary off the critical path and swapping it in a few requests later breaks the rule the same way keep-tail does, with a delay: every assistant turn produced while the summary was being built carries thinking that predates the swap, and it all fails the moment the summary lands. If you need it, treat the swap like keep-tail and send `"drop_block"` from the swap onward. Otherwise compact synchronously.
* **Cutting turns out of the middle.** Removing individual turns invalidates every thinking block after them, and no compaction scheme avoids that. If you were cutting a turn to change an instruction, append a [mid-conversation system message](https://platform.claude.com/docs/en/build-with-claude/preserved-thinking#new-instructions) instead. To remove old tool results or old thinking selectively, use server-side [context editing](https://platform.claude.com/docs/en/build-with-claude/context-editing).
* **Compacting in the middle of a tool round.** Don't compact between an assistant turn's `tool_use` and the `tool_result` that answers it. Send that assistant turn back with its thinking intact so the model finishes the round with its reasoning. See [Preserving thinking blocks](https://platform.claude.com/docs/en/build-with-claude/thinking#preserving-thinking-blocks).

### Reference files by ID, not by a URL whose content changes

For an `image` or `document` block with a `url` source, the check covers the fetched bytes, not the URL string. A URL whose content changes invalidates later thinking: a "latest screenshot" endpoint, or a document someone edits between turns. A rotating signed URL for the same file doesn't. For content you reference across turns, upload it once with the [Files API](https://platform.claude.com/docs/en/build-with-claude/files) and use the `file_id`, or send base64.
