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
sourceRel: "docs/en/agents-and-tools/tool-use/bash-tool.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/agents-and-tools/tool-use/bash-tool.md"
sourceSha256: "d63bfc6cf76c6d6dd8a08c8fa3617a2fba9c13f554b11f823fc3892abe8b93e2"
pageSha256: "769c6161f274fcec222545d72fc708fe3511bc0517655f9ec3a35a13ee62c240"
contentMode: "local-full"
zh: ""
---

## Quick start

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
          "type": "bash_20250124",
          "name": "bash"
        }
      ],
      "messages": [
        {
          "role": "user",
          "content": "List all Python files in the current directory."
        }
      ]
    }'
  ```

  ```bash CLI
  ant messages create \
    --model claude-opus-5 \
    --max-tokens 1024 \
    --tool '{type: bash_20250124, name: bash}' \
    --message '{role: user, content: List all Python files in the current directory.}'
  ```

  ```python Python
  client = anthropic.Anthropic()

  response = client.messages.create(
      model="claude-opus-5",
      max_tokens=1024,
      tools=[{"type": "bash_20250124", "name": "bash"}],
      messages=[
          {"role": "user", "content": "List all Python files in the current directory."}
      ],
  )

  print(response)
  ```

  ```typescript TypeScript
  const client = new Anthropic();

  const response = await client.messages.create({
    model: "claude-opus-5",
    max_tokens: 1024,
    tools: [{ type: "bash_20250124", name: "bash" }],
    messages: [
      {
        role: "user",
        content: "List all Python files in the current directory."
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
          Tools = [new ToolBash20250124()],
          Messages =
          [
              new()
              {
                  Role = Role.User,
                  Content = "List all Python files in the current directory.",
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
  	Tools: []anthropic.ToolUnionParam{
  		{OfBashTool20250124: &anthropic.ToolBash20250124Param{}},
  	},
  	Messages: []anthropic.MessageParam{
  		anthropic.NewUserMessage(anthropic.NewTextBlock("List all Python files in the current directory.")),
  	},
  })
  if err != nil {
  	log.Fatal(err)
  }
  fmt.Println(response)
  ```

  ```java Java
  import com.anthropic.models.messages.ToolBash20250124;

  void main() {
      AnthropicClient client = AnthropicOkHttpClient.fromEnv();

      Message response = client.messages().create(
          MessageCreateParams.builder()
              .model(Model.CLAUDE_OPUS_5)
              .maxTokens(1024)
              .addTool(ToolBash20250124.builder().build())
              .addUserMessage("List all Python files in the current directory.")
              .build()
      );

      IO.println(response);
  }
  ```

  ```php PHP
  use Anthropic\Messages\ToolBash20250124;

  $client = new Client();

  $response = $client->messages->create(
      model: 'claude-opus-5',
      maxTokens: 1024,
      tools: [new ToolBash20250124()],
      messages: [
          ['role' => 'user', 'content' => 'List all Python files in the current directory.'],
      ],
  );

  echo $response;
  ```

  ```ruby Ruby
  client = Anthropic::Client.new

  response = client.messages.create(
    model: "claude-opus-5",
    max_tokens: 1024,
    tools: [{type: "bash_20250124", name: "bash"}],
    messages: [
      {role: "user", content: "List all Python files in the current directory."}
    ]
  )

  puts response
  ```

Claude responds with `stop_reason: "tool_use"` and a `tool_use` block that contains the command for your application to run:

```json Output
{
  "id": "msg_01XAbCDeFgHiJkLmNoPQrStU",
  "model": "claude-opus-5",
  "stop_reason": "tool_use",
  "role": "assistant",
  "content": [
    {
      "type": "text",
      "text": "I'll list all Python files in the current directory for you."
    },
    {
      "type": "tool_use",
      "id": "toolu_01A09q90qw90lq917835lq9",
      "name": "bash",
      "input": {
        "command": "ls *.py"
      }
    }
  ]
}
```

Run `input.command` in your bash session and send the output back as a `tool_result`. See [Implement the bash tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/bash-tool#implement-the-bash-tool) for the round trip.
