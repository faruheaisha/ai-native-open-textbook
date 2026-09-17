---
title: "Azure Static Web Apps"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/services/static-web-apps/README.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/services/static-web-apps/README.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/services/static-web-apps/README.md"
sourceSha256: "cb71e4572e322ba19472ab71a8afbd224318ed8a847ade3d110664ab041febff"
pageSha256: "cb71e4572e322ba19472ab71a8afbd224318ed8a847ade3d110664ab041febff"
contentMode: "local-full"
zh: ""
---

# Azure Static Web Apps

Serverless hosting for static sites and SPAs with integrated APIs.

## When to Use

- Single Page Applications (React, Vue, Angular)
- Static sites (HTML/CSS/JS)
- JAMstack applications
- Sites with serverless API backends
- Documentation sites

## Service Type in azure.yaml

```yaml
services:
  my-web:
    host: staticwebapp
    project: ./src/web
```

## Required Supporting Resources

| Resource | Purpose |
|----------|---------|
| None required | Static Web Apps is fully managed |
| Application Insights | Monitoring (optional) |

## SKU Selection

| SKU | Features |
|-----|----------|
| Free | 2 custom domains, 0.5GB storage, shared bandwidth |
| Standard | 5 custom domains, 2GB storage, SLA, auth customization |

## Build Configuration

| Framework | outputLocation |
|-----------|----------------|
| React | `build` |
| Vue | `dist` |
| Angular | `dist/my-app` |
| Next.js (Static) | `out` |

## API Integration

Integrated Functions API structure:

```
project/
├── src/           # Frontend
└── api/           # Azure Functions API
    ├── hello/
    │   └── index.js
    └── host.json
```

## References

- [Region Availability](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-static-web-apps-region-availability)
- [Bicep Patterns](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-static-web-apps-bicep)
- [Terraform Patterns](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-static-web-apps-terraform)
- [Routing and Auth](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-static-web-apps-routing)
- [Deployment](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-static-web-apps-deployment)
