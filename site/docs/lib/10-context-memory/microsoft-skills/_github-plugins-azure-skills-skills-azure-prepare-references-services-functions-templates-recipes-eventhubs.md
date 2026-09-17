---
title: "Event Hubs Recipe"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/services/functions/templates/recipes/eventhubs/README.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/services/functions/templates/recipes/eventhubs/README.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/services/functions/templates/recipes/eventhubs/README.md"
sourceSha256: "56f448ad889d88167aa732233f4c2758509ea3249cada4109e7ccf8547b6257c"
pageSha256: "56f448ad889d88167aa732233f4c2758509ea3249cada4109e7ccf8547b6257c"
contentMode: "local-full"
zh: ""
---

# Event Hubs Recipe

Event Hubs streaming trigger with managed identity authentication.

## Template Selection

Resource filter: `eventhub`  
Discover templates via MCP or CDN manifest where `resource == "eventhub"` and `language` matches user request.

## Troubleshooting

### "Unauthorized" or "Forbidden" Errors

**Cause:** Missing UAMI credential settings for Event Hubs.  
**Solution:** Ensure all three settings are present in app configuration:

- `EventHubConnection__fullyQualifiedNamespace`
- `EventHubConnection__credential` (value: `managedidentity`)
- `EventHubConnection__clientId`

See [Event Hubs trigger connections](https://learn.microsoft.com/en-us/azure/azure-functions/functions-bindings-event-hubs-trigger#connections) for identity-based config — refer to the **"Connections"** section on that page for managed identity app settings.

### Events Not Arriving

**Cause:** Consumer group or checkpoint storage misconfigured.  
**Solution:** Verify the Event Hubs consumer group exists and the function has `Azure Event Hubs Data Receiver` role on the namespace.

## Eval

| Path | Description |
|------|-------------|
| [eval/summary.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-functions-templates-recipes-eventhubs-eval-summary) | Evaluation summary |
| [eval/python.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-functions-templates-recipes-eventhubs-eval-python) | Python evaluation results |
