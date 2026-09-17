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
pageSha256: "e4fa08239761bbec87764d0a8438c91695022b31ca541be21acf2796281e58ba"
contentMode: "local-full"
zh: ""
---

## Thinking block clearing usage

Enable thinking block clearing to manage context and prompt caching effectively when extended thinking is enabled:

  ```bash cURL
  curl https://api.anthropic.com/v1/messages \
      --header "x-api-key: $ANTHROPIC_API_KEY" \
      --header "anthropic-version: 2023-06-01" \
      --header "content-type: application/json" \
      --header "anthropic-beta: context-management-2025-06-27" \
      --data '{
          "model": "claude-opus-5",
          "max_tokens": 16000,
          "messages": [{"role": "user", "content": "Hello"}],
          "context_management": {
              "edits": [
                  {
                      "type": "clear_thinking_20251015",
                      "keep": {
                          "type": "thinking_turns",
                          "value": 2
                      }
                  }
              ]
          }
      }'
  ```

  ```bash CLI
  ant beta:messages create --beta context-management-2025-06-27 <<'YAML'
  model: claude-opus-5
  max_tokens: 16000
  messages:
    - role: user
      content: Hello
  context_management:
    edits:
      - type: clear_thinking_20251015
        keep:
          type: thinking_turns
          value: 2
  YAML
  ```

  ```python Python
  response = client.beta.messages.create(
      model="claude-opus-5",
      max_tokens=16000,
      messages=[{"role": "user", "content": "Hello"}],
      betas=["context-management-2025-06-27"],
      context_management={
          "edits": [
              {
                  "type": "clear_thinking_20251015",
                  "keep": {"type": "thinking_turns", "value": 2},
              }
          ]
      },
  )
  ```

  ```typescript TypeScript
  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY
  });

  const response = await anthropic.beta.messages.create({
    model: "claude-opus-5",
    max_tokens: 16000,
    messages: [{ role: "user", content: "Hello" }],
    betas: ["context-management-2025-06-27"],
    context_management: {
      edits: [
        {
          type: "clear_thinking_20251015",
          keep: {
            type: "thinking_turns",
            value: 2
          }
        }
      ]
    }
  });
  ```

  ```csharp C#
  using Anthropic;
  using Anthropic.Models.Beta;
  using Anthropic.Models.Beta.Messages;
  using Messages = Anthropic.Models.Messages;

  AnthropicClient client = new();

  var parameters = new MessageCreateParams
  {
      Model = Messages::Model.ClaudeOpus5,
      MaxTokens = 16000,
      Messages = [
          new() { Role = Role.User, Content = "Hello" }
      ],
      Betas = [AnthropicBeta.ContextManagement2025_06_27],
      ContextManagement = new BetaContextManagementConfig
      {
          Edits = [
              new BetaClearThinking20251015Edit
              {
                  Keep = new BetaThinkingTurns(2)
              }
          ]
      }
  };

  var response = await client.Beta.Messages.Create(parameters);
  Console.WriteLine(response);
  ```

  ```go Go
  client := anthropic.NewClient()

  response, err := client.Beta.Messages.New(context.TODO(), anthropic.BetaMessageNewParams{
  	Model:     anthropic.ModelClaudeOpus5,
  	MaxTokens: 16000,
  	Messages: []anthropic.BetaMessageParam{
  		anthropic.NewBetaUserMessage(anthropic.NewBetaTextBlock("Hello")),
  	},
  	Betas: []anthropic.AnthropicBeta{anthropic.AnthropicBetaContextManagement2025_06_27},
  	ContextManagement: anthropic.BetaContextManagementConfigParam{
  		Edits: []anthropic.BetaContextManagementConfigEditUnionParam{
  			{OfClearThinking20251015: &anthropic.BetaClearThinking20251015EditParam{
  				Keep: anthropic.BetaClearThinking20251015EditKeepUnionParam{
  					OfThinkingTurns: &anthropic.BetaThinkingTurnsParam{
  						Value: 2,
  					},
  				},
  			}},
  		},
  	},
  })
  if err != nil {
  	log.Fatal(err)
  }
  fmt.Println(response)
  ```

  ```java Java
  import com.anthropic.models.beta.messages.BetaContextManagementConfig;
  import com.anthropic.models.beta.messages.BetaClearThinking20251015Edit;
  import com.anthropic.models.beta.messages.BetaThinkingTurns;
  import com.anthropic.models.beta.AnthropicBeta;
  // ...
  void main() {
      AnthropicClient client = AnthropicOkHttpClient.fromEnv();

      MessageCreateParams params = MessageCreateParams.builder()
          .model(Model.CLAUDE_OPUS_5)
          .maxTokens(16000L)
          .addUserMessage("Hello")
          .addBeta(AnthropicBeta.CONTEXT_MANAGEMENT_2025_06_27)
          .contextManagement(BetaContextManagementConfig.builder()
              .addEdit(BetaClearThinking20251015Edit.builder()
                  .keep(BetaThinkingTurns.builder()
                      .value(2L)
                      .build())
                  .build())
              .build())
          .build();

      BetaMessage response = client.beta().messages().create(params);
      IO.println(response);
  }
  ```

  ```php PHP
  $client = new Client();

  $response = $client->beta->messages->create(
      maxTokens: 16000,
      messages: [
          ['role' => 'user', 'content' => 'Hello']
      ],
      model: 'claude-opus-5',
      betas: ['context-management-2025-06-27'],
      contextManagement: [
          'edits' => [
              [
                  'type' => 'clear_thinking_20251015',
                  'keep' => [
                      'type' => 'thinking_turns',
                      'value' => 2
                  ]
              ]
          ]
      ],
  );

  echo $response;
  ```

  ```ruby Ruby
  client = Anthropic::Client.new

  response = client.beta.messages.create(
    model: "claude-opus-5",
    max_tokens: 16000,
    messages: [{ role: "user", content: "Hello" }],
    betas: ["context-management-2025-06-27"],
    context_management: {
      edits: [
        {
          type: "clear_thinking_20251015",
          keep: {
            type: "thinking_turns",
            value: 2
          }
        }
      ]
    }
  )
  puts response
  ```

