---
title: "Deployment Guide: Spring Boot to Azure Container Apps"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-cloud-migrate/references/services/container-apps/spring-deployment-guide.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-cloud-migrate/references/services/container-apps/spring-deployment-guide.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-cloud-migrate/references/services/container-apps/spring-deployment-guide.md"
sourceSha256: "7b6119285dc8e9e3d7402d6c36e821d4db4c9824f6ed5c17c3f43b18db57f5c5"
pageSha256: "7b6119285dc8e9e3d7402d6c36e821d4db4c9824f6ed5c17c3f43b18db57f5c5"
contentMode: "local-full"
zh: ""
---

# Deployment Guide: Spring Boot to Azure Container Apps

## Phase 1: Create Container Apps Environment

**Bash:**
```bash
#!/bin/bash
set -euo pipefail
az group create --name spring-rg --location eastus
az monitor log-analytics workspace create --resource-group spring-rg --workspace-name spring-logs --location eastus
LOG_ID=$(az monitor log-analytics workspace show --resource-group spring-rg --workspace-name spring-logs --query customerId -o tsv)
LOG_KEY=$(az monitor log-analytics workspace get-shared-keys --resource-group spring-rg --workspace-name spring-logs --query primarySharedKey -o tsv)
az containerapp env create --name spring-env --resource-group spring-rg --location eastus --logs-workspace-id "$LOG_ID" --logs-workspace-key "$LOG_KEY"
```

**PowerShell:**
```powershell
az group create --name spring-rg --location eastus
az monitor log-analytics workspace create --resource-group spring-rg --workspace-name spring-logs --location eastus
$LOG_ID = az monitor log-analytics workspace show --resource-group spring-rg --workspace-name spring-logs --query customerId -o tsv
$LOG_KEY = az monitor log-analytics workspace get-shared-keys --resource-group spring-rg --workspace-name spring-logs --query primarySharedKey -o tsv
az containerapp env create --name spring-env --resource-group spring-rg --location eastus --logs-workspace-id "$LOG_ID" --logs-workspace-key "$LOG_KEY"
```

## Phase 2: Configure Logging

**Update application.properties:**
```properties
logging.pattern.console=%d{yyyy-MM-dd HH:mm:ss} - %msg%n
```

Configure diagnostic settings: Azure Monitor Log Analytics (recommended), Event Hubs, or third-party solutions.

## Phase 3: Containerize Application

**Dockerfile:**
```dockerfile
FROM mcr.microsoft.com/openjdk/jdk:21-ubuntu
WORKDIR /app
COPY target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

**Build and push (Bash):**
```bash
ACR_NAME="${ACR_NAME:-<acr>}"
az acr create --name "$ACR_NAME" --resource-group spring-rg --sku Basic --location eastus
az acr login --name "$ACR_NAME"
docker build -t "${ACR_NAME}.azurecr.io/spring-app:v1.0" .
docker push "${ACR_NAME}.azurecr.io/spring-app:v1.0"
```

**Build and push (PowerShell):**
```powershell
$ACR_NAME = if ($env:ACR_NAME) { $env:ACR_NAME } else { "<acr>" }
az acr create --name "$ACR_NAME" --resource-group spring-rg --sku Basic --location eastus
az acr login --name "$ACR_NAME"
docker build -t "${ACR_NAME}.azurecr.io/spring-app:v1.0" .
docker push "${ACR_NAME}.azurecr.io/spring-app:v1.0"
```

## Phase 4: Configure Storage (if needed)

**Azure Files for persistent storage (Bash):**
```bash
