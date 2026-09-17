---
title: "Service Bus Recipe - TypeScript Eval"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/services/functions/templates/recipes/servicebus/eval/typescript.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/services/functions/templates/recipes/servicebus/eval/typescript.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/services/functions/templates/recipes/servicebus/eval/typescript.md"
sourceSha256: "9280614d0a5d112ae6f738099d22d2a52e8b2cd42b671d53411567d80803fc8c"
pageSha256: "9280614d0a5d112ae6f738099d22d2a52e8b2cd42b671d53411567d80803fc8c"
contentMode: "local-full"
zh: ""
---

# Service Bus Recipe - TypeScript Eval

## MCP Template Validation

| Criteria | Expected | Status |
|----------|----------|--------|
| Template discovery | `functions_template_get(language: "typescript")` returns list | ✅ PASS |
| Filter by resource | `resource == "servicebus"` finds matches | ✅ PASS |
| Template scaffolded | `servicebus-trigger-typescript-azd` | ✅ PASS |
| Has trigger code | `app.serviceBusQueue` trigger binding in output | ✅ PASS |
| Has IaC | `projectFiles[]` includes Bicep | ✅ PASS |
| Has RBAC | Service Bus Data Receiver/Sender role | ✅ PASS |

## Agent Behavior Validation

```text
1. Agent calls: functions_template_get(language: "typescript")
2. Agent scans templateList.triggers[] descriptions and resource field
3. Agent selects: template where resource == "servicebus" → servicebus-trigger-typescript-azd
4. Agent calls: functions_template_get(language: "typescript", template: "servicebus-trigger-typescript-azd")
5. Agent writes: functionFiles[] + projectFiles[]
```

## Code Indicators Verified

- `app.serviceBusQueue` trigger binding (V4 model)
- TypeScript compilation successful (`npm install` + `tsc`)
- Service Bus namespace with managed identity RBAC
- VNet integration and Flex Consumption plan

## Test Date

2026-04-22

## Verdict

**PASS** - MCP template provides complete TypeScript Service Bus trigger with IaC, RBAC, and UAMI binding.
