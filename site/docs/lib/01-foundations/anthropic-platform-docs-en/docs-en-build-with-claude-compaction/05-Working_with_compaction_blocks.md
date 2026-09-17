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
pageSha256: "5dd560cf1d0d7ce17bde7cfc9c04015d82da92045a205d14accb6dae2ec71f77"
contentMode: "local-full"
zh: ""
---

## Working with compaction blocks

When compaction is triggered, the API returns a `compaction` block at the start of the assistant response.

A long-running conversation might result in multiple compactions. The last compaction block reflects the final state of the prompt, replacing content prior to it with the generated summary.

```json Output
{
  "content": [
    {
      "type": "compaction",
      "content": "Summary of the conversation: The user requested help building a web scraper..."
    },
    {
      "type": "text",
      "text": "Based on our conversation so far..."
    }
  ]
}
```

### Passing compaction blocks back

You must pass the `compaction` block back to the API on subsequent requests to continue the conversation with the shortened prompt. The simplest approach is to append the entire response content to your messages:

  ```bash cURL
  # The response content, including the compaction block, must go back to the
  # API as the assistant turn of the next request. Managing that message list
  # doesn't translate well to a one-off shell command; see the CLI and SDK
  # tabs for the full flow. First request:
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
          "content": "Hello, Claude"
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
  ant beta:messages create \
    --beta compact-2026-01-12 \
    --transform content \
    --format jsonl <<'YAML' > content.json
  model: claude-opus-5
  max_tokens: 4096
  messages:
    - role: user
      content: Hello, Claude
  context_management:
    edits:
      - type: compact_20260112
  YAML

  # After receiving a response with a compaction block, append it as the
  # assistant turn and continue the conversation
  ant beta:messages create --beta compact-2026-01-12 <<YAML
  model: claude-opus-5
  max_tokens: 4096
  messages:
    - role: user
      content: Hello, Claude
    - role: assistant
      content: $(cat content.json)
    - role: user
      content: Now add error handling
  context_management:
    edits:
      - type: compact_20260112
  YAML
  ```

  ```python Python
  client = anthropic.Anthropic()
  messages = [{"role": "user", "content": "Hello, Claude"}]
  response = client.beta.messages.create(
      betas=["compact-2026-01-12"],
      model="claude-opus-5",
      max_tokens=4096,
      messages=messages,
      context_management={"edits": [{"type": "compact_20260112"}]},
  )
  # After receiving a response with a compaction block
  messages.append({"role": "assistant", "content": response.content})

  # Continue the conversation
  messages.append({"role": "user", "content": "Now add error handling"})

  response = client.beta.messages.create(
      betas=["compact-2026-01-12"],
      model="claude-opus-5",
      max_tokens=4096,
      messages=messages,
      context_management={"edits": [{"type": "compact_20260112"}]},
  )
  ```

  ```typescript TypeScript
  const client = new Anthropic();
  const messages: Anthropic.Beta.Messages.BetaMessageParam[] = [
    { role: "user", content: "Hello, Claude" }
  ];

  const response = await client.beta.messages.create({
    betas: ["compact-2026-01-12"],
    model: "claude-opus-5",
    max_tokens: 4096,
    messages,
    context_management: {
      edits: [{ type: "compact_20260112" }]
    }
  });

  // After receiving a response with a compaction block
  messages.push({
    role: "assistant",
    content: response.content
  });

  // Continue the conversation
  messages.push({ role: "user", content: "Now add error handling" });

  const nextResponse = await client.beta.messages.create({
    betas: ["compact-2026-01-12"],
    model: "claude-opus-5",
    max_tokens: 4096,
    messages,
    context_management: {
      edits: [{ type: "compact_20260112" }]
    }
  });
  ```

  ```csharp C#
  AnthropicClient client = new();

  var messages = new List<BetaMessageParam>
  {
      new() { Role = Role.User, Content = "Help me build a web scraper" }
  };

  var response = await client.Beta.Messages.Create(new()
  {
      Betas = ["compact-2026-01-12"],
      Model = "claude-opus-5",
      MaxTokens = 4096,
      Messages = messages,
      ContextManagement = new BetaContextManagementConfig
      {
          Edits = [new BetaCompact20260112Edit()]
      }
  });

  messages.Add(new BetaMessageParam
  {
      Role = Role.Assistant,
      Content = response.Content.Select(block => new BetaContentBlockParam(block.Json)).ToList()
  });

  messages.Add(new BetaMessageParam { Role = Role.User, Content = "Now add error handling" });

  var nextResponse = await client.Beta.Messages.Create(new()
  {
      Betas = ["compact-2026-01-12"],
      Model = "claude-opus-5",
      MaxTokens = 4096,
      Messages = messages,
      ContextManagement = new BetaContextManagementConfig
      {
          Edits = [new BetaCompact20260112Edit()]
      }
  });

  Console.WriteLine(nextResponse);
  ```

  ```go Go
  client := anthropic.NewClient()

  messages := []anthropic.BetaMessageParam{
  	anthropic.NewBetaUserMessage(anthropic.NewBetaTextBlock("Help me build a web scraper")),
  }

  compactEdit := anthropic.BetaContextManagementConfigParam{
  	Edits: []anthropic.BetaContextManagementConfigEditUnionParam{
  		{OfCompact20260112: &anthropic.BetaCompact20260112EditParam{}},
  	},
  }

  response, err := client.Beta.Messages.New(context.TODO(), anthropic.BetaMessageNewParams{
  	Model:             anthropic.ModelClaudeOpus5,
  	MaxTokens:         4096,
  	Messages:          messages,
  	ContextManagement: compactEdit,
  	Betas:             []anthropic.AnthropicBeta{"compact-2026-01-12"},
  })
  if err != nil {
  	log.Fatal(err)
  }

  messages = append(messages, response.ToParam())

  messages = append(messages, anthropic.NewBetaUserMessage(anthropic.NewBetaTextBlock("Now add error handling")))

  nextResponse, err := client.Beta.Messages.New(context.TODO(), anthropic.BetaMessageNewParams{
  	Model:             anthropic.ModelClaudeOpus5,
  	MaxTokens:         4096,
  	Messages:          messages,
  	ContextManagement: compactEdit,
  	Betas:             []anthropic.AnthropicBeta{"compact-2026-01-12"},
  })
  if err != nil {
  	log.Fatal(err)
  }

  fmt.Println(nextResponse)
  ```

  ```java Java
  import com.anthropic.models.beta.messages.BetaContextManagementConfig;
  import com.anthropic.models.beta.messages.BetaCompact20260112Edit;
  // ...
          AnthropicClient client = AnthropicOkHttpClient.fromEnv();

          // First request
          BetaMessage response = client.beta().messages().create(
              MessageCreateParams.builder()
                  .addBeta("compact-2026-01-12")
                  .model("claude-opus-5")
                  .maxTokens(4096L)
                  .addUserMessage("Help me build a web scraper")
                  .contextManagement(BetaContextManagementConfig.builder()
                      .addEdit(BetaCompact20260112Edit.builder().build())
                      .build())
                  .build());

          // After receiving a response with a compaction block, append the full
          // content (including compaction blocks) and continue the conversation
          BetaMessage nextResponse = client.beta().messages().create(
              MessageCreateParams.builder()
                  .addBeta("compact-2026-01-12")
                  .model("claude-opus-5")
                  .maxTokens(4096L)
                  .addUserMessage("Help me build a web scraper")
                  .addMessage(response)
                  .addUserMessage("Now add error handling")
                  .contextManagement(BetaContextManagementConfig.builder()
                      .addEdit(BetaCompact20260112Edit.builder().build())
                      .build())
                  .build());

          System.out.println(nextResponse);
  ```

  ```php PHP
  $client = new Client();

  $messages = [
      ['role' => 'user', 'content' => 'Help me build a web scraper']
  ];

  $response = $client->beta->messages->create(
      maxTokens: 4096,
      messages: $messages,
      model: 'claude-opus-5',
      betas: ['compact-2026-01-12'],
      contextManagement: [
          'edits' => [['type' => 'compact_20260112']]
      ]
  );

  $messages[] = ['role' => 'assistant', 'content' => $response->content];

  $messages[] = ['role' => 'user', 'content' => 'Now add error handling'];

  $nextResponse = $client->beta->messages->create(
      maxTokens: 4096,
      messages: $messages,
      model: 'claude-opus-5',
      betas: ['compact-2026-01-12'],
      contextManagement: [
          'edits' => [['type' => 'compact_20260112']]
      ]
  );

  echo json_encode($nextResponse, JSON_PRETTY_PRINT), PHP_EOL;
  ```

  ```ruby Ruby
  client = Anthropic::Client.new

  messages = [
    { role: "user", content: "Help me build a web scraper" }
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

  messages << { role: "assistant", content: response.content }

  messages << { role: "user", content: "Now add error handling" }

  next_response = client.beta.messages.create(
    betas: ["compact-2026-01-12"],
    model: "claude-opus-5",
    max_tokens: 4096,
    messages: messages,
    context_management: {
      edits: [{ type: "compact_20260112" }]
    }
  )

  puts next_response.content
  ```

