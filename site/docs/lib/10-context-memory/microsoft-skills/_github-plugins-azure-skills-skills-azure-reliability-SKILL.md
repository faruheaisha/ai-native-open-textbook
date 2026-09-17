---
title: "Azure Reliability Assessment & Configuration"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-reliability/SKILL.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-reliability/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-reliability/SKILL.md"
sourceSha256: "a29e054ff1073c263853d137dc9109e100caa1b0b677f4e80652b67d8f6fbdb0"
pageSha256: "a29e054ff1073c263853d137dc9109e100caa1b0b677f4e80652b67d8f6fbdb0"
contentMode: "local-full"
zh: ""
---

# Azure Reliability Assessment & Configuration

## Quick Reference

| Property | Details |
|---|---|
| Best for | Reliability posture assessment, zone redundancy enablement, multi-region failover setup |
| Primary capabilities | Reliability assessment table, Zone Redundancy Configuration, Multi-Region IaC Generation |
| Supported services | Azure Functions, App Service (Container Apps planned for a future version) |
| MCP tools | Azure Resource Graph queries, Azure CLI commands |

## When to Use This Skill

Activate this skill when user wants to:
- "Assess my Function app's reliability"
- "Assess my Web app's reliability"
- "Check the reliability of my resource group" (App Service and Functions resources only)
- "Is my app zone redundant?" (App Service and Functions resources only)
- "Is my app service plan zone redundant?" 
- "Make my app zone redundant" (App Service and Functions resources only)
- "Make my app service plan zone redundant"
- "Set up multi-region failover for my app" (App Service and Functions resources only)
- "Check my reliability posture"
- "Find single points of failure" (App Service and Functions resources only)
- "Enable high availability for my app" (App Service and Functions resources only)
- "Check disaster recovery readiness"
- "Improve my app's resilience" (App Service and Functions resources only)

> **Scope note:** This skill currently covers **Azure Functions and Azure App Service** only. If the user asks about Azure Container Apps reliability, acknowledge that support is planned but not yet available, and only proceed with the parts that apply to App Service and Functions resources in scope.

## Prerequisites

- Authentication: user is logged in to Azure via `az login`
- Permissions: Reader access on target subscription/resource group (for assessment)
- Permissions: Contributor access (for configuration changes)
- Azure Resource Graph extension: `az extension add --name resource-graph`

## MCP Tools

| Tool | Purpose |
|------|---------|
| `mcp_azure_mcp_extension_cli_generate` | Generate `az` CLI commands for resource queries and configuration |
| `mcp_azure_mcp_subscription_list` | List available subscriptions |
| `mcp_azure_mcp_group_list` | List resource groups |

Primary query method: Azure Resource Graph via `az graph query` (requires `az extension add --name resource-graph`).

## Assessment Workflow

### Phase 1: Discover Resources

1. **Identify scope** — Ask user for resource group, subscription, or app name
2. **Query Azure Resource Graph** to discover all resources in scope
3. **Classify resources** by service type (Functions, Storage, etc.). If non-Functions compute (App Service sites that aren't Function Apps, Container Apps) is found, **note it but do not deep-dive** — those services are planned for a future version of this skill.

**Important:** Always scope queries to the user's specified resource group or subscription. Add these filters to every Resource Graph query:
