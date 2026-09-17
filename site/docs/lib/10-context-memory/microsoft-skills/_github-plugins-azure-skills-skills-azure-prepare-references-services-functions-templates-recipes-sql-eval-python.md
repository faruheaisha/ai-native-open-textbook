---
title: "sql Recipe - Python Eval"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/services/functions/templates/recipes/sql/eval/python.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/services/functions/templates/recipes/sql/eval/python.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/services/functions/templates/recipes/sql/eval/python.md"
sourceSha256: "6fb3dacf8004196c43d06826d16db7a64c7f3ec9962683d4ab13f65364046d35"
pageSha256: "6fb3dacf8004196c43d06826d16db7a64c7f3ec9962683d4ab13f65364046d35"
contentMode: "local-full"
zh: ""
---

# sql Recipe - Python Eval

## MCP Template Validation

| Criteria | Expected | Status |
|----------|----------|--------|
| Template discovery | `functions_template_get(language: "python")` returns list | ✅ PASS |
| Filter by resource | `resource == "sql"` finds matches | ✅ PASS |
| Template scaffolded | `sql-trigger-python-azd` | ✅ PASS |
| Has trigger code | `@app.sql_trigger` decorator in output | ✅ PASS |
| Has IaC | `projectFiles[]` includes Bicep | ✅ PASS |
| Has RBAC | Appropriate role assignment | ✅ PASS |

## Agent Behavior Validation

```text
1. Agent calls: functions_template_get(language: "python")
2. Agent scans templateList.triggers[] descriptions and resource field
3. Agent selects: template where resource == "sql" → sql-trigger-python-azd
4. Agent calls: functions_template_get(language: "python", template: "sql-trigger-python-azd")
5. Agent writes: functionFiles[] + projectFiles[]
```

## Notes

- Template names may vary - use `resource` field or `description` to match
- Never hardcode template names - always discover via list call first

## Test Date

2026-04-22

## Verdict

**PASS** - MCP template provides complete sql trigger with IaC, RBAC, and UAMI binding.
