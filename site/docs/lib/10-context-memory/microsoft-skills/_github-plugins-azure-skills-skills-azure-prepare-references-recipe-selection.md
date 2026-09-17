---
title: "Recipe Selection"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/recipe-selection.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/recipe-selection.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/recipe-selection.md"
sourceSha256: "af08750e421f7a5d3a25f14e5c2478ca708f455d9c0e84aaec9f1ac23601c6bc"
pageSha256: "af08750e421f7a5d3a25f14e5c2478ca708f455d9c0e84aaec9f1ac23601c6bc"
contentMode: "local-full"
zh: ""
---

# Recipe Selection

Choose the deployment recipe based on project needs and existing tooling.

## ⛔ Special Cases: Detect First

**Before selecting a recipe, check for these special project types:**

| Project Type | Detection | Recipe Selection |
|--------------|-----------|------------------|
| **.NET Aspire** | `*.AppHost.csproj` or `Aspire.Hosting` package | **AZD (auto via `azd init --from-code`)** → [aspire.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-aspire) |

> 💡 **Tip:** .NET Aspire projects always use AZD recipe with auto-generated configuration. Do not manually select recipe or create artifacts.

## Quick Decision

**Default: AZD** unless specific requirements indicate otherwise.

> 💡 **Tip:** azd supports both Bicep and Terraform as IaC providers. When Terraform is mentioned for Azure deployment, **default to azd+Terraform** for the best developer experience.

## Decision Criteria

| Choose | When |
|--------|------|
| **AZD (Bicep)** | New projects, multi-service apps, want simplest deployment (`azd up`) |
| **AZD (Terraform)** | **DEFAULT for Terraform** - Want Terraform IaC + azd simplicity, Azure deployment with Terraform |
| **AZCLI** | Existing az scripts, need imperative control, custom pipelines, AKS |
| **Bicep** | IaC-first approach, no CLI wrapper needed, direct ARM deployment |
| **Terraform** | Multi-cloud deployments (non-Azure-first), complex TF workflows incompatible with azd, explicitly requested |

## Auto-Detection

| Found in Workspace | Suggested Recipe |
|--------------------|------------------|
| `azure.yaml` with `infra.provider: terraform` | AZD (Terraform) |
| `azure.yaml` (Bicep or no provider specified) | AZD (Bicep) |
| `*.tf` files (no azure.yaml) | **AZD (Terraform) - DEFAULT** (unless multi-cloud) |
| `infra/*.bicep` (no azure.yaml) | Bicep or AZCLI |
| Existing `az` scripts | AZCLI |
| None | AZD (Bicep) - default |

## Recipe Comparison

| Feature | AZD (Bicep) | AZD (Terraform) | AZCLI | Bicep | Terraform |
|---------|-------------|-----------------|-------|-------|-----------|
| Config file | azure.yaml | azure.yaml + *.tf | scripts | *.bicep | *.tf |
| IaC language | Bicep | Terraform | N/A | Bicep | Terraform |
| Deploy command | `azd up` | `azd up` | `az` commands | `az deployment` | `terraform apply` |
| Dockerfile gen | Auto | Auto | Manual | Manual | Manual |
| Environment mgmt | Built-in | Built-in | Manual | Manual | Workspaces |
| CI/CD gen | Built-in | Built-in | Manual | Manual | Manual |
| Multi-cloud | No | Yes | No | No | Yes |
| Learning curve | Low | Low-Medium | Medium | Medium | Medium |

## Record Selection

Document in `.azure/deployment-plan.md`:

```markdown
## Recipe: AZD (Terraform)

**Rationale:**
- Team has Terraform expertise
- Want multi-cloud IaC flexibility
- But prefer azd's simple deployment workflow
- Multi-service app (API + Web)
```

Or for pure Terraform:

```markdown
## Recipe: Terraform

**Rationale:**
- Multi-cloud deployment (AWS + Azure)
- Complex Terraform modules incompatible with azd conventions
- Existing Terraform CI/CD pipeline
```

## Recipe References

- [AZD Recipe](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-recipes-azd)
- [AZCLI Recipe](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-recipes-azcli)
- [Bicep Recipe](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-recipes-bicep)
- [Terraform Recipe](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-recipes-terraform)
