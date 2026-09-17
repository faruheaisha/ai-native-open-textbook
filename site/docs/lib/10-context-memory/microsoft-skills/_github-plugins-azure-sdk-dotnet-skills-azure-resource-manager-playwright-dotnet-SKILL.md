---
title: "Azure.ResourceManager.Playwright (.NET)"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-dotnet/skills/azure-resource-manager-playwright-dotnet/SKILL.md"
sourceRel: ".github/plugins/azure-sdk-dotnet/skills/azure-resource-manager-playwright-dotnet/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-dotnet/skills/azure-resource-manager-playwright-dotnet/SKILL.md"
sourceSha256: "019b205f338274a141a25801d9d4320a9d2e65e44f175a2012ede29d58c374d2"
pageSha256: "019b205f338274a141a25801d9d4320a9d2e65e44f175a2012ede29d58c374d2"
contentMode: "local-full"
zh: ""
---

# Azure.ResourceManager.Playwright (.NET)

Management plane SDK for provisioning and managing Microsoft Playwright Testing workspaces via Azure Resource Manager.

> **⚠️ Management vs Test Execution**
> - **This SDK (Azure.ResourceManager.Playwright)**: Create workspaces, manage quotas, check name availability
> - **Test Execution SDK (Azure.Developer.MicrosoftPlaywrightTesting.NUnit)**: Run Playwright tests at scale on cloud browsers

## Installation

```bash
dotnet add package Azure.ResourceManager.Playwright
dotnet add package Azure.Identity
```

**Current Versions**: Stable v1.0.0, Preview v1.0.0-beta.1

## Environment Variables

```bash
