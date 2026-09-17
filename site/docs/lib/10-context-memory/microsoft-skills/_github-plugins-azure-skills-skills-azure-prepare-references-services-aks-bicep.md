---
title: "AKS - Bicep Patterns"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/services/aks/bicep.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/services/aks/bicep.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/services/aks/bicep.md"
sourceSha256: "3881c68eecdd7e9b3ea468e1af7299badd21b912c1d79dab3b0189659d63631c"
pageSha256: "3881c68eecdd7e9b3ea468e1af7299badd21b912c1d79dab3b0189659d63631c"
contentMode: "local-full"
zh: ""
---

# AKS - Bicep Patterns

## Cluster Resource

```bicep
resource aks 'Microsoft.ContainerService/managedClusters@2023-07-01' = \{
  name: '${resourcePrefix}-aks-${uniqueHash\}'
  location: location
  identity: \{
    type: 'SystemAssigned'
  \}
  properties: \{
    dnsPrefix: '$\{resourcePrefix\}-aks'
    kubernetesVersion: '1.28'
    agentPoolProfiles: [
      \{
        name: 'default'
        count: 3
        vmSize: 'Standard_DS2_v2'
        mode: 'System'
        osType: 'Linux'
        enableAutoScaling: true
        minCount: 1
        maxCount: 5
      \}
    ]
    networkProfile: \{
      networkPlugin: 'azure'
      serviceCidr: '10.0.0.0/16'
      dnsServiceIP: '10.0.0.10'
    \}
  \}
\}
```

## ACR Pull Role Assignment

```bicep
resource acrPullRole 'Microsoft.Authorization/roleAssignments@2022-04-01' = \{
  name: guid(aks.id, containerRegistry.id, 'acrpull')
  scope: containerRegistry
  properties: \{
    roleDefinitionId: subscriptionResourceId('Microsoft.Authorization/roleDefinitions', '7f951dda-4ed3-4680-a7ca-43fe172d538d')
    principalId: aks.properties.identityProfile.kubeletidentity.objectId
    principalType: 'ServicePrincipal'
  \}
\}
```

## Node Pool Configuration

### System Pool (Required)

```bicep
\{
  name: 'system'
  count: 3
  vmSize: 'Standard_DS2_v2'
  mode: 'System'
  osType: 'Linux'
\}
```

### User Pool (Workloads)

```bicep
\{
  name: 'workload'
  count: 2
  vmSize: 'Standard_DS4_v2'
  mode: 'User'
  osType: 'Linux'
  enableAutoScaling: true
  minCount: 1
  maxCount: 10
\}
```

## Workload Identity

```bicep
properties: \{
  oidcIssuerProfile: \{
    enabled: true
  \}
  securityProfile: \{
    workloadIdentity: \{
      enabled: true
    \}
  \}
\}
```
