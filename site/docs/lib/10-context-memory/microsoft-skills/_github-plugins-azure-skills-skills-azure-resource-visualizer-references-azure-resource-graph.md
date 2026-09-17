---
title: "Azure Resource Graph Queries for Resource Discovery"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-resource-visualizer/references/azure-resource-graph.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-resource-visualizer/references/azure-resource-graph.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-resource-visualizer/references/azure-resource-graph.md"
sourceSha256: "fb7c11feca04a1ad967a4eb83ad823ac25d0b8e1252a39bada62d4b91159597c"
pageSha256: "fb7c11feca04a1ad967a4eb83ad823ac25d0b8e1252a39bada62d4b91159597c"
contentMode: "local-full"
zh: ""
---

# Azure Resource Graph Queries for Resource Discovery

Azure Resource Graph (ARG) enables fast, cross-subscription resource querying using KQL via `az graph query`. Use it for bulk resource discovery and relationship mapping.

## How to Query

Use the `extension_cli_generate` MCP tool to generate `az graph query` commands:

```yaml
mcp_azure_mcp_extension_cli_generate
  intent: "query Azure Resource Graph to &lt;describe what you want to find>"
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
| `Resources` | All ARM resource instances (name, type, location, properties, tags) |
| `ResourceContainers` | Subscriptions, resource groups, management groups |

## Resource Discovery Patterns

**List all resources by type:**

```kql
Resources | summarize count() by type | order by count_ desc
```

**Inventory by location and type:**

```kql
Resources | summarize count() by type, location | order by type asc
```

**List all resources in a resource group with details:**

```kql
Resources
