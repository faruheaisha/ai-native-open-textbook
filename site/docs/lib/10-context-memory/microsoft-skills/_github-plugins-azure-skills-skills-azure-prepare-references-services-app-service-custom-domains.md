---
title: "App Service Custom Domains and Managed TLS"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/services/app-service/custom-domains.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/services/app-service/custom-domains.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/services/app-service/custom-domains.md"
sourceSha256: "ed308f983c8720df4e20ded5edc5f734a08515ccc5bbc5abf55b912e61a992ee"
pageSha256: "ed308f983c8720df4e20ded5edc5f734a08515ccc5bbc5abf55b912e61a992ee"
contentMode: "local-full"
zh: ""
---

# App Service Custom Domains and Managed TLS

## Prerequisites

| Requirement | Details |
|------------|---------|
| SKU tier | Basic (B1) or higher |
| DNS access | Ability to create CNAME, A, and TXT records |
| Domain ownership | Verified via TXT record |

## DNS Configuration

### Subdomain (CNAME)

| Record Type | Name | Value |
|------------|------|-------|
