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
pageSha256: "79bb4cb296b05a68aec1b7b9622a2afc58f9c272dfd5884d2d3c677156e8d883"
contentMode: "local-full"
zh: ""
---

## Best practices for handling stop reasons

### Always check stop\_reason

Make it a habit to check the `stop_reason` in your response handling logic:

  ```python Python
  def handle_response(response):
      if response.stop_reason == "tool_use":
          return handle_tool_use(response)
      elif response.stop_reason == "max_tokens":
          return handle_truncation(response)
      elif response.stop_reason == "model_context_window_exceeded":
          return handle_context_limit(response)
      elif response.stop_reason == "pause_turn":
          return handle_pause(response)
      elif response.stop_reason == "refusal":
          return handle_refusal(response)
      else:
          # Handle end_turn and other cases
          return next(
              (block.text for block in response.content if block.type == "text"), ""
          )
  ```

  ```typescript TypeScript
  function handleResponse(response: Anthropic.Beta.BetaMessage): string {
    switch (response.stop_reason) {
      case "tool_use":
        return handleToolUse(response);
      case "max_tokens":
        return handleTruncation(response);
      case "model_context_window_exceeded":
        return handleContextLimit(response);
      case "pause_turn":
        return handlePause(response);
      case "refusal":
        return handleRefusal(response);
      default: {
        // Handle end_turn and other cases
        const textBlock = response.content.find(
          (block): block is Anthropic.Beta.BetaTextBlock => block.type === "text"
        );
        return textBlock?.text ?? "";
      }
    }
  }
  ```

  ```csharp C#
  static string HandleResponse(BetaMessage response)
  {
      return response.StopReason?.Value() switch
      {
          BetaStopReason.ToolUse => HandleToolUse(response),
          BetaStopReason.MaxTokens => HandleTruncation(response),
          BetaStopReason.ModelContextWindowExceeded => HandleContextLimit(response),
          BetaStopReason.PauseTurn => HandlePause(response),
          BetaStopReason.Refusal => HandleRefusal(response),
          // Handle end_turn and other cases
          _ => response.Content.Select(b => b.Value).OfType<BetaTextBlock>().FirstOrDefault()?.Text ?? "",
      };
  }
  ```

  ```go Go
  func handleResponse(response *anthropic.BetaMessage) string {
  	switch response.StopReason {
  	case anthropic.BetaStopReasonToolUse:
  		return handleToolUse(response)
  	case anthropic.BetaStopReasonMaxTokens:
  		return handleTruncation(response)
  	case anthropic.BetaStopReasonModelContextWindowExceeded:
  		return handleContextLimit(response)
  	case anthropic.BetaStopReasonPauseTurn:
  		return handlePause(response)
  	case anthropic.BetaStopReasonRefusal:
  		return handleRefusal(response)
  	default:
  		// Handle end_turn and other cases
  		for _, block := range response.Content {
  			if textBlock, ok := block.AsAny().(anthropic.BetaTextBlock); ok {
  				return textBlock.Text
  			}
  		}
  		return ""
  	}
  }
  ```

  ```java Java
  static String handleResponse(BetaMessage response) {
      BetaStopReason reason = response.stopReason().orElse(BetaStopReason.END_TURN);
      if (reason.equals(BetaStopReason.TOOL_USE)) {
          return handleToolUse(response);
      } else if (reason.equals(BetaStopReason.MAX_TOKENS)) {
          return handleTruncation(response);
      } else if (reason.equals(BetaStopReason.MODEL_CONTEXT_WINDOW_EXCEEDED)) {
          return handleContextLimit(response);
      } else if (reason.equals(BetaStopReason.PAUSE_TURN)) {
          return handlePause(response);
      } else if (reason.equals(BetaStopReason.REFUSAL)) {
          return handleRefusal(response);
      }
      // Handle end_turn and other cases
      return response.content().stream()
          .filter(BetaContentBlock::isText)
          .findFirst()
          .map(block -> block.asText().text())
          .orElse("");
  }
  ```

  ```php PHP
  function handle_response($response): string
  {
      return match ($response->stopReason) {
          'tool_use' => handle_tool_use($response),
          'max_tokens' => handle_truncation($response),
          'model_context_window_exceeded' => handle_context_limit($response),
          'pause_turn' => handle_pause($response),
          'refusal' => handle_refusal($response),
          // Handle end_turn and other cases
          default => array_find($response->content, static fn ($block): bool => $block->type === 'text')?->text ?? '',
      };
  }
  ```

  ```ruby Ruby
  def handle_response(response)
    case response.stop_reason
    when :tool_use then handle_tool_use(response)
    when :max_tokens then handle_truncation(response)
    when :model_context_window_exceeded then handle_context_limit(response)
    when :pause_turn then handle_pause(response)
    when :refusal then handle_refusal(response)
    else
      # Handle end_turn and other cases
      response.content.find { it.type == :text }&.text
    end
  end
  ```

