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
pageSha256: "dd65f994e808377d29152a86a7775c4e76771600444718e4c3711663e2175819"
contentMode: "local-full"
zh: ""
---

## Pre-warming the cache

Cache pre-warming lets you load your system prompt or tool definitions into the prompt cache before a user triggers a real request. This eliminates the cache-miss latency penalty on the first user interaction, reducing time-to-first-token (TTFT) for latency-sensitive applications.

### How it works

Set `max_tokens: 0` in your request. The API reads your prompt into the model and writes the cache at any `cache_control` breakpoint, then returns immediately without generating any output. The response has an empty `content` array, `stop_reason: "max_tokens"`, and a fully populated `usage` block.

Place the `cache_control` breakpoint on the last block that is shared with the follow-up request (typically your system prompt or tool definitions), not on the placeholder user message. Otherwise the cache entry is keyed to the placeholder and the follow-up request won't hit it. Use the same thinking configuration and `output_config.effort` as your follow-up requests too: those values are rendered into the prompt (see [What invalidates the cache](https://platform.claude.com/docs/en/build-with-claude/prompt-caching#what-invalidates-the-cache)), so a pre-warm with a different configuration can write an entry your real traffic never hits. This means using an [explicit cache breakpoint](https://platform.claude.com/docs/en/build-with-claude/prompt-caching#explicit-cache-breakpoints) rather than [automatic caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching#automatic-caching), since automatic caching places the breakpoint on the last block, which here is the placeholder. The placeholder user message can be any string with non-whitespace content (the examples here use `"warmup"`); its content is read into the model but never answered.

  A pre-warm request incurs a **cache write** charge if the prefix is not already cached, the same as any other request. Check `usage.cache_creation_input_tokens` in the response to confirm a write occurred. Zero output tokens are billed.

  ```bash cURL
  curl https://api.anthropic.com/v1/messages \
    -H "content-type: application/json" \
    -H "x-api-key: $ANTHROPIC_API_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -d '{
      "model": "claude-opus-5",
      "max_tokens": 0,
      "system": [
        {
          "type": "text",
          "text": "You are an expert software engineer with deep knowledge of distributed systems...",
          "cache_control": {"type": "ephemeral"}
        }
      ],
      "messages": [{"role": "user", "content": "warmup"}]
    }'
  ```

  ```bash CLI
  ant messages create \
    --transform '{stop_reason,content,usage}' --format yaml <<'YAML'
  model: claude-opus-5
  max_tokens: 0
  system:
    - type: text
      text: >-
        You are an expert software engineer with deep knowledge of
        distributed systems...
      cache_control:
        type: ephemeral
  messages:
    - role: user
      content: warmup
  YAML
  ```

  ```python Python
  client = anthropic.Anthropic()

  # Fire this before users arrive to warm the shared system-prompt cache.
  prewarm = client.messages.create(
      model="claude-opus-5",
      max_tokens=0,
      system=[
          {
              "type": "text",
              "text": "You are an expert software engineer with deep knowledge of distributed systems...",
              "cache_control": {"type": "ephemeral"},
          }
      ],
      messages=[{"role": "user", "content": "warmup"}],
  )
  print(prewarm.stop_reason)  # "max_tokens"
  print(prewarm.content)  # []
  print(prewarm.usage)
  ```

  ```typescript TypeScript
  const client = new Anthropic();

  // Fire this before users arrive to warm the shared system-prompt cache.
  const prewarm = await client.messages.create({
    model: "claude-opus-5",
    max_tokens: 0,
    system: [
      {
        type: "text",
        text: "You are an expert software engineer with deep knowledge of distributed systems...",
        cache_control: { type: "ephemeral" }
      }
    ],
    messages: [{ role: "user", content: "warmup" }]
  });
  console.log(prewarm.stop_reason); // "max_tokens"
  console.log(prewarm.content); // []
  console.log(prewarm.usage);
  ```

  ```csharp C#
  AnthropicClient client = new();

  var prewarm = await client.Messages.Create(
      new()
      {
          Model = Model.ClaudeOpus5,
          MaxTokens = 0,
          System = new(
              [
                  new TextBlockParam
                  {
                      Text = "You are an expert software engineer with deep knowledge of distributed systems...",
                      CacheControl = new(),
                  },
              ]
          ),
          Messages = [new() { Role = Role.User, Content = "warmup" }],
      }
  );

  Console.WriteLine(prewarm.StopReason?.Raw()); // "max_tokens"
  Console.WriteLine(prewarm.Content.Count); // 0
  Console.WriteLine(prewarm.Usage);
  ```

  ```go Go
  client := anthropic.NewClient()

  prewarm, err := client.Messages.New(context.TODO(), anthropic.MessageNewParams{
  	Model:     anthropic.ModelClaudeOpus5,
  	MaxTokens: 0,
  	System: []anthropic.TextBlockParam{
  		{
  			Text:         "You are an expert software engineer with deep knowledge of distributed systems...",
  			CacheControl: anthropic.NewCacheControlEphemeralParam(),
  		},
  	},
  	Messages: []anthropic.MessageParam{
  		anthropic.NewUserMessage(anthropic.NewTextBlock("warmup")),
  	},
  })
  if err != nil {
  	panic(err)
  }

  fmt.Println(prewarm.StopReason) // "max_tokens"
  fmt.Println(prewarm.Content)    // []
  fmt.Println(prewarm.Usage.RawJSON())
  ```

  ```java Java
  AnthropicClient client = AnthropicOkHttpClient.fromEnv();

  Message prewarm = client.messages().create(MessageCreateParams.builder()
          .model(Model.CLAUDE_OPUS_5)
          .maxTokens(0)
          .systemOfTextBlockParams(List.of(TextBlockParam.builder()
                  .text("You are an expert software engineer with deep knowledge of distributed systems...")
                  .cacheControl(CacheControlEphemeral.builder().build())
                  .build()))
          .addUserMessage("warmup")
          .build());

  IO.println(prewarm.stopReason()); // Optional[max_tokens]
  IO.println(prewarm.content());    // []
  IO.println(prewarm.usage());
  ```

  ```php PHP
  $client = new Client();

  $prewarm = $client->messages->create(
      model: Model::CLAUDE_OPUS_5,
      maxTokens: 0,
      system: [
          [
              'type' => 'text',
              'text' => 'You are an expert software engineer with deep knowledge of distributed systems...',
              'cache_control' => ['type' => 'ephemeral'],
          ],
      ],
      messages: [['role' => 'user', 'content' => 'warmup']],
  );

  echo $prewarm->stopReason->value, PHP_EOL; // "max_tokens"
  echo json_encode($prewarm->content), PHP_EOL; // []
  echo json_encode($prewarm->usage), PHP_EOL;
  ```

  ```ruby Ruby
  client = Anthropic::Client.new

  prewarm = client.messages.create(
    model: Anthropic::Model::CLAUDE_OPUS_5,
    max_tokens: 0,
    system_: [
      {
        type: "text",
        text: "You are an expert software engineer with deep knowledge of distributed systems...",
        cache_control: {type: "ephemeral"}
      }
    ],
    messages: [{role: "user", content: "warmup"}]
  )

  puts prewarm.stop_reason # :max_tokens
  puts prewarm.content # []
  puts prewarm.usage
  ```

