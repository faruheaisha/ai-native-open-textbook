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
sourceRel: "docs/en/build-with-claude/handling-stop-reasons.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/build-with-claude/handling-stop-reasons.md"
sourceSha256: "efd90d3307adede99c65ae6faf26c590849b8ab2bf63e365825480e91855cdfd"
pageSha256: "f8193ba772fc8b2642c4d1ca49aedf4a89b4eb578ea8b96c7aa37152c1b006fe"
contentMode: "local-full"
zh: ""
---

## Stop reason values

### end\_turn

The most common stop reason. Indicates Claude finished its response naturally.

  ```bash cURL
  curl https://api.anthropic.com/v1/messages \
    -H "x-api-key: $ANTHROPIC_API_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -H "content-type: application/json" \
    -d '{
      "model": "claude-opus-5",
      "max_tokens": 1024,
      "messages": [{"role": "user", "content": "Hello!"}]
    }' | jq 'if .stop_reason == "end_turn" then (.content[] | select(.type == "text") | .text) else . end'
  ```

  ```bash CLI
  ant messages create \
    --model claude-opus-5 \
    --max-tokens 1024 \
    --message '{role: user, content: "Hello!"}' \
    --format json | jq 'if .stop_reason == "end_turn" then (.content[] | select(.type == "text") | .text) else . end'
  ```

  ```python Python
  client = anthropic.Anthropic()

  response = client.messages.create(
      model="claude-opus-5",
      max_tokens=1024,
      messages=[{"role": "user", "content": "Hello!"}],
  )
  if response.stop_reason == "end_turn":
      # Process the complete response
      for block in response.content:
          if block.type == "text":
              print(block.text)
  ```

  ```typescript TypeScript
  const client = new Anthropic();

  const response = await client.messages.create({
    model: "claude-opus-5",
    max_tokens: 1024,
    messages: [{ role: "user", content: "Hello!" }]
  });

  if (response.stop_reason === "end_turn") {
    // Process the complete response
    const textBlock = response.content.find(
      (block): block is Anthropic.TextBlock => block.type === "text"
    );
    console.log(textBlock?.text);
  }
  ```

  ```csharp C#
  AnthropicClient client = new();

  var response = await client.Messages.Create(new MessageCreateParams
  {
      Model = Model.ClaudeOpus5,
      MaxTokens = 1024,
      Messages = [new() { Role = Role.User, Content = "Hello!" }]
  });

  if (response.StopReason == "end_turn")
  {
      // Process the complete response
      foreach (var block in response.Content)
      {
          if (block.TryPickText(out var textBlock))
          {
              Console.WriteLine(textBlock.Text);
          }
      }
  }
  ```

  ```go Go
  client := anthropic.NewClient()

  response, err := client.Messages.New(context.TODO(), anthropic.MessageNewParams{
  	Model:     anthropic.ModelClaudeOpus5,
  	MaxTokens: 1024,
  	Messages: []anthropic.MessageParam{
  		anthropic.NewUserMessage(anthropic.NewTextBlock("Hello!")),
  	},
  })
  if err != nil {
  	log.Fatal(err)
  }

  if response.StopReason == "end_turn" {
  	// Process the complete response
  	for _, block := range response.Content {
  		if textBlock, ok := block.AsAny().(anthropic.TextBlock); ok {
  			fmt.Println(textBlock.Text)
  		}
  	}
  }
  ```

  ```java Java
  AnthropicClient client = AnthropicOkHttpClient.fromEnv();

  Message response = client.messages().create(
      MessageCreateParams.builder()
          .model(Model.CLAUDE_OPUS_5)
          .maxTokens(1024L)
          .addUserMessage("Hello!")
          .build()
  );

  if (response.stopReason().map(StopReason.END_TURN::equals).orElse(false)) {
      // Process the complete response
      response.content().stream()
          .flatMap(block -> block.text().stream())
          .forEach(textBlock -> IO.println(textBlock.text()));
  }
  ```

  ```php PHP
  $client = new Client();

  $response = $client->messages->create(
      maxTokens: 1024,
      messages: [['role' => 'user', 'content' => 'Hello!']],
      model: 'claude-opus-5',
  );

  if ($response->stopReason === 'end_turn') {
      // Process the complete response
      foreach ($response->content as $block) {
          if ($block->type === 'text') {
              echo $block->text, PHP_EOL;
          }
      }
  }
  ```

  ```ruby Ruby
  client = Anthropic::Client.new

  response = client.messages.create(
    model: "claude-opus-5",
    max_tokens: 1024,
    messages: [{ role: "user", content: "Hello!" }]
  )

  if response.stop_reason == :end_turn
    # Process the complete response
    response.content.each do |block|
      puts block.text if block.type == :text
    end
  end
  ```

  Sometimes Claude returns an empty response (exactly 2–3 tokens with no content) with `stop_reason: "end_turn"`. This typically occurs when Claude interprets that the assistant turn is complete, particularly after tool results.

  **Common causes:**

  * Adding text blocks immediately after tool results (Claude learns to expect the user to always insert text after tool results, so it ends its turn to follow the pattern)
  * Sending Claude's completed response back without adding anything (Claude already determined it's done, so it will remain done)

  **How to prevent empty responses:**

    ```python Python
    # INCORRECT: Adding text immediately after tool_result
    messages = [
        \{"role": "user", "content": "Calculate the sum of 1234 and 5678"\},
        \{
            "role": "assistant",
            "content": [
                \{
                    "type": "tool_use",
                    "id": "toolu_123",
                    "name": "calculator",
                    "input": \{"operation": "add", "a": 1234, "b": 5678\},
                \}
            ],
        \},
        \{
            "role": "user",
            "content": [
                \{"type": "tool_result", "tool_use_id": "toolu_123", "content": "6912"\},
                \{
                    "type": "text",
                    "text": "Here's the result",  # Don't add text after tool_result
                \},
            ],
        \},
    ]

    # CORRECT: Send tool results directly without additional text
    messages = [
        \{"role": "user", "content": "Calculate the sum of 1234 and 5678"\},
        \{
            "role": "assistant",
            "content": [
                \{
                    "type": "tool_use",
                    "id": "toolu_123",
                    "name": "calculator",
                    "input": \{"operation": "add", "a": 1234, "b": 5678\},
                \}
            ],
        \},
        \{
            "role": "user",
            "content": [
                \{"type": "tool_result", "tool_use_id": "toolu_123", "content": "6912"\}
            ],
        \},  # Just the tool_result, no additional text
    ]
    ```

    ```typescript TypeScript
    // INCORRECT: Adding text immediately after tool_result
    let messages: Anthropic.MessageParam[] = [
      \{ role: "user", content: "Calculate the sum of 1234 and 5678" \},
      \{
        role: "assistant",
        content: [
          \{
            type: "tool_use",
            id: "toolu_123",
            name: "calculator",
            input: \{ operation: "add", a: 1234, b: 5678 \}
          \}
        ]
      \},
      \{
        role: "user",
        content: [
          \{ type: "tool_result", tool_use_id: "toolu_123", content: "6912" \},
          \{ type: "text", text: "Here's the result" \} // Don't add text after tool_result
        ]
      \}
    ];

    // CORRECT: Send tool results directly without additional text
    messages = [
      \{ role: "user", content: "Calculate the sum of 1234 and 5678" \},
      \{
        role: "assistant",
        content: [
          \{
            type: "tool_use",
            id: "toolu_123",
            name: "calculator",
            input: \{ operation: "add", a: 1234, b: 5678 \}
          \}
        ]
      \},
      \{
        role: "user",
        // Just the tool_result, no additional text
        content: [\{ type: "tool_result", tool_use_id: "toolu_123", content: "6912" \}]
      \}
    ];
    ```

    ```csharp C#
    using System.Text.Json;
    using Anthropic.Models.Messages;

    var input = JsonSerializer.Deserialize&lt;Dictionary&lt;string, JsonElement>>(
        """\{"operation":"add","a":1234,"b":5678\}"""
    )!;

    // INCORRECT: Adding text immediately after tool_result
    List&lt;MessageParam> messages =
    [
        new() \{ Role = Role.User, Content = "Calculate the sum of 1234 and 5678" \},
        new()
        \{
            Role = Role.Assistant,
            Content = new List&lt;ContentBlockParam>
            \{
                new ToolUseBlockParam \{ ID = "toolu_123", Name = "calculator", Input = input \}
            \}
        \},
        new()
        \{
            Role = Role.User,
            Content = new List&lt;ContentBlockParam>
            \{
                new ToolResultBlockParam \{ ToolUseID = "toolu_123", Content = "6912" \},
                new TextBlockParam \{ Text = "Here's the result" \} // Don't add text after tool_result
            \}
        \}
    ];

    // CORRECT: Send tool results directly without additional text
    messages =
    [
        new() \{ Role = Role.User, Content = "Calculate the sum of 1234 and 5678" \},
        new()
        \{
            Role = Role.Assistant,
            Content = new List&lt;ContentBlockParam>
            \{
                new ToolUseBlockParam \{ ID = "toolu_123", Name = "calculator", Input = input \}
            \}
        \},
        new()
        \{
            Role = Role.User,
            // Just the tool_result, no additional text
            Content = new List&lt;ContentBlockParam>
            \{
                new ToolResultBlockParam \{ ToolUseID = "toolu_123", Content = "6912" \}
            \}
        \}
    ];
    ```

    ```go Go
    input := map[string]any\{"operation": "add", "a": 1234, "b": 5678\}

    // INCORRECT: Adding text immediately after tool_result
    messages := []anthropic.MessageParam\{
    	anthropic.NewUserMessage(anthropic.NewTextBlock("Calculate the sum of 1234 and 5678")),
    	anthropic.NewAssistantMessage(
    		anthropic.NewToolUseBlock("toolu_123", input, "calculator"),
    	),
    	anthropic.NewUserMessage(
    		anthropic.NewToolResultBlock("toolu_123", "6912", false),
    		anthropic.NewTextBlock("Here's the result"), // Don't add text after tool_result
    	),
    \}

    // CORRECT: Send tool results directly without additional text
    messages = []anthropic.MessageParam\{
    	anthropic.NewUserMessage(anthropic.NewTextBlock("Calculate the sum of 1234 and 5678")),
    	anthropic.NewAssistantMessage(
    		anthropic.NewToolUseBlock("toolu_123", input, "calculator"),
    	),
    	// Just the tool_result, no additional text
    	anthropic.NewUserMessage(
    		anthropic.NewToolResultBlock("toolu_123", "6912", false),
    	),
    \}
    ```

    ```java Java
    ToolUseBlockParam toolUse = ToolUseBlockParam.builder()
        .id("toolu_123")
        .name("calculator")
        .input(ToolUseBlockParam.Input.builder()
            .putAdditionalProperty("operation", JsonValue.from("add"))
            .putAdditionalProperty("a", JsonValue.from(1234))
            .putAdditionalProperty("b", JsonValue.from(5678))
            .build())
        .build();

    // INCORRECT: Adding text immediately after tool_result
    List&lt;MessageParam> messages = List.of(
        MessageParam.builder().role(MessageParam.Role.USER)
            .content("Calculate the sum of 1234 and 5678").build(),
        MessageParam.builder().role(MessageParam.Role.ASSISTANT)
            .contentOfBlockParams(List.of(ContentBlockParam.ofToolUse(toolUse))).build(),
        MessageParam.builder().role(MessageParam.Role.USER)
            .contentOfBlockParams(List.of(
                ContentBlockParam.ofToolResult(
                    ToolResultBlockParam.builder().toolUseId("toolu_123").content("6912").build()),
                // Don't add text after tool_result
                ContentBlockParam.ofText(TextBlockParam.builder().text("Here's the result").build())
            )).build()
    );

    // CORRECT: Send tool results directly without additional text
    messages = List.of(
        MessageParam.builder().role(MessageParam.Role.USER)
            .content("Calculate the sum of 1234 and 5678").build(),
        MessageParam.builder().role(MessageParam.Role.ASSISTANT)
            .contentOfBlockParams(List.of(ContentBlockParam.ofToolUse(toolUse))).build(),
        // Just the tool_result, no additional text
        MessageParam.builder().role(MessageParam.Role.USER)
            .contentOfBlockParams(List.of(
                ContentBlockParam.ofToolResult(
                    ToolResultBlockParam.builder().toolUseId("toolu_123").content("6912").build())
            )).build()
    );
    ```

    ```php PHP
    // INCORRECT: Adding text immediately after tool_result
    $messages = [
        ['role' => 'user', 'content' => 'Calculate the sum of 1234 and 5678'],
        [
            'role' => 'assistant',
            'content' => [
                [
                    'type' => 'tool_use',
                    'id' => 'toolu_123',
                    'name' => 'calculator',
                    'input' => ['operation' => 'add', 'a' => 1234, 'b' => 5678],
                ],
            ],
        ],
        [
            'role' => 'user',
            'content' => [
                ['type' => 'tool_result', 'tool_use_id' => 'toolu_123', 'content' => '6912'],
                // Don't add text after tool_result
                ['type' => 'text', 'text' => "Here's the result"],
            ],
        ],
    ];

    // CORRECT: Send tool results directly without additional text
    $messages = [
        ['role' => 'user', 'content' => 'Calculate the sum of 1234 and 5678'],
        [
            'role' => 'assistant',
            'content' => [
                [
                    'type' => 'tool_use',
                    'id' => 'toolu_123',
                    'name' => 'calculator',
                    'input' => ['operation' => 'add', 'a' => 1234, 'b' => 5678],
                ],
            ],
        ],
        [
            'role' => 'user',
            // Just the tool_result, no additional text
            'content' => [
                ['type' => 'tool_result', 'tool_use_id' => 'toolu_123', 'content' => '6912'],
            ],
        ],
    ];
    ```

    ```ruby Ruby
    # INCORRECT: Adding text immediately after tool_result
    messages = [
      \{ role: "user", content: "Calculate the sum of 1234 and 5678" \},
      \{
        role: "assistant",
        content: [
          \{
            type: "tool_use",
            id: "toolu_123",
            name: "calculator",
            input: \{ operation: "add", a: 1234, b: 5678 \}
          \}
        ]
      \},
      \{
        role: "user",
        content: [
          \{ type: "tool_result", tool_use_id: "toolu_123", content: "6912" \},
          # Don't add text after tool_result
          \{ type: "text", text: "Here's the result" \}
        ]
      \}
    ]

    # CORRECT: Send tool results directly without additional text
    messages = [
      \{ role: "user", content: "Calculate the sum of 1234 and 5678" \},
      \{
        role: "assistant",
        content: [
          \{
            type: "tool_use",
            id: "toolu_123",
            name: "calculator",
            input: \{ operation: "add", a: 1234, b: 5678 \}
          \}
        ]
      \},
      \{
        role: "user",
        # Just the tool_result, no additional text
        content: [
          \{ type: "tool_result", tool_use_id: "toolu_123", content: "6912" \}
        ]
      \}
    ]
    ```

  If you still get empty responses after fixing the message structure, add a continuation prompt in a new user message rather than retrying with the empty response:

    ```python Python
    def handle_empty_response(client, messages):
        response = client.messages.create(
            model="claude-opus-5", max_tokens=1024, messages=messages
        )

        # Check if response is empty
        if response.stop_reason == "end_turn" and not response.content:
            # INCORRECT: Don't just retry with the empty response
            # This won't work because Claude already decided it's done

            # CORRECT: Add a continuation prompt in a NEW user message
            messages.append(\{"role": "user", "content": "Please continue"\})

            response = client.messages.create(
                model="claude-opus-5", max_tokens=1024, messages=messages
            )

        return response
    ```

    ```typescript TypeScript
    async function handleEmptyResponse(
      client: Anthropic,
      messages: Anthropic.MessageParam[]
    ): Promise&lt;Anthropic.Message> \{
      let response = await client.messages.create(\{
        model: "claude-opus-5",
        max_tokens: 1024,
        messages
      \});

      // Check if response is empty
      if (response.stop_reason === "end_turn" && response.content.length === 0) \{
        // INCORRECT: Don't just retry with the empty response
        // This won't work because Claude already decided it's done

        // CORRECT: Add a continuation prompt in a NEW user message
        messages.push(\{ role: "user", content: "Please continue" \});

        response = await client.messages.create(\{
          model: "claude-opus-5",
          max_tokens: 1024,
          messages
        \});
      \}

      return response;
    \}
    ```

    ```csharp C#
    static async Task&lt;Message> HandleEmptyResponse(AnthropicClient client, List&lt;MessageParam> messages)
    \{
        var response = await client.Messages.Create(new MessageCreateParams
        \{
            Model = Model.ClaudeOpus5,
            MaxTokens = 1024,
            Messages = messages
        \});

        // Check if response is empty
        if (response.StopReason == "end_turn" && response.Content.Count == 0)
        \{
            // CORRECT: Add a continuation prompt in a NEW user message
            messages.Add(new() \{ Role = Role.User, Content = "Please continue" \});

            response = await client.Messages.Create(new MessageCreateParams
            \{
                Model = Model.ClaudeOpus5,
                MaxTokens = 1024,
                Messages = messages
            \});
        \}

        return response;
    \}
    ```

    ```go Go
    func handleEmptyResponse(client anthropic.Client, messages []anthropic.MessageParam) (*anthropic.Message, error) \{
    	response, err := client.Messages.New(context.TODO(), anthropic.MessageNewParams\{
    		Model:     anthropic.ModelClaudeOpus5,
    		MaxTokens: 1024,
    		Messages:  messages,
    	\})
    	if err != nil \{
    		return nil, err
    	\}

    	// Check if response is empty
    	if response.StopReason == "end_turn" && len(response.Content) == 0 \{
    		// CORRECT: Add a continuation prompt in a NEW user message
    		messages = append(messages, anthropic.NewUserMessage(anthropic.NewTextBlock("Please continue")))

    		response, err = client.Messages.New(context.TODO(), anthropic.MessageNewParams\{
    			Model:     anthropic.ModelClaudeOpus5,
    			MaxTokens: 1024,
    			Messages:  messages,
    		\})
    		if err != nil \{
    			return nil, err
    		\}
    	\}

    	return response, nil
    \}
    ```

    ```java Java
    static Message handleEmptyResponse(AnthropicClient client, List&lt;MessageParam> messages) \{
        Message response = client.messages().create(
            MessageCreateParams.builder()
                .model(Model.CLAUDE_OPUS_5)
                .maxTokens(1024L)
                .messages(messages)
                .build()
        );

        // Check if response is empty
        boolean isEndTurn = response.stopReason().map(StopReason.END_TURN::equals).orElse(false);
        if (isEndTurn && response.content().isEmpty()) \{
            // CORRECT: Add a continuation prompt in a NEW user message
            List&lt;MessageParam> extended = new ArrayList<>(messages);
            extended.add(MessageParam.builder()
                .role(MessageParam.Role.USER)
                .content("Please continue")
                .build());

            response = client.messages().create(
                MessageCreateParams.builder()
                    .model(Model.CLAUDE_OPUS_5)
                    .maxTokens(1024L)
                    .messages(extended)
                    .build()
            );
        \}

        return response;
    \}
    ```

    ```php PHP
    function handle_empty_response(Client $client, array $messages)
    \{
        $response = $client->messages->create(
            maxTokens: 1024,
            messages: $messages,
            model: 'claude-opus-5',
        );

        // Check if response is empty
        if ($response->stopReason === 'end_turn' && count($response->content) === 0) {
            // CORRECT: Add a continuation prompt in a NEW user message
            $messages[] = ['role' => 'user', 'content' => 'Please continue'];

            $response = $client->messages->create(
                maxTokens: 1024,
                messages: $messages,
                model: 'claude-opus-5',
            );
        }

        return $response;
    \}
    ```

    ```ruby Ruby
    def handle_empty_response(client, messages)
      response = client.messages.create(
        model: "claude-opus-5",
        max_tokens: 1024,
        messages: messages
      )

      # Check if response is empty
      if response.stop_reason == :end_turn && response.content.empty?
        # CORRECT: Add a continuation prompt in a NEW user message
        messages << \{ role: "user", content: "Please continue" \}

        response = client.messages.create(
          model: "claude-opus-5",
          max_tokens: 1024,
          messages: messages
        )
      end

      response
    end
    ```

  **Best practices:**

  1. **Never add text blocks immediately after tool results:** This teaches Claude to expect user input after every tool use.
  2. **Don't retry empty responses without modification:** Sending the empty response back won't help.
  3. **Use continuation prompts as a last resort:** Only if these fixes don't resolve the issue.

