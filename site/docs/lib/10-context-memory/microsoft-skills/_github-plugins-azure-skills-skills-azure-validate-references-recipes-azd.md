---
title: "AZD Validation"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-validate/references/recipes/azd/README.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-validate/references/recipes/azd/README.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-validate/references/recipes/azd/README.md"
sourceSha256: "f2eb606251d3772cbf3d98fdb42214d5205cd9f8d18fb4914cebbbe6baea1836"
pageSha256: "f2eb606251d3772cbf3d98fdb42214d5205cd9f8d18fb4914cebbbe6baea1836"
contentMode: "local-full"
zh: ""
---

# AZD Validation

Validation steps for Azure Developer CLI projects.

## Prerequisites

- `azure.yaml` exists in project root
- Infrastructure files exist:
  - For Bicep: `./infra/` contains Bicep files
  - For Terraform: `./infra/` contains `.tf` files and `azure.yaml` has `infra.provider: terraform`

## Validation Steps

- [ ] 1. AZD Installation
- [ ] 2. Schema Validation
- [ ] 3. Environment Setup
- [ ] 4. Authentication Check
- [ ] 5. Subscription/Location Check
- [ ] 6. Aspire Pre-Provisioning Checks
- [ ] 7. Provision Preview
- [ ] 8. Build Verification
- [ ] 9. Docker Build Context Validation
- [ ] 10. Package Validation
- [ ] 11. Azure Policy Validation
- [ ] 12. Aspire Post-Provisioning Checks

## Validation Details

### 1. AZD Installation

Verify AZD is installed:

```bash
azd version
```

**If not installed:**
```
mcp_azure_mcp_extension_cli_install(cli-type: "azd")
```

### 2. Schema Validation

Validate azure.yaml against official schema:

```
mcp_azure_mcp_azd(command: "validate_azure_yaml", parameters: \{ path: "./azure.yaml" \})
```

### 3. Environment Setup

Verify AZD environment exists and is configured. See [Environment Setup](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-validate-references-recipes-azd-environment) for detailed steps.

### 4. Authentication Check

```bash
azd auth login --check-status
```

**If not logged in:**
```bash
azd auth login
```

### 5. Subscription/Location Check

Check environment values:
```bash
azd env get-values
```

**If AZURE_SUBSCRIPTION_ID or AZURE_LOCATION not set:**

Use Azure MCP tools to list subscriptions:
```
mcp_azure_mcp_subscription_list
```

Use Azure MCP tools to list resource groups (check for conflicts):
```
mcp_azure_mcp_group_list
