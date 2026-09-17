---
title: "Deployment: Cloud Run to Container Apps"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-cloud-migrate/references/services/container-apps/cloudrun-deployment-guide.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-cloud-migrate/references/services/container-apps/cloudrun-deployment-guide.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-cloud-migrate/references/services/container-apps/cloudrun-deployment-guide.md"
sourceSha256: "3c9d52fb9e4d6c6ced006f3ceb8b7234f64d711bc9d5897f79e7d0401e6e17f1"
pageSha256: "3c9d52fb9e4d6c6ced006f3ceb8b7234f64d711bc9d5897f79e7d0401e6e17f1"
contentMode: "local-full"
zh: ""
---

# Deployment: Cloud Run to Container Apps

## Prerequisites

Azure CLI 2.53+, gcloud CLI, Docker, ACR, Key Vault, Log Analytics

## Phase 1: Image Migration

### Bash

```bash
set -euo pipefail
GCP_PROJECT="${GCP_PROJECT:-<project>}"
GCP_REGION="${GCP_REGION:-<region>}"
ACR_NAME="${ACR_NAME:-<acr>}"

gcloud auth configure-docker "${GCP_REGION}-docker.pkg.dev"
az acr login --name "$ACR_NAME"
for img in "app:v1" "worker:v1"; do
  docker pull "${GCP_REGION}-docker.pkg.dev/${GCP_PROJECT}/<repo>/$img"
  docker tag "${GCP_REGION}-docker.pkg.dev/${GCP_PROJECT}/<repo>/$img" "${ACR_NAME}.azurecr.io/$img"
  docker push "${ACR_NAME}.azurecr.io/$img"
done
```

### PowerShell

```powershell
$GCP_PROJECT = if ($env:GCP_PROJECT) { $env:GCP_PROJECT } else { "<project>" }
$GCP_REGION = if ($env:GCP_REGION) { $env:GCP_REGION } else { "<region>" }
$ACR_NAME = if ($env:ACR_NAME) { $env:ACR_NAME } else { "<acr>" }

gcloud auth configure-docker "${GCP_REGION}-docker.pkg.dev"
az acr login --name $ACR_NAME
@("app:v1", "worker:v1") | ForEach-Object {
  docker pull "${GCP_REGION}-docker.pkg.dev/${GCP_PROJECT}/<repo>/$_"
  docker tag "${GCP_REGION}-docker.pkg.dev/${GCP_PROJECT}/<repo>/$_" "${ACR_NAME}.azurecr.io/$_"
  docker push "${ACR_NAME}.azurecr.io/$_"
}
```

## Phase 2: Infrastructure

> Choose ONE path: basic (without VNet) OR VNet-integrated.

### Basic (no VNet)

#### Bash

```bash
set -euo pipefail
az group create --name "$RG" --location "$LOCATION"
az monitor log-analytics workspace create -g "$RG" -n "${RG}-logs" -l "$LOCATION"
LOG_ID=$(az monitor log-analytics workspace show -g "$RG" -n "${RG}-logs" --query customerId -o tsv)
LOG_KEY=$(az monitor log-analytics workspace get-shared-keys -g "$RG" -n "${RG}-logs" --query primarySharedKey -o tsv)
az containerapp env create -n "${RG}-env" -g "$RG" -l "$LOCATION" \
  --logs-workspace-id "$LOG_ID" --logs-workspace-key "$LOG_KEY"
```

#### PowerShell

```powershell
az group create --name $RG --location $LOCATION
az monitor log-analytics workspace create -g $RG -n "${RG}-logs" -l $LOCATION
$workspace = az monitor log-analytics workspace show -g $RG -n "${RG}-logs" | ConvertFrom-Json
$keys = az monitor log-analytics workspace get-shared-keys -g $RG -n "${RG}-logs" | ConvertFrom-Json
az containerapp env create -n "${RG}-env" -g $RG -l $LOCATION `
  --logs-workspace-id $workspace.customerId --logs-workspace-key $keys.primarySharedKey
```

### VNet-Integrated

#### Bash

```bash
set -euo pipefail
az network vnet create -g "$RG" -n "${RG}-vnet" \
  --address-prefix 10.0.0.0/16 --subnet-name aca-subnet --subnet-prefix 10.0.0.0/23
SUBNET_ID=$(az network vnet subnet show -g "$RG" --vnet-name "${RG}-vnet" -n aca-subnet --query id -o tsv)
az containerapp env create -n "${RG}-env" -g "$RG" -l "$LOCATION" \
  --logs-workspace-id "$LOG_ID" --logs-workspace-key "$LOG_KEY" \
  --infrastructure-subnet-resource-id "$SUBNET_ID"
```

#### PowerShell

```powershell
az network vnet create -g $RG -n "${RG}-vnet" `
  --address-prefix 10.0.0.0/16 --subnet-name aca-subnet --subnet-prefix 10.0.0.0/23
$subnet = az network vnet subnet show -g $RG --vnet-name "${RG}-vnet" -n aca-subnet | ConvertFrom-Json
az containerapp env create -n "${RG}-env" -g $RG -l $LOCATION `
  --logs-workspace-id $workspace.customerId --logs-workspace-key $keys.primarySharedKey `
  --infrastructure-subnet-resource-id $subnet.id
```

## Phase 3: Secrets & Identity

### Bash

```bash
set -euo pipefail
az keyvault create --name "$KEY_VAULT" -g "$RG" -l "$LOCATION"
IDENTITY_ID=$(az identity create -n "${RG}-id" -g "$RG" -l "$LOCATION" --query id -o tsv)
PRINCIPAL_ID=$(az identity show --ids "$IDENTITY_ID" --query principalId -o tsv)

# Grant Key Vault access — use RBAC (recommended) or access policies
# Option A: RBAC (default for new vaults)
KV_ID=$(az keyvault show --name "$KEY_VAULT" --query id -o tsv)
az role assignment create --assignee "$PRINCIPAL_ID" \
  --role "Key Vault Secrets User" --scope "$KV_ID"
# Option B: Access policies (if vault uses access-policy mode)
# az keyvault set-policy --name "$KEY_VAULT" --object-id "$PRINCIPAL_ID" --secret-permissions get list

# Migrate secrets without writing them to disk
