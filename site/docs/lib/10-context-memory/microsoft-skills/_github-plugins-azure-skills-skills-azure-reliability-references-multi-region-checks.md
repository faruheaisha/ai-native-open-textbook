---
title: "Multi-Region & Failover Checks"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-reliability/references/multi-region-checks.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-reliability/references/multi-region-checks.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-reliability/references/multi-region-checks.md"
sourceSha256: "b5f3700d0e40e464675d4f482a06a8046986aa61018d21d28af7eafbc9e3988d"
pageSha256: "b5f3700d0e40e464675d4f482a06a8046986aa61018d21d28af7eafbc9e3988d"
contentMode: "local-full"
zh: ""
---

# Multi-Region & Failover Checks

## Overview

Multi-region deployment protects against entire region outages. This requires deploying compute in multiple regions and using a global load balancer (Azure Front Door or Traffic Manager) to route traffic.

## Resource Graph Queries

> **⚠️ Output format:** Use `--query "data[]" -o json` (not `-o table`). `az graph query -o table` only renders summary columns and does not show projected fields.

### Check if App is Deployed in Multiple Regions

```bash
az graph query -q "
Resources
| where type in~ ('microsoft.web/sites', 'microsoft.app/containerapps')
| extend appKind = case(
    type =~ 'microsoft.web/sites' and kind contains 'functionapp', 'FunctionApp',
    type =~ 'microsoft.web/sites', 'WebApp',
    type =~ 'microsoft.app/containerapps', 'ContainerApp',
    'Other')
| extend baseName = extract('^(.+?)(-[a-z]+\\d*)?$', 1, name)
| summarize regions=make_list(location), regionCount=dcount(location), apps=make_list(name) by baseName, appKind
| where regionCount > 1
| project baseName, appKind, regionCount, regions, apps
" --query "data[]" -o json
```

**Interpretation:**
- Results show apps with the same base name deployed across multiple regions → ✅ Multi-region
- No results → ❌ All apps are single-region

**Important:** The `baseName` extraction uses a naming convention (e.g., `my-app-eastus`, `my-app-westus`). If apps don't follow this pattern, also check by resource tags:

```bash
az graph query -q "
Resources
| where type in~ ('microsoft.web/sites', 'microsoft.app/containerapps')
| where isnotempty(tags['app-group']) or isnotempty(tags['application'])
| extend appGroup = coalesce(tostring(tags['app-group']), tostring(tags['application']))
| summarize regions=make_list(location), regionCount=dcount(location) by appGroup
| where regionCount > 1
| project appGroup, regionCount, regions
" --query "data[]" -o json
```

### Check for Azure Front Door

```bash
az graph query -q "
Resources
| where type =~ 'microsoft.cdn/profiles'
| where sku.name =~ 'Standard_AzureFrontDoor' or sku.name =~ 'Premium_AzureFrontDoor'
| project name, resourceGroup, sku=sku.name
" --query "data[]" -o json
```

### Check for Traffic Manager Profiles

```bash
az graph query -q "
Resources
| where type =~ 'microsoft.network/trafficmanagerprofiles'
| extend routingMethod = tostring(properties.trafficRoutingMethod)
| extend endpoints = array_length(properties.endpoints)
| project name, resourceGroup, routingMethod, endpoints, status=properties.profileStatus
" --query "data[]" -o json
```

### Check Front Door Origins/Backends

```bash
# List Front Door origin groups and origins
az afd origin-group list \
