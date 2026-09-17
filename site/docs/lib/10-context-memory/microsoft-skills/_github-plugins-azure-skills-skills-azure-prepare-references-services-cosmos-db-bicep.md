---
title: "Cosmos DB Bicep Patterns"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/services/cosmos-db/bicep.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/services/cosmos-db/bicep.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/services/cosmos-db/bicep.md"
sourceSha256: "b09169688dcf4c27a68cda71be213fb5f0627fe6c2f722aba309288309587aad"
pageSha256: "b09169688dcf4c27a68cda71be213fb5f0627fe6c2f722aba309288309587aad"
contentMode: "local-full"
zh: ""
---

# Cosmos DB Bicep Patterns

## Account

```bicep
resource cosmosAccount 'Microsoft.DocumentDB/databaseAccounts@2023-04-15' = \{
  name: '${resourcePrefix}-cosmos-${uniqueHash\}'
  location: location
  kind: 'GlobalDocumentDB'
  properties: \{
    databaseAccountOfferType: 'Standard'
    locations: [
      \{
        locationName: location
        failoverPriority: 0
        isZoneRedundant: false
      \}
    ]
    consistencyPolicy: \{
      defaultConsistencyLevel: 'Session'
    \}
    capabilities: [
      \{
        name: 'EnableServerless'
      \}
    ]
  \}
\}
```

## Database

```bicep
resource cosmosDatabase 'Microsoft.DocumentDB/databaseAccounts/sqlDatabases@2023-04-15' = \{
  parent: cosmosAccount
  name: 'appdb'
  properties: \{
    resource: \{
      id: 'appdb'
    \}
  \}
\}
```

## Container

```bicep
resource cosmosContainer 'Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers@2023-04-15' = \{
  parent: cosmosDatabase
  name: 'items'
  properties: \{
    resource: \{
      id: 'items'
      partitionKey: \{
        paths: ['/partitionKey']
        kind: 'Hash'
      \}
      indexingPolicy: \{
        indexingMode: 'consistent'
        includedPaths: [
          \{ path: '/*' \}
        ]
      \}
    \}
  \}
\}
```

## Autoscale Container

```bicep
resource cosmosContainer 'Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers@2023-04-15' = \{
  parent: cosmosDatabase
  name: 'items'
  properties: \{
    resource: \{
      id: 'items'
      partitionKey: \{
        paths: ['/partitionKey']
        kind: 'Hash'
      \}
    \}
    options: \{
      autoscaleSettings: \{
        maxThroughput: 4000
      \}
    \}
  \}
\}
```

## Global Distribution

```bicep
properties: \{
  locations: [
    \{
      locationName: 'East US'
      failoverPriority: 0
    \}
    \{
      locationName: 'West US'
      failoverPriority: 1
    \}
  ]
  enableMultipleWriteLocations: true
\}
```
