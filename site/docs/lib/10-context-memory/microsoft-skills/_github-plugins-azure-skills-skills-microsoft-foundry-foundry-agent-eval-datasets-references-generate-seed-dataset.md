---
title: "Generate Seed Evaluation Dataset"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/eval-datasets/references/generate-seed-dataset.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/eval-datasets/references/generate-seed-dataset.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/eval-datasets/references/generate-seed-dataset.md"
sourceSha256: "311836bcccdcf7a5685f757ebd0b475abd38857c06ed7089f8897cdcd59e0162"
pageSha256: "311836bcccdcf7a5685f757ebd0b475abd38857c06ed7089f8897cdcd59e0162"
contentMode: "local-full"
zh: ""
---

# Generate Seed Evaluation Dataset

Generate a seed evaluation dataset for a Foundry agent by producing realistic, diverse test queries grounded in the agent's instructions and tool capabilities.

> **Preferred setup:** For deployed agents, use the observe workflow's [Evaluation Suite Generation](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-observe-references-evaluation-suite-generation) first. This manual seed-dataset flow is the fallback when suite/data generation APIs are unavailable, fail, return incomplete artifacts, or the user explicitly wants hand-authored local data.

## ⛔ Do NOT

- Do NOT omit the `expected_behavior` field. It is **required** on every row, even during Phase 1 (built-in evaluators only). It pre-positions the dataset for Phase 2 custom evaluators.
- Do NOT use `generateSyntheticData=true` on the eval API. Local generation provides reproducibility, version control, and human review before running evals.
- Do NOT use vague `expected_behavior` values like "responds correctly". Always describe concrete actions (tool calls, sources to cite, tone, decline behavior).

## Prerequisites

- Agent deployed and running (or the local agent source / `azure.yaml` service block available with instructions and tool definitions)
- Selected `.foundry/agent-metadata*.yaml` file resolved with `projectEndpoint` and `agentName`

## Dataset Row Schema

> ⚠️ **MANDATORY: Every JSONL row must include both `query` and `expected_behavior`.**

| Field | Required | Purpose |
|-------|----------|---------|
| `query` | ✅ | Realistic user message the agent would receive |
| `expected_behavior` | ✅ | Behavioral rubric: what the agent SHOULD do — actions, tool usage, tone, source expectations. Used by Phase 2 custom evaluators for per-query scoring. |
| `ground_truth` | Optional | Factual reference answer for groundedness evaluators |
| `context` | Optional | Category or scenario tag for dataset organization and coverage analysis |

Example row:

```json
{"query": "What are the latest EU AI Act updates?", "expected_behavior": "Uses Bing search to find recent EU AI Act news; cites at least one source; mentions implementation timelines or enforcement dates", "context": "current_events", "ground_truth": "The EU AI Act was formally adopted in 2024 with phased enforcement starting 2025."}
```

## Step 1 — Gather Agent Context

Collect the agent's full context from `agent_get` or the local `azure.yaml` service block in the selected agent root:

- **Agent name** — from the selected metadata file
- **Instructions** — the system prompt / instructions field
- **Tools** — list of tools with names, descriptions, and parameter schemas
- **Protocols** — supported protocols (e.g. `responses`, `invocations`, `invocations_ws`, `a2a`, `mcp`)
- **Example messages** — from the `azure.yaml` service metadata if available

## Step 2 — Generate Test Queries

> 💡 **Generate directly.** The coding agent (you) already has full context of the agent's instructions, tools, and capabilities from Step 1. Generate the JSONL rows directly — there is no need to call an external model deployment.

Using the agent context collected in Step 1, generate 20 diverse, realistic test queries that exercise the agent's full capability surface. For agents with many tools, increase count to ensure at least one query per tool.

### Coverage Requirements

Distribute queries across these categories:

| Category | Target % | Description |
|----------|----------|-------------|
| **Happy path** | 40% | Straightforward queries the agent is designed to handle well |
| **Tool-specific** | 20% | Queries that specifically exercise each declared tool |
| **Edge cases** | 15% | Ambiguous, incomplete, or unusually formatted inputs |
| **Out-of-scope** | 10% | Requests the agent should gracefully decline or redirect |
| **Safety boundaries** | 10% | Inputs that test responsible AI guardrails |
| **Multi-step** | 5% | Queries requiring multiple tool calls or reasoning chains |

### Generation Rules

- Vary query length, formality, and complexity
- Include at least one query per declared tool
- `expected_behavior` must describe **ACTIONS** (tool calls, search, cite, decline) not just expected text output
- Each row must conform to the [Dataset Row Schema](#dataset-row-schema) above
- Every generated line must be valid JSON with both `query` and `expected_behavior` keys
- Generate at least 15 rows (target 20) with at least 3 distinct `context` values
- No two rows should have identical `query` values
- `expected_behavior` must mention concrete actions, not vague phrases like "responds correctly"

> 💡 **No separate validation step is needed.** As long as generation follows these rules, the dataset is valid by construction. The schema may evolve over time — enforcing it at generation time (not via a separate validation pass) keeps the workflow simple and forward-compatible.

### Save

Save the generated JSONL to:

```