### max\_tokens

Claude stopped because it reached the `max_tokens` limit specified in your request.

  ```bash cURL
  curl https://api.anthropic.com/v1/messages \
    -H "x-api-key: $ANTHROPIC_API_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -H "content-type: application/json" \
    -d '{
      "model": "claude-opus-5",
      "max_tokens": 10,
      "messages": [{"role": "user", "content": "Explain quantum physics"}]
    }' | jq '.stop_reason'
  ```

  ```bash CLI
  ant messages create \
    --model claude-opus-5 \
    --max-tokens 10 \
    --message '{role: user, content: "Explain quantum physics"}' \
    --format json | jq '.stop_reason'
  ```

  ```python Python
  client = anthropic.Anthropic()
  # Request with limited tokens
  response = client.messages.create(
      model="claude-opus-5",
      max_tokens=10,
      messages=[{"role": "user", "content": "Explain quantum physics"}],
  )

  if response.stop_reason == "max_tokens":
      # Response was truncated
      print("Response was cut off at token limit")
      # Consider making another request to continue
  ```

  ```typescript TypeScript
  const client = new Anthropic();

  // Request with limited tokens
  const response = await client.messages.create({
    model: "claude-opus-5",
    max_tokens: 10,
    messages: [{ role: "user", content: "Explain quantum physics" }]
  });

  if (response.stop_reason === "max_tokens") {
    // Response was truncated
    console.log("Response was cut off at token limit");
    // Consider making another request to continue
  }
  ```

  ```csharp C#
  AnthropicClient client = new();

  // Request with limited tokens
  var response = await client.Messages.Create(new MessageCreateParams
  {
      Model = Model.ClaudeOpus5,
      MaxTokens = 10,
      Messages = [new() { Role = Role.User, Content = "Explain quantum physics" }]
  });

  if (response.StopReason == "max_tokens")
  {
      // Response was truncated
      Console.WriteLine("Response was cut off at token limit");
      // Consider making another request to continue
  }
  ```

  ```go Go
  client := anthropic.NewClient()

  // Request with limited tokens
  response, err := client.Messages.New(context.TODO(), anthropic.MessageNewParams{
  	Model:     anthropic.ModelClaudeOpus5,
  	MaxTokens: 10,
  	Messages: []anthropic.MessageParam{
  		anthropic.NewUserMessage(anthropic.NewTextBlock("Explain quantum physics")),
  	},
  })
  if err != nil {
  	log.Fatal(err)
  }

  if response.StopReason == "max_tokens" {
  	// Response was truncated
  	fmt.Println("Response was cut off at token limit")
  	// Consider making another request to continue
  }
  ```

  ```java Java
  AnthropicClient client = AnthropicOkHttpClient.fromEnv();

  // Request with limited tokens
  Message response = client.messages().create(
      MessageCreateParams.builder()
          .model(Model.CLAUDE_OPUS_5)
          .maxTokens(10L)
          .addUserMessage("Explain quantum physics")
          .build()
  );

  if (response.stopReason().map(StopReason.MAX_TOKENS::equals).orElse(false)) {
      // Response was truncated
      IO.println("Response was cut off at token limit");
      // Consider making another request to continue
  }
  ```

  ```php PHP
  $client = new Client();

  // Request with limited tokens
  $response = $client->messages->create(
      maxTokens: 10,
      messages: [['role' => 'user', 'content' => 'Explain quantum physics']],
      model: 'claude-opus-5',
  );

  if ($response->stopReason === 'max_tokens') {
      // Response was truncated
      echo 'Response was cut off at token limit', PHP_EOL;
      // Consider making another request to continue
  }
  ```

  ```ruby Ruby
  client = Anthropic::Client.new

  # Request with limited tokens
  response = client.messages.create(
    model: "claude-opus-5",
    max_tokens: 10,
    messages: [{ role: "user", content: "Explain quantum physics" }]
  )

  if response.stop_reason == :max_tokens
    # Response was truncated
    puts "Response was cut off at token limit"
    # Consider making another request to continue
  end
  ```

  If Claude's response is cut off because it hit the `max_tokens` limit, and the truncated response contains an incomplete tool use block, you'll need to retry the request with a higher `max_tokens` value to get the full tool use.

    ```bash CLI
    RESPONSE=$(ant messages create --max-tokens 1024 --format jsonl < request.yaml)

    # Check if the response was truncated mid tool use
    STOP_REASON=$(jq -r '.stop_reason' <<<"$RESPONSE")
    LAST_TYPE=$(jq -r '.content[-1].type' <<<"$RESPONSE")
    if [ "$STOP_REASON" = "max_tokens" ] && [ "$LAST_TYPE" = "tool_use" ]; then
      # Retry with a higher max_tokens
      ant messages create --max-tokens 4096 < request.yaml
    fi
    ```

    ```python Python
    # Check if response was truncated during tool use
    if response.stop_reason == "max_tokens":
        # Check if the last content block is an incomplete tool_use
        last_block = response.content[-1]
        if last_block.type == "tool_use":
            # Send the request with higher max_tokens
            response = client.messages.create(
                model="claude-opus-5",
                max_tokens=4096,  # Increased limit
                messages=messages,
                tools=tools,
            )
    ```

    ```typescript TypeScript
    // Check if response was truncated during tool use
    if (response.stop_reason === "max_tokens") {
      // Check if the last content block is an incomplete tool_use
      const lastBlock = response.content[response.content.length - 1];
      if (lastBlock.type === "tool_use") {
        // Send the request with higher max_tokens
        response = await client.messages.create({
          model: "claude-opus-5",
          max_tokens: 4096, // Increased limit
          messages: messages,
          tools: tools
        });
      }
    }
    ```

    ```csharp C#
    using System.Linq;
    using Anthropic;
    using Anthropic.Models.Messages;

    AnthropicClient client = new();

    var parameters = new MessageCreateParams
    {
        Model = Model.ClaudeOpus5,
        MaxTokens = 1024,
        Messages = messages,
        Tools = tools
    };

    var response = await client.Messages.Create(parameters);

    if (response.StopReason == "max_tokens")
    {
        var lastBlock = response.Content.Last();
        if (lastBlock.TryPickToolUse(out _))
        {
            response = await client.Messages.Create(parameters with { MaxTokens = 4096 });
        }
    }
    ```

    ```go Go
    response, err := client.Messages.New(context.TODO(), anthropic.MessageNewParams{
    	Model:     anthropic.ModelClaudeOpus5,
    	MaxTokens: 1024,
    	Messages:  messages,
    	Tools:     tools,
    })
    if err != nil {
    	log.Fatal(err)
    }

    if response.StopReason == "max_tokens" {
    	lastBlock := response.Content[len(response.Content)-1]
    	switch lastBlock.AsAny().(type) {
    	case anthropic.ToolUseBlock:
    		response, err = client.Messages.New(context.TODO(), anthropic.MessageNewParams{
    			Model:     anthropic.ModelClaudeOpus5,
    			MaxTokens: 4096,
    			Messages:  messages,
    			Tools:     tools,
    		})
    		if err != nil {
    			log.Fatal(err)
    		}
    	}
    }
    ```

    ```java Java
    // Check if response was truncated during tool use
    if (response.stopReason().isPresent() && response.stopReason().get().equals(StopReason.MAX_TOKENS)) {
        ContentBlock lastBlock = response.content().get(response.content().size() - 1);
        if (lastBlock.toolUse().isPresent()) {
            // Send the request with higher max_tokens
            response = client.messages().create(
                MessageCreateParams.builder()
                    .model(Model.CLAUDE_OPUS_5)
                    .maxTokens(4096L) // Increased limit
                    .messages(messages)
                    .tools(tools)
                    .build()
            );
        }
    }
    ```

    ```php PHP
    $response = $client->messages->create(
        maxTokens: 1024,
        messages: $messages,
        model: 'claude-opus-5',
        tools: $tools,
    );

    if ($response->stopReason === 'max_tokens') \{
        $lastBlock = end($response->content);
        if ($lastBlock->type === 'tool_use') {
            $response = $client->messages->create(
                maxTokens: 4096,
                messages: $messages,
                model: 'claude-opus-5',
                tools: $tools,
            );
        \}
    \}
    ```

    ```ruby Ruby
    response = client.messages.create(
      model: "claude-opus-5",
      max_tokens: 1024,
      messages: messages,
      tools: tools
    )

    if response.stop_reason == :max_tokens
      last_block = response.content.last
      if last_block.type == :tool_use
        response = client.messages.create(
          model: "claude-opus-5",
          max_tokens: 4096,
          messages: messages,
          tools: tools
        )
      end
    end
    ```

