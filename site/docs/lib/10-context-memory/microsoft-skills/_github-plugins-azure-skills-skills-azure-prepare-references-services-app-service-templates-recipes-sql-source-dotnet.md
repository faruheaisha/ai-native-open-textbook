---
title: "SQL Database — C (.NET) — REFERENCE ONLY"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/services/app-service/templates/recipes/sql/source/dotnet.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/services/app-service/templates/recipes/sql/source/dotnet.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/services/app-service/templates/recipes/sql/source/dotnet.md"
sourceSha256: "51209047961e5f82b1d1e80bc07b41b24de62257440af965513093c4defceb4f"
pageSha256: "51209047961e5f82b1d1e80bc07b41b24de62257440af965513093c4defceb4f"
contentMode: "local-full"
zh: ""
---

# SQL Database — C# (.NET) — REFERENCE ONLY

## Entity Framework Core Setup

Add EF Core with Azure SQL and managed identity support to an ASP.NET Core app.

### NuGet Packages

```xml
```

### DbContext

Create `Data/AppDbContext.cs`:

```csharp
using Microsoft.EntityFrameworkCore;

namespace MyApp.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<TodoItem> TodoItems => Set<TodoItem>();
}

public class TodoItem
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public bool IsComplete { get; set; }
}
```

### Program.cs (additions)

Add these lines to `Program.cs` — do NOT replace the file:

```csharp
using Microsoft.EntityFrameworkCore;
using MyApp.Data;

// Add after builder creation
var connectionString = builder.Configuration.GetConnectionString("AZURE_SQL")
    ?? builder.Configuration["AZURE_SQL_CONNECTION_STRING"];

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(connectionString));

// Add health check for SQL
builder.Services.AddHealthChecks()
    .AddDbContextCheck<AppDbContext>();

// After app build — map health checks so App Service probes reflect SQL connectivity
app.MapHealthChecks("/health");
```

### API Endpoints

Add to `Program.cs` after `app` is built:

```csharp
app.MapGet("/api/todos", async (AppDbContext db) =>
    await db.TodoItems.ToListAsync());

app.MapGet("/api/todos/{id}", async (int id, AppDbContext db) =>
    await db.TodoItems.FindAsync(id) is TodoItem todo
        ? Results.Ok(todo)
        : Results.NotFound());

app.MapPost("/api/todos", async (TodoItem todo, AppDbContext db) =>
{
    db.TodoItems.Add(todo);
    await db.SaveChangesAsync();
    return Results.Created($"/api/todos/{todo.Id}", todo);
});
```

### appsettings.json

```json
{
  "ConnectionStrings": {
    "AZURE_SQL": "Server=localhost;Database=myapp;Trusted_Connection=true;"
  }
}
```

> In production, the `AZURE_SQL_CONNECTION_STRING` app setting from Azure overrides this with the managed identity connection string.

### EF Migrations (postprovision hook)

Create `infra/scripts/setup-db.sh`:

```bash
#!/bin/bash
dotnet ef database update --project src/api
```

## Files to Add

| File | Action |
|------|--------|
| `Data/AppDbContext.cs` | Create — DbContext + entity models |
| `Program.cs` | Modify — add DbContext registration + endpoints |
| `appsettings.json` | Modify — add ConnectionStrings section |

## Common Patterns

- Always use `AddHealthChecks().AddDbContextCheck<>()` for SQL health monitoring
- Use `AsNoTracking()` for read-only queries to improve performance
- Apply migrations via postprovision hook, not at app startup
