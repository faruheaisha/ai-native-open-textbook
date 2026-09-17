---
title: "Service Bus Recipe"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/services/functions/templates/recipes/servicebus/README.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/services/functions/templates/recipes/servicebus/README.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/services/functions/templates/recipes/servicebus/README.md"
sourceSha256: "730062bbe0b39a4ac3547c1b658929a81dbc7004539d0fa821588515ef3e71aa"
pageSha256: "730062bbe0b39a4ac3547c1b658929a81dbc7004539d0fa821588515ef3e71aa"
contentMode: "local-full"
zh: ""
---

# Service Bus Recipe

Service Bus queue/topic trigger with managed identity authentication.

## Template Selection

Resource filter: `servicebus`  
Discover templates via MCP tool or CDN manifest where `resource == "servicebus"` and `language` matches user request.

## Troubleshooting

### 500 Error on First Request

**Cause:** RBAC role assignment hasn't propagated to Service Bus data plane.  
**Solution:** Wait 30-60 seconds after provisioning, or restart the function app.

### "Unauthorized" or "Forbidden" Errors

**Cause:** Missing UAMI credential settings.  
**Solution:** Ensure all three settings are present in app configuration:

- `ServiceBusConnection__fullyQualifiedNamespace`
- `ServiceBusConnection__credential` (value: `managedidentity`)
- `ServiceBusConnection__clientId`

See [Service Bus trigger connections](https://learn.microsoft.com/en-us/azure/azure-functions/functions-bindings-service-bus-trigger#connections) for identity-based config — refer to the **"Connections"** section on that page for managed identity app settings.

## Eval

| Path | Description |
|------|-------------|
| [eval/summary.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-functions-templates-recipes-servicebus-eval-summary) | Evaluation summary |
| [eval/python.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-functions-templates-recipes-servicebus-eval-python) | Python evaluation results |
| [eval/typescript.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-functions-templates-recipes-servicebus-eval-typescript) | TypeScript evaluation results |
