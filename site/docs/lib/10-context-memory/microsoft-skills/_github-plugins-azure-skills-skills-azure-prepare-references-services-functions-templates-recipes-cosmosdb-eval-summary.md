---
title: "Eval Summary"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/services/functions/templates/recipes/cosmosdb/eval/summary.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/services/functions/templates/recipes/cosmosdb/eval/summary.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/services/functions/templates/recipes/cosmosdb/eval/summary.md"
sourceSha256: "e8722a3adcf169ffc8c4da36a60c931931377a53c73cb7dab417e2904b4040cf"
pageSha256: "e8722a3adcf169ffc8c4da36a60c931931377a53c73cb7dab417e2904b4040cf"
contentMode: "local-full"
zh: ""
---

# Eval Summary

## Coverage Status

| Language | Manifest Templates | Eval | Status |
|----------|-------------------|------|--------|
| Python | 1 (Bicep) | [✅](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-functions-templates-recipes-cosmosdb-eval-python) | ✅ Verified |
| TypeScript | 1 (Bicep) | [✅](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-functions-templates-recipes-cosmosdb-eval-typescript) | ✅ Verified |
| C# (.NET) | 1 (Bicep) | — | 📋 AZD template exists |
| Java | 3 (Bicep) | — | 📋 AZD template exists |
| JavaScript | — | — | ⚠️ No AZD template |
| PowerShell | — | — | ⚠️ No AZD template |

> ⚠️ **Eval cost note:** Each language eval requires ~5 min of agent runtime. Python is verified end-to-end; other languages confirmed in [manifest](https://cdn.functions.azure.com/public/templates-manifest/manifest.json). JavaScript and PowerShell have no Cosmos DB AZD template. Multi-language eval expansion tracked as follow-up.

## MCP Tool Validation

| Test | Status | Details |
|------|--------|---------|
| `functions_template_get` | ✅ PASS | 2 calls via `azure-functions` MCP tool |
| Template Discovery | ✅ PASS | Cosmos templates found via resource filter |
| IaC Included | ✅ PASS | Cosmos Bicep module + RBAC in projectFiles |
| E2E Agent Test | ✅ PASS | 2 `azure-functions` calls per language, templates retrieved and applied |

## Results

| Test | Python | TypeScript |
|------|--------|------------|
| Health | ✅ | ✅ |
| Trigger fires | ✅ | ✅ |
| Change detected | ✅ | ✅ |
| Code Indicator | ✅ `cosmos_db_trigger` | ✅ `app.cosmosDB` |
| Extra Indicator (IaC) | ✅ `Microsoft.DocumentDB` | ✅ `Microsoft.DocumentDB` |
| Template Scaffolded | `cosmos-trigger-python-azd` | `cosmos-trigger-typescript-azd` |

## Notes
