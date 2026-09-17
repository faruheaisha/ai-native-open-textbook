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
sourceRel: "docs/en/agents-and-tools/tool-use/advisor-tool.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/agents-and-tools/tool-use/advisor-tool.md"
sourceSha256: "e798608a5dfa622e88c58c702ea92d194e53b19d6d35af59857ed01dddea26ab"
pageSha256: "697cb6da282a0c63968d8a60138e1086b3d3476ff5b826d38563b87bfceb4e75"
contentMode: "local-full"
zh: ""
---

## Quick start

  The advisor tool is in beta. Include the beta header `advisor-tool-2026-03-01` in your requests.

  ```bash cURL
  curl https://api.anthropic.com/v1/messages \
    -H "x-api-key: $ANTHROPIC_API_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -H "anthropic-beta: advisor-tool-2026-03-01" \
    -H "content-type: application/json" \
    -d '{
      "model": "claude-sonnet-5",
      "max_tokens": 4096,
      "tools": [
        {
          "type": "advisor_20260301",
          "name": "advisor",
          "model": "claude-opus-5"
        }
      ],
      "messages": [{
        "role": "user",
        "content": "Build a concurrent worker pool in Go with graceful shutdown."
      }]
    }'
  ```

  ```bash CLI
  ant beta:messages create --beta advisor-tool-2026-03-01 <<'YAML'
  model: claude-sonnet-5
  max_tokens: 4096
  tools:
    - type: advisor_20260301
      name: advisor
      model: claude-opus-5
  messages:
    - role: user
      content: Build a concurrent worker pool in Go with graceful shutdown.
  YAML
  ```

  ```python Python
  client = anthropic.Anthropic()

  response = client.beta.messages.create(
      model="claude-sonnet-5",
      max_tokens=4096,
      betas=["advisor-tool-2026-03-01"],
      tools=[
          {
              "type": "advisor_20260301",
              "name": "advisor",
              "model": "claude-opus-5",
          }
      ],
      messages=[
          {
              "role": "user",
              "content": "Build a concurrent worker pool in Go with graceful shutdown.",
          }
      ],
  )

  print(response)
  ```

  ```typescript TypeScript
  const client = new Anthropic();

  const response = await client.beta.messages.create({
    model: "claude-sonnet-5",
    max_tokens: 4096,
    betas: ["advisor-tool-2026-03-01"],
    tools: [
      {
        type: "advisor_20260301",
        name: "advisor",
        model: "claude-opus-5"
      }
    ],
    messages: [
      {
        role: "user",
        content: "Build a concurrent worker pool in Go with graceful shutdown."
      }
    ]
  });

  console.log(response);
  ```

  ```csharp C#
  using Anthropic.Models.Beta.Messages;
  using Messages = Anthropic.Models.Messages;

  var client = new AnthropicClient();

  var parameters = new MessageCreateParams
  {
      Model = Messages::Model.ClaudeSonnet5,
      MaxTokens = 4096,
      Tools = new BetaToolUnion[]
      {
          new BetaAdvisorTool20260301
          {
              Model = Messages::Model.ClaudeOpus5
          }
      },
      Messages =
      [
          new BetaMessageParam
          {
              Role = Role.User,
              Content = "Build a concurrent worker pool in Go with graceful shutdown."
          }
      ],
      Betas = ["advisor-tool-2026-03-01"]
  };

  var response = await client.Beta.Messages.Create(parameters);
  Console.WriteLine(response);
  ```

  ```go Go
  client := anthropic.NewClient()

  response, err := client.Beta.Messages.New(context.TODO(), anthropic.BetaMessageNewParams{
  	Model:     anthropic.ModelClaudeSonnet5,
  	MaxTokens: 4096,
  	Tools: []anthropic.BetaToolUnionParam{
  		{OfAdvisorTool20260301: &anthropic.BetaAdvisorTool20260301Param{
  			Model: anthropic.ModelClaudeOpus5,
  		}},
  	},
  	Messages: []anthropic.BetaMessageParam{
  		anthropic.NewBetaUserMessage(anthropic.NewBetaTextBlock("Build a concurrent worker pool in Go with graceful shutdown.")),
  	},
  	Betas: []anthropic.AnthropicBeta{
  		anthropic.AnthropicBetaAdvisorTool2026_03_01,
  	},
  })
  if err != nil {
  	log.Fatal(err)
  }
  fmt.Println(response)
  ```

  ```java Java
  import com.anthropic.models.beta.messages.BetaAdvisorTool20260301;
  import com.anthropic.models.beta.messages.BetaMessage;
  import com.anthropic.models.beta.messages.MessageCreateParams;
  import com.anthropic.models.messages.Model;

  void main() {
      AnthropicClient client = AnthropicOkHttpClient.fromEnv();

      MessageCreateParams params = MessageCreateParams.builder()
          .model(Model.CLAUDE_SONNET_5)
          .maxTokens(4096L)
          .addTool(BetaAdvisorTool20260301.builder()
              .model(Model.CLAUDE_OPUS_5)
              .build())
          .addUserMessage("Build a concurrent worker pool in Go with graceful shutdown.")
          .addBeta("advisor-tool-2026-03-01")
          .build();

      BetaMessage response = client.beta().messages().create(params);
      IO.println(response);
  }
  ```

  ```php PHP
  $client = new Client();

  $response = $client->beta->messages->create(
      maxTokens: 4096,
      messages: [
          [
              'role' => 'user',
              'content' => 'Build a concurrent worker pool in Go with graceful shutdown.',
          ],
      ],
      model: 'claude-sonnet-5',
      tools: [
          [
              'type' => 'advisor_20260301',
              'name' => 'advisor',
              'model' => 'claude-opus-5',
          ],
      ],
      betas: ['advisor-tool-2026-03-01'],
  );

  echo $response;
  ```

  ```ruby Ruby
  client = Anthropic::Client.new

  response = client.beta.messages.create(
    model: "claude-sonnet-5",
    max_tokens: 4096,
    tools: [
      {
        type: "advisor_20260301",
        name: "advisor",
        model: "claude-opus-5"
      }
    ],
    messages: [
      {
        role: "user",
        content: "Build a concurrent worker pool in Go with graceful shutdown."
      }
    ],
    betas: ["advisor-tool-2026-03-01"]
  )

  puts response
  ```

The response `content` includes an `advisor_tool_result` block carrying the advisor's guidance. With `claude-opus-5` as the advisor, as in this quick start, the block's `content` field is an `advisor_redacted_result` variant (encrypted; the executor reads it server-side, but your client does not). To see the advice text directly in your response, use `claude-opus-4-8` as the advisor model instead, which returns the plaintext `advisor_result` variant. See [Result variants](https://platform.claude.com/docs/en/agents-and-tools/tool-use/advisor-tool#result-variants) for both shapes side by side and which advisor models return which, and [Model compatibility](https://platform.claude.com/docs/en/agents-and-tools/tool-use/advisor-tool#model-compatibility) for the full list of valid pairs.
