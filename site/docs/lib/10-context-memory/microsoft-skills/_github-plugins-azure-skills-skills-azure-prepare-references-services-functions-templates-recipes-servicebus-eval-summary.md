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
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/services/functions/templates/recipes/servicebus/eval/summary.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/services/functions/templates/recipes/servicebus/eval/summary.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/services/functions/templates/recipes/servicebus/eval/summary.md"
sourceSha256: "9a13ac97ddb2a5495bc4877a44d22e6d0d492aeed649df9bc5c7fc9d1f5ce678"
pageSha256: "9a13ac97ddb2a5495bc4877a44d22e6d0d492aeed649df9bc5c7fc9d1f5ce678"
contentMode: "local-full"
zh: ""
---

# Eval Summary

## Coverage Status

| Language | Manifest Templates | Eval | Status |
|----------|-------------------|------|--------|
| Python | 1 (Bicep) | [✅](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-functions-templates-recipes-servicebus-eval-python) | ✅ Verified |
| TypeScript | 1 (Bicep) | [✅](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-functions-templates-recipes-servicebus-eval-typescript) | ✅ Verified |
| JavaScript | 1 (Bicep) | — | 📋 AZD template exists |
| C# (.NET) | 1 (Bicep) | — | 📋 AZD template exists |
| Java | 1 (Bicep) | — | 📋 AZD template exists |
| PowerShell | 1 (Bicep) | — | 📋 AZD template exists |

> ⚠️ **Eval cost note:** Each language eval requires ~5 min of agent runtime. Python is verified end-to-end; other languages confirmed in [manifest](https://cdn.functions.azure.com/public/templates-manifest/manifest.json). Multi-language eval expansion tracked as follow-up.

## MCP Tool Validation

| Test | Status | Details |
|------|--------|---------|
| `functions_template_get` | ✅ PASS | 2 calls via `azure-functions` MCP tool |
| Template Discovery | ✅ PASS | Templates found via resource filter |
| IaC Included | ✅ PASS | Service Bus Bicep + RBAC in projectFiles |
| E2E Agent Test | ✅ PASS | 2 `azure-functions` calls per language, templates retrieved and applied |

## Results

| Test | Python | TypeScript |
|------|--------|------------|
| Health | ✅ | ✅ |
| Queue message | ✅ | ✅ |
| Output binding | ✅ | ✅ |
| Code Indicator | ✅ `service_bus_queue_trigger` | ✅ `app.serviceBusQueue` |
| Extra Indicator (IaC) | ✅ `Microsoft.ServiceBus` | ✅ `Microsoft.ServiceBus` |
| Template Scaffolded | `servicebus-trigger-python-azd` | `servicebus-trigger-typescript-azd` |

## Notes
