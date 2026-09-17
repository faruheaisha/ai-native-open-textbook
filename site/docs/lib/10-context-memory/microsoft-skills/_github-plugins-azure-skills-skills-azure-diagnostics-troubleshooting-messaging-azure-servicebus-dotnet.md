---
title: "Azure Service Bus SDK — .NET (C)"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-diagnostics/troubleshooting/messaging/azure-servicebus-dotnet.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-diagnostics/troubleshooting/messaging/azure-servicebus-dotnet.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-diagnostics/troubleshooting/messaging/azure-servicebus-dotnet.md"
sourceSha256: "49ee74f9327aa2fe311d56d0bed2b80d757c807b82e6385833497570a1eb3927"
pageSha256: "49ee74f9327aa2fe311d56d0bed2b80d757c807b82e6385833497570a1eb3927"
contentMode: "local-full"
zh: ""
---

# Azure Service Bus SDK — .NET (C#)

Package: `Azure.Messaging.ServiceBus` | [README](https://github.com/Azure/azure-sdk-for-net/blob/main/sdk/servicebus/Azure.Messaging.ServiceBus/) | [Full Troubleshooting Guide](https://github.com/Azure/azure-sdk-for-net/blob/main/sdk/servicebus/Azure.Messaging.ServiceBus/TROUBLESHOOTING.md)

## Common Errors

| Exception | Reason | Fix |
|-----------|--------|-----|
| `ServiceBusException` (ServiceTimeout) | Service didn't respond | Transient — auto-retried. For session accept, means no unlocked sessions |
| `ServiceBusException` (MessageLockLost) | Lock expired or link detached | Renew lock, reduce processing time, check network |
| `ServiceBusException` (SessionLockLost) | Session lock expired | Re-accept session, renew lock before expiry |
| `ServiceBusException` (QuotaExceeded) | Too many concurrent receives | Reduce receivers or use batch receives |
| `ServiceBusException` (MessageSizeExceeded) | Message or batch too large | Reduce payload. Premium tier supports individual messages up to 100MB. Batch limit is artificially computed on the client from the max message size sent by the service, so batches can also be impacted |
| `ServiceBusException` (ServiceBusy) | Request throttled | Auto-retried with 10s backoff. See [throttling docs](https://learn.microsoft.com/azure/service-bus-messaging/service-bus-throttling) |
| `UnauthorizedAccessException` | Bad credentials | Verify connection string, SAS, or RBAC roles |

## Exception Filtering

```csharp
try { /* receive messages */ }
catch (ServiceBusException ex) when (ex.Reason == ServiceBusFailureReason.ServiceTimeout)
{
    // Handle timeout
}
```

## Key Issues

- **Socket exhaustion**: Treat `ServiceBusClient` as singleton. Each creates a new AMQP connection. Always call `CloseAsync`/`DisposeAsync`.
- **Lock lost before expiry**: Can happen on link detach (transient network) or 10-min idle timeout.
- **Processor high concurrency**: May cause hangs with extreme concurrency settings. Test with moderate values.
- **Session processor slow switching**: Tune `SessionIdleTimeout` to reduce wait time between sessions.
- **Batch size limits**: Batch limit is artificially computed on the client from the max message size sent by the service. Send large messages individually if batch creation fails.
- **Transactions across entities**: Requires all entities on same namespace. Use `ServiceBusClient.CreateSender` with `via` entity support.
- **WebSockets**: Use `ServiceBusTransportType.AmqpWebSockets` when AMQP ports (5761, 5762) are blocked.
