---
title: "Assessment Phase"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-cloud-migrate/references/services/app-service/assessment.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-cloud-migrate/references/services/app-service/assessment.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-cloud-migrate/references/services/app-service/assessment.md"
sourceSha256: "cf98667abca7ef539134002414921971a176dc5de425e513af8febe6f625a6a1"
pageSha256: "cf98667abca7ef539134002414921971a176dc5de425e513af8febe6f625a6a1"
contentMode: "local-full"
zh: ""
---

# Assessment Phase

Generate a migration assessment report before any code changes.

## Prerequisites

- Workspace contains source platform project files (Procfile, app.yaml, .ebextensions, etc.)
- Prompt user to upload relevant files if not present

## Assessment Steps

1. **Identify Application** — Determine app type (web, API, worker), runtime, and framework
2. **Map Platform Services** — Map source services to Azure equivalents (see scenario-specific references)
3. **Map Properties** — Map compute config (instance size, scaling) to App Service Plan properties
4. **Check Dependencies** — List 3rd-party libraries and verify Azure compatibility
5. **Analyze Code** — Check for platform-specific APIs, SDKs, or patterns that need migration
6. **Map Data Services** — Identify database and storage migration paths
7. **Map Deployment** — Identify equivalent Azure deployment strategies (azd, GitHub Actions, Bicep)
8. **Review CI/CD** — Check pipeline compatibility with Azure DevOps or GitHub Actions
9. **Map Monitoring** — Map observability stack → Application Insights / Azure Monitor

## Code Preview

During assessment, show a **sneak peek** of key configuration changes:
- Startup command / Dockerfile adjustments
- App Settings mapping
- Database connection string migration (to managed identity)

This helps the user understand the migration scope before committing.

## Architecture Diagrams

Generate two diagrams:
1. **Current State** — Source platform architecture with services and integrations
2. **Target State** — Azure architecture showing equivalent App Service structure

## Assessment Report Format

> ⚠️ **MANDATORY**: Use these exact section headings in every assessment report. Do NOT rename, reorder, or omit sections.
