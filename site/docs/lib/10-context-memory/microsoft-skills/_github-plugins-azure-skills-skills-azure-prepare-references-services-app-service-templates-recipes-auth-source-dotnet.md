---
title: "Auth Recipe — C (.NET) — REFERENCE ONLY"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/services/app-service/templates/recipes/auth/source/dotnet.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/services/app-service/templates/recipes/auth/source/dotnet.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/services/app-service/templates/recipes/auth/source/dotnet.md"
sourceSha256: "bd890ec78e298d09c8eda34d4483fee4119e60186adff10885ce24ed9d6aebb6"
pageSha256: "bd890ec78e298d09c8eda34d4483fee4119e60186adff10885ce24ed9d6aebb6"
contentMode: "local-full"
zh: ""
---

# Auth Recipe — C# (.NET) — REFERENCE ONLY

## Microsoft Identity Web (ASP.NET Core)

### NuGet Packages

```xml
```

### Program.cs (additions)

Add these lines — do NOT replace the existing file:

```csharp
using Microsoft.Identity.Web;

// Add after builder creation
builder.Services.AddMicrosoftIdentityWebApiAuthentication(builder.Configuration);
builder.Services.AddAuthorization();

// Add after app build
app.UseAuthentication();
app.UseAuthorization();

// Protected endpoint
app.MapGet("/api/me", [Authorize] (HttpContext ctx) =>
{
    var name = ctx.User.FindFirst("name")?.Value;
    return Results.Ok(new { name });
});
```

### appsettings.json

```json
{
  "AzureAd": {
    "Instance": "https://login.microsoftonline.com/",
