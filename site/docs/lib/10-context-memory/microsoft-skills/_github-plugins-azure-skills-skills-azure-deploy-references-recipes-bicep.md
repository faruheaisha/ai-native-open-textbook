---
title: "Bicep Deploy Recipe"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-deploy/references/recipes/bicep/README.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-deploy/references/recipes/bicep/README.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-deploy/references/recipes/bicep/README.md"
sourceSha256: "39d1d65f60715a5a99922abd076281b0cc2a61f006635c4f6f26ba3ef786cf43"
pageSha256: "39d1d65f60715a5a99922abd076281b0cc2a61f006635c4f6f26ba3ef786cf43"
contentMode: "local-full"
zh: ""
---

# Bicep Deploy Recipe

Deploy to Azure using Bicep templates directly.

## Prerequisites

- `az` CLI installed with Bicep extension
- `.azure/deployment-plan.md` exists with status `Validated`
- Bicep templates exist in `infra/`
- **Subscription and location confirmed** → See [Pre-Deploy Checklist](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-deploy-references-pre-deploy-checklist)

## Workflow

| Step | Task | Command |
|------|------|---------|
| 1 | **[Pre-deploy checklist](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-deploy-references-pre-deploy-checklist)** | Confirm subscription/location with user |
| 2 | Build (optional) | `az bicep build --file main.bicep` |
| 3 | Deploy | `az deployment sub create` |
| 4 | Verify | `az resource list` |
| 5 | **Report** | Present deployed endpoint URLs to the user — see [Verification](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-deploy/references/recipes/bicep/verify.md) |

## Deployment Commands

### Subscription-Level Deployment

```bash
az deployment sub create \
  --location eastus2 \
  --template-file ./infra/main.bicep \
  --parameters ./infra/main.parameters.json
```

### Resource Group Deployment

```bash
az deployment group create \
  --resource-group rg-myapp-dev \
  --template-file ./infra/main.bicep \
  --parameters ./infra/main.parameters.json
```

### With Inline Parameters

```bash
az deployment sub create \
  --location eastus2 \
  --template-file ./infra/main.bicep \
  --parameters environmentName=dev location=eastus2
```

### What-If (Preview Changes)

```bash
az deployment sub what-if \
  --location eastus2 \
  --template-file ./infra/main.bicep \
  --parameters environmentName=dev
```

## Get Deployment Outputs

```bash
az deployment sub show \
  --name main \
  --query properties.outputs
```

## References

- [Verification steps](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-deploy/references/recipes/bicep/verify.md)
- [Error handling](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-deploy-references-recipes-bicep-errors)

## MCP Tools

| Tool | Purpose |
|------|---------|
| `mcp_bicep_get_bicep_best_practices` | Best practices |
| `mcp_bicep_get_az_resource_type_schema` | Resource schemas |
| `mcp_bicep_list_avm_metadata` | Azure Verified Modules |

## AVM Verification Before Deploy

Before running deployment commands, verify generated templates followed AVM-first module selection:

1. AVM Bicep Pattern Modules (prefer AVM+AZD patterns)
2. AVM Bicep Resource Modules
3. AVM Bicep Utility Modules

If no AVM+AZD pattern module is available, fallback must remain within AVM modules (resource -> utility).

## Cleanup (DESTRUCTIVE)

```bash
