---
title: "Container Apps Bicep Patterns"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/services/container-apps/bicep.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/services/container-apps/bicep.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/services/container-apps/bicep.md"
sourceSha256: "b4017d5e45de6a59abf0bf500ef587222c0392cd7609b2f12416d0d923e9dcf9"
pageSha256: "b4017d5e45de6a59abf0bf500ef587222c0392cd7609b2f12416d0d923e9dcf9"
contentMode: "local-full"
zh: ""
---

# Container Apps Bicep Patterns

> **⚠️ Container Registry Naming:** If using Azure Container Registry, names must be alphanumeric only (5-50 characters). Use `replace()` to remove hyphens: `replace('cr${environmentName}${resourceSuffix\}', '-', '')`

> **⚠️ Two-Phase Deployment (Mandatory):** To avoid a circular dependency when scoping the AcrPull role assignment to a Bicep module, use the two-phase pattern below:
> - **Phase 1:** Deploy ACR and Container App with a public placeholder image and **no** `registries` block.
> - **Phase 2:** Deploy the AcrPull role assignment as a **separate module** using outputs from Phase 1.
>
