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
sourceRel: "docs/en/build-with-claude/pdf-support.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/build-with-claude/pdf-support.md"
sourceSha256: "fe526a04464d0e005159bbfd23cd748c9d6adf569e0af73ac4ade018cf411ec7"
pageSha256: "7bca1983fbe8c8b7f061e0eb922c947aae027e5c0d5118349488be466ad62b36"
contentMode: "local-full"
zh: ""
---

## Optimize PDF processing

### Improve performance

Follow these best practices for optimal results:

* Place PDFs before text in your requests
* Use standard fonts
* Ensure text is clear and legible
* Rotate pages to proper upright orientation
* Use logical page numbers (from PDF viewer) in prompts
* Split large PDFs into chunks when needed
* Enable prompt caching for repeated analysis

### Scale your implementation

For high-volume processing, consider these approaches:

#### Use prompt caching

Cache PDFs with [prompt caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching) to improve performance on repeated queries:

  ```bash cURL
  curl -sL "https://assets.anthropic.com/m/1cd9d098ac3e6467/original/Claude-3-Model-Card-October-Addendum.pdf" | base64 | tr -d '\n' > pdf_base64.txt
  # Create a JSON request file using the pdf_base64.txt content
  jq -n --rawfile PDF_BASE64 pdf_base64.txt '{
      "model": "claude-opus-5",
      "max_tokens": 1024,
      "messages": [{
          "role": "user",
          "content": [{
              "type": "document",
              "source": {
                  "type": "base64",
                  "media_type": "application/pdf",
                  "data": $PDF_BASE64
              },
              "cache_control": {
                  "type": "ephemeral"
              }
          },
          {
              "type": "text",
              "text": "Which model has the highest human preference win rates across each use-case?"
          }]
      }]
  }' > request.json

  # Then make the API call using the JSON file
  curl https://api.anthropic.com/v1/messages \
    -H "content-type: application/json" \
    -H "x-api-key: $ANTHROPIC_API_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -d @request.json
  ```

  ```bash CLI
  ant messages create --transform content --format yaml <<'YAML'
  model: claude-opus-5
  max_tokens: 1024
  messages:
    - role: user
      content:
        - type: document
          source:
            type: base64
            media_type: application/pdf
            data: "@./document.pdf"
          cache_control:
            type: ephemeral
        - type: text
          text: Which model has the highest human preference win rates across each use-case?
  YAML
  ```

  ```python Python
  import base64
  import httpx2

  # First, load and encode the PDF
  pdf_url = "https://assets.anthropic.com/m/1cd9d098ac3e6467/original/Claude-3-Model-Card-October-Addendum.pdf"
  pdf_data = base64.standard_b64encode(
      httpx2.get(pdf_url, follow_redirects=True).content
  ).decode("utf-8")

  # Create a message with the cached document
  client = anthropic.Anthropic()
  message = client.messages.create(
      model="claude-opus-5",
      max_tokens=1024,
      messages=[
          {
              "role": "user",
              "content": [
                  {
                      "type": "document",
                      "source": {
                          "type": "base64",
                          "media_type": "application/pdf",
                          "data": pdf_data,
                      },
                      "cache_control": {"type": "ephemeral"},
                  },
                  {
                      "type": "text",
                      "text": "Which model has the highest human preference win rates across each use-case?",
                  },
              ],
          }
      ],
  )

  print(message.content)
  ```

  ```typescript TypeScript
  // First, load and encode the PDF
  const pdfURL =
    "https://assets.anthropic.com/m/1cd9d098ac3e6467/original/Claude-3-Model-Card-October-Addendum.pdf";
  const pdfResponse = await fetch(pdfURL);
  const arrayBuffer = await pdfResponse.arrayBuffer();
  const pdfBase64 = Buffer.from(arrayBuffer).toString("base64");

  // Create a message with the cached document
  const anthropic = new Anthropic();
  const response = await anthropic.messages.create({
    model: "claude-opus-5",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "document",
            source: {
              type: "base64",
              media_type: "application/pdf",
              data: pdfBase64
            },
            cache_control: { type: "ephemeral" }
          },
          {
            type: "text",
            text: "Which model has the highest human preference win rates across each use-case?"
          }
        ]
      }
    ]
  });

  console.log(response);
  ```

  ```csharp C#
  var client = new AnthropicClient();

  // Download and encode the PDF
  var pdfUrl = "https://assets.anthropic.com/m/1cd9d098ac3e6467/original/Claude-3-Model-Card-October-Addendum.pdf";
  using var httpClient = new HttpClient();
  var pdfBase64 = Convert.ToBase64String(await httpClient.GetByteArrayAsync(pdfUrl));

  var message = await client.Messages.Create(new MessageCreateParams
  {
      Model = Model.ClaudeOpus5,
      MaxTokens = 1024,
      Messages =
      [
          new()
          {
              Role = Role.User,
              Content = new List<ContentBlockParam>
              {
                  new DocumentBlockParam
                  {
                      Source = new Base64PdfSource { Data = pdfBase64 },
                      CacheControl = new CacheControlEphemeral(),
                  },
                  new TextBlockParam("Which model has the highest human preference win rates across each use-case?"),
              },
          },
      ],
  });

  Console.WriteLine(message);
  ```

  ```go Go
  // First, load and encode the PDF
  pdfURL := "https://assets.anthropic.com/m/1cd9d098ac3e6467/original/Claude-3-Model-Card-October-Addendum.pdf"
  resp, err := http.Get(pdfURL)
  if err != nil {
  	panic(err)
  }
  defer resp.Body.Close()
  pdfBytes, err := io.ReadAll(resp.Body)
  if err != nil {
  	panic(err)
  }
  pdfBase64 := base64.StdEncoding.EncodeToString(pdfBytes)

  // Create a document block with cache control
  client := anthropic.NewClient()
  message, err := client.Messages.New(context.TODO(), anthropic.MessageNewParams{
  	Model:     anthropic.ModelClaudeOpus5,
  	MaxTokens: 1024,
  	Messages: []anthropic.MessageParam{
  		anthropic.NewUserMessage(
  			anthropic.ContentBlockParamUnion{
  				OfDocument: &anthropic.DocumentBlockParam{
  					Source: anthropic.DocumentBlockParamSourceUnion{
  						OfBase64: &anthropic.Base64PDFSourceParam{
  							Data: pdfBase64,
  						},
  					},
  					CacheControl: anthropic.NewCacheControlEphemeralParam(),
  				},
  			},
  			anthropic.NewTextBlock("Which model has the highest human preference win rates across each use-case?"),
  		),
  	},
  })
  if err != nil {
  	panic(err)
  }

  fmt.Printf("%+v\n", message.Content)
  ```

  ```java Java
  AnthropicClient client = AnthropicOkHttpClient.fromEnv();

  // Download and encode the PDF
  String pdfUrl =
    "https://assets.anthropic.com/m/1cd9d098ac3e6467/original/Claude-3-Model-Card-October-Addendum.pdf";
  HttpClient httpClient = HttpClient.newBuilder().followRedirects(HttpClient.Redirect.NORMAL).build();
  HttpRequest request = HttpRequest.newBuilder().uri(URI.create(pdfUrl)).GET().build();

  HttpResponse<byte[]> response = httpClient.send(
    request,
    HttpResponse.BodyHandlers.ofByteArray()
  );
  String pdfBase64 = Base64.getEncoder().encodeToString(response.body());

  MessageCreateParams params = MessageCreateParams.builder()
    .model(Model.CLAUDE_OPUS_5)
    .maxTokens(1024)
    .addUserMessageOfBlockParams(
      List.of(
        ContentBlockParam.ofDocument(
          DocumentBlockParam.builder()
            .source(Base64PdfSource.builder().data(pdfBase64).build())
            .cacheControl(CacheControlEphemeral.builder().build())
            .build()
        ),
        ContentBlockParam.ofText(
          TextBlockParam.builder()
            .text(
              "Which model has the highest human preference win rates across each use-case?"
            )
            .build()
        )
      )
    )
    .build();

  Message message = client.messages().create(params);
  System.out.println(message);
  ```

  ```php PHP
  $client = new Client();

  // Load and encode the PDF
  $pdf_url = 'https://assets.anthropic.com/m/1cd9d098ac3e6467/original/Claude-3-Model-Card-October-Addendum.pdf';
  $pdf_data = base64_encode(file_get_contents($pdf_url));

  $message = $client->messages->create(
      maxTokens: 1024,
      messages: [
          [
              'role' => 'user',
              'content' => [
                  [
                      'type' => 'document',
                      'source' => [
                          'type' => 'base64',
                          'media_type' => 'application/pdf',
                          'data' => $pdf_data,
                      ],
                      'cache_control' => ['type' => 'ephemeral'],
                  ],
                  [
                      'type' => 'text',
                      'text' => 'Which model has the highest human preference win rates across each use-case?',
                  ],
              ],
          ],
      ],
      model: 'claude-opus-5',
  );

  echo $message;
  ```

  ```ruby Ruby
  require "open-uri"

  # Load and encode the PDF
  pdf_url = "https://assets.anthropic.com/m/1cd9d098ac3e6467/original/Claude-3-Model-Card-October-Addendum.pdf"
  pdf_bytes = URI.open(pdf_url, "rb") { |f| f.read }
  pdf_data = [pdf_bytes].pack("m0") # Base64-encode without newlines

  anthropic = Anthropic::Client.new

  message = anthropic.messages.create(
    model: "claude-opus-5",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "document",
            source: {
              type: "base64",
              media_type: "application/pdf",
              data: pdf_data
            },
            cache_control: {type: "ephemeral"}
          },
          {
            type: "text",
            text: "Which model has the highest human preference win rates across each use-case?"
          }
        ]
      }
    ]
  )

  puts(message.content)
  ```

