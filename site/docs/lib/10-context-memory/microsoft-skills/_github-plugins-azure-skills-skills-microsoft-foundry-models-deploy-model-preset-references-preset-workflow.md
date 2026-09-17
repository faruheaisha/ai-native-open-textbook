---
title: "Preset Deployment Workflow - Detailed Implementation"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/models/deploy-model/preset/references/preset-workflow.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/models/deploy-model/preset/references/preset-workflow.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/models/deploy-model/preset/references/preset-workflow.md"
sourceSha256: "81af3221959d89f565c2eadd800841817bba373ed79df8f62568a9f9c30bb071"
pageSha256: "81af3221959d89f565c2eadd800841817bba373ed79df8f62568a9f9c30bb071"
contentMode: "local-full"
zh: ""
---

# Preset Deployment Workflow - Detailed Implementation

This file contains the full step-by-step bash/PowerShell scripts for preset (optimal region) model deployment. Referenced from the main [SKILL.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-models-deploy-model-preset-SKILL).

---

## Phase 1: Verify Authentication

Check if user is logged into Azure CLI:

```bash
az account show --query "{Subscription:name, User:user.name}" -o table
```

**If not logged in:**
```bash
az login
```

**Verify subscription is correct:**
```bash
# List all subscriptions
az account list --query "[].[name,id,state]" -o table

# Set active subscription if needed
