---
title: "Azure Resource Graph Queries for Diagnostics"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-diagnostics/references/azure-resource-graph.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-diagnostics/references/azure-resource-graph.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-diagnostics/references/azure-resource-graph.md"
sourceSha256: "e6b707e38a07cbc4b9c26333f730a262268223686aaecd75951bb208e32e8421"
pageSha256: "e6b707e38a07cbc4b9c26333f730a262268223686aaecd75951bb208e32e8421"
contentMode: "local-full"
zh: ""
---

# Azure Resource Graph Queries for Diagnostics

Azure Resource Graph (ARG) enables fast, cross-subscription resource querying using KQL via `az graph query`. Use it to check resource health, find degraded resources, and correlate incidents.

## How to Query

Use the `extension_cli_generate` MCP tool to generate `az graph query` commands:

```yaml
mcp_azure_mcp_extension_cli_generate
  intent: "query Azure Resource Graph to &lt;describe what you want to diagnose>"
  cli-type: "az"
```

Or construct directly:

```bash
az graph query -q "&lt;KQL>" --query "data[].\{name:name, type:type\}" -o table
```

> ⚠️ **Prerequisite:** `az extension add --name resource-graph`

## Key Tables

| Table | Contains |
|-------|----------|
| `Resources` | All ARM resources (name, type, location, properties, tags) |
| `HealthResources` | Resource health availability status |
| `ServiceHealthResources` | Azure service health events and incidents |
| `ResourceContainers` | Subscriptions, resource groups, management groups |

## Diagnostics Query Patterns

**Check resource health status across resources:**

```kql
HealthResources
| where type =~ 'microsoft.resourcehealth/availabilitystatuses'
| project name, availabilityState=properties.availabilityState, reasonType=properties.reasonType
```

**Find resources in unhealthy or degraded state:**

```kql
HealthResources
| where type =~ 'microsoft.resourcehealth/availabilitystatuses'
| where properties.availabilityState != 'Available'
| project name, state=properties.availabilityState, reason=properties.reasonType, summary=properties.summary
```

**Query active service health incidents:**

```kql
ServiceHealthResources
| where type =~ 'microsoft.resourcehealth/events'
| where properties.Status == 'Active'
| project name, title=properties.Title, impact=properties.Impact, status=properties.Status
```

**Find resources by provisioning state (failed/stuck deployments):**

```kql
Resources
| where properties.provisioningState != 'Succeeded'
| project name, type, resourceGroup, provisioningState=properties.provisioningState
```

**Find App Services in stopped or error state:**

```kql
Resources
| where type =~ 'microsoft.web/sites'
| where properties.state != 'Running'
| project name, state=properties.state, resourceGroup, location
```

**Find Container Apps with provisioning issues:**

```kql
Resources
| where type =~ 'microsoft.app/containerapps'
| where properties.provisioningState != 'Succeeded'
| project name, provisioningState=properties.provisioningState, resourceGroup
```

## Tips

- Use `=~` for case-insensitive type matching (resource types are lowercase)
- Navigate properties with `properties.fieldName`
- Use `--first N` to limit result count
- Use `--subscriptions` to scope to specific subscriptions
- Combine ARG health data with Azure Monitor metrics for full picture
- Check `HealthResources` before deep-diving into application logs
