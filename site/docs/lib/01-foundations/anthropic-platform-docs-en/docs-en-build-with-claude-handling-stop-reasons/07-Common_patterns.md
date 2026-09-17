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
pageSha256: "9b010a6bae015a59fa199655bfcfa79466e1d4ca6a1e08dfa536ed927b106844"
contentMode: "local-full"
zh: ""
---

## Common patterns

### Handling tool use workflows

  **Simpler with tool runner:** The following example shows manual tool handling. For most use cases, the [tool runner](https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-runner) automatically handles tool execution with much less code.

  ```python Python
  def complete_tool_workflow(client, user_query, tools):
      messages = [{"role": "user", "content": user_query}]

      while True:
          response = client.messages.create(
              model="claude-opus-5", max_tokens=1024, messages=messages, tools=tools
          )

          if response.stop_reason == "tool_use":
              # Execute tools and continue
              tool_results = execute_tools(response.content)
              messages.append({"role": "assistant", "content": response.content})
              messages.append({"role": "user", "content": tool_results})
          else:
              # Final response
              return response
  ```

  ```typescript TypeScript
  async function completeToolWorkflow(
    client: Anthropic,
    userQuery: string,
    tools: Anthropic.ToolUnion[]
  ): Promise<Anthropic.Message> {
    const messages: Anthropic.MessageParam[] = [{ role: "user", content: userQuery }];

    while (true) {
      const response = await client.messages.create({
        model: "claude-opus-5",
        max_tokens: 1024,
        messages,
        tools
      });

      if (response.stop_reason === "tool_use") {
        // Execute tools and continue
        const toolResults = executeTools(response.content);
        messages.push({ role: "assistant", content: response.content });
        messages.push({ role: "user", content: toolResults });
      } else {
        // Final response
        return response;
      }
    }
  }
  ```

  ```csharp C#
  static async Task<Message> CompleteToolWorkflow(
      AnthropicClient client,
      string userQuery,
      List<ToolUnion> tools)
  {
      List<MessageParam> messages = [new() { Role = Role.User, Content = userQuery }];

      while (true)
      {
          var response = await client.Messages.Create(new MessageCreateParams
          {
              Model = Model.ClaudeOpus5,
              MaxTokens = 1024,
              Messages = messages,
              Tools = tools
          });

          if (response.StopReason == "tool_use")
          {
              // Execute tools and continue
              var toolResults = ExecuteTools(response.Content);
              messages.Add(new()
              {
                  Role = Role.Assistant,
                  Content = response.Content.Select(block => new ContentBlockParam(block.Json)).ToList()
              });
              messages.Add(new() { Role = Role.User, Content = toolResults });
          }
          else
          {
              // Final response
              return response;
          }
      }
  }
  ```

  ```go Go
  func completeToolWorkflow(
  	client anthropic.Client,
  	userQuery string,
  	tools []anthropic.ToolUnionParam,
  ) (*anthropic.Message, error) {
  	messages := []anthropic.MessageParam{anthropic.NewUserMessage(anthropic.NewTextBlock(userQuery))}

  	for {
  		response, err := client.Messages.New(context.TODO(), anthropic.MessageNewParams{
  			Model:     anthropic.ModelClaudeOpus5,
  			MaxTokens: 1024,
  			Messages:  messages,
  			Tools:     tools,
  		})
  		if err != nil {
  			return nil, err
  		}

  		if response.StopReason != "tool_use" {
  			// Final response
  			return response, nil
  		}

  		// Execute tools and continue
  		toolResults := executeTools(response.Content)
  		var contentParams []anthropic.ContentBlockParamUnion
  		for _, block := range response.Content {
  			contentParams = append(contentParams, block.ToParam())
  		}
  		messages = append(messages, anthropic.NewAssistantMessage(contentParams...))
  		messages = append(messages, anthropic.NewUserMessage(toolResults...))
  	}
  }
  ```

  ```java Java
  static Message completeToolWorkflow(
      AnthropicClient client,
      String userQuery,
      List<Tool> tools
  ) {
      List<MessageParam> messages = new ArrayList<>();
      messages.add(MessageParam.builder().role(MessageParam.Role.USER).content(userQuery).build());

      while (true) {
          MessageCreateParams.Builder params = MessageCreateParams.builder()
              .model(Model.CLAUDE_OPUS_5)
              .maxTokens(1024L)
              .messages(messages);
          tools.forEach(params::addTool);

          Message response = client.messages().create(params.build());

          if (!response.stopReason().map(StopReason.TOOL_USE::equals).orElse(false)) {
              // Final response
              return response;
          }

          // Execute tools and continue
          List<ToolResultBlockParam> toolResults = executeTools(response.content());
          messages.add(response.toParam());
          messages.add(MessageParam.builder()
              .role(MessageParam.Role.USER)
              .contentOfBlockParams(toolResults.stream().map(ContentBlockParam::ofToolResult).toList())
              .build());
      }
  }
  ```

  ```php PHP
  function complete_tool_workflow(Client $client, string $userQuery, array $tools)
  {
      $messages = [['role' => 'user', 'content' => $userQuery]];

      while (true) {
          $response = $client->messages->create(
              maxTokens: 1024,
              messages: $messages,
              model: 'claude-opus-5',
              tools: $tools,
          );

          if ($response->stopReason !== 'tool_use') {
              // Final response
              return $response;
          }

          // Execute tools and continue
          $toolResults = execute_tools($response->content);
          $messages[] = ['role' => 'assistant', 'content' => $response->content];
          $messages[] = ['role' => 'user', 'content' => $toolResults];
      }
  }
  ```

  ```ruby Ruby
  def complete_tool_workflow(client, user_query, tools)
    messages = [{ role: "user", content: user_query }]

    loop do
      response = client.messages.create(
        model: "claude-opus-5",
        max_tokens: 1024,
        messages: messages,
        tools: tools
      )

      # Final response
      return response unless response.stop_reason == :tool_use

      # Execute tools and continue
      tool_results = execute_tools(response.content)
      messages << { role: "assistant", content: response.content }
      messages << { role: "user", content: tool_results }
    end
  end
  ```

