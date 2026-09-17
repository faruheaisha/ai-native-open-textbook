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
sourceRel: "docs/en/build-with-claude/citations.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/build-with-claude/citations.md"
sourceSha256: "e4a8ad0dce824af1bfe9ae8b04d0633d6fcc33360fe8503b50430b8c1e514d88"
pageSha256: "0da9af88d5abfba6edccef51ccdecff8f7e8a690ba119ced58b5581dfea00e3c"
contentMode: "local-full"
zh: ""
---

## Compatibility
- [ZDR](https://platform.claude.com/docs/en/manage-claude/api-and-data-retention): eligible (excludes [Covered Models](https://platform.claude.com/docs/en/manage-claude/api-and-data-retention#model-specific-data-retention-requirements))
- Platforms: Claude API, Claude Platform on AWS, Amazon Bedrock, Google Cloud, Microsoft Foundry

Claude can provide detailed citations when answering questions about documents, helping you track and verify the sources behind each response.

All [active models](https://platform.claude.com/docs/en/models/overview) support citations.

  Share your feedback and suggestions about the citations feature using the [citations feedback form](https://forms.gle/9n9hSrKnKe3rpowH9).

The following example shows how to enable citations on a plain text document with the Messages API:

  ```bash cURL
  curl https://api.anthropic.com/v1/messages \
    -H "content-type: application/json" \
    -H "x-api-key: $ANTHROPIC_API_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -d '{
      "model": "claude-opus-5",
      "max_tokens": 1024,
      "messages": [
        {
          "role": "user",
          "content": [
            {
              "type": "document",
              "source": {
                "type": "text",
                "media_type": "text/plain",
                "data": "The grass is green. The sky is blue."
              },
              "title": "My Document",
              "context": "This is a trustworthy document.",
              "citations": {"enabled": true}
            },
            {
              "type": "text",
              "text": "What color is the grass and sky?"
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
        - type: document
          source:
            type: text
            media_type: text/plain
            data: The grass is green. The sky is blue.
          title: My Document
          context: This is a trustworthy document.
          citations:
            enabled: true
        - type: text
          text: What color is the grass and sky?
  YAML
  ```

  ```python Python
  client = anthropic.Anthropic()

  response = client.messages.create(
      model="claude-opus-5",
      max_tokens=1024,
      messages=[
          {
              "role": "user",
              "content": [
                  {
                      "type": "document",
                      "source": {
                          "type": "text",
                          "media_type": "text/plain",
                          "data": "The grass is green. The sky is blue.",
                      },
                      "title": "My Document",
                      "context": "This is a trustworthy document.",
                      "citations": {"enabled": True},
                  },
                  {"type": "text", "text": "What color is the grass and sky?"},
              ],
          }
      ],
  )
  print(response)
  ```

  ```typescript TypeScript
  const client = new Anthropic();

  const response = await client.messages.create({
    model: "claude-opus-5",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "document",
            source: {
              type: "text",
              media_type: "text/plain",
              data: "The grass is green. The sky is blue."
            },
            title: "My Document",
            context: "This is a trustworthy document.",
            citations: { enabled: true }
          },
          {
            type: "text",
            text: "What color is the grass and sky?"
          }
        ]
      }
    ]
  });
  console.log(response);
  ```

  ```csharp C#
  var client = new AnthropicClient();

  var response = await client.Messages.Create(
      new()
      {
          Model = Model.ClaudeOpus5,
          MaxTokens = 1024,
          Messages =
          [
              new()
              {
                  Role = Role.User,
                  Content = new MessageParamContent(new List<ContentBlockParam>
                  {
                      new ContentBlockParam(new DocumentBlockParam(
                          new DocumentBlockParamSource(new PlainTextSource()
                          {
                              Data = "The grass is green. The sky is blue.",
                          })
                      )
                      {
                          Title = "My Document",
                          Context = "This is a trustworthy document.",
                          Citations = new CitationsConfigParam { Enabled = true },
                      }),
                      new ContentBlockParam(new TextBlockParam("What color is the grass and sky?")),
                  }),
              },
          ],
      }
  );

  Console.WriteLine(response);
  ```

  ```go Go
  client := anthropic.NewClient()

  response, err := client.Messages.New(context.TODO(), anthropic.MessageNewParams{
  	Model:     anthropic.ModelClaudeOpus5,
  	MaxTokens: 1024,
  	Messages: []anthropic.MessageParam{
  		anthropic.NewUserMessage(
  			anthropic.ContentBlockParamUnion{
  				OfDocument: &anthropic.DocumentBlockParam{
  					Source: anthropic.DocumentBlockParamSourceUnion{
  						OfText: &anthropic.PlainTextSourceParam{
  							Data: "The grass is green. The sky is blue.",
  						},
  					},
  					Title:     anthropic.String("My Document"),
  					Context:   anthropic.String("This is a trustworthy document."),
  					Citations: anthropic.CitationsConfigParam{Enabled: anthropic.Bool(true)},
  				},
  			},
  			anthropic.NewTextBlock("What color is the grass and sky?"),
  		),
  	},
  })
  if err != nil {
  	log.Fatal(err)
  }
  fmt.Println(response)
  ```

  ```java Java
  AnthropicClient client = AnthropicOkHttpClient.fromEnv();

  PlainTextSource source = PlainTextSource.builder()
      .data("The grass is green. The sky is blue.")
      .build();

  DocumentBlockParam documentParam = DocumentBlockParam.builder()
      .source(source)
      .title("My Document")
      .context("This is a trustworthy document.")
      .citations(CitationsConfigParam.builder().enabled(true).build())
      .build();

  TextBlockParam textBlockParam = TextBlockParam.builder()
      .text("What color is the grass and sky?")
      .build();

  MessageCreateParams params = MessageCreateParams.builder()
      .model(Model.CLAUDE_OPUS_5)
      .maxTokens(1024)
      .addUserMessageOfBlockParams(
          List.of(
              ContentBlockParam.ofDocument(documentParam),
              ContentBlockParam.ofText(textBlockParam)
          )
      )
      .build();

  Message message = client.messages().create(params);
  System.out.println(message);
  ```

  ```php PHP
  $client = new Client();

  $response = $client->messages->create(
      maxTokens: 1024,
      messages: [
          [
              'role' => 'user',
              'content' => [
                  [
                      'type' => 'document',
                      'source' => [
                          'type' => 'text',
                          'media_type' => 'text/plain',
                          'data' => 'The grass is green. The sky is blue.',
                      ],
                      'title' => 'My Document',
                      'context' => 'This is a trustworthy document.',
                      'citations' => ['enabled' => true],
                  ],
                  [
                      'type' => 'text',
                      'text' => 'What color is the grass and sky?',
                  ],
              ],
          ],
      ],
      model: 'claude-opus-5',
  );

  echo json_encode($response, JSON_PRETTY_PRINT);
  ```

  ```ruby Ruby
  client = Anthropic::Client.new

  response = client.messages.create(
    model: "claude-opus-5",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "document",
            source: {
              type: "text",
              media_type: "text/plain",
              data: "The grass is green. The sky is blue."
            },
            title: "My Document",
            context: "This is a trustworthy document.",
            citations: { enabled: true }
          },
          {
            type: "text",
            text: "What color is the grass and sky?"
          }
        ]
      }
    ]
  )

  puts response
  ```

  **Comparison with prompt-based approaches**

  Compared to prompting Claude to cite sources, the citations feature offers the following advantages:

  * **Cost savings:** If your prompt-based approach asks Claude to output direct quotes, you may see cost savings because `cited_text` does not count toward your output tokens.
  * **Better citation reliability:** Because the API parses citations into the response formats described in the following sections and extracts `cited_text` directly, citations are guaranteed to contain valid pointers to the provided documents.
  * **Improved citation quality:** In Anthropic's evaluations, the citations feature is significantly more likely to cite the most relevant quotes from documents than purely prompt-based approaches.

***
