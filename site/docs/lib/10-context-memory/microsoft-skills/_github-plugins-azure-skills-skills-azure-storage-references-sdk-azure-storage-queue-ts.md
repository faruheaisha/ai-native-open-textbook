---
title: "Queue Storage — TypeScript SDK Quick Reference"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-storage/references/sdk/azure-storage-queue-ts.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-storage/references/sdk/azure-storage-queue-ts.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-storage/references/sdk/azure-storage-queue-ts.md"
sourceSha256: "e9f68c8279e8ba5623a6495e209619a7f9cfad7f07beb0d81e2a4ed26231f284"
pageSha256: "e9f68c8279e8ba5623a6495e209619a7f9cfad7f07beb0d81e2a4ed26231f284"
contentMode: "local-full"
zh: ""
---

# Queue Storage — TypeScript SDK Quick Reference

> Condensed from **azure-storage-queue-ts**. Full patterns (SAS generation,
> poison message handling, visibility extension, message encoding)
> in the **azure-storage-queue-ts** plugin skill if installed.

## Install
npm install @azure/storage-queue @azure/identity

## Quick Start
```typescript
import { QueueServiceClient } from "@azure/storage-queue";
import { DefaultAzureCredential } from "@azure/identity";
const client = new QueueServiceClient(`https://${accountName}.queue.core.windows.net`, new DefaultAzureCredential());
```

## Best Practices
- Use DefaultAzureCredential for **local development only** — in production, use ManagedIdentityCredential. See [auth-best-practices.md](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-storage/references/auth-best-practices.md)
- Always delete after processing — prevent duplicate processing
- Handle poison messages — move failed messages to a dead-letter queue
- Use appropriate visibility timeout — set based on expected processing time
- Extend visibility for long tasks — update message to prevent timeout
- Use JSON for structured data — serialize objects to JSON strings
- Check dequeueCount — detect repeatedly failing messages
- Use batch receive — receive multiple messages for efficiency
