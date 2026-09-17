---
title: "Codebase Scan"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/scan.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/scan.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/scan.md"
sourceSha256: "f2687624a4b7f18600eb37ac25d595f5c98cc360d5265f5e92dbd4998463bce4"
pageSha256: "f2687624a4b7f18600eb37ac25d595f5c98cc360d5265f5e92dbd4998463bce4"
contentMode: "local-full"
zh: ""
---

# Codebase Scan

Analyze workspace to identify components, technologies, and dependencies.

## Detection Patterns

### Languages & Frameworks

| File | Indicates |
|------|-----------|
| `package.json` | Node.js |
| `requirements.txt`, `pyproject.toml` | Python |
| `*.csproj`, `*.sln` | .NET |
| `pom.xml`, `build.gradle` | Java |
| `go.mod` | Go |

### Component Types

| Pattern | Component Type |
|---------|----------------|
| React/Vue/Angular in package.json | SPA Frontend |
| Only .html/.css/.js files, no package.json | Pure Static Site |
| Express/Fastify/Koa | API Service |
| Flask/FastAPI/Django | API Service |
| Next.js/Nuxt | SSR Web App |
| Celery/Bull/Agenda | Background Worker |
| azure-functions SDK | Azure Function |
| .AppHost.csproj or Aspire.Hosting package | .NET Aspire App |

**Pure Static Site Detection:**
- No package.json, requirements.txt, or build configuration
- Contains only HTML, CSS, JavaScript, and asset files
- No framework dependencies (React, Vue, Angular, etc.)
- ⚠️ For pure static sites, do NOT add `language` field to azure.yaml to avoid triggering build steps

### Existing Tooling

| Found | Tooling |
|-------|---------|
| `azure.yaml` | AZD configured |
| `infra/*.bicep` | Bicep IaC |
| `infra/*.tf` | Terraform IaC |
| `Dockerfile` | Containerized |
| `.github/workflows/` | GitHub Actions CI/CD |
| `azure-pipelines.yml` | Azure DevOps CI/CD |

### .NET Aspire Detection

**.NET Aspire projects** are identified by:
- A project ending with `.AppHost.csproj` (e.g., `OrleansVoting.AppHost.csproj`)
- Reference to `Aspire.Hosting` or `Aspire.Hosting.AppHost` package in .csproj files
- Multiple .NET projects in a solution, typically including an AppHost orchestrator

**When Aspire is detected:**
