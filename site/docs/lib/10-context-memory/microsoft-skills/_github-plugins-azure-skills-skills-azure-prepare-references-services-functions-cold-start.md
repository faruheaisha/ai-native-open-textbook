---
title: "Azure Functions Cold Start Mitigation"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/services/functions/cold-start.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/services/functions/cold-start.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/services/functions/cold-start.md"
sourceSha256: "a6dce72939a459a90348fc01e04ffe375d042f6875ae942dd50d93cc168167a9"
pageSha256: "a6dce72939a459a90348fc01e04ffe375d042f6875ae942dd50d93cc168167a9"
contentMode: "local-full"
zh: ""
---

# Azure Functions Cold Start Mitigation

Cold starts occur when a function app must allocate infrastructure, load the runtime, and initialize your code before handling a request. Impact and mitigation options differ significantly by hosting plan.

## Cold Start Behavior by Plan

Cold-start duration depends on the runtime, dependencies, package size, and initialization work. Measure the latency of the deployed app instead of relying on a fixed estimate.

| Plan | Platform behavior | Primary mitigation |
|------|-------------------|--------------------|
| Consumption (Y1) | Scales to zero; cold starts are expected | Reduce dependencies and startup work, or move to another plan |
| Flex Consumption (FC1) | Improved scale-from-zero behavior | Configure always-ready instances per function or trigger group |
| Premium (EP1-EP3) | Keeps app-level always-ready instances and an HTTP prewarmed buffer | Configure the app's always-ready instance count |
| Dedicated | Host runs continuously when `Always On` is enabled | Enable `Always On` |
| Container Apps (Functions-on-ACA) | Scales to zero when `minReplicas` is `0` | Set `minReplicas` to `1` or higher |

## Mitigation Strategies

### Consumption Plan

Consumption has no built-in always-ready setting. Reduce the work required to specialize a new instance:

| Strategy | How | Trade-off |
|----------|-----|-----------|
| Reduce package size | Trim unused dependencies; use tree-shaking/bundling | Development effort |
| Optimize startup code | Lazy-load heavy modules; defer non-critical connections | Code changes required |

> 💡 **Tip:** A timer-based keep-alive isn't a cold-start guarantee and creates extra executions. If cold starts are a consistent problem, move to Flex Consumption or Premium. See [hosting-plans.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-functions-hosting-plans) for the comparison.

### Flex Consumption Plan

Configure always-ready instances for a function group with the dedicated CLI command (do not hand-edit the `functionAppConfig` ARM array — indexing into it by position can silently overwrite other always-ready groups):

```bash
# Set 1 always-ready instance for the "http" function group
az functionapp scale config always-ready set \
  -g $RG -n $APP \
  --settings http=1
```

#### Bicep — Always-Ready Configuration

```bicep
resource functionApp 'Microsoft.Web/sites@2024-04-01' = {
  name: appName
  location: location
  kind: 'functionapp,linux'
  properties: {
    serverFarmId: flexPlan.id
    functionAppConfig: {
      runtime: {
        name: 'node'