### Ensuring complete responses

  ```python Python
  def get_complete_response(client, prompt, max_attempts=3):
      messages = [{"role": "user", "content": prompt}]
      full_response = ""

      for _ in range(max_attempts):
          response = client.messages.create(
              model="claude-opus-5", messages=messages, max_tokens=4096
          )

          full_response += next(
              (block.text for block in response.content if block.type == "text"), ""
          )

          if response.stop_reason != "max_tokens":
              break

          # Continue from where it left off
          messages = [
              {"role": "user", "content": prompt},
              {"role": "assistant", "content": full_response},
              {"role": "user", "content": "Please continue from where you left off."},
          ]

      return full_response
  ```

  ```typescript TypeScript
  async function getCompleteResponse(
    client: Anthropic,
    prompt: string,
    maxAttempts = 3
  ): Promise<string> {
    let messages: Anthropic.MessageParam[] = [{ role: "user", content: prompt }];
    let fullResponse = "";

    for (let i = 0; i < maxAttempts; i++) {
      const response = await client.messages.create({
        model: "claude-opus-5",
        max_tokens: 4096,
        messages
      });

      const textBlock = response.content.find(
        (block): block is Anthropic.TextBlock => block.type === "text"
      );
      fullResponse += textBlock?.text ?? "";

      if (response.stop_reason !== "max_tokens") {
        break;
      }

      // Continue from where it left off
      messages = [
        { role: "user", content: prompt },
        { role: "assistant", content: fullResponse },
        { role: "user", content: "Please continue from where you left off." }
      ];
    }

    return fullResponse;
  }
  ```

  ```csharp C#
  static async Task<string> GetCompleteResponse(AnthropicClient client, string prompt, int maxAttempts = 3)
  {
      List<MessageParam> messages = [new() { Role = Role.User, Content = prompt }];
      var fullResponse = "";

      for (var i = 0; i < maxAttempts; i++)
      {
          var response = await client.Messages.Create(new MessageCreateParams
          {
              Model = Model.ClaudeOpus5,
              MaxTokens = 4096,
              Messages = messages
          });

          foreach (var block in response.Content)
          {
              if (block.TryPickText(out var textBlock))
              {
                  fullResponse += textBlock.Text;
                  break;
              }
          }

          if (response.StopReason != "max_tokens")
          {
              break;
          }

          // Continue from where it left off
          messages =
          [
              new() { Role = Role.User, Content = prompt },
              new() { Role = Role.Assistant, Content = fullResponse },
              new() { Role = Role.User, Content = "Please continue from where you left off." }
          ];
      }

      return fullResponse;
  }
  ```

  ```go Go
  func getCompleteResponse(client anthropic.Client, prompt string, maxAttempts int) (string, error) {
  	messages := []anthropic.MessageParam{anthropic.NewUserMessage(anthropic.NewTextBlock(prompt))}
  	fullResponse := ""

  	for range maxAttempts {
  		response, err := client.Messages.New(context.TODO(), anthropic.MessageNewParams{
  			Model:     anthropic.ModelClaudeOpus5,
  			MaxTokens: 4096,
  			Messages:  messages,
  		})
  		if err != nil {
  			return "", err
  		}

  		for _, block := range response.Content {
  			if textBlock, ok := block.AsAny().(anthropic.TextBlock); ok {
  				fullResponse += textBlock.Text
  				break
  			}
  		}

  		if response.StopReason != "max_tokens" {
  			break
  		}

  		// Continue from where it left off
  		messages = []anthropic.MessageParam{
  			anthropic.NewUserMessage(anthropic.NewTextBlock(prompt)),
  			anthropic.NewAssistantMessage(anthropic.NewTextBlock(fullResponse)),
  			anthropic.NewUserMessage(anthropic.NewTextBlock("Please continue from where you left off.")),
  		}
  	}

  	return fullResponse, nil
  }
  ```

  ```java Java
  static String getCompleteResponse(AnthropicClient client, String prompt, int maxAttempts) {
      List<MessageParam> messages = List.of(
          MessageParam.builder().role(MessageParam.Role.USER).content(prompt).build()
      );
      StringBuilder fullResponse = new StringBuilder();

      for (int i = 0; i < maxAttempts; i++) {
          Message response = client.messages().create(
              MessageCreateParams.builder()
                  .model(Model.CLAUDE_OPUS_5)
                  .maxTokens(4096L)
                  .messages(messages)
                  .build()
          );

          response.content().stream()
              .filter(ContentBlock::isText)
              .findFirst()
              .ifPresent(block -> fullResponse.append(block.asText().text()));

          if (!response.stopReason().map(StopReason.MAX_TOKENS::equals).orElse(false)) {
              break;
          }

          // Continue from where it left off
          messages = List.of(
              MessageParam.builder().role(MessageParam.Role.USER).content(prompt).build(),
              MessageParam.builder().role(MessageParam.Role.ASSISTANT).content(fullResponse.toString()).build(),
              MessageParam.builder().role(MessageParam.Role.USER).content("Please continue from where you left off.").build()
          );
      }

      return fullResponse.toString();
  }
  ```

  ```php PHP
  function get_complete_response(Client $client, string $prompt, int $maxAttempts = 3): string
  {
      $messages = [['role' => 'user', 'content' => $prompt]];
      $fullResponse = '';

      for ($i = 0; $i < $maxAttempts; $i++) {
          $response = $client->messages->create(
              maxTokens: 4096,
              messages: $messages,
              model: 'claude-opus-5',
          );

          $fullResponse .= array_find($response->content, static fn ($block): bool => $block->type === 'text')?->text ?? '';

          if ($response->stopReason !== 'max_tokens') {
              break;
          }

          // Continue from where it left off
          $messages = [
              ['role' => 'user', 'content' => $prompt],
              ['role' => 'assistant', 'content' => $fullResponse],
              ['role' => 'user', 'content' => 'Please continue from where you left off.'],
          ];
      }

      return $fullResponse;
  }
  ```

  ```ruby Ruby
  def get_complete_response(client, prompt, max_attempts: 3)
    messages = [{ role: "user", content: prompt }]
    full_response = +""

    max_attempts.times do
      response = client.messages.create(
        model: "claude-opus-5",
        max_tokens: 4096,
        messages: messages
      )

      full_response << response.content.find { it.type == :text }&.text.to_s

      break unless response.stop_reason == :max_tokens

      # Continue from where it left off
      messages = [
        { role: "user", content: prompt },
        { role: "assistant", content: full_response },
        { role: "user", content: "Please continue from where you left off." }
      ]
    end

    full_response
  end
  ```