### Configuration options for thinking block clearing

The `clear_thinking_20251015` strategy supports the following configuration:

| Configuration option | Default        | Description                                                                                                                                                                                                                                                                                                                           |
| -------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `keep`               | Model-specific | Defines how many recent assistant turns with thinking blocks to preserve. Use `\{type: "thinking_turns", value: N\}` where N must be > 0 to keep the last N turns, or `"all"` to keep all thinking blocks. Opus 4.5+ and Sonnet 4.6+: all turns. Fable and Mythos models: all turns. Earlier Opus/Sonnet and all Haiku: last turn only. |

**Example configurations:**

Keep thinking blocks from the last 3 assistant turns:

  ```bash cURL
  curl https://api.anthropic.com/v1/messages \
      --header "x-api-key: $ANTHROPIC_API_KEY" \
      --header "anthropic-version: 2023-06-01" \
      --header "content-type: application/json" \
      --header "anthropic-beta: context-management-2025-06-27" \
      --data '{
          "model": "claude-opus-5",
          "max_tokens": 16000,
          "messages": [{"role": "user", "content": "Hello"}],
          "context_management": {
              "edits": [
                  {
                      "type": "clear_thinking_20251015",
                      "keep": {
                          "type": "thinking_turns",
                          "value": 3
                      }
                  }
              ]
          }
      }'
  ```

  ```bash CLI
  ant beta:messages create --beta context-management-2025-06-27 <<'YAML'
  model: claude-opus-5
  max_tokens: 16000
  messages:
    - role: user
      content: Hello
  context_management:
    edits:
      - type: clear_thinking_20251015
        keep:
          type: thinking_turns
          value: 3
  YAML
  ```

  ```python Python
  response = client.beta.messages.create(
      model="claude-opus-5",
      max_tokens=16000,
      messages=[{"role": "user", "content": "Hello"}],
      betas=["context-management-2025-06-27"],
      context_management={
          "edits": [
              {
                  "type": "clear_thinking_20251015",
                  "keep": {"type": "thinking_turns", "value": 3},
              }
          ]
      },
  )
  ```

  ```typescript TypeScript
  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY
  });

  const response = await anthropic.beta.messages.create({
    model: "claude-opus-5",
    max_tokens: 16000,
    messages: [{ role: "user", content: "Hello" }],
    betas: ["context-management-2025-06-27"],
    context_management: {
      edits: [
        {
          type: "clear_thinking_20251015",
          keep: {
            type: "thinking_turns",
            value: 3
          }
        }
      ]
    }
  });
  ```

  ```csharp C#
  using Anthropic;
  using Anthropic.Models.Beta;
  using Anthropic.Models.Beta.Messages;
  using Messages = Anthropic.Models.Messages;

  AnthropicClient client = new();

  var parameters = new MessageCreateParams
  {
      Model = Messages::Model.ClaudeOpus5,
      MaxTokens = 16000,
      Messages = [
          new() { Role = Role.User, Content = "Hello" }
      ],
      Betas = [AnthropicBeta.ContextManagement2025_06_27],
      ContextManagement = new BetaContextManagementConfig
      {
          Edits = [
              new BetaClearThinking20251015Edit
              {
                  Keep = new BetaThinkingTurns(3)
              }
          ]
      }
  };

  var response = await client.Beta.Messages.Create(parameters);
  Console.WriteLine(response);
  ```

  ```go Go
  client := anthropic.NewClient()

  response, err := client.Beta.Messages.New(context.TODO(), anthropic.BetaMessageNewParams{
  	Model:     anthropic.ModelClaudeOpus5,
  	MaxTokens: 16000,
  	Messages: []anthropic.BetaMessageParam{
  		anthropic.NewBetaUserMessage(anthropic.NewBetaTextBlock("Hello")),
  	},
  	Betas: []anthropic.AnthropicBeta{anthropic.AnthropicBetaContextManagement2025_06_27},
  	ContextManagement: anthropic.BetaContextManagementConfigParam{
  		Edits: []anthropic.BetaContextManagementConfigEditUnionParam{
  			{OfClearThinking20251015: &anthropic.BetaClearThinking20251015EditParam{
  				Keep: anthropic.BetaClearThinking20251015EditKeepUnionParam{
  					OfThinkingTurns: &anthropic.BetaThinkingTurnsParam{
  						Value: 3,
  					},
  				},
  			}},
  		},
  	},
  })
  if err != nil {
  	log.Fatal(err)
  }
  fmt.Println(response)
  ```

  ```java Java
  AnthropicClient client = AnthropicOkHttpClient.fromEnv();

  MessageCreateParams params = MessageCreateParams.builder()
      .model(Model.CLAUDE_OPUS_5)
      .maxTokens(16000L)
      .addUserMessage("Hello")
      .addBeta(AnthropicBeta.CONTEXT_MANAGEMENT_2025_06_27)
      .contextManagement(BetaContextManagementConfig.builder()
          .addEdit(BetaClearThinking20251015Edit.builder()
              .keep(BetaThinkingTurns.builder()
                  .value(3L)
                  .build())
              .build())
          .build())
      .build();

  BetaMessage response = client.beta().messages().create(params);
  IO.println(response);
  ```

  ```php PHP
  $client = new Client();

  $response = $client->beta->messages->create(
      maxTokens: 16000,
      messages: [
          ['role' => 'user', 'content' => 'Hello']
      ],
      model: 'claude-opus-5',
      betas: ['context-management-2025-06-27'],
      contextManagement: [
          'edits' => [
              [
                  'type' => 'clear_thinking_20251015',
                  'keep' => [
                      'type' => 'thinking_turns',
                      'value' => 3
                  ]
              ]
          ]
      ],
  );

  echo $response;
  ```

  ```ruby Ruby
  client = Anthropic::Client.new

  response = client.beta.messages.create(
    model: "claude-opus-5",
    max_tokens: 16000,
    messages: [{ role: "user", content: "Hello" }],
    betas: ["context-management-2025-06-27"],
    context_management: {
      edits: [
        {
          type: "clear_thinking_20251015",
          keep: {
            type: "thinking_turns",
            value: 3
          }
        }
      ]
    }
  )
  puts response
  ```

