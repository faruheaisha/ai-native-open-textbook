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
pageSha256: "3e0a099451869397104bd4a24768dd87cb8f03554266a877a97f33678b834568"
contentMode: "local-full"
zh: ""
---

## Using the Claude Console

Claude Platform on AWS uses the standard Claude Console at [platform.claude.com](https://platform.claude.com). When you sign in from the AWS Console, an **Account managed by AWS** indicator appears in the bottom-left of the Claude Console sidebar and the Console scopes to your Claude Platform on AWS organization. It provides usage analytics, cost breakdowns, rate limit visibility, workspace management, and pages for managing files, Agent Skills, batch jobs, and Claude Managed Agents resources (agents, sessions, environments, credential vaults, memory stores, and webhooks).

### Signing in

Access to the Claude Console is federated through AWS IAM. See [Set up your account](https://platform.claude.com/docs/en/build-with-claude/claude-platform-on-aws#set-up-your-account) for the full first-time sign-in flow. In short:

1. Assume an IAM role with the `aws-external-anthropic:AssumeConsole` permission. See [IAM actions for Claude Platform on AWS](https://platform.claude.com/docs/en/api/claude-platform-on-aws-iam-actions#console-access).
2. Navigate to the Claude Platform on AWS page in the [AWS Console](https://console.aws.amazon.com/).
3. Choose **Open Claude Console**. The AWS Console issues a JWT and redirects you to `platform.claude.com`.
4. On first sign-in, you're prompted for an email address. Enter your work email. The platform provisions your Claude Console user just-in-time.

Two Claude Console roles are available: **Admin** and **Developer**. The Admin role grants access to all Claude Console pages and settings available for Claude Platform on AWS. The Developer role grants read access to usage, cost, rate limit, and workspace information. Contact your Anthropic account representative to assign the Admin or Developer role to a principal.

### Available pages

The **Through AWS gateway** column indicates whether the page reads and writes data through the AWS gateway (and is therefore governed by [IAM actions](https://platform.claude.com/docs/en/api/claude-platform-on-aws-iam-actions)). Pages marked **No** read organization-level metadata directly from Anthropic and bypass IAM action checks.

| Page                  | Available     | Through AWS gateway       | Notes                                                                                                                                                                                                                                                           |
| --------------------- | ------------- | ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Usage**             | Yes           | No                        | View token usage by model, workspace, and dimension. Data can take a few minutes to appear after a request.                                                                                                                                                     |
| **Cost**              | Yes           | No                        | View cost breakdowns by model and workspace. AWS Cost Explorer shows the aggregated [Claude Consumption Unit (CCU)](https://platform.claude.com/docs/en/build-with-claude/claude-platform-on-aws#billing) line item.                                            |
| **Rate limits**       | Yes           | No                        | View rate limits (read-only). Tier increases go through your Anthropic account representative; see [Rate limits and quotas](https://platform.claude.com/docs/en/build-with-claude/claude-platform-on-aws#rate-limits-and-quotas).                               |
| **Workspaces**        | Yes           | Yes (except spend limits) | View per-region workspaces. With the Admin role, you can also create, rename, and archive workspaces, and set per-workspace [spend limits](https://platform.claude.com/docs/en/build-with-claude/claude-platform-on-aws#spend-limits).                          |
| **Encryption keys**   | Yes           | Yes                       | Under **Settings → Encryption keys**, register AWS KMS keys for [CMEK](https://platform.claude.com/docs/en/manage-claude/cmek-aws-kms#claude-platform-on-aws) (Admin role). Attach a registered key to a workspace from that workspace's **Security** settings. |
| **Files**             | Yes           | Yes                       | View and manage uploaded files.                                                                                                                                                                                                                                 |
| **Skills**            | Yes           | Yes                       | View and manage Agent Skills.                                                                                                                                                                                                                                   |
| **Batches**           | Yes           | Yes                       | View and manage batch processing jobs.                                                                                                                                                                                                                          |
| **Agents**            | Yes           | Yes                       | View and manage agent definitions.                                                                                                                                                                                                                              |
| **Sessions**          | Yes           | Yes                       | View agent sessions and event history.                                                                                                                                                                                                                          |
| **Environments**      | Yes           | Yes                       | View and manage cloud sandbox configurations for sessions.                                                                                                                                                                                                      |
| **Credential vaults** | Yes           | Yes                       | View and manage credential vaults for session authentication.                                                                                                                                                                                                   |
| **Memory stores**     | Yes           | Yes                       | View and manage persistent agent memory.                                                                                                                                                                                                                        |
| **Webhooks**          | Yes           | Yes                       | View and manage webhook endpoints under **Settings → Webhooks**.                                                                                                                                                                                                |
| **API keys**          | No            | N/A                       | Manage API keys in the AWS Console (**Claude Platform on AWS → API keys**). See [API key authentication](https://platform.claude.com/docs/en/build-with-claude/claude-platform-on-aws#api-key-authentication).                                                  |
| **Members**           | No            | N/A                       | Not applicable. AWS IAM manages access.                                                                                                                                                                                                                         |
| **Billing**           | Yes (limited) | No                        | Set an organization monthly spend limit; see [Spend limits](https://platform.claude.com/docs/en/build-with-claude/claude-platform-on-aws#spend-limits). AWS Marketplace manages invoicing. View cost breakdowns on the Cost page.                               |
| **Claude Code**       | No            | N/A                       | View Claude Code usage on the Usage page.                                                                                                                                                                                                                       |

### Switching organizations

The Claude Console does not support organization switching for Claude Platform on AWS. To access a different organization, sign out and reauthenticate through the AWS Console using the IAM role for that organization's AWS account.
