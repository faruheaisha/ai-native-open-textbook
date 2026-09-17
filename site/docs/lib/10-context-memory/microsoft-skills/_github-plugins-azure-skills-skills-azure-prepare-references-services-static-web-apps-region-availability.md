---
title: "SWA Region Availability"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/services/static-web-apps/region-availability.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/services/static-web-apps/region-availability.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/services/static-web-apps/region-availability.md"
sourceSha256: "b6e4d8d309dc36069d2db6fe4d342ca44ac514017796ea3abd91fd3c630a1c53"
pageSha256: "b6e4d8d309dc36069d2db6fe4d342ca44ac514017796ea3abd91fd3c630a1c53"
contentMode: "local-full"
zh: ""
---

# SWA Region Availability

⚠️ **NOT available in many common regions** — Check before deployment.

| ✅ Available | ❌ NOT Available (will FAIL) |
|-------------|------------------------------|
| `westus2` | `eastus` |
| `centralus` | `northeurope` |
| `eastus2` | `southeastasia` |
| `westeurope` | `uksouth` |
| `eastasia` | `canadacentral` |
| | `australiaeast` |
| | `westus3` |

## Recommended Regions

| Pattern | Use |
|---------|-----|
| SWA only | `westus2`, `centralus`, `eastus2`, `westeurope`, `eastasia` |
| SWA + backend | `westus2`, `centralus`, `eastus2`, `westeurope`, `eastasia` |
| SWA + Azure OpenAI | `eastus2` (only region with full overlap) |
