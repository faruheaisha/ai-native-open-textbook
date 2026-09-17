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
pageSha256: "295ddd78a74a9d0a75fc97d1e4119e8b32383f9a712cf8c3b788dd1fd399c2d2"
contentMode: "local-full"
zh: ""
---

## Document types

### Choosing a document type

Three document types are supported for citations. Documents can be provided directly in the message (base64, text, or URL) or uploaded through the [Files API](https://platform.claude.com/docs/en/build-with-claude/files) and referenced by `file_id`:

| Type           | Best for                                                        | Chunking               | Citation format               |
| -------------- | --------------------------------------------------------------- | ---------------------- | ----------------------------- |
| Plain text     | Simple text documents, prose                                    | Sentence               | Character indices (0-indexed) |
| PDF            | PDF files with text content                                     | Sentence               | Page numbers (1-indexed)      |
| Custom content | Lists, transcripts, special formatting, more granular citations | No additional chunking | Block indices (0-indexed)     |

  For file types that the `document` block doesn't support (for example, .docx and .xlsx), convert the files to plain text and include the content directly in message content. Files that are already plain text, such as .csv and .md files, can also be uploaded with an explicit `text/plain` content type. See [Working with other file formats](https://platform.claude.com/docs/en/build-with-claude/files#working-with-other-file-formats).

### Plain text documents

Plain text documents are automatically chunked into sentences. You can provide them inline or by reference with their `file_id`:

    The intro example at the top of this page shows a complete plain text request in every SDK. The document block uses a `text` source:

    ```json
    \{
      "type": "document",
      "source": \{
        "type": "text",
        "media_type": "text/plain",
        "data": "Plain text content..."
      \},
      "title": "Document Title",
      "context": "Context about the document that will not be cited from",
      "citations": \{ "enabled": true \}
    \}
    ```

    These examples reference a file uploaded through the [Files API](https://platform.claude.com/docs/en/build-with-claude/files) as a `document` source.

      ```bash cURL
      curl -X POST https://api.anthropic.com/v1/messages \
        -H "x-api-key: $ANTHROPIC_API_KEY" \
        -H "anthropic-version: 2023-06-01" \
        -H "content-type: application/json" \
        -d @- <<EOF
      {
        "model": "claude-opus-5",
        "max_tokens": 1024,
        "messages": [
          {
            "role": "user",
            "content": [
              {
                "type": "document",
                "source": {"type": "file", "file_id": "$FILE_ID"\},
                "title": "Document Title",
                "context": "Context about the document that will not be cited from",
                "citations": \{"enabled": true\}
              \},
              \{
                "type": "text",
                "text": "Summarize this document."
              \}
            ]
          \}
        ]
      \}
      EOF
      ```

      ```bash CLI
      ant messages create <<YAML
      model: claude-opus-5
      max_tokens: 1024
      messages:
        - role: user
          content:
            - type: document
              source:
                type: file
                file_id: $FILE_ID
              title: Document Title
              context: Context about the document that will not be cited from
              citations:
                enabled: true
            - type: text
              text: Summarize this document.
      YAML
      ```

      ```python Python
      cited_response = client.messages.create(
          model="claude-opus-5",
          max_tokens=1024,
          messages=[
              {
                  "role": "user",
                  "content": [
                      {
                          "type": "document",
                          "source": {"type": "file", "file_id": file_id},
                          "title": "Document Title",
                          "context": "Context about the document that will not be cited from",
                          "citations": {"enabled": True},
                      },
                      {"type": "text", "text": "Summarize this document."},
                  ],
              }
          ],
      )
      print(cited_response)
      ```

      ```typescript TypeScript
      const citedResponse = await client.messages.create({
        model: "claude-opus-5",
        max_tokens: 1024,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "document",
                source: { type: "file", file_id: uploaded.id },
                title: "Document Title",
                context: "Context about the document that will not be cited from",
                citations: { enabled: true },
              },
              {
                type: "text",
                text: "Summarize this document.",
              },
            ],
          },
        ],
      });
      console.log(citedResponse);
      ```

      ```csharp C#
      var citedResponse = await client.Messages.Create(
          new MessageCreateParams
          {
              Model = Model.ClaudeOpus5,
              MaxTokens = 1024,
              Messages =
              [
                  new MessageParam
                  {
                      Role = Role.User,
                      Content = new List&lt;ContentBlockParam>
                      {
                          new DocumentBlockParam
                          {
                              Source = new FileDocumentSource { FileID = fileId },
                              Title = "Document Title",
                              Context = "Context about the document that will not be cited from",
                              Citations = new CitationsConfigParam { Enabled = true },
                          },
                          new TextBlockParam { Text = "Summarize this document." },
                      }
                  }
              ]
          });

      Console.WriteLine(citedResponse);
      ```

      ```go Go
      citedMsg, err := client.Messages.New(context.Background(),
      	anthropic.MessageNewParams{
      		Model:     anthropic.ModelClaudeOpus5,
      		MaxTokens: 1024,
      		Messages: []anthropic.MessageParam{
      			anthropic.NewUserMessage(
      				anthropic.ContentBlockParamUnion{
      					OfDocument: &anthropic.DocumentBlockParam{
      						Source: anthropic.DocumentBlockParamSourceUnion{
      							OfFile: &anthropic.FileDocumentSourceParam{FileID: fileID},
      						},
      						Title:     anthropic.String("Document Title"),
      						Context:   anthropic.String("Context about the document that will not be cited from"),
      						Citations: anthropic.CitationsConfigParam{Enabled: anthropic.Bool(true)},
      					},
      				},
      				anthropic.NewTextBlock("Summarize this document."),
      			),
      		},
      	})
      if err != nil {
      	log.Fatal(err)
      }
      fmt.Println(citedMsg)
      ```

      ```java Java
      MessageCreateParams citedParams = MessageCreateParams.builder()
          .model(Model.CLAUDE_OPUS_5)
          .maxTokens(1024)
          .addUserMessageOfBlockParams(List.of(
              ContentBlockParam.ofDocument(DocumentBlockParam.builder()
                  .fileSource(fileId)
                  .title("Document Title")
                  .context("Context about the document that will not be cited from")
                  .citations(CitationsConfigParam.builder().enabled(true).build())
                  .build()),
              ContentBlockParam.ofText(TextBlockParam.builder()
                  .text("Summarize this document.")
                  .build())
          ))
          .build();

      Message citedMessage = client.messages().create(citedParams);
      System.out.println(citedMessage);
      ```

      ```php PHP
      $citedResponse = $client->messages->create(
          maxTokens: 1024,
          messages: [
              [
                  'role' => 'user',
                  'content' => [
                      [
                          'type' => 'document',
                          'source' => ['type' => 'file', 'fileID' => $fileId],
                          'title' => 'Document Title',
                          'context' => 'Context about the document that will not be cited from',
                          'citations' => ['enabled' => true],
                      ],
                      ['type' => 'text', 'text' => 'Summarize this document.'],
                  ],
              ],
          ],
          model: 'claude-opus-5',
      );

      echo $citedResponse;
      ```

      ```ruby Ruby
      cited_response = client.messages.create(
        model: "claude-opus-5",
        max_tokens: 1024,
        messages: [
          \{
            role: "user",
            content: [
              \{
                type: "document",
                source: \{ type: "file", file_id: file_id \},
                title: "Document Title",
                context: "Context about the document that will not be cited from",
                citations: \{ enabled: true \}
              \},
              \{
                type: "text",
                text: "Summarize this document."
              \}
            ]
          \}
        ]
      )

      puts cited_response
      ```
```
```

  ```json
  {
    "type": "char_location",
    "cited_text": "The exact text being cited", // not counted toward output tokens
    "document_index": 0,
    "document_title": "Document Title",
    "start_char_index": 0, // 0-indexed
    "end_char_index": 50 // exclusive
  }
  ```

### PDF documents

PDF documents can be provided as base64-encoded data, a URL, or by `file_id`. PDF text is extracted and chunked into sentences. As image citations are not yet supported, PDFs that are scans of documents and do not contain extractable text are not citable.

```
```
      ```bash cURL
      PDF_BASE64=$(base64 /path/to/document.pdf | tr -d '\n')

      curl https://api.anthropic.com/v1/messages \
        -H "content-type: application/json" \
        -H "x-api-key: $ANTHROPIC_API_KEY" \
        -H "anthropic-version: 2023-06-01" \
        -d '\{
          "model": "claude-opus-5",
          "max_tokens": 1024,
          "messages": [
            \{
              "role": "user",
              "content": [
                \{
                  "type": "document",
                  "source": \{
                    "type": "base64",
                    "media_type": "application/pdf",
                    "data": "'"$PDF_BASE64"'"
                  },
                  "title": "Document Title",
                  "context": "Context about the document that will not be cited from",
                  "citations": {"enabled": true}
                },
                {
                  "type": "text",
                  "text": "Summarize this document."
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
                type: base64
                media_type: application/pdf
                data: "@/path/to/document.pdf"
              title: Document Title
              context: Context about the document that will not be cited from
              citations:
                enabled: true
            - type: text
              text: Summarize this document.
      YAML
      ```

      ```python Python
      client = anthropic.Anthropic()

      pdf_base64 = base64.standard_b64encode(
          pathlib.Path("/path/to/document.pdf").read_bytes()
      ).decode()

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
                              "type": "base64",
                              "media_type": "application/pdf",
                              "data": pdf_base64,
                          },
                          "title": "Document Title",
                          "context": "Context about the document that will not be cited from",
                          "citations": {"enabled": True},
                      },
                      {"type": "text", "text": "Summarize this document."},
                  ],
              }
          ],
      )
      print(response)
      ```

      ```typescript TypeScript
      const client = new Anthropic();

      const pdfBase64 = Buffer.from(await readFile("/path/to/document.pdf")).toString("base64");

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
                  type: "base64",
                  media_type: "application/pdf",
                  data: pdfBase64
                },
                title: "Document Title",
                context: "Context about the document that will not be cited from",
                citations: { enabled: true }
              },
              {
                type: "text",
                text: "Summarize this document."
              }
            ]
          }
        ]
      });
      console.log(response);
      ```

      ```csharp C#
      var client = new AnthropicClient();

      var pdfBase64 = Convert.ToBase64String(await File.ReadAllBytesAsync("/path/to/document.pdf"));

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
                      Content = new MessageParamContent(new List&lt;ContentBlockParam>
                      {
                          new ContentBlockParam(new DocumentBlockParam(
                              new DocumentBlockParamSource(new Base64PdfSource() { Data = pdfBase64 })
                          )
                          {
                              Title = "Document Title",
                              Context = "Context about the document that will not be cited from",
                              Citations = new CitationsConfigParam { Enabled = true },
                          }),
                          new ContentBlockParam(new TextBlockParam("Summarize this document.")),
                      }),
                  },
              ],
          }
      );

      Console.WriteLine(response);
      ```

      ```go Go
      client := anthropic.NewClient()

      pdfBytes, err := os.ReadFile("/path/to/document.pdf")
      if err != nil {
      	log.Fatal(err)
      }
      pdfBase64 := base64.StdEncoding.EncodeToString(pdfBytes)

      response, err := client.Messages.New(context.TODO(), anthropic.MessageNewParams{
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
      					Title:     anthropic.String("Document Title"),
      					Context:   anthropic.String("Context about the document that will not be cited from"),
      					Citations: anthropic.CitationsConfigParam{Enabled: anthropic.Bool(true)},
      				},
      			},
      			anthropic.NewTextBlock("Summarize this document."),
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

      byte[] pdfBytes = Files.readAllBytes(Path.of("/path/to/document.pdf"));
      String pdfBase64 = Base64.getEncoder().encodeToString(pdfBytes);

      DocumentBlockParam documentParam = DocumentBlockParam.builder()
          .source(Base64PdfSource.builder().data(pdfBase64).build())
          .title("Document Title")
          .context("Context about the document that will not be cited from")
          .citations(CitationsConfigParam.builder().enabled(true).build())
          .build();

      MessageCreateParams params = MessageCreateParams.builder()
          .model(Model.CLAUDE_OPUS_5)
          .maxTokens(1024)
          .addUserMessageOfBlockParams(
              List.of(
                  ContentBlockParam.ofDocument(documentParam),
                  ContentBlockParam.ofText(TextBlockParam.builder().text("Summarize this document.").build())
              )
          )
          .build();

      Message message = client.messages().create(params);
      System.out.println(message);
      ```

      ```php PHP
      $client = new Client();

      $pdfBase64 = base64_encode(file_get_contents('/path/to/document.pdf'));

      $response = $client->messages->create(
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
                              'data' => $pdfBase64,
                          ],
                          'title' => 'Document Title',
                          'context' => 'Context about the document that will not be cited from',
                          'citations' => ['enabled' => true],
                      ],
                      [
                          'type' => 'text',
                          'text' => 'Summarize this document.',
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

      pdf_base64 = Base64.strict_encode64(File.binread("/path/to/document.pdf"))

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
                  type: "base64",
                  media_type: "application/pdf",
                  data: pdf_base64
                },
                title: "Document Title",
                context: "Context about the document that will not be cited from",
                citations: { enabled: true }
              },
              {
                type: "text",
                text: "Summarize this document."
              }
            ]
          }
        ]
      )

      puts response
      ```

      ```bash cURL
      curl https://api.anthropic.com/v1/messages \
        -H "content-type: application/json" \
        -H "x-api-key: $ANTHROPIC_API_KEY" \
        -H "anthropic-version: 2023-06-01" \
        -d '\{
          "model": "claude-opus-5",
          "max_tokens": 1024,
          "messages": [
            \{
              "role": "user",
              "content": [
                \{
                  "type": "document",
                  "source": \{
                    "type": "url",
                    "url": "https://assets.anthropic.com/m/1cd9d098ac3e6467/original/Claude-3-Model-Card-October-Addendum.pdf"
                  \},
                  "title": "Document Title",
                  "context": "Context about the document that will not be cited from",
                  "citations": \{"enabled": true\}
                \},
                \{
                  "type": "text",
                  "text": "Summarize this document."
                \}
              ]
            \}
          ]
        \}'
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
                type: url
                url: https://assets.anthropic.com/m/1cd9d098ac3e6467/original/Claude-3-Model-Card-October-Addendum.pdf
              title: Document Title
              context: Context about the document that will not be cited from
              citations:
                enabled: true
            - type: text
              text: Summarize this document.
      YAML
      ```

      ```python Python
      client = anthropic.Anthropic()

      response = client.messages.create(
          model="claude-opus-5",
          max_tokens=1024,
          messages=[
              \{
                  "role": "user",
                  "content": [
                      \{
                          "type": "document",
                          "source": \{
                              "type": "url",
                              "url": "https://assets.anthropic.com/m/1cd9d098ac3e6467/original/Claude-3-Model-Card-October-Addendum.pdf",
                          \},
                          "title": "Document Title",
                          "context": "Context about the document that will not be cited from",
                          "citations": \{"enabled": True\},
                      \},
                      \{"type": "text", "text": "Summarize this document."\},
                  ],
              \}
          ],
      )
      print(response)
      ```

      ```typescript TypeScript
      const client = new Anthropic();

      const response = await client.messages.create(\{
        model: "claude-opus-5",
        max_tokens: 1024,
        messages: [
          \{
            role: "user",
            content: [
              \{
                type: "document",
                source: \{
                  type: "url",
                  url: "https://assets.anthropic.com/m/1cd9d098ac3e6467/original/Claude-3-Model-Card-October-Addendum.pdf"
                \},
                title: "Document Title",
                context: "Context about the document that will not be cited from",
                citations: \{ enabled: true \}
              \},
              \{
                type: "text",
                text: "Summarize this document."
              \}
            ]
          \}
        ]
      \});
      console.log(response);
      ```

      ```csharp C#
      var client = new AnthropicClient();

      var response = await client.Messages.Create(
          new()
          \{
              Model = Model.ClaudeOpus5,
              MaxTokens = 1024,
              Messages =
              [
                  new()
                  \{
                      Role = Role.User,
                      Content = new MessageParamContent(new List&lt;ContentBlockParam>
                      \{
                          new ContentBlockParam(new DocumentBlockParam(
                              new DocumentBlockParamSource(new UrlPdfSource()
                              \{
                                  Url = "https://assets.anthropic.com/m/1cd9d098ac3e6467/original/Claude-3-Model-Card-October-Addendum.pdf",
                              \})
                          )
                          \{
                              Title = "Document Title",
                              Context = "Context about the document that will not be cited from",
                              Citations = new CitationsConfigParam \{ Enabled = true \},
                          \}),
                          new ContentBlockParam(new TextBlockParam("Summarize this document.")),
                      \}),
                  \},
              ],
          \}
      );

      Console.WriteLine(response);
      ```

      ```go Go
      client := anthropic.NewClient()

      response, err := client.Messages.New(context.TODO(), anthropic.MessageNewParams\{
      	Model:     anthropic.ModelClaudeOpus5,
      	MaxTokens: 1024,
      	Messages: []anthropic.MessageParam\{
      		anthropic.NewUserMessage(
      			anthropic.ContentBlockParamUnion\{
      				OfDocument: &anthropic.DocumentBlockParam\{
      					Source: anthropic.DocumentBlockParamSourceUnion\{
      						OfURL: &anthropic.URLPDFSourceParam\{
      							URL: "https://assets.anthropic.com/m/1cd9d098ac3e6467/original/Claude-3-Model-Card-October-Addendum.pdf",
      						\},
      					\},
      					Title:     anthropic.String("Document Title"),
      					Context:   anthropic.String("Context about the document that will not be cited from"),
      					Citations: anthropic.CitationsConfigParam\{Enabled: anthropic.Bool(true)\},
      				\},
      			\},
      			anthropic.NewTextBlock("Summarize this document."),
      		),
      	\},
      \})
      if err != nil \{
      	log.Fatal(err)
      \}
      fmt.Println(response)
      ```

      ```java Java
      AnthropicClient client = AnthropicOkHttpClient.fromEnv();

      DocumentBlockParam documentParam = DocumentBlockParam.builder()
          .source(UrlPdfSource.builder()
              .url("https://assets.anthropic.com/m/1cd9d098ac3e6467/original/Claude-3-Model-Card-October-Addendum.pdf")
              .build())
          .title("Document Title")
          .context("Context about the document that will not be cited from")
          .citations(CitationsConfigParam.builder().enabled(true).build())
          .build();

      MessageCreateParams params = MessageCreateParams.builder()
          .model(Model.CLAUDE_OPUS_5)
          .maxTokens(1024)
          .addUserMessageOfBlockParams(
              List.of(
                  ContentBlockParam.ofDocument(documentParam),
                  ContentBlockParam.ofText(TextBlockParam.builder().text("Summarize this document.").build())
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
                              'type' => 'url',
                              'url' => 'https://assets.anthropic.com/m/1cd9d098ac3e6467/original/Claude-3-Model-Card-October-Addendum.pdf',
                          ],
                          'title' => 'Document Title',
                          'context' => 'Context about the document that will not be cited from',
                          'citations' => ['enabled' => true],
                      ],
                      [
                          'type' => 'text',
                          'text' => 'Summarize this document.',
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
          \{
            role: "user",
            content: [
              \{
                type: "document",
                source: \{
                  type: "url",
                  url: "https://assets.anthropic.com/m/1cd9d098ac3e6467/original/Claude-3-Model-Card-October-Addendum.pdf"
                \},
                title: "Document Title",
                context: "Context about the document that will not be cited from",
                citations: \{ enabled: true \}
              \},
              \{
                type: "text",
                text: "Summarize this document."
              \}
            ]
          \}
        ]
      )

      puts response
      ```

    These examples reference a file uploaded through the [Files API](https://platform.claude.com/docs/en/build-with-claude/files) as a `document` source.

      ```bash cURL
      curl -X POST https://api.anthropic.com/v1/messages \
        -H "x-api-key: $ANTHROPIC_API_KEY" \
        -H "anthropic-version: 2023-06-01" \
        -H "content-type: application/json" \
        -d @- <<EOF
      {
        "model": "claude-opus-5",
        "max_tokens": 1024,
        "messages": [
          {
            "role": "user",
            "content": [
              {
                "type": "document",
                "source": {"type": "file", "file_id": "$FILE_ID"\},
                "title": "Document Title",
                "context": "Context about the document that will not be cited from",
                "citations": \{"enabled": true\}
              \},
              \{
                "type": "text",
                "text": "Summarize this document."
              \}
            ]
          \}
        ]
      \}
      EOF
      ```

      ```bash CLI
      ant messages create <<YAML
      model: claude-opus-5
      max_tokens: 1024
      messages:
        - role: user
          content:
            - type: document
              source:
                type: file
                file_id: $FILE_ID
              title: Document Title
              context: Context about the document that will not be cited from
              citations:
                enabled: true
            - type: text
              text: Summarize this document.
      YAML
      ```

      ```python Python
      cited_response = client.messages.create(
          model="claude-opus-5",
          max_tokens=1024,
          messages=[
              {
                  "role": "user",
                  "content": [
                      {
                          "type": "document",
                          "source": {"type": "file", "file_id": file_id},
                          "title": "Document Title",
                          "context": "Context about the document that will not be cited from",
                          "citations": {"enabled": True},
                      },
                      {"type": "text", "text": "Summarize this document."},
                  ],
              }
          ],
      )
      print(cited_response)
      ```

      ```typescript TypeScript
      const citedResponse = await client.messages.create({
        model: "claude-opus-5",
        max_tokens: 1024,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "document",
                source: { type: "file", file_id: uploaded.id },
                title: "Document Title",
                context: "Context about the document that will not be cited from",
                citations: { enabled: true },
              },
              {
                type: "text",
                text: "Summarize this document.",
              },
            ],
          },
        ],
      });
      console.log(citedResponse);
      ```

      ```csharp C#
      var citedResponse = await client.Messages.Create(
          new MessageCreateParams
          {
              Model = Model.ClaudeOpus5,
              MaxTokens = 1024,
              Messages =
              [
                  new MessageParam
                  {
                      Role = Role.User,
                      Content = new List&lt;ContentBlockParam>
                      {
                          new DocumentBlockParam
                          {
                              Source = new FileDocumentSource { FileID = fileId },
                              Title = "Document Title",
                              Context = "Context about the document that will not be cited from",
                              Citations = new CitationsConfigParam { Enabled = true },
                          },
                          new TextBlockParam { Text = "Summarize this document." },
                      }
                  }
              ]
          });

      Console.WriteLine(citedResponse);
      ```

      ```go Go
      citedMsg, err := client.Messages.New(context.Background(),
      	anthropic.MessageNewParams{
      		Model:     anthropic.ModelClaudeOpus5,
      		MaxTokens: 1024,
      		Messages: []anthropic.MessageParam{
      			anthropic.NewUserMessage(
      				anthropic.ContentBlockParamUnion{
      					OfDocument: &anthropic.DocumentBlockParam{
      						Source: anthropic.DocumentBlockParamSourceUnion{
      							OfFile: &anthropic.FileDocumentSourceParam{FileID: fileID},
      						},
      						Title:     anthropic.String("Document Title"),
      						Context:   anthropic.String("Context about the document that will not be cited from"),
      						Citations: anthropic.CitationsConfigParam{Enabled: anthropic.Bool(true)},
      					},
      				},
      				anthropic.NewTextBlock("Summarize this document."),
      			),
      		},
      	})
      if err != nil {
      	log.Fatal(err)
      }
      fmt.Println(citedMsg)
      ```

      ```java Java
      MessageCreateParams citedParams = MessageCreateParams.builder()
          .model(Model.CLAUDE_OPUS_5)
          .maxTokens(1024)
          .addUserMessageOfBlockParams(List.of(
              ContentBlockParam.ofDocument(DocumentBlockParam.builder()
                  .fileSource(fileId)
                  .title("Document Title")
                  .context("Context about the document that will not be cited from")
                  .citations(CitationsConfigParam.builder().enabled(true).build())
                  .build()),
              ContentBlockParam.ofText(TextBlockParam.builder()
                  .text("Summarize this document.")
                  .build())
          ))
          .build();

      Message citedMessage = client.messages().create(citedParams);
      System.out.println(citedMessage);
      ```

      ```php PHP
      $citedResponse = $client->messages->create(
          maxTokens: 1024,
          messages: [
              [
                  'role' => 'user',
                  'content' => [
                      [
                          'type' => 'document',
                          'source' => ['type' => 'file', 'fileID' => $fileId],
                          'title' => 'Document Title',
                          'context' => 'Context about the document that will not be cited from',
                          'citations' => ['enabled' => true],
                      ],
                      ['type' => 'text', 'text' => 'Summarize this document.'],
                  ],
              ],
          ],
          model: 'claude-opus-5',
      );

      echo $citedResponse;
      ```

      ```ruby Ruby
      cited_response = client.messages.create(
        model: "claude-opus-5",
        max_tokens: 1024,
        messages: [
          \{
            role: "user",
            content: [
              \{
                type: "document",
                source: \{ type: "file", file_id: file_id \},
                title: "Document Title",
                context: "Context about the document that will not be cited from",
                citations: \{ enabled: true \}
              \},
              \{
                type: "text",
                text: "Summarize this document."
              \}
            ]
          \}
        ]
      )

      puts cited_response
      ```
```
```

  ```json
  {
    "type": "page_location",
    "cited_text": "The exact text being cited", // not counted toward output tokens
    "document_index": 0,
    "document_title": "Document Title",
    "start_page_number": 1, // 1-indexed
    "end_page_number": 2 // exclusive
  }
  ```

### Custom content documents

Custom content documents give you control over citation granularity. No additional chunking is done and chunks are provided to the model according to the content blocks provided.

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
                "type": "content",
                "content": [
                  {"type": "text", "text": "First chunk"},
                  {"type": "text", "text": "Second chunk"}
                ]
              },
              "title": "Document Title",
              "context": "Context about the document that will not be cited from",
              "citations": {"enabled": true}
            },
            {
              "type": "text",
              "text": "Summarize this document."
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
            type: content
            content:
              - type: text
                text: First chunk
              - type: text
                text: Second chunk
          title: Document Title
          context: Context about the document that will not be cited from
          citations:
            enabled: true
        - type: text
          text: Summarize this document.
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
                          "type": "content",
                          "content": [
                              {"type": "text", "text": "First chunk"},
                              {"type": "text", "text": "Second chunk"},
                          ],
                      },
                      "title": "Document Title",
                      "context": "Context about the document that will not be cited from",
                      "citations": {"enabled": True},
                  },
                  {"type": "text", "text": "Summarize this document."},
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
              type: "content",
              content: [
                { type: "text", text: "First chunk" },
                { type: "text", text: "Second chunk" }
              ]
            },
            title: "Document Title",
            context: "Context about the document that will not be cited from",
            citations: { enabled: true }
          },
          {
            type: "text",
            text: "Summarize this document."
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
                          new DocumentBlockParamSource(new ContentBlockSource()
                          {
                              Content = new ContentBlockSourceContent(new List<MessageContentBlockSourceContent>
                              {
                                  new TextBlockParam("First chunk"),
                                  new TextBlockParam("Second chunk"),
                              }),
                          })
                      )
                      {
                          Title = "Document Title",
                          Context = "Context about the document that will not be cited from",
                          Citations = new CitationsConfigParam { Enabled = true },
                      }),
                      new ContentBlockParam(new TextBlockParam("Summarize this document.")),
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
  						OfContent: &anthropic.ContentBlockSourceParam{
  							Content: anthropic.ContentBlockSourceContentUnionParam{
  								OfContentBlockSourceContent: []anthropic.ContentBlockSourceContentItemUnionParam{
  									{OfText: &anthropic.TextBlockParam{Text: "First chunk"}},
  									{OfText: &anthropic.TextBlockParam{Text: "Second chunk"}},
  								},
  							},
  						},
  					},
  					Title:     anthropic.String("Document Title"),
  					Context:   anthropic.String("Context about the document that will not be cited from"),
  					Citations: anthropic.CitationsConfigParam{Enabled: anthropic.Bool(true)},
  				},
  			},
  			anthropic.NewTextBlock("Summarize this document."),
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

  DocumentBlockParam documentParam = DocumentBlockParam.builder()
      .source(ContentBlockSource.builder()
          .contentOfBlockSource(
              List.of(
                  ContentBlockSourceContent.ofText(TextBlockParam.builder().text("First chunk").build()),
                  ContentBlockSourceContent.ofText(TextBlockParam.builder().text("Second chunk").build())
              )
          )
          .build())
      .title("Document Title")
      .context("Context about the document that will not be cited from")
      .citations(CitationsConfigParam.builder().enabled(true).build())
      .build();

  MessageCreateParams params = MessageCreateParams.builder()
      .model(Model.CLAUDE_OPUS_5)
      .maxTokens(1024)
      .addUserMessageOfBlockParams(
          List.of(
              ContentBlockParam.ofDocument(documentParam),
              ContentBlockParam.ofText(TextBlockParam.builder().text("Summarize this document.").build())
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
                          'type' => 'content',
                          'content' => [
                              ['type' => 'text', 'text' => 'First chunk'],
                              ['type' => 'text', 'text' => 'Second chunk'],
                          ],
                      ],
                      'title' => 'Document Title',
                      'context' => 'Context about the document that will not be cited from',
                      'citations' => ['enabled' => true],
                  ],
                  [
                      'type' => 'text',
                      'text' => 'Summarize this document.',
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
              type: "content",
              content: [
                { type: "text", text: "First chunk" },
                { type: "text", text: "Second chunk" }
              ]
            },
            title: "Document Title",
            context: "Context about the document that will not be cited from",
            citations: { enabled: true }
          },
          {
            type: "text",
            text: "Summarize this document."
          }
        ]
      }
    ]
  )

  puts response
  ```

  ```json
  {
    "type": "content_block_location",
    "cited_text": "The exact text being cited", // not counted toward output tokens
    "document_index": 0,
    "document_title": "Document Title",
    "start_block_index": 0, // 0-indexed
    "end_block_index": 1 // exclusive
  }
  ```

***
