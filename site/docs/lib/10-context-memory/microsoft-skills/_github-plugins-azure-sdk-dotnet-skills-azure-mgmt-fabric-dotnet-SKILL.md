---
title: "Azure.ResourceManager.Fabric (.NET)"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-dotnet/skills/azure-mgmt-fabric-dotnet/SKILL.md"
sourceRel: ".github/plugins/azure-sdk-dotnet/skills/azure-mgmt-fabric-dotnet/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-dotnet/skills/azure-mgmt-fabric-dotnet/SKILL.md"
sourceSha256: "88fcd541f96a973d546da7f0d06db97df5cc9b8e1a99a4790458a6ef2abbf74d"
pageSha256: "88fcd541f96a973d546da7f0d06db97df5cc9b8e1a99a4790458a6ef2abbf74d"
contentMode: "local-full"
zh: ""
---

# Azure.ResourceManager.Fabric (.NET)

Management plane SDK for provisioning and managing Microsoft Fabric capacity resources via Azure Resource Manager.

> **Management Plane Only**
> This SDK manages Fabric *capacities* (compute resources). For working with Fabric workspaces, lakehouses, warehouses, and data items, use the Microsoft Fabric REST API or data plane SDKs.

## Installation

```bash
dotnet add package Azure.ResourceManager.Fabric
dotnet add package Azure.Identity
```

**Current Version**: 1.0.0 (GA - September 2025)  
**API Version**: 2023-11-01  
**Target Frameworks**: .NET 8.0, .NET Standard 2.0

## Environment Variables

```bash
