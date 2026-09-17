---
title: "Data (Analytics) Resources"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-enterprise-infra-planner/references/resources/data-analytics.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-enterprise-infra-planner/references/resources/data-analytics.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-enterprise-infra-planner/references/resources/data-analytics.md"
sourceSha256: "6e9051f0b1968a364863a5dfae431ac6d77da6481745889399b2bb0c0f76a871"
pageSha256: "6e9051f0b1968a364863a5dfae431ac6d77da6481745889399b2bb0c0f76a871"
contentMode: "local-full"
zh: ""
---

# Data (Analytics) Resources

| Resource | ARM Type | API Version | CAF Prefix | Naming Scope | Region |
|----------|----------|-------------|------------|--------------|--------|
| Cosmos DB | `Microsoft.DocumentDB/databaseAccounts` | `2025-04-15` | `cosmos` | Global | Foundational |
| Data Factory | `Microsoft.DataFactory/factories` | `2018-06-01` | `adf` | Global | Mainstream |
| Redis Cache | `Microsoft.Cache/redis` | `2024-11-01` | `redis` | Global | Mainstream |
| Storage Account | `Microsoft.Storage/storageAccounts` | `2025-01-01` | `st` | Global | Foundational |
| Synapse Workspace | `Microsoft.Synapse/workspaces` | `2021-06-01` | `synw` | Global | Strategic |

## Documentation

| Resource | Bicep Reference | Service Overview | Naming Rules | Additional |
|----------|----------------|------------------|--------------|------------|
| Cosmos DB | [2025-04-15](https://learn.microsoft.com/azure/templates/microsoft.documentdb/databaseaccounts?pivots=deployment-language-bicep) | [Cosmos DB overview](https://learn.microsoft.com/azure/cosmos-db/introduction) | [Naming rules](https://learn.microsoft.com/azure/azure-resource-manager/management/resource-name-rules#microsoftdocumentdb) | [Consistency levels](https://learn.microsoft.com/azure/cosmos-db/consistency-levels) |
| Data Factory | [2018-06-01](https://learn.microsoft.com/azure/templates/microsoft.datafactory/factories?pivots=deployment-language-bicep) | [ADF overview](https://learn.microsoft.com/azure/data-factory/introduction) | [Naming rules](https://learn.microsoft.com/azure/azure-resource-manager/management/resource-name-rules#microsoftdatafactory) | [ADF naming rules](https://learn.microsoft.com/azure/data-factory/naming-rules) |
| Redis Cache | [2024-11-01](https://learn.microsoft.com/azure/templates/microsoft.cache/redis?pivots=deployment-language-bicep) | [Redis overview](https://learn.microsoft.com/azure/azure-cache-for-redis/cache-overview) | [Naming rules](https://learn.microsoft.com/azure/azure-resource-manager/management/resource-name-rules#microsoftcache) | [Service tiers](https://learn.microsoft.com/azure/azure-cache-for-redis/cache-overview#service-tiers) |
| Storage Account | [2025-01-01](https://learn.microsoft.com/azure/templates/microsoft.storage/storageaccounts?pivots=deployment-language-bicep) | [Storage overview](https://learn.microsoft.com/azure/storage/common/storage-account-overview) | [Naming rules](https://learn.microsoft.com/azure/azure-resource-manager/management/resource-name-rules#microsoftstorage) | [Storage redundancy](https://learn.microsoft.com/azure/storage/common/storage-redundancy) |
| Synapse Workspace | [2021-06-01](https://learn.microsoft.com/azure/templates/microsoft.synapse/workspaces?pivots=deployment-language-bicep) | [Synapse overview](https://learn.microsoft.com/azure/synapse-analytics/overview-what-is) | [Naming rules](https://learn.microsoft.com/azure/azure-resource-manager/management/resource-name-rules#microsoftsynapse) | [All API versions](https://learn.microsoft.com/azure/templates/microsoft.synapse/allversions) |
