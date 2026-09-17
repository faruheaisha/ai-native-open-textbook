---
title: "Preset Deployment Workflow — Step-by-Step"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/models/deploy-model/preset/references/workflow.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/models/deploy-model/preset/references/workflow.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/models/deploy-model/preset/references/workflow.md"
sourceSha256: "fd7c06e54cf7f1dc437b6e30683550f2511e9138f7038e67b7c382730a0c83e2"
pageSha256: "fd7c06e54cf7f1dc437b6e30683550f2511e9138f7038e67b7c382730a0c83e2"
contentMode: "local-full"
zh: ""
---

# Preset Deployment Workflow — Step-by-Step

Condensed implementation reference for preset (optimal region) model deployment. See [SKILL.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-models-deploy-model-preset-SKILL) for overview.

**Table of Contents:** [Phase 1: Verify Authentication](#phase-1-verify-authentication) · [Phase 2: Get Current Project](#phase-2-get-current-project) · [Phase 3: Get Model Name](#phase-3-get-model-name) · [Phase 4: Check Current Region Capacity](#phase-4-check-current-region-capacity) · [Phase 5: Query Multi-Region Capacity](#phase-5-query-multi-region-capacity) · [Phase 6: Select Region and Project](#phase-6-select-region-and-project) · [Phase 7: Deploy Model](#phase-7-deploy-model)

---

## Phase 1: Verify Authentication

```bash
az account show --query "{Subscription:name, User:user.name}" -o table
```

If not logged in: `az login`

Switch subscription:

```bash
az account list --query "[].[name,id,state]" -o table
