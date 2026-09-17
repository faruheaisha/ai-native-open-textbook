---
title: "Azure.ResourceManager.Sql (.NET)"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-dotnet/skills/azure-resource-manager-sql-dotnet/SKILL.md"
sourceRel: ".github/plugins/azure-sdk-dotnet/skills/azure-resource-manager-sql-dotnet/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-dotnet/skills/azure-resource-manager-sql-dotnet/SKILL.md"
sourceSha256: "95f952b72a93affd41483f7a44f1bb4043942794fc1d3ed070cde247e2cf1854"
pageSha256: "95f952b72a93affd41483f7a44f1bb4043942794fc1d3ed070cde247e2cf1854"
contentMode: "local-full"
zh: ""
---

# Azure.ResourceManager.Sql (.NET)

Management plane SDK for provisioning and managing Azure SQL resources via Azure Resource Manager.

> **⚠️ Management vs Data Plane**
> - **This SDK (Azure.ResourceManager.Sql)**: Create servers, databases, elastic pools, configure firewall rules, manage failover groups
> - **Data Plane SDK (Microsoft.Data.SqlClient)**: Execute queries, stored procedures, manage connections

## Installation

```bash
dotnet add package Azure.ResourceManager.Sql
dotnet add package Azure.Identity
```

**Current Versions**: Stable v1.3.0, Preview v1.4.0-beta.3

## Environment Variables

```bash
