---
title: "Redis Recipe — C (.NET) — REFERENCE ONLY"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/services/app-service/templates/recipes/redis/source/dotnet.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/services/app-service/templates/recipes/redis/source/dotnet.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/services/app-service/templates/recipes/redis/source/dotnet.md"
sourceSha256: "10252e8881b1f02341e6756e7052dbcff435d883a1c86c5015214bb0289662d4"
pageSha256: "10252e8881b1f02341e6756e7052dbcff435d883a1c86c5015214bb0289662d4"
contentMode: "local-full"
zh: ""
---

# Redis Recipe — C# (.NET) — REFERENCE ONLY

## ASP.NET Core Distributed Cache Setup

### NuGet Packages

```xml
```

### Program.cs (additions)

Add these lines — do NOT replace the existing file:

```csharp
using Azure.Identity;
using StackExchange.Redis;

var redisHost = builder.Configuration["REDIS_HOST"];
var configOptions = ConfigurationOptions.Parse($"{redisHost}:6380");
configOptions.Ssl = true;
configOptions.AbortOnConnectFail = false;

// ConfigureForAzureWithTokenCredentialAsync handles automatic token renewal
await configOptions.ConfigureForAzureWithTokenCredentialAsync(
    new DefaultAzureCredential());

builder.Services.AddStackExchangeRedisCache(options =>
{
    options.ConfigurationOptions = configOptions;
    options.InstanceName = "app:";
});
```

> 💡 `ConfigureForAzureWithTokenCredentialAsync` manages token acquisition and renewal automatically — no manual token refresh required.

### Usage

```csharp
using Microsoft.Extensions.Caching.Distributed;

app.MapGet("/api/cached", async (IDistributedCache cache) =>
{
    var value = await cache.GetStringAsync("my-key");
    if (value is null)
    {
        value = "computed-value";
        await cache.SetStringAsync("my-key", value,
            new DistributedCacheEntryOptions { AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5) });
    }
    return Results.Ok(new { value });
});
```

## Files to Modify

| File | Action |
|------|--------|
| `Program.cs` | Add Redis cache registration |
| `*.csproj` | Add NuGet packages |
