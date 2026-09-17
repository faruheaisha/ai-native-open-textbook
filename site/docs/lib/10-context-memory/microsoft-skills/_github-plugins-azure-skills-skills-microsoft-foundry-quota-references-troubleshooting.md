---
title: "Troubleshooting Quota Errors"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/quota/references/troubleshooting.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/quota/references/troubleshooting.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/quota/references/troubleshooting.md"
sourceSha256: "c02131de9b24679f13b5d2cba4ebb4e90b5916bd061ff6c1acc98c494fb800e9"
pageSha256: "c02131de9b24679f13b5d2cba4ebb4e90b5916bd061ff6c1acc98c494fb800e9"
contentMode: "local-full"
zh: ""
---

# Troubleshooting Quota Errors

**Table of Contents:** [Common Quota Errors](#common-quota-errors) · [Detailed Error Resolution](#detailed-error-resolution) · [Request Quota Increase Process](#request-quota-increase-process) · [Diagnostic Commands](#diagnostic-commands) · [External Resources](#external-resources)

## Common Quota Errors

| Error | Cause | Quick Fix |
|-------|-------|-----------|
| `QuotaExceeded` | Regional quota consumed (TPM or PTU) | Delete unused deployments or request increase |
| `InsufficientQuota` | Not enough available for requested capacity | Reduce deployment capacity or free quota |
| `DeploymentLimitReached` | Too many deployment slots used | Delete unused deployments to free slots |
| `429 Rate Limit` | TPM capacity too low for traffic (Standard only) | Increase TPM capacity or migrate to PTU |
| `PTU capacity unavailable` | No PTU quota in region | Request PTU quota or try different region |
| `SKU not supported` | PTU not available for model/region | Check model availability or use Standard TPM |

## Detailed Error Resolution

### QuotaExceeded Error

All available TPM or PTU quota consumed in the region.

**Resolution:**

1. **Check current quota usage:**
   ```bash
   subId=$(az account show --query id -o tsv)
   region="eastus"
   az rest --method get \
     --url "https://management.azure.com/subscriptions/$subId/providers/Microsoft.CognitiveServices/locations/$region/usages?api-version=2023-05-01" \
     --query "value[?contains(name.value,'OpenAI')].{Model:name.value, Used:currentValue, Limit:limit}" -o table
   ```

2. **Choose resolution:**
   - **Option A**: Delete unused deployments to free quota
   - **Option B**: Reduce requested deployment capacity
   - **Option C**: Deploy to different region with available quota
   - **Option D**: Request quota increase through Azure Portal

### InsufficientQuota Error

Available quota less than requested capacity.

**Resolution:**

1. **Check available quota:**
   ```bash
   # Calculate available: limit - currentValue
   subId=$(az account show --query id -o tsv)
   region="eastus"
   az rest --method get \
     --url "https://management.azure.com/subscriptions/$subId/providers/Microsoft.CognitiveServices/locations/$region/usages?api-version=2023-05-01" \
     --query "value[?name.value=='OpenAI.Standard.gpt-4o'].{Model:name.value, Used:currentValue, Limit:limit, Available:(limit-currentValue)}" -o table
   ```

2. **Options:**
   - Reduce deployment capacity to fit available quota
   - Delete existing deployments to free capacity
   - Try different region with more available quota
   - Request quota increase

### DeploymentLimitReached Error

Resource reached maximum deployment slot limit (10-20 slots).

**Resolution:**

1. **List existing deployments:**
   ```bash
   az cognitiveservices account deployment list \
