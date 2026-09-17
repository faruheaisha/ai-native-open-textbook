---
title: "blob-eventgrid Recipe - Python Eval"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/services/functions/templates/recipes/blob-eventgrid/eval/python.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/services/functions/templates/recipes/blob-eventgrid/eval/python.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/services/functions/templates/recipes/blob-eventgrid/eval/python.md"
sourceSha256: "f0318b597a3f36a4d7ef50bf5134d2672e7b422593e5f8daf4c686732d4b8538"
pageSha256: "f0318b597a3f36a4d7ef50bf5134d2672e7b422593e5f8daf4c686732d4b8538"
contentMode: "local-full"
zh: ""
---

# blob-eventgrid Recipe - Python Eval

## MCP Template Validation

| Criteria | Expected | Status |
|----------|----------|--------|
| Template discovery | `functions_template_get(language: "python")` returns list | ✅ PASS |
| Filter by resource | `resource == "blob"` finds matches | ✅ PASS |
| Template scaffolded | `blob-eventgrid-trigger-python-azd` | ✅ PASS |
| Has trigger code | `@app.blob_trigger` decorator in output | ✅ PASS |
| Has IaC | `projectFiles[]` includes Bicep | ✅ PASS |
| Has RBAC | Appropriate role assignment | ✅ PASS |

## Agent Behavior Validation

```text
1. Agent calls: functions_template_get(language: "python")
2. Agent scans templateList.triggers[] descriptions and resource field
3. Agent selects: template where resource == "blob" → blob-eventgrid-trigger-python-azd
4. Agent calls: functions_template_get(language: "python", template: "blob-eventgrid-trigger-python-azd")
5. Agent writes: functionFiles[] + projectFiles[]
```

## Notes

- Template names may vary - use `resource` field or `description` to match
- Never hardcode template names - always discover via list call first

## Test Date

2026-04-22

## Verdict

**PASS** - MCP template provides complete blob-eventgrid trigger with IaC, RBAC, and UAMI binding.
