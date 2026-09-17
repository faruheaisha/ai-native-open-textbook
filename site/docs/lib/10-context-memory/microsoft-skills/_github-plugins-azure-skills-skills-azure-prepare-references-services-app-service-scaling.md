---
title: "App Service Auto-scaling"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/services/app-service/scaling.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/services/app-service/scaling.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/services/app-service/scaling.md"
sourceSha256: "91e2e87645f54a134c995ffdf6a10eca5eb502149b7dfb33c98325f41be0eca1"
pageSha256: "91e2e87645f54a134c995ffdf6a10eca5eb502149b7dfb33c98325f41be0eca1"
contentMode: "local-full"
zh: ""
---

# App Service Auto-scaling

## Basic Auto-scale Configuration

```bicep
resource autoScale 'Microsoft.Insights/autoscalesettings@2022-10-01' = \{
  name: '$\{webApp.name\}-autoscale'
  location: location
  properties: \{
    targetResourceUri: appServicePlan.id
    enabled: true
    profiles: [
      \{
        name: 'Auto scale'
        capacity: \{
          minimum: '1'
          maximum: '10'
          default: '1'
        \}
        rules: [
          \{
            metricTrigger: \{
              metricName: 'CpuPercentage'
              metricResourceUri: appServicePlan.id
              timeGrain: 'PT1M'
              statistic: 'Average'
              timeWindow: 'PT5M'
              timeAggregation: 'Average'
              operator: 'GreaterThan'
              threshold: 70
            \}
            scaleAction: \{
              direction: 'Increase'
              type: 'ChangeCount'
              value: '1'
              cooldown: 'PT5M'
            \}
          \}
        ]
      \}
    ]
  \}
\}
```

## Common Metrics

| Metric | Use Case |
|--------|----------|
| CpuPercentage | CPU-bound workloads |
| MemoryPercentage | Memory-intensive apps |
| HttpQueueLength | Request queue depth |
| Requests | Request volume |

## Recommendations

| Workload | Min | Max | Metric |
|----------|-----|-----|--------|
| Production API | 2 | 10 | CPU + Requests |
| Dev/Test | 1 | 3 | CPU |
| High-traffic | 3 | 20 | HTTP Queue |

## SKU Requirements

Auto-scaling requires **Standard (S1+)** or **Premium** tier.
