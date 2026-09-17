---
title: "Azure Event Hubs SDK — JavaScript"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-diagnostics/troubleshooting/messaging/azure-eventhubs-js.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-diagnostics/troubleshooting/messaging/azure-eventhubs-js.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-diagnostics/troubleshooting/messaging/azure-eventhubs-js.md"
sourceSha256: "f4794520b65453a99ba1ede3fe9c7d34742d37a5148710a957ad8c6ba3033bb4"
pageSha256: "f4794520b65453a99ba1ede3fe9c7d34742d37a5148710a957ad8c6ba3033bb4"
contentMode: "local-full"
zh: ""
---

# Azure Event Hubs SDK — JavaScript

Package: `@azure/event-hubs` | [README](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/eventhub/event-hubs/) | [Full Troubleshooting Guide](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/eventhub/event-hubs/TROUBLESHOOTING.md)

## Common Errors

| Error | Code | Fix |
|-------|------|-----|
| `MessagingError` (connection:forced) | Idle disconnect | Auto-recovers; no action needed |
| `MessagingError` (Unauthorized) | Bad credentials | Verify connection string, SAS, or RBAC roles |
| `MessagingError` (retryable: true) | Transient issue | Auto-retried per `RetryOptions`. If surfaced, all retries exhausted |

`MessagingError` fields: `name`, `code`, `retryable`, `info`, `address`, `errno`, `port`, `syscall`.

## Enable Logging

```bash
# All SDK logs
export AZURE_LOG_LEVEL=verbose

# Or use DEBUG for granular control
export DEBUG=azure*,rhea*

# Errors only
export DEBUG=azure:*:(error|warning),rhea-promise:error,rhea:events,rhea:frames,rhea:io,rhea:flow
```

Browser:
```javascript
localStorage.debug = "azure:*:info";
```

## Key Issues

- **Socket exhaustion**: Treat clients as singletons. Each new client creates a new AMQP connection/socket. Always call `close()`.
- **412 precondition failures**: Normal during subscription partition ownership negotiation.
- **Partition ownership churn**: Expected when scaling instances. Should stabilize within minutes.
- **High CPU**: Limit to 1.5–3 partitions per CPU core.
- **Subscription stops receiving**: Often a symptom of an underlying race condition during error recovery. File a GitHub issue with DEBUG logs.
- **WebSockets**: Pass `webSocketOptions` to client constructor to connect over port 443.

## Checkpointing (BlobCheckpointStore)

Package: `@azure/eventhubs-checkpointstore-blob`

> **Auth:** `DefaultAzureCredential` is for local development. See [auth-best-practices.md](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-diagnostics/troubleshooting/messaging/auth-best-practices.md) for production patterns.

```javascript
const { BlobCheckpointStore } = require("@azure/eventhubs-checkpointstore-blob");
const { BlobServiceClient } = require("@azure/storage-blob");

const containerClient = new BlobServiceClient(storageEndpoint, credential)
  .getContainerClient("checkpointstore");
const checkpointStore = new BlobCheckpointStore(containerClient);

const consumerClient = new EventHubConsumerClient(
  consumerGroup, fullyQualifiedNamespace, eventHubName, credential, checkpointStore
);
```

**Common issues:**
- **Soft delete / blob versioning**: Disable both on the storage account — they cause delays during load balancing.
- **412 precondition failures**: Normal during partition ownership negotiation; not an error.
- **Checkpoint frequency**: Call `updateCheckpoint()` per batch, not per event, to reduce storage calls.
