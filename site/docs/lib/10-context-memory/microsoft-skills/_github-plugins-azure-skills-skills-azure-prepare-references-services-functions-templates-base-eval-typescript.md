---
title: "Base HTTP Template - TypeScript Eval"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/services/functions/templates/base/eval/typescript.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/services/functions/templates/base/eval/typescript.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/services/functions/templates/base/eval/typescript.md"
sourceSha256: "80308b79608f1fde97d1b998d8291db0e0a539078e933dee0f8583498d905745"
pageSha256: "80308b79608f1fde97d1b998d8291db0e0a539078e933dee0f8583498d905745"
contentMode: "local-full"
zh: ""
---

# Base HTTP Template - TypeScript Eval

## MCP Template Validation

| Criteria | Expected | Status |
|----------|----------|--------|
| Template discovery | `functions_template_get(language: "typescript")` returns list | ✅ PASS |
| Template scaffolded | `http-trigger-typescript-azd` | ✅ PASS |
| Has trigger code | `app.http` trigger in output | ✅ PASS |
| Has IaC | `projectFiles[]` includes Bicep | ✅ PASS |

## Agent Behavior Validation

```text
1. Agent calls: functions_template_get(language: "typescript")
2. Agent scans templateList for HTTP trigger templates
3. Agent selects: http-trigger-typescript-azd
4. Agent calls: functions_template_get(language: "typescript", template: "http-trigger-typescript-azd")
5. Agent writes: functionFiles[] + projectFiles[]
```

## Code Indicators Verified

- `app.http` trigger pattern (V4 model)
- TypeScript compilation successful (`npm install` + `tsc`)
- HTTP trigger with request/response handling

## Test Date

2026-04-22

## Verdict

**PASS** - MCP template provides complete TypeScript HTTP trigger with IaC and V4 programming model.
