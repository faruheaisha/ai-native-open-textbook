---
title: "Cosmos DB Recipe — REFERENCE ONLY"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/services/app-service/templates/recipes/cosmos/README.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/services/app-service/templates/recipes/cosmos/README.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/services/app-service/templates/recipes/cosmos/README.md"
sourceSha256: "aa07b4c1b5c18578ed087ea84330dc173b062fac37a10efa857e2ec6e0f74c95"
pageSha256: "aa07b4c1b5c18578ed087ea84330dc173b062fac37a10efa857e2ec6e0f74c95"
contentMode: "local-full"
zh: ""
---

# Cosmos DB Recipe — REFERENCE ONLY

Adds Azure Cosmos DB (NoSQL) integration to an App Service base template.

## Overview

This recipe composes with a Web API or Web App base template to add Cosmos DB data access. It provides the IaC delta (Cosmos account, database, container, RBAC) and per-language source code using the Cosmos DB SDK.

## Integration Type

| Aspect | Value |
|--------|-------|
| **Database** | Azure Cosmos DB for NoSQL |
| **Auth** | Managed identity (DefaultAzureCredential) |
| **SDK** | Microsoft.Azure.Cosmos (.NET), @azure/cosmos (Node.js), azure-cosmos (Python) |
| **Hosting** | App Service (from base template) |
| **Local Auth** | Disabled (`disableLocalAuth: true`) — RBAC-only |

## Composition Steps
