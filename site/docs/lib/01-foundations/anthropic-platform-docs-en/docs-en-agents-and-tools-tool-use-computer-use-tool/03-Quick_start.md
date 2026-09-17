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
sourceRel: "docs/en/agents-and-tools/tool-use/computer-use-tool.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/agents-and-tools/tool-use/computer-use-tool.md"
sourceSha256: "4de659db5a454a438de8f37a25742b665254c305624f55cfcc5b76491ae62d46"
pageSha256: "337843fe8241afcfb4c1bc8a85188a887a5ae89cebff7207688d7101fbde95bf"
contentMode: "local-full"
zh: ""
---

## Quick start

Add the computer use toolset to the `tools` array of a [Messages API](https://platform.claude.com/docs/en/api/messages/create) request as `\{"type": "computer_toolset_20260801"\}`. The request needs no beta header. This example also declares the [text editor tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/text-editor-tool) and [bash tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/bash-tool), which Claude typically uses alongside computer use:

  ```bash cURL
  curl https://api.anthropic.com/v1/messages \
    -H "content-type: application/json" \
    -H "x-api-key: $ANTHROPIC_API_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -d '{
      "model": "claude-opus-5",
      "max_tokens": 1024,
      "tools": [
        {
          "type": "computer_toolset_20260801"
        },
        {
          "type": "text_editor_20250728",
          "name": "str_replace_based_edit_tool"
        },
        {
          "type": "bash_20250124",
          "name": "bash"
        }
      ],
      "messages": [
        {
          "role": "user",
          "content": "Save a picture of a cat to my desktop."
        }
      ]
    }'
  ```

  ```bash CLI
  ant messages create <<'YAML'
  model: claude-opus-5
  max_tokens: 1024
  tools:
    - type: computer_toolset_20260801
    - type: text_editor_20250728
      name: str_replace_based_edit_tool
    - type: bash_20250124
      name: bash
  messages:
    - role: user
      content: Save a picture of a cat to my desktop.
  YAML
  ```

  ```python Python
  client = anthropic.Anthropic()

  response = client.messages.create(
      model="claude-opus-5",
      max_tokens=1024,
      tools=[
          {"type": "computer_toolset_20260801"},
          {"type": "text_editor_20250728", "name": "str_replace_based_edit_tool"},
          {"type": "bash_20250124", "name": "bash"},
      ],
      messages=[{"role": "user", "content": "Save a picture of a cat to my desktop."}],
  )
  print(response)
  ```

  ```typescript TypeScript
  const client = new Anthropic();

  const response = await client.messages.create({
    model: "claude-opus-5",
    max_tokens: 1024,
    tools: [
      {
        type: "computer_toolset_20260801"
      },
      {
        type: "text_editor_20250728",
        name: "str_replace_based_edit_tool"
      },
      {
        type: "bash_20250124",
        name: "bash"
      }
    ],
    messages: [{ role: "user", content: "Save a picture of a cat to my desktop." }]
  });

  console.log(response);
  ```

  ```csharp C#
  var client = new AnthropicClient();

  var parameters = new MessageCreateParams
  {
      Model = Model.ClaudeOpus5,
      MaxTokens = 1024,
      Tools =
      [
          new ComputerToolset20260801(),
          new ToolTextEditor20250728(),
          new ToolBash20250124(),
      ],
      Messages =
      [
          new MessageParam
          {
              Role = Role.User,
              Content = "Save a picture of a cat to my desktop.",
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
  	MaxTokens: 1024,
  	Tools: []anthropic.ToolUnionParam{
  		{OfComputerToolset20260801: &anthropic.ComputerToolset20260801Param{}},
  		{OfTextEditor20250728: &anthropic.ToolTextEditor20250728Param{}},
  		{OfBashTool20250124: &anthropic.ToolBash20250124Param{}},
  	},
  	Messages: []anthropic.MessageParam{
  		anthropic.NewUserMessage(anthropic.NewTextBlock("Save a picture of a cat to my desktop.")),
  	},
  })
  if err != nil {
  	log.Fatal(err)
  }
  fmt.Println(response.RawJSON())
  ```

  ```java Java
  import com.anthropic.models.messages.ComputerToolset20260801;
  // ...
  import com.anthropic.models.messages.ToolBash20250124;
  import com.anthropic.models.messages.ToolTextEditor20250728;

  void main() {
      AnthropicClient client = AnthropicOkHttpClient.fromEnv();

      MessageCreateParams params = MessageCreateParams.builder()
          .model(Model.CLAUDE_OPUS_5)
          .maxTokens(1024L)
          .addTool(ComputerToolset20260801.builder().build())
          .addTool(ToolTextEditor20250728.builder().build())
          .addTool(ToolBash20250124.builder().build())
          .addUserMessage("Save a picture of a cat to my desktop.")
          .build();

      Message response = client.messages().create(params);
      IO.println(response);
  }
  ```

  ```php PHP
  $client = new Client();

  $response = $client->messages->create(
      maxTokens: 1024,
      messages: [
          ['role' => 'user', 'content' => 'Save a picture of a cat to my desktop.'],
      ],
      model: 'claude-opus-5',
      tools: [
          ['type' => 'computer_toolset_20260801'],
          [
              'type' => 'text_editor_20250728',
              'name' => 'str_replace_based_edit_tool',
          ],
          [
              'type' => 'bash_20250124',
              'name' => 'bash',
          ],
      ],
  );

  echo $response;
  ```

  ```ruby Ruby
  client = Anthropic::Client.new

  response = client.messages.create(
    model: "claude-opus-5",
    max_tokens: 1024,
    tools: [
      { type: "computer_toolset_20260801" },
      {
        type: "text_editor_20250728",
        name: "str_replace_based_edit_tool"
      },
      {
        type: "bash_20250124",
        name: "bash"
      }
    ],
    messages: [
      { role: "user", content: "Save a picture of a cat to my desktop." }
    ]
  )

  puts response
  ```

When Claude acts on the desktop, the response has a `stop_reason` of `tool_use` and contains one or more member `tool_use` blocks, each naming a member tool and carrying `"toolset_name": "computer"`. Partway through this task, after Claude has seen a screenshot of the desktop, a response might look like this:

```json Output
{
  "id": "msg_01UZ3bXcQH8mTqNhVfL9eK2p",
  "type": "message",
  "role": "assistant",
  "model": "claude-opus-5",
  "content": [
    {
      "type": "text",
      "text": "I'll open the web browser to find a picture of a cat."
    },
    {
      "type": "tool_use",
      "id": "toolu_01WkoTUvSHDzTBu2xnGk8Ep8",
      "name": "left_click",
      "toolset_name": "computer",
      "input": { "coordinate": [512, 742] }
    },
    {
      "type": "tool_use",
      "id": "toolu_017nJn3RgSCkTMwuZDb4uUov",
      "name": "screenshot",
      "toolset_name": "computer",
      "input": {}
    }
  ],
  "stop_reason": "tool_use",
  "stop_sequence": null
}
```

Your application runs each call in order in your own environment, returns one `tool_result` block per `tool_use` block, and calls the API again; [How computer use works](https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool#how-computer-use-works) describes that loop, and the rest of this page shows how to implement it.

***