When the API receives a `compaction` block, all content blocks before it are ignored. You can either:

* Keep the original messages in your list and let the API handle removing the compacted content
* Manually drop the compacted messages and only include the compaction block onwards

On Claude Fable 5.1 and Claude Mythos 5.1, thinking blocks from before a `compaction` block aren't carried forward, so the summary is all the model has of that earlier work. If you write your own `instructions`, tell the model what the summary must retain; see [Tell the model what to preserve in compaction summaries](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-1#tell-the-model-what-to-preserve-in-compaction-summaries).

### Streaming

The compaction block streams differently from text blocks. You receive a `content_block_start` event, followed by a single `content_block_delta` with the complete summary content (no intermediate streaming), and then a `content_block_stop` event.

  ```bash cURL
  curl https://api.anthropic.com/v1/messages \
    -H "x-api-key: $ANTHROPIC_API_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -H "anthropic-beta: compact-2026-01-12" \
    -H "content-type: application/json" \
    -d '{
      "model": "claude-opus-5",
      "max_tokens": 4096,
      "stream": true,
      "messages": [
        {
          "role": "user",
          "content": "Hello, Claude"
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
  ant beta:messages create \
    --stream \
    --beta compact-2026-01-12 \
    --format jsonl <<'YAML'
  model: claude-opus-5
  max_tokens: 4096
  messages:
    - role: user
      content: Hello, Claude
  context_management:
    edits:
      - type: compact_20260112
  YAML
  ```

  ```python Python
  client = anthropic.Anthropic()
  messages = [{"role": "user", "content": "Hello, Claude"}]

  with client.beta.messages.stream(
      betas=["compact-2026-01-12"],
      model="claude-opus-5",
      max_tokens=4096,
      messages=messages,
      context_management={"edits": [{"type": "compact_20260112"}]},
  ) as stream:
      for event in stream:
          if event.type == "content_block_start":
              if event.content_block.type == "compaction":
                  print("Compaction started...")
              elif event.content_block.type == "text":
                  print("Text response started...")

          elif event.type == "content_block_delta":
              if event.delta.type == "compaction_delta":
                  print(f"Compaction complete: {len(event.delta.content or '')} chars")
              elif event.delta.type == "text_delta":
                  print(event.delta.text, end="", flush=True)

      # Get the final accumulated message
      message = stream.get_final_message()
      messages.append({"role": "assistant", "content": message.content})
  ```

  ```typescript TypeScript
  const client = new Anthropic();
  const messages: Anthropic.Beta.Messages.BetaMessageParam[] = [
    { role: "user", content: "Hello, Claude" }
  ];

  const stream = await client.beta.messages.stream({
    betas: ["compact-2026-01-12"],
    model: "claude-opus-5",
    max_tokens: 4096,
    messages,
    context_management: {
      edits: [{ type: "compact_20260112" }]
    }
  });

  for await (const event of stream) {
    if (event.type === "content_block_start") {
      if (event.content_block.type === "compaction") {
        console.log("Compaction started...");
      } else if (event.content_block.type === "text") {
        console.log("Text response started...");
      }
    } else if (event.type === "content_block_delta") {
      if (event.delta.type === "compaction_delta") {
        console.log(`Compaction complete: ${event.delta.content?.length ?? 0} chars`);
      } else if (event.delta.type === "text_delta") {
        process.stdout.write(event.delta.text);
      }
    }
  }

  // Get the final accumulated message
  const message = await stream.finalMessage();
  messages.push({
    role: "assistant",
    content: message.content
  });
  ```

  ```csharp C#
  var client = new AnthropicClient();
  List<BetaMessageParam> messages = [new() { Role = Role.User, Content = "Hello" }];

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

  await foreach (var streamEvent in client.Beta.Messages.CreateStreaming(parameters))
  {
      if (streamEvent.TryPickContentBlockStart(out var startEvent))
      {
          if (startEvent.ContentBlock.TryPickBetaCompaction(out _))
          {
              Console.WriteLine("Compaction started...");
          }
          else if (startEvent.ContentBlock.TryPickBetaText(out _))
          {
              Console.WriteLine("Text response started...");
          }
      }
      else if (streamEvent.TryPickContentBlockDelta(out var deltaEvent))
      {
          if (deltaEvent.Delta.TryPickCompaction(out var compactionDelta))
          {
              Console.WriteLine($"Compaction complete: {compactionDelta.Content?.Length ?? 0} chars");
          }
          else if (deltaEvent.Delta.TryPickText(out var textDelta))
          {
              Console.Write(textDelta.Text);
          }
      }
  }
  ```

  ```go Go
  client := anthropic.NewClient()
  messages := []anthropic.BetaMessageParam{anthropic.NewBetaUserMessage(anthropic.NewBetaTextBlock("Hello, Claude"))}

  stream := client.Beta.Messages.NewStreaming(context.TODO(), anthropic.BetaMessageNewParams{
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

  for stream.Next() {
  	event := stream.Current()
  	switch eventVariant := event.AsAny().(type) {
  	case anthropic.BetaRawContentBlockStartEvent:
  		switch eventVariant.ContentBlock.AsAny().(type) {
  		case anthropic.BetaCompactionBlock:
  			fmt.Println("Compaction started...")
  		case anthropic.BetaTextBlock:
  			fmt.Println("Text response started...")
  		}
  	case anthropic.BetaRawContentBlockDeltaEvent:
  		switch deltaVariant := eventVariant.Delta.AsAny().(type) {
  		case anthropic.BetaCompactionContentBlockDelta:
  			fmt.Printf("Compaction complete: %d chars\n", len(deltaVariant.Content))
  		case anthropic.BetaTextDelta:
  			fmt.Print(deltaVariant.Text)
  		}
  	}
  }
  if err := stream.Err(); err != nil {
  	log.Fatal(err)
  }
  ```

  ```java Java
  import com.anthropic.models.beta.messages.BetaContextManagementConfig;
  import com.anthropic.models.beta.messages.BetaCompact20260112Edit;
  // ...
          AnthropicClient client = AnthropicOkHttpClient.fromEnv();

          MessageCreateParams params = MessageCreateParams.builder()
              .model("claude-opus-5")
              .maxTokens(4096L)
              .addBeta("compact-2026-01-12")
              .addUserMessage("Hello, Claude")
              .contextManagement(BetaContextManagementConfig.builder()
                  .addEdit(BetaCompact20260112Edit.builder().build())
                  .build())
              .build();

          try (var streamResponse = client.beta().messages().createStreaming(params)) {
              streamResponse.stream().forEach(event -> {
                  event.contentBlockStart().ifPresent(startEvent -> {
                      startEvent.contentBlock().compaction().ifPresent(c ->
                          System.out.println("Compaction started...")
                      );
                      startEvent.contentBlock().text().ifPresent(t ->
                          System.out.println("Text response started...")
                      );
                  });

                  event.contentBlockDelta().ifPresent(deltaEvent -> {
                      deltaEvent.delta().compaction().ifPresent(cd ->
                          System.out.println("Compaction complete: " + cd.content().map(String::length).orElse(0) + " chars")
                      );
                      deltaEvent.delta().text().ifPresent(td ->
                          System.out.print(td.text())
                      );
                  });
              });
          }
  ```

  ```php PHP
  $client = new Client();
  $messages = [['role' => 'user', 'content' => 'Hello, Claude']];

  $stream = $client->beta->messages->createStream(
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

  foreach ($stream as $event) {
      if ($event->type === 'content_block_start') {
          if ($event->contentBlock->type === 'compaction') {
              echo "Compaction started...\n";
          } elseif ($event->contentBlock->type === 'text') {
              echo "Text response started...\n";
          }
      } elseif ($event->type === 'content_block_delta') {
          if ($event->delta->type === 'compaction_delta') {
              echo "Compaction complete: " . strlen($event->delta->content ?? '') . " chars\n";
          } elseif ($event->delta->type === 'text_delta') {
              echo $event->delta->text;
          }
      }
  }
  ```

  ```ruby Ruby
  client = Anthropic::Client.new
  messages = [{ role: "user", content: "Hello, Claude" }]

  stream = client.beta.messages.stream(
    betas: ["compact-2026-01-12"],
    model: "claude-opus-5",
    max_tokens: 4096,
    messages: messages,
    context_management: {
      edits: [{ type: "compact_20260112" }]
    }
  )

  stream.each do |event|
    case event.type
    when :content_block_start
      if event.content_block.type == :compaction
        puts "Compaction started..."
      elsif event.content_block.type == :text
        puts "Text response started..."
      end
    when :content_block_delta
      if event.delta.type == :compaction_delta
        puts "Compaction complete: #{(event.delta.content || "").length} chars"
      elsif event.delta.type == :text_delta
        print event.delta.text
      end
    end
  end
  ```

