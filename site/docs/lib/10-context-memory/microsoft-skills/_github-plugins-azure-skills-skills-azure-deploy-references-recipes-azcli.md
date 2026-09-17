---
title: "Azure CLI Deploy Recipe"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-deploy/references/recipes/azcli/README.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-deploy/references/recipes/azcli/README.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-deploy/references/recipes/azcli/README.md"
sourceSha256: "c57a8fec3a71adc46dea653e026f300f7a45f67de544fb6a316b55e4acbda5f9"
pageSha256: "c57a8fec3a71adc46dea653e026f300f7a45f67de544fb6a316b55e4acbda5f9"
contentMode: "local-full"
zh: ""
---

# Azure CLI Deploy Recipe

Deploy to Azure using Azure CLI.

## Prerequisites

- `az` CLI installed → Run `mcp_azure_mcp_extension_cli_install` with `cli-type: az` if needed
- `.azure/deployment-plan.md` exists with status `Validated`
- Bicep/ARM templates exist in `infra/`
- **Subscription and location confirmed** → See [Pre-Deploy Checklist](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-deploy-references-pre-deploy-checklist)

## Workflow

| Step | Task | Command |
|------|------|---------|
| 1 | **[Pre-deploy checklist](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-deploy-references-pre-deploy-checklist)** | Confirm subscription/location with user |
| 2 | Deploy infrastructure | `az deployment sub create` |
| 3 | Deploy application | Service-specific commands |
| 4 | Verify | `az resource list` |
| 5 | **Report** | Present deployed endpoint URLs to the user — see [Verification](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-deploy/references/recipes/azcli/verify.md) |

## Infrastructure Deployment

### Subscription-Level (Recommended)

```bash
az deployment sub create \
  --location eastus2 \
  --template-file ./infra/main.bicep \
  --parameters environmentName=dev
```

### Resource Group Level

```bash
az group create --name rg-myapp-dev --location eastus2

az deployment group create \
  --resource-group rg-myapp-dev \
  --template-file ./infra/main.bicep \
  --parameters environmentName=dev
```

## Application Deployment

### Container Apps

```bash
az containerapp update \
