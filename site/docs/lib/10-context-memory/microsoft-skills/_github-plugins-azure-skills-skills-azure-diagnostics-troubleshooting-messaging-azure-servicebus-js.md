---
title: "Azure Service Bus SDK — JavaScript"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-diagnostics/troubleshooting/messaging/azure-servicebus-js.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-diagnostics/troubleshooting/messaging/azure-servicebus-js.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-diagnostics/troubleshooting/messaging/azure-servicebus-js.md"
sourceSha256: "ef4131010dbaa59fea9dd9c5b6b6a4d866e83d375fd4d920c79d25ccadf0e16b"
pageSha256: "ef4131010dbaa59fea9dd9c5b6b6a4d866e83d375fd4d920c79d25ccadf0e16b"
contentMode: "local-full"
zh: ""
---

# Azure Service Bus SDK — JavaScript

Package: `@azure/service-bus` | [README](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicebus/service-bus/) | [Full Troubleshooting Guide](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicebus/service-bus/TROUBLESHOOTING.md)

## Common Errors

| Error Code | Cause | Fix |
|------------|-------|-----|
| `ServiceTimeout` | Service didn't respond; or no unlocked sessions | Transient — auto-retried. Verify state if persists |
| `MessageLockLost` | Processing exceeded lock duration or link detached | Reduce processing time, ensure autolock renewal works |
| `SessionLockLost` | Session lock expired or link detached | Re-accept session, keep renewing lock |
| `QuotaExceeded` | Too many concurrent receives | Reduce receivers or use batch receives |
| `MessageSizeExceeded` | Message or batch > max size | Reduce payload. Premium supports individual messages up to 100MB. Batch limit is computed from max message size on the client, so batches can also be impacted |
| `UnauthorizedAccess` | Bad credentials | Verify connection string, SAS, or RBAC roles |

`ServiceBusError` fields: `code`, `retryable`, `name`, `info`, `address`.

## Enable Logging

```bash
# All SDK logs
export AZURE_LOG_LEVEL=verbose

# Or granular control
export DEBUG=azure*,rhea*

# Errors only
export DEBUG=azure:service-bus:error,azure:core-amqp:error,rhea-promise:error,rhea:events,rhea:frames,rhea:io,rhea:flow
```

Log to file:
```bash
node app.js > out.log 2>debug.log
```

## Key Issues

- **Socket exhaustion**: Treat `ServiceBusClient` as singleton. Each creates a new AMQP connection. Always call `close()`.
- **Lock lost before expiry**: Can happen on link detach (transient network issue or 10-min idle timeout). Not always due to processing time.
- **Batch receive returns fewer messages**: After first message arrives, receiver waits only 1s for additional messages. `maxWaitTimeInMs` controls wait for the *first* message only.
- **Autolock renewal not working**: Ensure system clock is accurate. Autolock relies on system time.
- **Batch size limits**: Batch limit is artificially computed on the client from the max message size sent by the service. Send large messages individually if batch creation fails.
- **WebSockets**: Pass `webSocketOptions` to `ServiceBusClient` constructor for port 443 connectivity.
- **Distributed tracing**: Experimental OpenTelemetry support via `@azure/opentelemetry-instrumentation-azure-sdk`.
