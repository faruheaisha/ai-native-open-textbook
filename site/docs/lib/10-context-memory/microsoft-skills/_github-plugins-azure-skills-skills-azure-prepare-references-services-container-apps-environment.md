---
title: "Container Apps Environment Variables"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/services/container-apps/environment.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/services/container-apps/environment.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/services/container-apps/environment.md"
sourceSha256: "8eafd09304ad39fe102033b510e33db4f19dbd4a127421b15b74233bc0ddfae3"
pageSha256: "8eafd09304ad39fe102033b510e33db4f19dbd4a127421b15b74233bc0ddfae3"
contentMode: "local-full"
zh: ""
---

# Container Apps Environment Variables

## Standard Environment Variables

```bicep
env: [
  \{
    name: 'APPLICATIONINSIGHTS_CONNECTION_STRING'
    value: applicationInsights.properties.ConnectionString
  \}
  \{
    name: 'AZURE_CLIENT_ID'
    value: managedIdentity.properties.clientId
  \}
]
```

## Secret References (Key Vault)

Use secrets for sensitive values:

```bicep
configuration: \{
  secrets: [
    \{
      name: 'database-url'
      keyVaultUrl: 'https://myvault.vault.azure.net/secrets/database-url'
      identity: managedIdentity.id
    \}
  ]
\}

template: \{
  containers: [
    \{
      env: [
        \{
          name: 'DATABASE_URL'
          secretRef: 'database-url'
        \}
      ]
    \}
  ]
\}
```

## Common Variables

| Variable | Source | Notes |
|----------|--------|-------|
| `APPLICATIONINSIGHTS_CONNECTION_STRING` | App Insights | Telemetry |
| `AZURE_CLIENT_ID` | Managed Identity | SDK auth |
| `DATABASE_URL` | Key Vault secret | Connection string |
| `REDIS_URL` | Key Vault secret | Cache connection |

## Best Practices

- Never hardcode secrets in Bicep
- Use Key Vault references for all sensitive values
- Use Managed Identity for authentication
- Set `AZURE_CLIENT_ID` for SDK-based auth
