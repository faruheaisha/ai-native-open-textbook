---
title: "Guardrails (RAI Content-Filter Policies)"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/create/references/guardrails/guardrail-manage.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/create/references/guardrails/guardrail-manage.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/create/references/guardrails/guardrail-manage.md"
sourceSha256: "2ed914bcde3aff7f88a7ef97e951ed9444644b2f05c5faca94a634c56604f5d3"
pageSha256: "2ed914bcde3aff7f88a7ef97e951ed9444644b2f05c5faca94a634c56604f5d3"
contentMode: "local-full"
zh: ""
---

# Guardrails (RAI Content-Filter Policies)

Guardrails are Responsible AI (RAI) content-filter policies that control what content is allowed through model deployments and agents in Microsoft Foundry.

## When to Use

- Create or manage a guardrail (content-filter policy) for a Foundry project
- Attach a guardrail to a hosted agent, model deployment, or toolbox → [guardrail-attach.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-create-references-guardrails-guardrail-attach)
- Create a guardrail via REST API → [guardrail-api-create.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-create-references-guardrails-guardrail-api-create)

## Default Path: Portal

By default, guide the user to the Foundry portal to create guardrails interactively.

**Construct and show this URL to the user:**

```
https://ai.azure.com/nextgen/r/{encodedSubId},{resourceGroup},,{accountName},{projectName}/build/guardrails
```

Where:
- `\{encodedSubId\}` — subscription GUID as URL-safe base64 (no `=` padding):
  ```bash
  python -c "import base64,uuid;print(base64.urlsafe_b64encode(uuid.UUID('<SUBSCRIPTION_ID>').bytes).rstrip(b'=').decode())"
  ```
- `\{resourceGroup\}` — resource group name
- `\{accountName\}` — AI Services account name
- `\{projectName\}` — Foundry project name

If resource details are unknown, use the generic URL and instruct the user to navigate manually:

```
https://ai.azure.com
```

Then navigate: select your project → **Build** → **Guardrails** → **Create Guardrail**.

> Use the API path ([guardrail-api-create.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-create-references-guardrails-guardrail-api-create)) only when the user explicitly asks for programmatic/CLI/CI/CD creation.

## Intervention Points

| Intervention Point | Models | Agents (Preview) | Toolbox |
|---|---|---|---|
| User input | Yes | Yes | No |
| Tool call | No | Yes | Yes |
| Tool response | No | Yes | Yes |
| Output | Yes | Yes | No |

Tool call and tool response are agent-only (and toolbox). An agent's guardrail fully overrides its model deployment's guardrail at all intervention points.

## Default Guardrails

| Policy Name | Description | Editable |
|-------------|-------------|----------|
| `Microsoft.Default` | Base default policy (4 categories) | No |
| `Microsoft.DefaultV2` | Updated default with jailbreak + protected material | No |
| Custom policies | User-created policies | Yes |
