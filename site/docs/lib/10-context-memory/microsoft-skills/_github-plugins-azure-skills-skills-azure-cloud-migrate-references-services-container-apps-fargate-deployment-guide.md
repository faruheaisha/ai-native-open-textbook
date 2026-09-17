---
title: "Deployment: Fargate to Container Apps"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-cloud-migrate/references/services/container-apps/fargate-deployment-guide.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-cloud-migrate/references/services/container-apps/fargate-deployment-guide.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-cloud-migrate/references/services/container-apps/fargate-deployment-guide.md"
sourceSha256: "9d279c616125ba77956be40d61b83f35f7b4e3043a76d990032d3b6700ca2243"
pageSha256: "9d279c616125ba77956be40d61b83f35f7b4e3043a76d990032d3b6700ca2243"
contentMode: "local-full"
zh: ""
---

# Deployment: Fargate to Container Apps

## Prerequisites

Azure CLI 2.53+ with `containerapp` extension, AWS CLI v2, Docker, ACR, Key Vault, Log Analytics

## Phase 1: Container Registry Migration

```bash
set -euo pipefail
aws ecr get-login-password --region "$AWS_REGION" | \
  docker login --username AWS --password-stdin "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"
az acr login --name "$ACR_NAME"
docker pull "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${IMAGE}"
docker tag "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${IMAGE}" "${ACR_NAME}.azurecr.io/${IMAGE}"
docker push "${ACR_NAME}.azurecr.io/${IMAGE}"
```

```powershell
$ErrorActionPreference = 'Stop'
$ecrPassword = aws ecr get-login-password --region $env:AWS_REGION
$ecrPassword | docker login --username AWS --password-stdin "$($env:AWS_ACCOUNT_ID).dkr.ecr.$($env:AWS_REGION).amazonaws.com"
az acr login --name $env:ACR_NAME
docker pull "$($env:AWS_ACCOUNT_ID).dkr.ecr.$($env:AWS_REGION).amazonaws.com/$($env:IMAGE)"
docker tag "$($env:AWS_ACCOUNT_ID).dkr.ecr.$($env:AWS_REGION).amazonaws.com/$($env:IMAGE)" "$($env:ACR_NAME).azurecr.io/$($env:IMAGE)"
docker push "$($env:ACR_NAME).azurecr.io/$($env:IMAGE)"
```

## Phase 2: Infrastructure

> Choose ONE path: basic (without VNet) OR VNet-integrated.

### Basic (no VNet)

```bash
set -euo pipefail
az group create --name "$RG" --location "$LOCATION"
az monitor log-analytics workspace create -g "$RG" -n "${RG}-logs" -l "$LOCATION"
LOG_ID=$(az monitor log-analytics workspace show -g "$RG" -n "${RG}-logs" --query customerId -o tsv)
# Keyless (recommended): avoids handling the shared key entirely
az containerapp env create -n "${RG}-env" -g "$RG" -l "$LOCATION" \
  --logs-destination azure-monitor --logs-workspace-id "$LOG_ID"
# Fallback: use shared key if azure-monitor destination is not available
# LOG_KEY=$(az monitor log-analytics workspace get-shared-keys -g "$RG" -n "${RG}-logs" --query primarySharedKey -o tsv)
# az containerapp env create -n "${RG}-env" -g "$RG" -l "$LOCATION" \
#   --logs-workspace-id "$LOG_ID" --logs-workspace-key "$LOG_KEY"
```

```powershell
$ErrorActionPreference = 'Stop'
az group create --name $env:RG --location $env:LOCATION
az monitor log-analytics workspace create -g $env:RG -n "$($env:RG)-logs" -l $env:LOCATION
$logId = az monitor log-analytics workspace show -g $env:RG -n "$($env:RG)-logs" --query customerId -o tsv
# Keyless (recommended): avoids handling the shared key entirely
az containerapp env create -n "$($env:RG)-env" -g $env:RG -l $env:LOCATION `
  --logs-destination azure-monitor --logs-workspace-id $logId
# Fallback: use shared key if azure-monitor destination is not available
# $logKey = az monitor log-analytics workspace get-shared-keys -g $env:RG -n "$($env:RG)-logs" --query primarySharedKey -o tsv
# az containerapp env create -n "$($env:RG)-env" -g $env:RG -l $env:LOCATION `
#   --logs-workspace-id $logId --logs-workspace-key $logKey
```

### VNet-Integrated

```bash
set -euo pipefail
az group create --name "$RG" --location "$LOCATION"
az monitor log-analytics workspace create -g "$RG" -n "${RG}-logs" -l "$LOCATION"
LOG_ID=$(az monitor log-analytics workspace show -g "$RG" -n "${RG}-logs" --query customerId -o tsv)
az network vnet create -g "$RG" -n "${RG}-vnet" \
  --address-prefix 10.0.0.0/16 --subnet-name aca-subnet --subnet-prefix 10.0.0.0/23
SUBNET_ID=$(az network vnet subnet show -g "$RG" --vnet-name "${RG}-vnet" -n aca-subnet --query id -o tsv)
az containerapp env create -n "${RG}-env" -g "$RG" -l "$LOCATION" \
  --logs-destination azure-monitor --logs-workspace-id "$LOG_ID" \
  --infrastructure-subnet-resource-id "$SUBNET_ID"
```

```powershell
$ErrorActionPreference = 'Stop'
az group create --name $env:RG --location $env:LOCATION
az monitor log-analytics workspace create -g $env:RG -n "$($env:RG)-logs" -l $env:LOCATION
$logId = az monitor log-analytics workspace show -g $env:RG -n "$($env:RG)-logs" --query customerId -o tsv
az network vnet create -g $env:RG -n "$($env:RG)-vnet" `
  --address-prefix 10.0.0.0/16 --subnet-name aca-subnet --subnet-prefix 10.0.0.0/23
$subnet = az network vnet subnet show -g $env:RG --vnet-name "$($env:RG)-vnet" -n aca-subnet | ConvertFrom-Json
az containerapp env create -n "$($env:RG)-env" -g $env:RG -l $env:LOCATION `
  --logs-destination azure-monitor --logs-workspace-id $logId `
  --infrastructure-subnet-resource-id $subnet.id
```

## Phase 3: Secrets & Identity

```bash
set -euo pipefail
az keyvault create --name "$KEY_VAULT" -g "$RG" -l "$LOCATION" \
  --enable-rbac-authorization true
IDENTITY_ID=$(az identity create -n "${RG}-id" -g "$RG" -l "$LOCATION" --query id -o tsv)
PRINCIPAL_ID=$(az identity show --ids "$IDENTITY_ID" --query principalId -o tsv)

# Grant Key Vault access — use RBAC (recommended) or access policies
# Option A: RBAC (enabled on the vault created above)
KV_ID=$(az keyvault show --name "$KEY_VAULT" --query id -o tsv)
az role assignment create --assignee "$PRINCIPAL_ID" \
  --role "Key Vault Secrets User" --scope "$KV_ID"
# Option B: Access policies (if vault uses access policy mode)
# az keyvault set-policy --name "$KEY_VAULT" --object-id "$PRINCIPAL_ID" --secret-permissions get list

# Migrate secrets more safely: avoid passing the secret as a CLI argument.
# Use a locked-down temporary file, import with --file, and remove it immediately.
# Do not run this in shared, monitored, or recorded environments.
umask 077
secret_file="$(mktemp)"
trap 'rm -f "$secret_file"' EXIT
