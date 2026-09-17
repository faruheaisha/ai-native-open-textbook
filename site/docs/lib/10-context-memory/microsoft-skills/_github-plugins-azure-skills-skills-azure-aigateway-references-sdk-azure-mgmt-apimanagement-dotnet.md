---
title: "API Management — .NET SDK Quick Reference"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-aigateway/references/sdk/azure-mgmt-apimanagement-dotnet.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-aigateway/references/sdk/azure-mgmt-apimanagement-dotnet.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-aigateway/references/sdk/azure-mgmt-apimanagement-dotnet.md"
sourceSha256: "156cd0f2ad7fc73d1f07c13ead5a46f759746c08d9f9f6612d48a73615c0f258"
pageSha256: "156cd0f2ad7fc73d1f07c13ead5a46f759746c08d9f9f6612d48a73615c0f258"
contentMode: "local-full"
zh: ""
---

# API Management — .NET SDK Quick Reference

> Condensed from **azure-mgmt-apimanagement-dotnet**. Full patterns (service
> creation, APIs, products, policies, users, gateways, backends)
> in the **azure-mgmt-apimanagement-dotnet** plugin skill if installed.

## Install
dotnet add package Azure.ResourceManager.ApiManagement
dotnet add package Azure.Identity

## Quick Start
> **Auth:** `DefaultAzureCredential` is for local development. See [auth-best-practices.md](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-aigateway/references/auth-best-practices.md) for production patterns.

```csharp
using Azure.ResourceManager;
using Azure.Identity;
var armClient = new ArmClient(new DefaultAzureCredential());
```

## Best Practices
- Use `WaitUntil.Completed` for operations that must finish before proceeding
- Use `WaitUntil.Started` for long operations like service creation (30+ min)
- Use DefaultAzureCredential for **local development only**. In production, use ManagedIdentityCredential — see [auth-best-practices.md](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-aigateway/references/auth-best-practices.md)
- Handle `RequestFailedException` for ARM API errors
- Use `CreateOrUpdateAsync` for idempotent operations
- Navigate hierarchy via `Get*` methods (e.g., `service.GetApis()`)
- Policy format — use XML format for policies; JSON is also supported
- Service creation — Developer SKU is fastest for testing (~15-30 min)
