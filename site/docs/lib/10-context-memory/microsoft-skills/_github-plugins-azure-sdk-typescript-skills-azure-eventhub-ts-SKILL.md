---
title: "Azure Event Hubs SDK for TypeScript"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-typescript/skills/azure-eventhub-ts/SKILL.md"
sourceRel: ".github/plugins/azure-sdk-typescript/skills/azure-eventhub-ts/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-typescript/skills/azure-eventhub-ts/SKILL.md"
sourceSha256: "6f452bd5f842bafc697edbb8201a091a360584c7a03881bfb63c38745899de2a"
pageSha256: "6f452bd5f842bafc697edbb8201a091a360584c7a03881bfb63c38745899de2a"
contentMode: "local-full"
zh: ""
---

# Azure Event Hubs SDK for TypeScript

High-throughput event streaming and real-time data ingestion.

## Installation

```bash
npm install @azure/event-hubs @azure/identity
```

For checkpointing with consumer groups:
```bash
npm install @azure/eventhubs-checkpointstore-blob @azure/storage-blob
```

## Environment Variables

```bash
EVENTHUB_NAMESPACE=<namespace>.servicebus.windows.net
EVENTHUB_NAME=my-eventhub
