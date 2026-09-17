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
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-cloud-migrate/references/services/functions/assessment.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-cloud-migrate/references/services/functions/assessment.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-cloud-migrate/references/services/functions/assessment.md"
sourceSha256: "001a931a2d5006f22105ceab50275eeeccc9042bf47d76b634c24492f707918f"
pageSha256: "001a931a2d5006f22105ceab50275eeeccc9042bf47d76b634c24492f707918f"
contentMode: "local-full"
zh: ""
---

# Assessment Phase

Generate a migration assessment report before any code changes.

## Prerequisites

- Workspace contains AWS Lambda functions, SAM templates, or CloudFormation templates
- Prompt user to upload relevant files if not present

## Assessment Steps

1. **Identify Functions** — List all Lambda functions with runtimes, triggers, and dependencies
2. **Map AWS Services** — Map AWS services to Azure equivalents (see [lambda-to-functions.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-cloud-migrate-references-services-functions-lambda-to-functions))
3. **Map Properties** — Map Lambda properties to Azure Functions properties
4. **Check Dependencies** — List 3rd-party libraries and verify Azure compatibility
5. **Analyze Code** — Check language support and runtime differences
6. **Map Triggers** — Identify equivalent Azure Functions triggers
7. **Map Deployment** — Identify equivalent Azure deployment strategies (CLI, Bicep, azd)
8. **Review CI/CD** — Check pipeline compatibility with Azure DevOps or GitHub Actions
9. **Map Monitoring** — Map CloudWatch → Application Insights / Azure Monitor

## Code Preview

During assessment, show a **sneak peek** of what the migrated Azure Functions code will look like for each function. Use bindings and triggers (not SDKs) in all previews, following Azure Functions best practices. **Always use the newest generally available (GA) language runtime listed in the Azure Functions supported languages documentation** in previews (for example, the latest Node.js LTS or newest Python GA version). This helps the user understand the migration scope before committing to code migration.

> ⚠️ **Binding-first rule**: Code previews MUST use `input.storageBlob()`, `output.storageBlob()`, `app.storageQueue()`, etc. instead of `BlobServiceClient`, `QueueClient`, or other SDK clients. Only use SDK for services that have no binding equivalent.

## Architecture Diagrams

Generate two diagrams:
1. **Current State** — AWS Lambda architecture with triggers and integrations
2. **Target State** — Azure Functions architecture showing equivalent structure

## Assessment Report Format

> ⚠️ **MANDATORY**: Use these exact section headings in every assessment report. Do NOT rename, reorder, or omit sections.
