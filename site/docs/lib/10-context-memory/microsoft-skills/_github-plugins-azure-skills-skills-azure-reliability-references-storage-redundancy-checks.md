---
title: "Storage Redundancy Checks"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-reliability/references/storage-redundancy-checks.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-reliability/references/storage-redundancy-checks.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-reliability/references/storage-redundancy-checks.md"
sourceSha256: "2ef140db5d9e29958aa572c8bb90556d12ffc2da96881c2130c36c420bac5536"
pageSha256: "2ef140db5d9e29958aa572c8bb90556d12ffc2da96881c2130c36c420bac5536"
contentMode: "local-full"
zh: ""
---

# Storage Redundancy Checks

## Overview

Storage accounts underpin Azure Functions, Container Apps (for host storage), and App Service. If compute is zone-redundant but storage is not, a zone failure can still cause downtime.

## Replication Types

| Type | Zone Redundancy | Region Redundancy | Description |
|---|---|---|---|
| LRS | ❌ None | ❌ None | 3 copies in one datacenter. No zone or region protection. |
| ZRS | ✅ Zone-redundant | ❌ None | 3 copies across 3 availability zones in one region. |
| GRS | ❌ None (LRS per region) | ✅ Region-redundant | LRS in primary + LRS in secondary region. Zone failure in primary = risk. |
| GZRS | ✅ Zone-redundant | ✅ Region-redundant | ZRS in primary region + LRS in secondary region. Best protection. |
| RA-GRS | ❌ None (LRS per region) | ✅ Region + read | Like GRS but secondary is readable. Still LRS within each region. |
| RA-GZRS | ✅ Zone-redundant | ✅ Region + read | GZRS + read access to secondary. Maximum redundancy. |

## Minimum Requirement

- If compute is zone-redundant → storage MUST be at least **ZRS** (not GRS — GRS uses LRS in each region and is NOT zone-redundant)
- For multi-region failover → storage should be **GZRS** (zone + region) or **GRS** (region only, accepts zone risk)

## Resource Graph Queries

> **⚠️ Output format:** Use `--query "data[]" -o json` (not `-o table`). `az graph query -o table` only renders summary columns and does not show projected fields.

### Find All Storage Accounts and Their Replication

```bash
az graph query -q "
Resources
| where type =~ 'microsoft.storage/storageaccounts'
| extend replication = tostring(sku.name)
| extend tier = tostring(sku.tier)
| project name, resourceGroup, location, replication, tier, kind
| order by replication asc
" --query "data[]" -o json
```

> **💡 No SKU specified?** If a storage account was deployed without an explicit `sku.name` (raw ARM/Bicep) or `skuName` (AVM module), Azure defaults to **`Standard_GRS`**. Treat any storage account showing `Standard_GRS` as potentially "defaulted" rather than intentionally chosen — check the IaC source to confirm and recommend setting it explicitly to `Standard_ZRS` or `Standard_GZRS`.

### Find Storage Accounts Using LRS (Not Zone Redundant)

```bash
az graph query -q "
Resources
| where type =~ 'microsoft.storage/storageaccounts'
| where sku.name =~ 'Standard_LRS' or sku.name =~ 'Premium_LRS'
| project name, resourceGroup, location, replication=sku.name
" --query "data[]" -o json
```

### Find Function App Host Storage Accounts

```bash
# List function apps and their storage connections
az graph query -q "
Resources
| where type =~ 'microsoft.web/sites'
| where kind contains 'functionapp'
| project name, resourceGroup, location
" --query "data[]" -o json

# Then for each function app, check its storage:
az functionapp config appsettings list \
