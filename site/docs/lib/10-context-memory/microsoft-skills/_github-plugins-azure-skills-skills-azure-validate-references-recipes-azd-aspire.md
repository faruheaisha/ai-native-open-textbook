---
title: "Aspire Validation"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-validate/references/recipes/azd/aspire.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-validate/references/recipes/azd/aspire.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-validate/references/recipes/azd/aspire.md"
sourceSha256: "f20f7dcfea1c95bc3466d98607e7c572f818163719b94c7087962301a07a0880"
pageSha256: "f20f7dcfea1c95bc3466d98607e7c572f818163719b94c7087962301a07a0880"
contentMode: "local-full"
zh: ""
---

# Aspire Validation

> ⚠️ **Only load this file when the project is a .NET Aspire application.**

Validation steps specific to .NET Aspire projects deployed via AZD.

## Detection

A project is Aspire-based if any of these are true:

| Indicator | Check |
|-----------|-------|
| AppHost project | `find . -name "*.AppHost.csproj"` |
| Aspire.Hosting package | `grep -r "Aspire.Hosting" . --include="*.csproj"` |

**If none found → skip this file entirely.**

---

## Pre-Provisioning: Functions Secret Storage

> ⚠️ **CRITICAL — Must run BEFORE `azd provision`.**

Check if the project uses Azure Functions within Aspire and ensure `AzureWebJobsSecretStorageType` is configured.
See [Aspire Functions Secrets Reference](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-validate-references-aspire-functions-secrets) for detection commands, fix examples, and full details.

**If `AddAzureFunctionsProject` is NOT found**, skip this section.

---

## Post-Provisioning: Container Apps Environment Variables

> ⚠️ **CRITICAL — Run AFTER `azd provision` but BEFORE `azd deploy`.**

When using Aspire with Container Apps in "limited mode" (in-memory infrastructure generation), `azd provision` creates Azure resources but doesn't automatically populate environment variables that `azd deploy` needs.

**Run the helper script** ([scripts/set-aspire-aca-env.sh](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-validate/references/recipes/azd/scripts/set-aspire-aca-env.sh) or [scripts/set-aspire-aca-env.ps1](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-validate/references/recipes/azd/scripts/set-aspire-aca-env.ps1)). It sets `AZURE_CONTAINER_REGISTRY_ENDPOINT`, `AZURE_CONTAINER_REGISTRY_MANAGED_IDENTITY_ID`, and `MANAGED_IDENTITY_CLIENT_ID` (only the ones that are missing).

**bash:**
```bash