The API returns an empty `content` array:

```json Output
{
  "id": "msg_01XFDUDYJgAACzvnptvVoYEL",
  "type": "message",
  "role": "assistant",
  "content": [],
  "model": "claude-opus-5",
  "stop_reason": "max_tokens",
  "stop_sequence": null,
  "usage": {
    "input_tokens": 8,
    "cache_creation_input_tokens": 5120,
    "cache_read_input_tokens": 0,
    "cache_creation": {
      "ephemeral_5m_input_tokens": 5120,
      "ephemeral_1h_input_tokens": 0
    },
    "iterations": [
      {
        "input_tokens": 8,
        "output_tokens": 0,
        "cache_read_input_tokens": 0,
        "cache_creation_input_tokens": 5120,
        "cache_creation": {
          "ephemeral_5m_input_tokens": 5120,
          "ephemeral_1h_input_tokens": 0
        },
        "type": "message"
      }
    ],
    "output_tokens": 0,
    "service_tier": "standard",
    "inference_geo": "global"
  }
}
```

### Typical usage pattern

Fire a pre-warm request when your application starts (or on a scheduled interval), then send real user requests after the pre-warm completes:

  ```bash cURL
  # Warm the cache at application startup or on a scheduled interval.
  curl https://api.anthropic.com/v1/messages \
    -H "content-type: application/json" \
    -H "x-api-key: $ANTHROPIC_API_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -d '{
      "model": "claude-opus-5",
      "max_tokens": 0,
      "system": [
        {
          "type": "text",
          "text": "You are an expert software engineer with deep knowledge of distributed systems...",
          "cache_control": {"type": "ephemeral"}
        }
      ],
      "messages": [{"role": "user", "content": "warmup"}]
    }'

  # Later, when the user submits a message, the system-prompt prefix is already cached.
  curl https://api.anthropic.com/v1/messages \
    -H "content-type: application/json" \
    -H "x-api-key: $ANTHROPIC_API_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -d '{
      "model": "claude-opus-5",
      "max_tokens": 1024,
      "system": [
        {
          "type": "text",
          "text": "You are an expert software engineer with deep knowledge of distributed systems...",
          "cache_control": {"type": "ephemeral"}
        }
      ],
      "messages": [{"role": "user", "content": "How do I implement a binary search tree?"}]
    }'
  ```

  ```bash CLI
  # Warm the cache at application startup or on a scheduled interval.
  ant messages create --transform usage <<'YAML'
  model: claude-opus-5
  max_tokens: 0
  system:
    - type: text
      text: >-
        You are an expert software engineer with deep knowledge of
        distributed systems...
      cache_control:
        type: ephemeral
  messages:
    - role: user
      content: warmup
  YAML

  # Later, when the user submits a message, the system-prompt prefix is already cached.
  ant messages create --transform 'content.#(type=="text").text' --raw-output <<'YAML'
  model: claude-opus-5
  max_tokens: 1024
  system:
    - type: text
      text: >-
        You are an expert software engineer with deep knowledge of
        distributed systems...
      cache_control:
        type: ephemeral
  messages:
    - role: user
      content: How do I implement a binary search tree?
  YAML
  ```

  ```python Python
  client = anthropic.Anthropic()

  SYSTEM_PROMPT = [
      {
          "type": "text",
          "text": "You are an expert software engineer with deep knowledge of distributed systems...",
          "cache_control": {"type": "ephemeral"},
      }
  ]

  def prewarm_cache() -> None:
      """Call this at application startup or on a scheduled interval."""
      client.messages.create(
          model="claude-opus-5",
          max_tokens=0,
          system=SYSTEM_PROMPT,
          messages=[{"role": "user", "content": "warmup"}],
      )

  def respond(user_message: str) -> anthropic.types.Message:
      """The real user request; benefits from a warm cache."""
      return client.messages.create(
          model="claude-opus-5",
          max_tokens=1024,
          system=SYSTEM_PROMPT,
          messages=[{"role": "user", "content": user_message}],
      )

  # Warm the cache before any user traffic arrives.
  prewarm_cache()

  # Later, when the user submits a message, the system-prompt prefix is already cached.
  response = respond("How do I implement a binary search tree?")
  for block in response.content:
      if block.type == "text":
          print(block.text)
  ```

  ```typescript TypeScript
  const client = new Anthropic();

  const SYSTEM_PROMPT: Anthropic.TextBlockParam[] = [
    {
      type: "text",
      text: "You are an expert software engineer with deep knowledge of distributed systems...",
      cache_control: { type: "ephemeral" }
    }
  ];

  // Call this at application startup or on a scheduled interval.
  async function prewarmCache(): Promise<void> {
    await client.messages.create({
      model: "claude-opus-5",
      max_tokens: 0,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: "warmup" }]
    });
  }

  // The real user request; benefits from a warm cache.
  async function respond(userMessage: string): Promise<Anthropic.Message> {
    return client.messages.create({
      model: "claude-opus-5",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userMessage }]
    });
  }

  // Warm the cache before any user traffic arrives.
  await prewarmCache();

  // Later, when the user submits a message, the system-prompt prefix is already cached.
  const response = await respond("How do I implement a binary search tree?");
  const textBlock = response.content.find(
    (block): block is Anthropic.TextBlock => block.type === "text"
  );
  console.log(textBlock?.text);
  ```

  ```csharp C#
  AnthropicClient client = new();

  List<TextBlockParam> systemPrompt =
  [
      new TextBlockParam
      {
          Text = "You are an expert software engineer with deep knowledge of distributed systems...",
          CacheControl = new(),
      },
  ];

  // Call this at application startup or on a scheduled interval.
  async Task PrewarmCache() =>
      await client.Messages.Create(
          new()
          {
              Model = Model.ClaudeOpus5,
              MaxTokens = 0,
              System = new(systemPrompt),
              Messages = [new() { Role = Role.User, Content = "warmup" }],
          }
      );

  // The real user request; benefits from a warm cache.
  async Task<Message> Respond(string userMessage) =>
      await client.Messages.Create(
          new()
          {
              Model = Model.ClaudeOpus5,
              MaxTokens = 1024,
              System = new(systemPrompt),
              Messages = [new() { Role = Role.User, Content = userMessage }],
          }
      );

  // Warm the cache before any user traffic arrives.
  await PrewarmCache();

  // Later, when the user submits a message, the system-prompt prefix is already cached.
  var response = await Respond("How do I implement a binary search tree?");
  foreach (var block in response.Content)
  {
      if (block.TryPickText(out var textBlock))
      {
          Console.WriteLine(textBlock.Text);
      }
  }
  ```

  ```go Go
  var client = anthropic.NewClient()

  var systemPrompt = []anthropic.TextBlockParam{
  	{
  		Text:         "You are an expert software engineer with deep knowledge of distributed systems...",
  		CacheControl: anthropic.NewCacheControlEphemeralParam(),
  	},
  }

  // Call this at application startup or on a scheduled interval.
  func prewarmCache() error {
  	_, err := client.Messages.New(context.TODO(), anthropic.MessageNewParams{
  		Model:     anthropic.ModelClaudeOpus5,
  		MaxTokens: 0,
  		System:    systemPrompt,
  		Messages: []anthropic.MessageParam{
  			anthropic.NewUserMessage(anthropic.NewTextBlock("warmup")),
  		},
  	})
  	return err
  }

  // The real user request; benefits from a warm cache.
  func respond(userMessage string) (*anthropic.Message, error) {
  	return client.Messages.New(context.TODO(), anthropic.MessageNewParams{
  		Model:     anthropic.ModelClaudeOpus5,
  		MaxTokens: 1024,
  		System:    systemPrompt,
  		Messages: []anthropic.MessageParam{
  			anthropic.NewUserMessage(anthropic.NewTextBlock(userMessage)),
  		},
  	})
  }

  func main() {
  	// Warm the cache before any user traffic arrives.
  	if err := prewarmCache(); err != nil {
  		log.Fatal(err)
  	}

  	// Later, when the user submits a message, the system-prompt prefix is already cached.
  	response, err := respond("How do I implement a binary search tree?")
  	if err != nil {
  		log.Fatal(err)
  	}
  	for _, block := range response.Content {
  		if textBlock, ok := block.AsAny().(anthropic.TextBlock); ok {
  			fmt.Println(textBlock.Text)
  		}
  	}
  }
  ```

  ```java Java
  AnthropicClient client = AnthropicOkHttpClient.fromEnv();

  List<TextBlockParam> systemPrompt = List.of(TextBlockParam.builder()
          .text("You are an expert software engineer with deep knowledge of distributed systems...")
          .cacheControl(CacheControlEphemeral.builder().build())
          .build());

  // Call this at application startup or on a scheduled interval.
  void prewarmCache() {
      client.messages().create(MessageCreateParams.builder()
              .model(Model.CLAUDE_OPUS_5)
              .maxTokens(0)
              .systemOfTextBlockParams(systemPrompt)
              .addUserMessage("warmup")
              .build());
  }

  // The real user request; benefits from a warm cache.
  Message respond(String userMessage) {
      return client.messages().create(MessageCreateParams.builder()
              .model(Model.CLAUDE_OPUS_5)
              .maxTokens(1024)
              .systemOfTextBlockParams(systemPrompt)
              .addUserMessage(userMessage)
              .build());
  }

  void main() {
      // Warm the cache before any user traffic arrives.
      prewarmCache();

      // Later, when the user submits a message, the system-prompt prefix is already cached.
      Message response = respond("How do I implement a binary search tree?");
      response.content().stream()
              .flatMap(block -> block.text().stream())
              .forEach(textBlock -> IO.println(textBlock.text()));
  }
  ```

  ```php PHP
  $client = new Client();

  $systemPrompt = [
      [
          'type' => 'text',
          'text' => 'You are an expert software engineer with deep knowledge of distributed systems...',
          'cache_control' => ['type' => 'ephemeral'],
      ],
  ];

  // Call this at application startup or on a scheduled interval.
  $prewarmCache = fn () => $client->messages->create(
      model: Model::CLAUDE_OPUS_5,
      maxTokens: 0,
      system: $systemPrompt,
      messages: [['role' => 'user', 'content' => 'warmup']],
  );

  // The real user request; benefits from a warm cache.
  $respond = fn (string $userMessage) => $client->messages->create(
      model: Model::CLAUDE_OPUS_5,
      maxTokens: 1024,
      system: $systemPrompt,
      messages: [['role' => 'user', 'content' => $userMessage]],
  );

  // Warm the cache before any user traffic arrives.
  $prewarmCache();

  // Later, when the user submits a message, the system-prompt prefix is already cached.
  $response = $respond('How do I implement a binary search tree?');
  foreach ($response->content as $block) {
      if ($block->type === 'text') {
          echo $block->text, PHP_EOL;
      }
  }
  ```

  ```ruby Ruby
  client = Anthropic::Client.new

  SYSTEM_PROMPT = [
    {
      type: "text",
      text: "You are an expert software engineer with deep knowledge of distributed systems...",
      cache_control: {type: "ephemeral"}
    }
  ]

  # Call this at application startup or on a scheduled interval.
  def prewarm_cache(client)
    client.messages.create(
      model: Anthropic::Model::CLAUDE_OPUS_5,
      max_tokens: 0,
      system_: SYSTEM_PROMPT,
      messages: [{role: "user", content: "warmup"}]
    )
  end

  # The real user request; benefits from a warm cache.
  def respond(client, user_message)
    client.messages.create(
      model: Anthropic::Model::CLAUDE_OPUS_5,
      max_tokens: 1024,
      system_: SYSTEM_PROMPT,
      messages: [{role: "user", content: user_message}]
    )
  end

  # Warm the cache before any user traffic arrives.
  prewarm_cache(client)

  # Later, when the user submits a message, the system-prompt prefix is already cached.
  response = respond(client, "How do I implement a binary search tree?")
  response.content.each do |block|
    puts block.text if block.type == :text
  end
  ```

