---
title: "Kubernetes to Azure Container Apps - Deployment Guide"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-cloud-migrate/references/services/container-apps/deployment-guide.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-cloud-migrate/references/services/container-apps/deployment-guide.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-cloud-migrate/references/services/container-apps/deployment-guide.md"
sourceSha256: "6f8b12dd4304130c047bdc3595ead127abf3c0957f91b833d15aae7afbf18198"
pageSha256: "6f8b12dd4304130c047bdc3595ead127abf3c0957f91b833d15aae7afbf18198"
contentMode: "local-full"
zh: ""
---

# Kubernetes to Azure Container Apps - Deployment Guide

## Prerequisites

Azure CLI 2.53.0+, kubectl, Docker, Azure subscription, ACR, Key Vault, Log Analytics

## Phase 1: Export Kubernetes Resources

```bash
kubectl get deployments,services,ingress -n <namespace> -o wide
kubectl get configmaps,secrets -n <namespace>
```

### Export Script

```bash
#!/bin/bash
set -euo pipefail
NAMESPACE="${K8S_NAMESPACE:-<namespace>}"
OUTPUT_DIR="${OUTPUT_DIR:-k8s-export}"
mkdir -p "$OUTPUT_DIR"
kubectl get deploy,svc,ingress,configmap,secret -n "$NAMESPACE" -o yaml > "$OUTPUT_DIR/all-resources.yaml"
for deploy in $(kubectl get deploy -n "$NAMESPACE" -o jsonpath='{.items[*].metadata.name}'); do
  kubectl get deployment "$deploy" -n "$NAMESPACE" -o yaml > "$OUTPUT_DIR/deploy-${deploy}.yaml"
done
```

## Phase 2: Assess Compatibility

Load [assessment-guide.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-cloud-migrate-references-services-container-apps-assessment-guide). Check: StatefulSets, DaemonSets, CRDs, resource limits (>4 vCPU/>8 GiB), PVCs, NetworkPolicies.

## Phase 3: Migrate Images

> ⚠️ **Warning:** Azure Container Apps only runs **linux/amd64** images. If you build on Apple Silicon or another ARM host, use `docker buildx build --platform linux/amd64` or `az acr build` (which builds amd64 by default). Verify with <code v-pre>docker inspect &lt;image> --format '{{.Architecture}}'</code>.

### Bash

```bash
#!/bin/bash
set -euo pipefail
ACR_NAME="${ACR_NAME:-<acr>}"
SOURCE_REGISTRY="${SOURCE_REGISTRY:-<registry>}"
az acr login --name "$ACR_NAME"
az acr import --name "$ACR_NAME" --source "${SOURCE_REGISTRY}/app:v1.0" --image app:v1.0
```

### PowerShell

```powershell
$ACR_NAME = if ($env:ACR_NAME) { $env:ACR_NAME } else { "<acr>" }
$SOURCE_REGISTRY = if ($env:SOURCE_REGISTRY) { $env:SOURCE_REGISTRY } else { "<registry>" }
az acr login --name $ACR_NAME
az acr import --name $ACR_NAME --source "${SOURCE_REGISTRY}/app:v1.0" --image app:v1.0
```

## Phase 4: Infrastructure

### Bash

```bash
az group create --name myapp-rg --location eastus
az monitor log-analytics workspace create --resource-group myapp-rg --workspace-name myapp-logs --location eastus
LOG_ID=$(az monitor log-analytics workspace show --resource-group myapp-rg --workspace-name myapp-logs --query customerId -o tsv)
LOG_KEY=$(az monitor log-analytics workspace get-shared-keys --resource-group myapp-rg --workspace-name myapp-logs --query primarySharedKey -o tsv)
az containerapp env create --name myapp-env --resource-group myapp-rg --location eastus --logs-workspace-id "$LOG_ID" --logs-workspace-key "$LOG_KEY"
```

### PowerShell

```powershell
az group create --name myapp-rg --location eastus
az monitor log-analytics workspace create --resource-group myapp-rg --workspace-name myapp-logs --location eastus
$LOG_ID = az monitor log-analytics workspace show --resource-group myapp-rg --workspace-name myapp-logs --query customerId -o tsv
$LOG_KEY = az monitor log-analytics workspace get-shared-keys --resource-group myapp-rg --workspace-name myapp-logs --query primarySharedKey -o tsv
az containerapp env create --name myapp-env --resource-group myapp-rg --location eastus --logs-workspace-id $LOG_ID --logs-workspace-key $LOG_KEY
```

**VNet:** For VNet integration, create VNet first, get subnet ID, then use `--infrastructure-subnet-resource-id` with env create.

## Phase 5: Secrets

> **Tip**: Prefer piping decoded secret values directly to `az keyvault secret set --value` to avoid writing sensitive data to disk.

### Bash

```bash
ACR_NAME="${ACR_NAME:-<acr>}"

# Create Key Vault and migrate secrets (pipe directly — no temp file)
az keyvault create --name myapp-kv --resource-group myapp-rg --location eastus
az keyvault secret set --vault-name myapp-kv --name password --value "$(kubectl get secret mysecret -n <namespace> -o jsonpath='{.data.password}' | base64 -d)"

# Create managed identity and grant permissions
az identity create --name myapp-id --resource-group myapp-rg --location eastus
IDENTITY_ID=$(az identity show --name myapp-id --resource-group myapp-rg --query id -o tsv)
PRINCIPAL_ID=$(az identity show --name myapp-id --resource-group myapp-rg --query principalId -o tsv)
KV_ID=$(az keyvault show --name myapp-kv --resource-group myapp-rg --query id -o tsv)
az role assignment create --assignee "$PRINCIPAL_ID" --role "Key Vault Secrets User" --scope "$KV_ID"
ACR_ID=$(az acr show --name "$ACR_NAME" --query id -o tsv)
az role assignment create --assignee "$PRINCIPAL_ID" --role AcrPull --scope "$ACR_ID"
```

### PowerShell

```powershell
$ACR_NAME = if ($env:ACR_NAME) { $env:ACR_NAME } else { "<acr>" }

# Create Key Vault and migrate secrets (pass directly — no temp file, no BOM issues)
az keyvault create --name myapp-kv --resource-group myapp-rg --location eastus
$secretValue = kubectl get secret mysecret -n <namespace> -o jsonpath='{.data.password}'
$decodedSecretValue = [System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String($secretValue))
az keyvault secret set --vault-name myapp-kv --name password --value $decodedSecretValue
Remove-Variable -Name decodedSecretValue, secretValue -ErrorAction SilentlyContinue

# Create managed identity and grant permissions
az identity create --name myapp-id --resource-group myapp-rg --location eastus
$IDENTITY_ID = az identity show --name myapp-id --resource-group myapp-rg --query id -o tsv
$PRINCIPAL_ID = az identity show --name myapp-id --resource-group myapp-rg --query principalId -o tsv
$KV_ID = az keyvault show --name myapp-kv --resource-group myapp-rg --query id -o tsv
az role assignment create --assignee $PRINCIPAL_ID --role "Key Vault Secrets User" --scope $KV_ID
$ACR_ID = az acr show --name $ACR_NAME --query id -o tsv
az role assignment create --assignee $PRINCIPAL_ID --role AcrPull --scope $ACR_ID
```

## Phase 6: Deploy
