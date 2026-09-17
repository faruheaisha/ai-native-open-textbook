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
sourceRel: "docs/en/manage-claude/wif-providers/azure.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/manage-claude/wif-providers/azure.md"
sourceSha256: "952202dd6887403d9a88e6fd385834a36f495c73cd33536fe2d20c2acfccfa6a"
pageSha256: "1a492d175c4e2297c53b8903950997cb46348bfb2c086ac86f8179d231ffadfd"
contentMode: "local-full"
zh: ""
---

## Register the token audience

Microsoft Entra ID only issues a token when the requested audience exists in your tenant as an app registration with a service principal. Create one app registration to represent the Claude API audience; every workload in the tenant can request tokens for it. Without this registration, token requests fail with a "resource not found in tenant" error (`AADSTS50001` from the managed identity endpoints, `AADSTS500011` from the Entra token endpoint).

```bash
# Create the app registration that represents the Claude API audience.
APP_ID=$(az ad app create --display-name claude-api-federation --query appId -o tsv)

# Request v2.0 access tokens and set the api://<APP_ID> identifier URI.
az ad app update --id "$APP_ID" \
  --identifier-uris "api://$APP_ID" \
  --set api.requestedAccessTokenVersion=2

# Create the service principal so the audience resolves in your tenant.
az ad sp create --id "$APP_ID"
```

  Use the `api://<APP_ID>` identifier URI format. Entra restricts `https://` identifier URIs to verified domains of your own tenant, so a URI such as `https://api.anthropic.com` cannot be registered in most tenants; `api://<APP_ID>` is accepted everywhere. With `requestedAccessTokenVersion: 2`, tokens for this audience are v2.0, which is what this guide assumes. If you reuse an existing registration that emits v1.0 tokens, see [If your tokens are v1.0](https://platform.claude.com/docs/en/manage-claude/wif-providers/azure#if-your-tokens-are-v1-0).
