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
sourceRel: "docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices.md"
sourceSha256: "f98aa130a7974b2edf98f8c3babe806ab140d5cdd3933a506f5211335b431c5f"
pageSha256: "ba0d84d1fd1d2772f299db4119e62484122c9574a4aa378f22b8a1bbd4c257e9"
contentMode: "local-full"
zh: ""
---

## General principles

The techniques in this section and the sections that follow apply to current Claude models, including Claude Fable 5.1, Claude Mythos 5.1, Claude Fable 5, and Claude Mythos 5. Where a technique names a specific model, treat it as measured on that model and re-check it against your own evals before applying it to another.

### Be clear and direct

Claude responds well to clear, explicit instructions. Being specific about your desired output can help enhance results. If you want "above and beyond" behavior, explicitly request it rather than relying on the model to infer this from vague prompts.

Think of Claude as a brilliant but new employee who lacks context on your norms and workflows. The more precisely you explain what you want, the better the result.

**Golden rule:** Show your prompt to a colleague with minimal context on the task and ask them to follow it. If they'd be confused, Claude will be too.

* Be specific about the desired output format and constraints.
* Provide instructions as sequential steps using numbered lists or bullet points when the order or completeness of steps matters.

  **Less effective:**

  ```text wrap
  Create an analytics dashboard
  ```

  **More effective:**

  ```text wrap
  Create an analytics dashboard. Include as many relevant features and interactions as possible. Go beyond the basics to create a fully-featured implementation.
  ```

### Add context to improve performance

Providing context or motivation behind your instructions, such as explaining to Claude why such behavior is important, can help Claude better understand your goals and deliver more targeted responses.

  **Less effective:**

  ```text wrap
  NEVER use ellipses
  ```

  **More effective:**

  ```text wrap
  Your response will be read aloud by a text-to-speech engine, so never use ellipses since the text-to-speech engine will not know how to pronounce them.
  ```

Claude is smart enough to generalize from the explanation.

### Use examples effectively

Examples are one of the most reliable ways to steer Claude's output format, tone, and structure. A few well-crafted examples (known as few-shot or multishot prompting) improve accuracy and consistency.

When adding examples, make them:

* **Relevant:** Mirror your actual use case closely.
* **Diverse:** Cover edge cases and vary enough that Claude doesn't pick up unintended patterns.
* **Structured:** Wrap examples in `<example>` tags (multiple examples in `<examples>` tags) so Claude can distinguish them from instructions.

  Include 3–5 examples for best results. You can also ask Claude to evaluate your examples for relevance and diversity, or to generate additional ones based on your initial set.

### Structure prompts with XML tags

XML tags help Claude parse complex prompts unambiguously, especially when your prompt mixes instructions, context, examples, and variable inputs. Wrapping each type of content in its own tag (for example, `<instructions>`, `<context>`, `<input>`) reduces misinterpretation.

Best practices:

* Use consistent, descriptive tag names across your prompts.
* Nest tags when content has a natural hierarchy (documents inside `<documents>`, each inside `<document index="n">`).

### Give Claude a role

