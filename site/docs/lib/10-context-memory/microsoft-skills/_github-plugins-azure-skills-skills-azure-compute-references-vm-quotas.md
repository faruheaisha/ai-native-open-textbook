---
title: "VM Quota Validation Guide"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-compute/references/vm-quotas.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-compute/references/vm-quotas.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-compute/references/vm-quotas.md"
sourceSha256: "fecd3425f5de561ce7e2658ae8450c49953b380745fa45f14b0a8c6e33875d1a"
pageSha256: "fecd3425f5de561ce7e2658ae8450c49953b380745fa45f14b0a8c6e33875d1a"
contentMode: "local-full"
zh: ""
---

# VM Quota Validation Guide

Check Azure VM/VMSS quota availability before recommending or deploying. Ensures the subscription and region have sufficient vCPU capacity.

> ⚠️ **NEVER use the `azure-quota` MCP server as as It is unreliable.** Always try `az quota` CLI commands first.

## Quota Structure

VM quotas are tracked at **two levels** under `Microsoft.Compute`:

| Quota Level | Resource Name | What It Limits |
|---|---|---|
| **Total Regional** | `cores` | All vCPUs across all families in a region |
| **Per-Family** | e.g., `standardDSv3Family` | vCPUs for a specific VM family |

> ⚠️ **Both levels must have capacity.** A deployment fails if either is exceeded.

### Common Quota Resource Names

See [vm-families.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-compute-references-vm-families) for quota resource names per VM family. Use `az quota list` to discover names not listed there.

> ⚠️ **Do NOT guess quota names from SKU names.** Use `az quota list` to discover correct resource names.

## Quota Check Workflow

### Option A: `az vm list-usage` (Recommended for VM quotas)

No extension required. Returns **both current usage and limit in a single call** for all VM families in a region — equivalent to running `az quota usage show` and `az quota list` together for VM vCPU quotas.

```bash
# All VM family quotas in a region
az vm list-usage --location <region> -o table

# Filter to a specific family
az vm list-usage --location <region> --query "[?contains(name.value,'<quotaName>')].{Name:name.localizedValue, QuotaName:name.value, Current:currentValue, Limit:limit}" -o table
```

> 💡 **Tip:** `az vm list-usage` is the simplest way to check VM quotas. Use `az quota` (Option B) when you need to **request quota increases** or manage quotas for non-VM resource types.

### Option B: `az quota` CLI (For quota increases or non-VM resources)

Prerequisite: `az extension add --name quota`

| Step | Command | Purpose |
|---|---|---|