#### Process document batches

Use the [Message Batches API](https://platform.claude.com/docs/en/build-with-claude/batch-processing) to process many PDFs in one request:

  ```bash cURL
  curl -sL "https://assets.anthropic.com/m/1cd9d098ac3e6467/original/Claude-3-Model-Card-October-Addendum.pdf" | base64 | tr -d '\n' > pdf_base64.txt
  # Create a JSON request file using the pdf_base64.txt content
  jq -n --rawfile PDF_BASE64 pdf_base64.txt '{
      "requests": [
      {
          "custom_id": "my-first-request",
          "params": {
              "model": "claude-opus-5",
              "max_tokens": 1024,
              "messages": [{
                  "role": "user",
                  "content": [{
                      "type": "document",
                      "source": {
                          "type": "base64",
                          "media_type": "application/pdf",
                          "data": $PDF_BASE64
                      }
                  },
                  {
                      "type": "text",
                      "text": "Which model has the highest human preference win rates across each use-case?"
                  }]
              }]
          }
      },
      {
          "custom_id": "my-second-request",
          "params": {
              "model": "claude-opus-5",
              "max_tokens": 1024,
              "messages": [{
                  "role": "user",
                  "content": [{
                      "type": "document",
                      "source": {
                          "type": "base64",
                          "media_type": "application/pdf",
                          "data": $PDF_BASE64
                      }
                  },
                  {
                      "type": "text",
                      "text": "Extract 5 key insights from this document."
                  }]
              }]
          }
      }]
  }' > request.json

  # Then make the API call using the JSON file
  curl https://api.anthropic.com/v1/messages/batches \
    -H "content-type: application/json" \
    -H "x-api-key: $ANTHROPIC_API_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -d @request.json
  ```

  ```bash CLI
  ant messages:batches create <<'YAML'
  requests:
    - custom_id: my-first-request
      params:
        model: claude-opus-5
        max_tokens: 1024
        messages:
          - role: user
            content:
              - type: document
                source:
                  type: base64
                  media_type: application/pdf
                  data: "@./document.pdf"
              - type: text
                text: >-
                  Which model has the highest human preference win rates
                  across each use-case?
    - custom_id: my-second-request
      params:
        model: claude-opus-5
        max_tokens: 1024
        messages:
          - role: user
            content:
              - type: document
                source:
                  type: base64
                  media_type: application/pdf
                  data: "@./document.pdf"
              - type: text
                text: Extract 5 key insights from this document.
  YAML
  ```

  ```python Python
  import base64
  import httpx2

  # First, load and encode the PDF
  pdf_url = "https://assets.anthropic.com/m/1cd9d098ac3e6467/original/Claude-3-Model-Card-October-Addendum.pdf"
  pdf_data = base64.standard_b64encode(
      httpx2.get(pdf_url, follow_redirects=True).content
  ).decode("utf-8")

  # Create a batch of requests that use the document
  client = anthropic.Anthropic()
  message_batch = client.messages.batches.create(
      requests=[
          {
              "custom_id": "my-first-request",
              "params": {
                  "model": "claude-opus-5",
                  "max_tokens": 1024,
                  "messages": [
                      {
                          "role": "user",
                          "content": [
                              {
                                  "type": "document",
                                  "source": {
                                      "type": "base64",
                                      "media_type": "application/pdf",
                                      "data": pdf_data,
                                  },
                              },
                              {
                                  "type": "text",
                                  "text": "Which model has the highest human preference win rates across each use-case?",
                              },
                          ],
                      }
                  ],
              },
          },
          {
              "custom_id": "my-second-request",
              "params": {
                  "model": "claude-opus-5",
                  "max_tokens": 1024,
                  "messages": [
                      {
                          "role": "user",
                          "content": [
                              {
                                  "type": "document",
                                  "source": {
                                      "type": "base64",
                                      "media_type": "application/pdf",
                                      "data": pdf_data,
                                  },
                              },
                              {
                                  "type": "text",
                                  "text": "Extract 5 key insights from this document.",
                              },
                          ],
                      }
                  ],
              },
          },
      ]
  )

  print(message_batch)
  ```

  ```typescript TypeScript
  // First, load and encode the PDF
  const pdfURL =
    "https://assets.anthropic.com/m/1cd9d098ac3e6467/original/Claude-3-Model-Card-October-Addendum.pdf";
  const pdfResponse = await fetch(pdfURL);
  const arrayBuffer = await pdfResponse.arrayBuffer();
  const pdfBase64 = Buffer.from(arrayBuffer).toString("base64");

  // Create a batch of requests that use the document
  const anthropic = new Anthropic();
  const response = await anthropic.messages.batches.create({
    requests: [
      {
        custom_id: "my-first-request",
        params: {
          model: "claude-opus-5",
          max_tokens: 1024,
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "document",
                  source: {
                    type: "base64",
                    media_type: "application/pdf",
                    data: pdfBase64
                  }
                },
                {
                  type: "text",
                  text: "Which model has the highest human preference win rates across each use-case?"
                }
              ]
            }
          ]
        }
      },
      {
        custom_id: "my-second-request",
        params: {
          model: "claude-opus-5",
          max_tokens: 1024,
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "document",
                  source: {
                    type: "base64",
                    media_type: "application/pdf",
                    data: pdfBase64
                  }
                },
                {
                  type: "text",
                  text: "Extract 5 key insights from this document."
                }
              ]
            }
          ]
        }
      }
    ]
  });

  console.log(response);
  ```

  ```csharp C#
  var client = new AnthropicClient();

  // Download and encode the PDF
  var pdfUrl = "https://assets.anthropic.com/m/1cd9d098ac3e6467/original/Claude-3-Model-Card-October-Addendum.pdf";
  using var httpClient = new HttpClient();
  var pdfBase64 = Convert.ToBase64String(await httpClient.GetByteArrayAsync(pdfUrl));

  var batch = await client.Messages.Batches.Create(new BatchCreateParams
  {
      Requests =
      [
          new()
          {
              CustomID = "my-first-request",
              Params = new()
              {
                  Model = Model.ClaudeOpus5,
                  MaxTokens = 1024,
                  Messages =
                  [
                      new()
                      {
                          Role = Role.User,
                          Content = new List<ContentBlockParam>
                          {
                              new DocumentBlockParam
                              {
                                  Source = new Base64PdfSource { Data = pdfBase64 },
                              },
                              new TextBlockParam("Which model has the highest human preference win rates across each use-case?"),
                          },
                      },
                  ],
              },
          },
          new()
          {
              CustomID = "my-second-request",
              Params = new()
              {
                  Model = Model.ClaudeOpus5,
                  MaxTokens = 1024,
                  Messages =
                  [
                      new()
                      {
                          Role = Role.User,
                          Content = new List<ContentBlockParam>
                          {
                              new DocumentBlockParam
                              {
                                  Source = new Base64PdfSource { Data = pdfBase64 },
                              },
                              new TextBlockParam("Extract 5 key insights from this document."),
                          },
                      },
                  ],
              },
          },
      ],
  });

  Console.WriteLine(batch);
  ```

  ```go Go
  // First, load and encode the PDF
  pdfURL := "https://assets.anthropic.com/m/1cd9d098ac3e6467/original/Claude-3-Model-Card-October-Addendum.pdf"
  resp, err := http.Get(pdfURL)
  if err != nil {
  	panic(err)
  }
  defer resp.Body.Close()
  pdfBytes, err := io.ReadAll(resp.Body)
  if err != nil {
  	panic(err)
  }
  pdfBase64 := base64.StdEncoding.EncodeToString(pdfBytes)

  // Create a batch of requests that use the document
  client := anthropic.NewClient()
  batch, err := client.Messages.Batches.New(context.TODO(), anthropic.MessageBatchNewParams{
  	Requests: []anthropic.MessageBatchNewParamsRequest{
  		{
  			CustomID: "my-first-request",
  			Params: anthropic.MessageBatchNewParamsRequestParams{
  				Model:     anthropic.ModelClaudeOpus5,
  				MaxTokens: 1024,
  				Messages: []anthropic.MessageParam{
  					anthropic.NewUserMessage(
  						anthropic.NewDocumentBlock(anthropic.Base64PDFSourceParam{
  							Data: pdfBase64,
  						}),
  						anthropic.NewTextBlock("Which model has the highest human preference win rates across each use-case?"),
  					),
  				},
  			},
  		},
  		{
  			CustomID: "my-second-request",
  			Params: anthropic.MessageBatchNewParamsRequestParams{
  				Model:     anthropic.ModelClaudeOpus5,
  				MaxTokens: 1024,
  				Messages: []anthropic.MessageParam{
  					anthropic.NewUserMessage(
  						anthropic.NewDocumentBlock(anthropic.Base64PDFSourceParam{
  							Data: pdfBase64,
  						}),
  						anthropic.NewTextBlock("Extract 5 key insights from this document."),
  					),
  				},
  			},
  		},
  	},
  })
  if err != nil {
  	panic(err)
  }

  fmt.Printf("%+v\n", batch)
  ```

  ```java Java
  AnthropicClient client = AnthropicOkHttpClient.fromEnv();

  // Download and encode the PDF
  String pdfUrl =
    "https://assets.anthropic.com/m/1cd9d098ac3e6467/original/Claude-3-Model-Card-October-Addendum.pdf";
  HttpClient httpClient = HttpClient.newBuilder().followRedirects(HttpClient.Redirect.NORMAL).build();
  HttpRequest request = HttpRequest.newBuilder().uri(URI.create(pdfUrl)).GET().build();

  HttpResponse<byte[]> response = httpClient.send(
    request,
    HttpResponse.BodyHandlers.ofByteArray()
  );
  String pdfBase64 = Base64.getEncoder().encodeToString(response.body());

  BatchCreateParams params = BatchCreateParams.builder()
    .addRequest(
      BatchCreateParams.Request.builder()
        .customId("my-first-request")
        .params(
          BatchCreateParams.Request.Params.builder()
            .model(Model.CLAUDE_OPUS_5)
            .maxTokens(1024)
            .addUserMessageOfBlockParams(
              List.of(
                ContentBlockParam.ofDocument(
                  DocumentBlockParam.builder()
                    .source(Base64PdfSource.builder().data(pdfBase64).build())
                    .build()
                ),
                ContentBlockParam.ofText(
                  TextBlockParam.builder()
                    .text(
                      "Which model has the highest human preference win rates across each use-case?"
                    )
                    .build()
                )
              )
            )
            .build()
        )
        .build()
    )
    .addRequest(
      BatchCreateParams.Request.builder()
        .customId("my-second-request")
        .params(
          BatchCreateParams.Request.Params.builder()
            .model(Model.CLAUDE_OPUS_5)
            .maxTokens(1024)
            .addUserMessageOfBlockParams(
              List.of(
                ContentBlockParam.ofDocument(
                  DocumentBlockParam.builder()
                    .source(Base64PdfSource.builder().data(pdfBase64).build())
                    .build()
                ),
                ContentBlockParam.ofText(
                  TextBlockParam.builder()
                    .text("Extract 5 key insights from this document.")
                    .build()
                )
              )
            )
            .build()
        )
        .build()
    )
    .build();

  MessageBatch batch = client.messages().batches().create(params);
  System.out.println(batch);
  ```

  ```php PHP
  $client = new Client();

  // Load and encode the PDF
  $pdf_url = 'https://assets.anthropic.com/m/1cd9d098ac3e6467/original/Claude-3-Model-Card-October-Addendum.pdf';
  $pdf_data = base64_encode(file_get_contents($pdf_url));

  $batch = $client->messages->batches->create(
      requests: [
          [
              'custom_id' => 'my-first-request',
              'params' => [
                  'model' => 'claude-opus-5',
                  'max_tokens' => 1024,
                  'messages' => [
                      [
                          'role' => 'user',
                          'content' => [
                              [
                                  'type' => 'document',
                                  'source' => [
                                      'type' => 'base64',
                                      'media_type' => 'application/pdf',
                                      'data' => $pdf_data,
                                  ],
                              ],
                              [
                                  'type' => 'text',
                                  'text' => 'Which model has the highest human preference win rates across each use-case?',
                              ],
                          ],
                      ],
                  ],
              ],
          ],
          [
              'custom_id' => 'my-second-request',
              'params' => [
                  'model' => 'claude-opus-5',
                  'max_tokens' => 1024,
                  'messages' => [
                      [
                          'role' => 'user',
                          'content' => [
                              [
                                  'type' => 'document',
                                  'source' => [
                                      'type' => 'base64',
                                      'media_type' => 'application/pdf',
                                      'data' => $pdf_data,
                                  ],
                              ],
                              [
                                  'type' => 'text',
                                  'text' => 'Extract 5 key insights from this document.',
                              ],
                          ],
                      ],
                  ],
              ],
          ],
      ],
  );

  echo $batch;
  ```

  ```ruby Ruby
  require "open-uri"

  # Load and encode the PDF
  pdf_url = "https://assets.anthropic.com/m/1cd9d098ac3e6467/original/Claude-3-Model-Card-October-Addendum.pdf"
  pdf_bytes = URI.open(pdf_url, "rb") { |f| f.read }
  pdf_data = [pdf_bytes].pack("m0") # Base64-encode without newlines

  anthropic = Anthropic::Client.new

  message_batch = anthropic.messages.batches.create(
    requests: [
      {
        custom_id: "my-first-request",
        params: {
          model: "claude-opus-5",
          max_tokens: 1024,
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "document",
                  source: {
                    type: "base64",
                    media_type: "application/pdf",
                    data: pdf_data
                  }
                },
                {
                  type: "text",
                  text: "Which model has the highest human preference win rates across each use-case?"
                }
              ]
            }
          ]
        }
      },
      {
        custom_id: "my-second-request",
        params: {
          model: "claude-opus-5",
          max_tokens: 1024,
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "document",
                  source: {
                    type: "base64",
                    media_type: "application/pdf",
                    data: pdf_data
                  }
                },
                {
                  type: "text",
                  text: "Extract 5 key insights from this document."
                }
              ]
            }
          ]
        }
      }
    ]
  )

  puts(message_batch)
  ```

Batches process asynchronously. To check progress and retrieve results once processing ends, see [Batch processing](https://platform.claude.com/docs/en/build-with-claude/batch-processing).
