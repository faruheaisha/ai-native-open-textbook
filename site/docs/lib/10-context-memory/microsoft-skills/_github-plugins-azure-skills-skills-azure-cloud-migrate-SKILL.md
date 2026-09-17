---
title: "Azure Cloud Migrate"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-cloud-migrate/SKILL.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-cloud-migrate/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-cloud-migrate/SKILL.md"
sourceSha256: "92766b8047f8f31eae9e4168d2bb903515d211146a97d00c795b535f77677ca7"
pageSha256: "92766b8047f8f31eae9e4168d2bb903515d211146a97d00c795b535f77677ca7"
contentMode: "local-full"
zh: ""
---

# Azure Cloud Migrate

> This skill handles **assessment and code migration** of existing cloud workloads to Azure.

## Rules

1. Follow phases sequentially — do not skip
2. Generate assessment before any code migration
3. Load the scenario reference and follow its rules
4. Use `mcp_azure_mcp_get_azure_bestpractices` and `mcp_azure_mcp_documentation` MCP tools
5. Use the latest supported runtime for the target service
6. Destructive actions require `ask_user` — [functions global-rules](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-cloud-migrate-references-services-functions-global-rules) | [app-service global-rules](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-cloud-migrate-references-services-app-service-global-rules)
7. **Report progress to user** — During long-running operations (deployments, image pushes), provide resource-level status updates so the user is never left waiting without feedback — see [workflow-details.md](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-cloud-migrate/references/workflow-details.md)
8. **Audit service discovery in app code** — Kubernetes DNS names (e.g., `http://order-service:3001`) do not resolve in Container Apps. During assessment, scan source code for hardcoded hostnames/ports in HTTP clients and flag them for env-var-driven URL injection

## Migration Scenarios

| Source | Target | Reference |
|--------|--------|-----------|
| AWS Lambda | Azure Functions | [lambda-to-functions.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-cloud-migrate-references-services-functions-lambda-to-functions) ([assessment](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-cloud-migrate-references-services-functions-assessment), [code-migration](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-cloud-migrate-references-services-functions-code-migration)) |
| AWS Elastic Beanstalk | Azure App Service | [beanstalk-to-app-service.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-cloud-migrate-references-services-app-service-beanstalk-to-app-service) |
| Heroku | Azure App Service | [heroku-to-app-service.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-cloud-migrate-references-services-app-service-heroku-to-app-service) |
| Google App Engine | Azure App Service | [app-engine-to-app-service.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-cloud-migrate-references-services-app-service-app-engine-to-app-service) |
| AWS Fargate (ECS) | Azure Container Apps | [fargate-to-container-apps.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-cloud-migrate-references-services-container-apps-fargate-to-container-apps) ([assessment](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-cloud-migrate-references-services-container-apps-fargate-assessment-guide), [deployment](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-cloud-migrate-references-services-container-apps-fargate-deployment-guide)) |
| Kubernetes (GKE/EKS/Self-hosted) | Azure Container Apps | [k8s-to-container-apps.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-cloud-migrate-references-services-container-apps-k8s-to-container-apps) |
| GCP Cloud Run | Azure Container Apps | [cloudrun-to-container-apps.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-cloud-migrate-references-services-container-apps-cloudrun-to-container-apps) |
| Spring Boot (Azure Spring Apps/VMs) | Azure Container Apps | [spring-apps-to-aca.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-cloud-migrate-references-services-container-apps-spring-apps-to-aca) |

> No matching scenario? Use `mcp_azure_mcp_documentation` and `mcp_azure_mcp_get_azure_bestpractices` tools.

## Output Directory
