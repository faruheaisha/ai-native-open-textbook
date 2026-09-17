---
title: "Azure Functions — Reliability Reference"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-reliability/references/services/functions/reliability.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-reliability/references/services/functions/reliability.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-reliability/references/services/functions/reliability.md"
sourceSha256: "95527035e16b597bc0e78e85b74f7e85de1a253fad76066b1d2fdbfc7cfbb5f8"
pageSha256: "95527035e16b597bc0e78e85b74f7e85de1a253fad76066b1d2fdbfc7cfbb5f8"
contentMode: "local-full"
zh: ""
---

# Azure Functions — Reliability Reference

## Supported Plans & Zone Redundancy

| Plan | Zone Redundancy | Min Instances | Health Check |
|------|----------------|---------------|--------------|
| Flex Consumption (FC1) | ✅ `zoneRedundant: true` | Auto-managed | ❌ Platform health check not supported |
| Premium (EP1/EP2/EP3) | ✅ `zoneRedundant: true` + `sku.capacity: 2` | `minimumElasticInstanceCount: 2` per app | ✅ `healthCheckPath` |
| Consumption (Y1) | ❌ Not supported | N/A | ❌ Not supported |
| Dedicated (P1v2+) | ✅ (treated as App Service) | `sku.capacity: 2` | ✅ `healthCheckPath` |

## Assessment Queries

### Zone Redundancy Check
```bash
az graph query -q "
resources
| where resourceGroup =~ '<rg>'
| where type =~ 'microsoft.web/serverfarms'
| where kind contains 'functionapp' or kind =~ 'linux' or kind =~ 'elastic'
| project name, sku=sku.name, zoneRedundant=properties.zoneRedundant, location
