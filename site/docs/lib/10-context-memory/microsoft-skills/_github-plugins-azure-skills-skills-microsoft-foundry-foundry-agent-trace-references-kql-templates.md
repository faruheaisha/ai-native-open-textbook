---
title: "KQL Templates — GenAI Trace Query Reference"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/trace/references/kql-templates.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/trace/references/kql-templates.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/trace/references/kql-templates.md"
sourceSha256: "bb17ba37bab0bf09868c5715663fbaef71449be2be1517f66a11f061407aa1d1"
pageSha256: "bb17ba37bab0bf09868c5715663fbaef71449be2be1517f66a11f061407aa1d1"
contentMode: "local-full"
zh: ""
---

# KQL Templates — GenAI Trace Query Reference

Ready-to-use KQL templates for querying GenAI OpenTelemetry traces in Application Insights.

**Table of Contents:** [App Insights Table Mapping](#app-insights-table-mapping) · [Key GenAI OTel Attributes](#key-genai-otel-attributes) · [Span Correlation](#span-correlation) · [Hosted Agent Attributes](#hosted-agent-attributes) · [Response ID Formats](#response-id-formats) · [Common Query Templates](#common-query-templates) · [OTel Reference Links](#otel-reference-links)

## App Insights Table Mapping

| App Insights Table | GenAI Data |
|-------------------|------------|
| `dependencies` | GenAI spans: LLM inference (`chat`), tool execution (`execute_tool`), agent invocation (`invoke_agent`) |
| `requests` | Incoming HTTP requests to the agent endpoint. For hosted agents, also carries `gen_ai.agent.name` (Foundry name) and `azure.ai.agentserver.*` attributes — **preferred entry point** for agent-name filtering |
| `customEvents` | GenAI evaluation results (`gen_ai.evaluation.result`) — scores, labels, explanations |
| `traces` | Log events, including GenAI events (input/output messages) |
| `exceptions` | Error details with stack traces |

## Key GenAI OTel Attributes

Stored in `customDimensions` on `dependencies` spans:

| Attribute | Description | Example |
|-----------|-------------|---------|
| `gen_ai.operation.name` | Operation type | `chat`, `invoke_agent`, `execute_tool`, `create_agent` |
| `gen_ai.conversation.id` | Conversation/session ID | `conv_5j66UpCpwteGg4YSxUnt7lPY` |
| `gen_ai.response.id` | Response ID | `chatcmpl-123` |
| `gen_ai.agent.name` | Agent name | `my-support-agent` |
| `gen_ai.agent.id` | Agent identifier | `asst_abc123` |
| `gen_ai.request.model` | Requested model | `gpt-4o` |
| `gen_ai.response.model` | Actual model used | `gpt-4o-2024-05-13` |
| `gen_ai.usage.input_tokens` | Input token count | `450` |
| `gen_ai.usage.output_tokens` | Output token count | `120` |
| `gen_ai.response.finish_reasons` | Stop reasons | `["stop"]`, `["tool_calls"]` |
| `error.type` | Error classification | `timeout`, `rate_limited`, `content_filter` |
| `gen_ai.provider.name` | Provider | `azure.ai.openai`, `openai` |
| `gen_ai.input.messages` | Full input messages (JSON array) — on `invoke_agent` spans | `[\{"role":"user","parts":[\{"type":"text","content":"..."\}]\}]` |
| `gen_ai.output.messages` | Full output messages (JSON array) — on `invoke_agent` spans | `[\{"role":"assistant","parts":[\{"type":"text","content":"..."\}]\}]` |

Stored in `customDimensions` on `customEvents` (name == `gen_ai.evaluation.result`):

| Attribute | Description | Example |
|-----------|-------------|---------|
| `gen_ai.evaluation.name` | Evaluator name | `Relevance`, `IntentResolution` |
| `gen_ai.evaluation.score.value` | Numeric score | `4.0` |
| `gen_ai.evaluation.score.label` | Human-readable label | `pass`, `fail`, `relevant` |
| `gen_ai.evaluation.explanation` | Free-form explanation | `"Response lacks detail..."` |
| `gen_ai.response.id` | Correlates to the evaluated span | `chatcmpl-123` |
| `gen_ai.conversation.id` | Correlates to conversation | `conv_5j66...` |

> **Correlation:** Eval results do NOT link via id-parentId. Use `gen_ai.conversation.id` and/or `gen_ai.response.id` to join with `dependencies` spans.

## Span Correlation

| Field | Purpose |
|-------|---------|
| `operation_Id` | Trace ID — groups all spans in one request |
| `id` | Span ID — unique identifier for this span |
| `operation_ParentId` | Parent span ID — use with `id` to build span trees |

### Operation_Id Join (requests → dependencies)

Use `requests` as the hosted-agent entry point, then carry `operation_Id` forward as the trace key when joining into `dependencies`, `traces`, or `customEvents`:

```kql
let agentRequests = materialize(
    requests
| where timestamp > ago(7d)
| extend
    foundryAgentName = coalesce(
        tostring(customDimensions["gen_ai.agent.name"]),
        tostring(customDimensions["azure.ai.agentserver.agent_name"])
    ),
    agentId = tostring(customDimensions["gen_ai.agent.id"]),
    agentNameFromId = tostring(split(agentId, ":")[0]),
    agentVersion = iff(agentId contains ":", tostring(split(agentId, ":")[1]), ""),
    conversationId = coalesce(
        tostring(customDimensions["gen_ai.conversation.id"]),
        tostring(customDimensions["azure.ai.agentserver.conversation_id"]),
        operation_Id
    )
