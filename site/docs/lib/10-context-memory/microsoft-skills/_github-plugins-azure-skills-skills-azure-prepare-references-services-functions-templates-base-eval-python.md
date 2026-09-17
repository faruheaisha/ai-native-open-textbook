---
title: "Base HTTP Template - Python Eval"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/services/functions/templates/base/eval/python.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/services/functions/templates/base/eval/python.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/services/functions/templates/base/eval/python.md"
sourceSha256: "2fe415baa317973631744aa942406af23025985ced28373ee809a2719f2354b8"
pageSha256: "2fe415baa317973631744aa942406af23025985ced28373ee809a2719f2354b8"
contentMode: "local-full"
zh: ""
---

# Base HTTP Template - Python Eval

## Test Summary

| Test | Status | Notes |
|------|--------|-------|
| Code Syntax | ✅ PASS | AST parse successful |
| Function Routes | ✅ PASS | /api/hello, /api/health defined |
| v2 Model | ✅ PASS | Uses `func.FunctionApp()` decorator model |
| Health Endpoint | ✅ PASS | Anonymous auth, JSON response |

## Code Validation

```python
# Validated syntax and structure
import ast
with open('function_app.py') as f:
    ast.parse(f.read())
# ✅ Code syntax valid
```

## Test Date

2025-02-18

## Template Source

Generated from `functions_template_get(language: "python", template: "http-trigger-python-azd")` MCP tool output

## Verdict

**PASS** - Base HTTP template code validates correctly for Python v2 model.
