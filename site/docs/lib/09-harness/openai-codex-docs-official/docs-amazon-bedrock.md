---
title: "Use ChatGPT Work and Codex with Amazon Bedrock"
sourceId: "09-harness/openai-codex-docs-official"
sourceTitle: "openai-codex-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://learn.chatgpt.com/docs"
entryUrl: "https://learn.chatgpt.com/docs"
sourceRel: "docs/amazon-bedrock.md"
rawUrl: "/raw/09-harness/openai-codex-docs-official/docs/amazon-bedrock.md"
sourceSha256: "acfb6f719ba6c5e2065d1baf88bd13222d9efd7d7d74538efa156eb4bd233859"
pageSha256: "acfb6f719ba6c5e2065d1baf88bd13222d9efd7d7d74538efa156eb4bd233859"
contentMode: "local-full"
zh: ""
---

# Use ChatGPT Work and Codex with Amazon Bedrock

> For the complete documentation index, see [llms.txt](https://learn.chatgpt.com/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

Configure local ChatGPT Work and Codex surfaces to use OpenAI models available
through Amazon Bedrock. In this setup, the local client sends model requests to
Bedrock using AWS-managed authentication and access controls.

## How it works

When you configure a local ChatGPT Work or Codex surface with Amazon Bedrock as
the model provider, the OpenAI-hosted Responses API isn't in the request path.
The local client sends model requests to Amazon Bedrock, and Bedrock provides an
OpenAI-compatible Responses API implementation for supported OpenAI models.

Authentication is AWS-native. Users authenticate with a Bedrock API key or AWS
  IAM credentials. They do not use ChatGPT sign-in or `OPENAI_API_KEY` for this
  provider.

## Before you start

Make sure you have:

- Access to supported OpenAI models in Amazon Bedrock.
- An AWS Region where the selected model is available.
- Authentication for the Amazon Bedrock Mantle path configured for the AWS
  account.

## Configure the provider

Add the `amazon-bedrock` model provider for the Amazon Bedrock Mantle path to
`~/.codex/config.toml`. The ChatGPT desktop app, Codex CLI, IDE extension, and
SDK read the same local configuration layers. Supplying a model is optional.
Select a supported model explicitly when needed.

```toml
model_provider = "amazon-bedrock"
```

This guide covers the Amazon Bedrock Mantle path in supported commercial AWS
  Regions. Local ChatGPT Work and Codex surfaces don't support Bedrock Mantle
  endpoints in AWS GovCloud Regions.

## Authentication options

Local ChatGPT Work and Codex surfaces support two Bedrock authentication paths.
They check them in this order:

1. Bedrock API key.
2. AWS SDK credential chain.

### Option 1: Bedrock API key

Set the Bedrock API key in the environment the local client reads. You must
specify a Region when using API-key authentication.

```shell
