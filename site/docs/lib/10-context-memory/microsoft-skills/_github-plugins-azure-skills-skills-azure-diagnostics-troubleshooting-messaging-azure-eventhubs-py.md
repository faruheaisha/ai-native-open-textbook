---
title: "Azure Event Hubs SDK — Python"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-diagnostics/troubleshooting/messaging/azure-eventhubs-py.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-diagnostics/troubleshooting/messaging/azure-eventhubs-py.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-diagnostics/troubleshooting/messaging/azure-eventhubs-py.md"
sourceSha256: "4511039cc6ce513e8ff4eaedc46b7248bb64d12897b52003bf66709a0c4a4e78"
pageSha256: "4511039cc6ce513e8ff4eaedc46b7248bb64d12897b52003bf66709a0c4a4e78"
contentMode: "local-full"
zh: ""
---

# Azure Event Hubs SDK — Python

Package: `azure-eventhub` | [README](https://github.com/Azure/azure-sdk-for-python/blob/main/sdk/eventhub/azure-eventhub) | [Full Troubleshooting Guide](https://github.com/Azure/azure-sdk-for-python/blob/main/sdk/eventhub/azure-eventhub/TROUBLESHOOTING.md)

## Common Errors

| Exception | Cause | Fix |
|-----------|-------|-----|
| `EventHubError` | Base exception wrapping AMQP errors | Check `message`, `error`, `details` fields |
| `ConnectionLostError` | Idle connection disconnected | Auto-recovers on next operation; no action needed |
| `AuthenticationError` | Bad credentials or expired SAS | Regenerate key, check RBAC roles, verify connection string |
| `OperationTimeoutError` | Network or throttling | Check firewall, try WebSockets (port 443), increase timeout |

## Retry Configuration

> **Auth:** `DefaultAzureCredential` is for local development. See [auth-best-practices.md](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-diagnostics/troubleshooting/messaging/auth-best-practices.md) for production patterns.

```python
from azure.eventhub import EventHubProducerClient
from azure.identity import DefaultAzureCredential

client = EventHubProducerClient(
