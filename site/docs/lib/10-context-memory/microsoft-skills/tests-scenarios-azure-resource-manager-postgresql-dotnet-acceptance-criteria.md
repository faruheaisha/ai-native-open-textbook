---
title: "Azure.ResourceManager.PostgreSql (.NET) Acceptance Criteria"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/tests/scenarios/azure-resource-manager-postgresql-dotnet/acceptance-criteria.md"
sourceRel: "tests/scenarios/azure-resource-manager-postgresql-dotnet/acceptance-criteria.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/tests/scenarios/azure-resource-manager-postgresql-dotnet/acceptance-criteria.md"
sourceSha256: "423520001335c6386ce1990a534163801246893a4be9d819220117e46d908216"
pageSha256: "423520001335c6386ce1990a534163801246893a4be9d819220117e46d908216"
contentMode: "local-full"
zh: ""
---

# Azure.ResourceManager.PostgreSql (.NET) Acceptance Criteria

**SDK**: `Azure.ResourceManager.PostgreSql`
**Repository**: https://github.com/Azure/azure-sdk-for-net/tree/main/sdk/postgresql/Azure.ResourceManager.PostgreSql
**Purpose**: Skill testing acceptance criteria for validating generated code correctness

---

## 1. ArmClient Creation with DefaultAzureCredential

### ✅ CORRECT: DefaultAzureCredential with ArmClient
```csharp
using Azure.Identity;
using Azure.ResourceManager;
using Azure.ResourceManager.PostgreSql;
using Azure.ResourceManager.PostgreSql.FlexibleServers;

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

// Access PostgreSQL Flexible Servers via collection
var serverCollection = resourceGroup.Value.GetPostgreSqlFlexibleServers();
```

### ❌ INCORRECT: Using Single Server (Deprecated)
```csharp
// WRONG - Single Server is deprecated, use Flexible Server
var servers = resourceGroup.Value.GetPostgreSqlServers(); // Legacy API
```

---

## 3. PostgreSQL Flexible Server CRUD Operations

### ✅ CORRECT: Create Flexible Server
```csharp
using Azure.ResourceManager.PostgreSql.FlexibleServers;
using Azure.ResourceManager.PostgreSql.FlexibleServers.Models;

var serverData = new PostgreSqlFlexibleServerData(AzureLocation.EastUS)
{
    Sku = new PostgreSqlFlexibleServerSku("Standard_D2ds_v4", PostgreSqlFlexibleServerSkuTier.GeneralPurpose),
    AdministratorLogin = "pgadmin",
    AdministratorLoginPassword = "YourSecurePassword123!",
    Version = PostgreSqlFlexibleServerVersion.Ver16,
    Storage = new PostgreSqlFlexibleServerStorage
    {
        StorageSizeInGB = 128,
        AutoGrow = StorageAutoGrow.Enabled,
        Tier = PostgreSqlStorageTierName.P30
    },
    Backup = new PostgreSqlFlexibleServerBackupProperties
    {
        BackupRetentionDays = 7,
        GeoRedundantBackup = PostgreSqlFlexibleServerGeoRedundantBackupEnum.Disabled
    },
    HighAvailability = new PostgreSqlFlexibleServerHighAvailability
    {
        Mode = PostgreSqlFlexibleServerHighAvailabilityMode.ZoneRedundant,
        StandbyAvailabilityZone = "2"
    },
    AvailabilityZone = "1",
    AuthConfig = new PostgreSqlFlexibleServerAuthConfig
    {
        ActiveDirectoryAuth = PostgreSqlFlexibleServerActiveDirectoryAuthEnum.Enabled,
        PasswordAuth = PostgreSqlFlexibleServerPasswordAuthEnum.Enabled
    }
};

var operation = await serverCollection.CreateOrUpdateAsync(
    WaitUntil.Completed,
    "my-postgresql-server",
    serverData);

PostgreSqlFlexibleServerResource server = operation.Value;
Console.WriteLine($"FQDN: {server.Data.FullyQualifiedDomainName}");
```

### ✅ CORRECT: Get Existing Server
```csharp
var server = await resourceGroup.Value.GetPostgreSqlFlexibleServerAsync("my-postgresql-server");
Console.WriteLine($"Server: {server.Value.Data.Name}");
Console.WriteLine($"FQDN: {server.Value.Data.FullyQualifiedDomainName}");
Console.WriteLine($"Version: {server.Value.Data.Version}");
Console.WriteLine($"State: {server.Value.Data.State}");
```

