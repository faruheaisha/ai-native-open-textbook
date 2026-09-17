---
title: "Azure Container Apps"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/services/container-apps/README.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/services/container-apps/README.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/services/container-apps/README.md"
sourceSha256: "2b8ddcda88e643368c81db332d34fd8093e4aa813a861edbb8a7759594634f35"
pageSha256: "2b8ddcda88e643368c81db332d34fd8093e4aa813a861edbb8a7759594634f35"
contentMode: "local-full"
zh: ""
---

# Azure Container Apps

Serverless container hosting for microservices, APIs, and background workers.

## When to Use

- Microservices and APIs
- Background processing workers
- Event-driven applications
- Web applications (server-rendered)
- Any containerized workload that doesn't need full Kubernetes

## Service Type in azure.yaml

```yaml
services:
  my-api:
    host: containerapp
    project: ./src/my-api
    docker:
      path: ./Dockerfile
```

## Required Supporting Resources

| Resource | Purpose |
|----------|---------|
| Container Apps Environment | Hosting environment |
| Container Registry | Image storage |
| Log Analytics Workspace | Logging |
| Application Insights | Monitoring |

## Common Configurations

| Workload Type | Ingress | Min Replicas | Scaling |
|---------------|---------|--------------|---------|
| API Service | External | 1 (avoid cold starts) | HTTP-based |
| Background Worker | None | 0 (scale to zero) | Queue-based |
| Web Application | External | 1 | HTTP-based |

## References

- [Bicep Patterns](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-container-apps-bicep)
- [Terraform Patterns](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-container-apps-terraform)
- [Scaling Patterns](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-container-apps-scaling)
- [Health Probes](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-container-apps-health-probes)
- [Environment Variables](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-container-apps-environment)
- [Day-2 Operations](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-container-apps-day2-operations)
- [Networking & Ingress](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-container-apps-networking)
- [Revisions & Traffic Splitting](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-container-apps-revisions)
