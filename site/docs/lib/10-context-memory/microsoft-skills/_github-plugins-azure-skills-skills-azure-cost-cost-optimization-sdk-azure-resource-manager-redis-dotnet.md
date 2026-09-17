---
title: "Redis Management — .NET SDK Quick Reference"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-cost/cost-optimization/sdk/azure-resource-manager-redis-dotnet.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-cost/cost-optimization/sdk/azure-resource-manager-redis-dotnet.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-cost/cost-optimization/sdk/azure-resource-manager-redis-dotnet.md"
sourceSha256: "c2cb5a9fd46a3cbbcbceb7c60d5f2c6f8130903054ba193c3e30f5d2420d66ae"
pageSha256: "c2cb5a9fd46a3cbbcbceb7c60d5f2c6f8130903054ba193c3e30f5d2420d66ae"
contentMode: "local-full"
zh: ""
---

# Redis Management — .NET SDK Quick Reference

> Condensed from **azure-resource-manager-redis-dotnet**. Full patterns
> (cache creation, firewall rules, access keys, geo-replication, patching)
> in the **azure-resource-manager-redis-dotnet** plugin skill if installed.

## Install
dotnet add package Azure.ResourceManager.Redis
dotnet add package Azure.Identity

## Quick Start

> **Auth:** `DefaultAzureCredential` is for local development. See [auth-best-practices.md](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-cost/cost-optimization/auth-best-practices.md) for production patterns.

```csharp
using Azure.ResourceManager;
using Azure.Identity;
var armClient = new ArmClient(new DefaultAzureCredential());
```

## Best Practices
- Use `WaitUntil.Completed` for operations that must finish before proceeding
- Use `WaitUntil.Started` when you want to poll manually or run operations in parallel
- Use DefaultAzureCredential for **local development only**. In production, use ManagedIdentityCredential — see [auth-best-practices.md](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-cost/cost-optimization/auth-best-practices.md)
- Handle `RequestFailedException` for ARM API errors
- Use `CreateOrUpdateAsync` for idempotent operations
- Navigate hierarchy via `Get*` methods (e.g., `cache.GetRedisFirewallRules()`)
- Use Premium SKU for production workloads requiring geo-replication, clustering, or persistence
- Enable TLS 1.2 minimum — set `MinimumTlsVersion = RedisTlsVersion.Tls1_2`
- Disable non-SSL port — set `EnableNonSslPort = false` for security
- Rotate keys regularly — use `RegenerateKeyAsync` and update connection strings
