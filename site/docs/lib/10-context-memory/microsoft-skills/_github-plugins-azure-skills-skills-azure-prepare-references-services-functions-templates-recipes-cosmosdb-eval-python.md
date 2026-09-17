---
title: "Cosmos DB Recipe - Python Eval"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/services/functions/templates/recipes/cosmosdb/eval/python.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/services/functions/templates/recipes/cosmosdb/eval/python.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/services/functions/templates/recipes/cosmosdb/eval/python.md"
sourceSha256: "8674b1e84c2f116a9969b9e5f8700f5bd0d4b93d376a2e6ef20d831585fb7ec0"
pageSha256: "8674b1e84c2f116a9969b9e5f8700f5bd0d4b93d376a2e6ef20d831585fb7ec0"
contentMode: "local-full"
zh: ""
---

# Cosmos DB Recipe - Python Eval

## MCP Template Validation

| Criteria | Expected | Status |
|----------|----------|--------|
| Template discovery | `functions_template_get(language: "python")` returns list | ✅ PASS |
| Filter by resource | `resource == "cosmos"` finds matches | ✅ PASS |
| Template scaffolded | `cosmos-trigger-python-azd` | ✅ PASS |
| Has trigger code | `@app.cosmos_db_trigger` decorator in output | ✅ PASS |
| Has IaC | `projectFiles[]` includes Bicep | ✅ PASS |
| Has RBAC | Cosmos DB Data Contributor role | ✅ PASS |

## Agent Behavior Validation

```text
1. Agent calls: functions_template_get(language: "python")
2. Agent scans templateList.triggers[] descriptions and resource field
3. Agent selects: template where resource == "cosmos" → cosmos-trigger-python-azd
4. Agent calls: functions_template_get(language: "python", template: "cosmos-trigger-python-azd")
5. Agent writes: functionFiles[] + projectFiles[]
```

## Notes

- Template names may vary - use `resource` field or `description` to match
- Never hardcode template names - always discover via list call first

## Test Date

2026-04-22

## Verdict

**PASS** - MCP template provides complete Cosmos DB trigger with IaC, RBAC, and UAMI binding.
