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
sourceRel: "docs/en/build-with-claude/search-results.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/build-with-claude/search-results.md"
sourceSha256: "dc7713539336cf72f67e59117447455d1af5cdf5c287359cfc75eaf9f88df906"
pageSha256: "c9b6c456c4557465ced81e70c68d5acd7e22aa3f4c05446859f3243354d60305"
contentMode: "local-full"
zh: ""
---

## Method 2: Search results as top-level content

You can also provide search results directly in user messages. This is useful for:

* Pre-fetched content from your search infrastructure
* Cached search results from previous queries
* Content from external search services
* Testing and development

### Example: Direct search results

  ```bash cURL
  curl https://api.anthropic.com/v1/messages \
    -H "x-api-key: $ANTHROPIC_API_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -H "content-type: application/json" \
    -d '{
      "model": "claude-opus-5",
      "max_tokens": 1024,
      "messages": [
        {
          "role": "user",
          "content": [
            {
              "type": "search_result",
              "source": "https://docs.company.com/api-reference",
              "title": "API Reference - Authentication",
              "content": [
                {
                  "type": "text",
                  "text": "All API requests must include an API key in the Authorization header. Keys can be generated from the dashboard. Rate limits: 1000 requests per hour for standard tier, 10000 for premium."
                }
              ],
              "citations": {
                "enabled": true
              }
            },
            {
              "type": "search_result",
              "source": "https://docs.company.com/quickstart",
              "title": "Getting Started Guide",
              "content": [
                {
                  "type": "text",
                  "text": "To get started: 1) Sign up for an account, 2) Generate an API key from the dashboard, 3) Install our SDK using pip install company-sdk, 4) Initialize the client with your API key."
                }
              ],
              "citations": {
                "enabled": true
              }
            },
            {
              "type": "text",
              "text": "Based on these search results, how do I authenticate API requests and what are the rate limits?"
            }
          ]
        }
      ]
    }'
  ```

  ```bash CLI
  ant messages create <<'YAML'
  model: claude-opus-5
  max_tokens: 1024
  messages:
    - role: user
      content:
        - type: search_result
          source: https://docs.company.com/api-reference
          title: API Reference - Authentication
          content:
            - type: text
              text: >-
                All API requests must include an API key in the Authorization
                header. Keys can be generated from the dashboard. Rate limits:
                1000 requests per hour for standard tier, 10000 for premium.
          citations:
            enabled: true
        - type: search_result
          source: https://docs.company.com/quickstart
          title: Getting Started Guide
          content:
            - type: text
              text: >-
                To get started: 1) Sign up for an account, 2) Generate an API
                key from the dashboard, 3) Install our SDK using pip install
                company-sdk, 4) Initialize the client with your API key.
          citations:
            enabled: true
        - type: text
          text: >-
            Based on these search results, how do I authenticate API requests
            and what are the rate limits?
  YAML
  ```

  ```python Python
  from anthropic.types import MessageParam, TextBlockParam, SearchResultBlockParam

  client = Anthropic()

  # Provide search results directly in the user message
  response = client.messages.create(
      model="claude-opus-5",
      max_tokens=1024,
      messages=[
          MessageParam(
              role="user",
              content=[
                  SearchResultBlockParam(
                      type="search_result",
                      source="https://docs.company.com/api-reference",
                      title="API Reference - Authentication",
                      content=[
                          TextBlockParam(
                              type="text",
                              text="All API requests must include an API key in the Authorization header. Keys can be generated from the dashboard. Rate limits: 1000 requests per hour for standard tier, 10000 for premium.",
                          )
                      ],
                      citations={"enabled": True},
                  ),
                  SearchResultBlockParam(
                      type="search_result",
                      source="https://docs.company.com/quickstart",
                      title="Getting Started Guide",
                      content=[
                          TextBlockParam(
                              type="text",
                              text="To get started: 1) Sign up for an account, 2) Generate an API key from the dashboard, 3) Install our SDK using pip install company-sdk, 4) Initialize the client with your API key.",
                          )
                      ],
                      citations={"enabled": True},
                  ),
                  TextBlockParam(
                      type="text",
                      text="Based on these search results, how do I authenticate API requests and what are the rate limits?",
                  ),
              ],
          )
      ],
  )

  print(response)
  ```

  ```typescript TypeScript
  const client = new Anthropic();

  // Provide search results directly in the user message
  const response = await client.messages.create({
    model: "claude-opus-5",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "search_result" as const,
            source: "https://docs.company.com/api-reference",
            title: "API Reference - Authentication",
            content: [
              {
                type: "text" as const,
                text: "All API requests must include an API key in the Authorization header. Keys can be generated from the dashboard. Rate limits: 1000 requests per hour for standard tier, 10000 for premium."
              }
            ],
            citations: { enabled: true }
          },
          {
            type: "search_result" as const,
            source: "https://docs.company.com/quickstart",
            title: "Getting Started Guide",
            content: [
              {
                type: "text" as const,
                text: "To get started: 1) Sign up for an account, 2) Generate an API key from the dashboard, 3) Install our SDK using pip install company-sdk, 4) Initialize the client with your API key."
              }
            ],
            citations: { enabled: true }
          },
          {
            type: "text" as const,
            text: "Based on these search results, how do I authenticate API requests and what are the rate limits?"
          }
        ]
      }
    ]
  });

  console.log(response);
  ```

  ```csharp C#
  AnthropicClient client = new();

  // Provide search results directly in the user message
  var response = await client.Messages.Create(new()
  {
      Model = Model.ClaudeOpus5,
      MaxTokens = 1024,
      Messages =
      [
          new()
          {
              Role = Role.User,
              Content = new MessageParamContent(
              [
                  new ContentBlockParam(new SearchResultBlockParam
                  {
                      Source = "https://docs.company.com/api-reference",
                      Title = "API Reference - Authentication",
                      Content = [new() { Text = "All API requests must include an API key in the Authorization header. Keys can be generated from the dashboard. Rate limits: 1000 requests per hour for standard tier, 10000 for premium." }],
                      Citations = new() { Enabled = true },
                  }),
                  new ContentBlockParam(new SearchResultBlockParam
                  {
                      Source = "https://docs.company.com/quickstart",
                      Title = "Getting Started Guide",
                      Content = [new() { Text = "To get started: 1) Sign up for an account, 2) Generate an API key from the dashboard, 3) Install our SDK using pip install company-sdk, 4) Initialize the client with your API key." }],
                      Citations = new() { Enabled = true },
                  }),
                  new ContentBlockParam(new TextBlockParam { Text = "Based on these search results, how do I authenticate API requests and what are the rate limits?" }),
              ]),
          },
      ],
  });

  Console.WriteLine(response);
  ```

  ```go Go
  client := anthropic.NewClient()

  response, err := client.Messages.New(context.TODO(), anthropic.MessageNewParams{
  	Model:     anthropic.ModelClaudeOpus5,
  	MaxTokens: 1024,
  	Messages: []anthropic.MessageParam{
  		anthropic.NewUserMessage(
  			anthropic.ContentBlockParamUnion{OfSearchResult: &anthropic.SearchResultBlockParam{
  				Content: []anthropic.TextBlockParam{
  					{Text: "All API requests must include an API key in the Authorization header. Keys can be generated from the dashboard. Rate limits: 1000 requests per hour for standard tier, 10000 for premium."},
  				},
  				Source:    "https://docs.company.com/api-reference",
  				Title:     "API Reference - Authentication",
  				Citations: anthropic.CitationsConfigParam{Enabled: anthropic.Bool(true)},
  			}},
  			anthropic.ContentBlockParamUnion{OfSearchResult: &anthropic.SearchResultBlockParam{
  				Content: []anthropic.TextBlockParam{
  					{Text: "To get started: 1) Sign up for an account, 2) Generate an API key from the dashboard, 3) Install our SDK using pip install company-sdk, 4) Initialize the client with your API key."},
  				},
  				Source:    "https://docs.company.com/quickstart",
  				Title:     "Getting Started Guide",
  				Citations: anthropic.CitationsConfigParam{Enabled: anthropic.Bool(true)},
  			}},
  			anthropic.NewTextBlock("Based on these search results, how do I authenticate API requests and what are the rate limits?"),
  		),
  	},
  })
  if err != nil {
  	log.Fatal(err)
  }
  fmt.Println(response)
  ```

  ```java Java
  import com.anthropic.models.messages.ContentBlockParam;
  import com.anthropic.models.messages.CitationsConfigParam;
  // ...
  import com.anthropic.models.messages.SearchResultBlockParam;
  import com.anthropic.models.messages.TextBlockParam;
  // ...

  void main() {
      AnthropicClient client = AnthropicOkHttpClient.fromEnv();

      MessageCreateParams params = MessageCreateParams.builder()
          .model(Model.CLAUDE_OPUS_5)
          .maxTokens(1024L)
          .addUserMessageOfBlockParams(List.of(
              ContentBlockParam.ofSearchResult(
                  SearchResultBlockParam.builder()
                      .source("https://docs.company.com/api-reference")
                      .title("API Reference - Authentication")
                      .content(List.of(
                          TextBlockParam.builder()
                              .text("All API requests must include an API key in the Authorization header. Keys can be generated from the dashboard. Rate limits: 1000 requests per hour for standard tier, 10000 for premium.")
                              .build()
                      ))
                      .citations(CitationsConfigParam.builder().enabled(true).build())
                      .build()
              ),
              ContentBlockParam.ofSearchResult(
                  SearchResultBlockParam.builder()
                      .source("https://docs.company.com/quickstart")
                      .title("Getting Started Guide")
                      .content(List.of(
                          TextBlockParam.builder()
                              .text("To get started: 1) Sign up for an account, 2) Generate an API key from the dashboard, 3) Install our SDK using pip install company-sdk, 4) Initialize the client with your API key.")
                              .build()
                      ))
                      .citations(CitationsConfigParam.builder().enabled(true).build())
                      .build()
              ),
              ContentBlockParam.ofText(
                  TextBlockParam.builder()
                      .text("Based on these search results, how do I authenticate API requests and what are the rate limits?")
                      .build()
              )
          ))
          .build();

      Message response = client.messages().create(params);
      System.out.println(response);
  }
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
                      'type' => 'search_result',
                      'source' => 'https://docs.company.com/api-reference',
                      'title' => 'API Reference - Authentication',
                      'content' => [
                          [
                              'type' => 'text',
                              'text' => 'All API requests must include an API key in the Authorization header. Keys can be generated from the dashboard. Rate limits: 1000 requests per hour for standard tier, 10000 for premium.'
                          ]
                      ],
                      'citations' => ['enabled' => true]
                  ],
                  [
                      'type' => 'search_result',
                      'source' => 'https://docs.company.com/quickstart',
                      'title' => 'Getting Started Guide',
                      'content' => [
                          [
                              'type' => 'text',
                              'text' => 'To get started: 1) Sign up for an account, 2) Generate an API key from the dashboard, 3) Install our SDK using pip install company-sdk, 4) Initialize the client with your API key.'
                          ]
                      ],
                      'citations' => ['enabled' => true]
                  ],
                  [
                      'type' => 'text',
                      'text' => 'Based on these search results, how do I authenticate API requests and what are the rate limits?'
                  ]
              ]
          ]
      ],
      model: 'claude-opus-5',
  );

  echo json_encode($message, JSON_PRETTY_PRINT);
  ```

  ```ruby Ruby
  client = Anthropic::Client.new

  message = client.messages.create(
    model: "claude-opus-5",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "search_result",
            source: "https://docs.company.com/api-reference",
            title: "API Reference - Authentication",
            content: [
              {
                type: "text",
                text: "All API requests must include an API key in the Authorization header. Keys can be generated from the dashboard. Rate limits: 1000 requests per hour for standard tier, 10000 for premium."
              }
            ],
            citations: { enabled: true }
          },
          {
            type: "search_result",
            source: "https://docs.company.com/quickstart",
            title: "Getting Started Guide",
            content: [
              {
                type: "text",
                text: "To get started: 1) Sign up for an account, 2) Generate an API key from the dashboard, 3) Install our SDK using pip install company-sdk, 4) Initialize the client with your API key."
              }
            ],
            citations: { enabled: true }
          },
          {
            type: "text",
            text: "Based on these search results, how do I authenticate API requests and what are the rate limits?"
          }
        ]
      }
    ]
  )

  puts message
  ```
