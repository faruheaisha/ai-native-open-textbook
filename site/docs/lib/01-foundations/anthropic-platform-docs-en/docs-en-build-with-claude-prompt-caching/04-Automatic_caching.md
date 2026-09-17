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
pageSha256: "e7cedc7817a0137704e1dd8952c9be8c9584e079c444917ef993915546856f7d"
contentMode: "local-full"
zh: ""
---

## Automatic caching

Automatic caching is the simplest way to enable prompt caching. Instead of placing `cache_control` on individual content blocks, add a single `cache_control` field at the top level of your request body. The system automatically applies the cache breakpoint to the last cacheable block.

  ```bash cURL
  curl https://api.anthropic.com/v1/messages \
    -H "content-type: application/json" \
    -H "x-api-key: $ANTHROPIC_API_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -d '{
      "model": "claude-opus-5",
      "max_tokens": 1024,
      "cache_control": {"type": "ephemeral"},
      "system": "You are a helpful assistant that remembers our conversation.",
      "messages": [
        {"role": "user", "content": "My name is Alex. I work on machine learning."},
        {"role": "assistant", "content": "Nice to meet you, Alex! How can I help with your ML work today?"},
        {"role": "user", "content": "What did I say I work on?"}
      ]
    }'
  ```

  ```bash CLI
  ant messages create --transform usage <<'YAML'
  model: claude-opus-5
  max_tokens: 1024
  cache_control:
    type: ephemeral
  system: You are a helpful assistant that remembers our conversation.
  messages:
    - role: user
      content: My name is Alex. I work on machine learning.
    - role: assistant
      content: Nice to meet you, Alex! How can I help with your ML work today?
    - role: user
      content: What did I say I work on?
  YAML
  ```

  ```python Python
  client = anthropic.Anthropic()

  response = client.messages.create(
      model="claude-opus-5",
      max_tokens=1024,
      cache_control={"type": "ephemeral"},
      system="You are a helpful assistant that remembers our conversation.",
      messages=[
          {"role": "user", "content": "My name is Alex. I work on machine learning."},
          {
              "role": "assistant",
              "content": "Nice to meet you, Alex! How can I help with your ML work today?",
          },
          {"role": "user", "content": "What did I say I work on?"},
      ],
  )
  print(response.usage.model_dump_json())
  ```

  ```typescript TypeScript
  const client = new Anthropic();

  const response = await client.messages.create({
    model: "claude-opus-5",
    max_tokens: 1024,
    cache_control: { type: "ephemeral" },
    system: "You are a helpful assistant that remembers our conversation.",
    messages: [
      { role: "user", content: "My name is Alex. I work on machine learning." },
      {
        role: "assistant",
        content: "Nice to meet you, Alex! How can I help with your ML work today?"
      },
      { role: "user", content: "What did I say I work on?" }
    ]
  });
  console.log(response.usage);
  ```

  ```csharp C#
  AnthropicClient client = new();

  var parameters = new MessageCreateParams
  {
      Model = Model.ClaudeOpus5,
      MaxTokens = 1024,
      CacheControl = new CacheControlEphemeral(),
      System = "You are a helpful assistant that remembers our conversation.",
      Messages =
      [
          new()
          {
              Role = Role.User,
              Content = "My name is Alex. I work on machine learning."
          },
          new()
          {
              Role = Role.Assistant,
              Content = "Nice to meet you, Alex! How can I help with your ML work today?"
          },
          new()
          {
              Role = Role.User,
              Content = "What did I say I work on?"
          }
      ]
  };

  var message = await client.Messages.Create(parameters);
  Console.WriteLine(message.Usage);
  ```

  ```go Go
  client := anthropic.NewClient()

  response, err := client.Messages.New(context.TODO(), anthropic.MessageNewParams{
  	Model:        anthropic.ModelClaudeOpus5,
  	MaxTokens:    1024,
  	CacheControl: anthropic.NewCacheControlEphemeralParam(),
  	System: []anthropic.TextBlockParam{
  		{Text: "You are a helpful assistant that remembers our conversation."},
  	},
  	Messages: []anthropic.MessageParam{
  		anthropic.NewUserMessage(anthropic.NewTextBlock("My name is Alex. I work on machine learning.")),
  		anthropic.NewAssistantMessage(anthropic.NewTextBlock("Nice to meet you, Alex! How can I help with your ML work today?")),
  		anthropic.NewUserMessage(anthropic.NewTextBlock("What did I say I work on?")),
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
  public class AutomaticCachingExample {

      public static void main(String[] args) {
          AnthropicClient client = AnthropicOkHttpClient.fromEnv();

          MessageCreateParams params = MessageCreateParams.builder()
                  .model(Model.CLAUDE_OPUS_5)
                  .maxTokens(1024)
                  .cacheControl(CacheControlEphemeral.builder().build())
                  .system("You are a helpful assistant that remembers our conversation.")
                  .addUserMessage("My name is Alex. I work on machine learning.")
                  .addAssistantMessage("Nice to meet you, Alex! How can I help with your ML work today?")
                  .addUserMessage("What did I say I work on?")
                  .build();

          Message message = client.messages().create(params);
          System.out.println(message.usage());
      }
  }
  ```

  ```php PHP
  use Anthropic\Messages\CacheControlEphemeral;
  // ...
  $client = new Client();

  $response = $client->messages->create(
      maxTokens: 1024,
      messages: [
          ['role' => 'user', 'content' => 'My name is Alex. I work on machine learning.'],
          ['role' => 'assistant', 'content' => 'Nice to meet you, Alex! How can I help with your ML work today?'],
          ['role' => 'user', 'content' => 'What did I say I work on?'],
      ],
      model: 'claude-opus-5',
      cacheControl: CacheControlEphemeral::with(),
      system: 'You are a helpful assistant that remembers our conversation.',
  );
  echo json_encode($response->usage);
  ```

  ```ruby Ruby
  client = Anthropic::Client.new

  response = client.messages.create(
    model: "claude-opus-5",
    max_tokens: 1024,
    cache_control: {type: "ephemeral"},
    system: "You are a helpful assistant that remembers our conversation.",
    messages: [
      {role: "user", content: "My name is Alex. I work on machine learning."},
      {role: "assistant", content: "Nice to meet you, Alex! How can I help with your ML work today?"},
      {role: "user", content: "What did I say I work on?"}
    ]
  )
  puts response.usage
  ```

