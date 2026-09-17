---
title: "SQL Database Entra Authentication"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-deploy/references/recipes/azd/sql-entra-auth.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-deploy/references/recipes/azd/sql-entra-auth.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-deploy/references/recipes/azd/sql-entra-auth.md"
sourceSha256: "e7f0f2e93635a81c2b24c91adbe95eab35ad50d854c8e126802ed924662058b5"
pageSha256: "e7f0f2e93635a81c2b24c91adbe95eab35ad50d854c8e126802ed924662058b5"
contentMode: "local-full"
zh: ""
---

# SQL Database Entra Authentication

Quick reference for Azure SQL Database Entra authentication in post-deployment scenarios.

## Prerequisites

Azure SQL Server must be configured with Entra-only authentication during provisioning. The signed-in user must be set as Entra admin:

```bicep
@allowed(['User', 'Group', 'Application'])
param principalType string = 'User'

properties: {
  administrators: {
    administratorType: 'ActiveDirectory'
    principalType: principalType  // 'User' for interactive, 'Application' for CI/CD
    login: principalName
    sid: principalId
    tenantId: subscription().tenantId
    azureADOnlyAuthentication: true
  }
}
```

> ⚠️ **Warning:** Hardcoding `principalType: 'User'` causes `UnmatchedPrincipalType` errors when deploying from CI/CD with a service principal. Use a parameter instead.

## Connection Patterns

### Azure CLI (Recommended for Scripts)

> ⚠️ **Warning:** `az sql db query` requires the `rdbms-connect` extension. Install it first: `az extension add --name rdbms-connect --yes`

```bash
az sql db query \
  --server "$SQL_SERVER" \
  --database "$SQL_DATABASE" \
  --resource-group "$AZURE_RESOURCE_GROUP" \
  --auth-mode ActiveDirectoryDefault \
  --queries "SELECT 1"
```

### Connection Strings

**For .NET applications with managed identity:**

```
Server=tcp:{server}.database.windows.net,1433;Database={database};Authentication=Active Directory Default;Encrypt=True;
```

**Required packages:**
- `Microsoft.Data.SqlClient` (v5.1.0+)
- `Azure.Identity` (for local development)

## Database Roles

| Role | Permissions | Use For |
|------|------------|---------|
| `db_datareader` | SELECT | Read operations |
| `db_datawriter` | INSERT, UPDATE, DELETE | Write operations |
| `db_ddladmin` | CREATE, ALTER, DROP schema | EF migrations |
| `db_owner` | Full control | Admin (use sparingly) |

## Grant Managed Identity Access

```sql
-- Create user from managed identity
CREATE USER [app-name] FROM EXTERNAL PROVIDER;

-- Grant standard application permissions
ALTER ROLE db_datareader ADD MEMBER [app-name];
ALTER ROLE db_datawriter ADD MEMBER [app-name];
ALTER ROLE db_ddladmin ADD MEMBER [app-name];
```

> 💡 **Tip:** The managed identity name matches the App Service or Container App name.

## Verify Current Admin

```bash
az sql server ad-admin list \
  --server "$SQL_SERVER" \
  --resource-group "$AZURE_RESOURCE_GROUP"
```

## References

- [SQL Managed Identity Access](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-deploy-references-recipes-azd-sql-managed-identity)
- [EF Core Migrations](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-deploy-references-recipes-azd-ef-migrations)
- [Post-Deployment Guide](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-deploy-references-recipes-azd-post-deployment)
