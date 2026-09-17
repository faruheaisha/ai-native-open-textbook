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
pageSha256: "508d77f59042ee6e97e4197f6ebcc3767a6080d9210a4cd487c64d14f93c5c44"
contentMode: "local-full"
zh: ""
---

## Migrating from Amazon Bedrock

If you currently use Claude on Bedrock, migrating to Claude Platform on AWS requires changes throughout your integration. SigV4 signing remains supported, but the signing context, base URL, API format, model IDs, SDK client and package, streaming format, request headers, and region availability all change. Claude Platform on AWS also provisions a new Anthropic organization. The following table summarizes the differences.

### What changes

The migration delta depends on which Bedrock integration you're coming from. The following table shows both the [current Bedrock integration](https://platform.claude.com/docs/en/build-with-claude/claude-in-amazon-bedrock) (Messages API at `bedrock-mantle.\{region\}.api.aws`) and the [legacy InvokeModel integration](https://platform.claude.com/docs/en/build-with-claude/claude-on-amazon-bedrock-legacy).

| Aspect                     | From [Claude in Amazon Bedrock](https://platform.claude.com/docs/en/build-with-claude/claude-in-amazon-bedrock) | From [Amazon Bedrock (Opus 4.6 and earlier)](https://platform.claude.com/docs/en/build-with-claude/claude-on-amazon-bedrock-legacy) | To Claude Platform on AWS                                                                                                                                                                                                                                          |
| -------------------------- | --------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Base URL**               | `bedrock-mantle.\{region\}.api.aws`                                                                               | `bedrock-runtime.\{region\}.amazonaws.com`                                                                                            | `aws-external-anthropic.\{region\}.api.aws`                                                                                                                                                                                                                          |
| **API format**             | Messages API at `/anthropic/v1/messages`                                                                        | Bedrock Converse / InvokeModel                                                                                                      | Claude API (`/v1/\{endpoint\}`)                                                                                                                                                                                                                                      |
| **Model IDs**              | anthropic.claude-haiku-4-5                                                                                      | anthropic.claude-haiku-4-5-20251001-v1:0(with a `us.` or `global.` inference profile prefix)                                        | claude-haiku-4-5                                                                                                                                                                                                                                                   |
| **SDK client**             | `AnthropicBedrockMantle`                                                                                        | `AnthropicBedrock` / Bedrock SDK                                                                                                    | Platform-specific client (see [Install an SDK](https://platform.claude.com/docs/en/build-with-claude/claude-platform-on-aws#install-an-sdk)), in beta                                                                                                              |
| **SDK package**            | `anthropic[bedrock]`, `@anthropic-ai/bedrock-sdk`, and others                                                   | `anthropic[bedrock]`, `@anthropic-ai/bedrock-sdk`, or AWS SDK                                                                       | `anthropic[aws]`, `@anthropic-ai/aws-sdk`, and others (see [Install an SDK](https://platform.claude.com/docs/en/build-with-claude/claude-platform-on-aws#install-an-sdk))                                                                                          |
| **SigV4 service name**     | `bedrock-mantle`                                                                                                | `bedrock`                                                                                                                           | `aws-external-anthropic`                                                                                                                                                                                                                                           |
| **Streaming format**       | SSE                                                                                                             | AWS EventStream                                                                                                                     | SSE (same as Claude API)                                                                                                                                                                                                                                           |
| **Workspace header**       | Not applicable                                                                                                  | Not applicable                                                                                                                      | `anthropic-workspace-id` required                                                                                                                                                                                                                                  |
| **Region availability**    | See [Amazon Bedrock regions](https://docs.aws.amazon.com/bedrock/latest/userguide/bedrock-regions.html)         | See [Amazon Bedrock regions](https://docs.aws.amazon.com/bedrock/latest/userguide/bedrock-regions.html)                             | All AWS commercial regions                                                                                                                                                                                                                                         |
| **Anthropic organization** | None required                                                                                                   | None required                                                                                                                       | New organization created at sign-up. Existing organizations can't be converted (see [Moving from an existing Anthropic organization](https://platform.claude.com/docs/en/build-with-claude/claude-platform-on-aws#moving-from-an-existing-anthropic-organization)) |

If you're on the current Bedrock integration, the request body format is already the Messages API. The changes are the base URL, SigV4 service name, model IDs, and adding the `anthropic-workspace-id` header. If you're on the legacy InvokeModel or Converse API, you'll also rewrite the request and response shapes to the Messages API format. See [Claude on Amazon Bedrock (Opus 4.6 and earlier)](https://platform.claude.com/docs/en/build-with-claude/claude-on-amazon-bedrock-legacy) for the request-shape mapping.

### What you gain

* Typically same-day access to new models and features (see [feature limitations](https://platform.claude.com/docs/en/build-with-claude/claude-platform-on-aws#features-not-supported))
* Agent Skills for document generation (PowerPoint, Excel, Word, PDF)
* Code execution in Anthropic's managed sandbox
* Beta features through the `anthropic-beta` header (see [feature limitations](https://platform.claude.com/docs/en/build-with-claude/claude-platform-on-aws#features-not-supported))
* Claude Console for quota visibility and usage analytics
* Direct Anthropic support
* API key authentication as an alternative to SigV4 (see [API key authentication](https://platform.claude.com/docs/en/build-with-claude/claude-platform-on-aws#api-key-authentication))

### What stays the same

* AWS IAM authentication (SigV4)
* AWS as the invoicing party. The billing channel changes from native AWS service to AWS Marketplace (see [Commercial considerations](https://platform.claude.com/docs/en/build-with-claude/claude-platform-on-aws#commercial-considerations)).
* AWS commitment retirement

### Migration pitfalls

  **Enable outbound web identity federation first.** If your AWS account has not previously used Claude Platform on AWS, you must [enable outbound web identity federation](https://platform.claude.com/docs/en/build-with-claude/claude-platform-on-aws#enable-outbound-web-identity-federation) once per account before making requests. Without this step, all requests fail with a federation error (see [Enable outbound web identity federation](https://platform.claude.com/docs/en/build-with-claude/claude-platform-on-aws#enable-outbound-web-identity-federation) for the exact error and remediation). This step is not required for Bedrock.

  **Zero Data Retention (ZDR) is opt-in on Claude Platform on AWS.** On Bedrock, AWS is the data processor and Anthropic does not retain inference inputs or outputs. Anthropic's ZDR program does not apply there. On Claude Platform on AWS, Anthropic processes inference data as an independent data processor, and ZDR follows the first-party Claude API model: it is available on request through your Anthropic account representative. Confirm ZDR enrollment before migrating production workloads that depend on data-retention guarantees.

### Commercial considerations

* **Anthropic terms of service:** Using Claude Platform on AWS requires accepting Anthropic's Commercial Terms of Service and Usage Policy. If your organization hasn't already accepted these (for example, if you've only used Claude through Bedrock), you're prompted during account setup. See [Set up your account](https://platform.claude.com/docs/en/build-with-claude/claude-platform-on-aws#set-up-your-account).
* **Discounts and private offers:** Negotiated discounts and AWS Marketplace private offers don't transfer automatically between Bedrock and Claude Platform on AWS. Work with your Anthropic account representative to set up commercial terms for Claude Platform on AWS.
