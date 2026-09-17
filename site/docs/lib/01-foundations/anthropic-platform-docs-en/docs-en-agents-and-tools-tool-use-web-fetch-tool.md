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
sourceRel: "docs/en/agents-and-tools/tool-use/web-fetch-tool.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/agents-and-tools/tool-use/web-fetch-tool.md"
sourceSha256: "7ef76048dbc7892c908bce299bdf4e5ca0412601215fb01c3821ea9348f95d80"
pageSha256: "7ef76048dbc7892c908bce299bdf4e5ca0412601215fb01c3821ea9348f95d80"
contentMode: "local-full"
zh: ""
---

# Anthropic 平台文档（英文全量）

To learn how zero data retention (ZDR) applies to this feature, see [API and data retention](https://platform.claude.com/docs/en/manage-claude/api-and-data-retention).

The web fetch tool allows Claude to retrieve full content from specified web pages and PDF documents.

The latest web fetch tool version (`web_fetch_20260318`) supports **dynamic filtering**: Claude can write and execute code to filter fetched content before it reaches the context window, keeping only relevant information and discarding the rest. This reduces token consumption while maintaining response quality. Dynamic filtering is available with Claude Fable 5.1, Claude Mythos 5.1, Claude Fable 5, Claude Mythos 5, [Claude Mythos Preview](https://anthropic.com/glasswing), Claude Opus 4.8, Claude Opus 4.7, Claude Opus 4.6, Claude Sonnet 5, and Claude Sonnet 4.6. `web_fetch_20260318` also adds [response inclusion](https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-fetch-tool#response-inclusion) control for agentic workflows. The previous versions (`web_fetch_20260309` for dynamic filtering and [cache bypass](https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-fetch-tool#cache-bypass), `web_fetch_20260209` for dynamic filtering only, `web_fetch_20250910` for basic fetch) remain available.

Web fetch (with and without dynamic filtering) is available on the Claude API, [Claude Platform on AWS](https://platform.claude.com/docs/en/build-with-claude/claude-platform-on-aws), and [Microsoft Foundry](https://platform.claude.com/docs/en/build-with-claude/claude-in-microsoft-foundry). On Microsoft Foundry, deployments [hosted on Azure](https://platform.claude.com/docs/en/build-with-claude/claude-in-microsoft-foundry#additional-features-not-supported-when-hosted-on-azure) support only the basic web fetch tool (`web_fetch_20250910`, without dynamic filtering). Deployments hosted on Anthropic support all versions. Web fetch is not currently available on Amazon Bedrock or Google Cloud.

  For [Claude Mythos Preview](https://anthropic.com/glasswing), web fetch is available on the Claude API and Microsoft Foundry. It is not currently available for Mythos Preview on Amazon Bedrock or Google Cloud.

  Use the [feedback form](https://forms.gle/NhWcgmkcvPCMmPE86) to provide feedback on the quality of the model responses, the API itself, or the quality of the documentation.

For Zero Data Retention eligibility and the `allowed_callers` workaround, see [Server tools](https://platform.claude.com/docs/en/agents-and-tools/tool-use/server-tools#zdr-and-allowed-callers).

  Enabling the web fetch tool in environments where Claude processes untrusted input alongside sensitive data poses data exfiltration risks. Only use this tool in trusted environments or when handling non-sensitive data.

  To minimize exfiltration risks, Claude cannot fetch URLs that appear only in its own output. Claude can only fetch URLs that have previously appeared in the conversation: URLs in user messages, URLs in client-side tool results (even when a result echoes text that Claude generated), and URLs from previous web search or web fetch results (see [URL validation](https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-fetch-tool#url-validation)). However, there is still residual risk that you should carefully consider when using this tool.

  If data exfiltration is a concern, consider:

  * Disabling the web fetch tool entirely
  * Using the `max_uses` parameter to limit the number of requests
  * Using the `allowed_domains` parameter to restrict to known safe domains

For model support, see the [Tool reference](https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-reference).

## How web fetch works

Web fetch is a [server tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/server-tools): the API fetches the content during the request and inserts the results into the conversation. You don't run anything or return a `tool_result`. The exception is when Claude calls web fetch and one of your client tools in the same group of parallel tool calls: the API returns the response with `stop_reason: "tool_use"` before that fetch has run, then runs the fetch when you send back the client `tool_result` blocks. See [Mixing server tools and client tools in one turn](https://platform.claude.com/docs/en/agents-and-tools/tool-use/server-tools#mixing-server-tools-and-client-tools-in-one-turn).

When you add the web fetch tool to your API request:

1. Claude determines when to fetch content based on the prompt and available URLs.
2. The API retrieves the full text content from the specified URL.
3. For PDFs, the API returns the content as base64-encoded data and processes it like a directly attached PDF document.
4. Claude analyzes the fetched content and provides a response with optional citations.

  The web fetch tool currently does not support websites dynamically rendered with JavaScript. For pages that need a real browser (JavaScript rendering, clicking, or filling forms), consider the [browser use tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/browser-use-tool), a client tool where your application drives the browser and returns page text or screenshots to Claude as tool results.

### When Claude fetches

Claude fetches when the request points at a specific page or document:

* A URL is provided in the conversation (or a previous tool result)
* The user names a specific resource (a particular article, README, pricing page, or documentation section) without a URL, and the [web search tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-search-tool) is also enabled so Claude can locate it first (see [Combined search and fetch](https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-fetch-tool#combined-search-and-fetch))

Claude does **not** fetch for general-knowledge or open-ended questions that don't reference a specific page. "Summarize this article: `<url>`" triggers a fetch. "What are best practices for REST API design?" is answered directly.

### Dynamic filtering

Fetching full web pages and PDFs can quickly consume tokens, especially when only specific information is needed from large documents. With `web_fetch_20260209` or later, Claude can write and execute code to filter the fetched content before loading it into context.

This dynamic filtering is particularly useful for:

* Extracting specific sections from long documents
* Processing structured data from web pages
* Filtering relevant information from PDFs
* Reducing token costs when working with large documents

  Dynamic filtering runs on the [code execution tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/code-execution-tool), which the API enables automatically for the request. You don't need to add the code execution tool to the `tools` array.

To enable dynamic filtering, use `web_fetch_20260209` or any later version. The following examples use `web_fetch_20260318`:

  ```bash cURL
  curl https://api.anthropic.com/v1/messages \
    -H "x-api-key: $ANTHROPIC_API_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -H "content-type: application/json" \
    -d '{
      "model": "claude-opus-4-8",
      "max_tokens": 4096,
      "messages": [
        {
          "role": "user",
          "content": "Fetch the content at https://example.com/research-paper and extract the key findings."
        }
      ],
      "tools": [{
        "type": "web_fetch_20260318",
        "name": "web_fetch"
      }]
    }'
  ```

  ```bash CLI
  ant messages create <<'YAML'
  model: claude-opus-4-8
  max_tokens: 4096
  messages:
    - role: user
      content: >-
        Fetch the content at https://example.com/research-paper
        and extract the key findings.
  tools:
    - type: web_fetch_20260318
      name: web_fetch
  YAML
  ```

  ```python Python
  client = anthropic.Anthropic()

  response = client.messages.create(
      model="claude-opus-4-8",
      max_tokens=4096,
      messages=[
          {
              "role": "user",
              "content": "Fetch the content at https://example.com/research-paper and extract the key findings.",
          }
      ],
      tools=[{"type": "web_fetch_20260318", "name": "web_fetch"}],
  )
  print(response)
  ```

  ```typescript TypeScript
  const client = new Anthropic();

  const response = await client.messages.create({
    model: "claude-opus-4-8",
    max_tokens: 4096,
    messages: [
      {
        role: "user",
        content:
          "Fetch the content at https://example.com/research-paper and extract the key findings."
      }
    ],
    tools: [{ type: "web_fetch_20260318", name: "web_fetch" }]
  });

  console.log(response);
  ```

  ```csharp C#
  AnthropicClient client = new();

  var parameters = new MessageCreateParams
  {
      Model = Model.ClaudeOpus4_8,
      MaxTokens = 4096,
      Messages = [new() { Role = Role.User, Content = "Fetch the content at https://example.com/research-paper and extract the key findings." }],
      Tools = [new ToolUnion(new WebFetchTool20260318())]
  };

  var message = await client.Messages.Create(parameters);
  Console.WriteLine(message);
  ```

  ```go Go
  client := anthropic.NewClient()

  response, err := client.Messages.New(context.TODO(), anthropic.MessageNewParams{
  	Model:     anthropic.ModelClaudeOpus4_8,
  	MaxTokens: 4096,
  	Messages: []anthropic.MessageParam{
  		anthropic.NewUserMessage(anthropic.NewTextBlock("Fetch the content at https://example.com/research-paper and extract the key findings.")),
  	},
  	Tools: []anthropic.ToolUnionParam{
  		{OfWebFetchTool20260318: &anthropic.WebFetchTool20260318Param{}},
  	},
  })
  if err != nil {
  	log.Fatal(err)
  }
  fmt.Println(response.RawJSON())
  ```

  ```java Java
  import com.anthropic.models.messages.WebFetchTool20260318;

  void main() {
      AnthropicClient client = AnthropicOkHttpClient.fromEnv();

      MessageCreateParams params = MessageCreateParams.builder()
          .model(Model.CLAUDE_OPUS_4_8)
          .maxTokens(4096L)
          .addUserMessage("Fetch the content at https://example.com/research-paper and extract the key findings.")
          .addTool(WebFetchTool20260318.builder().build())
          .build();

      Message response = client.messages().create(params);
      IO.println(response);
  }
  ```

  ```php PHP
  $client = new Client();

  $message = $client->messages->create(
      maxTokens: 4096,
      messages: [
          ['role' => 'user', 'content' => 'Fetch the content at https://example.com/research-paper and extract the key findings.']
      ],
      model: 'claude-opus-4-8',
      tools: [[
          'type' => 'web_fetch_20260318',
          'name' => 'web_fetch',
      ]],
  );
  echo $message;
  ```

  ```ruby Ruby
  client = Anthropic::Client.new

  message = client.messages.create(
    model: "claude-opus-4-8",
    max_tokens: 4096,
    messages: [
      { role: "user", content: "Fetch the content at https://example.com/research-paper and extract the key findings." }
    ],
    tools: [{
      type: "web_fetch_20260318",
      name: "web_fetch"
    }]
  )
  puts message
  ```

## How to use web fetch

Provide the web fetch tool in your API request:

  ```bash cURL
  curl https://api.anthropic.com/v1/messages \
    -H "x-api-key: $ANTHROPIC_API_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -H "content-type: application/json" \
    -d '{
      "model": "claude-opus-4-8",
      "max_tokens": 1024,
      "messages": [
        {
          "role": "user",
          "content": "Please analyze the content at https://example.com/article"
        }
      ],
      "tools": [{
        "type": "web_fetch_20250910",
        "name": "web_fetch",
        "max_uses": 5
      }]
    }'
  ```

  ```bash CLI
  ant messages create \
    --model claude-opus-4-8 \
    --max-tokens 1024 \
    --message '{role: user, content: "Please analyze the content at https://example.com/article"}' \
    --tool '{type: web_fetch_20250910, name: web_fetch, max_uses: 5}'
  ```

  ```python Python
  client = anthropic.Anthropic()

  response = client.messages.create(
      model="claude-opus-4-8",
      max_tokens=1024,
      messages=[
          {
              "role": "user",
              "content": "Please analyze the content at https://example.com/article",
          }
      ],
      tools=[{"type": "web_fetch_20250910", "name": "web_fetch", "max_uses": 5}],
  )
  print(response)
  ```

  ```typescript TypeScript
  const client = new Anthropic();

  const response = await client.messages.create({
    model: "claude-opus-4-8",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: "Please analyze the content at https://example.com/article"
      }
    ],
    tools: [
      {
        type: "web_fetch_20250910",
        name: "web_fetch",
        max_uses: 5
      }
    ]
  });

  console.log(response);
  ```

  ```csharp C#
  AnthropicClient client = new();

  var parameters = new MessageCreateParams
  {
      Model = Model.ClaudeOpus4_8,
      MaxTokens = 1024,
      Messages = [new() { Role = Role.User, Content = "Please analyze the content at https://example.com/article" }],
      Tools = [new ToolUnion(new WebFetchTool20250910() { MaxUses = 5 })]
  };

  var message = await client.Messages.Create(parameters);
  Console.WriteLine(message);
  ```

  ```go Go
  client := anthropic.NewClient()

  response, err := client.Messages.New(context.TODO(), anthropic.MessageNewParams{
  	Model:     anthropic.ModelClaudeOpus4_8,
  	MaxTokens: 1024,
  	Messages: []anthropic.MessageParam{
  		anthropic.NewUserMessage(anthropic.NewTextBlock("Please analyze the content at https://example.com/article")),
  	},
  	Tools: []anthropic.ToolUnionParam{
  		{OfWebFetchTool20250910: &anthropic.WebFetchTool20250910Param{
  			MaxUses: anthropic.Int(5),
  		}},
  	},
  })
  if err != nil {
  	log.Fatal(err)
  }
  fmt.Println(response.RawJSON())
  ```

  ```java Java
  import com.anthropic.models.messages.WebFetchTool20250910;

  void main() {
      AnthropicClient client = AnthropicOkHttpClient.fromEnv();

      MessageCreateParams params = MessageCreateParams.builder()
          .model(Model.CLAUDE_OPUS_4_8)
          .maxTokens(1024L)
          .addUserMessage("Please analyze the content at https://example.com/article")
          .addTool(WebFetchTool20250910.builder()
              .maxUses(5L)
              .build())
          .build();

      Message response = client.messages().create(params);
      IO.println(response);
  }
  ```

  ```php PHP
  $client = new Client();

  $message = $client->messages->create(
      maxTokens: 1024,
      messages: [
          ['role' => 'user', 'content' => 'Please analyze the content at https://example.com/article']
      ],
      model: 'claude-opus-4-8',
      tools: [[
          'type' => 'web_fetch_20250910',
          'name' => 'web_fetch',
          'max_uses' => 5,
      ]],
  );
  echo $message;
  ```

  ```ruby Ruby
  client = Anthropic::Client.new

  message = client.messages.create(
    model: "claude-opus-4-8",
    max_tokens: 1024,
    messages: [
      { role: "user", content: "Please analyze the content at https://example.com/article" }
    ],
    tools: [{
      type: "web_fetch_20250910",
      name: "web_fetch",
      max_uses: 5
    }]
  )
  puts message
  ```

## Tool definition

The web fetch tool supports the following parameters:

```json JSON
{
  "type": "web_fetch_20250910",
  "name": "web_fetch",

  // Optional: Limit the number of fetches per request
  "max_uses": 10,

  // Optional: Only fetch from these domains
  "allowed_domains": ["example.com", "docs.example.com"],

  // Optional: Never fetch from these domains (cannot be combined with allowed_domains)
  "blocked_domains": ["private.example.com"],

  // Optional: Enable citations for fetched content
  "citations": {
    "enabled": true
  },

  // Optional: Maximum content length in tokens
  "max_content_tokens": 100000
}
```

Later tool versions add two more optional parameters: `use_cache` requires `web_fetch_20260309` or later (see [Cache bypass](https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-fetch-tool#cache-bypass)), and `response_inclusion` requires `web_fetch_20260318` or later (see [Response inclusion](https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-fetch-tool#response-inclusion)).

### Max uses

The `max_uses` parameter limits the number of web fetches performed. Failed fetches count against the limit. If Claude attempts more fetches than allowed, the `web_fetch_tool_result` is an error with the `max_uses_exceeded` error code. There is currently no default limit.

### Domain filtering

For domain filtering with `allowed_domains` and `blocked_domains`, see [Server tools](https://platform.claude.com/docs/en/agents-and-tools/tool-use/server-tools#domain-filtering).

On [Claude Managed Agents](https://platform.claude.com/docs/en/managed-agents/overview), set these fields on the `web_fetch` entry of the agent toolset, where each listed domain must be a plain hostname with no path; see [Restrict web search and web fetch domains](https://platform.claude.com/docs/en/managed-agents/tools#restrict-web-search-and-web-fetch-domains).

### Content limits

The `max_content_tokens` parameter limits the amount of content included in the context. If the fetched content exceeds this limit, the tool truncates it. This helps control token usage when fetching large documents. The limit applies to text content, not to binary content such as PDFs.

  The `max_content_tokens` parameter limit is approximate. The actual number of input tokens used can vary by a small amount.

On Claude Managed Agents, the `web_fetch` entry of the agent toolset also accepts `max_content_tokens`; see [Restrict web search and web fetch domains](https://platform.claude.com/docs/en/managed-agents/tools#restrict-web-search-and-web-fetch-domains).

### Cache bypass

  Requires `web_fetch_20260309` or later (including `web_fetch_20260318`).

The `use_cache` parameter controls whether cached content may be returned. Set `"use_cache": false` to bypass the cache and fetch fresh content. The default is `true`. Only disable caching when the user explicitly requests fresh content or when fetching rapidly changing sources, because bypassing the cache increases latency.

```json
{
  "tools": [
    {
      "type": "web_fetch_20260309",
      "name": "web_fetch",
      "use_cache": false
    }
  ]
}
```

### Response inclusion

  Requires `web_fetch_20260318` or later.

The `response_inclusion` parameter controls how fetch result blocks appear in the API response when the result was consumed by a completed [code execution](https://platform.claude.com/docs/en/agents-and-tools/tool-use/code-execution-tool) call in the same turn. Set `"response_inclusion": "excluded"` to drop those nested `server_tool_use` and result block pairs entirely from the response, reducing output token costs for agentic workflows that don't need to echo raw page content back to the client. The default is `"full"`. Results from direct calls, or from code execution calls that paused before completing, are always returned in full so they can be sent back on the next turn.

```json
{
  "tools": [
    {
      "type": "web_fetch_20260318",
      "name": "web_fetch",
      "response_inclusion": "excluded"
    }
  ]
}
```
