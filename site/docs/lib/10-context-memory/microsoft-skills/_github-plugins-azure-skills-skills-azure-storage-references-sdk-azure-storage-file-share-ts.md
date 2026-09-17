---
title: "File Shares — TypeScript SDK Quick Reference"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-storage/references/sdk/azure-storage-file-share-ts.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-storage/references/sdk/azure-storage-file-share-ts.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-storage/references/sdk/azure-storage-file-share-ts.md"
sourceSha256: "5cc219bb649529a29d735d9051eaf03b5a649a59d3ee7842e0da878ba1e8797c"
pageSha256: "5cc219bb649529a29d735d9051eaf03b5a649a59d3ee7842e0da878ba1e8797c"
contentMode: "local-full"
zh: ""
---

# File Shares — TypeScript SDK Quick Reference

> Condensed from **azure-storage-file-share-ts**. Full patterns (SAS generation,
> snapshots, range operations, streaming, copy operations)
> in the **azure-storage-file-share-ts** plugin skill if installed.

## Install
npm install @azure/storage-file-share @azure/identity

## Quick Start
```typescript
import { ShareServiceClient } from "@azure/storage-file-share";
import { DefaultAzureCredential } from "@azure/identity";
const client = new ShareServiceClient(`https://${accountName}.file.core.windows.net`, new DefaultAzureCredential());
```

## Best Practices
- Use connection strings for simplicity in development
- Use DefaultAzureCredential for **local development only** — in production, use ManagedIdentityCredential. See [auth-best-practices.md](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-storage/references/auth-best-practices.md)
- Set quotas on shares to prevent unexpected storage costs
- Use streaming for large files — `uploadStream`/`downloadToFile` for files > 256MB
- Use ranges for partial updates — more efficient than full file replacement
- Create snapshots before major changes — point-in-time recovery
- Handle errors gracefully — check `RestError.statusCode` for specific handling
- Use `*IfExists` methods for idempotent operations
