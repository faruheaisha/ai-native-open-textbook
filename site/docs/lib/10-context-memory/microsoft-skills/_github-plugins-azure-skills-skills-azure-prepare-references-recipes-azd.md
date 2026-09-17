---
title: "AZD Recipe"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/recipes/azd/README.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/recipes/azd/README.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/recipes/azd/README.md"
sourceSha256: "1975b16b097759f41f798e35912b9172c635e1ae7270c93426736209454056d2"
pageSha256: "1975b16b097759f41f798e35912b9172c635e1ae7270c93426736209454056d2"
contentMode: "local-full"
zh: ""
---

# AZD Recipe

Azure Developer CLI workflow for preparing Azure deployments.

## When to Use

- New projects, multi-service apps, want `azd up`
- Need environment management, auto-generated CI/CD
- Team prefers simplified deployment workflow

> 💡 **Tip:** azd supports both Bicep and Terraform as IaC providers. Choose based on your team's expertise and requirements.

## IaC Provider Options

| Provider | Use When |
|----------|----------|
| **Bicep** (default) | Azure-only, no existing IaC, want simplest setup |
| **Terraform** | Multi-cloud IaC, existing TF expertise, want azd simplicity |

**For Terraform with azd:** See [terraform.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-recipes-azd-terraform)

## Before Generation

**REQUIRED: Research best practices before generating any files.**

### Check for Existing Codebase Patterns
