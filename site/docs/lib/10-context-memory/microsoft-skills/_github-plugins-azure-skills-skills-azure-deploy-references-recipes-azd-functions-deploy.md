---
title: "Azure Functions Deployment"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-deploy/references/recipes/azd/functions-deploy.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-deploy/references/recipes/azd/functions-deploy.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-deploy/references/recipes/azd/functions-deploy.md"
sourceSha256: "3f616e8f5ea5763581147335544ddd4c8fffcbb7438389863e990c786065ff4b"
pageSha256: "3f616e8f5ea5763581147335544ddd4c8fffcbb7438389863e990c786065ff4b"
contentMode: "local-full"
zh: ""
---

# Azure Functions Deployment

Deployment workflows for Azure Functions using AZD.

## Prerequisites

- Azure Functions project prepared with azd template
- `azure.yaml` exists and validated
- `.azure/deployment-plan.md` status = `Validated`
- Azure Functions Core Tools (optional, for local debugging or when using `func` commands outside azd workflows)

## AZD Deployment

### Full Deployment (Infrastructure + Code)

```bash
# Deploy everything
azd up --no-prompt
```

### Infrastructure Only

```bash
# Provision infrastructure without deploying code
azd provision --no-prompt
```

### Application Only

```bash
# Deploy code to existing infrastructure
azd deploy --no-prompt
```

### Preview Changes

```bash
# Preview changes before deployment
azd provision --preview
```

## Environment Configuration

### Set AZD Environment Variables

These are for azd provisioning, not application runtime:

```bash
azd env set AZURE_LOCATION eastus2
azd env set VNET_ENABLED false
```

> ⚠️ **Important**: `azd env set` sets variables for the azd provisioning process, NOT application environment variables.

## Verify Deployment

### Check Function App Status

```bash
# Show deployment details
azd show
```

## Testing HTTP Endpoints

> ⚠️ **Never use `curl -I` (HEAD) to test Azure Functions endpoints.**
>
> Azure Functions `[HttpTrigger]` with `"get"` does **not** automatically handle HEAD requests. HEAD returns 404 from the routing layer even when GET works correctly, causing false-negative results and misdirected debugging.

### ✅ DO — Use GET with output suppression

```bash
# Check status code only (GET, don't follow redirects)
