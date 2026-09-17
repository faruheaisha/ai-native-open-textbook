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
pageSha256: "4c4a517df5edeabeb58b451b4cfc1fe0fde1b647b2116b3e47c5fc92f871c4c9"
contentMode: "local-full"
zh: ""
---

## Before making API calls

Ensure you have:

1. An active AWS account with a subscription to Claude Platform on AWS (see [Set up your account](https://platform.claude.com/docs/en/build-with-claude/claude-platform-on-aws#set-up-your-account))
2. The [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html) installed and configured
3. **Outbound web identity federation enabled** on your AWS account, a one-time setup step (see [Enable outbound web identity federation](https://platform.claude.com/docs/en/build-with-claude/claude-platform-on-aws#enable-outbound-web-identity-federation))
4. Your workspace ID (see [Obtain your workspace ID](https://platform.claude.com/docs/en/build-with-claude/claude-platform-on-aws#obtain-your-workspace-id))
5. IAM permission to call the API: the `aws-external-anthropic:CreateInference` action on your workspace, plus `aws-external-anthropic:CallWithBearerToken` if you authenticate with an API key (see [IAM policies](https://platform.claude.com/docs/en/build-with-claude/claude-platform-on-aws#iam-policies))

### Enable outbound web identity federation

The Claude Platform on AWS gateway calls `sts:GetWebIdentityToken` server-side to mint a JWT it forwards to Anthropic. This STS capability is **disabled by default** on every AWS account. Enable it once per account:

```bash CLI
aws iam enable-outbound-web-identity-federation
```

If the response is `[ERROR] (FeatureEnabled) ... already enabled`, the setting is already on for your account and you can move on. Verify and retrieve your account's issuer URL:

```bash CLI
aws iam get-outbound-web-identity-federation-info
```

  Without this step, every request returns `"Outbound web identity federation is disabled for your account"`. This is the most common setup error.

### Obtain your workspace ID

You create a workspace from the AWS Console after completing account setup (see [Set up your account](https://platform.claude.com/docs/en/build-with-claude/claude-platform-on-aws#set-up-your-account)). Workspaces are bound to a single AWS region. You can find the workspace ID in the [Claude Console](https://platform.claude.com/docs/en/build-with-claude/claude-platform-on-aws#using-the-claude-console) under **Workspaces** or in the **Workspaces** section of the AWS Console service page.

Set the `ANTHROPIC_AWS_WORKSPACE_ID` and `AWS_REGION` environment variables so the SDK clients read them automatically:

```bash CLI
export ANTHROPIC_AWS_WORKSPACE_ID='wrkspc_01AbCdEf23GhIj'
export AWS_REGION='us-west-2'  # Your workspace's AWS region
```

The region is required. The SDK client raises an error if no region is set. Pass `aws_region`/`awsRegion` to the constructor, or set `AWS_REGION` (or `AWS_DEFAULT_REGION`). All AWS commercial regions are supported.
