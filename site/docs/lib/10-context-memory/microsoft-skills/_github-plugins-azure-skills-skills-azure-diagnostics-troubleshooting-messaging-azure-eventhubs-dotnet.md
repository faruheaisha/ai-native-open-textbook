---
title: "Azure Event Hubs SDK — .NET (C)"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-diagnostics/troubleshooting/messaging/azure-eventhubs-dotnet.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-diagnostics/troubleshooting/messaging/azure-eventhubs-dotnet.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-diagnostics/troubleshooting/messaging/azure-eventhubs-dotnet.md"
sourceSha256: "d168fd1529ad865409707fd0e208d44877ae3e9306de25f36ad141fe916e7b5e"
pageSha256: "d168fd1529ad865409707fd0e208d44877ae3e9306de25f36ad141fe916e7b5e"
contentMode: "local-full"
zh: ""
---

# Azure Event Hubs SDK — .NET (C#)

Package: `Azure.Messaging.EventHubs` | [README](https://github.com/Azure/azure-sdk-for-net/blob/main/sdk/eventhub/Azure.Messaging.EventHubs/) | [Full Troubleshooting Guide](https://github.com/Azure/azure-sdk-for-net/blob/main/sdk/eventhub/Azure.Messaging.EventHubs/TROUBLESHOOTING.md)

## Common Errors

| Exception | Reason | Fix |
|-----------|--------|-----|
| `EventHubsException` (ServiceTimeout) | Service didn't respond in time | Transient — retried automatically. Verify state if persists |
| `EventHubsException` (QuotaExceeded) | Too many active readers per consumer group | Reduce concurrent receivers or upgrade tier |
| `EventHubsException` (ConsumerDisconnected) | Higher priority consumer took ownership | Expected during load balancing; check if scaling |
| `EventHubsException` (MessageSizeExceeded) | Event too large | Reduce event payload; unlikely in practice since the client caps at the service link limit |
| `UnauthorizedAccessException` | Bad credentials | Verify connection string, SAS token, or RBAC roles |

## Exception Filtering

```csharp
try { /* receive events */ }
catch (EventHubsException ex) when (ex.Reason == EventHubsException.FailureReason.ConsumerDisconnected)
{
    // Handle consumer disconnection
}
```

## Retry Configuration

Configure via `EventHubsRetryOptions` when creating the client. See [Configuring retry thresholds sample](https://github.com/Azure/azure-sdk-for-net/blob/main/sdk/eventhub/Azure.Messaging.EventHubs/samples).

## Key Issues

- **Socket exhaustion**: Treat clients as singletons. Share `EventHubConnection` across clients if needed. Always call `CloseAsync` or `DisposeAsync`.
- **HTTP 412/409 from storage**: Normal during checkpoint store operations — not an error.
- **Partitions closing frequently**: Expected when scaling. If persists >5 min without scaling, investigate. See [Troubleshooting Guide](https://github.com/Azure/azure-sdk-for-net/blob/main/sdk/eventhub/Azure.Messaging.EventHubs/TROUBLESHOOTING.md) for detailed diagnostics.
- **High CPU**: Limit to 1.5–3 partitions per CPU core and test at scale thoroughly if above that threshold.
- **Azure Functions**: After upgrading to v5.0+ extensions, update binding types. Reduce logging noise by filtering `Azure.Messaging.EventHubs` to Warning.
- **WebSockets**: Use `EventHubsTransportType.AmqpWebSockets` to connect over port 443 when AMQP ports (5761, 5762) are blocked.

## Checkpointing (BlobCheckpointStore)

Package: `Azure.Messaging.EventHubs.Processor` (includes `EventProcessorClient` + blob checkpoint store)

> **Auth:** `DefaultAzureCredential` is for local development. See [auth-best-practices.md](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-diagnostics/troubleshooting/messaging/auth-best-practices.md) for production patterns.

```csharp
var credential = new DefaultAzureCredential();

var storageClient = new BlobContainerClient(