### stop\_sequence

Claude encountered one of your custom stop sequences.

  ```bash cURL
  curl https://api.anthropic.com/v1/messages \
    -H "x-api-key: $ANTHROPIC_API_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -H "content-type: application/json" \
    -d '{
      "model": "claude-opus-5",
      "max_tokens": 1024,
      "stop_sequences": ["END", "STOP"],
      "messages": [{"role": "user", "content": "Generate text until you say END"}]
    }' | jq '{stop_reason, stop_sequence}'
  ```

  ```bash CLI
  ant messages create \
    --model claude-opus-5 \
    --max-tokens 1024 \
    --stop-sequence END --stop-sequence STOP \
    --message '{role: user, content: "Generate text until you say END"}' \
    --format json | jq '{stop_reason, stop_sequence}'
  ```

  ```python Python
  client = anthropic.Anthropic()
  response = client.messages.create(
      model="claude-opus-5",
      max_tokens=1024,
      stop_sequences=["END", "STOP"],
      messages=[{"role": "user", "content": "Generate text until you say END"}],
  )

  if response.stop_reason == "stop_sequence":
      print(f"Stopped at sequence: {response.stop_sequence}")
  ```

  ```typescript TypeScript
  const client = new Anthropic();

  const response = await client.messages.create({
    model: "claude-opus-5",
    max_tokens: 1024,
    stop_sequences: ["END", "STOP"],
    messages: [{ role: "user", content: "Generate text until you say END" }]
  });

  if (response.stop_reason === "stop_sequence") {
    console.log(`Stopped at sequence: ${response.stop_sequence}`);
  }
  ```

  ```csharp C#
  AnthropicClient client = new();

  var response = await client.Messages.Create(new MessageCreateParams
  {
      Model = Model.ClaudeOpus5,
      MaxTokens = 1024,
      StopSequences = ["END", "STOP"],
      Messages = [new() { Role = Role.User, Content = "Generate text until you say END" }]
  });

  if (response.StopReason == "stop_sequence")
  {
      Console.WriteLine($"Stopped at sequence: {response.StopSequence}");
  }
  ```

  ```go Go
  client := anthropic.NewClient()

  response, err := client.Messages.New(context.TODO(), anthropic.MessageNewParams{
  	Model:         anthropic.ModelClaudeOpus5,
  	MaxTokens:     1024,
  	StopSequences: []string{"END", "STOP"},
  	Messages: []anthropic.MessageParam{
  		anthropic.NewUserMessage(anthropic.NewTextBlock("Generate text until you say END")),
  	},
  })
  if err != nil {
  	log.Fatal(err)
  }

  if response.StopReason == "stop_sequence" {
  	fmt.Printf("Stopped at sequence: %s\n", response.StopSequence)
  }
  ```

  ```java Java
  AnthropicClient client = AnthropicOkHttpClient.fromEnv();

  Message response = client.messages().create(
      MessageCreateParams.builder()
          .model(Model.CLAUDE_OPUS_5)
          .maxTokens(1024L)
          .addStopSequence("END")
          .addStopSequence("STOP")
          .addUserMessage("Generate text until you say END")
          .build()
  );

  if (response.stopReason().map(StopReason.STOP_SEQUENCE::equals).orElse(false)) {
      IO.println("Stopped at sequence: " + response.stopSequence().orElse(""));
  }
  ```

  ```php PHP
  $client = new Client();

  $response = $client->messages->create(
      maxTokens: 1024,
      messages: [['role' => 'user', 'content' => 'Generate text until you say END']],
      model: 'claude-opus-5',
      stopSequences: ['END', 'STOP'],
  );

  if ($response->stopReason === 'stop_sequence') {
      echo "Stopped at sequence: {$response->stopSequence}", PHP_EOL;
  }
  ```

  ```ruby Ruby
  client = Anthropic::Client.new

  response = client.messages.create(
    model: "claude-opus-5",
    max_tokens: 1024,
    stop_sequences: ["END", "STOP"],
    messages: [{ role: "user", content: "Generate text until you say END" }]
  )

  if response.stop_reason == :stop_sequence
    puts "Stopped at sequence: #{response.stop_sequence}"
  end
  ```

