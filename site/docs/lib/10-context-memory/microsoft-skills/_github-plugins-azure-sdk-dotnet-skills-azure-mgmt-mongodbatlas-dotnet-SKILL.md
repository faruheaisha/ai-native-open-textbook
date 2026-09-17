---
title: "Azure.ResourceManager.MongoDBAtlas SDK"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-dotnet/skills/azure-mgmt-mongodbatlas-dotnet/SKILL.md"
sourceRel: ".github/plugins/azure-sdk-dotnet/skills/azure-mgmt-mongodbatlas-dotnet/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-dotnet/skills/azure-mgmt-mongodbatlas-dotnet/SKILL.md"
sourceSha256: "e5ba18cfeb3a559ed87db8927938c2f41dabd4349c35d15a352cf81d1d864fa2"
pageSha256: "e5ba18cfeb3a559ed87db8927938c2f41dabd4349c35d15a352cf81d1d864fa2"
contentMode: "local-full"
zh: ""
---

# Azure.ResourceManager.MongoDBAtlas SDK

Manage MongoDB Atlas Organizations as Azure ARM resources with unified billing through Azure Marketplace.

## Package Information

| Property | Value |
|----------|-------|
| Package | `Azure.ResourceManager.MongoDBAtlas` |
| Version | 1.0.0 (GA) |
| API Version | 2025-06-01 |
| Resource Type | `MongoDB.Atlas/organizations` |
| NuGet | [Azure.ResourceManager.MongoDBAtlas](https://www.nuget.org/packages/Azure.ResourceManager.MongoDBAtlas) |

## Installation

```bash
dotnet add package Azure.ResourceManager.MongoDBAtlas
dotnet add package Azure.Identity
dotnet add package Azure.ResourceManager
```

## Important Scope Limitation

This SDK manages **MongoDB Atlas Organizations as Azure ARM resources** for marketplace integration. It does NOT directly manage:
- Atlas clusters
- Databases
- Collections
- Users/roles

For cluster management, use the MongoDB Atlas API directly after creating the organization.

## Environment Variables

```bash
