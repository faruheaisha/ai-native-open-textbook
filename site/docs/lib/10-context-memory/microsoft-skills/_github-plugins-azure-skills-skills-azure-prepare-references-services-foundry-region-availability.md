---
title: "Foundry Region Availability"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/services/foundry/region-availability.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/services/foundry/region-availability.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/services/foundry/region-availability.md"
sourceSha256: "8c0ad6778f2528d544f234c4eae4930f0bd4afeabae477f57778a5677af0c83e"
pageSha256: "8c0ad6778f2528d544f234c4eae4930f0bd4afeabae477f57778a5677af0c83e"
contentMode: "local-full"
zh: ""
---

# Foundry Region Availability

⚠️ **Very limited — varies by model**

| Region | GPT-4o | GPT-4 | GPT-3.5 | Embeddings |
|--------|:------:|:-----:|:-------:|:----------:|
| `eastus` | ✅ | ✅ | ✅ | ✅ |
| `eastus2` | ✅ | ✅ | ✅ | ✅ |
| `westus` | ⚠️ | ⚠️ | ✅ | ✅ |
| `westus3` | ✅ | ⚠️ | ✅ | ✅ |
| `southcentralus` | ✅ | ✅ | ✅ | ✅ |
| `swedencentral` | ✅ | ✅ | ✅ | ✅ |
| `westeurope` | ⚠️ | ✅ | ✅ | ✅ |

> Check https://learn.microsoft.com/azure/ai-services/openai/concepts/models for current model availability.

## Recommended Regions

| Need | Recommended Region |
|------|--------------------|
| Full model availability | `eastus`, `eastus2`, `swedencentral` |
| Europe compliance | `swedencentral`, `westeurope` |
| With SWA | `eastus2` (only overlap) |
