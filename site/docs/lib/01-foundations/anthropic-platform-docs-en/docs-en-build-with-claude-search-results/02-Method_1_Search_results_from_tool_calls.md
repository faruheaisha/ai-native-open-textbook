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
pageSha256: "d39e0797956c7ce446cb7e163f173cb265641e1ea77f205cc1e8bbe91599c3c0"
contentMode: "local-full"
zh: ""
---

## Method 1: Search results from tool calls

Returning search results from your custom tools enables dynamic RAG applications: tools fetch content at runtime, and Claude cites it in the response. The following example forces the tool call with [`tool_choice`](https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools#forcing-tool-use), so the retrieval step runs every time.

### Example: Knowledge base tool

  ```bash cURL
  # The tool-calling flow needs application-side search logic that doesn't
  # translate to a one-off shell command. See the SDK tabs for the full flow.
  # The raw shape of a tool conversation with search results is shown in the
  # Combining both methods cURL tab; Method 2 shows the top-level shape.
  ```

  ```bash CLI
  # The tool-calling flow needs application-side search logic that doesn't
  # translate to a one-off shell command. See the SDK tabs for the full flow.
  # The raw shape of a tool conversation with search results is shown in the
  # Combining both methods cURL tab; Method 2 shows the top-level shape.
  ```

  ```python Python
  from anthropic.types import (
      MessageParam,
      TextBlockParam,
      SearchResultBlockParam,
      ToolResultBlockParam,
  )

  client = Anthropic()

  # Define a knowledge base search tool
  knowledge_base_tool = {
      "name": "search_knowledge_base",
      "description": "Search the company knowledge base for information",
      "input_schema": {
          "type": "object",
          "properties": {"query": {"type": "string", "description": "The search query"}},
          "required": ["query"],
      },
  }

  # Function to handle the tool call
  def search_knowledge_base(query):
      # Your search logic here
      # Returns search results in the correct format
      return [
          SearchResultBlockParam(
              type="search_result",
              source="https://docs.company.com/product-guide",
              title="Product Configuration Guide",
              content=[
                  TextBlockParam(
                      type="text",
                      text="To configure the product, navigate to Settings > Configuration. The default timeout is 30 seconds, but can be adjusted between 10-120 seconds based on your needs.",
                  )
              ],
              citations={"enabled": True},
          ),
          SearchResultBlockParam(
              type="search_result",
              source="https://docs.company.com/troubleshooting",
              title="Troubleshooting Guide",
              content=[
                  TextBlockParam(
                      type="text",
                      text="If you encounter timeout errors, first check the configuration settings. Common causes include network latency and incorrect timeout values.",
                  )
              ],
              citations={"enabled": True},
          ),
      ]

  # Build up the conversation in a list, starting with the user's question
  messages = [
      MessageParam(role="user", content="How do I configure the timeout settings?")
  ]

  # Create a message with the tool
  response = client.messages.create(
      model="claude-opus-5",
      max_tokens=1024,
      tools=[knowledge_base_tool],
      tool_choice={"type": "tool", "name": "search_knowledge_base"},
      messages=messages,
  )

  # When Claude calls the tool, provide the search results.
  # The tool_use block is not always first: iterate to find it.
  tool_use = next((block for block in response.content if block.type == "tool_use"), None)
  if tool_use is not None:
      tool_result = search_knowledge_base(tool_use.input["query"])

      # Append Claude's turn, then the tool result, to the running conversation
      messages.append(MessageParam(role="assistant", content=response.content))
      messages.append(
          MessageParam(
              role="user",
              content=[
                  ToolResultBlockParam(
                      type="tool_result",
                      tool_use_id=tool_use.id,
                      content=tool_result,  # Search results go here
                  )
              ],
          )
      )

      # Send the tool result back
      final_response = client.messages.create(
          model="claude-opus-5",
          max_tokens=1024,
          messages=messages,
      )
      print(final_response)
  ```

  ```typescript TypeScript
  const client = new Anthropic();

  // Define a knowledge base search tool
  const knowledgeBaseTool: Anthropic.Tool = {
    name: "search_knowledge_base",
    description: "Search the company knowledge base for information",
    input_schema: {
      type: "object" as const,
      properties: {
        query: {
          type: "string",
          description: "The search query"
        }
      },
      required: ["query"]
    }
  };

  // Function to handle the tool call
  function searchKnowledgeBase(query: string) {
    // Your search logic here
    // Returns search results in the correct format
    return [
      {
        type: "search_result" as const,
        source: "https://docs.company.com/product-guide",
        title: "Product Configuration Guide",
        content: [
          {
            type: "text" as const,
            text: "To configure the product, navigate to Settings > Configuration. The default timeout is 30 seconds, but can be adjusted between 10-120 seconds based on your needs."
          }
        ],
        citations: { enabled: true }
      },
      {
        type: "search_result" as const,
        source: "https://docs.company.com/troubleshooting",
        title: "Troubleshooting Guide",
        content: [
          {
            type: "text" as const,
            text: "If you encounter timeout errors, first check the configuration settings. Common causes include network latency and incorrect timeout values."
          }
        ],
        citations: { enabled: true }
      }
    ];
  }

  // Build up the conversation in a list, starting with the user's question
  const messages: Anthropic.MessageParam[] = [
    { role: "user", content: "How do I configure the timeout settings?" }
  ];

  // Create a message with the tool
  const response = await client.messages.create({
    model: "claude-opus-5",
    max_tokens: 1024,
    tools: [knowledgeBaseTool],
    tool_choice: { type: "tool", name: "search_knowledge_base" },
    messages
  });

  // Handle tool use and provide results.
  // The tool_use block is not always first: find it in the content array.
  const toolUse = response.content.find(
    (block): block is Anthropic.ToolUseBlock => block.type === "tool_use"
  );
  if (toolUse) {
    const input = toolUse.input as { query: string };
    const toolResult = searchKnowledgeBase(input.query);

    // Append Claude's turn, then the tool result, to the running conversation
    messages.push({ role: "assistant", content: response.content });
    messages.push({
      role: "user",
      content: [
        {
          type: "tool_result" as const,
          tool_use_id: toolUse.id,
          content: toolResult // Search results go here
        }
      ]
    });

    // Send the tool result back
    const finalResponse = await client.messages.create({
      model: "claude-opus-5",
      max_tokens: 1024,
      messages
    });
    console.log(finalResponse);
  }
  ```

  ```csharp C#
  AnthropicClient client = new();

  var tools = new List<ToolUnion>
  {
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
  };

  // Function to handle the tool call
  static List<Block> SearchKnowledgeBase(string query)
  {
      // Your search logic here
      // Returns search results in the correct format
      return
      [
          new SearchResultBlockParam
          {
              Source = "https://docs.company.com/product-guide",
              Title = "Product Configuration Guide",
              Content = [new() { Text = "To configure the product, navigate to Settings > Configuration. The default timeout is 30 seconds, but can be adjusted between 10-120 seconds based on your needs." }],
              Citations = new() { Enabled = true },
          },
          new SearchResultBlockParam
          {
              Source = "https://docs.company.com/troubleshooting",
              Title = "Troubleshooting Guide",
              Content = [new() { Text = "If you encounter timeout errors, first check the configuration settings. Common causes include network latency and incorrect timeout values." }],
              Citations = new() { Enabled = true },
          },
      ];
  }

  // Build up the conversation in a list, starting with the user's question
  List<MessageParam> messages = [new() { Role = Role.User, Content = "How do I configure the timeout settings?" }];

  // Create a message with the tool
  var response = await client.Messages.Create(new()
  {
      Model = Model.ClaudeOpus5,
      MaxTokens = 1024,
      Tools = tools,
      ToolChoice = new ToolChoiceTool { Name = "search_knowledge_base" },
      Messages = messages,
  });

  // When Claude calls the tool, provide the search results.
  // The tool_use block is not always first: find the first one.
  foreach (var block in response.Content)
  {
      if (block.TryPickToolUse(out var toolUse))
      {
          var query = toolUse.Input["query"].GetString() ?? "";
          var toolResults = SearchKnowledgeBase(query);

          // Append Claude's turn, then the tool result, to the running conversation
          messages.Add(new() { Role = Role.Assistant, Content = response.Content.Select(contentBlock => new ContentBlockParam(contentBlock.Json)).ToList() });
          messages.Add(new()
          {
              Role = Role.User,
              Content = new MessageParamContent(
                  [new ContentBlockParam(new ToolResultBlockParam() { ToolUseID = toolUse.ID, Content = new ToolResultBlockParamContent(toolResults) })]
              ),
          });

          // Send the tool result back
          var finalResponse = await client.Messages.Create(new()
          {
              Model = Model.ClaudeOpus5,
              MaxTokens = 1024,
              Messages = messages,
          });
          Console.WriteLine(finalResponse);
          break;
      }
  }
  ```

  ```go Go
  	client := anthropic.NewClient()

  	knowledgeBaseTool := anthropic.ToolUnionParam{
  		OfTool: &anthropic.ToolParam{
  			Name:        "search_knowledge_base",
  			Description: anthropic.String("Search the company knowledge base for information"),
  			InputSchema: anthropic.ToolInputSchemaParam{
  				Properties: map[string]any{
  					"query": map[string]any{
  						"type":        "string",
  						"description": "The search query",
  					},
  				},
  				Required: []string{"query"},
  			},
  		},
  	}

  	// Build up the conversation in a slice, starting with the user's question
  	messages := []anthropic.MessageParam{
  		anthropic.NewUserMessage(anthropic.NewTextBlock("How do I configure the timeout settings?")),
  	}

  	response, err := client.Messages.New(context.TODO(), anthropic.MessageNewParams{
  		Model:      anthropic.ModelClaudeOpus5,
  		MaxTokens:  1024,
  		Tools:      []anthropic.ToolUnionParam{knowledgeBaseTool},
  		ToolChoice: anthropic.ToolChoiceUnionParam{OfTool: &anthropic.ToolChoiceToolParam{Name: "search_knowledge_base"}},
  		Messages:   messages,
  	})
  	if err != nil {
  		log.Fatal(err)
  	}

  	// The tool_use block is not always first: find it in the content list
  	var toolUse *anthropic.ToolUseBlock
  	for _, block := range response.Content {
  		if variant, ok := block.AsAny().(anthropic.ToolUseBlock); ok {
  			toolUse = &variant
  			break
  		}
  	}

  	if toolUse != nil {
  		var input struct {
  			Query string `json:"query"`
  		}
  		if err := json.Unmarshal(toolUse.Input, &input); err != nil {
  			log.Fatal(err)
  		}
  		toolResults := searchKnowledgeBase(input.Query)

  		// Append Claude's turn, then the tool result, to the running conversation
  		messages = append(messages, response.ToParam())
  		messages = append(messages, anthropic.NewUserMessage(anthropic.ContentBlockParamUnion{
  			OfToolResult: &anthropic.ToolResultBlockParam{
  				ToolUseID: toolUse.ID,
  				Content:   toolResults,
  			},
  		}))

  		// Send the tool result back
  		finalResponse, err := client.Messages.New(context.TODO(), anthropic.MessageNewParams{
  			Model:     anthropic.ModelClaudeOpus5,
  			MaxTokens: 1024,
  			Messages:  messages,
  		})
  		if err != nil {
  			log.Fatal(err)
  		}
  		fmt.Println(finalResponse)
  	}
  // ...
  func searchKnowledgeBase(query string) []anthropic.ToolResultBlockParamContentUnion {
  	return []anthropic.ToolResultBlockParamContentUnion{
  		{OfSearchResult: &anthropic.SearchResultBlockParam{
  			Content: []anthropic.TextBlockParam{
  				{Text: "To configure the product, navigate to Settings > Configuration. The default timeout is 30 seconds, but can be adjusted between 10-120 seconds based on your needs."},
  			},
  			Source:    "https://docs.company.com/product-guide",
  			Title:     "Product Configuration Guide",
  			Citations: anthropic.CitationsConfigParam{Enabled: anthropic.Bool(true)},
  		}},
  		{OfSearchResult: &anthropic.SearchResultBlockParam{
  			Content: []anthropic.TextBlockParam{
  				{Text: "If you encounter timeout errors, first check the configuration settings. Common causes include network latency and incorrect timeout values."},
  			},
  			Source:    "https://docs.company.com/troubleshooting",
  			Title:     "Troubleshooting Guide",
  			Citations: anthropic.CitationsConfigParam{Enabled: anthropic.Bool(true)},
  		}},
  	}
  }
  ```

  ```java Java
  import com.anthropic.models.messages.ContentBlockParam;
  import com.anthropic.models.messages.CitationsConfigParam;
  // ...
  import com.anthropic.models.messages.MessageParam;
  import com.anthropic.models.messages.Model;
  import com.anthropic.models.messages.SearchResultBlockParam;
  import com.anthropic.models.messages.TextBlockParam;
  import com.anthropic.models.messages.Tool;
  import com.anthropic.models.messages.ToolChoice;
  import com.anthropic.models.messages.ToolChoiceTool;
  import com.anthropic.models.messages.ToolResultBlockParam;
  import com.anthropic.core.JsonValue;
  // ...

  void main() {
      AnthropicClient client = AnthropicOkHttpClient.fromEnv();

      Tool knowledgeBaseTool = Tool.builder()
          .name("search_knowledge_base")
          .description("Search the company knowledge base for information")
          .inputSchema(Tool.InputSchema.builder()
              .properties(JsonValue.from(Map.of(
                  "query", Map.of(
                      "type", "string",
                      "description", "The search query"
                  )
              )))
              .putAdditionalProperty("required", JsonValue.from(List.of("query")))
              .build())
          .build();

      // Build up the conversation in a list, starting with the user's question
      List<MessageParam> messages = new ArrayList<>();
      messages.add(MessageParam.builder()
          .role(MessageParam.Role.USER)
          .content("How do I configure the timeout settings?")
          .build());

      MessageCreateParams params = MessageCreateParams.builder()
          .model(Model.CLAUDE_OPUS_5)
          .maxTokens(1024L)
          .addTool(knowledgeBaseTool)
          .toolChoice(ToolChoice.ofTool(ToolChoiceTool.builder()
              .name("search_knowledge_base")
              .build()))
          .messages(messages)
          .build();

      Message response = client.messages().create(params);

      // The tool_use block is not always first: find it in the content list
      response.content().stream()
          .flatMap(contentBlock -> contentBlock.toolUse().stream())
          .findFirst()
          .ifPresent(toolUse -> {
              Map<String, JsonValue> input =
                  (Map<String, JsonValue>) toolUse._input().asObject().get();
              List<ToolResultBlockParam.Content.Block> toolResult = searchKnowledgeBase(
                  input.get("query").asStringOrThrow()
              );

              // Append Claude's entire turn to the running conversation, then the tool result.
              // Rebuilding only the tool_use block would drop any other content blocks Claude
              // returned (e.g. leading text when the tool call is not forced) — append the
              // full turn, as the other language tabs do.
              messages.add(MessageParam.builder()
                  .role(MessageParam.Role.ASSISTANT)
                  .contentOfBlockParams(
                      response.content().stream()
                          .map(block -> block.toParam())
                          .toList()
                  )
                  .build());
              messages.add(MessageParam.builder()
                  .role(MessageParam.Role.USER)
                  .contentOfBlockParams(List.of(
                      ContentBlockParam.ofToolResult(
                          ToolResultBlockParam.builder()
                              .toolUseId(toolUse.id())
                              .contentOfBlocks(toolResult)
                              .build()
                      )
                  ))
                  .build());

              // Send the tool result back
              MessageCreateParams finalParams = MessageCreateParams.builder()
                  .model(Model.CLAUDE_OPUS_5)
                  .maxTokens(1024L)
                  .messages(messages)
                  .build();

              Message finalResponse = client.messages().create(finalParams);
              System.out.println(finalResponse);
          });
  }

  static List<ToolResultBlockParam.Content.Block> searchKnowledgeBase(String query) {
      return List.of(
          ToolResultBlockParam.Content.Block.ofSearchResult(
              SearchResultBlockParam.builder()
                  .source("https://docs.company.com/product-guide")
                  .title("Product Configuration Guide")
                  .content(List.of(
                      TextBlockParam.builder()
                          .text("To configure the product, navigate to Settings > Configuration. The default timeout is 30 seconds, but can be adjusted between 10-120 seconds based on your needs.")
                          .build()
                  ))
                  .citations(CitationsConfigParam.builder().enabled(true).build())
                  .build()
          ),
          ToolResultBlockParam.Content.Block.ofSearchResult(
              SearchResultBlockParam.builder()
                  .source("https://docs.company.com/troubleshooting")
                  .title("Troubleshooting Guide")
                  .content(List.of(
                      TextBlockParam.builder()
                          .text("If you encounter timeout errors, first check the configuration settings. Common causes include network latency and incorrect timeout values.")
                          .build()
                  ))
                  .citations(CitationsConfigParam.builder().enabled(true).build())
                  .build()
          )
      );
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
              'query' => [
                  'type' => 'string',
                  'description' => 'The search query'
              ]
          ],
          'required' => ['query']
      ]
  ];

  function searchKnowledgeBase($query) {
      return [
          [
              'type' => 'search_result',
              'source' => 'https://docs.company.com/product-guide',
              'title' => 'Product Configuration Guide',
              'content' => [
                  [
                      'type' => 'text',
                      'text' => 'To configure the product, navigate to Settings > Configuration. The default timeout is 30 seconds, but can be adjusted between 10-120 seconds based on your needs.'
                  ]
              ],
              'citations' => ['enabled' => true]
          ],
          [
              'type' => 'search_result',
              'source' => 'https://docs.company.com/troubleshooting',
              'title' => 'Troubleshooting Guide',
              'content' => [
                  [
                      'type' => 'text',
                      'text' => 'If you encounter timeout errors, first check the configuration settings. Common causes include network latency and incorrect timeout values.'
                  ]
              ],
              'citations' => ['enabled' => true]
          ]
      ];
  }

  // Build up the conversation in a list, starting with the user's question
  $messages = [
      ['role' => 'user', 'content' => 'How do I configure the timeout settings?']
  ];

  $response = $client->messages->create(
      maxTokens: 1024,
      messages: $messages,
      model: 'claude-opus-5',
      toolChoice: ['type' => 'tool', 'name' => 'search_knowledge_base'],
      tools: [$knowledgeBaseTool],
  );

  $toolUseBlock = null;
  foreach ($response->content as $block) {
      if ($block->type === 'tool_use') {
          $toolUseBlock = $block;
          break;
      }
  }

  if ($toolUseBlock !== null) {
      $toolResult = searchKnowledgeBase($toolUseBlock->input['query']);

      // Append Claude's turn, then the tool result, to the running conversation
      $messages[] = ['role' => 'assistant', 'content' => $response->content];
      $messages[] = [
          'role' => 'user',
          'content' => [
              [
                  'type' => 'tool_result',
                  'tool_use_id' => $toolUseBlock->id,
                  'content' => $toolResult
              ]
          ]
      ];

      // Send the tool result back
      $finalResponse = $client->messages->create(
          maxTokens: 1024,
          messages: $messages,
          model: 'claude-opus-5',
      );
      echo $finalResponse;
  } else {
      echo $response;
  }
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

  def search_knowledge_base(query)
    [
      {
        type: "search_result",
        source: "https://docs.company.com/product-guide",
        title: "Product Configuration Guide",
        content: [
          {
            type: "text",
            text: "To configure the product, navigate to Settings > Configuration. The default timeout is 30 seconds, but can be adjusted between 10-120 seconds based on your needs."
          }
        ],
        citations: { enabled: true }
      },
      {
        type: "search_result",
        source: "https://docs.company.com/troubleshooting",
        title: "Troubleshooting Guide",
        content: [
          {
            type: "text",
            text: "If you encounter timeout errors, first check the configuration settings. Common causes include network latency and incorrect timeout values."
          }
        ],
        citations: { enabled: true }
      }
    ]
  end

  # Build up the conversation in a list, starting with the user's question
  messages = [
    { role: "user", content: "How do I configure the timeout settings?" }
  ]

  response = client.messages.create(
    model: "claude-opus-5",
    max_tokens: 1024,
    tools: [knowledge_base_tool],
    tool_choice: { type: "tool", name: "search_knowledge_base" },
    messages: messages
  )

  # The tool_use block is not always first: find it in the content array
  tool_use = response.content.find { |block| block.type == :tool_use }

  if tool_use
    tool_result = search_knowledge_base(tool_use.input[:query])

    # Append Claude's turn, then the tool result, to the running conversation
    messages << { role: "assistant", content: response.content }
    messages << {
      role: "user",
      content: [
        {
          type: "tool_result",
          tool_use_id: tool_use.id,
          content: tool_result
        }
      ]
    }

    # Send the tool result back
    final_response = client.messages.create(
      model: "claude-opus-5",
      max_tokens: 1024,
      messages: messages
    )
    puts final_response
  end
  ```