### Handle truncated responses gracefully

When a response is truncated because of token limits or the context window, append a notice so the reader knows the output is incomplete. To continue generating from where the response left off instead, see [Ensuring complete responses](https://platform.claude.com/docs/en/build-with-claude/handling-stop-reasons#ensuring-complete-responses).

  ```python Python
  def handle_truncated_response(response):
      text = next((block.text for block in response.content if block.type == "text"), "")
      if response.stop_reason in ["max_tokens", "model_context_window_exceeded"]:
          if response.stop_reason == "max_tokens":
              note = "[Response truncated due to max_tokens limit]"
          else:
              note = "[Response truncated due to context window limit]"
          return f"{text}\n\n{note}"
      return text
  ```

  ```typescript TypeScript
  function handleTruncatedResponse(response: Anthropic.Beta.BetaMessage): string {
    const textBlock = response.content.find(
      (block): block is Anthropic.Beta.BetaTextBlock => block.type === "text"
    );
    const text = textBlock?.text ?? "";

    if (
      response.stop_reason === "max_tokens" ||
      response.stop_reason === "model_context_window_exceeded"
    ) {
      const note =
        response.stop_reason === "max_tokens"
          ? "[Response truncated due to max_tokens limit]"
          : "[Response truncated due to context window limit]";
      return `${text}\n\n${note}`;
    }
    return text;
  }
  ```

  ```csharp C#
  static string HandleTruncatedResponse(BetaMessage response)
  {
      var text = response.Content.Select(b => b.Value).OfType<BetaTextBlock>().FirstOrDefault()?.Text ?? "";
      var reason = response.StopReason?.Value();

      if (reason is BetaStopReason.MaxTokens or BetaStopReason.ModelContextWindowExceeded)
      {
          var note = reason == BetaStopReason.MaxTokens
              ? "[Response truncated due to max_tokens limit]"
              : "[Response truncated due to context window limit]";
          return $"{text}\n\n{note}";
      }
      return text;
  }
  ```

  ```go Go
  func handleTruncatedResponse(response *anthropic.BetaMessage) string {
  	text := ""
  	for _, block := range response.Content {
  		if textBlock, ok := block.AsAny().(anthropic.BetaTextBlock); ok {
  			text = textBlock.Text
  			break
  		}
  	}

  	if response.StopReason == anthropic.BetaStopReasonMaxTokens ||
  		response.StopReason == anthropic.BetaStopReasonModelContextWindowExceeded {
  		note := "[Response truncated due to context window limit]"
  		if response.StopReason == anthropic.BetaStopReasonMaxTokens {
  			note = "[Response truncated due to max_tokens limit]"
  		}
  		return text + "\n\n" + note
  	}
  	return text
  }
  ```

  ```java Java
  static String handleTruncatedResponse(BetaMessage response) {
      String text = response.content().stream()
          .filter(BetaContentBlock::isText)
          .findFirst()
          .map(block -> block.asText().text())
          .orElse("");
      BetaStopReason reason = response.stopReason().orElse(BetaStopReason.END_TURN);

      if (reason.equals(BetaStopReason.MAX_TOKENS)
              || reason.equals(BetaStopReason.MODEL_CONTEXT_WINDOW_EXCEEDED)) {
          String note = reason.equals(BetaStopReason.MAX_TOKENS)
              ? "[Response truncated due to max_tokens limit]"
              : "[Response truncated due to context window limit]";
          return text + "\n\n" + note;
      }
      return text;
  }
  ```

  ```php PHP
  function handle_truncated_response($response): string
  {
      $text = array_find($response->content, static fn ($block): bool => $block->type === 'text')?->text ?? '';

      if (in_array($response->stopReason, ['max_tokens', 'model_context_window_exceeded'], true)) {
          $note = $response->stopReason === 'max_tokens'
              ? '[Response truncated due to max_tokens limit]'
              : '[Response truncated due to context window limit]';
          return "{$text}\n\n{$note}";
      }
      return $text;
  }
  ```

  ```ruby Ruby
  def handle_truncated_response(response)
    text = response.content.find { it.type == :text }&.text

    if [:max_tokens, :model_context_window_exceeded].include?(response.stop_reason)
      note = if response.stop_reason == :max_tokens
        "[Response truncated due to max_tokens limit]"
      else
        "[Response truncated due to context window limit]"
      end
      return "#{text}\n\n#{note}"
    end
    text
  end
  ```

### Implement retry logic for pause\_turn

When using [server tools](https://platform.claude.com/docs/en/agents-and-tools/tool-use/server-tools), the API may return `pause_turn` if the server-side sampling loop reaches its iteration limit (default 10). Handle this by continuing the conversation:

  ```python Python
  def handle_server_tool_conversation(client, user_query, tools, max_continuations=5):
      """
      Handle server tool conversations that may require multiple continuations.

      The server runs a sampling loop when executing server tools. If the loop
      reaches its iteration limit, the API returns pause_turn. Continue the
      conversation by sending the response back to let Claude finish.
      """
      messages = [{"role": "user", "content": user_query}]

      for _ in range(max_continuations):
          response = client.messages.create(
              model="claude-opus-5", max_tokens=4096, messages=messages, tools=tools
          )

          if response.stop_reason != "pause_turn":
              # Claude finished processing - return the final response
              return response

          # pause_turn: replace the full message list to maintain alternating roles
          messages = [
              {"role": "user", "content": user_query},
              {"role": "assistant", "content": response.content},
          ]

      # Reached max continuations - return the last response
      return response
  ```

  ```typescript TypeScript
  async function handleServerToolConversation(
    client: Anthropic,
    userQuery: string,
    tools: Anthropic.ToolUnion[],
    maxContinuations = 5
  ): Promise<Anthropic.Message> {
    let messages: Anthropic.MessageParam[] = [{ role: "user", content: userQuery }];
    let response: Anthropic.Message;

    for (let i = 0; i < maxContinuations; i++) {
      response = await client.messages.create({
        model: "claude-opus-5",
        max_tokens: 4096,
        messages,
        tools
      });

      if (response.stop_reason !== "pause_turn") {
        // Claude finished processing - return the final response
        return response;
      }

      // pause_turn: replace the full message list to maintain alternating roles
      messages = [
        { role: "user", content: userQuery },
        { role: "assistant", content: response.content }
      ];
    }

    // Reached max continuations - return the last response
    return response!;
  }
  ```

  ```csharp C#
  static async Task<Message> HandleServerToolConversation(
      AnthropicClient client,
      string userQuery,
      List<ToolUnion> tools,
      int maxContinuations = 5)
  {
      List<MessageParam> messages = [new() { Role = Role.User, Content = userQuery }];
      Message response = null!;

      for (var i = 0; i < maxContinuations; i++)
      {
          response = await client.Messages.Create(new MessageCreateParams
          {
              Model = Model.ClaudeOpus5,
              MaxTokens = 4096,
              Messages = messages,
              Tools = tools
          });

          if (response.StopReason != "pause_turn")
          {
              // Claude finished processing - return the final response
              return response;
          }

          // pause_turn: replace the full message list to maintain alternating roles
          messages =
          [
              new() { Role = Role.User, Content = userQuery },
              new()
              {
                  Role = Role.Assistant,
                  Content = response.Content.Select(block => new ContentBlockParam(block.Json)).ToList()
              }
          ];
      }

      // Reached max continuations - return the last response
      return response;
  }
  ```

  ```go Go
  func handleServerToolConversation(
  	client anthropic.Client,
  	userQuery string,
  	tools []anthropic.ToolUnionParam,
  	maxContinuations int,
  ) (*anthropic.Message, error) {
  	messages := []anthropic.MessageParam{anthropic.NewUserMessage(anthropic.NewTextBlock(userQuery))}
  	var response *anthropic.Message
  	var err error

  	for range maxContinuations {
  		response, err = client.Messages.New(context.TODO(), anthropic.MessageNewParams{
  			Model:     anthropic.ModelClaudeOpus5,
  			MaxTokens: 4096,
  			Messages:  messages,
  			Tools:     tools,
  		})
  		if err != nil {
  			return nil, err
  		}

  		if response.StopReason != "pause_turn" {
  			// Claude finished processing - return the final response
  			return response, nil
  		}

  		// pause_turn: replace the full message list to maintain alternating roles
  		var contentParams []anthropic.ContentBlockParamUnion
  		for _, block := range response.Content {
  			contentParams = append(contentParams, block.ToParam())
  		}
  		messages = []anthropic.MessageParam{
  			anthropic.NewUserMessage(anthropic.NewTextBlock(userQuery)),
  			anthropic.NewAssistantMessage(contentParams...),
  		}
  	}

  	// Reached max continuations - return the last response
  	return response, nil
  }
  ```

  ```java Java
  static Message handleServerToolConversation(
      AnthropicClient client,
      String userQuery,
      List<Tool> tools,
      int maxContinuations
  ) {
      Message response = null;

      for (int i = 0; i < maxContinuations; i++) {
          // Rebuild the params each iteration so messages aren't accumulated
          MessageCreateParams.Builder params = MessageCreateParams.builder()
              .model(Model.CLAUDE_OPUS_5)
              .maxTokens(4096L)
              .addUserMessage(userQuery);
          tools.forEach(params::addTool);
          if (response != null) {
              params.addMessage(response);
          }

          response = client.messages().create(params.build());

          if (!response.stopReason().map(StopReason.PAUSE_TURN::equals).orElse(false)) {
              // Claude finished processing - return the final response
              return response;
          }
          // pause_turn: loop again and send the response back
      }

      // Reached max continuations - return the last response
      return response;
  }
  ```

  ```php PHP
  function handle_server_tool_conversation(
      Client $client,
      string $userQuery,
      array $tools,
      int $maxContinuations = 5
  ) {
      $messages = [['role' => 'user', 'content' => $userQuery]];
      $response = null;

      for ($i = 0; $i < $maxContinuations; $i++) {
          $response = $client->messages->create(
              maxTokens: 4096,
              messages: $messages,
              model: 'claude-opus-5',
              tools: $tools,
          );

          if ($response->stopReason !== 'pause_turn') {
              // Claude finished processing - return the final response
              return $response;
          }

          // pause_turn: replace the full message list to maintain alternating roles
          $messages = [
              ['role' => 'user', 'content' => $userQuery],
              ['role' => 'assistant', 'content' => $response->content],
          ];
      }

      // Reached max continuations - return the last response
      return $response;
  }
  ```

  ```ruby Ruby
  def handle_server_tool_conversation(client, user_query, tools, max_continuations: 5)
    messages = [{ role: "user", content: user_query }]
    response = nil

    max_continuations.times do
      response = client.messages.create(
        model: "claude-opus-5",
        max_tokens: 4096,
        messages: messages,
        tools: tools
      )

      # Claude finished processing - return the final response
      return response unless response.stop_reason == :pause_turn

      # pause_turn: replace the full message list to maintain alternating roles
      messages = [
        { role: "user", content: user_query },
        { role: "assistant", content: response.content }
      ]
    end

    # Reached max continuations - return the last response
    response
  end
  ```
