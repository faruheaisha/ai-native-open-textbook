---
title: "Azure.Messaging.EventHubs (.NET)"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-dotnet/skills/azure-eventhub-dotnet/SKILL.md"
sourceRel: ".github/plugins/azure-sdk-dotnet/skills/azure-eventhub-dotnet/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-dotnet/skills/azure-eventhub-dotnet/SKILL.md"
sourceSha256: "f9b30ce076b96ee944e8863b553d48851a6ffaf6ab0e94acff72745b41ccf686"
pageSha256: "f9b30ce076b96ee944e8863b553d48851a6ffaf6ab0e94acff72745b41ccf686"
contentMode: "local-full"
zh: ""
---

# Azure.Messaging.EventHubs (.NET)

High-throughput event streaming SDK for sending and receiving events via Azure Event Hubs.

## Installation

```bash
# Core package (sending and simple receiving)
dotnet add package Azure.Messaging.EventHubs

# Processor package (production receiving with checkpointing)
dotnet add package Azure.Messaging.EventHubs.Processor

# Authentication
dotnet add package Azure.Identity

# For checkpointing (required by EventProcessorClient)
dotnet add package Azure.Storage.Blobs
```

**Current Versions**: Azure.Messaging.EventHubs v5.12.2, Azure.Messaging.EventHubs.Processor v5.12.2

## Environment Variables

```bash
EVENTHUB_FULLY_QUALIFIED_NAMESPACE=<namespace>.servicebus.windows.net  # Required: Event Hubs fully qualified namespace