### How automatic caching works in multi-turn conversations

With automatic caching, the cache point moves forward automatically as conversations grow. Each new request caches everything up to the last cacheable block, and previous content is read from cache.

| Request   | Content                                                                                  | Cache behavior                                                             |
| --------- | ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Request 1 | System + User(1) + Asst(1) + **User(2)** ◀ cache                                         | Everything written to cache                                                |
| Request 2 | System + User(1) + Asst(1) + User(2) + Asst(2) + **User(3)** ◀ cache                     | System through User(2) read from cache; Asst(2) + User(3) written to cache |
| Request 3 | System + User(1) + Asst(1) + User(2) + Asst(2) + User(3) + Asst(3) + **User(4)** ◀ cache | System through User(3) read from cache; Asst(3) + User(4) written to cache |

The cache breakpoint automatically moves to the last cacheable block in each request, so you don't need to update any `cache_control` markers as the conversation grows.

### TTL support

By default, automatic caching uses a 5-minute TTL. You can specify a 1-hour TTL at 2x the base input token price:

```json
{ "cache_control": { "type": "ephemeral", "ttl": "1h" } }
```

### Combining with block-level caching

Automatic caching is compatible with [explicit cache breakpoints](https://platform.claude.com/docs/en/build-with-claude/prompt-caching#explicit-cache-breakpoints). When used together, the automatic cache breakpoint uses one of the 4 available breakpoint slots.

This lets you combine both approaches. For example, use an explicit breakpoint to cache your system prompt, while automatic caching handles the conversation:

```json
{
  "model": "claude-opus-5",
  "max_tokens": 1024,
  "cache_control": { "type": "ephemeral" },
  "system": [
    {
      "type": "text",
      "text": "You are a helpful assistant.",
      "cache_control": { "type": "ephemeral" }
    }
  ],
  "messages": [{ "role": "user", "content": "What are the key terms?" }]
}
```

### What stays the same

Automatic caching uses the same underlying caching infrastructure. Pricing, minimum token thresholds, context ordering requirements, and the 20-block lookback window all apply the same as with explicit breakpoints.

### Edge cases

* If the last block already has an explicit `cache_control` with the same TTL, automatic caching is a no-op.
* If the last block has an explicit `cache_control` with a different TTL, the API returns a 400 error.
* If 4 explicit block-level breakpoints already exist, the API returns a 400 error (no slots left for automatic caching).
* If the last block is not eligible as an automatic cache breakpoint target, the system silently walks backwards to find the nearest eligible block. If none is found, caching is skipped.

  Automatic caching is available on every platform except the legacy [Amazon Bedrock (Opus 4.6 and earlier)](https://platform.claude.com/docs/en/build-with-claude/claude-on-amazon-bedrock-legacy) integration. On that integration, the API returns a 400 error for a top-level `cache_control` field, so use [explicit cache breakpoints](https://platform.claude.com/docs/en/build-with-claude/prompt-caching#explicit-cache-breakpoints) instead.

***
