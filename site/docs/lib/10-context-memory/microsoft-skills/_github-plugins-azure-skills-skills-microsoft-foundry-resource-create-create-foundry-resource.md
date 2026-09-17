---
title: "Create Foundry Resource"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/resource/create/create-foundry-resource.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/resource/create/create-foundry-resource.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/resource/create/create-foundry-resource.md"
sourceSha256: "bd41d96849cf503db674ada7d79e4e82224a0f4a4aa5f4a357acc422abd5defc"
pageSha256: "bd41d96849cf503db674ada7d79e4e82224a0f4a4aa5f4a357acc422abd5defc"
contentMode: "local-full"
zh: ""
---

# Create Foundry Resource

This sub-skill orchestrates creation of Azure AI Services multi-service resources using Azure CLI.

> **Important:** All resource creation operations are **control plane (management)** operations. Use **Azure CLI commands** as the primary method.

> **Note:** For monitoring resource usage and quotas, use the `microsoft-foundry:quota` skill.

**Table of Contents:** [Quick Reference](#quick-reference) · [When to Use](#when-to-use) · [Prerequisites](#prerequisites) · [Core Workflows](#core-workflows) · [Important Notes](#important-notes) · [Additional Resources](#additional-resources)

## Quick Reference

| Property | Value |
|----------|-------|
| **Classification** | WORKFLOW SKILL |
| **Operation Type** | Control Plane (Management) |
| **Primary Method** | Azure CLI: `az cognitiveservices account create` |
| **Resource Type** | `Microsoft.CognitiveServices/accounts` (kind: `AIServices`) |
| **Resource Kind** | `AIServices` (multi-service) |

## When to Use

Use this sub-skill when you need to:

- **Create Foundry resource** - Provision new Azure AI Services multi-service account
- **Create resource group** - Set up resource group before creating resources
- **Register resource provider** - Enable Microsoft.CognitiveServices provider
- **Manual resource creation** - CLI-based resource provisioning

**Do NOT use for:**
- Creating ML workspace hubs/projects (use `microsoft-foundry:project/create`)
- Deploying AI models (use `microsoft-foundry:models/deploy`)
- Managing RBAC permissions (use `microsoft-foundry:rbac`)
- Monitoring resource usage (use `microsoft-foundry:quota`)

## Prerequisites

- **Azure subscription** - Active subscription ([create free account](https://azure.microsoft.com/pricing/purchase-options/azure-account))
- **Azure CLI** - Version 2.0 or later installed
- **Authentication** - Run `az login` before commands
- **RBAC roles** - One of:
  - Contributor
  - Owner
  - Custom role with `Microsoft.CognitiveServices/accounts/write`
- **Resource provider** - `Microsoft.CognitiveServices` must be registered in your subscription
  - If not registered, see [Workflow #3: Register Resource Provider](#3-register-resource-provider)
  - If you lack permissions, ask a subscription Owner/Contributor to register it or grant you `/register/action` privilege

> **Need RBAC help?** See [microsoft-foundry:rbac](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-rbac-rbac) for permission management.

## Core Workflows

### 1. Create Resource Group

**Command Pattern:** "Create a resource group for my Foundry resources"

#### Steps

1. **Ask user preference**: Use existing or create new resource group
2. **If using existing**: List and let user select from available groups (0-4: show all, 5+: show 5 most recent with "Other" option)
3. **If creating new**: Ask user to choose region, then create

```bash
# List existing resource groups
az group list --query "[-5:].{Name:name, Location:location}" --out table

# Or create new
