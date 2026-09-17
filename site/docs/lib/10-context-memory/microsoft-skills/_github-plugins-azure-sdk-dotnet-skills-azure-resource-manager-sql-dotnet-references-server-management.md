---
title: "Server Management"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-dotnet/skills/azure-resource-manager-sql-dotnet/references/server-management.md"
sourceRel: ".github/plugins/azure-sdk-dotnet/skills/azure-resource-manager-sql-dotnet/references/server-management.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-dotnet/skills/azure-resource-manager-sql-dotnet/references/server-management.md"
sourceSha256: "a38accf22506d493baf36a10dbbed77eb55e6019e75bbcfcdfd1b8f92e2a0aa4"
pageSha256: "a38accf22506d493baf36a10dbbed77eb55e6019e75bbcfcdfd1b8f92e2a0aa4"
contentMode: "local-full"
zh: ""
---

# Server Management

Advanced server operations for Azure SQL.

## Create Server with Azure AD Authentication

```csharp
using Azure.ResourceManager.Sql;
using Azure.ResourceManager.Sql.Models;

var serverData = new SqlServerData(AzureLocation.EastUS)
{
    // SQL authentication (optional, can be disabled)
    AdministratorLogin = "sqladmin",
    AdministratorLoginPassword = "YourSecurePassword123!",
    
    // Azure AD authentication
    Administrators = new ServerExternalAdministrator
    {
        AdministratorType = SqlAdministratorType.ActiveDirectory,
        Login = "admin@contoso.com",
