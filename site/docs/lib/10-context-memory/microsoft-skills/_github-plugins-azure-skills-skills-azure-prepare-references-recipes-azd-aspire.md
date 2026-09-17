---
title: ".NET Aspire Projects with AZD"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/recipes/azd/aspire.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/recipes/azd/aspire.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/recipes/azd/aspire.md"
sourceSha256: "3776125bb3804a57ba82dd3f31451c1f91197402f9b432c31e42e02c7c57f2d3"
pageSha256: "3776125bb3804a57ba82dd3f31451c1f91197402f9b432c31e42e02c7c57f2d3"
contentMode: "local-full"
zh: ""
---

# .NET Aspire Projects with AZD

**⛔ MANDATORY: For .NET Aspire projects, NEVER manually create azure.yaml. Use `azd init --from-code` instead.**

## Detection

| Indicator | How to Detect |
|-----------|---------------|
| `*.AppHost.csproj` | `find . -name "*.AppHost.csproj"` |
| `Aspire.Hosting` package | `grep -r "Aspire\.Hosting" . --include="*.csproj"` |
| `Aspire.AppHost.Sdk` | `grep -r "Aspire\.AppHost\.Sdk" . --include="*.csproj"` |

## Workflow

### ⛔ DO NOT (Wrong Approach)

```yaml
# ❌ WRONG - Missing services section
name: aspire-app
metadata:
  template: azd-init
# Results in: "Could not find infra\main.bicep" error
```

### ✅ DO (Correct Approach)

```bash
# Generate environment name
ENV_NAME="$(basename "$PWD" | tr '[:upper:]' '[:lower:]' | tr ' _' '-')-dev"

# Use azd init with auto-detection
azd init --from-code -e "$ENV_NAME"
```

**Generated azure.yaml:**
```yaml
name: aspire-app
metadata:
  template: azd-init
services:
  app:
    language: dotnet
    project: ./MyApp.AppHost/MyApp.AppHost.csproj
    host: containerapp
```

> 💡 **AddDockerfile services:** If the AppHost uses `AddDockerfile()` (e.g., `builder.AddDockerfile("ginapp", "./ginapp")`), do NOT add separate service entries for those resources. Aspire handles container builds for `AddDockerfile` resources at runtime through the AppHost. The `azure.yaml` should contain only the single `app` service pointing to the AppHost.

> ⛔ **BEFORE continuing:** Complete the mandatory [AddParameter + WithBuildArg scan](#after-azd-init-fix-addparameter-used-with-withbuildarg-before-builddeploy) below. Skipping this step is the #1 cause of failed Aspire container-build deployments.

## Command Flags

| Flag | Required | Purpose |
|------|----------|---------|
| `--from-code` | ✅ | Auto-detect AppHost, no prompts |
| `-e <name>` | ✅ | Environment name (non-interactive) |
| `--no-prompt` | Optional | Skip all confirmations |

**Why `--from-code` is critical:**
- Without: Prompts "How do you want to initialize?" (needs TTY)
- With: Auto-detects AppHost, no interaction needed
- Essential for agents and CI/CD

## ⛔ After `azd init`: Fix AddParameter Used with WithBuildArg Before Build/Deploy

> **MANDATORY** — After running `azd init --from-code`, but before `azd package`, `azd up`, or any Docker image build/deploy step, scan the AppHost source for `AddParameter` calls that are passed to `WithBuildArg` or `WithBuildSecret`. This pattern triggers an azd bug that causes Docker builds to fail.

.NET Aspire [external parameters](https://aspire.dev/fundamentals/external-parameters/) let apps request values from the deployment environment. Each `AddParameter()` call generates a Bicep parameter in the deployment manifest. However, azd cannot resolve these Bicep parameters during the Docker image build phase, producing the error `parameter infra.parameters.<name> not found`. This bug has been present across all azd versions tested (including 1.24.0).

### Scan for the pattern

**Bash:**
```bash
grep -RIn --include="*.cs" -E "AddParameter|WithBuildArg|WithBuildSecret" <path/to/AppHost>
```

**PowerShell:**
```powershell
Get-ChildItem -Path "<path/to/AppHost>" -Recurse -Filter "*.cs" |
  Select-String -Pattern "AddParameter|WithBuildArg|WithBuildSecret"
```

**Problematic pattern:**
```csharp
// ❌ azd cannot resolve AddParameter values during Docker builds
var goVersion = builder.AddParameter("goversion", "1.25.4", publishValueAsDefault: true);
builder.AddDockerfile("ginapp", "./ginapp")
    .WithBuildArg("GO_VERSION", goVersion);
```

### Fix Option A: Replace AddParameter with a constant (preferred)

For every `AddParameter(name, defaultValue, ...)` whose result is used **only** as a `WithBuildArg` argument, replace it with a `const string` (or `string`) constant:

```csharp
// ✅ Use a constant instead
const string goVersion = "1.25.4";
builder.AddDockerfile("ginapp", "./ginapp")
    .WithBuildArg("GO_VERSION", goVersion);
```

**Why:** This eliminates the parameter from Bicep output entirely, so azd never attempts to resolve it during Docker builds. Use this when the build arg value does not need to vary per deployment environment.

### Fix Option B: Pre-set parameter in azd environment config

If the value must remain an [external parameter](https://aspire.dev/fundamentals/external-parameters/) (e.g., it varies per environment), pre-set it in the azd environment config immediately after `azd init`:

```bash
azd env config set infra.parameters.<name> <value>
```

**Example:**
```bash
azd env config set infra.parameters.goversion 1.25.4
```

**Why:** This writes the parameter value into `.azure/<env>/config.json` so azd can find it during Docker builds without modifying AppHost source code. Use this when the build arg value must be configurable per environment.

> ⚠️ **Do NOT skip this step for container-build projects.** If the AppHost passes an `AddParameter` result to `WithBuildArg`, apply one of these fixes before running `azd up`.

---

## Troubleshooting

### Error: "Could not find infra\main.bicep"

**Cause:** Manual azure.yaml without services section

**Fix:**
1. Delete manual azure.yaml
