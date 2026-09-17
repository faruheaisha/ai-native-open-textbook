---
title: "C (.NET) Entry Point (DO NOT MODIFY)"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/services/functions/templates/recipes/common/dotnet-entry-point.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/services/functions/templates/recipes/common/dotnet-entry-point.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/services/functions/templates/recipes/common/dotnet-entry-point.md"
sourceSha256: "f3fcbe0c6102b72a99d56409d0ccde7485b7e4198356b95e1da6862f0fa7b377"
pageSha256: "f3fcbe0c6102b72a99d56409d0ccde7485b7e4198356b95e1da6862f0fa7b377"
contentMode: "local-full"
zh: ""
---

# C# (.NET) Entry Point (DO NOT MODIFY)

The base Azure Functions template includes a properly configured `Program.cs` that should NOT be modified or replaced by recipes.

> ⛔ **CRITICAL**: Do NOT replace or modify `Program.cs` from the base template.

## Base Template Program.cs

The official `functions-quickstart-dotnet-azd` template uses:

```csharp
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var host = new HostBuilder()
    .ConfigureFunctionsWebApplication()  // ASP.NET Core integration
    .ConfigureServices(services =>
    {
        services.AddApplicationInsightsTelemetryWorkerService();
        services.ConfigureFunctionsApplicationInsights();
    })
    .Build();

host.Run();
```

## Why This Matters

| Feature | ConfigureFunctionsWebApplication | ConfigureFunctionsWorkerDefaults |
|---------|----------------------------------|----------------------------------|
| ASP.NET Core integration | ✅ Yes | ❌ No |
| IActionResult return types | ✅ Yes | ❌ No |
| [FromBody] model binding | ✅ Yes | ❌ No |
| App Insights integration | ✅ Built-in | ❌ Manual setup |
| Modern HTTP handling | ✅ Yes | ⚠️ Limited |

## What Recipes Should Provide

Recipes only need to add:
1. **Trigger function files** (`.cs` files with `[Function]` attributes)
2. **Package references** (`.csproj` additions for extensions)
3. **App settings** (connection strings, configuration)

All triggers use attribute-based binding — no Program.cs modifications needed:
- `[HttpTrigger]`, `[TimerTrigger]`, `[CosmosDBTrigger]`
- `[ServiceBusTrigger]`, `[EventHubTrigger]`, `[BlobTrigger]`
- `[DurableClient]`, `[SqlTrigger]`

## Common Mistake

❌ **WRONG** — Recipe overwrites Program.cs with outdated version:
```csharp
var host = new HostBuilder()
    .ConfigureFunctionsWorkerDefaults()  // OLD PATTERN
    .Build();
```

✅ **CORRECT** — Recipe leaves Program.cs untouched, only adds function files.
