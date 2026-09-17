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
sourceRel: "docs/en/build-with-claude/compaction.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/build-with-claude/compaction.md"
sourceSha256: "ef6ae7f3db36c52dbf64d94eb4e299753f9fbfa31984a8699ff31a69f9de801b"
pageSha256: "435e569c3f2f2c365d2f3b1e5c1c556a3793bdc633c7f9bef30f12175f56ab33"
contentMode: "local-full"
zh: ""
---

## Examples

Here's a complete example of a long-running conversation with compaction:

  ```bash cURL
  # curl sends individual requests; maintain the messages array in the
  # calling script. See the SDK tabs for the full chat() loop. Single-turn
  # request shape:
  curl https://api.anthropic.com/v1/messages \
    -H "x-api-key: $ANTHROPIC_API_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -H "anthropic-beta: compact-2026-01-12" \
    -H "content-type: application/json" \
    -d '{
      "model": "claude-opus-5",
      "max_tokens": 4096,
      "messages": [
        {
          "role": "user",
          "content": "Help me build a Python web scraper"
        }
      ],
      "context_management": {
        "edits": [
          {
            "type": "compact_20260112",
            "trigger": {
              "type": "input_tokens",
              "value": 100000
            }
          }
        ]
      }
    }'
  ```

  ```bash CLI
  # The CLI handles individual turns; maintain the messages array in the
  # calling script. See the SDK tabs for the full chat() loop. Single-turn
  # request shape:
  ant beta:messages create \
    --beta compact-2026-01-12 \
    --transform 'content.#(type=="text").text' \
    --raw-output <<'YAML'
  model: claude-opus-5
  max_tokens: 4096
  messages:
    - role: user
      content: Help me build a Python web scraper
  context_management:
    edits:
      - type: compact_20260112
        trigger:
          type: input_tokens
          value: 100000
  YAML
  ```

  ```python Python
  client = anthropic.Anthropic()

  messages: list[dict] = []

  def chat(user_message: str) -> str:
      messages.append({"role": "user", "content": user_message})

      response = client.beta.messages.create(
          betas=["compact-2026-01-12"],
          model="claude-opus-5",
          max_tokens=4096,
          messages=messages,
          context_management={
              "edits": [
                  {
                      "type": "compact_20260112",
                      "trigger": {"type": "input_tokens", "value": 100000},
                  }
              ]
          },
      )

      # Append response (compaction blocks are automatically included)
      messages.append({"role": "assistant", "content": response.content})

      # Return the text content
      return next(block.text for block in response.content if block.type == "text")

  # Run a long conversation
  print(chat("Help me build a Python web scraper"))
  print(chat("Add support for JavaScript-rendered pages"))
  print(chat("Now add rate limiting and error handling"))
  # Continue calling chat() for as long as the conversation needs
  ```

  ```typescript TypeScript
  const client = new Anthropic();

  const messages: Anthropic.Beta.Messages.BetaMessageParam[] = [];

  async function chat(userMessage: string): Promise<string> {
    messages.push({ role: "user", content: userMessage });

    const response = await client.beta.messages.create({
      betas: ["compact-2026-01-12"],
      model: "claude-opus-5",
      max_tokens: 4096,
      messages,
      context_management: {
        edits: [
          {
            type: "compact_20260112",
            trigger: { type: "input_tokens", value: 100000 }
          }
        ]
      }
    });

    // Append response (compaction blocks are automatically included)
    messages.push({ role: "assistant", content: response.content });

    // Return the text content
    const textBlock = response.content.find((block) => block.type === "text");
    return textBlock?.text ?? "";
  }

  // Run a long conversation
  console.log(await chat("Help me build a Python web scraper"));
  console.log(await chat("Add support for JavaScript-rendered pages"));
  console.log(await chat("Now add rate limiting and error handling"));
  // Continue calling chat() for as long as the conversation needs
  ```

  ```csharp C#
  AnthropicClient client = new();
  List<BetaMessageParam> messages = new();

  Console.WriteLine(await Chat(client, messages, "Help me build a Python web scraper"));
  Console.WriteLine(await Chat(client, messages, "Add support for JavaScript-rendered pages"));
  Console.WriteLine(await Chat(client, messages, "Now add rate limiting and error handling"));

  static async Task<string> Chat(AnthropicClient client, List<BetaMessageParam> messages, string userMessage)
  {
      messages.Add(new() { Role = Role.User, Content = userMessage });

      var parameters = new MessageCreateParams
      {
          Betas = ["compact-2026-01-12"],
          Model = "claude-opus-5",
          MaxTokens = 4096,
          Messages = messages,
          ContextManagement = new BetaContextManagementConfig
          {
              Edits = [new BetaCompact20260112Edit
              {
                  Trigger = new BetaInputTokensTrigger(100000)
              }]
          }
      };

      var response = await client.Beta.Messages.Create(parameters);

      messages.Add(new()
      {
          Role = Role.Assistant,
          Content = response.Content.Select(block => new BetaContentBlockParam(block.Json)).ToList()
      });

      return response.Content
          .Select(block => block.Value)
          .OfType<BetaTextBlock>()
          .Select(tb => tb.Text)
          .FirstOrDefault() ?? "";
  }
  ```

  ```go Go
  package main

  import (
  	"context"
  	"fmt"
  	"log"

  	"github.com/anthropics/anthropic-sdk-go"
  )

  var (
  	client   = anthropic.NewClient()
  	messages []anthropic.BetaMessageParam
  )

  func chat(userMessage string) string {
  	messages = append(messages, anthropic.NewBetaUserMessage(anthropic.NewBetaTextBlock(userMessage)))

  	response, err := client.Beta.Messages.New(context.TODO(), anthropic.BetaMessageNewParams{
  		Model:     anthropic.ModelClaudeOpus5,
  		MaxTokens: 4096,
  		Messages:  messages,
  		ContextManagement: anthropic.BetaContextManagementConfigParam{
  			Edits: []anthropic.BetaContextManagementConfigEditUnionParam{
  				{OfCompact20260112: &anthropic.BetaCompact20260112EditParam{
  					Trigger: anthropic.BetaInputTokensTriggerParam{Value: 100000},
  				}},
  			},
  		},
  		Betas: []anthropic.AnthropicBeta{"compact-2026-01-12"},
  	})
  	if err != nil {
  		log.Fatal(err)
  	}

  	messages = append(messages, response.ToParam())

  	for _, block := range response.Content {
  		if variant, ok := block.AsAny().(anthropic.BetaTextBlock); ok {
  			return variant.Text
  		}
  	}
  	return ""
  }

  func main() {
  	fmt.Println(chat("Help me build a Python web scraper"))
  	fmt.Println(chat("Add support for JavaScript-rendered pages"))
  	fmt.Println(chat("Now add rate limiting and error handling"))
  }
  ```

  ```java Java
  import com.anthropic.models.beta.messages.BetaContextManagementConfig;
  import com.anthropic.models.beta.messages.BetaCompact20260112Edit;
  import com.anthropic.models.beta.messages.BetaInputTokensTrigger;
  // ...
      private static final AnthropicClient client = AnthropicOkHttpClient.fromEnv();
      private static final List<BetaMessageParam> messages = new ArrayList<>();

      public static void main(String[] args) {
          System.out.println(chat("Help me build a Python web scraper"));
          System.out.println(chat("Add support for JavaScript-rendered pages"));
          System.out.println(chat("Now add rate limiting and error handling"));
      }

      private static String chat(String userMessage) {
          messages.add(BetaMessageParam.builder()
              .role(BetaMessageParam.Role.USER)
              .content(userMessage)
              .build());

          MessageCreateParams params = MessageCreateParams.builder()
              .addBeta("compact-2026-01-12")
              .model("claude-opus-5")
              .maxTokens(4096L)
              .messages(messages)
              .contextManagement(BetaContextManagementConfig.builder()
                  .addEdit(BetaCompact20260112Edit.builder()
                      .trigger(BetaInputTokensTrigger.builder()
                          .value(100000L)
                          .build())
                      .build())
                  .build())
              .build();

          BetaMessage response = client.beta().messages().create(params);

          // Append response (compaction blocks are automatically included)
          messages.add(response.toParam());

          return response.content().stream()
              .filter(block -> block.text().isPresent())
              .map(block -> block.text().get().text())
              .findFirst()
              .orElse("");
      }
  ```

  ```php PHP
  $client = new Client();
  $messages = [];

  function chat($client, &$messages, $userMessage) {
      $messages[] = ['role' => 'user', 'content' => $userMessage];

      $response = $client->beta->messages->create(
          maxTokens: 4096,
          messages: $messages,
          model: 'claude-opus-5',
          betas: ['compact-2026-01-12'],
          contextManagement: [
              'edits' => [
                  [
                      'type' => 'compact_20260112',
                      'trigger' => ['type' => 'input_tokens', 'value' => 100000]
                  ]
              ]
          ]
      );

      $messages[] = ['role' => 'assistant', 'content' => $response->content];

      foreach ($response->content as $block) {
          if ($block->type === 'text') {
              return $block->text;
          }
      }
      return '';
  }

  echo chat($client, $messages, "Help me build a Python web scraper") . "\n";
  echo chat($client, $messages, "Add support for JavaScript-rendered pages") . "\n";
  echo chat($client, $messages, "Now add rate limiting and error handling") . "\n";
  ```

  ```ruby Ruby
  client = Anthropic::Client.new
  messages = []

  def chat(client, messages, user_message)
    messages << { role: "user", content: user_message }

    response = client.beta.messages.create(
      betas: ["compact-2026-01-12"],
      model: "claude-opus-5",
      max_tokens: 4096,
      messages: messages,
      context_management: {
        edits: [
          {
            type: "compact_20260112",
            trigger: { type: "input_tokens", value: 100000 }
          }
        ]
      }
    )

    messages << { role: "assistant", content: response.content }

    response.content.find { |block| block.type == :text }&.text || ""
  end

  puts chat(client, messages, "Help me build a Python web scraper")
  puts chat(client, messages, "Add support for JavaScript-rendered pages")
  puts chat(client, messages, "Now add rate limiting and error handling")
  ```

