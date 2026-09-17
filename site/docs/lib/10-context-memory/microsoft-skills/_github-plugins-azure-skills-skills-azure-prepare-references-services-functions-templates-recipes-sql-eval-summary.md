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
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/services/functions/templates/recipes/sql/eval/summary.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/services/functions/templates/recipes/sql/eval/summary.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/services/functions/templates/recipes/sql/eval/summary.md"
sourceSha256: "1555d48200f2908d8d2211887c21d7d25b78f249d5b7dc822146fd73e848dd40"
pageSha256: "1555d48200f2908d8d2211887c21d7d25b78f249d5b7dc822146fd73e848dd40"
contentMode: "local-full"
zh: ""
---

# Eval Summary

## Coverage Status

| Language | Manifest Templates | Eval | Status |
|----------|-------------------|------|--------|
| Python | 1 (Bicep) | ✅ | ✅ Verified |
| TypeScript | 1 (Bicep) | — | 📋 AZD template exists |
| C# (.NET) | 1 (Bicep) | — | 📋 AZD template exists |
| Java | — | — | ⚠️ No AZD template |
| JavaScript | — | — | ⚠️ No AZD template |
| PowerShell | — | — | ⚠️ No AZD template |

> ⚠️ **Eval cost note:** Each language eval requires ~5 min of agent runtime. Python is verified end-to-end; other languages confirmed in [manifest](https://cdn.functions.azure.com/public/templates-manifest/manifest.json). Java, JavaScript, and PowerShell have no SQL AZD template. Multi-language eval expansion tracked as follow-up.

## MCP Tool Validation

| Test | Status | Details |
|------|--------|---------|
| `functions_template_get` | ✅ PASS | 2 calls via `azure-functions` MCP tool |
| Template Discovery | ✅ PASS | Templates found via resource filter |
| IaC Included | ✅ PASS | SQL Server Bicep + RBAC in projectFiles |
| E2E Agent Test | ✅ PASS | 2 `azure-functions` calls, template `sql-trigger-python-azd` retrieved and applied |

## IaC Validation

| IaC Type | File | Syntax | Policy Compliant | Status |
|----------|------|--------|------------------|--------|
| Bicep | sql.bicep | ✅ | ✅ | PASS |
| Terraform | sql.tf | ✅ | ✅ | PASS |

## Deployment Validation

| Test | Status | Details |
|------|--------|---------|
| AZD Template Init | ✅ PASS | `functions-quickstart-python-azd-sql` |
| AZD Provision | ✅ PASS | Resources created in `rg-sql-eval` |
| AZD Deploy | ✅ PASS | Function deployed to `func-api-arkwcvhvbkqwc` |
| HTTP Response | ✅ PASS | HTTP 200 from function endpoint |
| SQL Server | ✅ PASS | `sql-arkwcvhvbkqwc` with Entra-only auth |
| SQL Database | ✅ PASS | `ToDo` database created |

## Results

| Test | Python |
|------|--------|
| Health | ✅ |
| SQL trigger | ✅ |
| SQL output | ✅ |

## Notes
