---
title: "Agent Optimizer in Foundry — Scaffold Python Agent"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/agent-optimizer/agent-optimizer.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/agent-optimizer/agent-optimizer.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/agent-optimizer/agent-optimizer.md"
sourceSha256: "97c59514f3eb94acedd737ead09acfd4f7a04f2ef78f4270889f9897acd117ac"
pageSha256: "97c59514f3eb94acedd737ead09acfd4f7a04f2ef78f4270889f9897acd117ac"
contentMode: "local-full"
zh: ""
---

# Agent Optimizer in Foundry — Scaffold Python Agent

Prepare an existing Python hosted agent for Agent Optimizer in Foundry, then run optimization, apply the selected candidate locally, and deploy through azd after review.

## When to Use This Skill

USE FOR: make my Python agent optimizable with Agent Optimizer in Foundry, scaffold optimizer config, add `load_config`, prepare `.agent_configs`, configure eval.yaml, run azd ai agent optimize, apply optimizer candidate, deploy optimized agent.

DO NOT USE FOR: non-Python agents, prompt agents, running standalone batch evaluations, prompt optimization of an already deployed agent, or general Foundry deployment. For normal deployment, use [deploy](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-deploy-deploy). For eval analysis loops, use [observe](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-observe-observe).

## Quick Reference

| Property | Value |
| -------- | ----- |
| Phase | Scaffold, optimize, apply locally, deploy |
| Supported language | Python |
| Required runtime | azd project with hosted agent |
| Required package | `azure-ai-agentserver-optimization` |
| Required import | `from azure.ai.agentserver.optimization import load_config` |
| Required baseline | `.agent_configs/baseline/` in the agent's service source directory |
| Supported targets | instruction, model, skill folder, function tool definitions |
| azd setup | [azd Setup](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-agent-optimizer-references-azd-setup) |
| Detailed scaffold steps | [Scaffold Workflow](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-agent-optimizer-references-scaffold) |
| Python/file patterns | [Python Patterns](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-agent-optimizer-references-python-patterns) |
| Eval config | [eval.yaml Guidance](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-agent-optimizer-references-eval-yaml) |
| Optimize flow | [Optimize Workflow](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-agent-optimizer-references-optimize-workflow) |

## High-Level Lifecycle

1. **Prepare azd:** Verify azd, login, and `azure.ai.agents` extension with [azd Setup](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-agent-optimizer-references-azd-setup).
2. **Scaffold:** Follow [Scaffold Workflow](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-agent-optimizer-references-scaffold) when SDK wiring or `.agent_configs/baseline/` is missing; stop for review if files changed.
3. **Configure eval:** Create or update `eval.yaml` using [eval.yaml Guidance](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-agent-optimizer-references-eval-yaml).
4. **Optimize:** Run and monitor `azd ai agent optimize` with [Optimize Workflow](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-agent-optimizer-references-optimize-workflow).
5. **Apply and deploy:** Apply the selected candidate locally, review the diff, then deploy with `azd deploy`.

## Workflow

1. Resolve the target agent root and confirm it is a Python hosted agent.
2. Read [azd Setup](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-agent-optimizer-references-azd-setup), then [Scaffold Workflow](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-agent-optimizer-references-scaffold) if scaffolding is needed.
3. Read [eval.yaml Guidance](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-agent-optimizer-references-eval-yaml) and configure optimization inputs from known dataset/evaluator context.
4. Read [Optimize Workflow](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-agent-optimizer-references-optimize-workflow), run optimization, and ask before applying a candidate.
5. After local review and approval, deploy with `azd deploy`, then invoke via [invoke](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-invoke-invoke).

## Guardrails

- Target hosted Python agents only.
- Preserve existing frameworks, tools, hosting adapters, protocols, and entrypoints.
- Do not use one global scaffold across multi-agent roles unless the architecture already has one global prompt/model or the user approves.
- Keep edits scoped to the selected agent root.
- Do not apply candidates or deploy automatically; stop for review first.
- Prefer `azd ai agent optimize apply --candidate` plus `azd deploy` over direct optimize deploy so source changes are reviewable.
