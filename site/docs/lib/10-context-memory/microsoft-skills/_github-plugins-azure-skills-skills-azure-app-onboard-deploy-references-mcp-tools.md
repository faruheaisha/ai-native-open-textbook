---
title: "Deploy Phase — MCP Tools"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-app-onboard/deploy/references/mcp-tools.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-app-onboard/deploy/references/mcp-tools.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-app-onboard/deploy/references/mcp-tools.md"
sourceSha256: "6d5474a43c7aa0797bd1117ffa7cff0d14b0eb40f9fce58de26d92aca24a3b6e"
pageSha256: "6d5474a43c7aa0797bd1117ffa7cff0d14b0eb40f9fce58de26d92aca24a3b6e"
contentMode: "local-full"
zh: ""
---

# Deploy Phase — MCP Tools

Phase-exclusive tool parameters for the deploy phase. For shared tools (`subscription_list`, `group_list`, `extension_cli_install`, `get_azure_bestpractices`), see [mcp-tool-reference.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-app-onboard-references-mcp-tool-reference).

> **Troubleshooting:** If a tool call fails with unknown parameter or missing command errors, consult the official docs: <https://learn.microsoft.com/en-us/azure/developer/azure-mcp-server/tools/>

---

## `mcp_azure_mcp_deploy` (hierarchical — deploy-phase sub-commands)

| Sub-command | Required Params | Optional Params | Read-Only |
|-------------|----------------|-----------------|-----------|
| `deploy_app_logs_get` | `workspace-folder`, `azd-env-name` | `limit` (default 200) | ✅ |
| `deploy_architecture_diagram_generate` | `workspaceFolder`, `services[]` (complex array with name, path, language, port, azureComputeHost, dependencies, settings) | `projectName` | ✅ |

## `mcp_azure_mcp_resourcehealth` (hierarchical)

| Sub-command | Required Params | Optional Params | Read-Only |
|-------------|----------------|-----------------|-----------|
| `resourcehealth_availability-status_get` | *(none)* | `subscription`, `resourceId` (full ARM ID), `resource-group` | ✅ |
| `resourcehealth_health-events_list` | *(none)* | `subscription`, `event-type` (ServiceIssue\|PlannedMaintenance\|HealthAdvisory\|Security), `status` (Active\|Resolved), `tracking-id`, `filter`, `query-start-time`, `query-end-time` | ✅ |

## `mcp_azure_mcp_monitor` (hierarchical)

| Sub-command | Required Params | Optional Params | Read-Only |
|-------------|----------------|-----------------|-----------|
| `monitor_activitylog_list` | `resource-name` | `resource-group`, `resource-type`, `hours`, `event-level` (Critical\|Error\|Informational\|Verbose\|Warning), `top`, `subscription` | ✅ |
| `monitor_metrics_query` | `resource`, `metric-names` (comma-sep), `metric-namespace` | `resource-group`, `resource-type`, `start-time`, `end-time`, `interval`, `aggregation` (Average\|Maximum\|Minimum\|Total\|Count), `filter`, `max-buckets` | ✅ |
| `monitor_metrics_definitions` | `resource` | `resource-group`, `resource-type`, `metric-namespace`, `search-string`, `limit` | ✅ |
| `monitor_workspace_list` | *(none)* | `subscription` | ✅ |
| `monitor_workspace_log_query` | `resource-group`, `workspace`, `table`, `query` (KQL or "recent"\|"errors") | `hours`, `limit`, `subscription` | ✅ |
| `monitor_resource_log_query` | `resource-id` (full ARM ID), `table`, `query` | `hours`, `limit`, `subscription` | ✅ |

## `mcp_azure_mcp_appservice` (hierarchical)

| Sub-command | Required Params | Optional Params | Read-Only |
|-------------|----------------|-----------------|-----------|
| `appservice_webapp_get` | *(none)* | `app`, `resource-group`, `subscription` | ✅ |
| `appservice_webapp_deployment_get` | `resource-group`, `app` | `deployment-id`, `subscription` | ✅ |
| `appservice_webapp_diagnostic_diagnose` | `resource-group`, `app`, `detector-name` (Availability\|CpuAnalysis\|MemoryAnalysis) | `start-time`, `end-time`, `interval`, `subscription` | ✅ |
| `appservice_webapp_diagnostic_list` | `resource-group`, `app` | `subscription` | ✅ |
| `appservice_webapp_settings_get-appsettings` | `resource-group`, `app` | `subscription` | ✅ (⚠️ secret) |
| `appservice_database_add` | `resource-group`, `app`, `database-type` (SqlServer\|MySQL\|PostgreSQL\|CosmosDB), `database-server`, `database` | `connection-string`, `subscription` | ❌ |
| `appservice_webapp_settings_update-appsettings` | `resource-group`, `app`, `setting-name`, `setting-update-type` (add\|set\|delete) | `setting-value`, `subscription` | ❌ (destructive) |

## `mcp_azure_mcp_role` (hierarchical)

| Sub-command | Required Params | Optional Params | Read-Only |
|-------------|----------------|-----------------|-----------|
| `role_assignment_list` | `scope` (ARM scope path) | `subscription` | ✅ |

---

## Phase 4 Tool Map

| Tool | Sub-command | AppOnboard Step | Purpose |
|------|-----------|----------|---------|
| `mcp_azure_mcp_resourcehealth` | `resourcehealth_availability-status_get` | Step 7 | Post-deploy health. Call with `resourceId` from `deploy-result.json.resourceIds[]` |
| `mcp_azure_mcp_resourcehealth` | `resourcehealth_health-events_list` | Step 3 | Pre-deploy outage check. `event-type: "ServiceIssue"`, `status: "Active"` |
| `mcp_azure_mcp_monitor` | `monitor_activitylog_list` | Step 7+ | Failed deployment analysis. `resource-name` from deploy output, `event-level: "Error"`, `hours: 1` |
| `mcp_azure_mcp_monitor` | `monitor_metrics_query` | Step 7 | Performance validation. Requires `metric-namespace` from `monitor_metrics_definitions` first |
| `mcp_azure_mcp_appservice` | `appservice_webapp_get` | Step 7 | Verify App Service state, hostnames, runtime |
| `mcp_azure_mcp_appservice` | `appservice_webapp_deployment_get` | Step 7 | Verify deployment completed successfully |
| `mcp_azure_mcp_appservice` | `appservice_webapp_diagnostic_diagnose` | Step 7 | Run `Availability` detector on deployed app |
| `mcp_azure_mcp_deploy` | `deploy_app_logs_get` | Step 7 | App logs for azd-deployed apps only. Requires `workspace-folder` + `azd-env-name` |
| `mcp_azure_mcp_role` | `role_assignment_list` | Step 3 | Preflight RBAC check. `scope: "/subscriptions/\{sub\}/resourceGroups/\{rg\}"` |
| `mcp_azure_mcp_subscription_list` | *(flat)* | Step 1 | Resolve target subscription |
| `mcp_azure_mcp_group_list` | *(flat)* | Step 3 | Verify RG exists before deploy |
| `mcp_azure_mcp_extension_cli_install` | *(flat)* | Step 3 | Ensure az/azd/func CLI installed |
