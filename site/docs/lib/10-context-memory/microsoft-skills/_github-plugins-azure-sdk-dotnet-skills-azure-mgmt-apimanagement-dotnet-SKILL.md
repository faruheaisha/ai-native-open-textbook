---
title: "Azure.ResourceManager.ApiManagement (.NET)"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-dotnet/skills/azure-mgmt-apimanagement-dotnet/SKILL.md"
sourceRel: ".github/plugins/azure-sdk-dotnet/skills/azure-mgmt-apimanagement-dotnet/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-dotnet/skills/azure-mgmt-apimanagement-dotnet/SKILL.md"
sourceSha256: "71718aef3ae2343f90c9db33dee8ed9cbe146e66128c624cac069bf23d2083fe"
pageSha256: "71718aef3ae2343f90c9db33dee8ed9cbe146e66128c624cac069bf23d2083fe"
contentMode: "local-full"
zh: ""
---

# Azure.ResourceManager.ApiManagement (.NET)

Management plane SDK for provisioning and managing Azure API Management resources via Azure Resource Manager.

> **⚠️ Management vs Data Plane**
> - **This SDK (Azure.ResourceManager.ApiManagement)**: Create services, APIs, products, subscriptions, policies, users, groups
> - **Data Plane**: Direct API calls to your APIM gateway endpoints

## Installation

```bash
dotnet add package Azure.ResourceManager.ApiManagement
dotnet add package Azure.Identity
```

**Current Version**: v1.3.0

## Environment Variables

```bash
