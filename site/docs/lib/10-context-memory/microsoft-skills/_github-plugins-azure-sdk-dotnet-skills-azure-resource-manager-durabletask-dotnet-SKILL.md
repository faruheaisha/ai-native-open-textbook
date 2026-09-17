---
title: "Azure.ResourceManager.DurableTask (.NET)"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-dotnet/skills/azure-resource-manager-durabletask-dotnet/SKILL.md"
sourceRel: ".github/plugins/azure-sdk-dotnet/skills/azure-resource-manager-durabletask-dotnet/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-dotnet/skills/azure-resource-manager-durabletask-dotnet/SKILL.md"
sourceSha256: "9e993db6caaba2620cf6232aa350619634ad104e61473f28e640091d39d8675b"
pageSha256: "9e993db6caaba2620cf6232aa350619634ad104e61473f28e640091d39d8675b"
contentMode: "local-full"
zh: ""
---

# Azure.ResourceManager.DurableTask (.NET)

Management plane SDK for provisioning and managing Azure Durable Task Scheduler resources via Azure Resource Manager.

> **⚠️ Management vs Data Plane**
> - **This SDK (Azure.ResourceManager.DurableTask)**: Create schedulers, task hubs, configure retention policies
> - **Data Plane SDK (Microsoft.DurableTask.Client.AzureManaged)**: Start orchestrations, query instances, send events

## Installation

```bash
dotnet add package Azure.ResourceManager.DurableTask
dotnet add package Azure.Identity
```

**Current Versions**: Stable v1.0.0 (2025-11-03), Preview v1.0.0-beta.1 (2025-04-24)
**API Version**: 2025-11-01

## Environment Variables

```bash
