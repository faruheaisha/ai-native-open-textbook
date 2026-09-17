---
title: "Static Web Apps - Bicep Patterns"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/services/static-web-apps/bicep.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/services/static-web-apps/bicep.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/services/static-web-apps/bicep.md"
sourceSha256: "8d091b309d29a4fb4be5bf76bf082aa805fafde25fa5e72debc0fc45487cb834"
pageSha256: "8d091b309d29a4fb4be5bf76bf082aa805fafde25fa5e72debc0fc45487cb834"
contentMode: "local-full"
zh: ""
---

# Static Web Apps - Bicep Patterns

## Basic Resource

```bicep
resource staticWebApp 'Microsoft.Web/staticSites@2022-09-01' = \{
  name: '${resourcePrefix}-${serviceName\}-${uniqueHash}'
  location: location
  sku: {
    name: 'Standard'
    tier: 'Standard'
  }
  properties: {
    buildProperties: {
      appLocation: '/'
      apiLocation: 'api'
      outputLocation: 'dist'
    }
  }
}
```

## Custom Domain

```bicep
resource customDomain 'Microsoft.Web/staticSites/customDomains@2022-09-01' = {
  parent: staticWebApp
  name: 'www.example.com'
  properties: {}
}
```

## Application Settings

For the integrated API:

```bicep
resource staticWebAppSettings 'Microsoft.Web/staticSites/config@2022-09-01' = {
  parent: staticWebApp
  name: 'appsettings'
  properties: {
    DATABASE_URL: '@Microsoft.KeyVault(VaultName=${keyVault.name\};SecretName=db-url)'
  \}
\}
```

## Deployment Token

> ⚠️ **Security Warning:** Do NOT expose deployment tokens in Bicep outputs.

See [deployment.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-static-web-apps-deployment) for secure token handling.
