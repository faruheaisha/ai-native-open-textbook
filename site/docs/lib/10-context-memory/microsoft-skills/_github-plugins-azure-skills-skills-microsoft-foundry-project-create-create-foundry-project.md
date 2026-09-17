---
title: "Create Microsoft Foundry Project"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/project/create/create-foundry-project.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/project/create/create-foundry-project.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/project/create/create-foundry-project.md"
sourceSha256: "f0762652e9bd794d36b409e6260abe440d74a68fc71409e4215c7c77e147a164"
pageSha256: "f0762652e9bd794d36b409e6260abe440d74a68fc71409e4215c7c77e147a164"
contentMode: "local-full"
zh: ""
---

# Create Microsoft Foundry Project

Create a new Microsoft Foundry project using azd. Provisions: Foundry account, project, Application Insights, managed identity, and RBAC permissions. Optionally enables hosted-agent deployment (adds an Azure Container Registry, and — only when the **Standard Setup** capability-host flag is also enabled — a `capabilityHosts/agents` resource).

**Table of Contents:** [Prerequisites](#prerequisites) · [Workflow](#workflow) · [Best Practices](#best-practices) · [Troubleshooting](#troubleshooting) · [Related Skills](#related-skills) · [Resources](#resources)

## Prerequisites

Run checks in order. STOP on any failure and resolve before proceeding.

**1. Azure CLI** — `az version` → expects version output. If missing: https://aka.ms/installazurecli

**2. Azure login & subscription:**

```bash
az account show --query "{Name:name, SubscriptionId:id, State:state}" -o table
```

If not logged in, run `az login`. If no active subscription: https://azure.microsoft.com/free/ — STOP.

If multiple subscriptions, ask which to use, then `az account set --subscription "<id>"`.

**3. Role permissions:**

```bash
az role assignment list --assignee "$(az ad signed-in-user show --query id -o tsv)" --include-groups --include-inherited --scope "/subscriptions/$(az account show --query id -o tsv)" --query "[?contains(roleDefinitionName, 'Owner') || contains(roleDefinitionName, 'Contributor') || contains(roleDefinitionName, 'Foundry')].{Role:roleDefinitionName, Scope:scope}" -o table
```

Requires Owner, Contributor, or Foundry Owner. If insufficient — STOP, request elevated access from admin.

**4. Azure Developer CLI** — `azd version`. If missing: https://aka.ms/azure-dev/install

## Workflow

### Step 1: Verify azd login

```bash
azd auth login --check-status
```

If not logged in, run `azd auth login` and complete browser auth.

### Step 2: Resolve Project Details

Collect only values the user has not already provided. For values not specified, use defaults:

1. **Project name** — used as azd environment name and resource group (`rg-<name>`). Must contain only alphanumeric characters and hyphens.
   - If the user provided a name, use it as-is.
   - If the user did NOT provide a name, **auto-generate a unique name** using the pattern `ai-project-<random>` where `<random>` is a short random suffix (6-8 lowercase alphanumeric characters). Generate the suffix with a platform-appropriate method:
     ```bash
     # bash/zsh
     echo "ai-project-$(openssl rand -hex 4)"
     ```
     ```powershell
     # PowerShell
     "ai-project-$(-join ((48..57)+(97..122) | Get-Random -Count 8 | ForEach-Object \{[char]$_\}))"
     ```
   - Show the generated name to the user before proceeding, but do not block on confirmation — proceed unless the user objects.
   - Examples: `ai-project-3f8a1b2c`, `my-ai-project`, `dev-agents`
2. **Azure location** (optional) — defaults to North Central US
3. **Enable hosted agents?** (yes/no) — enables hosted-agent deployment and provisions an Azure Container Registry. A capability host (`capabilityHosts/agents`, used by Foundry's **Standard Agent Setup** for bring-your-own storage) is also created only when `ENABLE_CAPABILITY_HOST=true`. Defaults to no. See [Step 3](#step-3-create-directory-and-initialize) for how the two flags interact.

### Step 3: Create Directory and Initialize

```bash
