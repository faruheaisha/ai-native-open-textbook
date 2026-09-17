---
title: "Azure App Service"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/services/app-service/README.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/services/app-service/README.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/services/app-service/README.md"
sourceSha256: "3620ac9f15a79ab9a201417e8367366b883d87eec66b223fe81b3b3dc6cb0656"
pageSha256: "3620ac9f15a79ab9a201417e8367366b883d87eec66b223fe81b3b3dc6cb0656"
contentMode: "local-full"
zh: ""
---

# Azure App Service

Hosting patterns and best practices for Azure App Service.

## When to Use

- Traditional web applications
- REST APIs without containerization
- .NET, Node.js, Python, Java, PHP applications
- When Docker is not required/desired
- When built-in deployment slots are needed

## Service Type in azure.yaml

```yaml
services:
  my-web:
    host: appservice
    project: ./src/my-web
```

## Required Supporting Resources

| Resource | Purpose |
|----------|---------|
| App Service Plan | Compute hosting |
| Application Insights | Monitoring |
| Key Vault | Secrets (optional) |

## Runtime Stacks

> 💡 **Tip:** Prefer Linux App Service Plans for Node.js, Python, and Java. Use Windows only when explicitly required (e.g. .NET Framework). See [Bicep Patterns](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-app-service-bicep) for Linux vs Windows configuration.

### Linux (recommended)

| Language | linuxFxVersion |
|----------|----------------|
| Node.js 24 | `NODE\|24-lts` |
| Node.js 22 | `NODE\|22-lts` |
| Python 3.14 | `PYTHON\|3.14` |
| .NET 10 | `DOTNETCORE\|10.0` |
| Java 21 | `JAVA\|21-java21` |

### Windows

| Language | Setting |
|----------|---------|
| Node.js | `WEBSITE_NODE_DEFAULT_VERSION: '~24'` (app setting) |
| .NET 10 | Built-in (no extra config) |

## SKU Selection

| SKU | Use Case |
|-----|----------|
| F1/D1 | Development/testing (free/shared) |
| B1-B3 | Small production, basic features |
| S1-S3 | Production with auto-scale, slots |
| P1v3-P3v3 | High-performance production |

## Health Checks

Always configure health check path:

```bicep
siteConfig: \{
  healthCheckPath: '/health'
\}
```

Endpoint should return 200 OK when healthy.

## Templates

For App Service templates with composable recipes (SQL, Cosmos DB, Auth, Redis), see [Template Selection](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-app-service-templates-selection).

## Common Data Backends

When pairing App Service with a data layer, load the corresponding service references:

| Data Service | Reference                                 |
| ------------ | ----------------------------------------- |
| Azure SQL    | [SQL Database](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-sql-database) |
| Cosmos DB    | [Cosmos DB](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-cosmos-db)       |

## References

- [Bicep Patterns](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-app-service-bicep)
- [Deployment Slots](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-app-service-deployment-slots)
- [Auto-Scaling](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-app-service-scaling)
- [Networking](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-app-service-networking)
- [SKU Selection](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-app-service-sku-selection)
- [Custom Domains](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-app-service-custom-domains)
