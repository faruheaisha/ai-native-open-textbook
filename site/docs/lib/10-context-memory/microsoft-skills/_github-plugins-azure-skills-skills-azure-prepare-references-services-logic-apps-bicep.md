---
title: "Logic Apps - Bicep Patterns"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/services/logic-apps/bicep.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/services/logic-apps/bicep.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/services/logic-apps/bicep.md"
sourceSha256: "bb24e75069ed466a47e9b852dfe38fb1bc9afe34a9917f1f27edc5343be1865d"
pageSha256: "bb24e75069ed466a47e9b852dfe38fb1bc9afe34a9917f1f27edc5343be1865d"
contentMode: "local-full"
zh: ""
---

# Logic Apps - Bicep Patterns

## Consumption (Multi-tenant)

```bicep
resource logicApp 'Microsoft.Logic/workflows@2019-05-01' = \{
  name: '${resourcePrefix}-logic-${uniqueHash\}'
  location: location
  properties: \{
    state: 'Enabled'
    definition: \{
      '$schema': 'https://schema.management.azure.com/providers/Microsoft.Logic/schemas/2016-06-01/workflowdefinition.json#'
      contentVersion: '1.0.0.0'
      triggers: {
        manual: {
          type: 'Request'
          kind: 'Http'
          inputs: {
            schema: {}
          }
        }
      }
      actions: {}
    }
    parameters: {}
  }
}
```

## Standard (Single-tenant)

```bicep
resource logicAppPlan 'Microsoft.Web/serverfarms@2022-09-01' = {
  name: '${resourcePrefix\}-logicplan-${uniqueHash}'
  location: location
  sku: {
    name: 'WS1'
    tier: 'WorkflowStandard'
  }
  properties: {
    reserved: true
  }
}

resource logicAppStandard 'Microsoft.Web/sites@2022-09-01' = {
  name: '${resourcePrefix\}-logic-$\{uniqueHash\}'
  location: location
  kind: 'functionapp,workflowapp'
  properties: \{
    serverFarmId: logicAppPlan.id
    siteConfig: \{
      appSettings: [
        \{
          name: 'FUNCTIONS_EXTENSION_VERSION'
          value: '~4'
        \}
        \{
          name: 'FUNCTIONS_WORKER_RUNTIME'
          value: 'node'
        \}
        \{
          name: 'AzureWebJobsStorage'
          value: storageConnectionString
        \}
      ]
    \}
  \}
\}
```

## API Connection

```bicep
resource serviceBusConnection 'Microsoft.Web/connections@2016-06-01' = \{
  name: 'servicebus-connection'
  location: location
  properties: \{
    displayName: 'Service Bus Connection'
    api: \{
      id: subscriptionResourceId('Microsoft.Web/locations/managedApis', location, 'servicebus')
    \}
    parameterValues: \{
      connectionString: serviceBus.listKeys().primaryConnectionString
    \}
  \}
\}
```
