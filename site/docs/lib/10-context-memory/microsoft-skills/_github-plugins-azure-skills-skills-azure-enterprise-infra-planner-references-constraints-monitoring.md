---
title: "Monitoring Pairing Constraints"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-enterprise-infra-planner/references/constraints/monitoring.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-enterprise-infra-planner/references/constraints/monitoring.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-enterprise-infra-planner/references/constraints/monitoring.md"
sourceSha256: "fe25a9801c704331fdbd29037b2a09996c17477c94efe44fb9b9ad988baa038f"
pageSha256: "fe25a9801c704331fdbd29037b2a09996c17477c94efe44fb9b9ad988baa038f"
contentMode: "local-full"
zh: ""
---

# Monitoring Pairing Constraints

### Application Insights

| Paired With | Constraint |
|-------------|------------|
| **Log Analytics** | Workspace-based App Insights (recommended) requires `WorkspaceResourceId`. Classic (standalone) is being phased out. |
| **Function App** | Set `APPLICATIONINSIGHTS_CONNECTION_STRING` or `APPINSIGHTS_INSTRUMENTATIONKEY` in function app settings. |
| **App Service** | Set `APPLICATIONINSIGHTS_CONNECTION_STRING` in app settings. Enable auto-instrumentation for supported runtimes. |
| **AKS** | Use Container Insights (different from App Insights) for cluster-level monitoring. App Insights used for application-level telemetry. |
| **Private Link** | Use Azure Monitor Private Link Scope (AMPLS) to restrict ingestion/query to private networks. |
| **Retention** | If workspace-based, retention is governed by the Log Analytics workspace. Component-level retention acts as an override. |

### Log Analytics

| Paired With | Constraint |
|-------------|------------|
| **Application Insights** | App Insights `WorkspaceResourceId` must reference this workspace. Both should be in the same region for optimal performance. |
| **AKS (Container Insights)** | AKS `omsagent` addon references workspace via `logAnalyticsWorkspaceResourceID`. |
| **Diagnostic Settings** | Multiple resources can send diagnostics to the same workspace. Configure via `Microsoft.Insights/diagnosticSettings` on each resource. |
| **Retention** | Free tier is limited to 7-day retention. PerGB2018 supports 30–730 days. Archive tier available for longer retention. |
| **Private Link** | Use Azure Monitor Private Link Scope (AMPLS) for private ingestion/query. A workspace can be linked to up to 100 AMPLS resources (a VNet can connect to only one AMPLS). |
