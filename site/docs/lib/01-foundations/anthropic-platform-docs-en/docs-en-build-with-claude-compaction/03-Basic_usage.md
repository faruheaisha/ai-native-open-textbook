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
pageSha256: "7b23866606a1fd8ac596f4e623735b3325a597fdc9d4c491f1f3fabca661a24b"
contentMode: "local-full"
zh: ""
---

## Basic usage

Enable compaction by adding the `compact_20260112` strategy to `context_management.edits` in your Messages API request.

  ```bash cURL
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
          "content": "Help me build a website"
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
  ant beta:messages create --beta compact-2026-01-12 <<'YAML'
  model: claude-opus-5
  max_tokens: 4096
  messages:
    - role: user
      content: Help me build a website
  context_management:
    edits:
      - type: compact_20260112
  YAML
  ```

  ```python Python
  client = anthropic.Anthropic()

  messages = [{"role": "user", "content": "Help me build a website"}]

  response = client.beta.messages.create(
      betas=["compact-2026-01-12"],
      model="claude-opus-5",
      max_tokens=4096,
      messages=messages,
      context_management={"edits": [{"type": "compact_20260112"}]},
  )

  # Append the response (including any compaction block) to continue the conversation
  messages.append({"role": "assistant", "content": response.content})
  ```

  ```typescript TypeScript
  const client = new Anthropic();

  const messages: Anthropic.Beta.Messages.BetaMessageParam[] = [
    { role: "user", content: "Help me build a website" }
  ];

  const response = await client.beta.messages.create({
    betas: ["compact-2026-01-12"],
    model: "claude-opus-5",
    max_tokens: 4096,
    messages,
    context_management: {
      edits: [
        {
          type: "compact_20260112"
        }
      ]
    }
  });

  // Append the response (including any compaction block) to continue the conversation
  messages.push({
    role: "assistant",
    content: response.content
  });
  ```

  ```csharp C#
  AnthropicClient client = new();

  var messages = new List<BetaMessageParam>
  {
      new() { Role = Role.User, Content = "Help me build a website" }
  };

  var parameters = new MessageCreateParams
  {
      Betas = ["compact-2026-01-12"],
      Model = "claude-opus-5",
      MaxTokens = 4096,
      Messages = messages,
      ContextManagement = new BetaContextManagementConfig
      {
          Edits = [new BetaCompact20260112Edit()]
      }
  };

  var response = await client.Beta.Messages.Create(parameters);

  // Append the response (including any compaction block) to continue the conversation
  messages.Add(new BetaMessageParam
  {
      Role = Role.Assistant,
      Content = response.Content.Select(block => new BetaContentBlockParam(block.Json)).ToList()
  });

  Console.WriteLine(response);
  ```

  ```go Go
  client := anthropic.NewClient()

  messages := []anthropic.BetaMessageParam{
  	anthropic.NewBetaUserMessage(anthropic.NewBetaTextBlock("Help me build a website")),
  }

  response, err := client.Beta.Messages.New(context.TODO(), anthropic.BetaMessageNewParams{
  	Model:     anthropic.ModelClaudeOpus5,
  	MaxTokens: 4096,
  	Messages:  messages,
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

  // Append the response (including any compaction block) to continue the conversation
  messages = append(messages, response.ToParam())

  fmt.Println(response)
  ```

  ```java Java
  import com.anthropic.models.beta.messages.BetaContextManagementConfig;
  import com.anthropic.models.beta.messages.BetaCompact20260112Edit;
  // ...
          AnthropicClient client = AnthropicOkHttpClient.fromEnv();

          MessageCreateParams params = MessageCreateParams.builder()
              .addBeta("compact-2026-01-12")
              .model("claude-opus-5")
              .maxTokens(4096L)
              .addUserMessage("Help me build a website")
              .contextManagement(BetaContextManagementConfig.builder()
                  .addEdit(BetaCompact20260112Edit.builder().build())
                  .build())
              .build();

          BetaMessage response = client.beta().messages().create(params);

          // Append the response (including any compaction block) to continue the conversation
          // by including it in the next request's messages
          System.out.println(response);
  ```

  ```php PHP
  $client = new Client();

  $messages = [
      ['role' => 'user', 'content' => 'Help me build a website']
  ];

  $response = $client->beta->messages->create(
      maxTokens: 4096,
      messages: $messages,
      model: 'claude-opus-5',
      betas: ['compact-2026-01-12'],
      contextManagement: [
          'edits' => [
              ['type' => 'compact_20260112']
          ]
      ]
  );

  // Append the response (including any compaction block) to continue the conversation
  $messages[] = ['role' => 'assistant', 'content' => $response->content];

  echo json_encode($response, JSON_PRETTY_PRINT), PHP_EOL;
  ```

  ```ruby Ruby
  client = Anthropic::Client.new

  messages = [
    { role: "user", content: "Help me build a website" }
  ]

  response = client.beta.messages.create(
    betas: ["compact-2026-01-12"],
    model: "claude-opus-5",
    max_tokens: 4096,
    messages: messages,
    context_management: {
      edits: [{ type: "compact_20260112" }]
    }
  )

  # Append the response (including any compaction block) to continue the conversation
  messages << { role: "assistant", content: response.content }

  puts response
  ```
