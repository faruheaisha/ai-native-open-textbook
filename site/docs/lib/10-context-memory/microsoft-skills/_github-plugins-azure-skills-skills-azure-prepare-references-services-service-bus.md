---
title: "Azure Service Bus"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/services/service-bus/README.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/services/service-bus/README.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/services/service-bus/README.md"
sourceSha256: "12f8f6b696c99c790d4f760baae40842fbc2330f557f15ce2db9d12fa1fd55ed"
pageSha256: "12f8f6b696c99c790d4f760baae40842fbc2330f557f15ce2db9d12fa1fd55ed"
contentMode: "local-full"
zh: ""
---

# Azure Service Bus

Enterprise messaging with queues and pub/sub topics.

## When to Use

- Reliable message delivery
- Pub/sub messaging patterns
- Message ordering requirements
- Dead-letter handling
- Transaction support
- Enterprise integration

## Required Supporting Resources

| Resource | Purpose |
|----------|---------|
| None required | Service Bus is self-contained |
| Key Vault | Store connection strings (legacy) |

## SKU Selection

| SKU | Features | Use Case |
|-----|----------|----------|
| Basic | Queues only, 256KB messages | Simple messaging |
| Standard | Topics, 256KB messages | Pub/sub patterns |
| Premium | 100MB messages, VNET, zones | Enterprise, high throughput |

## Environment Variables

### Managed Identity (Recommended)

| Variable | Value |
|----------|-------|
| `SERVICEBUS__fullyQualifiedNamespace` | `<namespace>.servicebus.windows.net` |
| `SERVICEBUS_NAMESPACE` | Namespace name (for SDK) |
| `SERVICEBUS_QUEUE` | Queue name |

**Required RBAC roles:**
- `Azure Service Bus Data Sender` (69a216fc-b8fb-44d8-bc22-1f3c2cd27a39) - for sending
- `Azure Service Bus Data Receiver` (4f6d3b9b-027b-4f4c-9142-0e5a2a2247e0) - for receiving

### Connection String (Legacy)

| Variable | Value |
|----------|-------|
| `SERVICEBUS_CONNECTION_STRING` | Connection string (Key Vault) |
| `SERVICEBUS_NAMESPACE` | Namespace name |
| `SERVICEBUS_QUEUE` | Queue name |

## References

- [Bicep Patterns](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-service-bus-bicep)
- [Messaging Patterns](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-service-bus-patterns)
