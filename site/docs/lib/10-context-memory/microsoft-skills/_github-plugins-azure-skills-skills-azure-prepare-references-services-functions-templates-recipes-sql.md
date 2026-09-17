---
title: "Azure SQL Recipe"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/services/functions/templates/recipes/sql/README.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/services/functions/templates/recipes/sql/README.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/services/functions/templates/recipes/sql/README.md"
sourceSha256: "c39e9232f6ea8fa13a0f0d4b10bb35c80795ecca8c38ff1aac368a17020c01f4"
pageSha256: "c39e9232f6ea8fa13a0f0d4b10bb35c80795ecca8c38ff1aac368a17020c01f4"
contentMode: "local-full"
zh: ""
---

# Azure SQL Recipe

SQL change tracking trigger with Entra ID managed identity authentication.

## Template Selection

Resource filter: `sql`  
Discover templates via MCP or CDN manifest where `resource == "sql"` and `language` matches user request.

## Troubleshooting

### SQL Trigger Not Firing

**Cause:** Change tracking not enabled on the target table.  
**Solution:** Run these T-SQL commands on your database:

```sql
ALTER DATABASE [YourDatabase] SET CHANGE_TRACKING = ON;
ALTER TABLE [dbo].[ToDo] ENABLE CHANGE_TRACKING;
```

### "Login failed" or "Unauthorized" Errors

**Cause:** Missing managed identity authentication or SQL access not granted.  
**Solution:** Set the SQL connection string with managed identity authentication:

```
Server=tcp:<server>.database.windows.net,1433;Database=<database>;Authentication=Active Directory Default;Encrypt=True;TrustServerCertificate=False;
```

For user-assigned managed identity, add `User Id=<ClientId>`:

```
Server=tcp:<server>.database.windows.net,1433;Database=<database>;Authentication=Active Directory Default;User Id=<ClientId>;Encrypt=True;TrustServerCertificate=False;
```

Also run post-deploy T-SQL to grant the function app data access:

```sql
