---
title: "Terraform Deploy Recipe"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-deploy/references/recipes/terraform/README.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-deploy/references/recipes/terraform/README.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-deploy/references/recipes/terraform/README.md"
sourceSha256: "ee0e980df8776c5a45a90cdf9674a3bc9fcefa7f3945a6fb95726dbab5c05475"
pageSha256: "ee0e980df8776c5a45a90cdf9674a3bc9fcefa7f3945a6fb95726dbab5c05475"
contentMode: "local-full"
zh: ""
---

# Terraform Deploy Recipe

Deploy to Azure using Terraform.

## Prerequisites

- Terraform CLI installed
- `.azure/deployment-plan.md` exists with status `Validated`
- Terraform initialized (`terraform init`)
- Plan validated (`terraform plan`)
- **Subscription and location confirmed** → See [Pre-Deploy Checklist](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-deploy-references-pre-deploy-checklist)

## Workflow

| Step | Task | Command |
|------|------|---------|
| 1 | **[Pre-deploy checklist](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-deploy-references-pre-deploy-checklist)** | Confirm subscription/location with user |
| 2 | Select workspace | `terraform workspace select <env>` |
| 3 | Apply | `terraform apply tfplan` |
| 4 | Get outputs | `terraform output` |
| 5 | Deploy app | Service-specific commands |
| 6 | **Report** | Present deployed endpoint URLs to the user — see [Verification](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-deploy-references-recipes-terraform-verify) |

## Deployment Commands

### Apply with Plan File (Recommended)

```bash
terraform plan -out=tfplan
terraform apply tfplan
```

### Auto-Approve (CI/CD)

```bash
terraform apply -auto-approve
```

### With Variables

```bash
terraform apply \
  -var="environment=prod" \
  -var="location=westus2" \
  -auto-approve
```

### Target Specific Resource

```bash
terraform apply -target=azurerm_container_app.api
```

## Get Outputs

```bash
terraform output
terraform output -json
terraform output api_url
```

## Application Deployment

After infrastructure is deployed:

### Container Apps (Two-Phase Deployment)

Container Apps with ACR require a two-phase flow because the app image doesn't exist in ACR during initial `terraform apply`. See the **azure-prepare** skill's `references/services/container-apps/terraform.md` for the full pattern.

```bash
ACR_NAME=$(terraform output -raw acr_name)
ACR_SERVER=$(terraform output -raw acr_login_server)
APP_NAME=$(terraform output -raw container_app_name)
RG_NAME=$(terraform output -raw resource_group_name)

# 1. Build and push the application image to ACR
az acr build --registry $ACR_NAME --image myapp:latest ./src/api

# 2. Configure the registry/identity link (managed identity, no passwords)
az containerapp registry set \
  --name $APP_NAME \
  --resource-group $RG_NAME \
  --server $ACR_SERVER \
  --identity system

# 3. Update the Container App to use the real image
az containerapp update \
  --name $APP_NAME \
  --resource-group $RG_NAME \
  --image $ACR_SERVER/myapp:latest
```

**PowerShell:**
```powershell
$AcrName = terraform output -raw acr_name
$AcrServer = terraform output -raw acr_login_server
$AppName = terraform output -raw container_app_name
$RgName = terraform output -raw resource_group_name

az acr build --registry $AcrName --image myapp:latest ./src/api

az containerapp registry set `
  --name $AppName `
  --resource-group $RgName `
  --server $AcrServer `
  --identity system

az containerapp update `
  --name $AppName `
  --resource-group $RgName `
  --image "$AcrServer/myapp:latest"
```

> ⚠️ **Warning:** Step 2 requires the `AcrPull` role assignment to have propagated (1–5 minutes). If the update fails, wait and retry. See the [RBAC propagation health check](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-deploy-references-pre-deploy-checklist#container-apps--acr--pre-deploy-rbac-health-check).

## References

- [Verification steps](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-deploy-references-recipes-terraform-verify)
- [Error handling](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-deploy/references/recipes/terraform/errors.md)
