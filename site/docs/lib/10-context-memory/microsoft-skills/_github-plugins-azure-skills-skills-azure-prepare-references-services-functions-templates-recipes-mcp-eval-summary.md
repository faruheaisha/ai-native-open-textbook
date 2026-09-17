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
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/services/functions/templates/recipes/mcp/eval/summary.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/services/functions/templates/recipes/mcp/eval/summary.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/services/functions/templates/recipes/mcp/eval/summary.md"
sourceSha256: "585a786e408bd370a2f660f6b9804e5588f92dcb9e4adc861c917b25a91c2016"
pageSha256: "585a786e408bd370a2f660f6b9804e5588f92dcb9e4adc861c917b25a91c2016"
contentMode: "local-full"
zh: ""
---

# Eval Summary

## Coverage Status

| Language | Manifest Templates | Eval | Status |
|----------|-------------------|------|--------|
| Python | 3 (Bicep) | ✅ | ✅ Verified |
| TypeScript | 2 (Bicep) | — | 📋 AZD template exists |
| C# (.NET) | 2 (Bicep) | — | 📋 AZD template exists |
| Java | 2 (Bicep) | — | 📋 AZD template exists |
| JavaScript | — | — | ⚠️ No AZD template |
| PowerShell | — | — | ⚠️ No AZD template |

> ⚠️ **Eval cost note:** Each language eval requires ~5 min of agent runtime. Python is verified end-to-end; other languages confirmed in [manifest](https://cdn.functions.azure.com/public/templates-manifest/manifest.json). JavaScript and PowerShell have no MCP AZD template. Multi-language eval expansion tracked as follow-up.

## MCP Tool Validation

| Test | Status | Details |
|------|--------|---------|
| `functions_template_get` | ✅ PASS | 2 calls via `azure-functions` MCP tool |
| Template Discovery | ✅ PASS | Templates found via resource filter |
| IaC Included | ✅ PASS | Storage queue config in projectFiles |
| E2E Agent Test | ✅ PASS | 2 `azure-functions` calls, template `mcp-server-remote-python` retrieved and applied |

## Results

| Test | Python |
|------|--------|
| Health | ✅ |
| tools/list | ✅ |
| tools/call | ✅ |

## Notes
