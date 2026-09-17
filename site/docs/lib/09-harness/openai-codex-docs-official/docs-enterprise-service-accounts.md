---
title: "Service accounts"
sourceId: "09-harness/openai-codex-docs-official"
sourceTitle: "openai-codex-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://learn.chatgpt.com/docs"
entryUrl: "https://learn.chatgpt.com/docs"
sourceRel: "docs/enterprise/service-accounts.md"
rawUrl: "/raw/09-harness/openai-codex-docs-official/docs/enterprise/service-accounts.md"
sourceSha256: "2418e02ccae67c129d348312333fff0b2e493e93295bb8e73f971e1677848d94"
pageSha256: "2418e02ccae67c129d348312333fff0b2e493e93295bb8e73f971e1677848d94"
contentMode: "local-full"
zh: ""
---

# Service accounts

> For the complete documentation index, see [llms.txt](https://learn.chatgpt.com/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

Service accounts let you run and scale headless Codex workflows across your organization without relying on an employee's account. Each continuous integration (CI) runner, scheduled job, or shared integration gets its own ChatGPT workspace identity, with the same groups, roles, access controls, and auditability you expect for people.

Only workspace owners and admins can create service accounts. They can let other people or groups manage an account, configure plugins, or create access tokens.

Service accounts are available only on pay-as-you-go plans.

A service account represents a non-human workspace identity. A [personal access token](https://learn.chatgpt.com/docs/enterprise/access-tokens) represents the workspace member who creates it. API Platform project service accounts and API keys use separate project access and billing.

## Create and set up a service account

This interactive walkthrough uses GitHub as an example: create an account, configure a plugin, create a token, and assign groups and roles.

1. Open [Service accounts](https://chatgpt.com/admin/service-accounts) in your workspace settings.
2. Select the plus (**+**) button and enter a descriptive name, such as `release-automation`.
3. Select **Create**.

## Connect a plugin

Configure plugins for the service account itself. It doesn't inherit the creator's plugins or connected apps.

1. Open the account's **Plugins** section and select **Add plugin**.
2. Choose a plugin and confirm that it shows as configured or enabled.

The **Configure** and **Manager** roles can set up plugins. The **User** role can't.

## Create an access token

Create a token from the service account's detail page. The token represents the service account, not the person who creates it.

1. Open the account and select **Create token** in **Access tokens**.
2. Name the token, confirm the **Codex** scope, and choose an expiration.
3. Select **Create** and save the token in your secret manager.

The full token appears only once. Workspace policies control which expirations are available.

## Assign roles and groups

A service account can receive workspace roles and join groups like a human workspace member. Assign its access directly; it doesn't inherit the creator's permissions.

To let people or groups manage the account, select **Share**, then **Add people or groups**, and assign a role:

| Shared-account role | Configure the account and its plugins | Create service-account access tokens |
| ------------------- | ------------------------------------- | ------------------------------------ |
| **User**            | No                                    | Yes                                  |
| **Configure**       | Yes                                   | No                                   |
| **Manager**         | Yes                                   | Yes                                  |

These roles apply to people managing the account. They are separate from the workspace roles and groups assigned to the service account.

**Configure** and **Manager** can enable or disable the account. Only workspace owners and admins can create, delete, or share accounts. Operators manage shared accounts while signed in to their own ChatGPT accounts.

For more about workspace permissions, see [Roles and workspace permissions](https://learn.chatgpt.com/docs/enterprise/roles-and-workspace-permissions).

## Run Codex without signing in

Service-account access tokens require Codex CLI version `0.142.0` or later. Set `CODEX_ACCESS_TOKEN` and run Codex without opening a browser:

```bash
