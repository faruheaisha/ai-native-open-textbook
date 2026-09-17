---
title: "Deploy Model"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/models/deploy-model/SKILL.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/models/deploy-model/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/models/deploy-model/SKILL.md"
sourceSha256: "ae0de869fdaee1a6b6b04582e723a2363d482d85a5c119f1963a2c36eff5667c"
pageSha256: "ae0de869fdaee1a6b6b04582e723a2363d482d85a5c119f1963a2c36eff5667c"
contentMode: "local-full"
zh: ""
---

# Deploy Model

> **Scope — read this first.** This skill creates model deployments **out-of-band** via Azure CLI / MCP / portal. For azd-managed Foundry projects (those scaffolded from `azd ai agent init`), declare deployments in `azure.yaml services.ai-project.deployments[]` instead — `azd ai agent init` writes the entry from the sample manifest and `azd provision` creates the deployment through Bicep. See [foundry-agent/create/create-hosted.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-create-create-hosted) for the Golden Path. Use this skill only for: (a) Foundry projects not managed by an azd project, (b) ad-hoc deployments outside the azd lifecycle.

Unified entry point for all Azure OpenAI model deployment workflows. Analyzes user intent and routes to the appropriate deployment mode.

## Quick Reference

| Mode | When to Use | Sub-Skill |
|------|-------------|-----------|
| **Preset** | Quick deployment, no customization needed | [preset/SKILL.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-models-deploy-model-preset-SKILL) |
| **Customize** | Full control: version, SKU, capacity, RAI policy | [customize/SKILL.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-models-deploy-model-customize-SKILL) |
| **Capacity Discovery** | Find where you can deploy with specific capacity | [capacity/SKILL.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-models-deploy-model-capacity-SKILL) |

## Intent Detection

Analyze the user's prompt and route to the correct mode:

```
User Prompt
    │
    ├─ Simple deployment (no modifiers)
    │  "deploy gpt-4o", "set up a model"
    │  └─> PRESET mode
    │
    ├─ Customization keywords present
    │  "custom settings", "choose version", "select SKU",
    │  "set capacity to X", "configure content filter",
    │  "PTU deployment", "with specific quota"
    │  └─> CUSTOMIZE mode
    │
    ├─ Capacity/availability query
    │  "find where I can deploy", "check capacity",
    │  "which region has X capacity", "best region for 10K TPM",
    │  "where is this model available"
    │  └─> CAPACITY DISCOVERY mode
    │
    └─ Ambiguous (has capacity target + deploy intent)
       "deploy gpt-4o with 10K capacity to best region"
       └─> CAPACITY DISCOVERY first → then PRESET or CUSTOMIZE
```

### Routing Rules

| Signal in Prompt | Route To | Reason |
|------------------|----------|--------|
| Just model name, no options | **Preset** | User wants quick deployment |
| "custom", "configure", "choose", "select" | **Customize** | User wants control |
| "find", "check", "where", "which region", "available" | **Capacity** | User wants discovery |
| Specific capacity number + "best region" | **Capacity → Preset** | Discover then deploy quickly |
| Specific capacity number + "custom" keywords | **Capacity → Customize** | Discover then deploy with options |
| "PTU", "provisioned throughput" | **Customize** | PTU requires SKU selection |
| "optimal region", "best region" (no capacity target) | **Preset** | Region optimization is preset's specialty |

### Multi-Mode Chaining

Some prompts require two modes in sequence:

**Pattern: Capacity → Deploy**
When a user specifies a capacity requirement AND wants deployment:
1. Run **Capacity Discovery** to find regions/projects with sufficient quota
2. Present findings to user
3. Ask: "Would you like to deploy with **quick defaults** or **customize settings**?"
4. Route to **Preset** or **Customize** based on answer

> 💡 **Tip:** If unsure which mode the user wants, default to **Preset** (quick deployment). Users who want customization will typically use explicit keywords like "custom", "configure", or "with specific settings".

## Project Selection (All Modes)

Before any deployment, resolve which project to deploy to. This applies to **all** modes (preset, customize, and after capacity discovery).

### Resolution Order

1. **Check `PROJECT_RESOURCE_ID` env var** — if set, use it as the default
2. **Check user prompt** — if user named a specific project or region, use that
3. **If neither** — query the user's projects and suggest the current one

### Confirmation Step (Required)

**Always confirm the target before deploying.** Show the user what will be used and give them a chance to change it:

```
Deploying to:
