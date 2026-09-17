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
pageSha256: "a5b87480fdf5277974d70ba81ae3f6d51f28ddf849f0b48ab34c64817f923782"
contentMode: "local-full"
zh: ""
---

## Authentication

Claude Platform on AWS supports two authentication methods: AWS IAM with Signature Version 4 (SigV4) request signing (primary) and API key authentication. Both use the same base URL and request format.

### SigV4 authentication

SigV4 is the enterprise-native path and integrates with your existing AWS IAM policies, roles, and auditing. Configure AWS credentials using any method supported by the [AWS default credential provider chain](https://docs.aws.amazon.com/sdkref/latest/guide/standardized-credentials.html):

* Environment variables (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_SESSION_TOKEN`)
* Shared credentials file (`~/.aws/credentials`)
* Shared config file (`~/.aws/config`) including SSO and `credential_process`
* Web identity (`AWS_WEB_IDENTITY_TOKEN_FILE` and `AWS_ROLE_ARN`) for IRSA and GitHub Actions
* ECS container credentials
* EC2 instance metadata service (IMDS)

Verify that your credentials are working:

```bash CLI
aws sts get-caller-identity
```

### API key authentication

For simpler integration paths (local development and scripts), you can authenticate with an API key instead of SigV4. Set the `ANTHROPIC_AWS_API_KEY` environment variable or pass `apiKey` to the SDK constructor.

Generate API keys in the **AWS Console** under **Claude Platform on AWS → API keys**. Choose **Generate a key**, then copy the key value. Grant the `aws-external-anthropic:CallWithBearerToken` IAM action to the principals that should be allowed to use API key authentication.

  API keys for Claude Platform on AWS are managed in the AWS Console, not the Claude Console. Keys created in the standard [Claude Console](https://platform.claude.com/) (for first-party API access) don't work with the Claude Platform on AWS endpoint.

#### Short-term API keys

For workloads that need to hand a credential to a separate process (such as an LLM gateway, a serverless function, or a tool that supports bearer-token authentication but not SigV4), generate a short-term API key from your AWS credentials instead of provisioning a long-lived key in the AWS Console.

AWS publishes token-generator libraries for [JavaScript](https://github.com/aws/token-generator-for-aws-external-anthropic-js), [Python](https://github.com/aws/token-generator-for-aws-external-anthropic-python), and [Java](https://github.com/aws/token-generator-for-aws-external-anthropic-java). Each library reads your AWS credentials through the standard provider chain and returns a time-limited token that works with the `x-api-key` header. Token lifetime defaults to 12 hours and is capped at the lesser of your requested duration, your AWS credentials' expiry, and 12 hours. See the linked repository READMEs for installation and full configuration options.

Pass the generated token to the SDK the same way you'd pass an AWS Console-generated API key:

  ```python Python
  from token_generator_for_aws_external_anthropic import TokenGenerator
  from anthropic import AnthropicAWS

  token = TokenGenerator(region="us-west-2").get_token()

  client = AnthropicAWS(api_key=token, aws_region="us-west-2")
  ```

  ```typescript TypeScript
  import { getTokenProvider } from "@aws/token-generator-for-aws-external-anthropic";
  import AnthropicAws from "@anthropic-ai/aws-sdk";

  const tokenProvider = getTokenProvider({ region: "us-west-2" });
  const token = await tokenProvider();

  const client = new AnthropicAws({ apiKey: token, awsRegion: "us-west-2" });
  ```

  ```java Java
  import software.amazon.awsexternalanthropic.TokenGenerator;
  import software.amazon.awssdk.regions.Region;
  import com.anthropic.aws.backends.AwsBackend;
  import com.anthropic.client.AnthropicClient;
  import com.anthropic.client.okhttp.AnthropicOkHttpClient;

  void main() {
      String token = TokenGenerator.builder().region(Region.US_WEST_2).build().getToken();

      AnthropicClient client = AnthropicOkHttpClient.builder()
          .backend(AwsBackend.builder()
              .apiKey(token)
              .region(Region.US_WEST_2)
              .workspaceId(System.getenv("ANTHROPIC_AWS_WORKSPACE_ID"))
              .build())
          .build();
  }
  ```

If you can generate the token locally, your process already has SigV4 credentials, and SigV4 authentication is usually the simpler choice. Use short-term keys when the process making API calls is separate from the process that holds AWS credentials.

The SDK does not refresh short-term keys automatically. When a token expires, generate a new one and construct a new client. The principal that uses the token still needs the `aws-external-anthropic:CallWithBearerToken` IAM action.

### Credential precedence

The platform-specific client resolves authentication in the following order. Argument names vary by language convention: TypeScript and PHP use camelCase as shown, Python and Ruby use snake\_case, Go uses PascalCase with capitalized acronyms, and C# and Java use the language's property or builder idioms.

1. `apiKey` constructor argument → `x-api-key` header
2. `awsAccessKey` + `awsSecretAccessKey` constructor arguments → AWS SigV4
3. `awsProfile` constructor argument → AWS SigV4 with named profile
4. `ANTHROPIC_AWS_API_KEY` environment variable → `x-api-key` header
5. Default AWS credential provider chain → AWS SigV4

### Region resolution

The client reads `AWS_REGION` from the environment if `aws_region`/`awsRegion` is not passed to the constructor, falling back to `AWS_DEFAULT_REGION` for compatibility with the standard AWS SDKs. Region is required and there is no default: the `AnthropicAWS`/`AnthropicAws` client raises an error if neither the constructor argument nor an environment variable is set.
