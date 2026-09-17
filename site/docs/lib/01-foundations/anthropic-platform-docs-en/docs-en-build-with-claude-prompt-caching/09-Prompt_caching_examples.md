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
sourceRel: "docs/en/build-with-claude/prompt-caching.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/build-with-claude/prompt-caching.md"
sourceSha256: "89fd9a1e988ae4902de1047706ee788003060cb232e444ad4cf37a11421d42a4"
pageSha256: "e0a980fd812e6483654a88015284acae2eb31336c5f222208068d5f5d6a479bd"
contentMode: "local-full"
zh: ""
---

## Prompt caching examples

To help you get started with prompt caching, the [prompt caching cookbook](https://platform.claude.com/cookbook/misc-prompt-caching) provides detailed examples and best practices.

The following code snippets showcase various prompt caching patterns. These examples demonstrate how to implement caching in different scenarios, helping you understand the practical applications of this feature:

      ```bash cURL
      curl https://api.anthropic.com/v1/messages \
        -H "x-api-key: $ANTHROPIC_API_KEY" \
        -H "anthropic-version: 2023-06-01" \
        -H "content-type: application/json" \
        -d '{
          "model": "claude-opus-5",
          "max_tokens": 1024,
          "system": [
            {
              "type": "text",
              "text": "You are an AI assistant tasked with analyzing legal documents."
            },
            {
              "type": "text",
              "text": "Here is the full text of a complex legal agreement: [Insert full text of a 50-page legal agreement here]",
              "cache_control": {"type": "ephemeral"}
            }
          ],
          "messages": [
            {
              "role": "user",
              "content": "What are the key terms and conditions in this agreement?"
            }
          ]
        }'
      ```

      ```bash CLI
      ant messages create --transform usage <<'YAML'
      model: claude-opus-5
      max_tokens: 1024
      system:
        - type: text
          text: You are an AI assistant tasked with analyzing legal documents.
        - type: text
          text: >-
            Here is the full text of a complex legal agreement:
            [Insert full text of a 50-page legal agreement here]
          cache_control:
            type: ephemeral
      messages:
        - role: user
          content: What are the key terms and conditions in this agreement?
      YAML
      ```

      ```python Python
      client = anthropic.Anthropic()

      response = client.messages.create(
          model="claude-opus-5",
          max_tokens=1024,
          system=[
              {
                  "type": "text",
                  "text": "You are an AI assistant tasked with analyzing legal documents.",
              },
              {
                  "type": "text",
                  "text": "Here is the full text of a complex legal agreement: [Insert full text of a 50-page legal agreement here]",
                  "cache_control": {"type": "ephemeral"},
              },
          ],
          messages=[
              {
                  "role": "user",
                  "content": "What are the key terms and conditions in this agreement?",
              }
          ],
      )
      print(response.usage.model_dump_json())
      ```

      ```typescript TypeScript
      const client = new Anthropic();

      const response = await client.messages.create({
        model: "claude-opus-5",
        max_tokens: 1024,
        system: [
          {
            type: "text",
            text: "You are an AI assistant tasked with analyzing legal documents."
          },
          {
            type: "text",
            text: "Here is the full text of a complex legal agreement: [Insert full text of a 50-page legal agreement here]",
            cache_control: { type: "ephemeral" }
          }
        ],
        messages: [
          {
            role: "user",
            content: "What are the key terms and conditions in this agreement?"
          }
        ]
      });
      console.log(response.usage);
      ```

      ```csharp C#
      AnthropicClient client = new()
      {
          ApiKey = Environment.GetEnvironmentVariable("ANTHROPIC_API_KEY")
      };

      var parameters = new MessageCreateParams
      {
          Model = Model.ClaudeOpus5,
          MaxTokens = 1024,
          System = new MessageCreateParamsSystem(new List&lt;TextBlockParam>
          {
              new TextBlockParam()
              {
                  Text = "You are an AI assistant tasked with analyzing legal documents.",
              },
              new TextBlockParam()
              {
                  Text = "Here is the full text of a complex legal agreement: [Insert full text of a 50-page legal agreement here]",
                  CacheControl = new CacheControlEphemeral(),
              },
          }),
          Messages =
          [
              new()
              {
                  Role = Role.User,
                  Content = "What are the key terms and conditions in this agreement?"
              }
          ]
      };

      var message = await client.Messages.Create(parameters);
      Console.WriteLine(message.Usage);
      ```

      ```go Go
      client := anthropic.NewClient()

      response, err := client.Messages.New(context.TODO(), anthropic.MessageNewParams{
      	Model:     anthropic.ModelClaudeOpus5,
      	MaxTokens: 1024,
      	System: []anthropic.TextBlockParam{
      		{
      			Text: "You are an AI assistant tasked with analyzing legal documents.",
      		},
      		{
      			Text:         "Here is the full text of a complex legal agreement: [Insert full text of a 50-page legal agreement here]",
      			CacheControl: anthropic.NewCacheControlEphemeralParam(),
      		},
      	},
      	Messages: []anthropic.MessageParam{
      		anthropic.NewUserMessage(anthropic.NewTextBlock("What are the key terms and conditions in this agreement?")),
      	},
      })
      if err != nil {
      	log.Fatal(err)
      }
      fmt.Println(response.Usage.RawJSON())
      ```

      ```java Java
      import com.anthropic.models.messages.CacheControlEphemeral;
      // ...
      public class LegalDocumentAnalysisExample {

        public static void main(String[] args) {
          AnthropicClient client = AnthropicOkHttpClient.fromEnv();

          MessageCreateParams params = MessageCreateParams.builder()
            .model(Model.CLAUDE_OPUS_5)
            .maxTokens(1024)
            .systemOfTextBlockParams(
              List.of(
                TextBlockParam.builder()
                  .text("You are an AI assistant tasked with analyzing legal documents.")
                  .build(),
                TextBlockParam.builder()
                  .text(
                    "Here is the full text of a complex legal agreement: [Insert full text of a 50-page legal agreement here]"
                  )
                  .cacheControl(CacheControlEphemeral.builder().build())
                  .build()
              )
            )
            .addUserMessage("What are the key terms and conditions in this agreement?")
            .build();

          Message message = client.messages().create(params);
          System.out.println(message.usage());
        }
      }
      ```

      ```php PHP
      $client = new Client();

      $message = $client->messages->create(
          maxTokens: 1024,
          messages: [
              [
                  'role' => 'user',
                  'content' => 'What are the key terms and conditions in this agreement?'
              ]
          ],
          model: 'claude-opus-5',
          system: [
              [
                  'type' => 'text',
                  'text' => 'You are an AI assistant tasked with analyzing legal documents.'
              ],
              [
                  'type' => 'text',
                  'text' => 'Here is the full text of a complex legal agreement: [Insert full text of a 50-page legal agreement here]',
                  'cache_control' => ['type' => 'ephemeral']
              ]
          ],
      );

      echo json_encode($message->usage), PHP_EOL;
      ```

      ```ruby Ruby
      client = Anthropic::Client.new

      message = client.messages.create(
        model: "claude-opus-5",
        max_tokens: 1024,
        system: [
          {
            type: "text",
            text: "You are an AI assistant tasked with analyzing legal documents."
          },
          {
            type: "text",
            text: "Here is the full text of a complex legal agreement: [Insert full text of a 50-page legal agreement here]",
            cache_control: { type: "ephemeral" }
          }
        ],
        messages: [
          {
            role: "user",
            content: "What are the key terms and conditions in this agreement?"
          }
        ]
      )
      puts message.usage
      ```

    This example demonstrates basic prompt caching usage, caching the full text of the legal agreement as a prefix while keeping the user instruction uncached.

    For the first request:

    * `input_tokens`: Number of tokens in the user message only
    * `cache_creation_input_tokens`: Number of tokens in the entire system message, including the legal document
    * `cache_read_input_tokens`: 0 (no cache hit on first request)

    For subsequent requests within the cache lifetime:

    * `input_tokens`: Number of tokens in the user message only
    * `cache_creation_input_tokens`: 0 (no new cache creation)
    * `cache_read_input_tokens`: Number of tokens in the entire cached system message

    Tool definitions can be cached by placing `cache_control` on the last tool in your `tools` array. All tools defined before and including that tool are cached as a single prefix.

    ```json
    {
      "model": "claude-opus-5",
      "max_tokens": 1024,
      "tools": [
        {
          "name": "get_weather",
          "description": "Get the current weather in a given location",
          "input_schema": {
            "type": "object",
            "properties": { "location": { "type": "string" } },
            "required": ["location"]
          }
        },
        {
          "name": "get_time",
          "description": "Get the current time in a given time zone",
          "input_schema": {
            "type": "object",
            "properties": { "timezone": { "type": "string" } },
            "required": ["timezone"]
          },
          "cache_control": { "type": "ephemeral" }
        }
      ],
      "messages": [{ "role": "user", "content": "What is the weather and time in New York?" }]
    }
    ```

    On the first request, `cache_creation_input_tokens` reflects the token count of all tool definitions. On subsequent requests within the cache lifetime, those tokens appear under `cache_read_input_tokens` instead.

    For detailed interaction between tool definitions, `defer_loading`, and cache invalidation, see [Tool use with prompt caching](https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-use-with-prompt-caching).

      ```bash cURL
      curl https://api.anthropic.com/v1/messages \
        -H "x-api-key: $ANTHROPIC_API_KEY" \
        -H "anthropic-version: 2023-06-01" \
        -H "content-type: application/json" \
        -d '\{
          "model": "claude-opus-5",
          "max_tokens": 1024,
          "system": [
            \{
              "type": "text",
              "text": "...long system prompt",
              "cache_control": \{"type": "ephemeral"\}
            \}
          ],
          "messages": [
            \{
              "role": "user",
              "content": [
                \{
                  "type": "text",
                  "text": "Hello, can you tell me more about the solar system?"
                \}
              ]
            \},
            \{
              "role": "assistant",
              "content": "Certainly! The solar system is the collection of celestial bodies that orbit our Sun. It consists of eight planets, numerous moons, asteroids, comets, and other objects. The planets, in order from closest to farthest from the Sun, are: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune. Each planet has its own unique characteristics and features. Is there a specific aspect of the solar system you would like to know more about?"
            \},
            \{
              "role": "user",
              "content": [
                \{
                  "type": "text",
                  "text": "Good to know."
                \},
                \{
                  "type": "text",
                  "text": "Tell me more about Mars.",
                  "cache_control": \{"type": "ephemeral"\}
                \}
              ]
            \}
          ]
        \}'
      ```

      ```bash CLI
      ant messages create --transform usage <<'YAML'
      model: claude-opus-5
      max_tokens: 1024
      system:
        - type: text
          text: "...long system prompt"
          cache_control:
            type: ephemeral
      messages:
        - role: user
          content:
            - type: text
              text: Hello, can you tell me more about the solar system?
        - role: assistant
          content: >-
            Certainly! The solar system is the collection of celestial bodies that
            orbit our Sun. It consists of eight planets, numerous moons, asteroids,
            comets, and other objects. The planets, in order from closest to farthest
            from the Sun, are: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus,
            and Neptune. Each planet has its own unique characteristics and features.
            Is there a specific aspect of the solar system you would like to know
            more about?
        - role: user
          content:
            - type: text
              text: Good to know.
            - type: text
              text: Tell me more about Mars.
              cache_control:
                type: ephemeral
      YAML
      ```

      ```python Python
      client = anthropic.Anthropic()

      response = client.messages.create(
          model="claude-opus-5",
          max_tokens=1024,
          system=[
              \{
                  "type": "text",
                  "text": "...long system prompt",
                  "cache_control": \{"type": "ephemeral"\},
              \}
          ],
          messages=[
              # ...long conversation so far
              \{
                  "role": "user",
                  "content": [
                      \{
                          "type": "text",
                          "text": "Hello, can you tell me more about the solar system?",
                      \}
                  ],
              \},
              \{
                  "role": "assistant",
                  "content": "Certainly! The solar system is the collection of celestial bodies that orbit our Sun. It consists of eight planets, numerous moons, asteroids, comets, and other objects. The planets, in order from closest to farthest from the Sun, are: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune. Each planet has its own unique characteristics and features. Is there a specific aspect of the solar system you'd like to know more about?",
              \},
              \{
                  "role": "user",
                  "content": [
                      \{"type": "text", "text": "Good to know."\},
                      \{
                          "type": "text",
                          "text": "Tell me more about Mars.",
                          "cache_control": \{"type": "ephemeral"\},
                      \},
                  ],
              \},
          ],
      )
      print(response.usage.model_dump_json())
      ```

      ```typescript TypeScript
      const client = new Anthropic();

      const response = await client.messages.create(\{
        model: "claude-opus-5",
        max_tokens: 1024,
        system: [
          \{
            type: "text",
            text: "...long system prompt",
            cache_control: \{ type: "ephemeral" \}
          \}
        ],
        messages: [
          // ...long conversation so far
          \{
            role: "user",
            content: [
              \{
                type: "text",
                text: "Hello, can you tell me more about the solar system?"
              \}
            ]
          \},
          \{
            role: "assistant",
            content:
              "Certainly! The solar system is the collection of celestial bodies that orbit our Sun. It consists of eight planets, numerous moons, asteroids, comets, and other objects. The planets, in order from closest to farthest from the Sun, are: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune. Each planet has its own unique characteristics and features. Is there a specific aspect of the solar system you'd like to know more about?"
          \},
          \{
            role: "user",
            content: [
              \{
                type: "text",
                text: "Good to know."
              \},
              \{
                type: "text",
                text: "Tell me more about Mars.",
                cache_control: \{ type: "ephemeral" \}
              \}
            ]
          \}
        ]
      \});
      console.log(response.usage);
      ```

      ```csharp C#
      AnthropicClient client = new();

      var parameters = new MessageCreateParams
      \{
          Model = Model.ClaudeOpus5,
          MaxTokens = 1024,
          System = new MessageCreateParamsSystem(new List&lt;TextBlockParam>
          \{
              new TextBlockParam()
              \{
                  Text = "...long system prompt",
                  CacheControl = new CacheControlEphemeral(),
              \},
          \}),
          Messages =
          [
              new()
              \{
                  Role = Role.User,
                  Content = new MessageParamContent(new List&lt;ContentBlockParam>
                  \{
                      new ContentBlockParam(new TextBlockParam("Hello, can you tell me more about the solar system?")),
                  \}),
              \},
              new()
              \{
                  Role = Role.Assistant,
                  Content = "Certainly! The solar system is the collection of celestial bodies that orbit our Sun. It consists of eight planets, numerous moons, asteroids, comets, and other objects. The planets, in order from closest to farthest from the Sun, are: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune. Each planet has its own unique characteristics and features. Is there a specific aspect of the solar system you would like to know more about?"
              \},
              new()
              \{
                  Role = Role.User,
                  Content = new MessageParamContent(new List&lt;ContentBlockParam>
                  \{
                      new ContentBlockParam(new TextBlockParam("Good to know.")),
                      new ContentBlockParam(new TextBlockParam()
                      \{
                          Text = "Tell me more about Mars.",
                          CacheControl = new CacheControlEphemeral(),
                      \}),
                  \})
              \}
          ]
      \};

      var message = await client.Messages.Create(parameters);
      Console.WriteLine(message.Usage);
      ```

      ```go Go
      client := anthropic.NewClient()

      response, err := client.Messages.New(context.TODO(), anthropic.MessageNewParams\{
      	Model:     anthropic.ModelClaudeOpus5,
      	MaxTokens: 1024,
      	System: []anthropic.TextBlockParam\{
      		\{
      			Text:         "...long system prompt",
      			CacheControl: anthropic.NewCacheControlEphemeralParam(),
      		\},
      	\},
      	Messages: []anthropic.MessageParam\{
      		anthropic.NewUserMessage(anthropic.NewTextBlock("Hello, can you tell me more about the solar system?")),
      		anthropic.NewAssistantMessage(anthropic.NewTextBlock("Certainly! The solar system is the collection of celestial bodies that orbit our Sun. It consists of eight planets, numerous moons, asteroids, comets, and other objects. The planets, in order from closest to farthest from the Sun, are: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune. Each planet has its own unique characteristics and features. Is there a specific aspect of the solar system you would like to know more about?")),
      		\{
      			Role: anthropic.MessageParamRoleUser,
      			Content: []anthropic.ContentBlockParamUnion\{
      				anthropic.NewTextBlock("Good to know."),
      				\{OfText: &anthropic.TextBlockParam\{
      					Text:         "Tell me more about Mars.",
      					CacheControl: anthropic.NewCacheControlEphemeralParam(),
      				&#125;&#125;,
      			\},
      		\},
      	\},
      \})
      if err != nil \{
      	log.Fatal(err)
      \}
      fmt.Println(response.Usage.RawJSON())
      ```

      ```java Java
      import com.anthropic.models.messages.CacheControlEphemeral;
      // ...
      public class ConversationWithCacheControlExample \{

        public static void main(String[] args) \{
          AnthropicClient client = AnthropicOkHttpClient.fromEnv();

          // Create ephemeral system prompt
          TextBlockParam systemPrompt = TextBlockParam.builder()
            .text("...long system prompt")
            .cacheControl(CacheControlEphemeral.builder().build())
            .build();

          // Create message params
          MessageCreateParams params = MessageCreateParams.builder()
            .model(Model.CLAUDE_OPUS_5)
            .maxTokens(1024)
            .systemOfTextBlockParams(List.of(systemPrompt))
            // First user message (without cache control)
            .addUserMessage("Hello, can you tell me more about the solar system?")
            // Assistant response
            .addAssistantMessage(
              "Certainly! The solar system is the collection of celestial bodies that orbit our Sun. It consists of eight planets, numerous moons, asteroids, comets, and other objects. The planets, in order from closest to farthest from the Sun, are: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune. Each planet has its own unique characteristics and features. Is there a specific aspect of the solar system you would like to know more about?"
            )
            // Second user message (with cache control)
            .addUserMessageOfBlockParams(
              List.of(
                ContentBlockParam.ofText(TextBlockParam.builder().text("Good to know.").build()),
                ContentBlockParam.ofText(
                  TextBlockParam.builder()
                    .text("Tell me more about Mars.")
                    .cacheControl(CacheControlEphemeral.builder().build())
                    .build()
                )
              )
            )
            .build();

          Message message = client.messages().create(params);
          System.out.println(message.usage());
        \}
      \}
      ```

      ```php PHP
      $client = new Client();

      $message = $client->messages->create(
          maxTokens: 1024,
          messages: [
              [
                  'role' => 'user',
                  'content' => [
                      [
                          'type' => 'text',
                          'text' => 'Hello, can you tell me more about the solar system?'
                      ]
                  ]
              ],
              [
                  'role' => 'assistant',
                  'content' => "Certainly! The solar system is the collection of celestial bodies that orbit our Sun. It consists of eight planets, numerous moons, asteroids, comets, and other objects. The planets, in order from closest to farthest from the Sun, are: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune. Each planet has its own unique characteristics and features. Is there a specific aspect of the solar system you would like to know more about?"
              ],
              [
                  'role' => 'user',
                  'content' => [
                      ['type' => 'text', 'text' => 'Good to know.'],
                      [
                          'type' => 'text',
                          'text' => 'Tell me more about Mars.',
                          'cache_control' => ['type' => 'ephemeral']
                      ]
                  ]
              ]
          ],
          model: 'claude-opus-5',
          system: [
              [
                  'type' => 'text',
                  'text' => '...long system prompt',
                  'cache_control' => ['type' => 'ephemeral']
              ]
          ],
      );

      echo json_encode($message->usage), PHP_EOL;
      ```

      ```ruby Ruby
      client = Anthropic::Client.new

      message = client.messages.create(
        model: "claude-opus-5",
        max_tokens: 1024,
        system: [
          \{
            type: "text",
            text: "...long system prompt",
            cache_control: \{ type: "ephemeral" \}
          \}
        ],
        messages: [
          \{
            role: "user",
            content: [
              \{
                type: "text",
                text: "Hello, can you tell me more about the solar system?"
              \}
            ]
          \},
          \{
            role: "assistant",
            content: "Certainly! The solar system is the collection of celestial bodies that orbit our Sun. It consists of eight planets, numerous moons, asteroids, comets, and other objects. The planets, in order from closest to farthest from the Sun, are: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune. Each planet has its own unique characteristics and features. Is there a specific aspect of the solar system you would like to know more about?"
          \},
          \{
            role: "user",
            content: [
              \{ type: "text", text: "Good to know." \},
              \{
                type: "text",
                text: "Tell me more about Mars.",
                cache_control: \{ type: "ephemeral" \}
              \}
            ]
          \}
        ]
      )
      puts message.usage
      ```

    This example demonstrates how to use prompt caching in a multi-turn conversation.

    During each turn, the final block of the final message is marked with `cache_control` so the conversation can be incrementally cached. The system automatically looks up and uses the longest previously cached sequence of blocks for follow-up messages. That is, blocks that were previously marked with a `cache_control` block are later not marked with this, but they will still be considered a cache hit (and also a cache refresh!) if they are hit within 5 minutes.

    In addition, note that the `cache_control` parameter is placed on the system message. This is to ensure that if this gets evicted from the cache (after not being used for more than 5 minutes), it will get added back to the cache on the next request.

    This approach is useful for maintaining context in ongoing conversations without repeatedly processing the same information.

    When this is set up properly, you should see the following in the usage response of each request:

    * `input_tokens`: Number of tokens in the new user message (will be minimal)
    * `cache_creation_input_tokens`: Number of tokens in the new assistant and user turns
    * `cache_read_input_tokens`: Number of tokens in the conversation up to the previous turn

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
              "name": "search_documents",
              "description": "Search through the knowledge base",
              "input_schema": {
                "type": "object",
                "properties": {
                  "query": {
                    "type": "string",
                    "description": "Search query"
                  }
                },
                "required": ["query"]
              }
            },
            {
              "name": "get_document",
              "description": "Retrieve a specific document by ID",
              "input_schema": {
                "type": "object",
                "properties": {
                  "doc_id": {
                    "type": "string",
                    "description": "Document ID"
                  }
                },
                "required": ["doc_id"]
              },
              "cache_control": {"type": "ephemeral"}
            }
          ],
          "system": [
            {
              "type": "text",
              "text": "You are a helpful research assistant with access to a document knowledge base.\n\n# Instructions\n- Always search for relevant documents before answering\n- Provide citations for your sources\n- Be objective and accurate in your responses\n- If multiple documents contain relevant information, synthesize them\n- Acknowledge when information is not available in the knowledge base",
              "cache_control": {"type": "ephemeral"}
            },
            {
              "type": "text",
              "text": "# Knowledge Base Context\n\nHere are the relevant documents for this conversation:\n\n## Document 1: Solar System Overview\nThe solar system consists of the Sun and all objects that orbit it...\n\n## Document 2: Planetary Characteristics\nEach planet has unique features. Mercury is the smallest planet...\n\n## Document 3: Mars Exploration\nMars has been a target of exploration for decades...\n\n[Additional documents...]",
              "cache_control": {"type": "ephemeral"}
            }
          ],
          "messages": [
            {
              "role": "user",
              "content": "Can you search for information about Mars rovers?"
            },
            {
              "role": "assistant",
              "content": [
                {
                  "type": "tool_use",
                  "id": "tool_1",
                  "name": "search_documents",
                  "input": {"query": "Mars rovers"}
                }
              ]
            },
            {
              "role": "user",
              "content": [
                {
                  "type": "tool_result",
                  "tool_use_id": "tool_1",
                  "content": "Found 3 relevant documents: Document 3 (Mars Exploration), Document 7 (Rover Technology), Document 9 (Mission History)"
                }
              ]
            },
            {
              "role": "assistant",
              "content": [
                {
                  "type": "text",
                  "text": "I found 3 relevant documents about Mars rovers. Let me get more details from the Mars Exploration document."
                }
              ]
            },
            {
              "role": "user",
              "content": [
                {
                  "type": "text",
                  "text": "Yes, please tell me about the Perseverance rover specifically.",
                  "cache_control": {"type": "ephemeral"}
                }
              ]
            }
          ]
        }'
      ```

      ```bash CLI
      ant messages create --transform usage <<'YAML'
      model: claude-opus-5
      max_tokens: 1024
      tools:
        - name: search_documents
          description: Search through the knowledge base
          input_schema:
            type: object
            properties:
              query:
                type: string
                description: Search query
            required: [query]
        - name: get_document
          description: Retrieve a specific document by ID
          input_schema:
            type: object
            properties:
              doc_id:
                type: string
                description: Document ID
            required: [doc_id]
          cache_control:
            type: ephemeral
      system:
        - type: text
          text: |-
            You are a helpful research assistant with access to a document knowledge base.

            # Instructions
            - Always search for relevant documents before answering
            - Provide citations for your sources
            - Be objective and accurate in your responses
            - If multiple documents contain relevant information, synthesize them
            - Acknowledge when information is not available in the knowledge base
          cache_control:
            type: ephemeral
        - type: text
          text: |-
            # Knowledge Base Context

            Here are the relevant documents for this conversation:

            ## Document 1: Solar System Overview
            The solar system consists of the Sun and all objects that orbit it...

            ## Document 2: Planetary Characteristics
            Each planet has unique features. Mercury is the smallest planet...

            ## Document 3: Mars Exploration
            Mars has been a target of exploration for decades...

            [Additional documents...]
          cache_control:
            type: ephemeral
      messages:
        - role: user
          content: Can you search for information about Mars rovers?
        - role: assistant
          content:
            - type: tool_use
              id: tool_1
              name: search_documents
              input:
                query: Mars rovers
        - role: user
          content:
            - type: tool_result
              tool_use_id: tool_1
              content: >-
                Found 3 relevant documents: Document 3 (Mars Exploration),
                Document 7 (Rover Technology), Document 9 (Mission History)
        - role: assistant
          content:
            - type: text
              text: >-
                I found 3 relevant documents about Mars rovers. Let me get more
                details from the Mars Exploration document.
        - role: user
          content:
            - type: text
              text: Yes, please tell me about the Perseverance rover specifically.
              cache_control:
                type: ephemeral
      YAML
      ```

      ```python Python
      client = anthropic.Anthropic()

      response = client.messages.create(
          model="claude-opus-5",
          max_tokens=1024,
          tools=[
              {
                  "name": "search_documents",
                  "description": "Search through the knowledge base",
                  "input_schema": {
                      "type": "object",
                      "properties": {
                          "query": {"type": "string", "description": "Search query"}
                      },
                      "required": ["query"],
                  },
              },
              {
                  "name": "get_document",
                  "description": "Retrieve a specific document by ID",
                  "input_schema": {
                      "type": "object",
                      "properties": {
                          "doc_id": {"type": "string", "description": "Document ID"}
                      },
                      "required": ["doc_id"],
                  },
                  "cache_control": {"type": "ephemeral"},
              },
          ],
          system=[
              {
                  "type": "text",
                  "text": "You are a helpful research assistant with access to a document knowledge base.\n\n# Instructions\n- Always search for relevant documents before answering\n- Provide citations for your sources\n- Be objective and accurate in your responses\n- If multiple documents contain relevant information, synthesize them\n- Acknowledge when information is not available in the knowledge base",
                  "cache_control": {"type": "ephemeral"},
              },
              {
                  "type": "text",
                  "text": "# Knowledge Base Context\n\nHere are the relevant documents for this conversation:\n\n## Document 1: Solar System Overview\nThe solar system consists of the Sun and all objects that orbit it...\n\n## Document 2: Planetary Characteristics\nEach planet has unique features. Mercury is the smallest planet...\n\n## Document 3: Mars Exploration\nMars has been a target of exploration for decades...\n\n[Additional documents...]",
                  "cache_control": {"type": "ephemeral"},
              },
          ],
          messages=[
              {
                  "role": "user",
                  "content": "Can you search for information about Mars rovers?",
              },
              {
                  "role": "assistant",
                  "content": [
                      {
                          "type": "tool_use",
                          "id": "tool_1",
                          "name": "search_documents",
                          "input": {"query": "Mars rovers"},
                      }
                  ],
              },
              {
                  "role": "user",
                  "content": [
                      {
                          "type": "tool_result",
                          "tool_use_id": "tool_1",
                          "content": "Found 3 relevant documents: Document 3 (Mars Exploration), Document 7 (Rover Technology), Document 9 (Mission History)",
                      }
                  ],
              },
              {
                  "role": "assistant",
                  "content": [
                      {
                          "type": "text",
                          "text": "I found 3 relevant documents about Mars rovers. Let me get more details from the Mars Exploration document.",
                      }
                  ],
              },
              {
                  "role": "user",
                  "content": [
                      {
                          "type": "text",
                          "text": "Yes, please tell me about the Perseverance rover specifically.",
                          "cache_control": {"type": "ephemeral"},
                      }
                  ],
              },
          ],
      )
      print(response.usage.model_dump_json())
      ```

      ```typescript TypeScript
      const client = new Anthropic();

      const response = await client.messages.create({
        model: "claude-opus-5",
        max_tokens: 1024,
        tools: [
          {
            name: "search_documents",
            description: "Search through the knowledge base",
            input_schema: {
              type: "object",
              properties: {
                query: {
                  type: "string",
                  description: "Search query"
                }
              },
              required: ["query"]
            }
          },
          {
            name: "get_document",
            description: "Retrieve a specific document by ID",
            input_schema: {
              type: "object",
              properties: {
                doc_id: {
                  type: "string",
                  description: "Document ID"
                }
              },
              required: ["doc_id"]
            },
            cache_control: { type: "ephemeral" }
          }
        ],
        system: [
          {
            type: "text",
            text: "You are a helpful research assistant with access to a document knowledge base.\n\n# Instructions\n- Always search for relevant documents before answering\n- Provide citations for your sources\n- Be objective and accurate in your responses\n- If multiple documents contain relevant information, synthesize them\n- Acknowledge when information is not available in the knowledge base",
            cache_control: { type: "ephemeral" }
          },
          {
            type: "text",
            text: "# Knowledge Base Context\n\nHere are the relevant documents for this conversation:\n\n## Document 1: Solar System Overview\nThe solar system consists of the Sun and all objects that orbit it...\n\n## Document 2: Planetary Characteristics\nEach planet has unique features. Mercury is the smallest planet...\n\n## Document 3: Mars Exploration\nMars has been a target of exploration for decades...\n\n[Additional documents...]",
            cache_control: { type: "ephemeral" }
          }
        ],
        messages: [
          {
            role: "user",
            content: "Can you search for information about Mars rovers?"
          },
          {
            role: "assistant",
            content: [
              {
                type: "tool_use",
                id: "tool_1",
                name: "search_documents",
                input: { query: "Mars rovers" }
              }
            ]
          },
          {
            role: "user",
            content: [
              {
                type: "tool_result",
                tool_use_id: "tool_1",
                content:
                  "Found 3 relevant documents: Document 3 (Mars Exploration), Document 7 (Rover Technology), Document 9 (Mission History)"
              }
            ]
          },
          {
            role: "assistant",
            content: [
              {
                type: "text",
                text: "I found 3 relevant documents about Mars rovers. Let me get more details from the Mars Exploration document."
              }
            ]
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Yes, please tell me about the Perseverance rover specifically.",
                cache_control: { type: "ephemeral" }
              }
            ]
          }
        ]
      });
      console.log(response.usage);
      ```

      ```csharp C#
      AnthropicClient client = new()
      {
          ApiKey = Environment.GetEnvironmentVariable("ANTHROPIC_API_KEY")
      };

      var parameters = new MessageCreateParams
      {
          Model = Model.ClaudeOpus5,
          MaxTokens = 1024,
          Tools =
          [
              new ToolUnion(new Tool()
              {
                  Name = "search_documents",
                  Description = "Search through the knowledge base",
                  InputSchema = new InputSchema()
                  {
                      Properties = new Dictionary&lt;string, JsonElement>
                      {
                          ["query"] = JsonSerializer.SerializeToElement(new { type = "string", description = "Search query" }),
                      },
                      Required = ["query"],
                  },
              }),
              new ToolUnion(new Tool()
              {
                  Name = "get_document",
                  Description = "Retrieve a specific document by ID",
                  InputSchema = new InputSchema()
                  {
                      Properties = new Dictionary&lt;string, JsonElement>
                      {
                          ["doc_id"] = JsonSerializer.SerializeToElement(new { type = "string", description = "Document ID" }),
                      },
                      Required = ["doc_id"],
                  },
                  CacheControl = new CacheControlEphemeral(),
              }),
          ],
          System = new MessageCreateParamsSystem(new List&lt;TextBlockParam>
          {
              new TextBlockParam()
              {
                  Text = "You are a helpful research assistant with access to a document knowledge base.\n\n# Instructions\n- Always search for relevant documents before answering\n- Provide citations for your sources\n- Be objective and accurate in your responses\n- If multiple documents contain relevant information, synthesize them\n- Acknowledge when information is not available in the knowledge base",
                  CacheControl = new CacheControlEphemeral(),
              },
              new TextBlockParam()
              {
                  Text = "# Knowledge Base Context\n\nHere are the relevant documents for this conversation:\n\n## Document 1: Solar System Overview\nThe solar system consists of the Sun and all objects that orbit it...\n\n## Document 2: Planetary Characteristics\nEach planet has unique features. Mercury is the smallest planet...\n\n## Document 3: Mars Exploration\nMars has been a target of exploration for decades...\n\n[Additional documents...]",
                  CacheControl = new CacheControlEphemeral(),
              },
          }),
          Messages =
          [
              new() { Role = Role.User, Content = "Can you search for information about Mars rovers?" },
              new()
              {
                  Role = Role.Assistant,
                  Content = new MessageParamContent(new List&lt;ContentBlockParam>
                  {
                      new ContentBlockParam(new ToolUseBlockParam()
                      {
                          ID = "tool_1",
                          Name = "search_documents",
                          Input = new Dictionary&lt;string, JsonElement>
                          {
                              ["query"] = JsonSerializer.SerializeToElement("Mars rovers"),
                          },
                      }),
                  }),
              },
              new()
              {
                  Role = Role.User,
                  Content = new MessageParamContent(new List&lt;ContentBlockParam>
                  {
                      new ContentBlockParam(new ToolResultBlockParam()
                      {
                          ToolUseID = "tool_1",
                          Content = "Found 3 relevant documents: Document 3 (Mars Exploration), Document 7 (Rover Technology), Document 9 (Mission History)",
                      }),
                  }),
              },
              new()
              {
                  Role = Role.Assistant,
                  Content = "I found 3 relevant documents about Mars rovers. Let me get more details from the Mars Exploration document.",
              },
              new()
              {
                  Role = Role.User,
                  Content = new MessageParamContent(new List&lt;ContentBlockParam>
                  {
                      new ContentBlockParam(new TextBlockParam()
                      {
                          Text = "Yes, please tell me about the Perseverance rover specifically.",
                          CacheControl = new CacheControlEphemeral(),
                      }),
                  }),
              },
          ]
      };

      var message = await client.Messages.Create(parameters);
      Console.WriteLine(message.Usage);
      ```

      ```go Go
      client := anthropic.NewClient()

      response, err := client.Messages.New(context.TODO(), anthropic.MessageNewParams{
      	Model:     anthropic.ModelClaudeOpus5,
      	MaxTokens: 1024,
      	Tools: []anthropic.ToolUnionParam{
      		{OfTool: &anthropic.ToolParam{
      			Name:        "search_documents",
      			Description: anthropic.String("Search through the knowledge base"),
      			InputSchema: anthropic.ToolInputSchemaParam{
      				Properties: map[string]any{
      					"query": map[string]any{
      						"type":        "string",
      						"description": "Search query",
      					},
      				},
      				Required: []string{"query"},
      			},
      		}},
      		{OfTool: &anthropic.ToolParam{
      			Name:        "get_document",
      			Description: anthropic.String("Retrieve a specific document by ID"),
      			InputSchema: anthropic.ToolInputSchemaParam{
      				Properties: map[string]any{
      					"doc_id": map[string]any{
      						"type":        "string",
      						"description": "Document ID",
      					},
      				},
      				Required: []string{"doc_id"},
      			},
      			CacheControl: anthropic.NewCacheControlEphemeralParam(),
      		}},
      	},
      	System: []anthropic.TextBlockParam{
      		{
      			Text:         "You are a helpful research assistant with access to a document knowledge base.\n\n# Instructions\n- Always search for relevant documents before answering\n- Provide citations for your sources\n- Be objective and accurate in your responses\n- If multiple documents contain relevant information, synthesize them\n- Acknowledge when information is not available in the knowledge base",
      			CacheControl: anthropic.NewCacheControlEphemeralParam(),
      		},
      		{
      			Text:         "# Knowledge Base Context\n\nHere are the relevant documents for this conversation:\n\n## Document 1: Solar System Overview\nThe solar system consists of the Sun and all objects that orbit it...\n\n## Document 2: Planetary Characteristics\nEach planet has unique features. Mercury is the smallest planet...\n\n## Document 3: Mars Exploration\nMars has been a target of exploration for decades...\n\n[Additional documents...]",
      			CacheControl: anthropic.NewCacheControlEphemeralParam(),
      		},
      	},
      	Messages: []anthropic.MessageParam{
      		anthropic.NewUserMessage(anthropic.NewTextBlock("Can you search for information about Mars rovers?")),
      		anthropic.NewAssistantMessage(anthropic.NewToolUseBlock(
      			"tool_1",
      			map[string]any{"query": "Mars rovers"},
      			"search_documents",
      		)),
      		anthropic.NewUserMessage(anthropic.NewToolResultBlock(
      			"tool_1",
      			"Found 3 relevant documents: Document 3 (Mars Exploration), Document 7 (Rover Technology), Document 9 (Mission History)",
      			false,
      		)),
      		anthropic.NewAssistantMessage(anthropic.NewTextBlock("I found 3 relevant documents about Mars rovers. Let me get more details from the Mars Exploration document.")),
      		{
      			Role: anthropic.MessageParamRoleUser,
      			Content: []anthropic.ContentBlockParamUnion{
      				{OfText: &anthropic.TextBlockParam{
      					Text:         "Yes, please tell me about the Perseverance rover specifically.",
      					CacheControl: anthropic.NewCacheControlEphemeralParam(),
      				}},
      			},
      		},
      	},
      })
      if err != nil {
      	log.Fatal(err)
      }
      fmt.Println(response.Usage.RawJSON())
      ```

      ```java Java
      import com.anthropic.models.messages.CacheControlEphemeral;
      // ...
      public class MultipleCacheBreakpointsExample {

        public static void main(String[] args) {
          AnthropicClient client = AnthropicOkHttpClient.fromEnv();

          // Search tool schema
          InputSchema searchSchema = InputSchema.builder()
            .properties(
              JsonValue.from(
                Map.of("query", Map.of("type", "string", "description", "Search query"))
              )
            )
            .putAdditionalProperty("required", JsonValue.from(List.of("query")))
            .build();

          // Get document tool schema
          InputSchema getDocSchema = InputSchema.builder()
            .properties(
              JsonValue.from(
                Map.of("doc_id", Map.of("type", "string", "description", "Document ID"))
              )
            )
            .putAdditionalProperty("required", JsonValue.from(List.of("doc_id")))
            .build();

          MessageCreateParams params = MessageCreateParams.builder()
            .model(Model.CLAUDE_OPUS_5)
            .maxTokens(1024)
            // Tools with cache control on the last one
            .addTool(
              Tool.builder()
                .name("search_documents")
                .description("Search through the knowledge base")
                .inputSchema(searchSchema)
                .build()
            )
            .addTool(
              Tool.builder()
                .name("get_document")
                .description("Retrieve a specific document by ID")
                .inputSchema(getDocSchema)
                .cacheControl(CacheControlEphemeral.builder().build())
                .build()
            )
            // System prompts with cache control on instructions and context separately
            .systemOfTextBlockParams(
              List.of(
                TextBlockParam.builder()
                  .text(
                    "You are a helpful research assistant with access to a document knowledge base.\n\n# Instructions\n- Always search for relevant documents before answering\n- Provide citations for your sources\n- Be objective and accurate in your responses\n- If multiple documents contain relevant information, synthesize them\n- Acknowledge when information is not available in the knowledge base"
                  )
                  .cacheControl(CacheControlEphemeral.builder().build())
                  .build(),
                TextBlockParam.builder()
                  .text(
                    "# Knowledge Base Context\n\nHere are the relevant documents for this conversation:\n\n## Document 1: Solar System Overview\nThe solar system consists of the Sun and all objects that orbit it...\n\n## Document 2: Planetary Characteristics\nEach planet has unique features. Mercury is the smallest planet...\n\n## Document 3: Mars Exploration\nMars has been a target of exploration for decades...\n\n[Additional documents...]"
                  )
                  .cacheControl(CacheControlEphemeral.builder().build())
                  .build()
              )
            )
            // Conversation history
            .addUserMessage("Can you search for information about Mars rovers?")
            .addAssistantMessageOfBlockParams(
              List.of(
                ContentBlockParam.ofToolUse(
                  ToolUseBlockParam.builder()
                    .id("tool_1")
                    .name("search_documents")
                    .input(JsonValue.from(Map.of("query", "Mars rovers")))
                    .build()
                )
              )
            )
            .addUserMessageOfBlockParams(
              List.of(
                ContentBlockParam.ofToolResult(
                  ToolResultBlockParam.builder()
                    .toolUseId("tool_1")
                    .content(
                      "Found 3 relevant documents: Document 3 (Mars Exploration), Document 7 (Rover Technology), Document 9 (Mission History)"
                    )
                    .build()
                )
              )
            )
            .addAssistantMessageOfBlockParams(
              List.of(
                ContentBlockParam.ofText(
                  TextBlockParam.builder()
                    .text(
                      "I found 3 relevant documents about Mars rovers. Let me get more details from the Mars Exploration document."
                    )
                    .build()
                )
              )
            )
            .addUserMessageOfBlockParams(
              List.of(
                ContentBlockParam.ofText(
                  TextBlockParam.builder()
                    .text("Yes, please tell me about the Perseverance rover specifically.")
                    .cacheControl(CacheControlEphemeral.builder().build())
                    .build()
                )
              )
            )
            .build();

          Message message = client.messages().create(params);
          System.out.println(message.usage());
        }
      }
      ```

      ```php PHP
      $client = new Client();

      $message = $client->messages->create(
          maxTokens: 1024,
          messages: [
              [
                  'role' => 'user',
                  'content' => 'Can you search for information about Mars rovers?'
              ],
              [
                  'role' => 'assistant',
                  'content' => [
                      [
                          'type' => 'tool_use',
                          'id' => 'tool_1',
                          'name' => 'search_documents',
                          'input' => ['query' => 'Mars rovers']
                      ]
                  ]
              ],
              [
                  'role' => 'user',
                  'content' => [
                      [
                          'type' => 'tool_result',
                          'tool_use_id' => 'tool_1',
                          'content' => 'Found 3 relevant documents: Document 3 (Mars Exploration), Document 7 (Rover Technology), Document 9 (Mission History)'
                      ]
                  ]
              ],
              [
                  'role' => 'assistant',
                  'content' => [
                      [
                          'type' => 'text',
                          'text' => 'I found 3 relevant documents about Mars rovers. Let me get more details from the Mars Exploration document.'
                      ]
                  ]
              ],
              [
                  'role' => 'user',
                  'content' => [
                      [
                          'type' => 'text',
                          'text' => 'Yes, please tell me about the Perseverance rover specifically.',
                          'cache_control' => ['type' => 'ephemeral']
                      ]
                  ]
              ]
          ],
          model: 'claude-opus-5',
          system: [
              [
                  'type' => 'text',
                  'text' => "You are a helpful research assistant with access to a document knowledge base.\n\n# Instructions\n- Always search for relevant documents before answering\n- Provide citations for your sources\n- Be objective and accurate in your responses\n- If multiple documents contain relevant information, synthesize them\n- Acknowledge when information is not available in the knowledge base",
                  'cache_control' => ['type' => 'ephemeral']
              ],
              [
                  'type' => 'text',
                  'text' => "# Knowledge Base Context\n\nHere are the relevant documents for this conversation:\n\n## Document 1: Solar System Overview\nThe solar system consists of the Sun and all objects that orbit it...\n\n## Document 2: Planetary Characteristics\nEach planet has unique features. Mercury is the smallest planet...\n\n## Document 3: Mars Exploration\nMars has been a target of exploration for decades...\n\n[Additional documents...]",
                  'cache_control' => ['type' => 'ephemeral']
              ]
          ],
          tools: [
              [
                  'name' => 'search_documents',
                  'description' => 'Search through the knowledge base',
                  'input_schema' => [
                      'type' => 'object',
                      'properties' => [
                          'query' => [
                              'type' => 'string',
                              'description' => 'Search query'
                          ]
                      ],
                      'required' => ['query']
                  ]
              ],
              [
                  'name' => 'get_document',
                  'description' => 'Retrieve a specific document by ID',
                  'input_schema' => [
                      'type' => 'object',
                      'properties' => [
                          'doc_id' => [
                              'type' => 'string',
                              'description' => 'Document ID'
                          ]
                      ],
                      'required' => ['doc_id']
                  ],
                  'cache_control' => ['type' => 'ephemeral']
              ]
          ],
      );

      echo json_encode($message->usage), PHP_EOL;
      ```

      ```ruby Ruby
      client = Anthropic::Client.new

      message = client.messages.create(
        model: "claude-opus-5",
        max_tokens: 1024,
        tools: [
          \{
            name: "search_documents",
            description: "Search through the knowledge base",
            input_schema: \{
              type: "object",
              properties: \{
                query: \{
                  type: "string",
                  description: "Search query"
                \}
              \},
              required: ["query"]
            \}
          \},
          \{
            name: "get_document",
            description: "Retrieve a specific document by ID",
            input_schema: \{
              type: "object",
              properties: \{
                doc_id: \{
                  type: "string",
                  description: "Document ID"
                \}
              \},
              required: ["doc_id"]
            \},
            cache_control: \{ type: "ephemeral" \}
          \}
        ],
        system: [
          \{
            type: "text",
            text: "You are a helpful research assistant with access to a document knowledge base.\n\n# Instructions\n- Always search for relevant documents before answering\n- Provide citations for your sources\n- Be objective and accurate in your responses\n- If multiple documents contain relevant information, synthesize them\n- Acknowledge when information is not available in the knowledge base",
            cache_control: \{ type: "ephemeral" \}
          \},
          \{
            type: "text",
            text: "# Knowledge Base Context\n\nHere are the relevant documents for this conversation:\n\n## Document 1: Solar System Overview\nThe solar system consists of the Sun and all objects that orbit it...\n\n## Document 2: Planetary Characteristics\nEach planet has unique features. Mercury is the smallest planet...\n\n## Document 3: Mars Exploration\nMars has been a target of exploration for decades...\n\n[Additional documents...]",
            cache_control: \{ type: "ephemeral" \}
          \}
        ],
        messages: [
          \{
            role: "user",
            content: "Can you search for information about Mars rovers?"
          \},
          \{
            role: "assistant",
            content: [
              \{
                type: "tool_use",
                id: "tool_1",
                name: "search_documents",
                input: \{ query: "Mars rovers" \}
              \}
            ]
          \},
          \{
            role: "user",
            content: [
              \{
                type: "tool_result",
                tool_use_id: "tool_1",
                content: "Found 3 relevant documents: Document 3 (Mars Exploration), Document 7 (Rover Technology), Document 9 (Mission History)"
              \}
            ]
          \},
          \{
            role: "assistant",
            content: [
              \{
                type: "text",
                text: "I found 3 relevant documents about Mars rovers. Let me get more details from the Mars Exploration document."
              \}
            ]
          \},
          \{
            role: "user",
            content: [
              \{
                type: "text",
                text: "Yes, please tell me about the Perseverance rover specifically.",
                cache_control: \{ type: "ephemeral" \}
              \}
            ]
          \}
        ]
      )
      puts message.usage
      ```

    This comprehensive example demonstrates how to use all 4 available cache breakpoints to optimize different parts of your prompt:

    1. **Tools cache** (cache breakpoint 1): The `cache_control` parameter on the last tool definition caches all tool definitions.

    2. **Reusable instructions cache** (cache breakpoint 2): The static instructions in the system prompt are cached separately. These instructions rarely change between requests.

    3. **RAG context cache** (cache breakpoint 3): The knowledge base documents are cached independently, allowing you to update the RAG documents without invalidating the tools or instructions cache.

    4. **Conversation history cache** (cache breakpoint 4): The final user message is marked with `cache_control` to enable incremental caching of the conversation as it progresses.

    This approach provides maximum flexibility:

    * If you append a new turn to the conversation without changing earlier content, all four cache segments are reused
    * If you update the RAG documents but keep the same tools and instructions, the first two cache segments are reused
    * If you change the conversation but keep the same tools, instructions, and documents, the first three segments are reused
    * Changes at any breakpoint invalidate that segment and everything after it, while earlier cached segments remain valid

    For the first request:

    * `input_tokens`: Minimal (tokens after the final cache breakpoint, near 0 in this example)
    * `cache_creation_input_tokens`: Tokens in all cached segments (tools + instructions + RAG documents + conversation history)
    * `cache_read_input_tokens`: 0 (no cache hits)

    For subsequent requests with only a new user message (and the fourth breakpoint moved to that new final message, as in the example):

    * `input_tokens`: Minimal (tokens after the final cache breakpoint, near 0 in this example)
    * `cache_creation_input_tokens`: Tokens in the new user message and the previous assistant turn (the new conversation segment being cached)
    * `cache_read_input_tokens`: All previously cached tokens (tools + instructions + RAG documents + previous conversation)

    This pattern is especially powerful for:

    * RAG applications with large document contexts
    * Agent systems that use multiple tools
    * Long-running conversations that need to maintain context
    * Applications that need to optimize different parts of the prompt independently
