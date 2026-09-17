---
title: "Monitoring Resources"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-enterprise-infra-planner/references/resources/monitoring.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-enterprise-infra-planner/references/resources/monitoring.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-enterprise-infra-planner/references/resources/monitoring.md"
sourceSha256: "8695b39739d677d08a65bc736469370fa7a5248ab00d959f11c07b859f0c9d0a"
pageSha256: "8695b39739d677d08a65bc736469370fa7a5248ab00d959f11c07b859f0c9d0a"
contentMode: "local-full"
zh: ""
---

# Monitoring Resources

| Resource | ARM Type | API Version | CAF Prefix | Naming Scope | Region |
|----------|----------|-------------|------------|--------------|--------|
| Application Insights | `Microsoft.Insights/components` | `2020-02-02` | `appi` | Resource group | Mainstream |
| Log Analytics | `Microsoft.OperationalInsights/workspaces` | `2025-02-01` | `log` | Resource group | Mainstream |

## Documentation

| Resource | Bicep Reference | Service Overview | Naming Rules | Additional |
|----------|----------------|------------------|--------------|------------|
| Application Insights | [2020-02-02](https://learn.microsoft.com/azure/templates/microsoft.insights/components?pivots=deployment-language-bicep) | [App Insights overview](https://learn.microsoft.com/azure/azure-monitor/app/app-insights-overview) | [Naming rules](https://learn.microsoft.com/azure/azure-resource-manager/management/resource-name-rules#microsoftinsights) | [Workspace-based](https://learn.microsoft.com/azure/azure-monitor/app/convert-classic-resource) |
| Log Analytics | [2025-02-01](https://learn.microsoft.com/azure/templates/microsoft.operationalinsights/workspaces?pivots=deployment-language-bicep) | [Log Analytics overview](https://learn.microsoft.com/azure/azure-monitor/logs/log-analytics-overview) | [Naming rules](https://learn.microsoft.com/azure/azure-resource-manager/management/resource-name-rules#microsoftoperationalinsights) | [Pricing](https://learn.microsoft.com/azure/azure-monitor/logs/cost-logs) |
