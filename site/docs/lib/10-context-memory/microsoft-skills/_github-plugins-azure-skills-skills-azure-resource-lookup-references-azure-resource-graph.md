---
title: "Azure Resource Graph Query Patterns"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-resource-lookup/references/azure-resource-graph.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-resource-lookup/references/azure-resource-graph.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-resource-lookup/references/azure-resource-graph.md"
sourceSha256: "478e6a6d0ce9c515523548c2e4b44b71baedd3bd8c27e2af7f3bd3aa804060ea"
pageSha256: "478e6a6d0ce9c515523548c2e4b44b71baedd3bd8c27e2af7f3bd3aa804060ea"
contentMode: "local-full"
zh: ""
---

# Azure Resource Graph Query Patterns

Azure Resource Graph (ARG) queries use a KQL subset against indexed Azure resource metadata. Results are near real-time across all subscriptions.

## Command Format

```bash
az graph query -q "&lt;KQL>" --query "data[].\{col1:field1, col2:field2\}" -o table
```

| Flag | Purpose |
|------|---------|
| `-q` | KQL query string |
| `--query` | JMESPath to shape output columns |
| `--first N` | Limit to N results |
| `--subscriptions` | Scope to specific subscription IDs |
| `-o table` | Table output (also: json, tsv) |

## Key Tables

| Table | Contents |
|-------|----------|
| `Resources` | All ARM resources — name, type, location, properties, tags, sku |
| `ResourceContainers` | Subscriptions, resource groups, management groups |
| `HealthResources` | Resource health availability status |
| `ServiceHealthResources` | Azure service health events/incidents |
| `AuthorizationResources` | Role assignments and definitions |
| `AdvisorResources` | Azure Advisor recommendations |

## KQL Essentials

- `=~` case-insensitive equals (use for `type` field — types are lowercase)
- `properties.fieldName` navigates the properties JSON bag
- `mv-expand` flattens arrays (subnets, IP configs)
- `isempty()` / `isnotnull()` checks for null/empty fields
- `tostring()` converts dynamic fields for display

---

## Resource Inventory Patterns

**Count all resources by type:**
```kql
Resources | summarize count() by type | order by count_ desc
```

**Inventory by type and location:**
```kql
Resources | summarize count() by type, location | order by type asc
```

**Cross-subscription inventory with subscription names:**
```kql
Resources
| join kind=leftouter (
    ResourceContainers
    | where type == 'microsoft.resources/subscriptions'
    | project subscriptionId, subscriptionName=name
) on subscriptionId
| summarize count() by subscriptionName, type
| order by subscriptionName asc, count_ desc
```

**All resources in a resource group:**
```kql
Resources
