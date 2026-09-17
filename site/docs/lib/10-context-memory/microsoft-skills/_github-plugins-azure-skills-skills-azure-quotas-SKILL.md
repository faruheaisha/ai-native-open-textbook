---
title: "Azure Quotas - Service Limits & Capacity Management"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-quotas/SKILL.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-quotas/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-quotas/SKILL.md"
sourceSha256: "3bce38d6df08def03e5934469313e5cd532607a6f5087d08f75712e286550ae2"
pageSha256: "3bce38d6df08def03e5934469313e5cd532607a6f5087d08f75712e286550ae2"
contentMode: "local-full"
zh: ""
---

# Azure Quotas - Service Limits & Capacity Management

> **AUTHORITATIVE GUIDANCE** — Follow these instructions exactly for quota management and capacity validation.

## Overview

**What are Azure Quotas?**

Azure quotas (also called service limits) are the maximum number of resources you can deploy in a subscription. Quotas:
- Prevent accidental over-provisioning
- Ensure fair resource distribution across Azure
- Represent **available capacity** in each region
- Can be increased (adjustable quotas) or are fixed (non-adjustable)

**Key Concept:** **Quotas = Resource Availability**

If you don't have quota, you cannot deploy resources. Always check quotas when planning deployments or selecting regions.

## When to Use This Skill

Invoke this skill when:

- **Planning a new deployment** - Validate capacity before deployment
- **Selecting an Azure region** - Compare quota availability across regions
- **Troubleshooting quota exceeded errors** - Check current usage vs limits
- **Requesting quota increases** - Submit increase requests via CLI or Portal
- **Comparing regional capacity** - Find regions with available quota
- **Validating provisioning limits** - Ensure deployment won't exceed quotas

## Quick Reference

| **Property** | **Details** |
|--------------|-------------|
| **Primary Tool** | Azure CLI (`az quota`) - **USE THIS FIRST, ALWAYS** |
| **Extension Required** | `az extension add --name quota` (MUST install first) |
| **Key Commands** | `az quota list`, `az quota show`, `az quota usage list`, `az quota usage show` |
| **Complete CLI Reference** | [commands.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-quotas-references-commands) |
| **Azure Portal** | [My quotas](https://portal.azure.com/#blade/Microsoft_Azure_Capacity/QuotaMenuBlade/myQuotas) - Use only as fallback |
| **REST API** | Microsoft.Quota provider - **Unreliable, do NOT use first** |
| **MCP Server** | `azure-quota` MCP server — **NEVER use this. It is unreliable. Always use `az quota` CLI instead.** |
| **Required Permission** | Reader (view) or Quota Request Operator (manage) |

> **⚠️ ALWAYS USE CLI FIRST**
>
> REST API and Portal can show misleading "No Limit" values — this does **not** mean unlimited capacity. It means the quota API doesn't support that resource type. Always start with `az quota` commands; fall back to [Azure service limits docs](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/azure-subscription-service-limits) if CLI returns `BadRequest`.
>
> For complete CLI reference, see [commands.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-quotas-references-commands).

## Quota Types

| **Type** | **Adjustability** | **Approval** | **Examples** |
|----------|-------------------|--------------|--------------|
| **Adjustable** | Can increase via Portal/CLI/API | Usually auto-approved | VM vCPUs, Public IPs, Storage accounts |
| **Non-adjustable** | Fixed limits | Cannot be changed | Subscription-wide hard limits |

**Important:** Requesting quota increases is **free**. You only pay for resources you actually use, not for quota allocation.

## Understanding Resource Name Mapping

**⚠️ CRITICAL:** There is **NO 1:1 mapping** between ARM resource types and quota resource names.

### Example Mappings

| ARM Resource Type | Quota Resource Name |
|-------------------|---------------------|
| `Microsoft.App/managedEnvironments` | `ManagedEnvironmentCount` |
| `Microsoft.Compute/virtualMachines` | `standardDSv3Family`, `cores`, `virtualMachines` |
| `Microsoft.Network/publicIPAddresses` | `PublicIPAddresses`, `IPv4StandardSkuPublicIpAddresses` |

### Discovery Workflow

**Never assume the quota resource name from the ARM type.** Always use this workflow:

1. **List all quotas** for the resource provider:
   ```bash
   az quota list --scope /subscriptions/<id>/providers/<ProviderNamespace>/locations/<region>
   ```

2. **Match by `localizedValue`** (human-readable description) to find the relevant quota

3. **Use the `name` field** (not ARM resource type) in subsequent commands:
   ```bash
   az quota show --resource-name ManagedEnvironmentCount --scope ...
   az quota usage show --resource-name ManagedEnvironmentCount --scope ...
   ```

> **📖 Detailed mapping examples and workflow:** See [commands.md - Resource Name Mapping](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-quotas-references-commands#resource-name-mapping)

## Scripts

Pre-built scripts handle quota extension installation, usage queries, and capacity calculation. Use these instead of constructing commands manually. A single call returns limits, usage, and available capacity.

| Script | Purpose | Usage |
|--------|---------|-------|
| `scripts/check-quota.ps1` | Returns limit, usage, and available capacity for all quotas (or a single quota when resource name is provided) | Primary script for quota checks |
| `scripts/check-quota.sh` | Same as above (bash) | Primary script for quota checks |

## Core Workflows

### Workflow 1: Check Quota for a Specific Resource

**Scenario:** Verify quota limits and current usage before deployment

Run the script with the resource provider and region. It returns a table of **all** quotas with their limit, current usage, and available capacity in a single call:

```powershell
.\scripts\check-quota.ps1 -ResourceProvider <provider> -Region <region>
```
```bash
./scripts/check-quota.sh <provider> <region>
```

To check a single resource, add the resource name:

```powershell
