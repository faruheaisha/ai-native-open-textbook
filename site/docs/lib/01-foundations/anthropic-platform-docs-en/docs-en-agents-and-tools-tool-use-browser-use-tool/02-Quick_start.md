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
sourceRel: "docs/en/agents-and-tools/tool-use/browser-use-tool.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/agents-and-tools/tool-use/browser-use-tool.md"
sourceSha256: "d43f412bbfd1e7c341a24d092ded1e9b9fa70b226fe41111f02453c9a4d81255"
pageSha256: "c4981b4cddc01789e9630848f457012ba0e81cb7380e765df22c70cb1671a805"
contentMode: "local-full"
zh: ""
---

## Quick start

The browser use tool is available on the Claude API and [Google Cloud](https://platform.claude.com/docs/en/build-with-claude/claude-on-vertex-ai): add one entry of type `browser_toolset_20260801`, with no `name`, to the `tools` array of a [Messages API](https://platform.claude.com/docs/en/api/messages/create) request.

  ```bash cURL
  curl https://api.anthropic.com/v1/messages \
    -H "content-type: application/json" \
    -H "x-api-key: $ANTHROPIC_API_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -d '{
      "model": "claude-opus-5",
      "max_tokens": 2048,
      "tools": [
        {
          "type": "browser_toolset_20260801"
        }
      ],
      "messages": [
        {
          "role": "user",
          "content": "Open example.com/docs and tell me how to get started."
        }
      ]
    }'
  ```

  ```bash CLI
  ant messages create <<'YAML'
  model: claude-opus-5
  max_tokens: 2048
  tools:
    - type: browser_toolset_20260801
  messages:
    - role: user
      content: Open example.com/docs and tell me how to get started.
  YAML
  ```

  ```python Python
  client = anthropic.Anthropic()

  response = client.messages.create(
      model="claude-opus-5",
      max_tokens=2048,
      tools=[{"type": "browser_toolset_20260801"}],
      messages=[
          {
              "role": "user",
              "content": "Open example.com/docs and tell me how to get started.",
          }
      ],
  )
  print(response)
  ```

  ```typescript TypeScript
  const client = new Anthropic();

  const response = await client.messages.create({
    model: "claude-opus-5",
    max_tokens: 2048,
    tools: [{ type: "browser_toolset_20260801" }],
    messages: [
      {
        role: "user",
        content: "Open example.com/docs and tell me how to get started."
      }
    ]
  });

  console.log(response);
  ```

  ```csharp C#
  var client = new AnthropicClient();

  var parameters = new MessageCreateParams
  {
      Model = Model.ClaudeOpus5,
      MaxTokens = 2048,
      Tools = [new BrowserToolset20260801()],
      Messages =
      [
          new MessageParam
          {
              Role = Role.User,
              Content = "Open example.com/docs and tell me how to get started.",
          },
      ],
  };

  var response = await client.Messages.Create(parameters);
  Console.WriteLine(response);
  ```

  ```go Go
  client := anthropic.NewClient()

  response, err := client.Messages.New(context.TODO(), anthropic.MessageNewParams{
  	Model:     anthropic.ModelClaudeOpus5,
  	MaxTokens: 2048,
  	Tools: []anthropic.ToolUnionParam{
  		{OfBrowserToolset20260801: &anthropic.BrowserToolset20260801Param{}},
  	},
  	Messages: []anthropic.MessageParam{
  		anthropic.NewUserMessage(anthropic.NewTextBlock("Open example.com/docs and tell me how to get started.")),
  	},
  })
  if err != nil {
  	log.Fatal(err)
  }
  fmt.Println(response.RawJSON())
  ```

  ```java Java
  import com.anthropic.models.messages.BrowserToolset20260801;
  // ...

  void main() {
      AnthropicClient client = AnthropicOkHttpClient.fromEnv();

      MessageCreateParams params = MessageCreateParams.builder()
          .model(Model.CLAUDE_OPUS_5)
          .maxTokens(2048L)
          .addTool(BrowserToolset20260801.builder().build())
          .addUserMessage("Open example.com/docs and tell me how to get started.")
          .build();

      Message response = client.messages().create(params);
      IO.println(response);
  }
  ```

  ```php PHP
  $client = new Client();

  $response = $client->messages->create(
      maxTokens: 2048,
      messages: [
          ['role' => 'user', 'content' => 'Open example.com/docs and tell me how to get started.'],
      ],
      model: 'claude-opus-5',
      tools: [
          ['type' => 'browser_toolset_20260801'],
      ],
  );

  echo $response;
  ```

  ```ruby Ruby
  client = Anthropic::Client.new

  response = client.messages.create(
    model: "claude-opus-5",
    max_tokens: 2048,
    tools: [
      { type: "browser_toolset_20260801" }
    ],
    messages: [
      {
        role: "user",
        content: "Open example.com/docs and tell me how to get started."
      }
    ]
  )

  puts response
  ```

Claude's first response ends with `stop_reason: "tool_use"` and carries one or more member `tool_use` blocks, each naming a member tool in `name` and carrying `"toolset_name": "browser"`:

```json Output
{
  "id": "msg_01HCDu4XSTLzTAcodEQ58vDo",
  "type": "message",
  "role": "assistant",
  "model": "claude-opus-5",
  "content": [
    {
      "type": "text",
      "text": "I'll open the documentation and read the page to find the getting-started instructions."
    },
    {
      "type": "tool_use",
      "id": "toolu_01NRLabsLyVHZPKxbKvkfSMn",
      "name": "navigate",
      "toolset_name": "browser",
      "input": { "url": "https://example.com/docs" }
    },
    {
      "type": "tool_use",
      "id": "toolu_01UvHU5cDyTZ2vXKf5wCkPqR",
      "name": "read_page",
      "toolset_name": "browser",
      "input": { "filter": "interactive" }
    }
  ],
  "stop_reason": "tool_use",
  "stop_sequence": null
}
```

Your executor (the part of your application that drives the browser and produces tool results) runs `navigate`, then `read_page`. Your application returns one `tool_result` per block in its next request, echoing `toolset_name` on each. The `navigate` result reports the tab it loaded in a `browser_state` block; the `read_page` result is text in which every element carries a reference:

```json
{
  "role": "user",
  "content": [
    {
      "type": "tool_result",
      "tool_use_id": "toolu_01NRLabsLyVHZPKxbKvkfSMn",
      "toolset_name": "browser",
      "content": [
        { "type": "text", "text": "Navigated to https://example.com/docs" },
        {
          "type": "browser_state",
          "tabs": [
            {
              "tab_id": "tab-1",
              "title": "Documentation",
              "url": "https://example.com/docs",
              "active": true
            }
          ]
        }
      ]
    },
    {
      "type": "tool_result",
      "tool_use_id": "toolu_01UvHU5cDyTZ2vXKf5wCkPqR",
      "toolset_name": "browser",
      "content": [
        {
          "type": "text",
          "text": "link \"Documentation\" [ref_1]\nlink \"Getting started\" [ref_2]\ntextbox \"Search docs\" [ref_3]\nbutton \"Search\" [ref_4]\nlink \"Pricing\" [ref_5]"
        }
      ]
    }
  ]
}
```

Claude now holds references it can act on, so its next turn can click `ref_2` to open the getting-started page, with no need to locate the link in a screenshot first.
