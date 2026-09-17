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
pageSha256: "4663990a4d1b1bfd2a4f8b9b8787a0321a6a81f1a531c15b4918853f6602eccd"
contentMode: "local-full"
zh: ""
---

## Stop reasons vs. errors

It's important to distinguish between `stop_reason` values and actual errors:

### Stop reasons (successful responses)

* Part of the response body
* Indicate why generation stopped normally
* Response contains valid content

### Errors (failed requests)

* HTTP status codes 4xx or 5xx
* Indicate request processing failures
* Response contains error details

  ```bash cURL
  # cURL exits non-zero on HTTP errors with --fail-with-body; inspect
  # $? for errors and stop_reason for successful responses.
  curl --fail-with-body -sS https://api.anthropic.com/v1/messages \
    -H "x-api-key: $ANTHROPIC_API_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -H "content-type: application/json" \
    -d '{
      "model": "claude-opus-5",
      "max_tokens": 1024,
      "messages": [{"role": "user", "content": "Hello!"}]
    }' | jq '.stop_reason'
  ```

  ```bash CLI
  # The CLI exits non-zero on API errors; stop_reason appears on success.
  ant messages create \
    --model claude-opus-5 \
    --max-tokens 1024 \
    --message '{role: user, content: "Hello!"}' \
    --format json | jq '.stop_reason'
  ```

  ```python Python
  client = anthropic.Anthropic()

  try:
      response = client.messages.create(
          model="claude-opus-5",
          max_tokens=1024,
          messages=[{"role": "user", "content": "Hello!"}],
      )

      # Handle successful response with stop_reason
      if response.stop_reason == "max_tokens":
          print("Response was truncated")

  except anthropic.APIStatusError as e:
      # Handle actual errors
      if e.status_code == 429:
          print("Rate limit exceeded")
      elif e.status_code == 500:
          print("Server error")
  ```

  ```typescript TypeScript
  const client = new Anthropic();

  try {
    const response = await client.messages.create({
      model: "claude-opus-5",
      max_tokens: 1024,
      messages: [{ role: "user", content: "Hello!" }]
    });

    // Handle successful response with stop_reason
    if (response.stop_reason === "max_tokens") {
      console.log("Response was truncated");
    }
  } catch (err) {
    // Handle actual errors
    if (err instanceof Anthropic.APIError) {
      if (err.status === 429) {
        console.log("Rate limit exceeded");
      } else if (err.status === 500) {
        console.log("Server error");
      }
    } else {
      throw err;
    }
  }
  ```

  ```csharp C#
  AnthropicClient client = new();

  try
  {
      var response = await client.Messages.Create(new MessageCreateParams
      {
          Model = Model.ClaudeOpus5,
          MaxTokens = 1024,
          Messages = [new() { Role = Role.User, Content = "Hello!" }]
      });

      // Handle successful response with stop_reason
      if (response.StopReason == "max_tokens")
      {
          Console.WriteLine("Response was truncated");
      }
  }
  catch (AnthropicRateLimitException)
  {
      // Handle actual errors
      Console.WriteLine("Rate limit exceeded");
  }
  catch (Anthropic5xxException)
  {
      Console.WriteLine("Server error");
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
  	// Handle actual errors
  	var apiErr *anthropic.Error
  	if errors.As(err, &apiErr) {
  		switch apiErr.StatusCode {
  		case 429:
  			fmt.Println("Rate limit exceeded")
  		case 500:
  			fmt.Println("Server error")
  		}
  	}
  	log.Fatal(err)
  }

  // Handle successful response with stop_reason
  if response.StopReason == "max_tokens" {
  	fmt.Println("Response was truncated")
  }
  ```

  ```java Java
  AnthropicClient client = AnthropicOkHttpClient.fromEnv();

  try {
      Message response = client.messages().create(
          MessageCreateParams.builder()
              .model(Model.CLAUDE_OPUS_5)
              .maxTokens(1024L)
              .addUserMessage("Hello!")
              .build()
      );

      // Handle successful response with stop_reason
      if (response.stopReason().map(StopReason.MAX_TOKENS::equals).orElse(false)) {
          IO.println("Response was truncated");
      }
  } catch (RateLimitException e) {
      // Handle actual errors
      IO.println("Rate limit exceeded");
  } catch (AnthropicServiceException e) {
      if (e.statusCode() == 500) {
          IO.println("Server error");
      }
  }
  ```

  ```php PHP
  $client = new Client();

  try {
      $response = $client->messages->create(
          maxTokens: 1024,
          messages: [['role' => 'user', 'content' => 'Hello!']],
          model: 'claude-opus-5',
      );

      // Handle successful response with stop_reason
      if ($response->stopReason === 'max_tokens') {
          echo 'Response was truncated', PHP_EOL;
      }
  } catch (RateLimitException $e) {
      // Handle actual errors
      echo 'Rate limit exceeded', PHP_EOL;
  } catch (InternalServerException $e) {
      echo 'Server error', PHP_EOL;
  }
  ```

  ```ruby Ruby
  client = Anthropic::Client.new

  begin
    response = client.messages.create(
      model: "claude-opus-5",
      max_tokens: 1024,
      messages: [{ role: "user", content: "Hello!" }]
    )

    # Handle successful response with stop_reason
    if response.stop_reason == :max_tokens
      puts "Response was truncated"
    end
  rescue Anthropic::Errors::RateLimitError
    # Handle actual errors
    puts "Rate limit exceeded"
  rescue Anthropic::Errors::APIStatusError => e
    puts "Server error" if e.status == 500
  end
  ```
