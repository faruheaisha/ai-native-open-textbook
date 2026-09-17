---
title: "Auto-instrument app"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/appinsights-instrumentation/references/auto.md"
sourceRel: ".github/plugins/azure-skills/skills/appinsights-instrumentation/references/auto.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/appinsights-instrumentation/references/auto.md"
sourceSha256: "8a0a447289e232dc54909017b4a490b46ca5fc1eb90099645eeb99b1b9a8a732"
pageSha256: "8a0a447289e232dc54909017b4a490b46ca5fc1eb90099645eeb99b1b9a8a732"
contentMode: "local-full"
zh: ""
---

# Auto-instrument app

Use Azure Portal to auto-instrument a webapp hosted in Azure App Service for App Insights without making any code changes. Only the following types of app can be auto-instrumented. See [supported environments and resource providers](https://learn.microsoft.com/azure/azure-monitor/app/codeless-overview#supported-environments-languages-and-resource-providers).

- ASP.NET Core app hosted in Azure App Service
- Node.js app hosted in Azure App Service

Construct a url to bring the user to the Application Insights blade in Azure Portal for the App Service App.
```
https://portal.azure.com/#resource/subscriptions/{subscription_id}/resourceGroups/{resource_group_name}/providers/Microsoft.Web/sites/{app_service_name}/monitoringSettings
```

Use the context or ask the user to get the subscription_id, resource_group_name, and the app_service_name hosting the webapp.
