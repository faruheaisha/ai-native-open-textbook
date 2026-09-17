---
title: "Azure.ResourceManager.Redis (.NET)"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-dotnet/skills/azure-resource-manager-redis-dotnet/SKILL.md"
sourceRel: ".github/plugins/azure-sdk-dotnet/skills/azure-resource-manager-redis-dotnet/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-dotnet/skills/azure-resource-manager-redis-dotnet/SKILL.md"
sourceSha256: "8d60556c55795f4ccaca1907e108e98d7469ff64bea8aaa62cb9b8a19615e024"
pageSha256: "8d60556c55795f4ccaca1907e108e98d7469ff64bea8aaa62cb9b8a19615e024"
contentMode: "local-full"
zh: ""
---

# Azure.ResourceManager.Redis (.NET)

Management plane SDK for provisioning and managing Azure Cache for Redis resources via Azure Resource Manager.

> **⚠️ Management vs Data Plane**
> - **This SDK (Azure.ResourceManager.Redis)**: Create caches, configure firewall rules, manage access keys, set up geo-replication
> - **Data Plane SDK (StackExchange.Redis)**: Get/set keys, pub/sub, streams, Lua scripts

## Installation

```bash
dotnet add package Azure.ResourceManager.Redis
dotnet add package Azure.Identity
```

**Current Version**: 1.5.1 (Stable)  
**API Version**: 2024-11-01  
**Target Frameworks**: .NET 8.0, .NET Standard 2.0

## Environment Variables

```bash
