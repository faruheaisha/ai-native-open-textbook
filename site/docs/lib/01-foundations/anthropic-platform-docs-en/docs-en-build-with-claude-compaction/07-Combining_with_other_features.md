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
pageSha256: "f5a076d2663173c4ce1fa93ad2b7034614d7cfb779b3a459543fb3d1686601ca"
contentMode: "local-full"
zh: ""
---

## Combining with other features

### Server tools

When using server tools (such as web search), the compaction trigger is checked at the start of each sampling iteration. Compaction might occur multiple times within a single request depending on your trigger threshold and the amount of output generated.

### Token counting

The token counting endpoint (`/v1/messages/count_tokens`) applies existing `compaction` blocks in your prompt but does not trigger new compactions. Use it to check your effective token count after previous compactions:

  ```bash cURL
  curl https://api.anthropic.com/v1/messages/count_tokens \
    -H "x-api-key: $ANTHROPIC_API_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -H "anthropic-beta: compact-2026-01-12" \
    -H "content-type: application/json" \
    -d '{
      "model": "claude-opus-5",
      "messages": [
        {
          "role": "user",
          "content": "Hello, Claude"
        }
      ],
      "context_management": {
        "edits": [
          {
            "type": "compact_20260112"
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
      content: Hello, Claude
  context_management:
    edits:
      - type: compact_20260112
  YAML

  CURRENT=$(ant beta:messages count-tokens \
    --beta compact-2026-01-12 \
    --transform input_tokens \
    --raw-output < request.yaml)

  ORIGINAL=$(ant beta:messages count-tokens \
    --beta compact-2026-01-12 \
    --transform context_management.original_input_tokens \
    --raw-output < request.yaml)

  printf 'Current tokens: %s\n' "$CURRENT"
  printf 'Original tokens: %s\n' "$ORIGINAL"
  ```

  ```python Python
  client = anthropic.Anthropic()
  messages = [{"role": "user", "content": "Hello, Claude"}]
  count_response = client.beta.messages.count_tokens(
      betas=["compact-2026-01-12"],
      model="claude-opus-5",
      messages=messages,
      context_management={"edits": [{"type": "compact_20260112"}]},
  )

  print(f"Current tokens: {count_response.input_tokens}")
  print(f"Original tokens: {count_response.context_management.original_input_tokens}")
  ```

  ```typescript TypeScript
  const client = new Anthropic();
  const messages: Anthropic.Beta.Messages.BetaMessageParam[] = [
    { role: "user", content: "Summarize the key points of our conversation so far." }
  ];

  const countResponse = await client.beta.messages.countTokens({
    betas: ["compact-2026-01-12"],
    model: "claude-opus-5",
    messages,
    context_management: {
      edits: [{ type: "compact_20260112" }]
    }
  });

  console.log(`Current tokens: ${countResponse.input_tokens}`);
  console.log(`Original tokens: ${countResponse.context_management!.original_input_tokens}`);
  ```

  ```csharp C#
  AnthropicClient client = new();
  List<BetaMessageParam> messages = [new() { Role = Role.User, Content = "Hello" }];

  var countParams = new MessageCountTokensParams
  {
      Model = "claude-opus-5",
      Messages = messages,
      ContextManagement = new BetaContextManagementConfig
      {
          Edits = [new BetaCompact20260112Edit()]
      },
      Betas = ["compact-2026-01-12"]
  };

  var countResponse = await client.Beta.Messages.CountTokens(countParams);
  Console.WriteLine($"Current tokens: {countResponse.InputTokens}");
  Console.WriteLine($"Original tokens: {countResponse.ContextManagement?.OriginalInputTokens}");
  ```

  ```go Go
  client := anthropic.NewClient()
  messages := []anthropic.BetaMessageParam{anthropic.NewBetaUserMessage(anthropic.NewBetaTextBlock("Hello, Claude"))}

  countResponse, err := client.Beta.Messages.CountTokens(context.TODO(), anthropic.BetaMessageCountTokensParams{
  	Model:    anthropic.ModelClaudeOpus5,
  	Messages: messages,
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

  fmt.Printf("Current tokens: %d\n", countResponse.InputTokens)
  fmt.Printf("Original tokens: %d\n", countResponse.ContextManagement.OriginalInputTokens)
  ```

  ```java Java
  import com.anthropic.models.beta.messages.BetaMessageTokensCount;
  import com.anthropic.models.beta.messages.MessageCountTokensParams;
  import com.anthropic.models.beta.messages.BetaContextManagementConfig;
  import com.anthropic.models.beta.messages.BetaCompact20260112Edit;
  // ...
          AnthropicClient client = AnthropicOkHttpClient.fromEnv();

          MessageCountTokensParams params = MessageCountTokensParams.builder()
              .model("claude-opus-5")
              .addUserMessage("Hello, Claude")
              .contextManagement(BetaContextManagementConfig.builder()
                  .addEdit(BetaCompact20260112Edit.builder().build())
                  .build())
              .addBeta("compact-2026-01-12")
              .build();

          BetaMessageTokensCount countResponse = client.beta().messages().countTokens(params);
          System.out.println("Current tokens: " + countResponse.inputTokens());
          System.out.println("Original tokens: " + countResponse.contextManagement().get().originalInputTokens());
  ```

  ```php PHP
  $client = new Client();
  $messages = [['role' => 'user', 'content' => 'Hello, Claude']];

  $countResponse = $client->beta->messages->countTokens(
      messages: $messages,
      model: 'claude-opus-5',
      betas: ['compact-2026-01-12'],
      contextManagement: [
          'edits' => [
              ['type' => 'compact_20260112']
          ]
      ]
  );

  echo "Current tokens: " . $countResponse->inputTokens . "\n";
  echo "Original tokens: " . $countResponse->contextManagement->originalInputTokens . "\n";
  ```

  ```ruby Ruby
  client = Anthropic::Client.new
  messages = [{ role: "user", content: "Hello, Claude" }]

  count_response = client.beta.messages.count_tokens(
    betas: ["compact-2026-01-12"],
    model: "claude-opus-5",
    messages: messages,
    context_management: {
      edits: [{ type: "compact_20260112" }]
    }
  )

  puts "Current tokens: #{count_response.input_tokens}"
  puts "Original tokens: #{count_response.context_management.original_input_tokens}"
  ```
