---
title: "Bicep — Static Web Apps Patterns"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-app-onboard/scaffold/references/bicep-swa.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-app-onboard/scaffold/references/bicep-swa.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-app-onboard/scaffold/references/bicep-swa.md"
sourceSha256: "31c03f23799c8111e9fcfe13c087483d3b30b9f4a6e4738c1b98d25329440475"
pageSha256: "31c03f23799c8111e9fcfe13c087483d3b30b9f4a6e4738c1b98d25329440475"
contentMode: "local-full"
zh: ""
---

# Bicep — Static Web Apps Patterns

SWA-specific Bicep patterns. For shared patterns (skeleton, naming, tags, security defaults, data modules), see [bicep-patterns.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-app-onboard-scaffold-references-bicep-patterns).

## Module Template

SWA modules for token-based deploys (no GitHub CI/CD):

```bicep
resource staticWebApp 'Microsoft.Web/staticSites@2023-12-01' = {
  name: swaName
  location: location
  tags: tags
  sku: { name: 'Free', tier: 'Free' }
  properties: {} // ⛔ MUST be empty — no repositoryUrl, no branch, no buildProperties
}
```

> ⛔ **Detached SWA deploy:** Omit `repositoryUrl`, `branch`, and `buildProperties` entirely. These are only for GitHub Actions–connected deployments. Including `repositoryUrl: ''` causes `BadRequest: RepositoryUrl is invalid`.