### tool\_use

Claude is calling a tool and expects you to run it.

  For most tool use implementations, use the [tool runner](https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-runner), which automatically handles tool execution, result formatting, and conversation management.

  ```bash cURL
  curl https://api.anthropic.com/v1/messages \
    -H "x-api-key: $ANTHROPIC_API_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -H "content-type: application/json" \
    -d '{
      "model": "claude-opus-5",
      "max_tokens": 1024,
      "tools": [{
        "name": "get_weather",
        "description": "Get the current weather in a given location",
        "input_schema": {
          "type": "object",
          "properties": {"location": {"type": "string", "description": "City and state"}},
          "required": ["location"]
        }
      }],
      "messages": [{"role": "user", "content": "What is the weather in San Francisco?"}]
    }' | jq '.stop_reason, (.content[] | select(.type == "tool_use"))'
  ```

  ```bash CLI
  ant messages create --format json <<'YAML' | jq '.stop_reason, (.content[] | select(.type == "tool_use"))'
  model: claude-opus-5
  max_tokens: 1024
  messages:
    - role: user
      content: What is the weather in San Francisco?
  tools:
    - name: get_weather
      description: Get the current weather in a given location
      input_schema:
        type: object
        properties:
          location: {type: string, description: City and state}
        required: [location]
  YAML
  ```

  ```python Python
  client = anthropic.Anthropic()
  weather_tool = {
      "name": "get_weather",
      "description": "Get the current weather in a given location",
      "input_schema": {
          "type": "object",
          "properties": {
              "location": {"type": "string", "description": "City and state"},
          },
          "required": ["location"],
      },
  }

  def execute_tool(name, tool_input):
      """Execute a tool and return the result."""
      return f"Weather in {tool_input.get('location', 'unknown')}: 72°F"

  response = client.messages.create(
      model="claude-opus-5",
      max_tokens=1024,
      tools=[weather_tool],
      messages=[{"role": "user", "content": "What is the weather in San Francisco?"}],
  )

  if response.stop_reason == "tool_use":
      # Extract and execute the tool
      for block in response.content:
          if block.type == "tool_use":
              result = execute_tool(block.name, block.input)
              # Return result to Claude for final response
  ```

  ```typescript TypeScript
  const client = new Anthropic();
  const weatherTool: Anthropic.Tool = {
    name: "get_weather",
    description: "Get the current weather in a given location",
    input_schema: {
      type: "object",
      properties: {
        location: { type: "string", description: "City and state" }
      },
      required: ["location"]
    }
  };

  function executeTool(name: string, input: Record<string, string>): string {
    return `Weather in ${input.location ?? "unknown"}: 72°F`;
  }

  const response = await client.messages.create({
    model: "claude-opus-5",
    max_tokens: 1024,
    tools: [weatherTool],
    messages: [{ role: "user", content: "What is the weather in San Francisco?" }]
  });

  if (response.stop_reason === "tool_use") {
    // Extract and execute the tool
    for (const block of response.content) {
      if (block.type === "tool_use") {
        const result = executeTool(block.name, block.input as Record<string, string>);
        // Return result to Claude for final response
      }
    }
  }
  ```

  ```csharp C#
  AnthropicClient client = new();

  var weatherTool = new Tool
  {
      Name = "get_weather",
      Description = "Get the current weather in a given location",
      InputSchema = new InputSchema
      {
          Properties = new Dictionary<string, JsonElement>
          {
              ["location"] = JsonSerializer.SerializeToElement(
                  new { type = "string", description = "City and state" }
              ),
          },
          Required = ["location"]
      }
  };

  var response = await client.Messages.Create(new MessageCreateParams
  {
      Model = Model.ClaudeOpus5,
      MaxTokens = 1024,
      Tools = [weatherTool],
      Messages = [new() { Role = Role.User, Content = "What is the weather in San Francisco?" }]
  });

  if (response.StopReason == "tool_use")
  {
      // Extract and execute the tool
      foreach (var block in response.Content)
      {
          if (block.TryPickToolUse(out var toolUse))
          {
              // Execute toolUse.Name with toolUse.Input and return the result to Claude
          }
      }
  }
  ```

  ```go Go
  client := anthropic.NewClient()

  weatherTool := anthropic.ToolParam{
  	Name:        "get_weather",
  	Description: anthropic.String("Get the current weather in a given location"),
  	InputSchema: anthropic.ToolInputSchemaParam{
  		Properties: map[string]any{
  			"location": map[string]string{"type": "string", "description": "City and state"},
  		},
  		Required: []string{"location"},
  	},
  }

  response, err := client.Messages.New(context.TODO(), anthropic.MessageNewParams{
  	Model:     anthropic.ModelClaudeOpus5,
  	MaxTokens: 1024,
  	Tools:     []anthropic.ToolUnionParam{{OfTool: &weatherTool}},
  	Messages: []anthropic.MessageParam{
  		anthropic.NewUserMessage(anthropic.NewTextBlock("What is the weather in San Francisco?")),
  	},
  })
  if err != nil {
  	log.Fatal(err)
  }

  if response.StopReason == "tool_use" {
  	// Extract and execute the tool
  	for _, block := range response.Content {
  		if toolUse, ok := block.AsAny().(anthropic.ToolUseBlock); ok {
  			fmt.Println(toolUse.Name, toolUse.Input)
  			// Return result to Claude for final response
  		}
  	}
  }
  ```

  ```java Java
  void main() {
      AnthropicClient client = AnthropicOkHttpClient.fromEnv();

      Tool weatherTool = Tool.builder()
          .name("get_weather")
          .description("Get the current weather in a given location")
          .inputSchema(Tool.InputSchema.builder()
              .properties(JsonValue.from(Map.of(
                  "location", Map.of("type", "string", "description", "City and state")
              )))
              .putAdditionalProperty("required", JsonValue.from(List.of("location")))
              .build())
          .build();

      Message response = client.messages().create(
          MessageCreateParams.builder()
              .model(Model.CLAUDE_OPUS_5)
              .maxTokens(1024L)
              .addTool(weatherTool)
              .addUserMessage("What is the weather in San Francisco?")
              .build()
      );

      if (response.stopReason().map(StopReason.TOOL_USE::equals).orElse(false)) {
          // Extract and execute the tool
          for (ContentBlock block : response.content()) {
              block.toolUse().ifPresent(toolUse -> {
                  // Execute toolUse.name() with toolUse.input() and return the result to Claude
              });
          }
      }
  ```

  ```php PHP
  $client = new Client();

  $weatherTool = [
      'name' => 'get_weather',
      'description' => 'Get the current weather in a given location',
      'input_schema' => [
          'type' => 'object',
          'properties' => [
              'location' => ['type' => 'string', 'description' => 'City and state'],
          ],
          'required' => ['location'],
      ],
  ];

  $response = $client->messages->create(
      maxTokens: 1024,
      messages: [['role' => 'user', 'content' => 'What is the weather in San Francisco?']],
      model: 'claude-opus-5',
      tools: [$weatherTool],
  );

  if ($response->stopReason === 'tool_use') {
      // Extract and execute the tool
      foreach ($response->content as $block) {
          if ($block->type === 'tool_use') {
              // Execute $block->name with $block->input and return the result to Claude
          }
      }
  }
  ```

  ```ruby Ruby
  client = Anthropic::Client.new

  weather_tool = {
    name: "get_weather",
    description: "Get the current weather in a given location",
    input_schema: {
      type: "object",
      properties: {
        location: { type: "string", description: "City and state" }
      },
      required: ["location"]
    }
  }

  response = client.messages.create(
    model: "claude-opus-5",
    max_tokens: 1024,
    tools: [weather_tool],
    messages: [{ role: "user", content: "What is the weather in San Francisco?" }]
  )

  if response.stop_reason == :tool_use
    # Extract and execute the tool
    response.content.each do |block|
      next unless block.type == :tool_use
      # Execute block.name with block.input and return the result to Claude
    end
  end
  ```