Keep all thinking blocks (maximizes cache hits):

  ```bash cURL
  curl https://api.anthropic.com/v1/messages \
      --header "x-api-key: $ANTHROPIC_API_KEY" \
      --header "anthropic-version: 2023-06-01" \
      --header "content-type: application/json" \
      --header "anthropic-beta: context-management-2025-06-27" \
      --data '{
          "model": "claude-opus-5",
          "max_tokens": 16000,
          "messages": [{"role": "user", "content": "Hello"}],
          "context_management": {
              "edits": [
                  {
                      "type": "clear_thinking_20251015",
                      "keep": "all"
                  }
              ]
          }
      }'
  ```

  ```bash CLI
  ant beta:messages create --beta context-management-2025-06-27 <<'YAML'
  model: claude-opus-5
  max_tokens: 16000
  messages:
    - role: user
      content: Hello
  context_management:
    edits:
      - type: clear_thinking_20251015
        keep: all
  YAML
  ```

  ```python Python
  response = client.beta.messages.create(
      model="claude-opus-5",
      max_tokens=16000,
      messages=[{"role": "user", "content": "Hello"}],
      betas=["context-management-2025-06-27"],
      context_management={
          "edits": [
              {
                  "type": "clear_thinking_20251015",
                  "keep": "all",
              }
          ]
      },
  )
  ```

  ```typescript TypeScript
  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY
  });

  const response = await anthropic.beta.messages.create({
    model: "claude-opus-5",
    max_tokens: 16000,
    messages: [{ role: "user", content: "Hello" }],
    betas: ["context-management-2025-06-27"],
    context_management: {
      edits: [
        {
          type: "clear_thinking_20251015",
          keep: "all"
        }
      ]
    }
  });
  ```

  ```csharp C#
  using Anthropic;
  using Anthropic.Models.Beta;
  using Anthropic.Models.Beta.Messages;
  using Messages = Anthropic.Models.Messages;

  AnthropicClient client = new();

  var parameters = new MessageCreateParams
  {
      Model = Messages::Model.ClaudeOpus5,
      MaxTokens = 16000,
      Messages = [
          new() { Role = Role.User, Content = "Hello" }
      ],
      Betas = [AnthropicBeta.ContextManagement2025_06_27],
      ContextManagement = new BetaContextManagementConfig
      {
          Edits = [
              new BetaClearThinking20251015Edit
              {
                  Keep = new All()
              }
          ]
      }
  };

  var response = await client.Beta.Messages.Create(parameters);
  Console.WriteLine(response);
  ```

  ```go Go
  client := anthropic.NewClient()

  response, err := client.Beta.Messages.New(context.TODO(), anthropic.BetaMessageNewParams{
  	Model:     anthropic.ModelClaudeOpus5,
  	MaxTokens: 16000,
  	Messages: []anthropic.BetaMessageParam{
  		anthropic.NewBetaUserMessage(anthropic.NewBetaTextBlock("Hello")),
  	},
  	Betas: []anthropic.AnthropicBeta{anthropic.AnthropicBetaContextManagement2025_06_27},
  	ContextManagement: anthropic.BetaContextManagementConfigParam{
  		Edits: []anthropic.BetaContextManagementConfigEditUnionParam{
  			{OfClearThinking20251015: &anthropic.BetaClearThinking20251015EditParam{
  				Keep: anthropic.BetaClearThinking20251015EditKeepUnionParam{
  					OfAll: constant.ValueOf[constant.All](),
  				},
  			}},
  		},
  	},
  })
  if err != nil {
  	log.Fatal(err)
  }
  fmt.Println(response)
  ```

  ```java Java
  AnthropicClient client = AnthropicOkHttpClient.fromEnv();

  MessageCreateParams params = MessageCreateParams.builder()
      .model(Model.CLAUDE_OPUS_5)
      .maxTokens(16000L)
      .addUserMessage("Hello")
      .addBeta(AnthropicBeta.CONTEXT_MANAGEMENT_2025_06_27)
      .contextManagement(BetaContextManagementConfig.builder()
          .addEdit(BetaClearThinking20251015Edit.builder()
              .keepAll()
              .build())
          .build())
      .build();

  BetaMessage response = client.beta().messages().create(params);
  IO.println(response);
  ```

  ```php PHP
  $client = new Client();

  $response = $client->beta->messages->create(
      maxTokens: 16000,
      messages: [
          ['role' => 'user', 'content' => 'Hello']
      ],
      model: 'claude-opus-5',
      betas: ['context-management-2025-06-27'],
      contextManagement: [
          'edits' => [
              [
                  'type' => 'clear_thinking_20251015',
                  'keep' => 'all'
              ]
          ]
      ],
  );

  echo $response;
  ```

  ```ruby Ruby
  client = Anthropic::Client.new

  response = client.beta.messages.create(
    model: "claude-opus-5",
    max_tokens: 16000,
    messages: [{ role: "user", content: "Hello" }],
    betas: ["context-management-2025-06-27"],
    context_management: {
      edits: [
        {
          type: "clear_thinking_20251015",
          keep: "all"
        }
      ]
    }
  )
  puts response
  ```

