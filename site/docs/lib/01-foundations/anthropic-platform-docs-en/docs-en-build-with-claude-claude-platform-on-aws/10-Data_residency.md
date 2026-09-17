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
sourceRel: "docs/en/build-with-claude/claude-platform-on-aws.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/build-with-claude/claude-platform-on-aws.md"
sourceSha256: "0ff935251ef5bee607ae9d604d1c665269af87e8eda7c66c98362c1d5906779c"
pageSha256: "4f77c658f8387d7dc6ca0cdec18d931a880dadb9e4ec7c7bfdc7dfd65b11edb2"
contentMode: "local-full"
zh: ""
---

## Data residency

Claude Platform on AWS supports the following inference geographies:

* **US:** Inference stays within US data centers. A 1.1x pricing multiplier applies.
* **Global:** Inference can route to any Anthropic-operated data center worldwide. Standard pricing applies.

  The AWS region your workspace is bound to controls which gateway endpoint you call and where AWS-side resources (IAM, CloudTrail, billing) are scoped. It does not pin where model inference runs. To pin inference to a specific geography, set `inference_geo` on each request or configure a workspace default.

Set the inference geography per request with the `inference_geo` parameter:

  The `inference_geo` parameter is supported on Claude 4.6 and later models. Requests with `inference_geo` on Claude Opus 4.5, Claude Sonnet 4.5, or Claude Haiku 4.5 return a 400 error. See [Data residency](https://platform.claude.com/docs/en/manage-claude/data-residency) for model availability details.

  ```bash cURL
  # Replace us-west-2 with your AWS region in both the URL and --aws-sigv4
  # Omit the x-amz-security-token header if you use long-term IAM user credentials
  curl "https://aws-external-anthropic.us-west-2.api.aws/v1/messages" \
    --aws-sigv4 "aws:amz:us-west-2:aws-external-anthropic" \
    --user "$AWS_ACCESS_KEY_ID:$AWS_SECRET_ACCESS_KEY" \
    -H "x-amz-security-token: $AWS_SESSION_TOKEN" \
    -H "content-type: application/json" \
    -H "anthropic-version: 2023-06-01" \
    -H "anthropic-workspace-id: $ANTHROPIC_AWS_WORKSPACE_ID" \
    -d '{
      "model": "claude-sonnet-5",
      "max_tokens": 1024,
      "inference_geo": "us",
      "messages": [
        {"role": "user", "content": "Hello!"}
      ]
    }'
  ```

  ```bash CLI
  # Replace us-west-2 with your AWS region
  # ant reads ANTHROPIC_API_KEY and sends it as x-api-key. Generate a key in the
  # AWS Console (see API key authentication).
  export ANTHROPIC_API_KEY="YOUR_AWS_API_KEY"

  ant messages create \
    --base-url https://aws-external-anthropic.us-west-2.api.aws \
    --workspace-id "$ANTHROPIC_AWS_WORKSPACE_ID" \
    --model claude-sonnet-5 \
    --max-tokens 1024 \
    --inference-geo us \
    --message '{role: user, content: "Hello!"}' \
    --transform content
  ```

  ```python Python
  from anthropic import AnthropicAWS

  client = AnthropicAWS()
  message = client.messages.create(
      model="claude-sonnet-5",
      max_tokens=1024,
      inference_geo="us",
      messages=[{"role": "user", "content": "Hello!"}],
  )
  print(message)
  ```

  ```typescript TypeScript
  import AnthropicAws from "@anthropic-ai/aws-sdk";
  const client = new AnthropicAws();
  const message = await client.messages.create({
    model: "claude-sonnet-5",
    max_tokens: 1024,
    inference_geo: "us",
    messages: [{ role: "user", content: "Hello!" }]
  });
  console.log(message);
  ```

  ```csharp C#
  using Anthropic;
  using Anthropic.Aws;

  var client = new AnthropicAwsClient();

  var message = await client.Messages.Create(new()
  {
      Model = Model.ClaudeSonnet5,
      MaxTokens = 1024,
      InferenceGeo = "us",
      Messages = [new() { Role = Role.User, Content = "Hello!" }]
  });

  Console.WriteLine(message);
  ```

  ```go Go
  client, err := anthropicaws.NewClient(context.Background(), anthropicaws.ClientConfig{})
  if err != nil {
  	panic(err)
  }

  message, err := client.Messages.New(context.Background(), anthropic.MessageNewParams{
  	Model:        anthropic.ModelClaudeSonnet5,
  	MaxTokens:    1024,
  	InferenceGeo: anthropic.String("us"),
  	Messages: []anthropic.MessageParam{
  		anthropic.NewUserMessage(anthropic.NewTextBlock("Hello!")),
  	},
  })
  if err != nil {
  	panic(err)
  }

  fmt.Println(message)
  ```

  ```java Java
  import com.anthropic.aws.backends.AwsBackend;
  import com.anthropic.client.AnthropicClient;
  import com.anthropic.client.okhttp.AnthropicOkHttpClient;
  import com.anthropic.models.messages.Message;
  import com.anthropic.models.messages.MessageCreateParams;
  import com.anthropic.models.messages.Model;

  void main() {
      AnthropicClient client = AnthropicOkHttpClient.builder()
          .backend(AwsBackend.fromEnv())
          .build();

      Message message = client.messages().create(
          MessageCreateParams.builder()
              .model(Model.CLAUDE_SONNET_5)
              .maxTokens(1024)
              .inferenceGeo("us")
              .addUserMessage("Hello!")
              .build()
      );

      IO.println(message);
  }
  ```

  ```php PHP
  use Anthropic\Aws\Client;

  $client = new Client();

  $message = $client->messages->create(
      model: 'claude-sonnet-5',
      maxTokens: 1024,
      inferenceGeo: 'us',
      messages: [['role' => 'user', 'content' => 'Hello!']],
  );

  echo $message;
  ```

  ```ruby Ruby
  require "anthropic"

  client = Anthropic::AWSClient.new

  message = client.messages.create(
    model: "claude-sonnet-5",
    max_tokens: 1024,
    inference_geo: "us",
    messages: [{ role: "user", content: "Hello!" }]
  )

  puts message
  ```

If you omit `inference_geo`, the request uses the workspace's `default_inference_geo` if one is configured, otherwise `global`.

Workspace-level inference geography controls (`allowed_inference_geos` and `default_inference_geo`) are also available on Claude Platform on AWS. See [Workspace-level restrictions](https://platform.claude.com/docs/en/manage-claude/data-residency#workspace-level-restrictions).
