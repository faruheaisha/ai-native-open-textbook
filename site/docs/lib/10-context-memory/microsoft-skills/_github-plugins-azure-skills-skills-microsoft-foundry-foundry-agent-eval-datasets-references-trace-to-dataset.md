---
title: "Trace-to-Dataset Pipeline — Harvest Production Traces as Test Cases"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/eval-datasets/references/trace-to-dataset.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/eval-datasets/references/trace-to-dataset.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/eval-datasets/references/trace-to-dataset.md"
sourceSha256: "e153baaee7d360cbddf329d8136b702bef3b77e0c2d8d35910ef818117130576"
pageSha256: "e153baaee7d360cbddf329d8136b702bef3b77e0c2d8d35910ef818117130576"
contentMode: "local-full"
zh: ""
---

# Trace-to-Dataset Pipeline — Harvest Production Traces as Test Cases

Extract production traces from App Insights using KQL, transform them into evaluation dataset format, and persist as versioned datasets. This is the core workflow for turning real-world agent failures into reproducible test cases.

## ⛔ Do NOT

- Do NOT use `parse_json(customDimensions)` — `customDimensions` is already a `dynamic` column in App Insights KQL. Access properties directly: `customDimensions["gen_ai.response.id"]`.

## Related References

- [Eval Correlation](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-trace-references-eval-correlation) (in `foundry-agent/trace/references/`) — look up eval scores by response/conversation ID via `customEvents`
- [KQL Templates](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-trace-references-kql-templates) (in `foundry-agent/trace/references/`) — general trace query patterns and attribute mappings

## Prerequisites

- App Insights resource resolved (see [trace skill](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-trace-trace) Before Starting)
- Agent root, selected metadata file, environment, and project endpoint available from `.foundry/agent-metadata*.yaml`
- Time range confirmed with user (default: last 7 days)

When a repo contains multiple agent roots, this workflow updates only the selected agent root's `.foundry/datasets/`, `.foundry/results/`, and metadata files. Do **not** merge sibling agent folders.

> 💡 **Run all KQL queries** using **`monitor_resource_log_query`** (Azure MCP tool) against the App Insights resource. This is preferred over delegating to the `azure-kusto` skill.

> ⚠️ **Always pass `subscription` explicitly** to Azure MCP tools — they don't extract it from resource IDs.

## Overview

```
App Insights traces
    │
    ▼
[1] KQL Harvest Query (filter by error/latency/eval score)
    │
    ▼
[2] Schema Transform (trace → JSONL format)
    │
    ▼
[3] Human Review (show candidates, let user approve/edit/reject)
    │
    ▼
[4] Persist Dataset (local JSONL files)
    │
    ▼
[5] Sync to Foundry (optional — upload to project-connected storage)
```

## Key Concept: Linking Evaluation Results to Traces

> 💡 **Evaluation results live in `customEvents`, not in `dependencies`.** Foundry writes eval scores to App Insights as `customEvents` with `name == "gen_ai.evaluation.result"`. Agent traces (spans) live in `dependencies`. The link between them is **`gen_ai.response.id`** — this field appears on both tables.

| Table | Contains | Join Key |
|-------|----------|----------|
| `dependencies` | Agent traces (spans, tool calls, LLM calls) | `customDimensions["gen_ai.response.id"]` |
| `customEvents` | Evaluation results (scores, labels, explanations) | `customDimensions["gen_ai.response.id"]` |

**To harvest traces with eval scores**, join `customEvents` → `dependencies` on `responseId`. The [Low-Eval Harvest](#low-eval-harvest--traces-with-poor-evaluation-scores) template below shows this pattern. For standalone eval lookups, see [Eval Correlation](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-trace-references-eval-correlation) (in `foundry-agent/trace/references/`).

## Step 1 — Choose a Harvest Template

Select the appropriate KQL template based on user intent. These templates mirror common LangSmith "run rules" but offer more power through KQL's query language.

> ⚠️ **Hosted agents:** The Foundry agent name (e.g., `hosted-agent-022-001`) only appears on `requests`, NOT on `dependencies`. For hosted agents, use the [Hosted Agent Harvest](#hosted-agent-harvest) template which joins via `requests.id` → `dependencies.operation_ParentId`. The templates below work directly for **prompt agents** where `gen_ai.agent.name` on `dependencies` matches the Foundry name.

### Error Harvest — Failed Traces

Captures all traces where the agent returned errors. Equivalent to LangSmith's `eq(error, True)` run rule.

```kql
dependencies
| where timestamp > ago(7d)
| where success == false
| where isnotempty(customDimensions["gen_ai.operation.name"])
