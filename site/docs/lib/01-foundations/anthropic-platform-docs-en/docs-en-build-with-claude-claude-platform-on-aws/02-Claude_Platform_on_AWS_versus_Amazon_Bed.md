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
pageSha256: "ae379a7644db3e7ea47a3dfbf906d1c3f797df785c5087f0ab666589c45af4e7"
contentMode: "local-full"
zh: ""
---

## Claude Platform on AWS versus Amazon Bedrock

Both offerings let you use Claude through AWS, but they differ in architecture, API surface, and feature availability.

| Aspect                       | Claude Platform on AWS                                                                                                                                                      | [Claude in Amazon Bedrock](https://platform.claude.com/docs/en/build-with-claude/claude-in-amazon-bedrock) | [Amazon Bedrock (Opus 4.6 and earlier)](https://platform.claude.com/docs/en/build-with-claude/claude-on-amazon-bedrock-legacy) |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| **Who operates the stack**   | Anthropic                                                                                                                                                                   | AWS                                                                                                        | AWS                                                                                                                            |
| **API surface**              | Claude API (`/v1/\{endpoint\}`)                                                                                                                                               | Messages API at `/anthropic/v1/messages`                                                                   | Bedrock Converse / InvokeModel                                                                                                 |
| **Feature availability**     | Typically same-day as Claude API (see [feature limitations](https://platform.claude.com/docs/en/build-with-claude/claude-platform-on-aws#features-not-supported))           | Per Amazon Bedrock release schedule                                                                        | Per Amazon Bedrock release schedule                                                                                            |
| **Agent Skills**             | Available (beta)                                                                                                                                                            | Not available (requires code execution)                                                                    | Not available                                                                                                                  |
| **Beta features**            | Pass through with `anthropic-beta` headers (see [feature limitations](https://platform.claude.com/docs/en/build-with-claude/claude-platform-on-aws#features-not-supported)) | `anthropic-beta` header not supported                                                                      | `anthropic-beta` header not supported                                                                                          |
| **Authentication**           | AWS IAM / SigV4 or API key                                                                                                                                                  | AWS IAM / SigV4                                                                                            | AWS IAM / SigV4 or bearer token                                                                                                |
| **Billing**                  | AWS Marketplace                                                                                                                                                             | AWS (native service)                                                                                       | AWS (native service)                                                                                                           |
| **Base URL**                 | `aws-external-anthropic.\{region\}.api.aws`                                                                                                                                   | `bedrock-mantle.\{region\}.api.aws`                                                                          | `bedrock-runtime.\{region\}.amazonaws.com`                                                                                       |
| **SDK client**               | Platform-specific client class (for example, `AnthropicAWS` in Python), in beta                                                                                             | `AnthropicBedrockMantle`                                                                                   | `AnthropicBedrock` / Bedrock SDK                                                                                               |
| **Console**                  | Claude Console (`platform.claude.com`, access through the AWS Console)                                                                                                      | Bedrock Console                                                                                            | Bedrock Console                                                                                                                |
| **Rate limits and quotas**   | Managed by Anthropic                                                                                                                                                        | Managed by AWS                                                                                             | Managed by AWS                                                                                                                 |
| **Inference data processor** | Anthropic                                                                                                                                                                   | AWS                                                                                                        | AWS                                                                                                                            |

If you need AWS-operated Claude, see [Claude in Amazon Bedrock](https://platform.claude.com/docs/en/build-with-claude/claude-in-amazon-bedrock). Claude Platform on AWS uses a separate capacity pool from both the first-party Claude API and Amazon Bedrock. You can run workloads on more than one platform and fail over between them.

[AWS PrivateLink](https://docs.aws.amazon.com/vpc/latest/privatelink/what-is-privatelink.html) is supported for connecting your VPC to the Claude Platform on AWS endpoint.

**When to choose Bedrock:** Organizations in regulated industries that require FedRAMP High, IL4, IL5, or HIPAA-ready compliance, or that need AWS to be the sole data processor, should use [Claude in Amazon Bedrock](https://platform.claude.com/docs/en/build-with-claude/claude-in-amazon-bedrock). Bedrock runs entirely on AWS-controlled infrastructure with AWS as the operating party.

**Which offering are you using?** Claude is available through several distinct products:

* **Claude Platform on AWS** (this page): The Claude API platform billed through AWS Marketplace. Managed in the [Claude Console](https://platform.claude.com/docs/en/build-with-claude/claude-platform-on-aws#using-the-claude-console) and the AWS Console.
* **[Claude in Amazon Bedrock](https://platform.claude.com/docs/en/build-with-claude/claude-in-amazon-bedrock):** An AWS-native service. Managed in the Amazon Bedrock console and billed as AWS service usage.
* **Claude Enterprise procured through AWS Marketplace:** A [claude.ai](https://claude.ai) plan (the Claude chat product), not an API platform. Managed at claude.ai, and its account and migration behavior differ from what this page describes. See the [Claude Help Center](https://support.claude.com).
* **Direct Anthropic accounts:** The first-party Claude API and claude.ai plans billed by Anthropic. Managed in the Claude Console and at claude.ai.
