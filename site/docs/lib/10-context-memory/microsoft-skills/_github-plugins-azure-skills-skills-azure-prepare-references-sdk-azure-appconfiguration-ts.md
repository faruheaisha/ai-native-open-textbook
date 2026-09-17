---
title: "App Configuration — TypeScript SDK Quick Reference"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/sdk/azure-appconfiguration-ts.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/sdk/azure-appconfiguration-ts.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/sdk/azure-appconfiguration-ts.md"
sourceSha256: "c2bb07093bf928e3ae9a47bae68bc93a7acaead5fc0ad749d20d68acac736dc4"
pageSha256: "c2bb07093bf928e3ae9a47bae68bc93a7acaead5fc0ad749d20d68acac736dc4"
contentMode: "local-full"
zh: ""
---

# App Configuration — TypeScript SDK Quick Reference

> Condensed from **azure-appconfiguration-ts**. Full patterns (provider,
> dynamic refresh, Key Vault references, feature flags, snapshots)
> in the **azure-appconfiguration-ts** plugin skill if installed.

## Install
npm install @azure/app-configuration @azure/identity

## Quick Start

> **Auth:** `DefaultAzureCredential` is for local development. See [auth-best-practices.md](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/auth-best-practices.md) for production patterns.

```typescript
import { AppConfigurationClient } from "@azure/app-configuration";
import { DefaultAzureCredential } from "@azure/identity";
const client = new AppConfigurationClient(process.env.AZURE_APPCONFIG_ENDPOINT!, new DefaultAzureCredential());
```

## Best Practices
- Use provider for apps — @azure/app-configuration-provider for runtime config
- Use low-level for management — @azure/app-configuration for CRUD operations
- Enable refresh for dynamic configuration updates
- Use labels to separate configurations by environment
- Use snapshots for immutable release configurations
- Sentinel pattern — use a sentinel key to trigger full refresh
- RBAC roles — App Configuration Data Reader for read-only access
