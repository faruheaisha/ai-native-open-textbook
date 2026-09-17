---
title: "Global Rules"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-cloud-migrate/references/services/app-service/global-rules.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-cloud-migrate/references/services/app-service/global-rules.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-cloud-migrate/references/services/app-service/global-rules.md"
sourceSha256: "8b078ab6f5c6f119a09866955edee501ae87f150cd52561002dd9e906b355170"
pageSha256: "8b078ab6f5c6f119a09866955edee501ae87f150cd52561002dd9e906b355170"
contentMode: "local-full"
zh: ""
---

# Global Rules

These rules apply to ALL phases of App Service migration.

## Destructive Action Policy

⛔ **NEVER** perform destructive actions without explicit user confirmation via `ask_user`:
- Deleting files or directories
- Overwriting existing code
- Deploying to production environments
- Modifying existing Azure resources
- Removing source-platform resources

## User Confirmation Required

Always use `ask_user` before:
- Selecting Azure subscription
- Selecting Azure region/location
- Deploying infrastructure
- Making breaking changes to existing code
- Choosing App Service Plan tier (Free, Basic, Standard, Premium)

## Best Practices

- Always use `mcp_azure_mcp_get_azure_bestpractices` tool before generating Azure code
- Prefer managed identity over connection strings or API keys
- **Always use the latest supported runtime stack** — see the App Service [language overview](https://learn.microsoft.com/azure/app-service/overview-supported-languages) for the supported stacks page per language
- Follow Azure naming conventions
- Use Premium v3 or Standard plans for production workloads
- Enable health checks and diagnostic logging from day one

## Identity-First Authentication (Zero Secrets)

> Enterprise subscriptions commonly enforce policies that block local auth. Always design for identity-based access from the start.

- **Storage accounts**: Use identity-based connections with `DefaultAzureCredential`
- **Databases**: Use Microsoft Entra authentication for Azure SQL and PostgreSQL Flexible Server
- **Key Vault**: Use Key Vault references in App Settings (`@Microsoft.KeyVault(SecretUri=...)`)
- **Application Insights**: Configure ingestion via the connection string app setting (`APPLICATIONINSIGHTS_CONNECTION_STRING`). Use managed identity for management-plane access (querying, configuring components), not for telemetry ingestion
- **DefaultAzureCredential with UAMI**: Always pass `managedIdentityClientId` explicitly:
  ```javascript
  const credential = new DefaultAzureCredential({
    managedIdentityClientId: process.env.AZURE_CLIENT_ID
  });
  ```

## App Service Specifics

- **Always enable HTTPS Only** — set `httpsOnly: true` in Bicep
- **Use 64-bit worker** for production — set `use32BitWorkerProcess: false`
- **Enable Always On** for Standard tier and above to prevent idle unload
- **Configure health check path** — `/healthz` or equivalent endpoint
- **Use deployment slots** for zero-downtime deployments in Standard tier+
- **Set minimum TLS to 1.2** — `minTlsVersion: '1.2'`
- **Enable managed identity** — prefer User Assigned for multi-resource scenarios
- **Use App Configuration** for shared settings across environments
- **Use Key Vault** for secrets — never store secrets in App Settings directly

## Output Directory
