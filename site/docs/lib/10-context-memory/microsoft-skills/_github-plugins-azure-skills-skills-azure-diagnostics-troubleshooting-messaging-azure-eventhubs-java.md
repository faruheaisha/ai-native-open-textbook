---
title: "Azure Event Hubs SDK — Java"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-diagnostics/troubleshooting/messaging/azure-eventhubs-java.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-diagnostics/troubleshooting/messaging/azure-eventhubs-java.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-diagnostics/troubleshooting/messaging/azure-eventhubs-java.md"
sourceSha256: "f81e0671f1472545a805cb8ed5982fc3fb3ab743ac7111a26549be1500bb2e49"
pageSha256: "f81e0671f1472545a805cb8ed5982fc3fb3ab743ac7111a26549be1500bb2e49"
contentMode: "local-full"
zh: ""
---

# Azure Event Hubs SDK — Java

Package: `azure-messaging-eventhubs` | [README](https://github.com/Azure/azure-sdk-for-java/blob/main/sdk/eventhubs/azure-messaging-eventhubs/) | [Full Troubleshooting Guide](https://github.com/Azure/azure-sdk-for-java/blob/main/sdk/eventhubs/azure-messaging-eventhubs/TROUBLESHOOTING.md)

> ⚠️ **Note:** The detailed Java troubleshooting guide has moved to [Microsoft Learn](https://learn.microsoft.com/azure/developer/java/sdk/troubleshooting-messaging-event-hubs-overview).

## Common Errors

| Exception | Cause | Fix |
|-----------|-------|-----|
| `AmqpException` (connection:forced) | Idle connection disconnected | Auto-recovers; no action needed |
| `AmqpException` (unauthorized-access) | Bad credentials or missing permissions | Verify connection string, SAS, or RBAC roles |
| `AmqpException` (resource-limit-exceeded) | Too many concurrent receivers | Reduce receiver count or upgrade tier |
| `OperationTimeoutException` | Network issue or throttling | Check firewall, try AMQP over WebSockets (port 443) |

## Enable Logging

Configure via SLF4J. Add `logback-classic` dependency and set level for `com.azure.messaging.eventhubs`:

```xml
<logger name="com.azure.messaging.eventhubs" level="DEBUG"/>
```

For AMQP frame tracing:
```xml
<logger name="com.azure.core.amqp" level="DEBUG"/>
```

See [Java SDK logging docs](https://learn.microsoft.com/azure/developer/java/sdk/troubleshooting-messaging-event-hubs-overview) for details.

## Key Issues

- **High CPU / partition imbalance**: Limit to 1.5–3 partitions per CPU core.
- **Consumer disconnected**: Higher priority consumer took ownership. Expected during load balancing. Persistent issues without scaling indicate a problem.
- **Connection sharing**: Reuse `EventHubClientBuilder` connections; avoid creating new clients per operation.

## Checkpointing (BlobCheckpointStore)

Package: `azure-messaging-eventhubs-checkpointstore-blob`

> **Auth:** `DefaultAzureCredential` is for local development. See [auth-best-practices.md](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-diagnostics/troubleshooting/messaging/auth-best-practices.md) for production patterns.

```java
TokenCredential credential = new DefaultAzureCredentialBuilder().build();

BlobContainerAsyncClient blobClient = new BlobContainerClientBuilder()