### Combining strategies

You can use both thinking block clearing and tool result clearing together:

  When using multiple strategies, the `clear_thinking_20251015` strategy must be listed first in the `edits` array.

  ```bash cURL
  curl https://api.anthropic.com/v1/messages \
      --header "x-api-key: $ANTHROPIC_API_KEY" \
      --header "anthropic-version: 2023-06-01" \
      --header "content-type: application/json" \
      --header "anthropic-beta: context-management-2025-06-27" \
      --data '{
          "model": "claude-opus-5",
          "max_tokens": 16000,
          "messages": [
              {
                  "role": "user",
                  "content": "Search for the latest developments in quantum error correction and summarize the key breakthroughs."
              }
          ],
          "tools": [
              {
                  "type": "web_search_20250305",
                  "name": "web_search",
                  "max_uses": 5
              }
          ],
          "context_management": {
              "edits": [
                  {
                      "type": "clear_thinking_20251015",
                      "keep": {
                          "type": "thinking_turns",
                          "value": 2
                      }
                  },
                  {
                      "type": "clear_tool_uses_20250919",
                      "trigger": {
                          "type": "input_tokens",
                          "value": 50000
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
  ant beta:messages create --beta context-management-2025-06-27 <<'YAML'
  model: claude-opus-5
  max_tokens: 16000
  messages:
    - role: user
      content: Search for the latest developments in quantum error correction and summarize the key breakthroughs.
  tools:
    - type: web_search_20250305
      name: web_search
      max_uses: 5
  context_management:
    edits:
      - type: clear_thinking_20251015
        keep:
          type: thinking_turns
          value: 2
      - type: clear_tool_uses_20250919
        trigger:
          type: input_tokens
          value: 50000
        keep:
          type: tool_uses
          value: 5
  YAML
  ```

  ```python Python
  response = client.beta.messages.create(
      model="claude-opus-5",
      max_tokens=16000,
      messages=[
          {
              "role": "user",
              "content": "Search for the latest developments in quantum error correction and summarize the key breakthroughs.",
          }
      ],
      tools=[
          {
              "type": "web_search_20250305",
              "name": "web_search",
              "max_uses": 5,
          }
      ],
      betas=["context-management-2025-06-27"],
      context_management={
          "edits": [
              {
                  "type": "clear_thinking_20251015",
                  "keep": {"type": "thinking_turns", "value": 2},
              },
              {
                  "type": "clear_tool_uses_20250919",
                  "trigger": {"type": "input_tokens", "value": 50000},
                  "keep": {"type": "tool_uses", "value": 5},
              },
          ]
      },
  )

  print(response)
  ```

  ```typescript TypeScript
  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY
  });

  const response = await anthropic.beta.messages.create({
    model: "claude-opus-5",
    max_tokens: 16000,
    messages: [
      {
        role: "user",
        content:
          "Search for the latest developments in quantum error correction and summarize the key breakthroughs."
      }
    ],
    tools: [
      {
        type: "web_search_20250305",
        name: "web_search",
        max_uses: 5
      }
    ],
    betas: ["context-management-2025-06-27"],
    context_management: {
      edits: [
        {
          type: "clear_thinking_20251015",
          keep: {
            type: "thinking_turns",
            value: 2
          }
        },
        {
          type: "clear_tool_uses_20250919",
          trigger: {
            type: "input_tokens",
            value: 50000
          },
          keep: {
            type: "tool_uses",
            value: 5
          }
        }
      ]
    }
  });

  console.log(response);
  ```

  ```csharp C#
  using Anthropic;
  using Anthropic.Models.Beta;
  using Anthropic.Models.Beta.Messages;
  using Messages = Anthropic.Models.Messages;

  AnthropicClient client = new();

  var parameters = new MessageCreateParams
  {
      Model = Messages::Model.ClaudeOpus5,
      MaxTokens = 16000,
      Messages = [
          new() { Role = Role.User, Content = "Search for the latest developments in quantum error correction and summarize the key breakthroughs." }
      ],
      Tools = [
          new BetaWebSearchTool20250305 { MaxUses = 5 }
      ],
      Betas = [AnthropicBeta.ContextManagement2025_06_27],
      ContextManagement = new BetaContextManagementConfig
      {
          Edits = [
              new BetaClearThinking20251015Edit
              {
                  Keep = new BetaThinkingTurns(2)
              },
              new BetaClearToolUses20250919Edit
              {
                  Trigger = new BetaInputTokensTrigger(50000),
                  Keep = new BetaToolUsesKeep(5)
              }
          ]
      }
  };

  var response = await client.Beta.Messages.Create(parameters);
  Console.WriteLine(response);
  ```

  ```go Go
  client := anthropic.NewClient()

  response, err := client.Beta.Messages.New(context.TODO(), anthropic.BetaMessageNewParams{
  	Model:     anthropic.ModelClaudeOpus5,
  	MaxTokens: 16000,
  	Messages: []anthropic.BetaMessageParam{
  		anthropic.NewBetaUserMessage(anthropic.NewBetaTextBlock("Search for the latest developments in quantum error correction and summarize the key breakthroughs.")),
  	},
  	Tools: []anthropic.BetaToolUnionParam{
  		{OfWebSearchTool20250305: &anthropic.BetaWebSearchTool20250305Param{
  			MaxUses: anthropic.Int(5),
  		}},
  	},
  	Betas: []anthropic.AnthropicBeta{
  		anthropic.AnthropicBetaContextManagement2025_06_27,
  	},
  	ContextManagement: anthropic.BetaContextManagementConfigParam{
  		Edits: []anthropic.BetaContextManagementConfigEditUnionParam{
  			{OfClearThinking20251015: &anthropic.BetaClearThinking20251015EditParam{
  				Keep: anthropic.BetaClearThinking20251015EditKeepUnionParam{
  					OfThinkingTurns: &anthropic.BetaThinkingTurnsParam{
  						Value: 2,
  					},
  				},
  			}},
  			{OfClearToolUses20250919: &anthropic.BetaClearToolUses20250919EditParam{
  				Trigger: anthropic.BetaClearToolUses20250919EditTriggerUnionParam{
  					OfInputTokens: &anthropic.BetaInputTokensTriggerParam{
  						Value: 50000,
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
  fmt.Println(response)
  ```

  ```java Java
  import com.anthropic.models.beta.messages.BetaWebSearchTool20250305;
  import com.anthropic.models.beta.messages.BetaContextManagementConfig;
  import com.anthropic.models.beta.messages.BetaClearThinking20251015Edit;
  import com.anthropic.models.beta.messages.BetaClearToolUses20250919Edit;
  import com.anthropic.models.beta.messages.BetaThinkingTurns;
  import com.anthropic.models.beta.messages.BetaInputTokensTrigger;
  import com.anthropic.models.beta.messages.BetaToolUsesKeep;
  import com.anthropic.models.beta.AnthropicBeta;
  // ...
  void main() {
      AnthropicClient client = AnthropicOkHttpClient.fromEnv();

      MessageCreateParams params = MessageCreateParams.builder()
          .model(Model.CLAUDE_OPUS_5)
          .maxTokens(16000L)
          .addUserMessage("Search for the latest developments in quantum error correction and summarize the key breakthroughs.")
          .addTool(BetaWebSearchTool20250305.builder()
              .maxUses(5L)
              .build())
          .addBeta(AnthropicBeta.CONTEXT_MANAGEMENT_2025_06_27)
          .contextManagement(BetaContextManagementConfig.builder()
              .addEdit(BetaClearThinking20251015Edit.builder()
                  .keep(BetaThinkingTurns.builder()
                      .value(2L)
                      .build())
                  .build())
              .addEdit(BetaClearToolUses20250919Edit.builder()
                  .trigger(BetaInputTokensTrigger.builder()
                      .value(50000L)
                      .build())
                  .keep(BetaToolUsesKeep.builder()
                      .value(5L)
                      .build())
                  .build())
              .build())
          .build();

      BetaMessage response = client.beta().messages().create(params);
      IO.println(response);
  }
  ```

  ```php PHP
  $client = new Client();

  $response = $client->beta->messages->create(
      maxTokens: 16000,
      messages: [
          [
              'role' => 'user',
              'content' => 'Search for the latest developments in quantum error correction and summarize the key breakthroughs.'
          ]
      ],
      model: 'claude-opus-5',
      betas: ['context-management-2025-06-27'],
      tools: [
          [
              'type' => 'web_search_20250305',
              'name' => 'web_search',
              'max_uses' => 5
          ]
      ],
      contextManagement: [
          'edits' => [
              [
                  'type' => 'clear_thinking_20251015',
                  'keep' => [
                      'type' => 'thinking_turns',
                      'value' => 2
                  ]
              ],
              [
                  'type' => 'clear_tool_uses_20250919',
                  'trigger' => [
                      'type' => 'input_tokens',
                      'value' => 50000
                  ],
                  'keep' => [
                      'type' => 'tool_uses',
                      'value' => 5
                  ]
              ]
          ]
      ],
  );

  echo $response;
  ```

  ```ruby Ruby
  client = Anthropic::Client.new

  response = client.beta.messages.create(
    model: "claude-opus-5",
    max_tokens: 16000,
    messages: [
      {
        role: "user",
        content: "Search for the latest developments in quantum error correction and summarize the key breakthroughs."
      }
    ],
    tools: [
      {
        type: "web_search_20250305",
        name: "web_search",
        max_uses: 5
      }
    ],
    betas: ["context-management-2025-06-27"],
    context_management: {
      edits: [
        {
          type: "clear_thinking_20251015",
          keep: {
            type: "thinking_turns",
            value: 2
          }
        },
        {
          type: "clear_tool_uses_20250919",
          trigger: {
            type: "input_tokens",
            value: 50000
          },
          keep: {
            type: "tool_uses",
            value: 5
          }
        }
      ]
    }
  )
  puts response
  ```