### ✅ CORRECT: Update Server (Scale)
```csharp
var server = await resourceGroup.Value.GetPostgreSqlFlexibleServerAsync("my-postgresql-server");

var patch = new PostgreSqlFlexibleServerPatch
{
    Sku = new PostgreSqlFlexibleServerSku("Standard_D4ds_v4", PostgreSqlFlexibleServerSkuTier.GeneralPurpose),
    Storage = new PostgreSqlFlexibleServerStorage
    {
        StorageSizeInGB = 256,
        Tier = PostgreSqlStorageTierName.P40
    }
};

var operation = await server.Value.UpdateAsync(WaitUntil.Completed, patch);
```

### ✅ CORRECT: Delete Server
```csharp
var server = await resourceGroup.Value.GetPostgreSqlFlexibleServerAsync("my-postgresql-server");
await server.Value.DeleteAsync(WaitUntil.Completed);
```

### ✅ CORRECT: List Servers
```csharp
await foreach (var server in resourceGroup.Value.GetPostgreSqlFlexibleServers())
{
    Console.WriteLine($"Server: {server.Data.Name}");
    Console.WriteLine($"  FQDN: {server.Data.FullyQualifiedDomainName}");
    Console.WriteLine($"  Version: {server.Data.Version}");
    Console.WriteLine($"  SKU: {server.Data.Sku.Name}");
    Console.WriteLine($"  HA: {server.Data.HighAvailability?.Mode}");
}
```

### ❌ INCORRECT: Missing Required Parameters
```csharp
// WRONG - missing SKU, administrator credentials
var serverData = new PostgreSqlFlexibleServerData(AzureLocation.EastUS);

var operation = await serverCollection.CreateOrUpdateAsync(
    WaitUntil.Completed,
    "my-postgresql-server",
    serverData);
```

---

## 4. Database Operations

### ✅ CORRECT: Create Database
```csharp
var databaseCollection = server.GetPostgreSqlFlexibleServerDatabases();

var dbData = new PostgreSqlFlexibleServerDatabaseData
{
    Charset = "UTF8",
    Collation = "en_US.utf8"
};

var operation = await databaseCollection.CreateOrUpdateAsync(
    WaitUntil.Completed,
    "myappdb",
    dbData);

PostgreSqlFlexibleServerDatabaseResource database = operation.Value;
```

### ✅ CORRECT: List Databases
```csharp
await foreach (var db in server.GetPostgreSqlFlexibleServerDatabases())
{
    Console.WriteLine($"Database: {db.Data.Name}");
    Console.WriteLine($"  Charset: {db.Data.Charset}");
    Console.WriteLine($"  Collation: {db.Data.Collation}");
}
```

---

## 5. Firewall Rules

### ✅ CORRECT: Create Firewall Rule
```csharp
var firewallRules = server.GetPostgreSqlFlexibleServerFirewallRules();

var ruleData = new PostgreSqlFlexibleServerFirewallRuleData
{
    StartIPAddress = System.Net.IPAddress.Parse("10.0.0.1"),
    EndIPAddress = System.Net.IPAddress.Parse("10.0.0.255")
};

var operation = await firewallRules.CreateOrUpdateAsync(
    WaitUntil.Completed,
    "allow-internal",
    ruleData);
```

### ✅ CORRECT: Allow Azure Services
```csharp
var azureServicesRule = new PostgreSqlFlexibleServerFirewallRuleData
{
    StartIPAddress = System.Net.IPAddress.Parse("0.0.0.0"),
    EndIPAddress = System.Net.IPAddress.Parse("0.0.0.0")
};

await firewallRules.CreateOrUpdateAsync(
    WaitUntil.Completed,
    "AllowAllAzureServicesAndResourcesWithinAzureIps",
    azureServicesRule);
```

---

## 6. Server Configuration

### ✅ CORRECT: Update Configuration Parameter
```csharp
var configurations = server.GetPostgreSqlFlexibleServerConfigurations();

var configData = new PostgreSqlFlexibleServerConfigurationData
{
    Value = "500",
    Source = "user-override"
};

var operation = await configurations.CreateOrUpdateAsync(
    WaitUntil.Completed,
    "max_connections",
    configData);
```

### ✅ CORRECT: Common PostgreSQL Parameters
```csharp
string[] commonParams = { 
    "max_connections", 
    "shared_buffers", 
    "work_mem", 
    "maintenance_work_mem",
    "effective_cache_size",
    "log_min_duration_statement"
};

await foreach (var config in server.GetPostgreSqlFlexibleServerConfigurations())
{
    if (commonParams.Contains(config.Data.Name))
    {
        Console.WriteLine($"{config.Data.Name}: {config.Data.Value}");
    }
}
```

---

## 7. Entra ID Administrator

### ✅ CORRECT: Configure Entra ID Admin
```csharp
var admins = server.GetPostgreSqlFlexibleServerActiveDirectoryAdministrators();

var adminData = new PostgreSqlFlexibleServerActiveDirectoryAdministratorData
{
    PrincipalType = PostgreSqlFlexibleServerPrincipalType.User,
    PrincipalName = "aad-admin@contoso.com",
