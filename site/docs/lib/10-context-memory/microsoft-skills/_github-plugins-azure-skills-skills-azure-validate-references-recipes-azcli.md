---
title: "AZCLI Validation"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-validate/references/recipes/azcli/README.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-validate/references/recipes/azcli/README.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-validate/references/recipes/azcli/README.md"
sourceSha256: "36911897007920702bcc2f9e13c91b332babab041288f636cd88e9830de9ff38"
pageSha256: "36911897007920702bcc2f9e13c91b332babab041288f636cd88e9830de9ff38"
contentMode: "local-full"
zh: ""
---

# AZCLI Validation

Validation steps for Azure CLI deployments.

## Prerequisites

- `./infra/main.bicep` exists
- Docker available (if containerized)

## Validation Steps

- [ ] 1. Core Validation (CLI, auth, build, validate, what-if) — run [`validate-deployment` script](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-validate/references/recipes/scripts/validate-deployment.sh)
- [ ] 2. Docker Build (if containerized)
- [ ] 3. Azure Policy Validation

## Validation Details

### 1. Core Validation Script

The core validation checks are a fixed, deterministic sequence. Run the shared
**validate-deployment** helper instead of executing and parsing each command by hand. It
confirms the Azure CLI is installed and authenticated, compiles the Bicep template
(`az bicep build`), validates it against the target scope (`az deployment ... validate`),
and runs a what-if preview — printing a compact PASS/FAIL summary plus a what-if change
count (Create/Modify/Delete).

- Bash: [`../scripts/validate-deployment.sh`](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-validate/references/recipes/scripts/validate-deployment.sh)
- PowerShell: [`../scripts/validate-deployment.ps1`](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-validate/references/recipes/scripts/validate-deployment.ps1)

**Subscription scope:**

```bash
../scripts/validate-deployment.sh --scope sub --location &lt;location>
```
```powershell
../scripts/validate-deployment.ps1 -Scope sub -Location &lt;location>
```

**Resource group scope:**

```bash
