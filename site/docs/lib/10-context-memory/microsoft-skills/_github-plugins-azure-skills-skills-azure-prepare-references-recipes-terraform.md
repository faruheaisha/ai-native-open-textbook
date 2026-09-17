---
title: "Terraform Recipe"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/recipes/terraform/README.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/recipes/terraform/README.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/recipes/terraform/README.md"
sourceSha256: "bf6381025b5b3a84623e53b54e3a6cef3b55734c695b70a18784385188052015"
pageSha256: "bf6381025b5b3a84623e53b54e3a6cef3b55734c695b70a18784385188052015"
contentMode: "local-full"
zh: ""
---

# Terraform Recipe

Terraform workflow for Azure deployments.

> **⚠️ IMPORTANT: Consider azd+Terraform First**
>
> If you're deploying to Azure, you should **default to [azd with Terraform](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-recipes-azd-terraform)** instead of pure Terraform. azd+Terraform gives you:
> - Terraform's IaC capabilities
> - Simple `azd up` deployment workflow
> - Built-in environment management
> - Automatic CI/CD pipeline generation
> - Service orchestration from azure.yaml
>
> → **See [azd+Terraform documentation](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-recipes-azd-terraform)** ←

## When to Use Pure Terraform (Without azd)

Only use pure Terraform workflow when you have specific requirements that prevent using azd:

- **Multi-cloud deployments** where Azure is not the primary target
- **Complex Terraform modules/workspaces** that are incompatible with azd conventions
- **Existing Terraform CI/CD** pipelines that are hard to migrate
- **Organization mandate** for pure Terraform workflow without any wrapper tools
- **Explicitly requested** by the user to use Terraform without azd

## When to Use azd+Terraform Instead

Use azd+Terraform (the default) when:

- **Azure-first deployment** (even if you want multi-cloud IaC)
- Want **`azd up` simplicity** with Terraform IaC
- **Multi-service apps** needing orchestration
- Team wants to learn Terraform with a simpler workflow

→ See [azd+Terraform documentation](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-recipes-azd-terraform)

## Before Generation

**REQUIRED: Research best practices before generating any files.**

| Artifact | Research Action |
|----------|-----------------|
| Terraform patterns | Call `mcp_azure_mcp_azureterraformbestpractices` |
| Azure best practices | Call `mcp_azure_mcp_get_azure_bestpractices` |

## Generation Steps

### 1. Generate Infrastructure

Create Terraform files in `./infra/`.

→ [patterns.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-recipes-terraform-patterns)

**Structure:**
```
infra/
├── main.tf
├── variables.tf
├── outputs.tf
├── terraform.tfvars
├── backend.tf
└── modules/
    └── ...
```

### 2. Set Up State Backend

Azure Storage for remote state.

### 3. Generate Dockerfiles (if containerized)

Manual Dockerfile creation required.

## Output Checklist

| Artifact | Path |
|----------|------|
| Main config | `./infra/main.tf` |
| Variables | `./infra/variables.tf` |
| Outputs | `./infra/outputs.tf` |
| Values | `./infra/terraform.tfvars` |
| Backend | `./infra/backend.tf` |
| Modules | `./infra/modules/` |
| Dockerfiles | `src/<service>/Dockerfile` |

## References

- [Terraform Patterns](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-recipes-terraform-patterns)

## Next

→ Update `.azure/deployment-plan.md` → **azure-validate**
