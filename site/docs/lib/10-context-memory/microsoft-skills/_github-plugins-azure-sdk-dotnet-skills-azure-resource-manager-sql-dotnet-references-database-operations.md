---
title: "Database Operations"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-dotnet/skills/azure-resource-manager-sql-dotnet/references/database-operations.md"
sourceRel: ".github/plugins/azure-sdk-dotnet/skills/azure-resource-manager-sql-dotnet/references/database-operations.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-dotnet/skills/azure-resource-manager-sql-dotnet/references/database-operations.md"
sourceSha256: "0780a88d23a285ad779d3f97be9de38b59bc8bc866a912180a165cad8e1269b5"
pageSha256: "0780a88d23a285ad779d3f97be9de38b59bc8bc866a912180a165cad8e1269b5"
contentMode: "local-full"
zh: ""
---

# Database Operations

Advanced database operations for Azure SQL.

## Create Database with vCore SKU

```csharp
using Azure.ResourceManager.Sql;
using Azure.ResourceManager.Sql.Models;

var databaseData = new SqlDatabaseData(AzureLocation.EastUS)
{
    Sku = new SqlSku("GP_Gen5_2")
    {
        Tier = "GeneralPurpose",
        Family = "Gen5",
        Capacity = 2 // vCores
    },
    MaxSizeBytes = 32L * 1024 * 1024 * 1024, // 32 GB
    ZoneRedundant = false,
    ReadScale = SqlDatabaseReadScale.Disabled,
    RequestedBackupStorageRedundancy = SqlBackupStorageRedundancy.Geo
};

var operation = await databaseCollection.CreateOrUpdateAsync(
    WaitUntil.Completed,
    "my-vcore-database",
    databaseData);
```

## Create Serverless Database

```csharp
var databaseData = new SqlDatabaseData(AzureLocation.EastUS)
{
    Sku = new SqlSku("GP_S_Gen5_2")
    {
        Tier = "GeneralPurpose",
        Family = "Gen5",
        Capacity = 2 // Max vCores
    },
    AutoPauseDelay = 60, // Minutes of inactivity before auto-pause
    MinCapacity = 0.5,   // Minimum vCores (can be fractional)
    MaxSizeBytes = 32L * 1024 * 1024 * 1024
};

await databaseCollection.CreateOrUpdateAsync(
    WaitUntil.Completed,
    "my-serverless-db",
    databaseData);
```

## Scale Database

```csharp
// Get existing database
var database = await databaseCollection.GetAsync("my-database");

// Update SKU
var updateData = new SqlDatabaseData(database.Value.Data.Location)
{
    Sku = new SqlSku("S3") { Tier = "Standard" }
};

await databaseCollection.CreateOrUpdateAsync(
    WaitUntil.Completed,
    "my-database",
    updateData);
```

## Copy Database

```csharp
var copyData = new SqlDatabaseData(AzureLocation.EastUS)
{
    CreateMode = SqlDatabaseCreateMode.Copy,
    SourceDatabaseId = sourceDatabase.Id,
    Sku = new SqlSku("S0") { Tier = "Standard" }
};

await targetDatabaseCollection.CreateOrUpdateAsync(
    WaitUntil.Completed,
    "database-copy",
    copyData);
```

## Restore Database from Point-in-Time

```csharp
var restoreData = new SqlDatabaseData(AzureLocation.EastUS)
{
    CreateMode = SqlDatabaseCreateMode.PointInTimeRestore,
    SourceDatabaseId = sourceDatabase.Id,
    RestorePointInTime = DateTimeOffset.UtcNow.AddHours(-2), // 2 hours ago
    Sku = new SqlSku("S0") { Tier = "Standard" }
};

await databaseCollection.CreateOrUpdateAsync(
    WaitUntil.Completed,
    "restored-database",
    restoreData);
```

## Restore Deleted Database

```csharp
// List deleted databases
var deletedDatabases = server.GetRestorableDroppedDatabases();

await foreach (var deleted in deletedDatabases)
{
    Console.WriteLine($"Deleted: {deleted.Data.DatabaseName} at {deleted.Data.DeletionOn}");
    
    // Restore the deleted database
    var restoreData = new SqlDatabaseData(AzureLocation.EastUS)
    {
        CreateMode = SqlDatabaseCreateMode.Restore,
        RestorableDroppedDatabaseId = deleted.Id,
        Sku = new SqlSku("S0") { Tier = "Standard" }
    };
    
    await databaseCollection.CreateOrUpdateAsync(
        WaitUntil.Completed,
        "restored-deleted-db",
        restoreData);
    
    break; // Restore first one
}
```

## Geo-Restore Database

```csharp
// List recoverable databases (geo-replicated backups)
var recoverableDatabases = server.GetRecoverableDatabases();

await foreach (var recoverable in recoverableDatabases)
{
    var restoreData = new SqlDatabaseData(AzureLocation.WestUS) // Different region
    {
        CreateMode = SqlDatabaseCreateMode.Recovery,
        RecoverableDatabaseId = recoverable.Id,
        Sku = new SqlSku("S0") { Tier = "Standard" }
    };
    
    await targetDatabaseCollection.CreateOrUpdateAsync(
        WaitUntil.Completed,
        "geo-restored-db",
        restoreData);
    
    break;
}
```

## Configure Long-Term Retention

```csharp
var ltrPolicy = new LongTermRetentionPolicyData
{
    WeeklyRetention = "P4W",  // 4 weeks
    MonthlyRetention = "P12M", // 12 months
    YearlyRetention = "P5Y",   // 5 years
    WeekOfYear = 1 // First week for yearly backup
};

var ltrPolicyResource = database.GetLongTermRetentionPolicy();
await ltrPolicyResource.CreateOrUpdateAsync(
    WaitUntil.Completed,
    ltrPolicy);
```

## Configure Short-Term Retention

```csharp
var strPolicy = new ShortTermRetentionPolicyData
{
    RetentionDays = 14, // 7-35 days
    DiffBackupIntervalInHours = 12 // 12 or 24 hours
};

var strPolicyResource = database.GetShortTermRetentionPolicy();
await strPolicyResource.CreateOrUpdateAsync(
    WaitUntil.Completed,
    strPolicy);
```

## Export Database to Bacpac

```csharp
var exportRequest = new DatabaseExportDefinition
{
    StorageKeyType = StorageKeyType.StorageAccessKey,
