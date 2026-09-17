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
sourceRel: "docs/en/build-with-claude/search-results.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/build-with-claude/search-results.md"
sourceSha256: "dc7713539336cf72f67e59117447455d1af5cdf5c287359cfc75eaf9f88df906"
pageSha256: "80f688bfed250961ad3e297af63f7e047746089d21dba6537c24d0690c06001e"
contentMode: "local-full"
zh: ""
---

## Advanced usage

### Combining both methods

You can mix both methods in the same conversation. Claude cites from either source, and `search_result_index` counts all `search_result` blocks in request order, regardless of source.

The following example replays a complete conversation. The first user message carries a pre-fetched search result, the assistant turn calls a knowledge base tool, and the tool result returns a second search result. Claude's answer cites both sources:

  ```bash cURL
  curl https://api.anthropic.com/v1/messages \
    -H "x-api-key: $ANTHROPIC_API_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -H "content-type: application/json" \
    -d '{
      "model": "claude-opus-5",
      "max_tokens": 1024,
      "tools": [
        {
          "name": "search_knowledge_base",
          "description": "Search the company knowledge base for information",
          "input_schema": {
            "type": "object",
            "properties": {
              "query": {"type": "string", "description": "The search query"}
            },
            "required": ["query"]
          }
        }
      ],
      "messages": [
        {
          "role": "user",
          "content": [
            {
              "type": "search_result",
              "source": "https://docs.company.com/overview",
              "title": "Product Overview",
              "content": [
                {
                  "type": "text",
                  "text": "Acme Dashboard is a monitoring tool for distributed systems. It supports real-time alerting and custom metric dashboards."
                }
              ],
              "citations": {"enabled": true}
            },
            {
              "type": "text",
              "text": "What does Acme Dashboard do, and what plans is it available on?"
            }
          ]
        },
        {
          "role": "assistant",
          "content": [
            {
              "type": "text",
              "text": "Let me check the pricing information."
            },
            {
              "type": "tool_use",
              "id": "toolu_01A09q90qw90lq917835lq9",
              "name": "search_knowledge_base",
              "input": {"query": "Acme Dashboard pricing plans"}
            }
          ]
        },
        {
          "role": "user",
          "content": [
            {
              "type": "tool_result",
              "tool_use_id": "toolu_01A09q90qw90lq917835lq9",
              "content": [
                {
                  "type": "search_result",
                  "source": "https://docs.company.com/pricing",
                  "title": "Pricing Plans",
                  "content": [
                    {
                      "type": "text",
                      "text": "Acme Dashboard is available on the Starter plan at $10 per user per month and the Enterprise plan with custom pricing."
                    }
                  ],
                  "citations": {"enabled": true}
                }
              ]
            }
          ]
        }
      ]
    }'
  ```

  ```bash CLI
  ant messages create <<'YAML'
  model: claude-opus-5
  max_tokens: 1024
  tools:
    - name: search_knowledge_base
      description: Search the company knowledge base for information
      input_schema:
        type: object
        properties:
          query:
            type: string
            description: The search query
        required: [query]
  messages:
    - role: user
      content:
        - type: search_result
          source: https://docs.company.com/overview
          title: Product Overview
          content:
            - type: text
              text: >-
                Acme Dashboard is a monitoring tool for distributed systems.
                It supports real-time alerting and custom metric dashboards.
          citations:
            enabled: true
        - type: text
          text: What does Acme Dashboard do, and what plans is it available on?
    - role: assistant
      content:
        - type: text
          text: Let me check the pricing information.
        - type: tool_use
          id: toolu_01A09q90qw90lq917835lq9
          name: search_knowledge_base
          input:
            query: Acme Dashboard pricing plans
    - role: user
      content:
        - type: tool_result
          tool_use_id: toolu_01A09q90qw90lq917835lq9
          content:
            - type: search_result
              source: https://docs.company.com/pricing
              title: Pricing Plans
              content:
                - type: text
                  text: >-
                    Acme Dashboard is available on the Starter plan at $10 per
                    user per month and the Enterprise plan with custom pricing.
              citations:
                enabled: true
  YAML
  ```

  ```python Python
  from anthropic.types import (
      MessageParam,
      SearchResultBlockParam,
      TextBlockParam,
      ToolResultBlockParam,
      ToolUseBlockParam,
  )

  client = Anthropic()

  knowledge_base_tool = {
      "name": "search_knowledge_base",
      "description": "Search the company knowledge base for information",
      "input_schema": {
          "type": "object",
          "properties": {"query": {"type": "string", "description": "The search query"}},
          "required": ["query"],
      },
  }

  # Replay a conversation that provides search results both ways: the first
  # user message carries a pre-fetched result, the tool result returns another
  response = client.messages.create(
      model="claude-opus-5",
      max_tokens=1024,
      tools=[knowledge_base_tool],
      messages=[
          MessageParam(
              role="user",
              content=[
                  SearchResultBlockParam(
                      type="search_result",
                      source="https://docs.company.com/overview",
                      title="Product Overview",
                      content=[
                          TextBlockParam(
                              type="text",
                              text="Acme Dashboard is a monitoring tool for distributed systems. It supports real-time alerting and custom metric dashboards.",
                          )
                      ],
                      citations={"enabled": True},
                  ),
                  TextBlockParam(
                      type="text",
                      text="What does Acme Dashboard do, and what plans is it available on?",
                  ),
              ],
          ),
          MessageParam(
              role="assistant",
              content=[
                  TextBlockParam(
                      type="text", text="Let me check the pricing information."
                  ),
                  ToolUseBlockParam(
                      type="tool_use",
                      id="toolu_01A09q90qw90lq917835lq9",
                      name="search_knowledge_base",
                      input={"query": "Acme Dashboard pricing plans"},
                  ),
              ],
          ),
          MessageParam(
              role="user",
              content=[
                  ToolResultBlockParam(
                      type="tool_result",
                      tool_use_id="toolu_01A09q90qw90lq917835lq9",
                      content=[
                          SearchResultBlockParam(
                              type="search_result",
                              source="https://docs.company.com/pricing",
                              title="Pricing Plans",
                              content=[
                                  TextBlockParam(
                                      type="text",
                                      text="Acme Dashboard is available on the Starter plan at $10 per user per month and the Enterprise plan with custom pricing.",
                                  )
                              ],
                              citations={"enabled": True},
                          )
                      ],
                  )
              ],
          ),
      ],
  )

  print(response)
  ```

  ```typescript TypeScript
  const client = new Anthropic();

  const knowledgeBaseTool: Anthropic.Tool = {
    name: "search_knowledge_base",
    description: "Search the company knowledge base for information",
    input_schema: {
      type: "object" as const,
      properties: {
        query: { type: "string", description: "The search query" }
      },
      required: ["query"]
    }
  };

  // Replay a conversation that provides search results both ways: the first
  // user message carries a pre-fetched result, the tool result returns another
  const response = await client.messages.create({
    model: "claude-opus-5",
    max_tokens: 1024,
    tools: [knowledgeBaseTool],
    messages: [
      {
        role: "user",
        content: [
          {
            type: "search_result" as const,
            source: "https://docs.company.com/overview",
            title: "Product Overview",
            content: [
              {
                type: "text" as const,
                text: "Acme Dashboard is a monitoring tool for distributed systems. It supports real-time alerting and custom metric dashboards."
              }
            ],
            citations: { enabled: true }
          },
          {
            type: "text" as const,
            text: "What does Acme Dashboard do, and what plans is it available on?"
          }
        ]
      },
      {
        role: "assistant",
        content: [
          { type: "text" as const, text: "Let me check the pricing information." },
          {
            type: "tool_use" as const,
            id: "toolu_01A09q90qw90lq917835lq9",
            name: "search_knowledge_base",
            input: { query: "Acme Dashboard pricing plans" }
          }
        ]
      },
      {
        role: "user",
        content: [
          {
            type: "tool_result" as const,
            tool_use_id: "toolu_01A09q90qw90lq917835lq9",
            content: [
              {
                type: "search_result" as const,
                source: "https://docs.company.com/pricing",
                title: "Pricing Plans",
                content: [
                  {
                    type: "text" as const,
                    text: "Acme Dashboard is available on the Starter plan at $10 per user per month and the Enterprise plan with custom pricing."
                  }
                ],
                citations: { enabled: true }
              }
            ]
          }
        ]
      }
    ]
  });

  console.log(response);
  ```

  ```csharp C#
  AnthropicClient client = new();

  // Replay a conversation that provides search results both ways: the first
  // user message carries a pre-fetched result, the tool result returns another
  var response = await client.Messages.Create(new()
  {
      Model = Model.ClaudeOpus5,
      MaxTokens = 1024,
      Tools =
      [
          new ToolUnion(new Tool()
          {
              Name = "search_knowledge_base",
              Description = "Search the company knowledge base for information",
              InputSchema = new InputSchema()
              {
                  Properties = new Dictionary<string, JsonElement>
                  {
                      ["query"] = JsonSerializer.SerializeToElement(new { type = "string", description = "The search query" }),
                  },
                  Required = ["query"],
              },
          }),
      ],
      Messages =
      [
          new()
          {
              Role = Role.User,
              Content = new MessageParamContent(
              [
                  new ContentBlockParam(new SearchResultBlockParam
                  {
                      Source = "https://docs.company.com/overview",
                      Title = "Product Overview",
                      Content = [new() { Text = "Acme Dashboard is a monitoring tool for distributed systems. It supports real-time alerting and custom metric dashboards." }],
                      Citations = new() { Enabled = true },
                  }),
                  new ContentBlockParam(new TextBlockParam { Text = "What does Acme Dashboard do, and what plans is it available on?" }),
              ]),
          },
          new()
          {
              Role = Role.Assistant,
              Content = new MessageParamContent(
              [
                  new ContentBlockParam(new TextBlockParam { Text = "Let me check the pricing information." }),
                  new ContentBlockParam(new ToolUseBlockParam
                  {
                      ID = "toolu_01A09q90qw90lq917835lq9",
                      Name = "search_knowledge_base",
                      Input = new Dictionary<string, JsonElement>
                      {
                          ["query"] = JsonSerializer.SerializeToElement("Acme Dashboard pricing plans"),
                      },
                  }),
              ]),
          },
          new()
          {
              Role = Role.User,
              Content = new MessageParamContent(
              [
                  new ContentBlockParam(new ToolResultBlockParam()
                  {
                      ToolUseID = "toolu_01A09q90qw90lq917835lq9",
                      Content = new ToolResultBlockParamContent(
                      [
                          new SearchResultBlockParam
                          {
                              Source = "https://docs.company.com/pricing",
                              Title = "Pricing Plans",
                              Content = [new() { Text = "Acme Dashboard is available on the Starter plan at $10 per user per month and the Enterprise plan with custom pricing." }],
                              Citations = new() { Enabled = true },
                          },
                      ]),
                  }),
              ]),
          },
      ],
  });

  Console.WriteLine(response);
  ```

  ```go Go
  client := anthropic.NewClient()

  knowledgeBaseTool := anthropic.ToolUnionParam{
  	OfTool: &anthropic.ToolParam{
  		Name:        "search_knowledge_base",
  		Description: anthropic.String("Search the company knowledge base for information"),
  		InputSchema: anthropic.ToolInputSchemaParam{
  			Properties: map[string]any{
  				"query": map[string]any{"type": "string", "description": "The search query"},
  			},
  			Required: []string{"query"},
  		},
  	},
  }

  // Replay a conversation that provides search results both ways: the first
  // user message carries a pre-fetched result, the tool result returns another
  response, err := client.Messages.New(context.TODO(), anthropic.MessageNewParams{
  	Model:     anthropic.ModelClaudeOpus5,
  	MaxTokens: 1024,
  	Tools:     []anthropic.ToolUnionParam{knowledgeBaseTool},
  	Messages: []anthropic.MessageParam{
  		anthropic.NewUserMessage(
  			anthropic.ContentBlockParamUnion{OfSearchResult: &anthropic.SearchResultBlockParam{
  				Content: []anthropic.TextBlockParam{
  					{Text: "Acme Dashboard is a monitoring tool for distributed systems. It supports real-time alerting and custom metric dashboards."},
  				},
  				Source:    "https://docs.company.com/overview",
  				Title:     "Product Overview",
  				Citations: anthropic.CitationsConfigParam{Enabled: anthropic.Bool(true)},
  			}},
  			anthropic.NewTextBlock("What does Acme Dashboard do, and what plans is it available on?"),
  		),
  		anthropic.NewAssistantMessage(
  			anthropic.NewTextBlock("Let me check the pricing information."),
  			anthropic.ContentBlockParamUnion{OfToolUse: &anthropic.ToolUseBlockParam{
  				ID:    "toolu_01A09q90qw90lq917835lq9",
  				Name:  "search_knowledge_base",
  				Input: map[string]any{"query": "Acme Dashboard pricing plans"},
  			}},
  		),
  		anthropic.NewUserMessage(
  			anthropic.ContentBlockParamUnion{OfToolResult: &anthropic.ToolResultBlockParam{
  				ToolUseID: "toolu_01A09q90qw90lq917835lq9",
  				Content: []anthropic.ToolResultBlockParamContentUnion{
  					{OfSearchResult: &anthropic.SearchResultBlockParam{
  						Content: []anthropic.TextBlockParam{
  							{Text: "Acme Dashboard is available on the Starter plan at $10 per user per month and the Enterprise plan with custom pricing."},
  						},
  						Source:    "https://docs.company.com/pricing",
  						Title:     "Pricing Plans",
  						Citations: anthropic.CitationsConfigParam{Enabled: anthropic.Bool(true)},
  					}},
  				},
  			}},
  		),
  	},
  })
  if err != nil {
  	log.Fatal(err)
  }
  fmt.Println(response)
  ```

  ```java Java
  import com.anthropic.core.JsonValue;
  import com.anthropic.models.messages.CitationsConfigParam;
  import com.anthropic.models.messages.ContentBlockParam;
  // ...
  import com.anthropic.models.messages.SearchResultBlockParam;
  import com.anthropic.models.messages.TextBlockParam;
  import com.anthropic.models.messages.Tool;
  import com.anthropic.models.messages.ToolResultBlockParam;
  import com.anthropic.models.messages.ToolUseBlockParam;
  // ...

  void main() {
      AnthropicClient client = AnthropicOkHttpClient.fromEnv();

      Tool knowledgeBaseTool = Tool.builder()
          .name("search_knowledge_base")
          .description("Search the company knowledge base for information")
          .inputSchema(Tool.InputSchema.builder()
              .properties(JsonValue.from(Map.of(
                  "query", Map.of("type", "string", "description", "The search query")
              )))
              .putAdditionalProperty("required", JsonValue.from(List.of("query")))
              .build())
          .build();

      // Replay a conversation that provides search results both ways: the first
      // user message carries a pre-fetched result, the tool result returns another
      MessageCreateParams params = MessageCreateParams.builder()
          .model(Model.CLAUDE_OPUS_5)
          .maxTokens(1024L)
          .addTool(knowledgeBaseTool)
          .addUserMessageOfBlockParams(List.of(
              ContentBlockParam.ofSearchResult(SearchResultBlockParam.builder()
                  .source("https://docs.company.com/overview")
                  .title("Product Overview")
                  .content(List.of(TextBlockParam.builder()
                      .text("Acme Dashboard is a monitoring tool for distributed systems. It supports real-time alerting and custom metric dashboards.")
                      .build()))
                  .citations(CitationsConfigParam.builder().enabled(true).build())
                  .build()),
              ContentBlockParam.ofText(TextBlockParam.builder()
                  .text("What does Acme Dashboard do, and what plans is it available on?")
                  .build())
          ))
          .addAssistantMessageOfBlockParams(List.of(
              ContentBlockParam.ofText(TextBlockParam.builder()
                  .text("Let me check the pricing information.")
                  .build()),
              ContentBlockParam.ofToolUse(ToolUseBlockParam.builder()
                  .id("toolu_01A09q90qw90lq917835lq9")
                  .name("search_knowledge_base")
                  .input(JsonValue.from(Map.of("query", "Acme Dashboard pricing plans")))
                  .build())
          ))
          .addUserMessageOfBlockParams(List.of(
              ContentBlockParam.ofToolResult(ToolResultBlockParam.builder()
                  .toolUseId("toolu_01A09q90qw90lq917835lq9")
                  .contentOfBlocks(List.of(
                      ToolResultBlockParam.Content.Block.ofSearchResult(SearchResultBlockParam.builder()
                          .source("https://docs.company.com/pricing")
                          .title("Pricing Plans")
                          .content(List.of(TextBlockParam.builder()
                              .text("Acme Dashboard is available on the Starter plan at $10 per user per month and the Enterprise plan with custom pricing.")
                              .build()))
                          .citations(CitationsConfigParam.builder().enabled(true).build())
                          .build())
                  ))
                  .build())
          ))
          .build();

      Message response = client.messages().create(params);
      System.out.println(response);
  }
  ```

  ```php PHP
  $client = new Client();

  $knowledgeBaseTool = [
      'name' => 'search_knowledge_base',
      'description' => 'Search the company knowledge base for information',
      'input_schema' => [
          'type' => 'object',
          'properties' => [
              'query' => ['type' => 'string', 'description' => 'The search query']
          ],
          'required' => ['query']
      ]
  ];

  // Replay a conversation that provides search results both ways: the first
  // user message carries a pre-fetched result, the tool result returns another
  $response = $client->messages->create(
      maxTokens: 1024,
      tools: [$knowledgeBaseTool],
      messages: [
          [
              'role' => 'user',
              'content' => [
                  [
                      'type' => 'search_result',
                      'source' => 'https://docs.company.com/overview',
                      'title' => 'Product Overview',
                      'content' => [
                          [
                              'type' => 'text',
                              'text' => 'Acme Dashboard is a monitoring tool for distributed systems. It supports real-time alerting and custom metric dashboards.'
                          ]
                      ],
                      'citations' => ['enabled' => true]
                  ],
                  [
                      'type' => 'text',
                      'text' => 'What does Acme Dashboard do, and what plans is it available on?'
                  ]
              ]
          ],
          [
              'role' => 'assistant',
              'content' => [
                  ['type' => 'text', 'text' => 'Let me check the pricing information.'],
                  [
                      'type' => 'tool_use',
                      'id' => 'toolu_01A09q90qw90lq917835lq9',
                      'name' => 'search_knowledge_base',
                      'input' => ['query' => 'Acme Dashboard pricing plans']
                  ]
              ]
          ],
          [
              'role' => 'user',
              'content' => [
                  [
                      'type' => 'tool_result',
                      'tool_use_id' => 'toolu_01A09q90qw90lq917835lq9',
                      'content' => [
                          [
                              'type' => 'search_result',
                              'source' => 'https://docs.company.com/pricing',
                              'title' => 'Pricing Plans',
                              'content' => [
                                  [
                                      'type' => 'text',
                                      'text' => 'Acme Dashboard is available on the Starter plan at $10 per user per month and the Enterprise plan with custom pricing.'
                                  ]
                              ],
                              'citations' => ['enabled' => true]
                          ]
                      ]
                  ]
              ]
          ]
      ],
      model: 'claude-opus-5',
  );

  echo json_encode($response, JSON_PRETTY_PRINT);
  ```

  ```ruby Ruby
  client = Anthropic::Client.new

  knowledge_base_tool = {
    name: "search_knowledge_base",
    description: "Search the company knowledge base for information",
    input_schema: {
      type: "object",
      properties: {
        query: { type: "string", description: "The search query" }
      },
      required: ["query"]
    }
  }

  # Replay a conversation that provides search results both ways: the first
  # user message carries a pre-fetched result, the tool result returns another
  response = client.messages.create(
    model: "claude-opus-5",
    max_tokens: 1024,
    tools: [knowledge_base_tool],
    messages: [
      {
        role: "user",
        content: [
          {
            type: "search_result",
            source: "https://docs.company.com/overview",
            title: "Product Overview",
            content: [
              {
                type: "text",
                text: "Acme Dashboard is a monitoring tool for distributed systems. It supports real-time alerting and custom metric dashboards."
              }
            ],
            citations: { enabled: true }
          },
          {
            type: "text",
            text: "What does Acme Dashboard do, and what plans is it available on?"
          }
        ]
      },
      {
        role: "assistant",
        content: [
          { type: "text", text: "Let me check the pricing information." },
          {
            type: "tool_use",
            id: "toolu_01A09q90qw90lq917835lq9",
            name: "search_knowledge_base",
            input: { query: "Acme Dashboard pricing plans" }
          }
        ]
      },
      {
        role: "user",
        content: [
          {
            type: "tool_result",
            tool_use_id: "toolu_01A09q90qw90lq917835lq9",
            content: [
              {
                type: "search_result",
                source: "https://docs.company.com/pricing",
                title: "Pricing Plans",
                content: [
                  {
                    type: "text",
                    text: "Acme Dashboard is available on the Starter plan at $10 per user per month and the Enterprise plan with custom pricing."
                  }
                ],
                citations: { enabled: true }
              }
            ]
          }
        ]
      }
    ]
  )

  puts response
  ```

