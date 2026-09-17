---
title: "azd Setup"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/agent-optimizer/references/azd-setup.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/agent-optimizer/references/azd-setup.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/agent-optimizer/references/azd-setup.md"
sourceSha256: "f3a94545ac1c17281f1d33c39c87b044483b84f83e1803747ea86a2ebdf7684e"
pageSha256: "f3a94545ac1c17281f1d33c39c87b044483b84f83e1803747ea86a2ebdf7684e"
contentMode: "local-full"
zh: ""
---

# azd Setup

Use this before running Agent Optimizer operations. This skill targets agent code repos that use azd and hosted agents.

## Verify prerequisites

Run from the selected agent repo:

```bash
azd version
az login
azd ai agent --help
azd ai agent optimize --help
```

If `azd ai agent` is unavailable, install or update the `azure.ai.agents` azd extension using the official extension source. If the needed version is private preview only, ask the user for their approved extension source; do not embed private registry commands.

## Resolve hosted-agent context

Use [Common Project Context Resolution](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-SKILL#agent-common-project-context-resolution). Prefer azd context from `azure.yaml` and `azd env get-values`.

Confirm:

- selected service uses `host: azure.ai.agent`
- selected root contains Python agent code
- agent kind is `hosted`
- project endpoint/project ID and deployed agent name/version are known

If the agent's `azure.yaml` service block is missing, ask before initializing:

```bash
