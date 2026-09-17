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
pageSha256: "77bf432e246f3c30d8259b42d38cb272b228aa6983b46f9f570a3e561000f66a"
contentMode: "local-full"
zh: ""
---

## Keeping the prefix unchanged

On Claude Fable 5.1, a thinking block stays valid only while everything you sent before it is unchanged on later requests. The checked prefix has three parts:

* The top-level `system` prompt
* The set of `tools`
* Every `message` before the block

Note: With server-side [compaction](https://platform.claude.com/docs/en/build-with-claude/compaction), the checked prefix starts at the most recent compaction block.

Request parameters outside those three fields, such as `effort`, `max_tokens`, `output_config`, `tool_choice`, and `metadata`, aren't part of the prefix check, and neither are `cache_control` markers. [What counts as an edit](https://platform.claude.com/docs/en/build-with-claude/preserved-thinking#what-counts-as-an-edit) has the full list.

Earlier thinking blocks aren't in the prefix, but each thinking block records which thinking block came before it, across turns. You can remove thinking blocks from the front of the history, oldest first. Removing one from the middle invalidates thinking blocks after it.

Keep `system` and `tools` fixed for the session and treat `messages` as append-only. The same discipline keeps the prefix stable for [prompt caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching): the edits that invalidate thinking are the edits that restart the cache.

### What the API does with an invalid block

You choose with `thinking.block_binding.prefix_mismatch_behavior`:

* **`"error"` (the default):** the API rejects the request with a 400 `invalid_request_error` that names the first failing block.
* **`"drop_block"`:** the API drops each failing block and every thinking block after it, and the request succeeds. Dropped blocks aren't billed. The model answers that turn without using reasoning from dropped blocks, and the prompt cache restarts at the edit. The response lists each dropped block in `input_transformations` (on the `message_start` event when streaming) with `reason: "prefix_binding_mismatch"`.

Both the field and the `input_transformations` array require the `thinking-binding-controls-2026-08-01` [beta header](https://platform.claude.com/docs/en/api/beta-headers). [Set the mismatch behavior and read `input_transformations`](https://platform.claude.com/docs/en/build-with-claude/preserved-thinking#preserved-thinking-controls) shows the request in each SDK.

The 400 message begins:

```text wrap
messages.1.content.0: Invalid `signature` in `thinking` block. The block is bound to a different conversation. Remove the block, or set `thinking.block_binding.prefix_mismatch_behavior` to "drop_block".
```

If the request didn't send the beta header, the message continues:

```text wrap
That setting requires the `thinking-binding-controls-2026-08-01` value in the `anthropic-beta` header.
```

It usually ends with a sentence naming what changed, for example that the `system` prompt or the `tools` list differs from when the block was created. See [Troubleshooting thinking](https://platform.claude.com/docs/en/build-with-claude/thinking-troubleshooting#error-thinking-block-signature) for every variant of this error.

If you hit this 400 in production, retrying the same body fails the same way. Retry with the beta header and `prefix_mismatch_behavior: "drop_block"` and keep sending it for the rest of the session, or strip every `thinking` and `redacted_thinking` block from the history yourself and retry once. Then fix the edit that caused the mismatch. In the Message Batches API, an item that leaves the field unset drops failing blocks instead of erroring, so set `"error"` explicitly there if you want batch items to fail.

A tampered or undecryptable signature is a different failure. It always returns a 400 (``Invalid `signature` in `thinking` block`` with no sentence about the conversation), and `prefix_mismatch_behavior` doesn't apply to it.

### Set the mismatch behavior and read `input_transformations`

The `thinking-binding-controls-2026-08-01` [beta header](https://platform.claude.com/docs/en/api/beta-headers) adds:

* A top-level `input_transformations` array on every response
* A `block_binding` object on the `thinking` configuration, whose one field is `prefix_mismatch_behavior`

`block_binding` is accepted alongside `thinking.type: "adaptive"` and `thinking.type: "enabled"`. Sending it without the beta header returns a 400 error. Models that don't run the prefix check accept the object and report only model-check drops, so one request body works across models.

The following request opts into dropping rather than rejecting. On a first turn there's nothing to replay, so `input_transformations` comes back empty:

  ```bash cURL
  curl https://api.anthropic.com/v1/messages \
    -H "x-api-key: $ANTHROPIC_API_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -H "anthropic-beta: thinking-binding-controls-2026-08-01" \
    -H "content-type: application/json" \
    -d '{
      "model": "claude-fable-5-1",
      "max_tokens": 16000,
      "thinking": {
        "type": "adaptive",
        "block_binding": {
          "prefix_mismatch_behavior": "drop_block"
        }
      },
      "messages": [
        {
          "role": "user",
          "content": "What is the greatest common divisor of 1071 and 462?"
        }
      ]
    }'
  ```

  ```bash CLI
  ant beta:messages create --beta thinking-binding-controls-2026-08-01 \
    --transform '{content.#(type=="text")#.text,input_transformations}' \
    --format yaml <<'YAML'
  model: claude-fable-5-1
  max_tokens: 16000
  thinking:
    type: adaptive
    block_binding:
      prefix_mismatch_behavior: drop_block
  messages:
    - role: user
      content: What is the greatest common divisor of 1071 and 462?
  YAML
  ```

  ```python Python
  client = anthropic.Anthropic()

  response = client.beta.messages.create(
      model="claude-fable-5-1",
      max_tokens=16000,
      thinking={
          "type": "adaptive",
          "block_binding": {"prefix_mismatch_behavior": "drop_block"},
      },
      messages=[
          {
              "role": "user",
              "content": "What is the greatest common divisor of 1071 and 462?",
          }
      ],
      betas=["thinking-binding-controls-2026-08-01"],
  )

  for block in response.content:
      if block.type == "text":
          print(block.text)

  print(f"Input transformations: {len(response.input_transformations or [])}")
  ```

  ```typescript TypeScript
  const client = new Anthropic();

  const response = await client.beta.messages.create({
    model: "claude-fable-5-1",
    max_tokens: 16000,
    thinking: {
      type: "adaptive",
      block_binding: { prefix_mismatch_behavior: "drop_block" }
    },
    messages: [
      { role: "user", content: "What is the greatest common divisor of 1071 and 462?" }
    ],
    betas: ["thinking-binding-controls-2026-08-01"]
  });

  for (const block of response.content) {
    if (block.type === "text") {
      console.log(block.text);
    }
  }
  console.log(`Input transformations: ${response.input_transformations?.length ?? 0}`);
  ```

  ```csharp C#
  AnthropicClient client = new();

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
          Messages =
          [
              new()
              {
                  Role = Role.User,
                  Content = "What is the greatest common divisor of 1071 and 462?",
              },
          ],
          Betas = [AnthropicBeta.ThinkingBindingControls2026_08_01],
      }
  );

  foreach (var block in response.Content)
  {
      if (block.TryPickText(out var textBlock))
      {
          Console.WriteLine(textBlock.Text);
      }
  }

  Console.WriteLine($"Input transformations: {response.InputTransformations?.Count ?? 0}");
  ```

  ```go Go
  client := anthropic.NewClient()

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
  	Messages: []anthropic.BetaMessageParam{
  		anthropic.NewBetaUserMessage(anthropic.NewBetaTextBlock("What is the greatest common divisor of 1071 and 462?")),
  	},
  	Betas: []anthropic.AnthropicBeta{anthropic.AnthropicBetaThinkingBindingControls2026_08_01},
  })
  if err != nil {
  	log.Fatal(err)
  }

  for _, block := range response.Content {
  	if textBlock, ok := block.AsAny().(anthropic.BetaTextBlock); ok {
  		fmt.Println(textBlock.Text)
  	}
  }
  fmt.Printf("Input transformations: %d\n", len(response.InputTransformations))
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

      MessageCreateParams params = MessageCreateParams.builder()
          .model("claude-fable-5-1")
          .maxTokens(16000L)
          .addBeta(AnthropicBeta.THINKING_BINDING_CONTROLS_2026_08_01)
          .thinking(BetaThinkingConfigAdaptive.builder()
              .blockBinding(BetaThinkingBlockBinding.builder()
                  .prefixMismatchBehavior(BetaThinkingPrefixMismatchBehavior.DROP_BLOCK)
                  .build())
              .build())
          .addUserMessage("What is the greatest common divisor of 1071 and 462?")
          .build();

      BetaMessage response = client.beta().messages().create(params);

      response.content().stream()
          .flatMap(block -> block.text().stream())
          .forEach(textBlock -> IO.println(textBlock.text()));
      IO.println("Input transformations: "
          + response.inputTransformations().map(List::size).orElse(0));
  }
  ```

  ```php PHP
  use Anthropic\Beta\AnthropicBeta;
  use Anthropic\Beta\Messages\BetaThinkingBlockBinding;
  use Anthropic\Beta\Messages\BetaThinkingConfigAdaptive;
  use Anthropic\Beta\Messages\BetaThinkingPrefixMismatchBehavior;
  use Anthropic\Client;

  $client = new Client();

  $response = $client->beta->messages->create(
      model: 'claude-fable-5-1',
      maxTokens: 16000,
      thinking: BetaThinkingConfigAdaptive::with(
          blockBinding: BetaThinkingBlockBinding::with(
              prefixMismatchBehavior: BetaThinkingPrefixMismatchBehavior::DROP_BLOCK,
          ),
      ),
      messages: [
          ['role' => 'user', 'content' => 'What is the greatest common divisor of 1071 and 462?'],
      ],
      betas: [AnthropicBeta::THINKING_BINDING_CONTROLS_2026_08_01],
  );

  foreach ($response->content as $block) {
      if ($block->type === 'text') {
          echo $block->text, PHP_EOL;
      }
  }

  echo 'Input transformations: ', count($response->inputTransformations ?? []), PHP_EOL;
  ```

  ```ruby Ruby
  client = Anthropic::Client.new

  response = client.beta.messages.create(
    model: "claude-fable-5-1",
    max_tokens: 16_000,
    thinking: {
      type: "adaptive",
      block_binding: {prefix_mismatch_behavior: "drop_block"}
    },
    messages: [
      {role: "user", content: "What is the greatest common divisor of 1071 and 462?"}
    ],
    betas: [Anthropic::AnthropicBeta::THINKING_BINDING_CONTROLS_2026_08_01]
  )

  response.content.each do |block|
    puts block.text if block.type == :text
  end

  puts "Input transformations: #{response.input_transformations&.length || 0}"
  ```

```text Output wrap
The greatest common divisor of 1071 and 462 is 21.
Input transformations: 0
```

Under the beta header, every response from a thinking-capable model carries `input_transformations`. It's empty when nothing was dropped. Each entry has `type: "thinking_dropped"`, the `path` of the dropped block (for example `messages.1.content.0`), and a `reason` of `prefix_binding_mismatch` or `model_binding_mismatch` (see [Switching models mid-conversation](https://platform.claude.com/docs/en/build-with-claude/preserved-thinking#switching-models)). Ignore entries whose `type` or `reason` you don't recognize, because later checks add values.

When [streaming](https://platform.claude.com/docs/en/build-with-claude/streaming), the array arrives on the `message` object in the `message_start` event. After a mid-stream server-side fallback, the final `message_delta` event carries it again with the serving model's entries. In a [message batch](https://platform.claude.com/docs/en/build-with-claude/batch-processing), an item whose block fails the prefix check under an explicit `"error"` resolves as `errored`, and an item that leaves the field unset drops the failing blocks instead. The [token counting](https://platform.claude.com/docs/en/build-with-claude/token-counting) endpoint runs the same prefix check and returns the same 400.

### When the API enforces the check

The prefix check runs on Claude Fable 5.1 for new accounts.

* **Accounts created on or after August 31, 2026, 00:00 UTC:** the API checks Claude Fable 5.1 requests and applies `"error"` unless you set `"drop_block"`. The same definition of a new account applies to the Claude API and to cloud platforms.
* **Older accounts:** the API checks requests that set `prefix_mismatch_behavior`. This parameter opts a request in, so you can see what a new account sees without creating one.
* **Later models:** every account, on every request.

To find out which group your account is in, take a Claude Fable 5.1 conversation that contains a thinking block, change something before that block, and send it to Claude Fable 5.1 without the beta header or the `block_binding` field. A 400 response that names the header means your account is enforced by default.

  If you maintain a tool or framework that people run with their own API key, your users on new accounts hit the check before you do, because your own key is likely on an older account. Test with `prefix_mismatch_behavior` set so you see what they see.

### What counts as an edit

Each row compares two consecutive requests:

| Change between requests                                                                                                                                | Later thinking blocks                                                  |
| ------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------- |
| Append messages at the end                                                                                                                             | Valid                                                                  |
| Add a tool with `defer_loading: true` that nothing has referenced yet                                                                                  | Valid                                                                  |
| Remove `thinking` blocks from the start of the history                                                                                                 | Valid                                                                  |
| Change any request parameter outside `system`, `tools`, and `messages` (`effort`, `max_tokens`, `output_config`, `tool_choice`, `metadata`, and so on) | Valid                                                                  |
| Add, move, or remove `cache_control` markers                                                                                                           | Valid                                                                  |
| A rotating signed URL that returns the same bytes                                                                                                      | Valid                                                                  |
| Server-side compaction or context editing removes or replaces content                                                                                  | Valid (the check compares what you sent, not the server's edited copy) |
| A cleared [turn-scoped system message](https://platform.claude.com/docs/en/build-with-claude/preserved-thinking#per-turn-reminders) left in place      | Valid                                                                  |
| Edit, reorder, or delete any earlier `user`, `assistant`, or `system` message                                                                          | Invalid                                                                |
| Add a text block to an earlier user turn, or remove one you added last time                                                                            | Invalid                                                                |
| Change the top-level `system` string or blocks                                                                                                         | Invalid                                                                |
| Add, remove, rename, or edit a tool in `tools`                                                                                                         | Invalid                                                                |
| Remove a `thinking` block from the middle of the history and keep later ones                                                                           | Invalid for every later thinking block                                 |
| An image or document URL that returns different bytes on the next request                                                                              | Invalid                                                                |
| The same turn-scoped message deleted or reworded on a later request                                                                                    | Invalid                                                                |

### Check whether your code edits the prefix

First, diff what you send. Capture the request bodies your integration sends over a few normal turns, including a compaction or a tool change. For each pair of consecutive requests, compare `system`, `tools`, and the `messages` they share. They should be identical up to the newly appended turns.

Then confirm against the API. Add the `thinking-binding-controls-2026-08-01` beta header, set `prefix_mismatch_behavior` to `"drop_block"`, and run a normal multi-turn session through your integration on claude-fable-5-1. The following example runs two turns the way your integration should: `messages` only grows, each assistant turn goes back exactly as the API returned it, `thinking` blocks included, and `block_binding` is set on every request. It prints the number of dropped blocks after each turn:

  ```bash cURL
  FIRST=$(curl -s https://api.anthropic.com/v1/messages \
    -H "content-type: application/json" \
    -H "x-api-key: $ANTHROPIC_API_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -H "anthropic-beta: thinking-binding-controls-2026-08-01" \
    -d '{
      "model": "claude-fable-5-1",
      "max_tokens": 16000,
      "thinking": {
        "type": "adaptive",
        "block_binding": { "prefix_mismatch_behavior": "drop_block" }
      },
      "messages": [{ "role": "user", "content": "What is 27 * 453?" }]
    }')
  echo "$FIRST" | jq '.input_transformations | length'

  # Turn 2: the assistant turn goes back exactly as returned, then the next user message
  MESSAGES=$(jq -n --argjson first "$FIRST" '[
    { role: "user", content: "What is 27 * 453?" },
    { role: "assistant", content: $first.content },
    { role: "user", content: "Now divide that result by 3." }
  ]')

  jq -n --argjson messages "$MESSAGES" '{
    model: "claude-fable-5-1",
    max_tokens: 16000,
    thinking: {
      type: "adaptive",
      block_binding: { prefix_mismatch_behavior: "drop_block" }
    },
    messages: $messages
  }' | curl -s https://api.anthropic.com/v1/messages \
    -H "content-type: application/json" \
    -H "x-api-key: $ANTHROPIC_API_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -H "anthropic-beta: thinking-binding-controls-2026-08-01" \
    -d @- | jq '.input_transformations | length'
  ```

  ```bash CLI
  FIRST=$(ant beta:messages create --beta thinking-binding-controls-2026-08-01 \
    --transform content --format json <<'YAML'
  model: claude-fable-5-1
  max_tokens: 16000
  thinking:
    type: adaptive
    block_binding:
      prefix_mismatch_behavior: drop_block
  messages:
    - role: user
      content: What is 27 * 453?
  YAML
  )

  # Turn 2: the assistant turn goes back exactly as returned, then the next user message
  ant beta:messages create --beta thinking-binding-controls-2026-08-01 \
    --transform input_transformations --format json <<YAML
  model: claude-fable-5-1
  max_tokens: 16000
  thinking:
    type: adaptive
    block_binding:
      prefix_mismatch_behavior: drop_block
  messages:
    - role: user
      content: What is 27 * 453?
    - role: assistant
      content: $(echo "$FIRST" | jq -c .)
    - role: user
      content: Now divide that result by 3.
  YAML
  ```

  ```python Python
  client = anthropic.Anthropic()

  # messages grows across turns: each assistant turn goes back exactly as returned
  messages = []
  for user_turn in ["What is 27 * 453?", "Now divide that result by 3."]:
      messages.append({"role": "user", "content": user_turn})
      response = client.beta.messages.create(
          model="claude-fable-5-1",
          max_tokens=16000,
          thinking={
              "type": "adaptive",
              "block_binding": {"prefix_mismatch_behavior": "drop_block"},
          },
          messages=messages,
          betas=["thinking-binding-controls-2026-08-01"],
      )
      messages.append({"role": "assistant", "content": response.content})
      print(len(response.input_transformations or []))
  ```

  ```typescript TypeScript
  const client = new Anthropic();

  // messages grows across turns: each assistant turn goes back exactly as returned
  const messages: Anthropic.Beta.BetaMessageParam[] = [];
  for (const userTurn of ["What is 27 * 453?", "Now divide that result by 3."]) {
    messages.push({ role: "user", content: userTurn });
    const response = await client.beta.messages.create({
      model: "claude-fable-5-1",
      max_tokens: 16000,
      thinking: {
        type: "adaptive",
        block_binding: { prefix_mismatch_behavior: "drop_block" }
      },
      messages,
      betas: ["thinking-binding-controls-2026-08-01"]
    });
    messages.push({ role: "assistant", content: response.content });
    console.log(response.input_transformations?.length ?? 0);
  }
  ```

  ```csharp C#
  AnthropicClient client = new();

  // messages grows across turns: each assistant turn goes back exactly as returned
  List<BetaMessageParam> messages = [];
  foreach (var userTurn in new[] { "What is 27 * 453?", "Now divide that result by 3." })
  {
      messages.Add(new() { Role = Role.User, Content = userTurn });
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
              Messages = messages,
              Betas = [AnthropicBeta.ThinkingBindingControls2026_08_01],
          }
      );
      messages.Add(new()
      {
          Role = Role.Assistant,
          Content = response.Content.Select(block => new BetaContentBlockParam(block.Json)).ToList(),
      });
      Console.WriteLine(response.InputTransformations?.Count ?? 0);
  }
  ```

  ```go Go
  client := anthropic.NewClient()

  // messages grows across turns: each assistant turn goes back exactly as returned
  messages := []anthropic.BetaMessageParam{}
  for _, userTurn := range []string{"What is 27 * 453?", "Now divide that result by 3."} {
  	messages = append(messages, anthropic.NewBetaUserMessage(anthropic.NewBetaTextBlock(userTurn)))
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
  		Messages: messages,
  		Betas:    []anthropic.AnthropicBeta{anthropic.AnthropicBetaThinkingBindingControls2026_08_01},
  	})
  	if err != nil {
  		log.Fatal(err)
  	}
  	messages = append(messages, response.ToParam())
  	fmt.Println(len(response.InputTransformations))
  }
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

      // The builder's message list grows across turns: each assistant turn goes back exactly as returned
      MessageCreateParams.Builder conversation = MessageCreateParams.builder()
          .model("claude-fable-5-1")
          .maxTokens(16000L)
          .thinking(BetaThinkingConfigAdaptive.builder()
              .blockBinding(BetaThinkingBlockBinding.builder()
                  .prefixMismatchBehavior(BetaThinkingPrefixMismatchBehavior.DROP_BLOCK)
                  .build())
              .build())
          .addBeta(AnthropicBeta.THINKING_BINDING_CONTROLS_2026_08_01);

      for (String userTurn : List.of("What is 27 * 453?", "Now divide that result by 3.")) {
          conversation.addUserMessage(userTurn);
          BetaMessage response = client.beta().messages().create(conversation.build());
          conversation.addMessage(response);
          IO.println(response.inputTransformations().map(List::size).orElse(0));
      }
  }
  ```

  ```php PHP
  use Anthropic\Beta\AnthropicBeta;
  use Anthropic\Beta\Messages\BetaThinkingBlockBinding;
  use Anthropic\Beta\Messages\BetaThinkingConfigAdaptive;
  use Anthropic\Beta\Messages\BetaThinkingPrefixMismatchBehavior;
  use Anthropic\Client;

  $client = new Client();

  // $messages grows across turns: each assistant turn goes back exactly as returned
  $messages = [];
  foreach (['What is 27 * 453?', 'Now divide that result by 3.'] as $userTurn) {
      $messages[] = ['role' => 'user', 'content' => $userTurn];
      $response = $client->beta->messages->create(
          model: 'claude-fable-5-1',
          maxTokens: 16000,
          thinking: BetaThinkingConfigAdaptive::with(
              blockBinding: BetaThinkingBlockBinding::with(
                  prefixMismatchBehavior: BetaThinkingPrefixMismatchBehavior::DROP_BLOCK,
              ),
          ),
          messages: $messages,
          betas: [AnthropicBeta::THINKING_BINDING_CONTROLS_2026_08_01],
      );
      $messages[] = ['role' => 'assistant', 'content' => $response->content];
      echo count($response->inputTransformations ?? []), PHP_EOL;
  }
  ```

  ```ruby Ruby
  client = Anthropic::Client.new

  # messages grows across turns: each assistant turn goes back exactly as returned
  messages = []
  ["What is 27 * 453?", "Now divide that result by 3."].each do |user_turn|
    messages << {role: "user", content: user_turn}
    response = client.beta.messages.create(
      model: "claude-fable-5-1",
      max_tokens: 16_000,
      thinking: {
        type: "adaptive",
        block_binding: {prefix_mismatch_behavior: "drop_block"}
      },
      messages: messages,
      betas: [Anthropic::AnthropicBeta::THINKING_BINDING_CONTROLS_2026_08_01]
    )
    messages << {role: "assistant", content: response.content}
    puts (response.input_transformations || []).length
  end
  ```

```text Output wrap
0
0
```

Both turns print `0` because nothing earlier changed. Log `input_transformations` on every turn of your own integration. When the API drops a block, the entry looks like the following:

```json
{
  "input_transformations": [
    {
      "type": "thinking_dropped",
      "path": "messages.1.content.0",
      "reason": "prefix_binding_mismatch"
    }
  ]
}
```

* **Empty on every turn:** your integration keeps the prefix intact.
* **`reason: "prefix_binding_mismatch"`:** something before the block at `path` changed since the previous request. Diff `system`, `tools`, and `messages` up to that turn to find it, then find the matching replacement in [Make changes without editing the prefix](https://platform.claude.com/docs/en/build-with-claude/preserved-thinking#replace-prefix-edits).
* **`reason: "model_binding_mismatch"`:** the conversation moved to a model that can't read the earlier model's blocks. This isn't a prefix edit. See [Switching models mid-conversation](https://platform.claude.com/docs/en/build-with-claude/preserved-thinking#switching-models).

To fail loudly in CI instead, set `"error"` and treat the 400 described in [What the API does with an invalid block](https://platform.claude.com/docs/en/build-with-claude/preserved-thinking#mismatch-behavior) as a test failure.
