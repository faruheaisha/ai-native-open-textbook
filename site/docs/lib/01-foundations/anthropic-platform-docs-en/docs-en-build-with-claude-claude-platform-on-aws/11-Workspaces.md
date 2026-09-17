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
pageSha256: "d9659969386716d9d1995a96e657cb8854725855feb9506dfac9dca4d882fa9d"
contentMode: "local-full"
zh: ""
---

## Workspaces

Inference and resource requests on Claude Platform on AWS target a workspace. You pass the workspace's ID in the `anthropic-workspace-id` header on these API calls. Workspace IDs use the tagged format `wrkspc_` followed by an alphanumeric identifier (for example, `wrkspc_01AbCdEf23GhIj`). See [Obtain your workspace ID](https://platform.claude.com/docs/en/build-with-claude/claude-platform-on-aws#obtain-your-workspace-id) if you don't have it yet.

### Workspace scoping

Workspaces are bound to a single AWS region. A workspace created in `us-west-2` can only be accessed through the `us-west-2` endpoint. Usage, quotas, cost, files, batches, and Skills all roll up per workspace, giving you per-region breakdowns in the Claude Console.

Workspaces also serve as the primary IAM resource for Claude Platform on AWS. You grant or deny access to specific workspaces through AWS IAM policies using the workspace ARN. The ARN's resource segment is the same `wrkspc_`-prefixed ID you pass in the `anthropic-workspace-id` header:

```text wrap
arn:aws:aws-external-anthropic:{region}:{account-id}:workspace/{workspace-id}
```

For example:

```text wrap
arn:aws:aws-external-anthropic:us-west-2:123456789012:workspace/wrkspc_01AbCdEf23GhIj
```

See [IAM policies](https://platform.claude.com/docs/en/build-with-claude/claude-platform-on-aws#iam-policies) for policy examples.

### Managing workspaces

Create additional workspaces, rename a workspace, or archive a workspace from the AWS Console **Workspaces** page or with the [Admin API](https://platform.claude.com/docs/en/manage-claude/admin-api) workspace endpoints. A new workspace is bound to the AWS region of the endpoint you call to create it (see [Workspace scoping](https://platform.claude.com/docs/en/build-with-claude/claude-platform-on-aws#workspace-scoping)). With the Admin role, you can also create, rename, and archive workspaces from the Claude Console **Workspaces** page.
