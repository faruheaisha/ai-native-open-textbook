---
title: "Capacity Discovery"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/models/deploy-model/capacity/SKILL.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/models/deploy-model/capacity/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/models/deploy-model/capacity/SKILL.md"
sourceSha256: "91b3ce958de44f728453572747504e8c9146f119892aa690546fd19f8d96a344"
pageSha256: "91b3ce958de44f728453572747504e8c9146f119892aa690546fd19f8d96a344"
contentMode: "local-full"
zh: ""
---

# Capacity Discovery

Finds available Azure OpenAI model capacity across all accessible regions and projects. Recommends the best deployment location based on capacity requirements.

## Quick Reference

| Property | Description |
|----------|-------------|
| **Purpose** | Find where you can deploy a model with sufficient capacity |
| **Scope** | All regions and projects the user has access to |
| **Output** | Ranked table of regions/projects with available capacity |
| **Action** | Read-only analysis — does NOT deploy. Hands off to preset or customize |
| **Authentication** | Azure CLI (`az login`) |

## When to Use This Skill

- ✅ User asks "where can I deploy gpt-4o?"
- ✅ User specifies a capacity target: "find a region with 10K TPM for gpt-4o"
- ✅ User wants to compare availability: "which regions have gpt-4o available?"
- ✅ User got a quota error and needs to find an alternative location
- ✅ User asks "best region and project for deploying model X"

**After discovery → hand off to [preset](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-models-deploy-model-preset-SKILL) or [customize](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-models-deploy-model-customize-SKILL) for actual deployment.**

## Scripts

Pre-built scripts handle the complex REST API calls and data processing. Use these instead of constructing commands manually.

| Script | Purpose | Usage |
|--------|---------|-------|
| `scripts/discover_and_rank.ps1` | Full discovery: capacity + projects + ranking | Primary script for capacity discovery |
| `scripts/discover_and_rank.sh` | Same as above (bash) | Primary script for capacity discovery |
| `scripts/query_capacity.ps1` | Raw capacity query (no project matching) | Quick capacity check or version listing |
| `scripts/query_capacity.sh` | Same as above (bash) | Quick capacity check or version listing |

## Workflow

### Phase 1: Validate Prerequisites

```bash
az account show --query "{Subscription:name, SubscriptionId:id}" --output table
```

### Phase 2: Identify Model and Version

Extract model name from user prompt. If version is unknown, query available versions:

```powershell