The response cites both sources. The pre-fetched result is `search_result_index: 0` and the tool-returned result is `search_result_index: 1`, matching the order the `search_result` blocks appear in the conversation:

```json
{
  "role": "assistant",
  "content": [
    {
      "type": "text",
      "text": "Here's what I found about Acme Dashboard:\n\n**What it does:** "
    },
    {
      "type": "text",
      "text": "Acme Dashboard is a monitoring tool for distributed systems. It supports real-time alerting and custom metric dashboards.",
      "citations": [
        {
          "type": "search_result_location",
          "cited_text": "Acme Dashboard is a monitoring tool for distributed systems. It supports real-time alerting and custom metric dashboards.",
          "source": "https://docs.company.com/overview",
          "title": "Product Overview",
          "search_result_index": 0,
          "start_block_index": 0,
          "end_block_index": 1
        }
      ]
    },
    {
      "type": "text",
      "text": "\n\n**Available plans:** "
    },
    {
      "type": "text",
      "text": "Acme Dashboard is available on the Starter plan at $10 per user per month and the Enterprise plan with custom pricing.",
      "citations": [
        {
          "type": "search_result_location",
          "cited_text": "Acme Dashboard is available on the Starter plan at $10 per user per month and the Enterprise plan with custom pricing.",
          "source": "https://docs.company.com/pricing",
          "title": "Pricing Plans",
          "search_result_index": 1,
          "start_block_index": 0,
          "end_block_index": 1
        }
      ]
    }
  ]
}
```

### Mixing with other content types

In user messages, `search_result` blocks can sit alongside any other content block. The Method 2 example pairs search results with a `text` question, and image or document blocks can join them the same way.

Tool results are stricter: if any block in a `tool_result` content array is a `search_result`, all of its blocks must be `search_result`. Mixing search results with other block types in the same tool result returns a validation error. To return supporting text alongside tool-sourced search results, include it as a text block inside one of the search results' `content` arrays, where it also becomes citable.

### Cache control

Add `cache_control` on the search result block to cache it for reuse across requests. It sits alongside `citations` on the same block:

```json
{
  "type": "search_result",
  "source": "https://docs.company.com/guide",
  "title": "User Guide",
  "content": [{ "type": "text", "text": "..." }],
  "citations": { "enabled": true },
  "cache_control": { "type": "ephemeral" }
}
```

See [Prompt caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching) for minimum cacheable lengths and other requirements.
