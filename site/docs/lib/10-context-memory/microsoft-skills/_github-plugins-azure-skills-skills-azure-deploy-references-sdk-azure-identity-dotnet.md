---
title: "Authentication — .NET SDK Quick Reference"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-deploy/references/sdk/azure-identity-dotnet.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-deploy/references/sdk/azure-identity-dotnet.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-deploy/references/sdk/azure-identity-dotnet.md"
sourceSha256: "8d8b336295d96917a606c9aa0bfc2f2d5c6353973063b62b0aa632925d0e1694"
pageSha256: "8d8b336295d96917a606c9aa0bfc2f2d5c6353973063b62b0aa632925d0e1694"
contentMode: "local-full"
zh: ""
---

# Authentication — .NET SDK Quick Reference

> Condensed from **azure-identity-dotnet**. Full patterns (ASP.NET DI,
> sovereign clouds, brokered auth, certificate credentials)
> in the **azure-identity-dotnet** plugin skill if installed.

## Install
dotnet add package Azure.Identity

## Quick Start

> **Auth:** `DefaultAzureCredential` is for local development. See [auth-best-practices.md](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-deploy/references/auth-best-practices.md) for production patterns.

```csharp
using Azure.Identity;
var credential = new DefaultAzureCredential();
```

## Best Practices
- Use DefaultAzureCredential for **local development only**. In production, use deterministic credentials (ManagedIdentityCredential) — see [auth-best-practices.md](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-deploy/references/auth-best-practices.md)
- Reuse credential instances — single instance shared across clients
- Configure retry policies for credential operations
- Enable logging with AzureEventSourceListener for debugging auth issues
