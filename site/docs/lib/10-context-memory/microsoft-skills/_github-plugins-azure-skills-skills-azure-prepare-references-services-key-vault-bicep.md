---
title: "Key Vault - Bicep Patterns"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/services/key-vault/bicep.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/services/key-vault/bicep.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/services/key-vault/bicep.md"
sourceSha256: "596b16d546527a745deb1b965afdaa4426d0071de0def6081cf4096da1e3516a"
pageSha256: "596b16d546527a745deb1b965afdaa4426d0071de0def6081cf4096da1e3516a"
contentMode: "local-full"
zh: ""
---

# Key Vault - Bicep Patterns

## Basic Vault

```bicep
resource keyVault 'Microsoft.KeyVault/vaults@2023-07-01' = \{
  name: '${resourcePrefix}-kv-${uniqueHash\}'
  location: location
  properties: \{
    tenantId: subscription().tenantId
    sku: \{
      family: 'A'
      name: 'standard'
    \}
    enableRbacAuthorization: true
    enableSoftDelete: true
    softDeleteRetentionInDays: 90
    enablePurgeProtection: true
  \}
\}
```

## Storing Secrets

```bicep
resource secret 'Microsoft.KeyVault/vaults/secrets@2023-07-01' = \{
  parent: keyVault
  name: 'database-connection-string'
  properties: \{
    value: databaseConnectionString
  \}
\}
```

## Role Assignment (Managed Identity)

```bicep
resource keyVaultRoleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = \{
  name: guid(keyVault.id, principalId, 'Key Vault Secrets User')
  scope: keyVault
  properties: \{
    roleDefinitionId: subscriptionResourceId('Microsoft.Authorization/roleDefinitions', '4633458b-17de-408a-b874-0445c86b69e6')
    principalId: principalId
    principalType: 'ServicePrincipal'
  \}
\}
```

## Referencing in App Service / Functions

```bicep
appSettings: [
  \{
    name: 'DATABASE_URL'
    value: '@Microsoft.KeyVault(VaultName=${keyVault.name};SecretName=database-connection-string)'
  }
]
```

## Referencing in Container Apps

```bicep
secrets: [
  {
    name: 'db-connection'
    keyVaultUrl: '${keyVault.properties.vaultUri\}secrets/database-connection-string'
    identity: containerApp.identity.principalId
  \}
]
```

## Secret with Expiration

```bicep
resource secret 'Microsoft.KeyVault/vaults/secrets@2023-07-01' = \{
  parent: keyVault
  name: 'api-key'
  properties: \{
    value: apiKey
    attributes: \{
      exp: dateTimeToEpoch(dateTimeAdd(utcNow(), 'P90D'))
    \}
  \}
\}
```
