---
title: "Azure.ResourceManager.CosmosDB (.NET)"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-dotnet/skills/azure-resource-manager-cosmosdb-dotnet/SKILL.md"
sourceRel: ".github/plugins/azure-sdk-dotnet/skills/azure-resource-manager-cosmosdb-dotnet/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-dotnet/skills/azure-resource-manager-cosmosdb-dotnet/SKILL.md"
sourceSha256: "d44c0e53406799c89d0bb75def5eb150b21447405aa8df6c5596e577678a7f3f"
pageSha256: "d44c0e53406799c89d0bb75def5eb150b21447405aa8df6c5596e577678a7f3f"
contentMode: "local-full"
zh: ""
---

# Azure.ResourceManager.CosmosDB (.NET)

Management plane SDK for provisioning and managing Azure Cosmos DB resources via Azure Resource Manager.

> **⚠️ Management vs Data Plane**
> - **This SDK (Azure.ResourceManager.CosmosDB)**: Create accounts, databases, containers, configure throughput, manage RBAC
> - **Data Plane SDK (Microsoft.Azure.Cosmos)**: CRUD operations on documents, queries, stored procedures execution

## Installation

```bash
dotnet add package Azure.ResourceManager.CosmosDB
dotnet add package Azure.Identity
```

**Current Versions**: Stable v1.4.0, Preview v1.4.0-beta.13

## Environment Variables

```bash
