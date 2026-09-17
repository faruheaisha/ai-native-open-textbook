---
title: "Deploy & Track"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/resource/private-network/references/deploy.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/resource/private-network/references/deploy.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/resource/private-network/references/deploy.md"
sourceSha256: "e57a4fd3db44738b9087902fb3756dc57e969381a8ba6ba327e0cc771f2de3f9"
pageSha256: "e57a4fd3db44738b9087902fb3756dc57e969381a8ba6ba327e0cc771f2de3f9"
contentMode: "local-full"
zh: ""
---

# Deploy & Track

Applies to all private network deployments.

## Deploy

```bash
az deployment group create \
  --resource-group <rg> \
  --template-file main.bicep \
  --parameters main.bicepparam \