### Prompt caching

Compaction works well with [prompt caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching). You can add a `cache_control` breakpoint on compaction blocks to cache the summarized content.

```json
{
  "role": "assistant",
  "content": [
    {
      "type": "compaction",
      "content": "[summary text]",
      "cache_control": { "type": "ephemeral" }
    },
    {
      "type": "text",
      "text": "Based on our conversation..."
    }
  ]
}
```

#### Maximizing cache hits with system prompts

When compaction occurs, the summary becomes new content that needs to be written to the cache. Without additional cache breakpoints, this would also invalidate any cached system prompt, requiring it to be re-cached along with the compaction summary.

To maximize cache hit rates, add a `cache_control` breakpoint at the end of your system prompt. This keeps the system prompt cached separately from the conversation, so when compaction occurs:

* The system prompt cache remains valid and is read from cache
* Only the compaction summary needs to be written as a new cache entry

  ```bash cURL
  curl https://api.anthropic.com/v1/messages \
    -H "x-api-key: $ANTHROPIC_API_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -H "anthropic-beta: compact-2026-01-12" \
    -H "content-type: application/json" \
    -d '{
      "model": "claude-opus-5",
      "max_tokens": 4096,
      "system": [
        {
          "type": "text",
          "text": "You are a helpful coding assistant...",
          "cache_control": {
            "type": "ephemeral"
          }
        }
      ],
      "messages": [
        {
          "role": "user",
          "content": "Hello, Claude"
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
  system:
    - type: text
      text: You are a helpful coding assistant...
      cache_control:
        type: ephemeral
  messages:
    - role: user
      content: Hello, Claude
  context_management:
    edits:
      - type: compact_20260112
  YAML
  ```

  ```python Python
  client = anthropic.Anthropic()
  messages = [{"role": "user", "content": "Hello, Claude"}]
  response = client.beta.messages.create(
      betas=["compact-2026-01-12"],
      model="claude-opus-5",
      max_tokens=4096,
      system=[
          {
              "type": "text",
              "text": "You are a helpful coding assistant...",
              "cache_control": {
                  "type": "ephemeral"
              },  # Cache the system prompt separately
          }
      ],
      messages=messages,
      context_management={"edits": [{"type": "compact_20260112"}]},
  )
  ```

  ```typescript TypeScript
  const client = new Anthropic();
  const messages: Anthropic.Beta.Messages.BetaMessageParam[] = [
    { role: "user", content: "Hello, Claude" }
  ];

  const response = await client.beta.messages.create({
    betas: ["compact-2026-01-12"],
    model: "claude-opus-5",
    max_tokens: 4096,
    system: [
      {
        type: "text",
        text: "You are a helpful coding assistant...",
        cache_control: { type: "ephemeral" } // Cache the system prompt separately
      }
    ],
    messages,
    context_management: {
      edits: [{ type: "compact_20260112" }]
    }
  });
  ```

  ```csharp C#
  var client = new AnthropicClient();

  var parameters = new MessageCreateParams
  {
      Betas = ["compact-2026-01-12"],
      Model = "claude-opus-5",
      MaxTokens = 4096,
      System = new List<BetaTextBlockParam>
      {
          new()
          {
              Text = "You are a helpful coding assistant...",
              CacheControl = new BetaCacheControlEphemeral()
          }
      },
      Messages = [new() { Role = Role.User, Content = "Hello, Claude" }],
      ContextManagement = new BetaContextManagementConfig
      {
          Edits = [new BetaCompact20260112Edit()]
      }
  };

  var response = await client.Beta.Messages.Create(parameters);
  Console.WriteLine(response);
  ```

  ```go Go
  client := anthropic.NewClient()

  response, err := client.Beta.Messages.New(context.TODO(), anthropic.BetaMessageNewParams{
  	Model:     anthropic.ModelClaudeOpus5,
  	MaxTokens: 4096,
  	System: []anthropic.BetaTextBlockParam{
  		{
  			Text:         "You are a helpful coding assistant...",
  			CacheControl: anthropic.NewBetaCacheControlEphemeralParam(),
  		},
  	},
  	Messages: []anthropic.BetaMessageParam{anthropic.NewBetaUserMessage(anthropic.NewBetaTextBlock("Hello, Claude"))},
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
  fmt.Println(response)
  ```

  ```java Java
  import com.anthropic.models.beta.messages.BetaContextManagementConfig;
  import com.anthropic.models.beta.messages.BetaCompact20260112Edit;
  import com.anthropic.models.beta.messages.BetaCacheControlEphemeral;
  // ...
          AnthropicClient client = AnthropicOkHttpClient.fromEnv();

          MessageCreateParams params = MessageCreateParams.builder()
              .model("claude-opus-5")
              .maxTokens(4096L)
              .addBeta("compact-2026-01-12")
              .systemOfBetaTextBlockParams(List.of(
                  BetaTextBlockParam.builder()
                      .text("You are a helpful coding assistant...")
                      .cacheControl(BetaCacheControlEphemeral.builder().build())
                      .build()
              ))
              .addUserMessage("Hello, Claude")
              .contextManagement(BetaContextManagementConfig.builder()
                  .addEdit(BetaCompact20260112Edit.builder().build())
                  .build())
              .build();

          BetaMessage response = client.beta().messages().create(params);
          System.out.println(response);
  ```

  ```php PHP
  $client = new Client();

  $response = $client->beta->messages->create(
      maxTokens: 4096,
      messages: [['role' => 'user', 'content' => 'Hello, Claude']],
      model: 'claude-opus-5',
      betas: ['compact-2026-01-12'],
      system: [
          [
              'type' => 'text',
              'text' => 'You are a helpful coding assistant...',
              'cache_control' => [
                  'type' => 'ephemeral'
              ]
          ]
      ],
      contextManagement: [
          'edits' => [
              ['type' => 'compact_20260112']
          ]
      ]
  );

  echo json_encode($response, JSON_PRETTY_PRINT), PHP_EOL;
  ```

  ```ruby Ruby
  client = Anthropic::Client.new

  response = client.beta.messages.create(
    betas: ["compact-2026-01-12"],
    model: "claude-opus-5",
    max_tokens: 4096,
    system: [
      {
        type: "text",
        text: "You are a helpful coding assistant...",
        cache_control: {
          type: "ephemeral"
        }
      }
    ],
    messages: [{ role: "user", content: "Hello, Claude" }],
    context_management: {
      edits: [{ type: "compact_20260112" }]
    }
  )
  puts response
  ```

This keeps long system prompts cached across multiple compaction events throughout a conversation.
