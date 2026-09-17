---
title: "Configuring workload identity federation for Microsoft Azure"
sourceId: "01-foundations/openai-api-docs-en"
sourceTitle: "OpenAI API 文档（英文）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://developers.openai.com/api/docs"
entryUrl: "https://developers.openai.com/api/docs"
sourceRel: "api/docs/guides/workload-identity-federation/microsoft-azure.md"
rawUrl: "/raw/01-foundations/openai-api-docs-en/api/docs/guides/workload-identity-federation/microsoft-azure.md"
sourceSha256: "e89237a1a303a60be853e3d5995e75eef85af11c8967fbf1a4e97924bd55ee9f"
pageSha256: "e89237a1a303a60be853e3d5995e75eef85af11c8967fbf1a4e97924bd55ee9f"
contentMode: "local-full"
zh: ""
---

# Configuring workload identity federation for Microsoft Azure

> For the complete documentation index, see [llms.txt](https://developers.openai.com/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

Use Microsoft Azure as a Workload Identity Provider in either of these scenarios:

- **Azure managed identity:** Exchange a Microsoft Entra ID access token issued for a managed identity for a short-lived OpenAI access token.
- **AKS:** Exchange a projected Azure Kubernetes Service (AKS) service account token for a short-lived OpenAI access token.

For Codex, use this page to get and inspect the Microsoft Entra token. Then [configure Codex workload identity](https://developers.openai.com/codex/enterprise/workload-identity) to write that token to a file and point Codex to it. The service-account mapping and SDK examples on this page apply to the OpenAI API.

## Azure managed identity

Azure managed identities let Azure-hosted workloads request Microsoft Entra tokens without storing long-lived secrets. In OpenAI workload identity federation, the managed identity token is the subject token that OpenAI validates before issuing an OpenAI access token.

### Setting up Azure managed identity

Create or use a Microsoft Entra application registration that represents the token audience OpenAI should trust. Configure its **Application ID URI**; this URI is the `resource` value your workload requests from Azure Instance Metadata Service (IMDS), and it appears as the `aud` claim in the issued token. For the Microsoft setup steps, see the Microsoft Entra guide to [create a new Entra ID application and service principal](https://learn.microsoft.com/en-au/entra/identity-platform/howto-create-service-principal-portal#register-an-application-with-azure-ad-and-create-a-service-principal).

The Application ID URI configured in Microsoft Entra ID, the IMDS `resource`
  parameter, the resulting token's `aud` claim, and the OpenAI Workload Identity
  Provider audience must all match.

[Create](https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/manage-user-assigned-managed-identities-azure-portal?pivots=identity-mi-methods-azp) a managed identity, then [assign](https://docs.microsoft.com/azure/active-directory/managed-identities-azure-resources/qs-configure-portal-windows-vm#user-assigned-managed-identity) that managed identity to the Azure resource running your application, such as a virtual machine. The resource must be able to call IMDS at runtime. For Azure setup details, see Microsoft's [managed identities overview](https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/overview) and the relevant Azure resource documentation for assigning the identity.

### Getting an Azure managed identity token

From the Azure resource with the managed identity assigned, request a token from IMDS with the Application ID URI as the `resource` parameter. This token is the subject token that OpenAI exchanges for an OpenAI-issued access token.

```bash
