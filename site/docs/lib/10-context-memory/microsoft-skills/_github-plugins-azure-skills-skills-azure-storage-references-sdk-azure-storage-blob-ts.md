---
title: "Blob Storage — TypeScript SDK Quick Reference"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-storage/references/sdk/azure-storage-blob-ts.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-storage/references/sdk/azure-storage-blob-ts.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-storage/references/sdk/azure-storage-blob-ts.md"
sourceSha256: "fbcaa7379e7d98247675efd82553cacaef50abc1c61af547fcaf00e03c9c1d3d"
pageSha256: "fbcaa7379e7d98247675efd82553cacaef50abc1c61af547fcaf00e03c9c1d3d"
contentMode: "local-full"
zh: ""
---

# Blob Storage — TypeScript SDK Quick Reference

> Condensed from **azure-storage-blob-ts**. Full patterns (SAS generation,
> append/page blobs, streaming, browser uploads, error handling)
> in the **azure-storage-blob-ts** plugin skill if installed.

## Install
npm install @azure/storage-blob @azure/identity

## Quick Start
```typescript
import { BlobServiceClient } from "@azure/storage-blob";
import { DefaultAzureCredential } from "@azure/identity";
const client = new BlobServiceClient(`https://${accountName}.blob.core.windows.net`, new DefaultAzureCredential());
```

## Best Practices
- Use DefaultAzureCredential for **local development only** — in production, use ManagedIdentityCredential. See [auth-best-practices.md](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-storage/references/auth-best-practices.md)
- Use streaming for large files — `uploadStream`/`downloadToFile` for files > 256MB
- Set appropriate content types — use `setHTTPHeaders` for correct MIME types
- Use SAS tokens for client access — generate short-lived tokens for browser uploads
- Handle errors gracefully — check `RestError.statusCode` for specific handling
- Use `*IfNotExists` methods for idempotent container/blob creation
- Close clients — good practice in long-running apps
