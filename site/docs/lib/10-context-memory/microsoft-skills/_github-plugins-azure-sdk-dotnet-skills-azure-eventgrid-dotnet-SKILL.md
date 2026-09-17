---
title: "Azure.Messaging.EventGrid (.NET)"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-dotnet/skills/azure-eventgrid-dotnet/SKILL.md"
sourceRel: ".github/plugins/azure-sdk-dotnet/skills/azure-eventgrid-dotnet/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-dotnet/skills/azure-eventgrid-dotnet/SKILL.md"
sourceSha256: "898e9dd9acece95418989c09e3e9824fbe81c8ecb3bb4279003edff334f63e24"
pageSha256: "898e9dd9acece95418989c09e3e9824fbe81c8ecb3bb4279003edff334f63e24"
contentMode: "local-full"
zh: ""
---

# Azure.Messaging.EventGrid (.NET)

Client library for publishing events to Azure Event Grid topics, domains, and namespaces.

## Installation

```bash
# For topics and domains (push delivery)
dotnet add package Azure.Messaging.EventGrid

# For namespaces (pull delivery)
dotnet add package Azure.Messaging.EventGrid.Namespaces

# For CloudNative CloudEvents interop
dotnet add package Microsoft.Azure.Messaging.EventGrid.CloudNativeCloudEvents
```

**Current Version**: 4.28.0 (stable)

## Environment Variables

```bash
