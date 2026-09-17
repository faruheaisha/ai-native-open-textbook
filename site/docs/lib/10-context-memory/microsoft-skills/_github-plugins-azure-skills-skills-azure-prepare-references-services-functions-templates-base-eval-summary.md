---
title: "Base HTTP Template - Eval Summary"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/services/functions/templates/base/eval/summary.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/services/functions/templates/base/eval/summary.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/services/functions/templates/base/eval/summary.md"
sourceSha256: "559a7813f31ba06c1f5b9e150a01e07a759026dab0ef8c703c988ccff12ae984"
pageSha256: "559a7813f31ba06c1f5b9e150a01e07a759026dab0ef8c703c988ccff12ae984"
contentMode: "local-full"
zh: ""
---

# Base HTTP Template - Eval Summary

## Coverage Status

| Language | Manifest Templates | Eval | Status |
|----------|-------------------|------|--------|
| Python | 5 (Bicep + TF) | [✅](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-functions-templates-base-eval-python) | ✅ Verified |
| TypeScript | 2 (Bicep) | [✅](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-functions-templates-base-eval-typescript) | ✅ Verified |
| JavaScript | 2 (Bicep) | — | 📋 AZD template exists |
| C# (.NET) | 4 (Bicep + TF) | — | 📋 AZD template exists |
| Java | 2 (Bicep) | — | 📋 AZD template exists |
| PowerShell | 1 (Bicep) | — | 📋 AZD template exists |

> ⚠️ **Eval cost note:** Each language × trigger eval requires ~5 min of agent runtime. Full matrix (6 languages × 9 triggers) = ~4.5 hours of CI. Python is verified end-to-end; other languages are confirmed available in the [functions template manifest](https://cdn.functions.azure.com/public/templates-manifest/manifest.json) (70 templates, 6 languages). Multi-language eval expansion tracked as follow-up.

## MCP Tool Validation

| Test | Status | Details |
|------|--------|---------|
| `functions_template_get` | ✅ PASS | 2 calls via `azure-functions` MCP tool |
| Template Discovery | ✅ PASS | HTTP templates found for all languages |
| IaC Included | ✅ PASS | Bicep/Terraform infra/ included in projectFiles |
| E2E Agent Test | ✅ PASS | 2 `azure-functions` calls per language, templates retrieved and applied |

## Results

| Test | Python | TypeScript |
|------|--------|------------|
| Syntax Valid | ✅ | ✅ |
| Health Endpoint | ✅ | ✅ |
| HTTP Trigger | ✅ | ✅ |
| Code Indicator | ✅ `app.route` | ✅ `app.http` |
| Template Scaffolded | `http-trigger-python-azd` | `http-trigger-typescript-azd` |

## Notes
