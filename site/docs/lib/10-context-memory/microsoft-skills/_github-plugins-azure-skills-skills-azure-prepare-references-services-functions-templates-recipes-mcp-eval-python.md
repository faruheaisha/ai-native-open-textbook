---
title: "MCP Server Recipe - Python Eval"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/services/functions/templates/recipes/mcp/eval/python.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/services/functions/templates/recipes/mcp/eval/python.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/services/functions/templates/recipes/mcp/eval/python.md"
sourceSha256: "4d20835fd22b7455a9600cb5ad18c09c01d62f3a9cc1a638d5fecc67c0035c44"
pageSha256: "4d20835fd22b7455a9600cb5ad18c09c01d62f3a9cc1a638d5fecc67c0035c44"
contentMode: "local-full"
zh: ""
---

# MCP Server Recipe - Python Eval

## MCP Template Validation

| Criteria | Expected | Status |
|----------|----------|--------|
| Template discovery | `functions_template_get(language: "python")` returns list | ✅ PASS |
| Filter by resource | `resource == "mcp"` finds matches | ✅ PASS |
| Template scaffolded | `mcp-server-remote-python` | ✅ PASS |
| Has trigger code | HTTP trigger with JSON-RPC handler in output | ✅ PASS |
| Has IaC | `projectFiles[]` includes Bicep | ✅ PASS |

## Agent Behavior Validation

```text
1. Agent calls: functions_template_get(language: "python")
2. Agent scans templateList.triggers[] descriptions and resource field
3. Agent selects: template where resource == "mcp" → mcp-server-remote-python
4. Agent calls: functions_template_get(language: "python", template: "mcp-server-remote-python")
5. Agent writes: functionFiles[] + projectFiles[]
```

## Code Indicators Verified

- HTTP trigger endpoint for JSON-RPC 2.0 protocol
- `tools/list` returns tool definitions with schemas
- `tools/call` executes tools and returns results
- Ready for AI agent integration (Copilot, Claude, etc.)

## Test Date

2026-04-22

## Verdict

**PASS** - MCP template provides complete remote MCP server with JSON-RPC endpoint and IaC.
