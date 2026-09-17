---
title: "Customize Workflow — Detailed Phase Instructions"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/models/deploy-model/customize/references/customize-workflow.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/models/deploy-model/customize/references/customize-workflow.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/models/deploy-model/customize/references/customize-workflow.md"
sourceSha256: "9b7881474c34d46b58678bc6c88e9254248cedd4c177ab83b61d04d8f83b06f6"
pageSha256: "9b7881474c34d46b58678bc6c88e9254248cedd4c177ab83b61d04d8f83b06f6"
contentMode: "local-full"
zh: ""
---

# Customize Workflow — Detailed Phase Instructions

> Reference for: `models/deploy-model/customize/SKILL.md`

## Phase 1: Verify Authentication

```bash
az account show --query "{Subscription:name, User:user.name}" -o table
```

If not logged in: `az login`

Set subscription if needed:
```bash
az account list --query "[].[name,id,state]" -o table
