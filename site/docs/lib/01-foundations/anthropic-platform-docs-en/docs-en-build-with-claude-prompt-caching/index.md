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
pageSha256: "4ae3b4f16b1797c6c4ae1a5a9c202f89bbe150322908c95686dffe3e0173276b"
contentMode: "local-full"
zh: ""
---

Prompt caching optimizes your API usage by allowing resuming from specific prefixes in your prompts. This significantly reduces processing time and costs for repetitive tasks or prompts with consistent elements.

  To learn how zero data retention (ZDR) applies to this feature, see [API and data retention](https://platform.claude.com/docs/en/manage-claude/api-and-data-retention).

There are two ways to enable prompt caching:

* **[Automatic caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching#automatic-caching)**: Add a single `cache_control` field at the top level of your request. The system automatically applies the cache breakpoint to the last cacheable block and moves it forward as conversations grow. Best for multi-turn conversations where the growing message history should be cached automatically.
* **[Explicit cache breakpoints](https://platform.claude.com/docs/en/build-with-claude/prompt-caching#explicit-cache-breakpoints)**: Place `cache_control` directly on individual content blocks for fine-grained control over exactly what gets cached.

The simplest way to start is with automatic caching:

  ```bash cURL
  curl https://api.anthropic.com/v1/messages \
    -H "content-type: application/json" \
    -H "x-api-key: $ANTHROPIC_API_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -d '{
      "model": "claude-opus-5",
      "max_tokens": 1024,
      "cache_control": {"type": "ephemeral"},
      "system": "You are an AI assistant tasked with analyzing literary works. Your goal is to provide insightful commentary on themes, characters, and writing style.",
      "messages": [
        {
          "role": "user",
          "content": "Analyze the major themes in Pride and Prejudice."
        }
      ]
    }'
  ```

  ```bash CLI
  ant messages create --transform usage <<'YAML'
  model: claude-opus-5
  max_tokens: 1024
  cache_control:
    type: ephemeral
  system: >-
    You are an AI assistant tasked with analyzing literary works. Your goal is
    to provide insightful commentary on themes, characters, and writing style.
  messages:
    - role: user
      content: Analyze the major themes in Pride and Prejudice.
  YAML
  ```

  ```python Python
  client = anthropic.Anthropic()

  response = client.messages.create(
      model="claude-opus-5",
      max_tokens=1024,
      cache_control={"type": "ephemeral"},
      system="You are an AI assistant tasked with analyzing literary works. Your goal is to provide insightful commentary on themes, characters, and writing style.",
      messages=[
          {
              "role": "user",
              "content": "Analyze the major themes in 'Pride and Prejudice'.",
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
    cache_control: { type: "ephemeral" },
    system:
      "You are an AI assistant tasked with analyzing literary works. Your goal is to provide insightful commentary on themes, characters, and writing style.",
    messages: [
      {
        role: "user",
        content: "Analyze the major themes in 'Pride and Prejudice'."
      }
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
      System = "You are an AI assistant tasked with analyzing literary works. Your goal is to provide insightful commentary on themes, characters, and writing style.",
      Messages =
      [
          new()
          {
              Role = Role.User,
              Content = "Analyze the major themes in 'Pride and Prejudice'."
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
  		{Text: "You are an AI assistant tasked with analyzing literary works. Your goal is to provide insightful commentary on themes, characters, and writing style."},
  	},
  	Messages: []anthropic.MessageParam{
  		anthropic.NewUserMessage(anthropic.NewTextBlock("Analyze the major themes in 'Pride and Prejudice'.")),
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
  public class PromptCachingExample {

    public static void main(String[] args) {
      AnthropicClient client = AnthropicOkHttpClient.fromEnv();

      MessageCreateParams params = MessageCreateParams.builder()
          .model(Model.CLAUDE_OPUS_5)
          .maxTokens(1024)
          .cacheControl(CacheControlEphemeral.builder().build())
          .system("You are an AI assistant tasked with analyzing literary works. Your goal is to provide insightful commentary on themes, characters, and writing style.")
          .addUserMessage("Analyze the major themes in 'Pride and Prejudice'.")
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
          ['role' => 'user', 'content' => "Analyze the major themes in 'Pride and Prejudice'."]
      ],
      model: 'claude-opus-5',
      cacheControl: CacheControlEphemeral::with(),
      system: "You are an AI assistant tasked with analyzing literary works. Your goal is to provide insightful commentary on themes, characters, and writing style.",
  );
  echo json_encode($response->usage);
  ```

  ```ruby Ruby
  client = Anthropic::Client.new

  response = client.messages.create(
    model: "claude-opus-5",
    max_tokens: 1024,
    cache_control: {type: "ephemeral"},
    system: "You are an AI assistant tasked with analyzing literary works. Your goal is to provide insightful commentary on themes, characters, and writing style.",
    messages: [
      {
        role: "user",
        content: "Analyze the major themes in 'Pride and Prejudice'."
      }
    ]
  )
  puts response.usage
  ```

With automatic caching, the system caches all content up to and including the last cacheable block. On subsequent requests with the same prefix, cached content is reused automatically.

***

## 本篇目录

- [How prompt caching works](https://platform.claude.com/docs)
- [Pricing](https://platform.claude.com/docs)
- [Supported models](https://platform.claude.com/docs)
- [Automatic caching](https://platform.claude.com/docs)
- [Explicit cache breakpoints](https://platform.claude.com/docs)
- [Caching strategies and considerations](https://platform.claude.com/docs)
- [1-hour cache duration](https://platform.claude.com/docs)
- [Pre-warming the cache](https://platform.claude.com/docs)
- [Prompt caching examples](https://platform.claude.com/docs)
- [Data retention](https://platform.claude.com/docs)
- [FAQ](https://platform.claude.com/docs)
