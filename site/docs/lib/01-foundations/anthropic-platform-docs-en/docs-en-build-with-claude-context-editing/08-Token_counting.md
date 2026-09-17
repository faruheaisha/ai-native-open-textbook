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
sourceRel: "docs/en/build-with-claude/context-editing.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/build-with-claude/context-editing.md"
sourceSha256: "69cc82d4054f45a2f7ea239a67c946153f54af5b92acae1915b2166281ec6469"
pageSha256: "9fea10d638b79054fd9b486d6c6174e8958b962049338d379a8164e0c9288a9c"
contentMode: "local-full"
zh: ""
---

## Token counting

The [token counting](https://platform.claude.com/docs/en/build-with-claude/token-counting) endpoint supports context management, allowing you to preview how many tokens your prompt will use after context editing is applied.

  ```bash cURL
  curl https://api.anthropic.com/v1/messages/count_tokens \
      --header "x-api-key: $ANTHROPIC_API_KEY" \
      --header "anthropic-version: 2023-06-01" \
      --header "content-type: application/json" \
      --header "anthropic-beta: context-management-2025-06-27" \
      --data '{
          "model": "claude-opus-5",
          "messages": [
              {
                  "role": "user",
                  "content": "Continue our conversation..."
              }
          ],
          "context_management": {
              "edits": [
                  {
                      "type": "clear_tool_uses_20250919",
                      "trigger": {
                          "type": "input_tokens",
                          "value": 30000
                      },
                      "keep": {
                          "type": "tool_uses",
                          "value": 5
                      }
                  }
              ]
          }
      }'
  ```

  ```bash CLI
  cat > request.yaml <<'YAML'
  model: claude-opus-5
  messages:
    - role: user
      content: Continue our conversation...
  context_management:
    edits:
      - type: clear_tool_uses_20250919
        trigger:
          type: input_tokens
          value: 30000
        keep:
          type: tool_uses
          value: 5
  YAML

  ORIGINAL=$(ant beta:messages count-tokens \
    --beta context-management-2025-06-27 \
    --transform context_management.original_input_tokens \
    --raw-output < request.yaml)

  INPUT_TOKENS=$(ant beta:messages count-tokens \
    --beta context-management-2025-06-27 \
    --transform input_tokens --raw-output < request.yaml)

  printf 'Original tokens: %s\n' "$ORIGINAL"
  printf 'After clearing: %s\n' "$INPUT_TOKENS"
  printf 'Savings: %s tokens\n' "$((ORIGINAL - INPUT_TOKENS))"
  ```

  ```python Python
  response = client.beta.messages.count_tokens(
      model="claude-opus-5",
      messages=[{"role": "user", "content": "Continue our conversation..."}],
      betas=["context-management-2025-06-27"],
      context_management={
          "edits": [
              {
                  "type": "clear_tool_uses_20250919",
                  "trigger": {"type": "input_tokens", "value": 30000},
                  "keep": {"type": "tool_uses", "value": 5},
              }
          ]
      },
  )

  print(f"Original tokens: {response.context_management.original_input_tokens}")
  print(f"After clearing: {response.input_tokens}")
  print(
      f"Savings: {response.context_management.original_input_tokens - response.input_tokens} tokens"
  )
  ```

  ```typescript TypeScript
  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY
  });

  const response = await anthropic.beta.messages.countTokens({
    model: "claude-opus-5",
    messages: [
      {
        role: "user",
        content: "Continue our conversation..."
      }
    ],
    betas: ["context-management-2025-06-27"],
    context_management: {
      edits: [
        {
          type: "clear_tool_uses_20250919",
          trigger: {
            type: "input_tokens",
            value: 30000
          },
          keep: {
            type: "tool_uses",
            value: 5
          }
        }
      ]
    }
  });

  console.log(`Original tokens: ${response.context_management?.original_input_tokens}`);
  console.log(`After clearing: ${response.input_tokens}`);
  console.log(
    `Savings: ${
      (response.context_management?.original_input_tokens || 0) - response.input_tokens
    } tokens`
  );
  ```

  ```csharp C#
  using Anthropic;
  using Anthropic.Models.Beta;
  using Anthropic.Models.Beta.Messages;
  using Messages = Anthropic.Models.Messages;

  AnthropicClient client = new();

  var parameters = new MessageCountTokensParams
  {
      Model = Messages::Model.ClaudeOpus5,
      Messages = [new() { Role = Role.User, Content = "Continue our conversation..." }],
      Betas = [AnthropicBeta.ContextManagement2025_06_27],
      ContextManagement = new BetaContextManagementConfig
      {
          Edits = [
              new BetaClearToolUses20250919Edit
              {
                  Trigger = new BetaInputTokensTrigger(30000),
                  Keep = new BetaToolUsesKeep(5)
              }
          ]
      }
  };

  var response = await client.Beta.Messages.CountTokens(parameters);

  Console.WriteLine($"Original tokens: {response.ContextManagement?.OriginalInputTokens}");
  Console.WriteLine($"After clearing: {response.InputTokens}");
  Console.WriteLine($"Savings: {(response.ContextManagement?.OriginalInputTokens ?? 0) - response.InputTokens} tokens");
  ```

  ```go Go
  client := anthropic.NewClient()

  response, err := client.Beta.Messages.CountTokens(context.TODO(), anthropic.BetaMessageCountTokensParams{
  	Model: anthropic.ModelClaudeOpus5,
  	Messages: []anthropic.BetaMessageParam{
  		anthropic.NewBetaUserMessage(anthropic.NewBetaTextBlock("Continue our conversation...")),
  	},
  	Betas: []anthropic.AnthropicBeta{
  		anthropic.AnthropicBetaContextManagement2025_06_27,
  	},
  	ContextManagement: anthropic.BetaContextManagementConfigParam{
  		Edits: []anthropic.BetaContextManagementConfigEditUnionParam{
  			{OfClearToolUses20250919: &anthropic.BetaClearToolUses20250919EditParam{
  				Trigger: anthropic.BetaClearToolUses20250919EditTriggerUnionParam{
  					OfInputTokens: &anthropic.BetaInputTokensTriggerParam{
  						Value: 30000,
  					},
  				},
  				Keep: anthropic.BetaToolUsesKeepParam{
  					Value: 5,
  				},
  			}},
  		},
  	},
  })
  if err != nil {
  	log.Fatal(err)
  }

  fmt.Printf("Original tokens: %d\n", response.ContextManagement.OriginalInputTokens)
  fmt.Printf("After clearing: %d\n", response.InputTokens)
  fmt.Printf("Savings: %d tokens\n", response.ContextManagement.OriginalInputTokens-response.InputTokens)
  ```

  ```java Java
  import com.anthropic.models.beta.messages.BetaMessageTokensCount;
  import com.anthropic.models.beta.messages.MessageCountTokensParams;
  import com.anthropic.models.beta.messages.BetaContextManagementConfig;
  import com.anthropic.models.beta.messages.BetaClearToolUses20250919Edit;
  import com.anthropic.models.beta.messages.BetaInputTokensTrigger;
  import com.anthropic.models.beta.messages.BetaToolUsesKeep;
  import com.anthropic.models.beta.AnthropicBeta;
  // ...
  void main() {
      AnthropicClient client = AnthropicOkHttpClient.fromEnv();

      MessageCountTokensParams params = MessageCountTokensParams.builder()
          .model(Model.CLAUDE_OPUS_5)
          .addUserMessage("Continue our conversation...")
          .addBeta(AnthropicBeta.CONTEXT_MANAGEMENT_2025_06_27)
          .contextManagement(BetaContextManagementConfig.builder()
              .addEdit(BetaClearToolUses20250919Edit.builder()
                  .trigger(BetaInputTokensTrigger.builder()
                      .value(30000L)
                      .build())
                  .keep(BetaToolUsesKeep.builder()
                      .value(5L)
                      .build())
                  .build())
              .build())
          .build();

      BetaMessageTokensCount response = client.beta().messages().countTokens(params);

      IO.println("Original tokens: " + response.contextManagement().get().originalInputTokens());
      IO.println("After clearing: " + response.inputTokens());
      IO.println("Savings: " + (response.contextManagement().get().originalInputTokens() - response.inputTokens()) + " tokens");
  }
  ```

  ```php PHP
  $client = new Client();

  $response = $client->beta->messages->countTokens(
      messages: [
          ['role' => 'user', 'content' => 'Continue our conversation...']
      ],
      model: 'claude-opus-5',
      betas: ['context-management-2025-06-27'],
      contextManagement: [
          'edits' => [
              [
                  'type' => 'clear_tool_uses_20250919',
                  'trigger' => [
                      'type' => 'input_tokens',
                      'value' => 30000
                  ],
                  'keep' => [
                      'type' => 'tool_uses',
                      'value' => 5
                  ]
              ]
          ]
      ],
  );

  echo "Original tokens: " . $response->contextManagement->originalInputTokens . "\n";
  echo "After clearing: " . $response->inputTokens . "\n";
  echo "Savings: " . ($response->contextManagement->originalInputTokens - $response->inputTokens) . " tokens\n";
  ```

  ```ruby Ruby
  client = Anthropic::Client.new

  response = client.beta.messages.count_tokens(
    model: "claude-opus-5",
    messages: [
      { role: "user", content: "Continue our conversation..." }
    ],
    betas: ["context-management-2025-06-27"],
    context_management: {
      edits: [
        {
          type: "clear_tool_uses_20250919",
          trigger: {
            type: "input_tokens",
            value: 30000
          },
          keep: {
            type: "tool_uses",
            value: 5
          }
        }
      ]
    }
  )

  puts "Original tokens: #{response.context_management.original_input_tokens}"
  puts "After clearing: #{response.input_tokens}"
  puts "Savings: #{response.context_management.original_input_tokens - response.input_tokens} tokens"
  ```

```json Output
{
  "input_tokens": 25000,
  "context_management": {
    "original_input_tokens": 70000
  }
}
```

The response shows both the final token count after context management is applied (`input_tokens`) and the original token count before any clearing occurred (`original_input_tokens`).
