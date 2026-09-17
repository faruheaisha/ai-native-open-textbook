---
title: "Post-Deployment Steps"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-deploy/references/recipes/azd/post-deployment.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-deploy/references/recipes/azd/post-deployment.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-deploy/references/recipes/azd/post-deployment.md"
sourceSha256: "9e26e534850215e7bf74717e43fc82110ead538e4943c57ade89bad6974a7bf3"
pageSha256: "9e26e534850215e7bf74717e43fc82110ead538e4943c57ade89bad6974a7bf3"
contentMode: "local-full"
zh: ""
---

# Post-Deployment Steps

Execute critical post-deployment configuration after infrastructure provisioning completes.

> ⚠️ **Run AFTER `azd up` or `azd provision` completes successfully**

## When to Apply

Post-deployment steps are required when your deployment includes:

| Scenario | Required Actions |
|----------|-----------------|
| **ASP.NET Core + Azure SQL + Managed Identity** | Grant managed identity SQL access, apply EF migrations |
| **App Service + Azure SQL + Entra auth** | Grant App Service identity database permissions |
| **Container Apps + SQL Database** | Configure managed identity access, run migrations |

## ASP.NET Core + EF Core + Azure SQL

Complete workflow for apps using Entity Framework with Azure SQL Database.

### Prerequisites

- `azd up` or `azd provision` completed successfully
- App Service or Container App has system-assigned managed identity enabled
- Azure SQL Server configured with Entra ID admin
- EF Core project with migrations

### Step 1: Grant Managed Identity SQL Access

Grant the App Service or Container App's managed identity permissions on the SQL database.

See [SQL Managed Identity Access](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-deploy-references-recipes-azd-sql-managed-identity) for detailed SQL scripts and examples.

**Quick Template:**

```bash
# Get the app identity name from azd
eval $(azd env get-values)
APP_NAME=$SERVICE_API_NAME  # or SERVICE_WEB_NAME

# Connect as Entra admin and grant permissions
# See sql-managed-identity.md for connection patterns
```

**PowerShell:**
```powershell
# Get the app identity name from azd
azd env get-values | ForEach-Object {
    $name, $value = $_.Split('=', 2)
    Set-Item "env:$name" $value
}
$AppName = $env:SERVICE_API_NAME  # or SERVICE_WEB_NAME

# Connect as Entra admin and grant permissions
# See sql-managed-identity.md for connection patterns
```

### Step 2: Apply EF Core Migrations

Apply Entity Framework migrations to create database schema.

See [EF Core Migrations](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-deploy-references-recipes-azd-ef-migrations) for deployment patterns and troubleshooting.

**Quick Options:**

| Method | Command | Use When |
|--------|---------|----------|
| **azd hook** | Add `postprovision` hook in `azure.yaml` | Automated deployments |
| **Manual** | `dotnet ef database update` | One-time or troubleshooting |
| **SQL Script** | `dotnet ef migrations script --idempotent` | Pre-generated scripts |

### Step 3: Verify Deployment

```bash
# Get app endpoint
ENDPOINT=$(azd env get-values | grep SERVICE_.*_URI | cut -d'=' -f2)

# Health check
curl -f "$ENDPOINT/health" || echo "Health check failed"

# Test database connectivity
curl -f "$ENDPOINT/api/test-db" || echo "Database connection failed"
```

**PowerShell:**
```powershell
# Get app endpoint
$Endpoint = azd env get-values | Select-String -Pattern 'SERVICE_.*_URI' |
    Select-Object -First 1 | ForEach-Object { ($_ -split '=', 2)[1] }

# Health check
try { Invoke-WebRequest "$Endpoint/health" } catch { Write-Output "Health check failed" }

# Test database connectivity
try { Invoke-WebRequest "$Endpoint/api/test-db" } catch { Write-Output "Database connection failed" }
```

**Expected Result:**
- HTTP 200 from health endpoint
- No SQL authentication errors in logs
- Application starts successfully

## Common Issues

| Error | Cause | Solution |
|-------|-------|----------|
