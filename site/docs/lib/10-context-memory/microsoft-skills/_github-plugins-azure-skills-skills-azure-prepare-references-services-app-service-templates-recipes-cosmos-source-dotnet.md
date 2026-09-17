---
title: "Cosmos DB Recipe — C (.NET) — REFERENCE ONLY"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/services/app-service/templates/recipes/cosmos/source/dotnet.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/services/app-service/templates/recipes/cosmos/source/dotnet.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/services/app-service/templates/recipes/cosmos/source/dotnet.md"
sourceSha256: "5b91ea8a5c696c8e242927687406d2b82fd52b2e3ca561af44fd2ee4dd32d787"
pageSha256: "5b91ea8a5c696c8e242927687406d2b82fd52b2e3ca561af44fd2ee4dd32d787"
contentMode: "local-full"
zh: ""
---

# Cosmos DB Recipe — C# (.NET) — REFERENCE ONLY

## Cosmos DB SDK Setup

### NuGet Packages

```xml
```

### Program.cs (additions)

Add these lines — do NOT replace the existing file:

```csharp
using Azure.Identity;
using Microsoft.Azure.Cosmos;

builder.Services.AddSingleton(_ =>
{
    var endpoint = builder.Configuration["COSMOS_ENDPOINT"];
    return new CosmosClient(endpoint, new DefaultAzureCredential());
});
```

### CRUD Endpoints

Add to `Program.cs` after `app` is built:

```csharp
app.MapGet("/api/items", async (CosmosClient cosmos) =>
{
    var container = cosmos
        .GetDatabase(Environment.GetEnvironmentVariable("COSMOS_DATABASE_NAME"))
        .GetContainer(Environment.GetEnvironmentVariable("COSMOS_CONTAINER_NAME"));
    var query = container.GetItemQueryIterator<dynamic>("SELECT * FROM c");
    var results = new List<dynamic>();
    while (query.HasMoreResults)
        results.AddRange(await query.ReadNextAsync());
    return Results.Ok(results);
});
```

## Files to Modify

| File | Action |
|------|--------|
| `Program.cs` | Add CosmosClient registration + endpoints |
| `*.csproj` | Add Microsoft.Azure.Cosmos NuGet package |