Setting a role in the system prompt focuses Claude's behavior and tone for your use case. Even a single sentence makes a difference:

  ```bash cURL
  curl https://api.anthropic.com/v1/messages \
    -H "content-type: application/json" \
    -H "x-api-key: $ANTHROPIC_API_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -d '{
      "model": "claude-opus-5",
      "max_tokens": 1024,
      "system": "You are a helpful coding assistant specializing in Python.",
      "messages": [
        {"role": "user", "content": "How do I sort a list of dictionaries by key?"}
      ]
    }'
  ```

  ```bash CLI
  ant messages create \
    --model claude-opus-5 \
    --max-tokens 1024 \
    --system "You are a helpful coding assistant specializing in Python." \
    --message '{role: user, content: "How do I sort a list of dictionaries by key?"}'
  ```

  ```python Python
  client = anthropic.Anthropic()

  message = client.messages.create(
      model="claude-opus-5",
      max_tokens=1024,
      system="You are a helpful coding assistant specializing in Python.",
      messages=[
          {"role": "user", "content": "How do I sort a list of dictionaries by key?"}
      ],
  )

  print(message.content)
  ```

  ```typescript TypeScript
  const client = new Anthropic();

  const message = await client.messages.create({
    model: "claude-opus-5",
    max_tokens: 1024,
    system: "You are a helpful coding assistant specializing in Python.",
    messages: [{ role: "user", content: "How do I sort a list of dictionaries by key?" }]
  });

  console.log(message.content);
  ```

  ```csharp C#
  AnthropicClient client = new();

  var parameters = new MessageCreateParams
  {
      Model = Model.ClaudeOpus5,
      MaxTokens = 1024,
      System = "You are a helpful coding assistant specializing in Python.",
      Messages =
      [
          new() { Role = Role.User, Content = "How do I sort a list of dictionaries by key?" }
      ]
  };

  var message = await client.Messages.Create(parameters);
  Console.WriteLine(message);
  ```

  ```go Go
  client := anthropic.NewClient()

  message, err := client.Messages.New(context.TODO(), anthropic.MessageNewParams{
  	Model:     anthropic.ModelClaudeOpus5,
  	MaxTokens: 1024,
  	System: []anthropic.TextBlockParam{
  		{Text: "You are a helpful coding assistant specializing in Python."},
  	},
  	Messages: []anthropic.MessageParam{
  		anthropic.NewUserMessage(anthropic.NewTextBlock("How do I sort a list of dictionaries by key?")),
  	},
  })
  if err != nil {
  	log.Fatal(err)
  }
  fmt.Println(message.Content)
  ```

  ```java Java
  AnthropicClient client = AnthropicOkHttpClient.fromEnv();

  MessageCreateParams params = MessageCreateParams.builder()
      .model(Model.CLAUDE_OPUS_5)
      .maxTokens(1024)
      .system("You are a helpful coding assistant specializing in Python.")
      .addUserMessage("How do I sort a list of dictionaries by key?")
      .build();

  Message message = client.messages().create(params);
  System.out.println(message.content());
  ```

  ```php PHP
  $client = new Client();

  $message = $client->messages->create(
      maxTokens: 1024,
      messages: [
          ['role' => 'user', 'content' => 'How do I sort a list of dictionaries by key?']
      ],
      model: 'claude-opus-5',
      system: 'You are a helpful coding assistant specializing in Python.',
  );

  echo json_encode($message->content, JSON_PRETTY_PRINT), PHP_EOL;
  ```

  ```ruby Ruby
  client = Anthropic::Client.new

  message = client.messages.create(
    model: "claude-opus-5",
    max_tokens: 1024,
    system: "You are a helpful coding assistant specializing in Python.",
    messages: [
      { role: "user", content: "How do I sort a list of dictionaries by key?" }
    ]
  )

  puts message.content
  ```

### Long context prompting

When working with large documents or data-rich inputs (20k+ tokens), structure your prompt carefully to get the best results:

* **Put longform data at the top:** Place your long documents and inputs near the top of your prompt, above your query, instructions, and examples. This improves performance across all models.

    Queries at the end can improve response quality by up to 30 percent in tests, especially with complex, multidocument inputs.

* **Structure document content and metadata with XML tags:** When using multiple documents, wrap each document in `<document>` tags with `<document_content>` and `<source>` (and other metadata) subtags for clarity.

    ```xml
    &lt;documents>
      &lt;document index="1">
        <source>annual_report_2023.pdf&lt;/source>
        &lt;document_content>
          &#123;&#123;ANNUAL_REPORT&#125;&#125;
        &lt;/document_content>
      &lt;/document>
      &lt;document index="2">
        <source>competitor_analysis_q2.xlsx&lt;/source>
        &lt;document_content>
          &#123;&#123;COMPETITOR_ANALYSIS&#125;&#125;
        &lt;/document_content>
      &lt;/document>
    &lt;/documents>

    Analyze the annual report and competitor analysis. Identify strategic advantages and recommend Q3 focus areas.
    ```

* **Ground responses in quotes:** For long document tasks, ask Claude to quote relevant parts of the documents first before carrying out its task. This helps Claude focus on the relevant content and ignore the rest of the document.

    ```xml
    You are an AI physician's assistant. Your task is to help doctors diagnose possible patient illnesses.

    &lt;documents>
      &lt;document index="1">
        <source>patient_symptoms.txt&lt;/source>
        &lt;document_content>
          &#123;&#123;PATIENT_SYMPTOMS&#125;&#125;
        &lt;/document_content>
      &lt;/document>
      &lt;document index="2">
        <source>patient_records.txt&lt;/source>
        &lt;document_content>
          &#123;&#123;PATIENT_RECORDS&#125;&#125;
        &lt;/document_content>
      &lt;/document>
      &lt;document index="3">
        <source>patient01_appt_history.txt&lt;/source>
        &lt;document_content>
          &#123;&#123;PATIENT01_APPOINTMENT_HISTORY&#125;&#125;
        &lt;/document_content>
      &lt;/document>
    &lt;/documents>

    Find quotes from the patient records and appointment history that are relevant to diagnosing the patient's reported symptoms. Place these in &lt;quotes> tags. Then, based on these quotes, list all information that would help the doctor diagnose the patient's symptoms. Place your diagnostic information in &lt;info> tags.
    ```

### Model self-knowledge

If you would like Claude to identify itself correctly in your application or use specific API strings:

```text Sample prompt for model identity wrap
The assistant is Claude, created by Anthropic. The current model is Claude Opus 5.
```

For LLM-powered apps that need to specify model strings:

```text Sample prompt for model string wrap
When an LLM is needed, please default to Claude Opus 5 unless the user requests
otherwise. The exact model string for Claude Opus 5 is claude-opus-5.
```
