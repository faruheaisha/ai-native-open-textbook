---
title: "Scaffold Workflow"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/agent-optimizer/references/scaffold.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/agent-optimizer/references/scaffold.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/agent-optimizer/references/scaffold.md"
sourceSha256: "1d5c620eff8dee8f13ba2669f89dedbd7b5bfd1bafd2f9056de19c75fa422db3"
pageSha256: "1d5c620eff8dee8f13ba2669f89dedbd7b5bfd1bafd2f9056de19c75fa422db3"
contentMode: "local-full"
zh: ""
---

# Scaffold Workflow

Use this workflow to make a Python agent optimizable before running Agent Optimizer in Foundry.

## Step 1: Resolve Target and Goal

Stay inside the selected agent root. Confirm the project is Python using `requirements.txt`, `pyproject.toml`, `setup.py`, or Python entrypoints.

Identify the optimization goal from user input, selected `evaluationSuites[]`, `.foundry/evaluators/*`, recent result summaries, datasets, or code/test comments. If the goal is unclear, proceed conservatively and explain that evaluator-specific targeting improves optimization quality.

## Step 2: Inventory Safe Targets

Scan for instructions, model selection, skill folders, function tool definitions, topology, and hosting entrypoint. Record file path, symbol/name, role, current value, and whether it is safe to expose through the optimizer.

Classify topology as single-agent, orchestrator/supervisor, specialist tool-agent, peer multi-agent, or unknown runtime. Do not collapse role-specific prompts into one global prompt. Ask before editing when multiple scopes are plausible.

Use [Python Patterns](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-agent-optimizer-references-python-patterns#target-selection) to map evaluator/dataset goals to the smallest useful baseline.

## Step 3: Scaffold Baseline Files

Create the required `.agent_configs/baseline/` folder in the agent's service source directory (beside the entry point):

```text
.agent_configs/
  baseline/
    metadata.yaml
    instructions.md
    tools.json
