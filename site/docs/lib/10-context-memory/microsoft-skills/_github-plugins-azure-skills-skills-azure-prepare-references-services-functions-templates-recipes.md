---
title: "Function Template Recipes"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/services/functions/templates/recipes/README.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/services/functions/templates/recipes/README.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/services/functions/templates/recipes/README.md"
sourceSha256: "41ca862d94cebea75561292b351d0c05531cd75ff832c4d12e94d901e8e19dc8"
pageSha256: "41ca862d94cebea75561292b351d0c05531cd75ff832c4d12e94d901e8e19dc8"
contentMode: "local-full"
zh: ""
---

# Function Template Recipes

Composable templates for Azure Functions integrations.

## Recipe Index

For intent-to-resource mapping and selection algorithm, see [selection.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-functions-templates-selection).

| Recipe | Resource |
|--------|----------|
| [cosmosdb](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-functions-templates-recipes-cosmosdb) | `cosmos` |
| [eventhubs](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-functions-templates-recipes-eventhubs) | `eventhub` |
| [servicebus](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-functions-templates-recipes-servicebus) | `servicebus` |
| [timer](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-functions-templates-recipes-timer) | `timer` |
| [durable](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-functions-templates-recipes-durable) | `durable` |
| [mcp](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-functions-templates-recipes-mcp) | `mcp` |
| [sql](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-functions-templates-recipes-sql) | `sql` |
| [blob-eventgrid](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-functions-templates-recipes-blob-eventgrid) | `blob` |

## Composition

See [composition.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-functions-templates-recipes-composition) for merging multiple templates.

## Common Patterns

| Pattern | Description |
|---------|-------------|
| [Error Handling](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-functions-templates-recipes-common-error-handling) | Try/catch + logging patterns |
| [Health Check](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-functions-templates-recipes-common-health-check) | Health endpoint for monitoring |
| [Node.js Entry Point](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-functions-templates-recipes-common-nodejs-entry-point) | `src/index.js` requirements |
| [.NET Entry Point](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-functions-templates-recipes-common-dotnet-entry-point) | `Program.cs` requirements |
