---
title: "Service Bus Recipe - Python Eval"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/services/functions/templates/recipes/servicebus/eval/python.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/services/functions/templates/recipes/servicebus/eval/python.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/services/functions/templates/recipes/servicebus/eval/python.md"
sourceSha256: "b44d024722b154606229530ef390a21278693ce5638cc71a766b1cf8a5a68fd4"
pageSha256: "b44d024722b154606229530ef390a21278693ce5638cc71a766b1cf8a5a68fd4"
contentMode: "local-full"
zh: ""
---

# Service Bus Recipe - Python Eval

## MCP Template Validation

| Criteria | Expected | Status |
|----------|----------|--------|
| Template discovery | `functions_template_get(language: "python")` returns list | ✅ PASS |
| Filter by resource | `resource == "servicebus"` finds matches | ✅ PASS |
| Template scaffolded | `servicebus-trigger-python-azd` | ✅ PASS |
| Has trigger code | `@app.service_bus_queue_trigger` decorator in output | ✅ PASS |
| Has IaC | `projectFiles[]` includes Bicep | ✅ PASS |
| Has RBAC | Service Bus Data Receiver/Sender role | ✅ PASS |

## Agent Behavior Validation

```text
1. Agent calls: functions_template_get(language: "python")
2. Agent scans templateList.triggers[] descriptions and resource field
3. Agent selects: template where resource == "servicebus" → servicebus-trigger-python-azd
4. Agent calls: functions_template_get(language: "python", template: "servicebus-trigger-python-azd")
5. Agent writes: functionFiles[] + projectFiles[]
```

## Code Indicators Verified

- `@app.service_bus_queue_trigger` with queue_name
- `connection="ServiceBusConnection"` (UAMI pattern)
- `ServiceBusConnection__fullyQualifiedNamespace` binding
- Extension bundle v4

## Test Date

2026-04-22

## Verdict

**PASS** - MCP template provides complete Service Bus trigger with IaC, RBAC, and UAMI binding.
