---
title: "AKS - Add-ons"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/services/aks/addons.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/services/aks/addons.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/services/aks/addons.md"
sourceSha256: "b202ac0448d1bcee58174e2848454ec3c9d85b6ca67c0945a5aac7b22315c494"
pageSha256: "b202ac0448d1bcee58174e2848454ec3c9d85b6ca67c0945a5aac7b22315c494"
contentMode: "local-full"
zh: ""
---

# AKS - Add-ons

## Container Monitoring

```bicep
addonProfiles: \{
  omsagent: \{
    enabled: true
    config: \{
      logAnalyticsWorkspaceResourceID: logAnalytics.id
    \}
  \}
\}
```

## Azure CNI Networking

```bicep
networkProfile: \{
  networkPlugin: 'azure'
  networkPolicy: 'calico'
\}
```

## Azure Key Vault Provider

```bicep
addonProfiles: \{
  azureKeyvaultSecretsProvider: \{
    enabled: true
    config: \{
      enableSecretRotation: 'true'
    \}
  \}
\}
```

## Application Gateway Ingress Controller

```bicep
addonProfiles: \{
  ingressApplicationGateway: \{
    enabled: true
    config: \{
      applicationGatewayId: appGateway.id
    \}
  \}
\}
```

## Add-ons Summary

| Add-on | Purpose |
|--------|---------|
| omsagent | Container Insights monitoring |
| azureKeyvaultSecretsProvider | Mount Key Vault secrets as volumes |
| ingressApplicationGateway | Application Gateway as ingress controller |
| azurepolicy | Azure Policy for Kubernetes |
