---
title: "M365 Agent Evaluator"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/microsoft-365-agents-toolkit/skills/m365-agent-evaluator/SKILL.md"
sourceRel: ".github/plugins/microsoft-365-agents-toolkit/skills/m365-agent-evaluator/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/microsoft-365-agents-toolkit/skills/m365-agent-evaluator/SKILL.md"
sourceSha256: "5a1da9a62088eb7518937e1cba1d66e5a644083d82a22aa51f242f5915ca21ee"
pageSha256: "5a1da9a62088eb7518937e1cba1d66e5a644083d82a22aa51f242f5915ca21ee"
contentMode: "local-full"
zh: ""
---

# M365 Agent Evaluator

Use this skill to help users evaluate Microsoft 365 Copilot declarative agents with `@microsoft/m365-copilot-eval`. The skill designs schema-compatible eval datasets, runs the public preview CLI, analyzes results, and recommends targeted fixes.

Default to Microsoft 365 Agents Toolkit (ATK) projects when detected, but do not hard-stop solely because the current directory is not ATK. The CLI can also evaluate deployed agents with an explicit `M365_AGENT_ID` or `--m365-agent-id`.

## Always use this CLI invocation

```powershell
npx -y --package @microsoft/m365-copilot-eval@latest runevals
```

Do not recommend the old private `aka.ms` installer, global installs, bare `runevals`, bare `npx runevals`, `--input`, or `--html`.

## Activation workflow

1. Identify the user goal: setup, dataset authoring, running evals, analyzing results, or updating an existing eval suite.
2. Load only the reference needed for the current goal:
   - `references/workflow.md` for the end-to-end operator workflow and CLI commands.
   - `references/azure-setup.md` for prerequisites, env files, and secret handling.
   - `references/eval-templates.md` when creating or editing eval datasets.
   - `references/pra-framework.md` when deciding what scenarios to generate.
   - `references/result-analysis.md` after JSON/CSV/HTML results exist.
   - `references/guardrails.md` before writing files, handling secrets, clearing cache, signing out, or troubleshooting.
3. Detect project shape:
   - ATK: `.env.local`, `.env.local.user`, `env\.env.local.user`, `m365agents.yml`, or `appPackage\declarativeAgent.json`.
   - Non-ATK: an eval dataset plus `M365_AGENT_ID`, `--m365-agent-id`, or a named environment file such as `env\.env.dev`.
4. Verify prerequisites without exposing values:
   - Node.js 24.12.0 or newer.
   - Microsoft 365 Copilot license and a deployed M365 Copilot agent.
   - Tenant admin consent for the WorkIQ Client App.
   - `TENANT_ID`, Azure OpenAI in Foundry Models endpoint/key, and recommended/default `gpt-4o-mini` deployment.
5. Choose the workflow:
   - No dataset: create `evals\evals.json`.
   - Existing dataset: run, analyze prior results, or propose changes.
   - Quick check: use inline prompts.
   - Exploration: use interactive mode.

## Current dataset contract

Generate schema version `1.2.0` documents with a root `items` array. Do not generate the old `PromptsObject` or root `prompts` format.

Minimum shape:

```json
{
  "schemaVersion": "1.2.0",
  "metadata": {
    "name": "Agent evaluation suite",
    "tags": ["starter"]
  },
  "default_evaluators": {
    "Relevance": {},
    "Coherence": {}
  },
  "items": [
    {
      "prompt": "What can this agent help me with?",
      "expected_response": "The agent explains its supported scope without inventing unsupported capabilities."
    }
  ]
}
```

Use `references\prompts-schema.json` as the local schema source and `references\eval-templates.md` for copyable single-turn, multi-turn, evaluator, and threshold examples.

## Public evaluator names

Evaluator names are case-sensitive. Use only the public configurable evaluator names unless a newer authoritative source proves otherwise.

| Evaluator | Semantics |
|---|---|
| `Relevance` | LLM score from 1-5; default threshold 3. |
| `Coherence` | LLM score from 1-5; default threshold 3. |
| `Groundedness` | LLM score from 1-5 against `context`/expected evidence; default threshold 3. |
| `Similarity` | LLM score from 1-5 against `expected_response`; default threshold 3. |
| `Citations` | Count-based citation check; default threshold 1. |
| `ExactMatch` | Boolean exact string match. |
| `PartialMatch` | String similarity from 0.0-1.0; default threshold 0.5. |

Treat `ToolCallAccuracy` as legacy/private for authoring. Do not add it to generated datasets unless current public CLI/schema documentation explicitly reintroduces it.

## Common commands

```powershell
# Version/help checks
npx -y --package @microsoft/m365-copilot-eval@latest runevals --version
npx -y --package @microsoft/m365-copilot-eval@latest runevals --help

# First-time setup / EULA
npx -y --package @microsoft/m365-copilot-eval@latest runevals accept-eula
npx -y --package @microsoft/m365-copilot-eval@latest runevals --init-only

# Batch run with explicit JSON output
npx -y --package @microsoft/m365-copilot-eval@latest runevals --prompts-file evals\evals.json --output .evals\results.json

# Human-review HTML or spreadsheet-friendly CSV
npx -y --package @microsoft/m365-copilot-eval@latest runevals --prompts-file evals\evals.json --output .evals\results.html
npx -y --package @microsoft/m365-copilot-eval@latest runevals --prompts-file evals\evals.json --output .evals\results.csv

# Quick checks
npx -y --package @microsoft/m365-copilot-eval@latest runevals --prompts "What can you help me with?" --expected "The agent describes its supported scope."

# Non-ATK or named environment
