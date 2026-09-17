---
title: "Azure App Service — Reliability Reference"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-reliability/references/services/app-service/reliability.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-reliability/references/services/app-service/reliability.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-reliability/references/services/app-service/reliability.md"
sourceSha256: "91f1ecd1c07826ed684a5361bcae60bca5fde4b818c4dae04ef965b8aee37077"
pageSha256: "91f1ecd1c07826ed684a5361bcae60bca5fde4b818c4dae04ef965b8aee37077"
contentMode: "local-full"
zh: ""
---

# Azure App Service — Reliability Reference

## Supported Plans & Zone Redundancy

| Plan | Zone Redundancy | Min Instances | Health Check |
|------|----------------|---------------|--------------|
| Free/Shared (F1/D1) | ❌ Not supported | N/A | ❌ |
| Basic (B1/B2/B3) | ❌ Not supported | N/A | ✅ |
| Standard (S1/S2/S3) | ❌ Not supported | N/A | ✅ |
| Premium v2 (P1v2+) | ✅ `zoneRedundant: true` + `capacity: 2` | 2 | ✅ |
| Premium v3 (P0v3+) | ✅ `zoneRedundant: true` + `capacity: 2` | 2 (recommended) | ✅ |
| Premium v4 (P0v4+) | ✅ `zoneRedundant: true` + `capacity: 2` | 2 (recommended) | ✅ |
| Isolated v2 (I1v2+) | ✅ `zoneRedundant: true` + `capacity: 2`  | 2 | ✅ |

## Assessment Queries

> **⚠️ Output format:** Use `--query "data[]" -o json` for `az graph query`. `-o table` only shows summary columns (`Count`, `Total_records`) and hides projected fields. Standard `az webapp` commands work fine with `-o table`.

### Plan Zone Redundancy
```bash
az graph query -q "
resources
| where resourceGroup =~ '<rg>'
| where type =~ 'microsoft.web/serverfarms'
| where kind !contains 'functionapp'
| project name, sku=sku.name, capacity=sku.capacity, zoneRedundant=properties.zoneRedundant, location
