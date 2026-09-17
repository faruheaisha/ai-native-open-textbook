---
title: "Detailed Workflows: Quota Management"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/quota/references/workflows.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/quota/references/workflows.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/quota/references/workflows.md"
sourceSha256: "fafb7b983c3d13105b8c446e021638d35f6ffa05a9e8f09c0a3721f4d4142bdc"
pageSha256: "fafb7b983c3d13105b8c446e021638d35f6ffa05a9e8f09c0a3721f4d4142bdc"
contentMode: "local-full"
zh: ""
---

# Detailed Workflows: Quota Management

**Table of Contents:** [Workflow 1: View Current Quota Usage](#workflow-1-view-current-quota-usage---detailed-steps) · [Workflow 2: Find Best Region for Model Deployment](#workflow-2-find-best-region-for-model-deployment---detailed-steps) · [Workflow 3: Check Quota Before Deployment](#workflow-3-check-quota-before-deployment---detailed-steps) · [Workflow 4: Monitor Quota Across Deployments](#workflow-4-monitor-quota-across-deployments---detailed-steps) · [Quick Command Reference](#quick-command-reference) · [MCP Tools Reference](#mcp-tools-reference-optional-wrappers)

## Workflow 1: View Current Quota Usage - Detailed Steps

### Step 1: Show Regional Quota Summary (REQUIRED APPROACH)

> **CRITICAL AGENT INSTRUCTION:**
> - When showing quota: Query REGIONAL quota summary, NOT individual resources
> - DO NOT run `az cognitiveservices account list` for quota queries
> - DO NOT filter resources by username or name patterns
> - ONLY check specific resource deployments if user provides resource name
> - Quotas are managed at SUBSCRIPTION + REGION level, NOT per-resource

**Show Regional Quota Summary:**

```bash
# Get subscription ID
subId=$(az account show --query id -o tsv)

# Check quota for key regions
regions=("eastus" "eastus2" "westus" "westus2")
for region in "${regions[@]}"; do
  echo "=== Region: $region ==="
  az rest --method get \
    --url "https://management.azure.com/subscriptions/$subId/providers/Microsoft.CognitiveServices/locations/$region/usages?api-version=2023-05-01" \
    --query "value[?contains(name.value,'OpenAI.Standard')].{Model:name.value, Used:currentValue, Limit:limit, Available:(limit-currentValue)}" \
    --output table
  echo ""
done
```

### Step 2: If User Asks for Specific Resource (ONLY IF EXPLICITLY REQUESTED)

```bash
# User must provide resource name
az cognitiveservices account deployment list \
