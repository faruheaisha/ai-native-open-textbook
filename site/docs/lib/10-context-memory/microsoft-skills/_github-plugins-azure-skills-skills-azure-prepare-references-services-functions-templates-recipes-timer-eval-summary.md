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
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/services/functions/templates/recipes/timer/eval/summary.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/services/functions/templates/recipes/timer/eval/summary.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/services/functions/templates/recipes/timer/eval/summary.md"
sourceSha256: "df23db959320fc06289545019e61f247e8c030cff6027b2505371b7b3a826c53"
pageSha256: "df23db959320fc06289545019e61f247e8c030cff6027b2505371b7b3a826c53"
contentMode: "local-full"
zh: ""
---

# Eval Summary

## Coverage Status

| Language | Manifest Templates | Eval | Status |
|----------|-------------------|------|--------|
| Python | 1 (Bicep) | ✅ | ✅ Verified |
| TypeScript | 1 (Bicep) | — | 📋 AZD template exists |
| JavaScript | 1 (Bicep) | — | 📋 AZD template exists |
| C# (.NET) | 1 (Bicep) | — | 📋 AZD template exists |
| Java | 1 (Bicep) | — | 📋 AZD template exists |
| PowerShell | 1 (Bicep) | — | 📋 AZD template exists |

> ⚠️ **Eval cost note:** Each language eval requires ~5 min of agent runtime. Python is verified end-to-end; other languages confirmed in [manifest](https://cdn.functions.azure.com/public/templates-manifest/manifest.json). Multi-language eval expansion tracked as follow-up.

## MCP Tool Validation

| Test | Status | Details |
|------|--------|---------|
| `functions_template_get` | ✅ PASS | 2 calls via `azure-functions` MCP tool |
| Template Discovery | ✅ PASS | Timer templates found via resource filter |
| IaC Included | ✅ PASS | Bicep infra/ included in projectFiles |
| E2E Agent Test | ✅ PASS | 2 `azure-functions` calls, template `timer-trigger-python-azd` retrieved and applied |

## Results

| Test | Python |
|------|--------|
| Health | ✅ |
| Timer fires | ✅ |
| Schedule correct | ✅ |

## Notes
