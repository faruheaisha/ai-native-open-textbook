---
title: "Azure.ResourceManager.Sql (.NET) Acceptance Criteria"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/tests/scenarios/azure-resource-manager-sql-dotnet/acceptance-criteria.md"
sourceRel: "tests/scenarios/azure-resource-manager-sql-dotnet/acceptance-criteria.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/tests/scenarios/azure-resource-manager-sql-dotnet/acceptance-criteria.md"
sourceSha256: "d898ec0de8b840c87d477169cb1c8251935ae228431e6df2ff8f9a74dff51472"
pageSha256: "d898ec0de8b840c87d477169cb1c8251935ae228431e6df2ff8f9a74dff51472"
contentMode: "local-full"
zh: ""
---

# Azure.ResourceManager.Sql (.NET) Acceptance Criteria

**SDK**: `Azure.ResourceManager.Sql`
**Repository**: https://github.com/Azure/azure-sdk-for-net/tree/main/sdk/sqlmanagement/Azure.ResourceManager.Sql
**Purpose**: Skill testing acceptance criteria for validating generated code correctness

---

## 1. ArmClient Creation with DefaultAzureCredential

### ✅ CORRECT: DefaultAzureCredential with ArmClient
```csharp
using Azure.Identity;
using Azure.ResourceManager;
using Azure.ResourceManager.Sql;

var credential = new DefaultAzureCredential();
var armClient = new ArmClient(credential);

var subscriptionId = Environment.GetEnvironmentVariable("AZURE_SUBSCRIPTION_ID");
var subscription = armClient.GetSubscriptionResource(
    new ResourceIdentifier($"/subscriptions/{subscriptionId}"));
```

### ❌ INCORRECT: Hardcoded Credentials
```csharp
// WRONG - never hardcode credentials
var credential = new ClientSecretCredential(
    "tenant-id",
    "client-id",
    "hardcoded-secret");
var armClient = new ArmClient(credential);
```

---

## 2. Resource Group Operations

### ✅ CORRECT: Navigate Resource Hierarchy
```csharp
// Get subscription first
var subscription = armClient.GetSubscriptionResource(
    new ResourceIdentifier($"/subscriptions/{subscriptionId}"));

// Then get resource group
var resourceGroup = await subscription.GetResourceGroupAsync("my-resource-group");

// Access SQL servers via collection
var serverCollection = resourceGroup.Value.GetSqlServers();
```

### ❌ INCORRECT: Skipping Hierarchy
```csharp
// WRONG - cannot directly get servers without resource group
var servers = armClient.GetSqlServers("my-resource-group");
```

---

## 3. SQL Server CRUD Operations

### ✅ CORRECT: Create Server with Azure AD Authentication
```csharp
using Azure.ResourceManager.Sql;
using Azure.ResourceManager.Sql.Models;

var serverData = new SqlServerData(AzureLocation.EastUS)
{
    AdministratorLogin = "sqladmin",
    AdministratorLoginPassword = "YourSecurePassword123!",
    Administrators = new ServerExternalAdministrator
    {
        AdministratorType = SqlAdministratorType.ActiveDirectory,
        Login = "admin@contoso.com",
