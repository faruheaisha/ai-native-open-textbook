---
title: "AZCLI Recipe"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/recipes/azcli/README.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/recipes/azcli/README.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/recipes/azcli/README.md"
sourceSha256: "024c97398e68f09e2e3204fd71bc4287e3eefcc74c93b0f1c60362281f8c7860"
pageSha256: "024c97398e68f09e2e3204fd71bc4287e3eefcc74c93b0f1c60362281f8c7860"
contentMode: "local-full"
zh: ""
---

# AZCLI Recipe

Azure CLI workflow for imperative Azure deployments.

## When to Use

- Existing az scripts in project
- Need imperative control over deployment
- Custom deployment pipelines
- AKS deployments
- Direct resource manipulation

## Before Generation

**REQUIRED: Research best practices before generating any files.**

| Artifact | Research Action |
|----------|-----------------|
| Bicep files | Call `mcp_bicep_get_bicep_best_practices` |
| Bicep modules | Call `mcp_bicep_list_avm_metadata` and follow [AVM module order](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-recipes-azd-iac-rules#avm-module-selection-order-mandatory) |
| Azure CLI commands | Call `activate_azure_cli_management_tools` |
| Azure best practices | Call `mcp_azure_mcp_get_azure_bestpractices` |

## Generation Steps

### 1. Generate Infrastructure (Bicep)

Create Bicep templates in `./infra/`.

**Structure:**
```
infra/
├── main.bicep
├── main.parameters.json
└── modules/
    └── *.bicep
```

### 2. Generate Deployment Scripts

Create deployment scripts for provisioning.

→ [scripts.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-recipes-azcli-scripts)

### 3. Generate Dockerfiles (if containerized)

Manual Dockerfile creation required.

## Output Checklist

| Artifact | Path |
|----------|------|
| Main Bicep | `./infra/main.bicep` |
| Parameters | `./infra/main.parameters.json` |
| Modules | `./infra/modules/*.bicep` |
| Deploy script | `./scripts/deploy.sh` or `deploy.ps1` |
| Dockerfiles | `src/<service>/Dockerfile` |

## Deployment Commands

See [commands.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-recipes-azcli-commands) for common patterns.

## Naming Convention

Resources: `\{prefix\}\{token\}\{instance\}`
- Alphanumeric only, no special characters
- Prefix ≤3 chars (e.g., `kv` for Key Vault)
- Token = 5 char random string
- Total ≤32 characters

## References

- [Deployment Commands](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-recipes-azcli-commands)
- [Deployment Scripts](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-recipes-azcli-scripts)

## Next

→ Update `.azure/deployment-plan.md` → **azure-validate**
