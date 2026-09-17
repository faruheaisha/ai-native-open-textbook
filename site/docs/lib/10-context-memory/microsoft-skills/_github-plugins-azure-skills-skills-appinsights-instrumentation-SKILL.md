---
title: "AppInsights Instrumentation Guide"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/appinsights-instrumentation/SKILL.md"
sourceRel: ".github/plugins/azure-skills/skills/appinsights-instrumentation/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/appinsights-instrumentation/SKILL.md"
sourceSha256: "f46e9dd4d4bef33ca78b32980eb06d6667d1c68bf0c1690eef26ea90ca0ae4fa"
pageSha256: "f46e9dd4d4bef33ca78b32980eb06d6667d1c68bf0c1690eef26ea90ca0ae4fa"
contentMode: "local-full"
zh: ""
---

# AppInsights Instrumentation Guide

This skill provides **guidance and reference material** for instrumenting webapps with Azure Application Insights.

> **⛔ ADDING COMPONENTS?**
>
> If the user wants to **add App Insights to their app**, invoke **azure-prepare** instead.
> This skill provides reference material—azure-prepare orchestrates the actual changes.

## When to Use This Skill

- User asks **how** to instrument (guidance, patterns, examples)
- User needs SDK setup instructions
- azure-prepare invokes this skill during research phase
- User wants to understand App Insights concepts

## When to Use azure-prepare Instead

- User says "add telemetry to my app"
- User says "add App Insights" 
- User wants to modify their project
- Any request to change/add components

## Prerequisites

The app in the workspace must be one of these kinds

- An ASP.NET Core app hosted in Azure
- A Node.js app hosted in Azure

## Guidelines

### Collect context information

Find out the (programming language, application framework, hosting) tuple of the application the user is trying to add telemetry support in. This determines how the application can be instrumented. Read the source code to make an educated guess. Confirm with the user on anything you don't know. You must always ask the user where the application is hosted (e.g. on a personal computer, in an Azure App Service as code, in an Azure App Service as container, in an Azure Container App, etc.). 

### Prefer auto-instrument if possible

If the app is a C# ASP.NET Core app hosted in Azure App Service, use [AUTO guide](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-appinsights-instrumentation-references-auto) to help user auto-instrument the app.

### Manually instrument

Manually instrument the app by creating the AppInsights resource and update the app's code. 

#### Create AppInsights resource

Use one of the following options that fits the environment.

- Add AppInsights to existing Bicep template. See [examples/appinsights.bicep](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/appinsights-instrumentation/examples/appinsights.bicep) for what to add. This is the best option if there are existing Bicep template files in the workspace.
- Use Azure CLI. See [scripts/appinsights.ps1](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/appinsights-instrumentation/scripts/appinsights.ps1) for what Azure CLI command to execute to create the App Insights resource.

No matter which option you choose, recommend the user to create the App Insights resource in a meaningful resource group that makes managing resources easier. A good candidate will be the same resource group that contains the resources for the hosted app in Azure.

#### Modify application code

- If the app is an ASP.NET Core app, see [ASPNETCORE guide](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-appinsights-instrumentation-references-aspnetcore) for how to modify the C# code.
- If the app is a Node.js app, see [NODEJS guide](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-appinsights-instrumentation-references-nodejs) for how to modify the JavaScript/TypeScript code.
- If the app is a Python app, see [PYTHON guide](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-appinsights-instrumentation-references-python) for how to modify the Python code.

## SDK Quick References

- **OpenTelemetry Distro**: [Python](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-appinsights-instrumentation-references-sdk-azure-monitor-opentelemetry-py) | [TypeScript](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-appinsights-instrumentation-references-sdk-azure-monitor-opentelemetry-ts)
- **OpenTelemetry Exporter**: [Python](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-appinsights-instrumentation-references-sdk-azure-monitor-opentelemetry-exporter-py) | [Java](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-appinsights-instrumentation-references-sdk-azure-monitor-opentelemetry-exporter-java)

## Platform-Specific Guides

- **Container Apps**: [Observability Guide](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-appinsights-instrumentation-references-container-apps)
