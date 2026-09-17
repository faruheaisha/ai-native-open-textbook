---
title: "Detailed Workflows: Create Foundry Resource"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/resource/create/references/workflows.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/resource/create/references/workflows.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/resource/create/references/workflows.md"
sourceSha256: "b1d18badb8aa3803d360a7d117af1b6e739f816e8a1ed4ba41c86e8d722d4c37"
pageSha256: "b1d18badb8aa3803d360a7d117af1b6e739f816e8a1ed4ba41c86e8d722d4c37"
contentMode: "local-full"
zh: ""
---

# Detailed Workflows: Create Foundry Resource

**Table of Contents:** [Workflow 1: Create Resource Group](#workflow-1-create-resource-group---detailed-steps) · [Workflow 2: Create Foundry Resource](#workflow-2-create-foundry-resource---detailed-steps) · [Workflow 3: Register Resource Provider](#workflow-3-register-resource-provider---detailed-steps)

## Workflow 1: Create Resource Group - Detailed Steps

### Step 1: Ask user preference

Ask the user which option they prefer:
1. Use an existing resource group
2. Create a new resource group

### Step 2a: If user chooses "Use existing resource group"

Count and list existing resource groups:

```bash
# Count total resource groups
TOTAL_RG_COUNT=$(az group list --query "length([])" -o tsv)

# Get list of resource groups (up to 5 most recent)
az group list --query "[-5:].{Name:name, Location:location}" --out table
```

**Handle based on count:**

**If 0 resources found:**
- Inform user: "No existing resource groups found"
- Ask if they want to create a new one, then proceed to Step 2b

**If 1-4 resources found:**
- Display all X resource groups to the user
- Let user select from the list
- Fetch the selected resource group details:
  ```bash
