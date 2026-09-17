---
title: "Template Selection Guide"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/services/functions/templates/selection.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/services/functions/templates/selection.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/services/functions/templates/selection.md"
sourceSha256: "a7f0728345019efcea0019b357c33953b27e64c0ad19b694c368d93e443e339d"
pageSha256: "a7f0728345019efcea0019b357c33953b27e64c0ad19b694c368d93e443e339d"
contentMode: "local-full"
zh: ""
---

# Template Selection Guide

Map user intent to MCP template `resource` filter.

> **NEVER hardcode template names** — names can change. Always use `functions_template_get(language)` to discover available templates, then filter by `resource` field.

## Intent → Resource Mapping

| User Says | Code Indicators (existing projects) | Resource Filter | Recipe Reference |
|-----------|-------------------------------------|-----------------|------------------|
| "HTTP", "REST", "API", "webhook" | `HttpTrigger`, `@app.route`, `req: HttpRequest` | `http` | — |
| "timer", "schedule", "cron", "periodic" | `TimerTrigger`, `@app.schedule`, `TimerInfo` | `timer` | [recipes/timer/README.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-functions-templates-recipes-timer) |
| "Cosmos", "CosmosDB", "document DB" | `CosmosDBTrigger`, `@app.cosmos_db`, `cosmos_db_input` | `cosmos` | [recipes/cosmosdb/README.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-functions-templates-recipes-cosmosdb) |
| "Event Hub", "streaming", "events" | `EventHubTrigger`, `@app.event_hub`, `event_hub_output` | `eventhub` | [recipes/eventhubs/README.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-functions-templates-recipes-eventhubs) |
| "Service Bus", "queue", "message" | `ServiceBusTrigger`, `@app.service_bus_queue` | `servicebus` | [recipes/servicebus/README.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-functions-templates-recipes-servicebus) |
| "blob", "file", "storage trigger" | `BlobTrigger`, `@app.blob`, `blob_input`, `blob_output` | `blob` | [recipes/blob-eventgrid/README.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-functions-templates-recipes-blob-eventgrid) |
| "SQL", "database trigger" | `SqlTrigger`, `@app.sql`, `sql_input`, `SqlOutput` | `sql` | [recipes/sql/README.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-functions-templates-recipes-sql) |
| "MCP", "MCP server", "tools" | `McpToolTrigger`, `@app.mcp_tool`, `mcp` in project | `mcp` | [recipes/mcp/README.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-functions-templates-recipes-mcp) |
| "durable", "workflow", "orchestration" | `DurableOrchestrationTrigger`, `orchestrator`, `durable_functions` | `durable` | [recipes/durable/README.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-functions-templates-recipes-durable) |
| "AI", "agent", "chatbot", "OpenAI" | `openai`, `AzureOpenAI`, `langchain`, `semantic_kernel` | `http` | Scan description for "AI", "agent", "Copilot SDK" |
| **No specific trigger / intent unclear** | — | `http` (default) | — |

## Selection Algorithm

```
1. DISCOVER: functions_template_get(language) → template list
2. DETECT (existing code): Scan for code indicators above → map to resource
3. MATCH (new projects): Scan template descriptions for user intent
4. FILTER: resource == mapped_resource AND infrastructure == user_iac_choice
5. PREFER: AZD-enabled (infrastructure: "bicep" or "terraform")
6. SELECT: Template whose description best matches user intent
7. DEFAULT: If intent unclear or no trigger specified → use `http`
```

## Output: Working Function App

MCP templates return **complete, deployable projects** — each array entry has `\{ path, content \}`:

| Array | Contents | Action |
|-------|----------|--------|
| `functionFiles[]` | Function source code (triggers, bindings, business logic), infra and other files | Create directories from `path`, write `content` to each file |
| `projectFiles[]` | settings.json, host.json, dependencies files | Create directories from `path`, write `content` to each file |

> Write files from the array output above. NEVER hand-write Bicep/Terraform and use `azd init -t <template>`/`func init`/`func new` as fallback when composing multiple recipes and required templates are not found.

For deployment steps, see [README.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-functions-templates#step-5-deploy).

## Default Behavior

**When user intent is ambiguous or no specific trigger is mentioned**, default to HTTP:

- User says "create a function" with no trigger → HTTP
- User describes business logic without specifying trigger → HTTP
- Intent cannot be determined from context → HTTP

HTTP is the safest default because it's the most common trigger type and provides a simple request/response pattern that works for most use cases.

## IaC Selection

| User Says | Filter By |
|-----------|-----------|
| Nothing specified | `infrastructure: "bicep"` (default) |
| "terraform", "use terraform" | `infrastructure: "terraform"` |
| "bicep", "use bicep" | `infrastructure: "bicep"` |

## Non-AZD Fallback

If specific trigger/binding has no AZD template:

1. Use non-AZD template for **function code** only
2. Find related AZD template as **IaC reference**:

| Non-AZD Resource | Related AZD Reference |
|-----------------|----------------------|
| RabbitMQ, Kafka | EventHub AZD |
| SendGrid, Twilio, Webhook | HTTP AZD |
| IoT Hub | EventHub AZD |
