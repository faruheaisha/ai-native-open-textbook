---
title: "Authentication — TypeScript SDK Quick Reference"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-deploy/references/sdk/azure-identity-ts.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-deploy/references/sdk/azure-identity-ts.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-deploy/references/sdk/azure-identity-ts.md"
sourceSha256: "7cf5556fb9e06f4a3e9327dab8ce4aae5de09a9225fe5df6c95b3e7f4dc5e5bd"
pageSha256: "7cf5556fb9e06f4a3e9327dab8ce4aae5de09a9225fe5df6c95b3e7f4dc5e5bd"
contentMode: "local-full"
zh: ""
---

# Authentication — TypeScript SDK Quick Reference

> Condensed from **azure-identity-ts**. Full patterns (sovereign clouds,
> device code flow, custom credentials, bearer token provider)
> in the **azure-identity-ts** plugin skill if installed.

## Install
npm install @azure/identity

## Quick Start

> **Auth:** `DefaultAzureCredential` is for local development. See [auth-best-practices.md](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-deploy/references/auth-best-practices.md) for production patterns.

```typescript
import { DefaultAzureCredential } from "@azure/identity";
const credential = new DefaultAzureCredential();
```

## Best Practices
- Use DefaultAzureCredential for **local development only** (CLI, PowerShell, VS Code). In production, use ManagedIdentityCredential — see [auth-best-practices.md](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-deploy/references/auth-best-practices.md)
- Never hardcode credentials — use environment variables or managed identity
- Prefer managed identity — no secrets to manage in production
- Scope credentials appropriately — use user-assigned identity for multi-tenant scenarios
- Handle token refresh — Azure SDK handles this automatically
- Use ChainedTokenCredential for custom fallback scenarios