### Getting maximum tokens without knowing input size

With the `model_context_window_exceeded` stop reason, you can request the maximum possible tokens without calculating input size:

  ```python Python
  def get_max_possible_tokens(client, prompt):
      """
      Get as many tokens as possible within the model's context window
      without needing to calculate input token count
      """
      response = client.beta.messages.create(
          model="claude-opus-5",
          messages=[{"role": "user", "content": prompt}],
          max_tokens=20000,  # Python SDK requires streaming for max_tokens above ~21k
      )

      if response.stop_reason == "model_context_window_exceeded":
          # Got the maximum possible tokens given input size
          print(
              f"Generated {response.usage.output_tokens} tokens (context limit reached)"
          )
      elif response.stop_reason == "max_tokens":
          # Got exactly the requested tokens
          print(f"Generated {response.usage.output_tokens} tokens (max_tokens reached)")
      else:
          # Natural completion
          print(f"Generated {response.usage.output_tokens} tokens (natural completion)")

      return next((block.text for block in response.content if block.type == "text"), "")
  ```

  ```typescript TypeScript
  async function getMaxPossibleTokens(client: Anthropic, prompt: string): Promise<string> {
    const response = await client.beta.messages.create({
      model: "claude-opus-5",
      max_tokens: 20000,
      messages: [{ role: "user", content: prompt }]
    });

    const tokens = response.usage.output_tokens;
    if (response.stop_reason === "model_context_window_exceeded") {
      // Got the maximum possible tokens given input size
      console.log(`Generated ${tokens} tokens (context limit reached)`);
    } else if (response.stop_reason === "max_tokens") {
      // Got exactly the requested tokens
      console.log(`Generated ${tokens} tokens (max_tokens reached)`);
    } else {
      // Natural completion
      console.log(`Generated ${tokens} tokens (natural completion)`);
    }

    const textBlock = response.content.find(
      (block): block is Anthropic.Beta.BetaTextBlock => block.type === "text"
    );
    return textBlock?.text ?? "";
  }
  ```

  ```csharp C#
  using Anthropic.Models.Beta.Messages;
  using Model = Anthropic.Models.Messages.Model;

  static async Task<string> GetMaxPossibleTokens(AnthropicClient client, string prompt)
  {
      var response = await client.Beta.Messages.Create(new MessageCreateParams
      {
          Model = Model.ClaudeOpus5,
          MaxTokens = 20000,
          Messages = [new() { Role = Role.User, Content = prompt }]
      });

      var tokens = response.Usage.OutputTokens;
      var reason = response.StopReason?.Value();
      if (reason == BetaStopReason.ModelContextWindowExceeded)
      {
          // Got the maximum possible tokens given input size
          Console.WriteLine($"Generated {tokens} tokens (context limit reached)");
      }
      else if (reason == BetaStopReason.MaxTokens)
      {
          // Got exactly the requested tokens
          Console.WriteLine($"Generated {tokens} tokens (max_tokens reached)");
      }
      else
      {
          // Natural completion
          Console.WriteLine($"Generated {tokens} tokens (natural completion)");
      }

      return response.Content.Select(b => b.Value).OfType<BetaTextBlock>().FirstOrDefault()?.Text ?? "";
  }
  ```

  ```go Go
  func getMaxPossibleTokens(client anthropic.Client, prompt string) (string, error) {
  	response, err := client.Beta.Messages.New(context.TODO(), anthropic.BetaMessageNewParams{
  		Model:     anthropic.ModelClaudeOpus5,
  		MaxTokens: 20000,
  		Messages: []anthropic.BetaMessageParam{
  			anthropic.NewBetaUserMessage(anthropic.NewBetaTextBlock(prompt)),
  		},
  	})
  	if err != nil {
  		return "", err
  	}

  	tokens := response.Usage.OutputTokens
  	switch response.StopReason {
  	case anthropic.BetaStopReasonModelContextWindowExceeded:
  		// Got the maximum possible tokens given input size
  		fmt.Printf("Generated %d tokens (context limit reached)\n", tokens)
  	case anthropic.BetaStopReasonMaxTokens:
  		// Got exactly the requested tokens
  		fmt.Printf("Generated %d tokens (max_tokens reached)\n", tokens)
  	default:
  		// Natural completion
  		fmt.Printf("Generated %d tokens (natural completion)\n", tokens)
  	}

  	for _, block := range response.Content {
  		if textBlock, ok := block.AsAny().(anthropic.BetaTextBlock); ok {
  			return textBlock.Text, nil
  		}
  	}
  	return "", nil
  }
  ```

  ```java Java
  import com.anthropic.models.beta.messages.BetaContentBlock;
  import com.anthropic.models.beta.messages.BetaMessage;
  import com.anthropic.models.beta.messages.BetaStopReason;
  import com.anthropic.models.beta.messages.MessageCreateParams;

  static String getMaxPossibleTokens(AnthropicClient client, String prompt) {
      BetaMessage response = client.beta().messages().create(
          MessageCreateParams.builder()
              .model(Model.CLAUDE_OPUS_5)
              .maxTokens(20000L)
              .addUserMessage(prompt)
              .build()
      );

      long tokens = response.usage().outputTokens();
      BetaStopReason reason = response.stopReason().orElse(BetaStopReason.END_TURN);
      if (reason.equals(BetaStopReason.MODEL_CONTEXT_WINDOW_EXCEEDED)) {
          // Got the maximum possible tokens given input size
          IO.println("Generated " + tokens + " tokens (context limit reached)");
      } else if (reason.equals(BetaStopReason.MAX_TOKENS)) {
          // Got exactly the requested tokens
          IO.println("Generated " + tokens + " tokens (max_tokens reached)");
      } else {
          // Natural completion
          IO.println("Generated " + tokens + " tokens (natural completion)");
      }

      return response.content().stream()
          .filter(BetaContentBlock::isText)
          .findFirst()
          .map(block -> block.asText().text())
          .orElse("");
  }
  ```

  ```php PHP
  function get_max_possible_tokens(Client $client, string $prompt): string
  {
      $response = $client->beta->messages->create(
          maxTokens: 20000,
          messages: [['role' => 'user', 'content' => $prompt]],
          model: 'claude-opus-5',
      );

      $tokens = $response->usage->outputTokens;
      echo match ($response->stopReason) {
          // Got the maximum possible tokens given input size
          'model_context_window_exceeded' => "Generated {$tokens} tokens (context limit reached)",
          // Got exactly the requested tokens
          'max_tokens' => "Generated {$tokens} tokens (max_tokens reached)",
          // Natural completion
          default => "Generated {$tokens} tokens (natural completion)",
      }, PHP_EOL;

      return array_find($response->content, static fn ($block): bool => $block->type === 'text')?->text ?? '';
  }
  ```

  ```ruby Ruby
  def get_max_possible_tokens(client, prompt)
    response = client.beta.messages.create(
      model: "claude-opus-5",
      max_tokens: 20000,
      messages: [{ role: "user", content: prompt }]
    )

    tokens = response.usage.output_tokens
    case response.stop_reason
    when :model_context_window_exceeded
      # Got the maximum possible tokens given input size
      puts "Generated #{tokens} tokens (context limit reached)"
    when :max_tokens
      # Got exactly the requested tokens
      puts "Generated #{tokens} tokens (max_tokens reached)"
    else
      # Natural completion
      puts "Generated #{tokens} tokens (natural completion)"
    end

    response.content.find { it.type == :text }.text
  end
  ```
