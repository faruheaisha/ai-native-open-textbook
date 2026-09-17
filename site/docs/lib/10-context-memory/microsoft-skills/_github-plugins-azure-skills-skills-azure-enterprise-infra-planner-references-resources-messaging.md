---
title: "Messaging Resources"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-enterprise-infra-planner/references/resources/messaging.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-enterprise-infra-planner/references/resources/messaging.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-enterprise-infra-planner/references/resources/messaging.md"
sourceSha256: "5d67a69c397c79257b4a66ae6493917cf5b8fa21e4659a6bf07b3bf020bc842a"
pageSha256: "5d67a69c397c79257b4a66ae6493917cf5b8fa21e4659a6bf07b3bf020bc842a"
contentMode: "local-full"
zh: ""
---

# Messaging Resources

| Resource | ARM Type | API Version | CAF Prefix | Naming Scope | Region |
|----------|----------|-------------|------------|--------------|--------|
| Event Grid Topic | `Microsoft.EventGrid/topics` | `2025-02-15` | `evgt` | Region | Mainstream |
| Event Hub | `Microsoft.EventHub/namespaces` | `2024-01-01` | `evhns` | Global | Foundational |
| Service Bus | `Microsoft.ServiceBus/namespaces` | `2024-01-01` | `sbns` | Global | Foundational |

## Documentation

| Resource | Bicep Reference | Service Overview | Naming Rules | Additional |
|----------|----------------|------------------|--------------|------------|
| Event Grid Topic | [2025-02-15](https://learn.microsoft.com/azure/templates/microsoft.eventgrid/topics?pivots=deployment-language-bicep) | [Event Grid overview](https://learn.microsoft.com/azure/event-grid/overview) | [Naming rules](https://learn.microsoft.com/azure/azure-resource-manager/management/resource-name-rules#microsofteventgrid) | [Security and auth](https://learn.microsoft.com/azure/event-grid/security-authentication) |
| Event Hub | [2024-01-01](https://learn.microsoft.com/azure/templates/microsoft.eventhub/namespaces?pivots=deployment-language-bicep) | [Event Hubs overview](https://learn.microsoft.com/azure/event-hubs/event-hubs-about) | [Naming rules](https://learn.microsoft.com/azure/azure-resource-manager/management/resource-name-rules#microsofteventhub) | [Event Hubs tiers](https://learn.microsoft.com/azure/event-hubs/event-hubs-quotas) |
| Service Bus | [2024-01-01](https://learn.microsoft.com/azure/templates/microsoft.servicebus/namespaces?pivots=deployment-language-bicep) | [Service Bus overview](https://learn.microsoft.com/azure/service-bus-messaging/service-bus-messaging-overview) | [Naming rules](https://learn.microsoft.com/azure/azure-resource-manager/management/resource-name-rules#microsoftservicebus) | [Service Bus tiers](https://learn.microsoft.com/azure/service-bus-messaging/service-bus-premium-messaging) |
