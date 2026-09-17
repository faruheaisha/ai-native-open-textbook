---
title: "Cosmos DB Recipe"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/services/functions/templates/recipes/cosmosdb/README.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/services/functions/templates/recipes/cosmosdb/README.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/services/functions/templates/recipes/cosmosdb/README.md"
sourceSha256: "fea276c87fe8633d3de029e53edffab66ef119bbfbcfdf93e052684c4a165192"
pageSha256: "fea276c87fe8633d3de029e53edffab66ef119bbfbcfdf93e052684c4a165192"
contentMode: "local-full"
zh: ""
---

# Cosmos DB Recipe

Cosmos DB change feed trigger with managed identity authentication.

## Template Selection

Resource filter: `cosmos`  
Discover templates via MCP or CDN manifest where `resource == "cosmos"` and `language` matches user request.

## Troubleshooting

### "Forbidden" on Data Operations

**Cause:** Cosmos DB uses **two separate RBAC systems** — Azure RBAC (control plane) and Cosmos SQL RBAC via `sqlRoleAssignments` (data plane). The MCP template configures both, but if the SQL role assignment is missing, data reads/writes will fail even if Azure RBAC is correctly assigned.

**Solution:** Verify the `sqlRoleAssignments` resource exists in the Bicep/Terraform output. Check the function app has the `Cosmos DB Built-in Data Contributor` SQL role.

### UAMI Connection Issues

**Cause:** Missing managed identity credential settings.  
**Solution:** Ensure all three settings are present in app configuration:

- `COSMOS_CONNECTION__accountEndpoint`
- `COSMOS_CONNECTION__credential` (value: `managedidentity`)
- `COSMOS_CONNECTION__clientId`

See [Cosmos DB trigger connections](https://learn.microsoft.com/en-us/azure/azure-functions/functions-bindings-cosmosdb-v2-trigger#connections) for identity-based config — refer to the **"Connections"** section on that page for managed identity app settings.

## Eval

| Path | Description |
|------|-------------|
| [eval/summary.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-functions-templates-recipes-cosmosdb-eval-summary) | Evaluation summary |
| [eval/python.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-functions-templates-recipes-cosmosdb-eval-python) | Python evaluation results |
| [eval/typescript.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-functions-templates-recipes-cosmosdb-eval-typescript) | TypeScript evaluation results |
