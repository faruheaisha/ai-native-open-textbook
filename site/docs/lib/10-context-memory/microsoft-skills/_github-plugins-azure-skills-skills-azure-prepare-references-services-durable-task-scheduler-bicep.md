---
title: "Durable Task Scheduler — Bicep Patterns"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/services/durable-task-scheduler/bicep.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/services/durable-task-scheduler/bicep.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/services/durable-task-scheduler/bicep.md"
sourceSha256: "95b5e3061ddfe4a807905958feeed5f98c9d873e2d4d23c2afb46e26c6861c1d"
pageSha256: "95b5e3061ddfe4a807905958feeed5f98c9d873e2d4d23c2afb46e26c6861c1d"
contentMode: "local-full"
zh: ""
---

# Durable Task Scheduler — Bicep Patterns

Bicep templates for provisioning the Durable Task Scheduler, task hubs, and RBAC role assignments.

## Scheduler + Task Hub

```bicep
// Parameters — define these at file level or pass from a parent module
param schedulerName string
param location string = resourceGroup().location

@allowed(['Consumption', 'Dedicated'])
@description('Use Consumption for quickstarts/variable workloads, Dedicated for high-demand/predictable throughput')
param skuName string = 'Consumption'

resource scheduler 'Microsoft.DurableTask/schedulers@2025-11-01' = {
  name: schedulerName
  location: location
  properties: {
    sku: { name: skuName }
    ipAllowlist: ['0.0.0.0/0'] // Required: empty list denies all traffic
  }
}

resource taskHub 'Microsoft.DurableTask/schedulers/taskHubs@2025-11-01' = {
  parent: scheduler
  name: 'default'
}
```

## SKU Selection

| SKU | Best For |
|-----|----------|
| **Consumption** | quickstarts, variable or bursty workloads, pay-per-use |
| **Dedicated** | High-demand workloads, predictable throughput requirements |

> **💡 TIP**: Start with `Consumption` for development and variable workloads. Switch to `Dedicated` when you need consistent, high-throughput performance.

> **⚠️ WARNING**: The scheduler's `ipAllowlist` **must** include at least one entry (e.g., `['0.0.0.0/0']` for allow-all). An empty array `[]` denies **all** traffic, causing 403 errors on gRPC calls even with correct RBAC.

## RBAC — Durable Task Data Contributor

The Function App's managed identity **must** have the `Durable Task Data Contributor` role on the scheduler resource. Without it, the app receives **403 PermissionDenied** on gRPC calls.

```bicep
// Assumes the UAMI principal ID is passed from the base template's identity module
param functionAppPrincipalId string

var durableTaskDataContributorRoleId = '0ad04412-c4d5-4796-b79c-f76d14c8d402'

resource durableTaskRoleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(scheduler.id, functionAppPrincipalId, durableTaskDataContributorRoleId)
  scope: scheduler
  properties: {
    roleDefinitionId: subscriptionResourceId('Microsoft.Authorization/roleDefinitions', durableTaskDataContributorRoleId)
    principalId: functionAppPrincipalId
    principalType: 'ServicePrincipal'
  }
}
```

## RBAC — Dashboard Access for Developers

To allow developers to view orchestration status and history in the [DTS dashboard](https://portal.azure.com), assign the same `Durable Task Data Contributor` role to the deploying user's identity. Without this, the dashboard returns **403 Forbidden**.

```bicep
// Accept the deploying user's principal ID (azd auto-populates this from AZURE_PRINCIPAL_ID)
param principalId string = ''

resource dashboardRoleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = if (!empty(principalId)) {
  name: guid(scheduler.id, principalId, durableTaskDataContributorRoleId)
  scope: scheduler
  properties: {
    roleDefinitionId: subscriptionResourceId('Microsoft.Authorization/roleDefinitions', durableTaskDataContributorRoleId)
    principalId: principalId
    principalType: 'User'
  }
}
```

> **💡 TIP**: This is the same role used for the Function App's managed identity, but assigned with `principalType: 'User'` to the developer. See the [sample repo](https://github.com/Azure-Samples/Durable-Task-Scheduler/blob/main/samples/infra/main.bicep) for a full example.

## Connection String App Setting

Include these entries in the Function App resource's `siteConfig.appSettings` array:

```bicep
// UAMI client ID from base template identity module - REQUIRED for UAMI auth
param uamiClientId string

{
  name: 'DURABLE_TASK_SCHEDULER_CONNECTION_STRING'
  value: 'Endpoint=${scheduler.properties.endpoint};TaskHub=${taskHub.name};Authentication=ManagedIdentity;ClientID=${uamiClientId}'
}
```
