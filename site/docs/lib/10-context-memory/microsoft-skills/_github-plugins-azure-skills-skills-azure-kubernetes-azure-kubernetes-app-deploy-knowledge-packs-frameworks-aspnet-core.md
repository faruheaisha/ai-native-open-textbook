---
title: "ASP.NET Core Knowledge Pack"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-kubernetes/azure-kubernetes-app-deploy/knowledge-packs/frameworks/aspnet-core.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-kubernetes/azure-kubernetes-app-deploy/knowledge-packs/frameworks/aspnet-core.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-kubernetes/azure-kubernetes-app-deploy/knowledge-packs/frameworks/aspnet-core.md"
sourceSha256: "e67fdfd98e1544f5473a62c0ac70024d33306f051e2bd7b80f5a4ea0335c8b15"
pageSha256: "e67fdfd98e1544f5473a62c0ac70024d33306f051e2bd7b80f5a4ea0335c8b15"
contentMode: "local-full"
zh: ""
---

# ASP.NET Core Knowledge Pack

> **Applies to:** Projects detected with `*.csproj` containing `Microsoft.NET.Sdk.Web` or referencing `Microsoft.AspNetCore.*` packages

## Quick Reference

| Property | Value |
|----------|-------|
| Signal files | `*.csproj` with `Microsoft.NET.Sdk.Web` or `Microsoft.AspNetCore.*` |
| Default port | `8080` (.NET 8+) |
| Health path | `/healthz` + `/ready` |
| Base template | `templates/dockerfiles/dotnet.Dockerfile` (+ `references/base-images.md`) |

---

## Health Endpoints

ASP.NET Core has built-in health check middleware via `Microsoft.Extensions.Diagnostics.HealthChecks`:

| Endpoint | Purpose | Probe Type |
|----------|---------|-----------|
| `/healthz` | Overall health | `livenessProbe` |
| `/ready` | Dependency readiness | `readinessProbe` |

### Required configuration

In `Program.cs`:

```csharp
var builder = WebApplication.CreateBuilder(args);

// Register health checks
builder.Services.AddHealthChecks()
    .AddNpgSql(builder.Configuration.GetConnectionString("DefaultConnection")!,
        name: "postgresql",
        tags: new[] { "ready" });

var app = builder.Build();

// Map health endpoints
app.MapHealthChecks("/healthz", new HealthCheckOptions
{
    Predicate = _ => false // No dependency checks for liveness
});

app.MapHealthChecks("/ready", new HealthCheckOptions
{
    Predicate = check => check.Tags.Contains("ready")
});
```

The `AspNetCore.HealthChecks.NpgSql` NuGet package provides the PostgreSQL health check. Install with:

```bash
dotnet add package AspNetCore.HealthChecks.NpgSql
```

### Probe configuration in Deployment manifest

```yaml
livenessProbe:
  httpGet:
    path: /healthz
    port: 8080
  initialDelaySeconds: 5
  periodSeconds: 15
  timeoutSeconds: 3
  failureThreshold: 3
readinessProbe:
  httpGet:
    path: /ready
    port: 8080
  initialDelaySeconds: 5
  periodSeconds: 10
  timeoutSeconds: 3
  failureThreshold: 3
```

**Note:** ASP.NET Core apps start significantly faster than JVM-based frameworks — `initialDelaySeconds: 5` is typically sufficient.

---

## Database Profiles

ASP.NET Core uses configuration providers and Entity Framework Core for database access:

| Configuration Source | Activation | Typical Usage |
|---------------------|------------|---------------|
| `appsettings.json` | Default | Local dev with SQLite or LocalDB |
| `appsettings.Production.json` | `ASPNETCORE_ENVIRONMENT=Production` | Production connection strings |
| Environment variables | Always override file config | AKS deployments |

### Environment variables for PostgreSQL on AKS

```yaml
env:
  - name: ASPNETCORE_ENVIRONMENT
    value: Production
  - name: ConnectionStrings__DefaultConnection
    value: "Host={{PG_SERVER_NAME}}.postgres.database.azure.com;Database={{DB_NAME}};Username={{IDENTITY_NAME}};Ssl Mode=Require"
```

The double-underscore (`__`) in `ConnectionStrings__DefaultConnection` maps to the `:` separator in .NET configuration — `ConnectionStrings:DefaultConnection`.

### Workload Identity with Azure.Identity

See `references/workload-identity.md` for connection patterns. Requires `Azure.Identity` and `Npgsql.EntityFrameworkCore.PostgreSQL` packages.

### ConfigMap pattern

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: {{APP_NAME}}-config
data:
  ASPNETCORE_ENVIRONMENT: "Production"
  ConnectionStrings__DefaultConnection: "Host={{PG_SERVER_NAME}}.postgres.database.azure.com;Database={{DB_NAME}};Ssl Mode=Require"
  DOTNET_EnableDiagnostics: "0"
  DOTNET_RUNNING_IN_CONTAINER: "true"
```

---

## Writable Paths (DS012 Compliance)

When `readOnlyRootFilesystem: true` is set, ASP.NET Core needs `/tmp` writable:

- **Data Protection keys** are written to a local directory by default for key persistence
- **Temporary files** from multipart uploads and response buffering use `/tmp`
- **Entity Framework** compiled models may write to temp directories

### Required volume mount

```yaml
volumes:
  - name: tmp
    emptyDir: {}
containers:
  - name: app
    volumeMounts:
      - name: tmp
        mountPath: /tmp
```

### Data Protection key persistence

By default, ASP.NET Core Data Protection stores encryption keys in-memory when no persistent path is available, meaning keys are lost on pod restart. This breaks authentication cookies and anti-forgery tokens across pod restarts or in multi-replica deployments.

For production, persist keys to Azure Blob Storage:

```csharp
builder.Services.AddDataProtection()
