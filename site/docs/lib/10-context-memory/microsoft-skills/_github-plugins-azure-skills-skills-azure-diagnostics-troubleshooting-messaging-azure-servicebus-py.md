---
title: "Azure Service Bus SDK — Python"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-diagnostics/troubleshooting/messaging/azure-servicebus-py.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-diagnostics/troubleshooting/messaging/azure-servicebus-py.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-diagnostics/troubleshooting/messaging/azure-servicebus-py.md"
sourceSha256: "274162fa4cec6f96fea056639c7cf0d8821bce277af82eb01343f6a9e74f647b"
pageSha256: "274162fa4cec6f96fea056639c7cf0d8821bce277af82eb01343f6a9e74f647b"
contentMode: "local-full"
zh: ""
---

# Azure Service Bus SDK — Python

Package: `azure-servicebus` | [README](https://github.com/Azure/azure-sdk-for-python/blob/main/sdk/servicebus/azure-servicebus/) | [Full Troubleshooting Guide](https://github.com/Azure/azure-sdk-for-python/blob/main/sdk/servicebus/azure-servicebus/TROUBLESHOOTING.md)

## Common Errors

| Exception | Cause | Fix |
|-----------|-------|-----|
| `ServiceBusAuthenticationError` | Invalid credentials | Check connection string, regenerate SAS key |
| `ServiceBusAuthorizationError` | Missing Send/Listen claim | Assign `Azure Service Bus Data Owner/Sender/Receiver` RBAC role |
| `ServiceBusConnectionError` | Network or firewall | Check AMQP port 5671, try `TransportType.AmqpOverWebsocket` |
| `OperationTimeoutError` | Service didn't respond in time | Adjust retry config, verify network |
| `MessageLockLostError` | Processing exceeded lock duration | Use `AutoLockRenewer`, reduce processing time |
| `SessionLockLostError` | Session lock expired | Reconnect to session, keep renewing lock |
| `MessageSizeExceededError` | Message or batch too large | Reduce payload. Premium supports individual messages up to 100MB. Batch limit is computed from max message size on the client, so batches can also be impacted |

## Enable Logging

```python
import logging, sys

handler = logging.StreamHandler(stream=sys.stdout)
handler.setFormatter(logging.Formatter("%(asctime)s | %(threadName)s | %(levelname)s | %(name)s | %(message)s"))
logger = logging.getLogger('azure.servicebus')
logger.setLevel(logging.DEBUG)
logger.addHandler(handler)

# Enable AMQP frame tracing
from azure.servicebus import ServiceBusClient
client = ServiceBusClient(..., logging_enable=True)
```

## AutoLockRenewer

```python
from azure.servicebus import AutoLockRenewer

renewer = AutoLockRenewer()
with receiver:
    for message in receiver.receive_messages(max_message_count=10):
        renewer.register(receiver, message, max_lock_renewal_duration=300)
        # process message
        receiver.complete_message(message)
```

## Key Issues

- **Mixing sync/async**: Don't use `time.sleep()` in async code; use `await asyncio.sleep()`.
- **Dead letter debugging**: Use `sub_queue=ServiceBusSubQueue.DEAD_LETTER` to inspect `dead_letter_reason` and `dead_letter_error_description`.
- **Always close clients**: Use `with` statement or call `close()` to avoid connection leaks.