Keep in mind that the cache TTL still applies. For the default 5-minute cache, send a new pre-warm request at least every 5 minutes to keep the cache warm. For longer gaps between user requests, use the [1-hour cache duration](https://platform.claude.com/docs/en/build-with-claude/prompt-caching#1-hour-cache-duration) instead.

### Limitations

A `max_tokens: 0` request is rejected with an `invalid_request_error` if any of the following are set, since each implies output that a zero-token budget cannot produce:

* `stream: true`
* [Extended thinking](https://platform.claude.com/docs/en/build-with-claude/extended-thinking) (`thinking.type: "enabled"`)
* [Structured outputs](https://platform.claude.com/docs/en/build-with-claude/structured-outputs) (`output_config.format`)
* `tool_choice` of `\{"type": "tool", ...\}` or `\{"type": "any"\}`

`max_tokens: 0` is also rejected inside a [Message Batches](https://platform.claude.com/docs/en/build-with-claude/batch-processing) request. Pre-warming targets time-to-first-token, which does not apply to batch processing, and a cache entry written during batch processing would likely expire before the follow-up request runs.

### Replacing the max\_tokens=1 workaround

Before `max_tokens: 0` was available, some applications used `max_tokens: 1` warm-up calls to achieve the same effect. The `max_tokens: 0` approach is preferred: no output is produced, so there is no single-token reply to discard, no output tokens are billed, and the intent of the request is unambiguous.

***
