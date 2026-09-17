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
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/services/functions/templates/recipes/blob-eventgrid/eval/summary.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/services/functions/templates/recipes/blob-eventgrid/eval/summary.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/services/functions/templates/recipes/blob-eventgrid/eval/summary.md"
sourceSha256: "dd04282d3c2328cd190a0f186303fa980d44176bf35d443a2be9516543f9554a"
pageSha256: "dd04282d3c2328cd190a0f186303fa980d44176bf35d443a2be9516543f9554a"
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
| Template Discovery | ✅ PASS | Templates found via resource filter |
| IaC Included | ✅ PASS | EventGrid + Storage Bicep in projectFiles |
| E2E Agent Test | ✅ PASS | 2 `azure-functions` calls, template `blob-eventgrid-trigger-python-azd` retrieved and applied |

## IaC Validation

| IaC Type | File | Syntax | Policy Compliant | Status |
|----------|------|--------|------------------|--------|
| Bicep | blob.bicep | ✅ | ✅ | PASS |
| Terraform | blob.tf | ✅ | ✅ | PASS |

## Deployment Validation

| Test | Status | Details |
|------|--------|---------|
| AZD Template Init | ✅ PASS | `functions-quickstart-python-azd-eventgrid-blob` |
| AZD Provision | ✅ PASS | Resources created in `rg-blob-eval` |
| AZD Deploy | ✅ PASS | Function deployed to `func-mtgqcoepn4p3w` |
| HTTP Response | ✅ PASS | HTTP 200 from function endpoint |
| Event Grid Topic | ✅ PASS | `eventgridpdftopic` created |
| Storage Account | ✅ PASS | RBAC-only storage provisioned |

## Results

| Test | Python |
|------|--------|
| Health | ✅ |
| Blob trigger | ✅ |
| EventGrid event | ✅ |
| Copy to processed | ✅ |

## Notes