On Claude Fable 5.1, remove the `thinking` and `redacted_thinking` blocks from any assistant turn you re-insert after the compaction block, or send `thinking.block_binding.prefix_mismatch_behavior: "drop_block"` with the `thinking-binding-controls-2026-08-01` [beta header](https://platform.claude.com/docs/en/api/beta-headers). Those blocks were produced when the full history was present, so they no longer pass the [conversation check](https://platform.claude.com/docs/en/build-with-claude/thinking#preserved-in-conversation). Where the check is enforced, the continuation request is rejected with a 400 error. The preserved text and tool blocks can stay as they are. Letting the API summarize everything, without re-inserting earlier turns, avoids this.

Here's an example that uses `pause_after_compaction` to preserve the prior exchange and the current user message (three messages total) verbatim instead of summarizing them:

  ```bash cURL
  # curl sends individual requests; maintain the messages array in the
  # calling script. See the SDK tabs for the full chat() loop with
  # pause-and-preserve handling. Single-turn request shape:
  curl https://api.anthropic.com/v1/messages \
    -H "x-api-key: $ANTHROPIC_API_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -H "anthropic-beta: compact-2026-01-12" \
    -H "content-type: application/json" \
    -d '{
      "model": "claude-opus-5",
      "max_tokens": 4096,
      "messages": [
        {
          "role": "user",
          "content": "Help me build a Python web scraper"
        }
      ],
      "context_management": {
        "edits": [
          {
            "type": "compact_20260112",
            "trigger": {
              "type": "input_tokens",
              "value": 100000
            },
            "pause_after_compaction": true
          }
        ]
      }
    }'
  ```

  ```bash CLI
  # The CLI handles individual turns; maintain the messages array in the
  # calling script. See the SDK tabs for the full chat() loop with
  # pause-and-preserve handling. Single-turn request shape:
  ant beta:messages create \
    --beta compact-2026-01-12 \
    --transform 'content.#(type=="text").text' \
    --raw-output <<'YAML'
  model: claude-opus-5
  max_tokens: 4096
  messages:
    - role: user
      content: Help me build a Python web scraper
  context_management:
    edits:
      - type: compact_20260112
        trigger:
          type: input_tokens
          value: 100000
        pause_after_compaction: true
  YAML
  ```

  ```python Python
  from typing import Any

  client = anthropic.Anthropic()

  messages: list[dict[str, Any]] = []

  def chat(user_message: str) -> str:
      messages.append({"role": "user", "content": user_message})

      response = client.beta.messages.create(
          betas=["compact-2026-01-12"],
          model="claude-opus-5",
          max_tokens=4096,
          messages=messages,
          context_management={
              "edits": [
                  {
                      "type": "compact_20260112",
                      "trigger": {"type": "input_tokens", "value": 100000},
                      "pause_after_compaction": True,
                  }
              ]
          },
      )

      # Check if compaction occurred and paused
      if response.stop_reason == "compaction":
          # Get the compaction block from the response
          compaction_block = response.content[0]

          # Preserve the prior exchange + current user message (3 messages)
          # by including them after the compaction block
          preserved_messages = messages[-3:] if len(messages) >= 3 else messages

          # Build new message list: compaction + preserved messages
          new_assistant_content = [compaction_block]
          messages_after_compaction = [
              {"role": "assistant", "content": new_assistant_content}
          ] + preserved_messages

          # Continue the request with the compacted context + preserved messages
          response = client.beta.messages.create(
              betas=["compact-2026-01-12"],
              model="claude-opus-5",
              max_tokens=4096,
              messages=messages_after_compaction,
              context_management={"edits": [{"type": "compact_20260112"}]},
          )

          # Update the message list to reflect the compaction
          messages.clear()
          messages.extend(messages_after_compaction)

      # Append the final response
      messages.append({"role": "assistant", "content": response.content})

      # Return the text content
      return next(block.text for block in response.content if block.type == "text")

  # Run a long conversation
  print(chat("Help me build a Python web scraper"))
  print(chat("Add support for JavaScript-rendered pages"))
  print(chat("Now add rate limiting and error handling"))
  # Continue calling chat() for as long as the conversation needs
  ```

  ```typescript TypeScript
  const client = new Anthropic();

  let messages: Anthropic.Beta.Messages.BetaMessageParam[] = [];

  async function chat(userMessage: string): Promise<string> {
    messages.push({ role: "user", content: userMessage });

    let response = await client.beta.messages.create({
      betas: ["compact-2026-01-12"],
      model: "claude-opus-5",
      max_tokens: 4096,
      messages,
      context_management: {
        edits: [
          {
            type: "compact_20260112",
            trigger: { type: "input_tokens", value: 100000 },
            pause_after_compaction: true
          }
        ]
      }
    });

    // Check if compaction occurred and paused
    if (response.stop_reason === "compaction") {
      // Get the compaction block from the response
      const compactionBlock = response.content[0];

      // Preserve the prior exchange + current user message (3 messages)
      // by including them after the compaction block
      const preservedMessages = messages.length >= 3 ? messages.slice(-3) : [...messages];

      // Build new message list: compaction + preserved messages
      const messagesAfterCompaction: Anthropic.Beta.Messages.BetaMessageParam[] = [
        { role: "assistant", content: [compactionBlock] },
        ...preservedMessages
      ];

      // Continue the request with the compacted context + preserved messages
      response = await client.beta.messages.create({
        betas: ["compact-2026-01-12"],
        model: "claude-opus-5",
        max_tokens: 4096,
        messages: messagesAfterCompaction,
        context_management: {
          edits: [{ type: "compact_20260112" }]
        }
      });

      // Update the message list to reflect the compaction
      messages = messagesAfterCompaction;
    }

    // Append the final response
    messages.push({ role: "assistant", content: response.content });

    // Return the text content
    const textBlock = response.content.find((block) => block.type === "text");
    return textBlock?.text ?? "";
  }

  // Run a long conversation
  console.log(await chat("Help me build a Python web scraper"));
  console.log(await chat("Add support for JavaScript-rendered pages"));
  console.log(await chat("Now add rate limiting and error handling"));
  // Continue calling chat() for as long as the conversation needs
  ```

  ```csharp C#
  AnthropicClient client = new();
  List<BetaMessageParam> messages = new();

  Console.WriteLine(await Chat("Help me build a Python web scraper"));
  Console.WriteLine(await Chat("Add support for JavaScript-rendered pages"));
  Console.WriteLine(await Chat("Now add rate limiting and error handling"));

  async Task<string> Chat(string userMessage)
  {
      messages.Add(new() { Role = Role.User, Content = userMessage });

      var response = await client.Beta.Messages.Create(new()
      {
          Betas = ["compact-2026-01-12"],
          Model = "claude-opus-5",
          MaxTokens = 4096,
          Messages = messages,
          ContextManagement = new BetaContextManagementConfig
          {
              Edits = [new BetaCompact20260112Edit
              {
                  Trigger = new BetaInputTokensTrigger(100000),
                  PauseAfterCompaction = true
              }]
          }
      });

      if (response.StopReason == BetaStopReason.Compaction)
      {
          if (!response.Content[0].TryPickCompaction(out _))
              throw new InvalidOperationException("Expected compaction block");

          var preserved = messages.Count >= 3
              ? messages.Skip(messages.Count - 3).ToList()
              : new List<BetaMessageParam>(messages);

          var messagesAfterCompaction = new List<BetaMessageParam>
          {
              new()
              {
                  Role = Role.Assistant,
                  Content = new List<BetaContentBlockParam> { new BetaContentBlockParam(response.Content[0].Json) }
              }
          };
          messagesAfterCompaction.AddRange(preserved);

          response = await client.Beta.Messages.Create(new()
          {
              Betas = ["compact-2026-01-12"],
              Model = "claude-opus-5",
              MaxTokens = 4096,
              Messages = messagesAfterCompaction,
              ContextManagement = new BetaContextManagementConfig
              {
                  Edits = [new BetaCompact20260112Edit()]
              }
          });

          messages = messagesAfterCompaction;
      }

      messages.Add(new()
      {
          Role = Role.Assistant,
          Content = response.Content.Select(block => new BetaContentBlockParam(block.Json)).ToList()
      });

      return response.Content
          .Select(block => block.Value)
          .OfType<BetaTextBlock>()
          .Select(tb => tb.Text)
          .FirstOrDefault() ?? "";
  }
  ```

  ```go Go
  package main

  import (
  	"context"
  	"fmt"
  	"log"

  	"github.com/anthropics/anthropic-sdk-go"
  )

  var (
  	client   = anthropic.NewClient()
  	messages []anthropic.BetaMessageParam
  )

  func chat(userMessage string) string {
  	messages = append(messages, anthropic.NewBetaUserMessage(anthropic.NewBetaTextBlock(userMessage)))

  	compactEdit := anthropic.BetaContextManagementConfigParam{
  		Edits: []anthropic.BetaContextManagementConfigEditUnionParam{
  			{OfCompact20260112: &anthropic.BetaCompact20260112EditParam{
  				Trigger:              anthropic.BetaInputTokensTriggerParam{Value: 100000},
  				PauseAfterCompaction: anthropic.Bool(true),
  			}},
  		},
  	}

  	response, err := client.Beta.Messages.New(context.TODO(), anthropic.BetaMessageNewParams{
  		Model:             anthropic.ModelClaudeOpus5,
  		MaxTokens:         4096,
  		Messages:          messages,
  		ContextManagement: compactEdit,
  		Betas:             []anthropic.AnthropicBeta{"compact-2026-01-12"},
  	})
  	if err != nil {
  		log.Fatal(err)
  	}

  	if response.StopReason == "compaction" {
  		compactionParam := response.Content[0].ToParam()

  		var preserved []anthropic.BetaMessageParam
  		if len(messages) >= 3 {
  			preserved = messages[len(messages)-3:]
  		} else {
  			preserved = messages
  		}

  		messagesAfterCompaction := []anthropic.BetaMessageParam{
  			{Role: anthropic.BetaMessageParamRoleAssistant, Content: []anthropic.BetaContentBlockParamUnion{compactionParam}},
  		}
  		messagesAfterCompaction = append(messagesAfterCompaction, preserved...)

  		response, err = client.Beta.Messages.New(context.TODO(), anthropic.BetaMessageNewParams{
  			Model:     anthropic.ModelClaudeOpus5,
  			MaxTokens: 4096,
  			Messages:  messagesAfterCompaction,
  			ContextManagement: anthropic.BetaContextManagementConfigParam{
  				Edits: []anthropic.BetaContextManagementConfigEditUnionParam{
  					{OfCompact20260112: &anthropic.BetaCompact20260112EditParam{}},
  				},
  			},
  			Betas: []anthropic.AnthropicBeta{"compact-2026-01-12"},
  		})
  		if err != nil {
  			log.Fatal(err)
  		}

  		messages = messagesAfterCompaction
  	}

  	messages = append(messages, response.ToParam())

  	for _, block := range response.Content {
  		if textBlock, ok := block.AsAny().(anthropic.BetaTextBlock); ok {
  			return textBlock.Text
  		}
  	}
  	return ""
  }

  func main() {
  	fmt.Println(chat("Help me build a Python web scraper"))
  	fmt.Println(chat("Add support for JavaScript-rendered pages"))
  	fmt.Println(chat("Now add rate limiting and error handling"))
  }
  ```

  ```java Java
  import com.anthropic.models.beta.messages.BetaContextManagementConfig;
  import com.anthropic.models.beta.messages.BetaCompact20260112Edit;
  import com.anthropic.models.beta.messages.BetaInputTokensTrigger;
  import com.anthropic.models.beta.messages.BetaStopReason;
  // ...
      private static final AnthropicClient client = AnthropicOkHttpClient.fromEnv();
      private static final List<BetaMessageParam> messages = new ArrayList<>();

      public static String chat(String userMessage) {
          messages.add(BetaMessageParam.builder()
              .role(BetaMessageParam.Role.USER)
              .content(userMessage)
              .build());

          MessageCreateParams params = MessageCreateParams.builder()
              .addBeta("compact-2026-01-12")
              .model("claude-opus-5")
              .maxTokens(4096L)
              .messages(messages)
              .contextManagement(BetaContextManagementConfig.builder()
                  .addEdit(BetaCompact20260112Edit.builder()
                      .trigger(BetaInputTokensTrigger.builder()
                          .value(100000L)
                          .build())
                      .pauseAfterCompaction(true)
                      .build())
                  .build())
              .build();

          BetaMessage response = client.beta().messages().create(params);

          // Check if compaction occurred and paused
          if (response.stopReason().isPresent()
                  && response.stopReason().get().equals(BetaStopReason.COMPACTION)) {
              // Preserve the prior exchange + current user message (3 messages)
              List<BetaMessageParam> preservedMessages = messages.size() >= 3
                  ? new ArrayList<>(messages.subList(messages.size() - 3, messages.size()))
                  : new ArrayList<>(messages);

              // Build new message list: compaction + preserved messages
              List<BetaMessageParam> messagesAfterCompaction = new ArrayList<>();
              messagesAfterCompaction.add(response.toParam());
              messagesAfterCompaction.addAll(preservedMessages);

              // Continue the request with the compacted context + preserved messages
              MessageCreateParams continueParams = MessageCreateParams.builder()
                  .addBeta("compact-2026-01-12")
                  .model("claude-opus-5")
                  .maxTokens(4096L)
                  .messages(messagesAfterCompaction)
                  .contextManagement(BetaContextManagementConfig.builder()
                      .addEdit(BetaCompact20260112Edit.builder().build())
                      .build())
                  .build();

              response = client.beta().messages().create(continueParams);

              // Update the message list to reflect the compaction
              messages.clear();
              messages.addAll(messagesAfterCompaction);
          }

          // Append the final response
          messages.add(response.toParam());

          return response.content().stream()
              .filter(block -> block.text().isPresent())
              .map(block -> block.text().get().text())
              .findFirst()
              .orElse("");
      }

      public static void main(String[] args) {
          System.out.println(chat("Help me build a Python web scraper"));
          System.out.println(chat("Add support for JavaScript-rendered pages"));
          System.out.println(chat("Now add rate limiting and error handling"));
      }
  ```

  ```php PHP
  $client = new Client();
  $messages = [];

  function chat($client, &$messages, $userMessage) {
      $messages[] = ['role' => 'user', 'content' => $userMessage];

      $response = $client->beta->messages->create(
          maxTokens: 4096,
          messages: $messages,
          model: 'claude-opus-5',
          betas: ['compact-2026-01-12'],
          contextManagement: [
              'edits' => [
                  [
                      'type' => 'compact_20260112',
                      'trigger' => ['type' => 'input_tokens', 'value' => 100000],
                      'pause_after_compaction' => true
                  ]
              ]
          ]
      );

      if ($response->stopReason === 'compaction') {
          $compactionBlock = $response->content[0];

          $preserved = count($messages) >= 3
              ? array_slice($messages, -3)
              : $messages;

          $messagesAfterCompaction = array_merge(
              [['role' => 'assistant', 'content' => [$compactionBlock]]],
              $preserved
          );

          $response = $client->beta->messages->create(
              maxTokens: 4096,
              messages: $messagesAfterCompaction,
              model: 'claude-opus-5',
              betas: ['compact-2026-01-12'],
              contextManagement: [
                  'edits' => [['type' => 'compact_20260112']]
              ]
          );

          $messages = $messagesAfterCompaction;
      }

      $messages[] = ['role' => 'assistant', 'content' => $response->content];

      foreach ($response->content as $block) {
          if ($block->type === 'text') {
              return $block->text;
          }
      }
      return '';
  }

  echo chat($client, $messages, "Help me build a Python web scraper") . "\n";
  echo chat($client, $messages, "Add support for JavaScript-rendered pages") . "\n";
  echo chat($client, $messages, "Now add rate limiting and error handling") . "\n";
  ```

  ```ruby Ruby
  client = Anthropic::Client.new
  messages = []

  def chat(client, messages, user_message)
    messages << { role: "user", content: user_message }

    response = client.beta.messages.create(
      betas: ["compact-2026-01-12"],
      model: "claude-opus-5",
      max_tokens: 4096,
      messages: messages,
      context_management: {
        edits: [
          {
            type: "compact_20260112",
            trigger: { type: "input_tokens", value: 100000 },
            pause_after_compaction: true
          }
        ]
      }
    )

    if response.stop_reason == :compaction
      compaction_block = response.content[0]

      preserved = messages.length >= 3 ? messages[-3..-1] : messages.dup

      messages_after_compaction = [
        { role: "assistant", content: [compaction_block] }
      ] + preserved

      response = client.beta.messages.create(
        betas: ["compact-2026-01-12"],
        model: "claude-opus-5",
        max_tokens: 4096,
        messages: messages_after_compaction,
        context_management: {
          edits: [{ type: "compact_20260112" }]
        }
      )

      messages.clear
      messages.concat(messages_after_compaction)
    end

    messages << { role: "assistant", content: response.content }

    response.content.find { |block| block.type == :text }&.text || ""
  end

  puts chat(client, messages, "Help me build a Python web scraper")
  puts chat(client, messages, "Add support for JavaScript-rendered pages")
  puts chat(client, messages, "Now add rate limiting and error handling")
  ```