A `tool_use` response can also contain a `server_tool_use` block whose `id` has no matching result block. That server tool call is not finished, and this response does not carry its result. In the common case, Claude calls a [server tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/server-tools) and one of your client tools in the same group of parallel tool calls: the API returns without running the server tool so that you can run the client tools first. There is no other marker for the state; detect it by checking each `server_tool_use` or `mcp_tool_use` block's `id` for a matching result block.

  With [programmatic tool calling](https://platform.claude.com/docs/en/agents-and-tools/tool-use/programmatic-tool-calling), the same response shape means something different. The client `tool_use` block comes from code that is running in the `code_execution` tool rather than from Claude directly, and its `caller` field names the `code_execution` block that called it. That code has already started: it is paused waiting for your `tool_result` blocks, and sending them resumes the execution instead of starting a deferred tool. The `code_execution` block's own result block arrives once the code finishes, which can take more than one round of tool results. The follow-up user message itself is the same in both cases; with programmatic tool calling, also pass back the `id` from the response's `container` field, as that page shows.

```json A mixed tool_use response
{
  "stop_reason": "tool_use",
  "content": [
    {
      "type": "server_tool_use",
      "id": "srvtoolu_01HxbWnMRmbWyMfUtJKC45rA",
      "name": "web_search",
      "input": { "query": "example article" }
    },
    {
      "type": "tool_use",
      "id": "toolu_01PjgRJLbXrXEMZwDNYLnBqk",
      "name": "run_command",
      "input": { "command": "uname -a" }
    }
  ]
}
```

The continuation is a user message of `tool_result` blocks, one for every `tool_use` block in the response (see [Handle tool calls](https://platform.claude.com/docs/en/agents-and-tools/tool-use/handle-tool-calls)), with two extra rules: that message must contain nothing except the `tool_result` blocks, and the request must keep the same `tools` array. A resume request that no longer defines the waiting server tool fails with a 400 whose message ends ``but no `web_search` tool was provided``. The API attaches your results to the still-open assistant turn, runs the deferred server tool (for paused code execution, resumes it), and continues the turn. For a server tool Claude called directly, the next response's `content` starts with the result block that answers the previous response's `server_tool_use` `id`.

```json The follow-up user message
{
  "role": "user",
  "content": [
    {
      "type": "tool_result",
      "tool_use_id": "toolu_01PjgRJLbXrXEMZwDNYLnBqk",
      "content": "Linux demo-host 6.8.0-52-generic x86_64 GNU/Linux"
    }
  ]
}
```

Adding anything after the `tool_result` blocks in that user message, such as text, ends the assistant turn; for a server tool Claude called directly, the request then fails with a 400 `invalid_request_error` that names the unresolved server tool:

```text wrap
`web_search` tool use with id `srvtoolu_01HxbWnMRmbWyMfUtJKC45rA` was found without a corresponding `web_search_tool_result` block
```

Leaving out a `tool_result`, or putting one after other content, fails earlier with the standard `tool_use ids were found without tool_result blocks immediately after` error instead. To give Claude more input, send it as a separate user message after the turn completes.

### pause\_turn

Returned when the server-side sampling loop reaches its iteration limit while executing [server tools](https://platform.claude.com/docs/en/agents-and-tools/tool-use/server-tools) such as web search. The default limit is 10 iterations per request.

When this happens, the response may contain a `server_tool_use` block without a corresponding result block. To let Claude finish processing, continue the conversation by sending the response back as-is. A response that leaves a client `tool_use` block waiting on you never has a `stop_reason` of `pause_turn`: when Claude stops to call your tools, `stop_reason` is [`tool_use`](https://platform.claude.com/docs/en/build-with-claude/handling-stop-reasons#tool-use), and you continue it by sending the client `tool_result` blocks instead of the response itself.

  ```bash cURL
  # The SDKs handle continuation directly. With cURL, inspect stop_reason
  # on the response and re-POST with the assistant content appended.
  curl https://api.anthropic.com/v1/messages \
    -H "x-api-key: $ANTHROPIC_API_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -H "content-type: application/json" \
    -d '{
      "model": "claude-opus-5",
      "max_tokens": 4096,
      "tools": [{"type": "web_search_20250305", "name": "web_search"}],
      "messages": [{"role": "user", "content": "Search for latest AI news"}]
    }' | jq '{stop_reason, content}'
  ```

  ```bash CLI
  # Inspect stop_reason; if it is pause_turn, re-run with the assistant
  # response appended to --message.
  ant messages create --format json <<'YAML' | jq '{stop_reason, content}'
  model: claude-opus-5
  max_tokens: 4096
  tools:
    - {type: web_search_20250305, name: web_search}
  messages:
    - {role: user, content: "Search for latest AI news"}
  YAML
  ```

  ```python Python
  response = client.messages.create(
      model="claude-opus-5",
      max_tokens=4096,
      tools=[{"type": "web_search_20250305", "name": "web_search"}],
      messages=[{"role": "user", "content": "Search for latest AI news"}],
  )

  if response.stop_reason == "pause_turn":
      # Continue the conversation by sending the response back
      messages = [
          {"role": "user", "content": "Search for latest AI news"},
          {"role": "assistant", "content": response.content},
      ]
      continuation = client.messages.create(
          model="claude-opus-5",
          max_tokens=4096,
          messages=messages,
          tools=[{"type": "web_search_20250305", "name": "web_search"}],
      )
  ```

  ```typescript TypeScript
  const response = await client.messages.create({
    model: "claude-opus-5",
    max_tokens: 4096,
    tools: [{ type: "web_search_20250305", name: "web_search" }],
    messages: [{ role: "user", content: "Search for latest AI news" }]
  });

  if (response.stop_reason === "pause_turn") {
    // Continue the conversation by sending the response back
    const continuation = await client.messages.create({
      model: "claude-opus-5",
      max_tokens: 4096,
      tools: [{ type: "web_search_20250305", name: "web_search" }],
      messages: [
        { role: "user", content: "Search for latest AI news" },
        { role: "assistant", content: response.content }
      ]
    });
  }
  ```

  ```csharp C#
  List<ToolUnion> tools = [new ToolUnion(new WebSearchTool20250305())];
  MessageParam userMessage = new() { Role = Role.User, Content = "Search for latest AI news" };

  var response = await client.Messages.Create(new MessageCreateParams
  {
      Model = Model.ClaudeOpus5,
      MaxTokens = 4096,
      Tools = tools,
      Messages = [userMessage]
  });

  if (response.StopReason == "pause_turn")
  {
      // Continue the conversation by sending the response back
      var continuation = await client.Messages.Create(new MessageCreateParams
      {
          Model = Model.ClaudeOpus5,
          MaxTokens = 4096,
          Tools = tools,
          Messages =
          [
              userMessage,
              new()
              {
                  Role = Role.Assistant,
                  Content = response.Content.Select(block => new ContentBlockParam(block.Json)).ToList()
              }
          ]
      });
  }
  ```

  ```go Go
  tools := []anthropic.ToolUnionParam{
  	{OfWebSearchTool20250305: &anthropic.WebSearchTool20250305Param{}},
  }
  userMessage := anthropic.NewUserMessage(anthropic.NewTextBlock("Search for latest AI news"))

  response, err := client.Messages.New(context.TODO(), anthropic.MessageNewParams{
  	Model:     anthropic.ModelClaudeOpus5,
  	MaxTokens: 4096,
  	Tools:     tools,
  	Messages:  []anthropic.MessageParam{userMessage},
  })
  if err != nil {
  	log.Fatal(err)
  }

  if response.StopReason == "pause_turn" {
  	// Continue the conversation by sending the response back
  	var contentParams []anthropic.ContentBlockParamUnion
  	for _, block := range response.Content {
  		contentParams = append(contentParams, block.ToParam())
  	}
  	continuation, err := client.Messages.New(context.TODO(), anthropic.MessageNewParams{
  		Model:     anthropic.ModelClaudeOpus5,
  		MaxTokens: 4096,
  		Tools:     tools,
  		Messages:  []anthropic.MessageParam{userMessage, anthropic.NewAssistantMessage(contentParams...)},
  	})
  	if err != nil {
  		log.Fatal(err)
  	}
  	_ = continuation
  }
  ```

  ```java Java
  Message response = client.messages().create(
      MessageCreateParams.builder()
          .model(Model.CLAUDE_OPUS_5)
          .maxTokens(4096L)
          .addTool(WebSearchTool20250305.builder().build())
          .addUserMessage("Search for latest AI news")
          .build()
  );

  if (response.stopReason().map(StopReason.PAUSE_TURN::equals).orElse(false)) {
      // Continue the conversation by sending the response back
      Message continuation = client.messages().create(
          MessageCreateParams.builder()
              .model(Model.CLAUDE_OPUS_5)
              .maxTokens(4096L)
              .addTool(WebSearchTool20250305.builder().build())
              .addUserMessage("Search for latest AI news")
              .addMessage(response)
              .build()
      );
  }
  ```

  ```php PHP
  $tools = [['type' => 'web_search_20250305', 'name' => 'web_search']];
  $userMessage = ['role' => 'user', 'content' => 'Search for latest AI news'];

  $response = $client->messages->create(
      maxTokens: 4096,
      messages: [$userMessage],
      model: 'claude-opus-5',
      tools: $tools,
  );

  if ($response->stopReason === 'pause_turn') {
      // Continue the conversation by sending the response back
      $continuation = $client->messages->create(
          maxTokens: 4096,
          messages: [
              $userMessage,
              ['role' => 'assistant', 'content' => $response->content],
          ],
          model: 'claude-opus-5',
          tools: $tools,
      );
  }
  ```

  ```ruby Ruby
  tools = [{ type: "web_search_20250305", name: "web_search" }]
  user_message = { role: "user", content: "Search for latest AI news" }

  response = client.messages.create(
    model: "claude-opus-5",
    max_tokens: 4096,
    tools: tools,
    messages: [user_message]
  )

  if response.stop_reason == :pause_turn
    # Continue the conversation by sending the response back
    continuation = client.messages.create(
      model: "claude-opus-5",
      max_tokens: 4096,
      tools: tools,
      messages: [user_message, { role: "assistant", content: response.content }]
    )
  end
  ```

  Your application should handle `pause_turn` in any agent loop that uses server tools. Add the assistant's response to your messages array and make another API request to let Claude continue.

### refusal

Claude declined to generate a response. Safety classifiers return this stop reason as a normal HTTP 200 response, not an error.

  ```bash cURL
  curl https://api.anthropic.com/v1/messages \
    -H "x-api-key: $ANTHROPIC_API_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -H "content-type: application/json" \
    -d '{
      "model": "claude-opus-5",
      "max_tokens": 1024,
      "messages": [{"role": "user", "content": "[Unsafe request]"}]
    }' | jq '{stop_reason, stop_details}'
  ```

  ```bash CLI
  ant messages create \
    --model claude-opus-5 \
    --max-tokens 1024 \
    --message '{role: user, content: "[Unsafe request]"}' \
    --format json | jq '{stop_reason, stop_details}'
  ```

  ```python Python
  client = anthropic.Anthropic()
  response = client.messages.create(
      model="claude-opus-5",
      max_tokens=1024,
      messages=[{"role": "user", "content": "[Unsafe request]"}],
  )

  if response.stop_reason == "refusal":
      # Claude declined to respond
      print("Claude was unable to process this request")
      # Consider rephrasing or modifying the request
  ```

  ```typescript TypeScript
  const client = new Anthropic();

  const response = await client.messages.create({
    model: "claude-opus-5",
    max_tokens: 1024,
    messages: [{ role: "user", content: "[Unsafe request]" }]
  });

  if (response.stop_reason === "refusal") {
    // Claude declined to respond
    console.log("Claude was unable to process this request");
    // Consider rephrasing or modifying the request
  }
  ```

  ```csharp C#
  AnthropicClient client = new();

  var response = await client.Messages.Create(new MessageCreateParams
  {
      Model = Model.ClaudeOpus5,
      MaxTokens = 1024,
      Messages = [new() { Role = Role.User, Content = "[Unsafe request]" }]
  });

  if (response.StopReason == "refusal")
  {
      // Claude declined to respond
      Console.WriteLine("Claude was unable to process this request");
      // Consider rephrasing or modifying the request
  }
  ```

  ```go Go
  client := anthropic.NewClient()

  response, err := client.Messages.New(context.TODO(), anthropic.MessageNewParams{
  	Model:     anthropic.ModelClaudeOpus5,
  	MaxTokens: 1024,
  	Messages: []anthropic.MessageParam{
  		anthropic.NewUserMessage(anthropic.NewTextBlock("[Unsafe request]")),
  	},
  })
  if err != nil {
  	log.Fatal(err)
  }

  if response.StopReason == "refusal" {
  	// Claude declined to respond
  	fmt.Println("Claude was unable to process this request")
  	// Consider rephrasing or modifying the request
  }
  ```

  ```java Java
  AnthropicClient client = AnthropicOkHttpClient.fromEnv();

  Message response = client.messages().create(
      MessageCreateParams.builder()
          .model(Model.CLAUDE_OPUS_5)
          .maxTokens(1024L)
          .addUserMessage("[Unsafe request]")
          .build()
  );

  if (response.stopReason().map(StopReason.REFUSAL::equals).orElse(false)) {
      // Claude declined to respond
      IO.println("Claude was unable to process this request");
      // Consider rephrasing or modifying the request
  }
  ```

  ```php PHP
  $client = new Client();

  $response = $client->messages->create(
      maxTokens: 1024,
      messages: [['role' => 'user', 'content' => '[Unsafe request]']],
      model: 'claude-opus-5',
  );

  if ($response->stopReason === 'refusal') {
      // Claude declined to respond
      echo 'Claude was unable to process this request', PHP_EOL;
      // Consider rephrasing or modifying the request
  }
  ```

  ```ruby Ruby
  client = Anthropic::Client.new

  response = client.messages.create(
    model: "claude-opus-5",
    max_tokens: 1024,
    messages: [{ role: "user", content: "[Unsafe request]" }]
  )

  if response.stop_reason == :refusal
    # Claude declined to respond
    puts "Claude was unable to process this request"
    # Consider rephrasing or modifying the request
  end
  ```

  If you encounter `refusal` stop reasons frequently while using Claude Sonnet 4.5 or Claude Opus 4.1 (the latter [retired, except on Bedrock and Google Cloud](https://platform.claude.com/docs/en/about-claude/model-deprecations)), you can try updating your API calls to use Haiku 4.5 (`claude-haiku-4-5-20251001`), which has different usage restrictions. Learn more about [understanding Sonnet 4.5's API safety filters](https://support.claude.com/en/articles/12449294-understanding-sonnet-4-5-s-api-safety-filters).

On a refusal, the `stop_details` object identifies the policy category that triggered it. The categories and the full refusal response shape are covered on [Refusals and fallback](https://platform.claude.com/docs/en/build-with-claude/refusals-and-fallback#refusal-response). `stop_details` is `null` for all stop reasons other than `refusal`.

A refused request on Claude Fable 5.1, Claude Fable 5, or Claude Opus 5 can usually be served by retrying on another Claude model. [Refusals and fallback](https://platform.claude.com/docs/en/build-with-claude/refusals-and-fallback) shows how to set up that retry, server-side or in your client. If you build the retry yourself from Claude Fable 5.1, Claude Fable 5, or Claude Opus 5, [fallback credit](https://platform.claude.com/docs/en/build-with-claude/fallback-credit) covers how to avoid paying the prompt-cache cost twice.

### model\_context\_window\_exceeded

Claude stopped because it reached the model's context window limit. This lets you request the maximum possible tokens without knowing the exact input size.

  This stop reason is currently typed only in the SDKs' `beta` namespace, so the following examples call `client.beta.messages` and use the `Beta`-prefixed types. On Sonnet 4.5 and newer models the API returns this value without a beta header. For earlier models, add the `model-context-window-exceeded-2025-08-26` beta header to enable it.

  ```bash cURL
  curl https://api.anthropic.com/v1/messages \
    -H "x-api-key: $ANTHROPIC_API_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -H "content-type: application/json" \
    -d '{
      "model": "claude-opus-5",
      "max_tokens": 20000,
      "messages": [{"role": "user", "content": "Large input that uses most of context window..."}]
    }' | jq '.stop_reason'
  ```

  ```bash CLI
  ant messages create \
    --model claude-opus-5 \
    --max-tokens 20000 \
    --message '{role: user, content: "Large input that uses most of context window..."}' \
    --format json | jq '.stop_reason'
  ```

  ```python Python
  # Request with maximum tokens to get as much as possible
  response = client.beta.messages.create(
      model="claude-opus-5",
      max_tokens=20000,  # Python SDK requires streaming for max_tokens above ~21k
      messages=[
          {"role": "user", "content": "Large input that uses most of context window..."}
      ],
  )

  if response.stop_reason == "model_context_window_exceeded":
      # Response hit context window limit before max_tokens
      print("Response reached model's context window limit")
      # The response is still valid but was limited by context window
  ```

  ```typescript TypeScript
  // Request with maximum tokens to get as much as possible
  const response = await client.beta.messages.create({
    model: "claude-opus-5",
    max_tokens: 20000,
    messages: [{ role: "user", content: "Large input that uses most of context window..." }]
  });

  if (response.stop_reason === "model_context_window_exceeded") {
    // Response hit context window limit before max_tokens
    console.log("Response reached model's context window limit");
    // The response is still valid but was limited by context window
  }
  ```

  ```csharp C#
  using Anthropic.Models.Beta.Messages;
  using Model = Anthropic.Models.Messages.Model;

  // Request with maximum tokens to get as much as possible
  var response = await client.Beta.Messages.Create(new MessageCreateParams
  {
      Model = Model.ClaudeOpus5,
      MaxTokens = 20000,
      Messages = [new() { Role = Role.User, Content = "Large input that uses most of context window..." }]
  });

  if (response.StopReason?.Value() == BetaStopReason.ModelContextWindowExceeded)
  {
      // Response hit context window limit before max_tokens
      Console.WriteLine("Response reached model's context window limit");
      // The response is still valid but was limited by context window
  }
  ```

  ```go Go
  // Request with maximum tokens to get as much as possible
  response, err := client.Beta.Messages.New(context.TODO(), anthropic.BetaMessageNewParams{
  	Model:     anthropic.ModelClaudeOpus5,
  	MaxTokens: 20000,
  	Messages: []anthropic.BetaMessageParam{
  		anthropic.NewBetaUserMessage(anthropic.NewBetaTextBlock("Large input that uses most of context window...")),
  	},
  })
  if err != nil {
  	log.Fatal(err)
  }

  if response.StopReason == anthropic.BetaStopReasonModelContextWindowExceeded {
  	// Response hit context window limit before max_tokens
  	fmt.Println("Response reached model's context window limit")
  	// The response is still valid but was limited by context window
  }
  ```

  ```java Java
  import com.anthropic.models.beta.messages.BetaMessage;
  import com.anthropic.models.beta.messages.BetaStopReason;
  import com.anthropic.models.beta.messages.MessageCreateParams;

  // Request with maximum tokens to get as much as possible
  BetaMessage response = client.beta().messages().create(
      MessageCreateParams.builder()
          .model(Model.CLAUDE_OPUS_5)
          .maxTokens(20000L)
          .addUserMessage("Large input that uses most of context window...")
          .build()
  );

  if (response.stopReason().map(BetaStopReason.MODEL_CONTEXT_WINDOW_EXCEEDED::equals).orElse(false)) {
      // Response hit context window limit before max_tokens
      IO.println("Response reached model's context window limit");
      // The response is still valid but was limited by context window
  }
  ```

  ```php PHP
  // Request with maximum tokens to get as much as possible
  $response = $client->beta->messages->create(
      maxTokens: 20000,
      messages: [['role' => 'user', 'content' => 'Large input that uses most of context window...']],
      model: 'claude-opus-5',
  );

  if ($response->stopReason === 'model_context_window_exceeded') {
      // Response hit context window limit before max_tokens
      echo 'Response reached model\'s context window limit', PHP_EOL;
      // The response is still valid but was limited by context window
  }
  ```

  ```ruby Ruby
  # Request with maximum tokens to get as much as possible
  response = client.beta.messages.create(
    model: "claude-opus-5",
    max_tokens: 20000,
    messages: [{ role: "user", content: "Large input that uses most of context window..." }]
  )

  if response.stop_reason == :model_context_window_exceeded
    # Response hit context window limit before max_tokens
    puts "Response reached model's context window limit"
    # The response is still valid but was limited by context window
  end
  ```
