---
title: "CI/CD Deploy Recipe"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-deploy/references/recipes/cicd/README.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-deploy/references/recipes/cicd/README.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-deploy/references/recipes/cicd/README.md"
sourceSha256: "fd97b5fdb1e70a4d1bda962f20fbf096ca6f1ba1a6e7aa409251cc057e56d408"
pageSha256: "fd97b5fdb1e70a4d1bda962f20fbf096ca6f1ba1a6e7aa409251cc057e56d408"
contentMode: "local-full"
zh: ""
---

# CI/CD Deploy Recipe

Deploy to Azure using automated pipelines.

## Prerequisites

- `.azure/deployment-plan.md` exists with status `Validated`
- Azure Service Principal or federated credentials configured
- Pipeline file exists (`.github/workflows/` or `azure-pipelines.yml`)

## GitHub Actions

| Example | Description |
|---------|-------------|
| [github-azd.yml](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-deploy/references/recipes/cicd/examples/github-azd.yml) | AZD deployment workflow |
| [github-bicep.yml](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-deploy/references/recipes/cicd/examples/github-bicep.yml) | Bicep infrastructure deployment |

## Azure DevOps

| Example | Description |
|---------|-------------|
| [azdo-azd.yml](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-deploy/references/recipes/cicd/examples/azdo-azd.yml) | Basic AZD pipeline |
| [azdo-multistage.yml](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-deploy/references/recipes/cicd/examples/azdo-multistage.yml) | Multi-stage with approvals |

## Setup Requirements

### GitHub Actions

1. Create Azure Service Principal with federated credentials
2. Add secrets: `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_SUBSCRIPTION_ID`
3. Add variables: `AZURE_ENV_NAME`, `AZURE_LOCATION`
4. Create environments with protection rules

### Azure DevOps

1. Create Service Connection to Azure
2. Create Variable Groups per environment
3. Create Environments with approval gates

## References

- [Verification steps](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-deploy-references-recipes-cicd-verify)
- [Error handling](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-deploy-references-recipes-cicd-errors)
