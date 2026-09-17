---
title: "Azure Messaging Troubleshooting"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-diagnostics/troubleshooting/messaging/README.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-diagnostics/troubleshooting/messaging/README.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-diagnostics/troubleshooting/messaging/README.md"
sourceSha256: "060a285a2fab6038e198261f9a6d2b6151707f8e0aa29951f08816bba0766d2c"
pageSha256: "060a285a2fab6038e198261f9a6d2b6151707f8e0aa29951f08816bba0766d2c"
contentMode: "local-full"
zh: ""
---

# Azure Messaging Troubleshooting

Diagnose and resolve issues with Azure Event Hubs and Service Bus SDKs.

## Routing

| Symptom | Guide |
|---------|-------|
| Connection failures, firewall, IP/VNet, WebSocket | [service-troubleshooting.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-diagnostics-troubleshooting-messaging-service-troubleshooting) |
| SDK-specific errors (see language below) | Language guide |

## SDK Troubleshooting by Language

- **Event Hubs**: [Python](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-diagnostics-troubleshooting-messaging-azure-eventhubs-py) | [Java](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-diagnostics-troubleshooting-messaging-azure-eventhubs-java) | [JS](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-diagnostics-troubleshooting-messaging-azure-eventhubs-js) | [.NET](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-diagnostics-troubleshooting-messaging-azure-eventhubs-dotnet)
- **Service Bus**: [Python](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-diagnostics-troubleshooting-messaging-azure-servicebus-py) | [Java](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-diagnostics-troubleshooting-messaging-azure-servicebus-java) | [JS](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-diagnostics-troubleshooting-messaging-azure-servicebus-js) | [.NET](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-diagnostics-troubleshooting-messaging-azure-servicebus-dotnet)

## Common Issues

| Issue | Category |
|-------|----------|
| AMQP link detach, idle timeout, connection inactive | [service-troubleshooting.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-diagnostics-troubleshooting-messaging-service-troubleshooting) |
| Message lock lost/expired, lock renewal failures | Language-specific SDK guide |
| Session lock errors, session receiver detach | Language-specific SDK guide |
| Duplicate events, checkpoint/offset reset | Language-specific SDK guide |
| Batch >1 MB rejected, partition key conflicts | [service-troubleshooting.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-diagnostics-troubleshooting-messaging-service-troubleshooting) |

## MCP Tools

| Tool | Use |
|------|-----|
| `mcp_azure_mcp_eventhubs` | List namespaces, hubs, consumer groups |
| `mcp_azure_mcp_servicebus` | List namespaces, queues, topics, subscriptions |
| `mcp_azure_mcp_monitor` | Query diagnostic logs with KQL |
| `mcp_azure_mcp_resourcehealth` | Check service health status |
| `mcp_azure_mcp_documentation` | Search Microsoft Learn for troubleshooting docs |
