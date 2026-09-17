---
title: "Search Traces — Conversation-Level Search"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/trace/references/search-traces.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/trace/references/search-traces.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/trace/references/search-traces.md"
sourceSha256: "93c47b8cfdd2e30e281576f5b3d446c97c9c1ee81962b87bd988fe355800bbc6"
pageSha256: "93c47b8cfdd2e30e281576f5b3d446c97c9c1ee81962b87bd988fe355800bbc6"
contentMode: "local-full"
zh: ""
---

# Search Traces — Conversation-Level Search

Search agent traces at the conversation level. Returns summaries grouped by conversation or operation, not individual spans.

## Prerequisites

- App Insights resource resolved (see [trace.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-trace-trace) Before Starting)
- Selected agent root, environment, effective context source, and metadata overlay confirmed
- Time range confirmed with user (default: last 24 hours)

## Search by Conversation ID

Keep the selected environment visible in the summary, and add the selected agent name or environment tag filters when the telemetry emits them.

```kql
dependencies
| where timestamp > ago(24h)
| where customDimensions["gen_ai.conversation.id"] == "<conversation_id>"
| project timestamp, name, duration, resultCode, success,
    operation = tostring(customDimensions["gen_ai.operation.name"]),
    model = tostring(customDimensions["gen_ai.request.model"]),
    inputTokens = toint(customDimensions["gen_ai.usage.input_tokens"]),
    outputTokens = toint(customDimensions["gen_ai.usage.output_tokens"]),
    operation_Id, id, operation_ParentId
| order by timestamp asc
```

## Search by Response ID

Auto-detect the response ID format to determine agent type:
- `caresp_...` → Hosted agent (AgentServer)
- `resp_...` → Prompt agent (Foundry Responses API)
- `chatcmpl-...` → Azure OpenAI chat completions

```kql
dependencies
| where timestamp > ago(24h)
| where customDimensions["gen_ai.response.id"] == "<response_id>"
| project timestamp, name, duration, resultCode, success,
    operation = tostring(customDimensions["gen_ai.operation.name"]),
    model = tostring(customDimensions["gen_ai.request.model"]),
    inputTokens = toint(customDimensions["gen_ai.usage.input_tokens"]),
    outputTokens = toint(customDimensions["gen_ai.usage.output_tokens"]),
    operation_Id, id, operation_ParentId
```

Then drill into the full conversation:

> ⚠️ **STOP — read [Conversation Detail](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-trace-references-conversation-detail) before writing your own drill-down query.** It contains the correct span tree reconstruction logic, event/exception queries, and eval correlation steps.

Quick drill-down using the `operation_Id` from above:

```kql
dependencies
| where operation_Id == "<operation_id_from_above>"
| project timestamp, name, duration, resultCode, success,
    spanId = id, parentSpanId = operation_ParentId,
    operation = tostring(customDimensions["gen_ai.operation.name"]),
    model = tostring(customDimensions["gen_ai.request.model"]),
    inputTokens = toint(customDimensions["gen_ai.usage.input_tokens"]),
    outputTokens = toint(customDimensions["gen_ai.usage.output_tokens"]),
    responseId = tostring(customDimensions["gen_ai.response.id"]),
    errorType = tostring(customDimensions["error.type"]),
    toolName = tostring(customDimensions["gen_ai.tool.name"])
| order by timestamp asc
```

Also check for eval results: see [Eval Correlation](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-trace-references-eval-correlation).

## Search by Agent Name

> **Note:** For hosted agents, `gen_ai.agent.name` in `dependencies` refers to *sub-agents* (e.g., `BingSearchAgent`), not the top-level hosted agent. See "Search by Hosted Agent Name" below.
