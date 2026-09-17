---
title: ".NET Aspire Projects"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/aspire.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/aspire.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/aspire.md"
sourceSha256: "3122ccb114d70db4deeb978f5b737a839396eba31d2f084ea864b5d4ef68e3b6"
pageSha256: "3122ccb114d70db4deeb978f5b737a839396eba31d2f084ea864b5d4ef68e3b6"
contentMode: "local-full"
zh: ""
---

# .NET Aspire Projects

> ⛔ **CRITICAL - READ THIS FIRST**
>
> For .NET Aspire projects, **NEVER manually create azure.yaml or infra/ files.**
> Always use `azd init --from-code` which auto-detects the AppHost and generates everything correctly.
>
> **Failure to follow this causes:** "Could not find a part of the path 'infra\main.bicep'" error.

Guidance for preparing .NET Aspire applications for Azure deployment.

**📖 For detailed AZD workflow:** See [recipes/azd/aspire.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-recipes-azd-aspire)

## What is .NET Aspire?

.NET Aspire is an opinionated, cloud-ready stack for building observable, production-ready distributed applications. Aspire projects use an AppHost orchestrator to define and configure the application's components, services, and dependencies.

## Detection

A .NET Aspire project is identified by:

| Indicator | Description |
|-----------|-------------|
| `*.AppHost.csproj` | AppHost orchestrator project file |
| `Aspire.Hosting` package | Core Aspire hosting package reference |
| `Aspire.Hosting.AppHost` | Alternative Aspire hosting package |

**Example project structure:**
```
orleans-voting/
├── OrleansVoting.sln
├── OrleansVoting.AppHost/
│   └── OrleansVoting.AppHost.csproj   ← AppHost indicator
├── OrleansVoting.Web/
├── OrleansVoting.Api/
└── OrleansVoting.Grains/
```

## Azure Preparation Workflow

### Step 1: Detection

When scanning the codebase (per [scan.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-scan)), detect Aspire by:

```bash
# Check for AppHost project
find . -name "*.AppHost.csproj"

# Or check for Aspire.Hosting package reference
grep -r "Aspire.Hosting" . --include="*.csproj"
```

### ⛔ Step 1a: Pre-Check for Custom/Non-Deployable Resources (MANDATORY)

**Before running `azd init --from-code`, scan the AppHost source code to understand whether the app may contain local-only custom resources.**

```bash
# Find the AppHost project and scan only its source directory
APPHOST_PROJECT=$(find . -name "*.AppHost.csproj" | head -1)
APPHOST_DIR=$(dirname "$APPHOST_PROJECT")
grep -r "ExcludeFromManifest" "$APPHOST_DIR" --include="*.cs" | head -20
```

**PowerShell:**
```powershell
# Find the AppHost project and scan only its source directory
$appHostProject = Get-ChildItem -Recurse -Filter "*.AppHost.csproj" | Select-Object -First 1
$appHostDir = $appHostProject.DirectoryName
Get-ChildItem -Path $appHostDir -Recurse -Filter "*.cs" | Select-String "ExcludeFromManifest" | Select-Object -First 20
```

This scan is informational. `.ExcludeFromManifest()` can appear alongside deployable resources, so a positive match does **not** immediately block deployment. What matters is the final `azure.yaml` output after `azd init --from-code` completes:

- If `azd init` **fails** with `unsupported resource type` → see Step 2 error guidance below.
- If `azd init` **succeeds** but `azure.yaml` has an empty or missing `services` section → see Step 4a below.

> 💡 **Why scan early:** Knowing that `.ExcludeFromManifest()` is present gives useful context when azd errors or generates an empty manifest — it confirms the app intentionally targets local development rather than Azure deployment.

### Step 2: Initialize with azd
