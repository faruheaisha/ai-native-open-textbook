---
title: "EMM Prerequisites"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-compute/workflows/essential-machine-management/references/emm-prerequisites.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-compute/workflows/essential-machine-management/references/emm-prerequisites.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-compute/workflows/essential-machine-management/references/emm-prerequisites.md"
sourceSha256: "e35227c1b7d0c7e388a591841fcf88900b4a68fe01645631dbc0172ea486bb15"
pageSha256: "e35227c1b7d0c7e388a591841fcf88900b4a68fe01645631dbc0172ea486bb15"
contentMode: "local-full"
zh: ""
---

# EMM Prerequisites

Requirements that must be met before enabling Essential Machine Management.

## Required Azure Resources

| Resource | Purpose |
| -------- | ------- |
| Log Analytics workspace | Collects log data from Change Tracking & Inventory |
| Azure Monitor workspace | Collects metrics data from VM Insights |
| User-assigned managed identity (UAMI) | Used to onboard and configure VMs in the subscription |

## Required User Roles

The user performing the enrollment must have these roles on the target subscription:

| Role | Description |
| ---- | ----------- |
| Essential Machine Management Administrator | Manages EMM resources, DCRs, monitor/workspace operations, security pricing |
| Managed Identity Operator | Reads and assigns user-assigned identities |
| Resource Policy Contributor | Creates/modifies resource policies, policy assignments, and exemptions |

### Cross-Subscription Workspace Scenario

If the Log Analytics or Azure Monitor workspace is in a **different subscription**:
- The user must also have **Essential Machine Management Administrator** on the resource group of the workspace
- The `Microsoft.ManagedOps` RP must be registered in the workspace subscription

## Required Managed Identity Roles

The user-assigned managed identity must have:

| Role | Scope |
| ---- | ----- |
| Contributor | Target subscription being enabled |

If workspaces are in a different subscription:
- **Contributor** on the resource group of the Log Analytics workspace and/or Azure Monitor workspace

## EMM Administrator Permissions Detail

The Essential Machine Management Administrator role includes these actions:

```text
Microsoft.Resources/deployments/*
Microsoft.Insights/dataCollectionRules/read
Microsoft.Insights/dataCollectionRules/write
Microsoft.Monitor/accounts/write
Microsoft.Monitor/accounts/read
Microsoft.ManagedOps/managedOps/read
Microsoft.ManagedOps/managedOps/write
Microsoft.ManagedOps/managedOps/delete
Microsoft.OperationsManagement/solutions/read
Microsoft.OperationsManagement/solutions/write
Microsoft.OperationalInsights/workspaces/read
Microsoft.OperationalInsights/workspaces/sharedkeys/action
Microsoft.OperationalInsights/workspaces/sharedkeys/read
Microsoft.OperationalInsights/workspaces/listKeys/action
Microsoft.Resources/subscriptions/resourceGroups/read
Microsoft.Insights/metricAlerts/write
Microsoft.Insights/metricAlerts/read
Microsoft.Security/pricings/write
Microsoft.Security/pricings/read
```

## Resource Provider Registrations

The following RPs are registered automatically during the enable flow:

| Resource Provider | Purpose |
| ----------------- | ------- |
| `Microsoft.ManagedOps` | Core EMM resource provider |
| `Microsoft.OperationsManagement` | Operations management solutions |
| `Microsoft.PolicyInsights` | Policy compliance and remediation |
| `Microsoft.Insights` | Monitoring and data collection rules |
| `Microsoft.OperationalInsights` | Log Analytics workspaces |
| `Microsoft.Monitor` | Azure Monitor workspaces |
| `Microsoft.ManagedIdentity` | Managed identity operations |
| `Microsoft.Security` | Defender for Cloud and CSPM |
| `Microsoft.Resources` | ARM deployments |

## Validation Checklist

Before enabling EMM, verify:

- [ ] User has all 3 required roles on the subscription
- [ ] UAMI exists and has Contributor on the subscription
- [ ] Log Analytics workspace exists (or will be created)
- [ ] Azure Monitor workspace exists (or will be created)
- [ ] If cross-subscription workspaces: additional roles and RP registrations in place
