---
title: "Bicep Recipe"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/recipes/bicep/README.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/recipes/bicep/README.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/recipes/bicep/README.md"
sourceSha256: "accfe5879becb188b3c520850d2a306e64c610fa25baac2bc440578f08a1dff9"
pageSha256: "accfe5879becb188b3c520850d2a306e64c610fa25baac2bc440578f08a1dff9"
contentMode: "local-full"
zh: ""
---

# Bicep Recipe

Standalone Bicep workflow (without AZD).

## When to Use

- IaC-first approach
- No CLI wrapper needed
- Direct ARM deployment control
- Existing Bicep modules to reuse
- Custom deployment orchestration

## Before Generation

**REQUIRED: Research best practices before generating any files.**

| Artifact | Research Action |
|----------|-----------------|
| Bicep files | Call `mcp_bicep_get_bicep_best_practices` |
| Bicep modules | Call `mcp_bicep_list_avm_metadata` and follow [AVM module order](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-recipes-azd-iac-rules#avm-module-selection-order-mandatory) |
| Resource schemas | Use `activate_azure_resource_schema_tools` if needed |

## Generation Steps

### 1. Generate Infrastructure

Create Bicep templates in `./infra/`.

→ [patterns.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-recipes-bicep-patterns)

**Structure:**
```
infra/
├── main.bicep
├── main.parameters.json
└── modules/
    ├── container-app.bicep
    ├── storage.bicep
    └── ...
```

### 2. Generate Dockerfiles (if containerized)

Manual Dockerfile creation required.

## Output Checklist

| Artifact | Path |
|----------|------|
| Main Bicep | `./infra/main.bicep` |
| Parameters | `./infra/main.parameters.json` |
| Modules | `./infra/modules/*.bicep` |
| Dockerfiles | `src/<service>/Dockerfile` |

## References

- [Bicep Patterns](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-recipes-bicep-patterns)

## Next

→ Update `.azure/deployment-plan.md` → **azure-validate**
