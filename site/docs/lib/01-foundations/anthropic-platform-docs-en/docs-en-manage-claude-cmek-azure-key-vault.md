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
sourceRel: "docs/en/manage-claude/cmek-azure-key-vault.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/manage-claude/cmek-azure-key-vault.md"
sourceSha256: "b4ea1ccd17fa1f3caab264bc9b8ba6a7d2a46357cec870e109f3dd7f4ecfdf9d"
pageSha256: "b4ea1ccd17fa1f3caab264bc9b8ba6a7d2a46357cec870e109f3dd7f4ecfdf9d"
contentMode: "local-full"
zh: ""
---

# Anthropic 平台文档（英文全量）

```bash Configure with the /claude-api skill in Claude Code
claude "/claude-api help me configure a customer-managed encryption key with Azure Key Vault"
```

This guide walks through configuring an Azure Key Vault key as a [customer-managed encryption key (CMEK)](https://platform.claude.com/docs/en/manage-claude/cmek) for your Anthropic organization.

  Enabling CMEK is permanent. If your Key Vault key is deleted or disabled, Anthropic cannot recover the data encrypted under it. Review the [warnings and limitations](https://platform.claude.com/docs/en/manage-claude/cmek) before you start.

## Prerequisites

* An Azure Key Vault with **RBAC authorization enabled** (`enableRbacAuthorization: true`) and **public network access allowed**. Anthropic calls your vault over the public data-plane endpoint; private endpoints are not supported.
* **Purge protection enabled** (`enablePurgeProtection: true`) on the vault. Without it, a deleted key can be permanently purged during the soft-delete retention window, causing irreversible loss of your CMEK-protected data. Purge protection cannot be disabled once enabled.
* Permissions to create keys in the vault and to assign RBAC roles on it.
* Permissions to create service principals in your Entra tenant (`Application Administrator`, `Cloud Application Administrator`, or an equivalent custom role).
* An Anthropic Admin API key for your organization.
* The [`az` CLI](https://learn.microsoft.com/en-us/cli/azure/?view=azure-cli-latest) installed and authenticated.
* **Diagnostic Settings** configured on the vault to route the `AuditEvent` log category to Log Analytics, a storage account, or an event hub. Azure Key Vault does not emit data-plane audit logs (such as `KeyWrap`, `KeyUnwrap`, and `KeyGet`) by default, so without this you get no audit trail for Anthropic's key operations.

## Anthropic app information

To have Anthropic use your encryption key, you must configure an Anthropic multitenant application ID and display name. Those values are:

| Field                          | Value                                  |
| ------------------------------ | -------------------------------------- |
| Multitenant app client ID (US) | `8635ae1a-3e5d-44e8-a4ed-e0f614466f87` |
| App display name               | `anthropic-cmek-client-us`             |

  Use only this published client ID and display name. Never trust an identifier provided over email, chat, or any onboarding channel.

## Encryption key setup

    This creates a service principal in your Entra tenant for Anthropic's CMEK client application. The application requests no Microsoft Graph permissions; it exists solely as a federation target for Key Vault data-plane access.

    ```bash
    az ad sp create --id 8635ae1a-3e5d-44e8-a4ed-e0f614466f87
    ```

    From the output, capture the `id` field. This is the service principal's object ID in your tenant, which you use when you assign the RBAC role.

    ```json
    \{
      "appId": "8635ae1a-3e5d-44e8-a4ed-e0f614466f87",
      "displayName": "anthropic-cmek-client-us",
