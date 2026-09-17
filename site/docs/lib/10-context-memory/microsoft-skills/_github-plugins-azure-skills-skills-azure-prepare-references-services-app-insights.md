---
title: "App Insights"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/services/app-insights/README.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/services/app-insights/README.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/services/app-insights/README.md"
sourceSha256: "62fff4bd5adf79a3c3864175aa33f0e6712fcf6ddd083cf8c3366436b0488199"
pageSha256: "62fff4bd5adf79a3c3864175aa33f0e6712fcf6ddd083cf8c3366436b0488199"
contentMode: "local-full"
zh: ""
---

# App Insights

Azure Application Insights for telemetry, monitoring, and APM.

## When to Add

- User wants observability/monitoring
- User mentions telemetry, tracing, or logging
- Production apps needing health visibility

## Implementation

> **→ Invoke the `appinsights-instrumentation` skill**
>
> This skill has detailed guides for:
> - Auto-instrumentation (ASP.NET Core on App Service)
> - Manual instrumentation (Node.js, Python, C#)
> - Bicep templates and CLI scripts

## Quick Reference

| Aspect | Value |
|--------|-------|
| Resource | `Microsoft.Insights/components` |
| Depends on | Log Analytics Workspace |
| SKU | PerGB2018 (consumption-based) |

## Architecture Notes

- Create in same resource group as the app
- Connect to centralized Log Analytics Workspace
- Use connection string (not instrumentation key) for new apps
