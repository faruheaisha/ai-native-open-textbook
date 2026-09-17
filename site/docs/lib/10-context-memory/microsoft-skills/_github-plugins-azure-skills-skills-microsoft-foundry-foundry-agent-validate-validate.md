---
title: "Validate a Foundry Hosted Agent"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/validate/validate.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/validate/validate.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/validate/validate.md"
sourceSha256: "e8d1955f79a21c46dd0f3085eb712df8d422530334bc45a2ae561cb09311dc73"
pageSha256: "e8d1955f79a21c46dd0f3085eb712df8d422530334bc45a2ae561cb09311dc73"
contentMode: "local-full"
zh: ""
---

# Validate a Foundry Hosted Agent

Review one Microsoft Foundry hosted agent against deployment, security, reliability, observability, evaluation, and agent-design best practices without changing the agent or its Azure resources.

> ⚠️ **Important:** This sub-skill is strictly read-only. Never provision or deploy, run the application or agent, or create, update, or delete any Azure resource.

## When to Use This Skill

Use this sub-skill only when the user explicitly asks to:

- Validate whether Microsoft Foundry hosted-agent code meets Microsoft Foundry best practices.
- Explicitly use this validation sub-skill.

Do not invoke this sub-skill proactively during agent creation, deployment, invocation, troubleshooting, optimization, or a general code review.

## Hosted Agent Validation Workflow

### Step 1: Resolve the Agent Path

1. If the user provided a hosted-agent path, validate that path.
2. Otherwise, validate whether the current directory is a Microsoft Foundry hosted-agent path.
3. A valid path must identify a hosted agent configured with `host: azure.ai.agent` in `azure.yaml`.
4. If neither path is valid, ask the user to provide the Microsoft Foundry hosted-agent path. Do not search other directories.

### Step 2: Load and Validate Rules

1. Select exactly one rules file:
   - If the prompt provides `agent-validation-rules.yaml`, use it.
