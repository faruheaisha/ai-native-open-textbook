---
title: "Azure Monitor OpenTelemetry — TypeScript SDK Quick Reference"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/appinsights-instrumentation/references/sdk/azure-monitor-opentelemetry-ts.md"
sourceRel: ".github/plugins/azure-skills/skills/appinsights-instrumentation/references/sdk/azure-monitor-opentelemetry-ts.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/appinsights-instrumentation/references/sdk/azure-monitor-opentelemetry-ts.md"
sourceSha256: "648599ce299edc3c765f4fc8daa356b9e90f71026a42682cff5da39641cae487"
pageSha256: "648599ce299edc3c765f4fc8daa356b9e90f71026a42682cff5da39641cae487"
contentMode: "local-full"
zh: ""
---

# Azure Monitor OpenTelemetry — TypeScript SDK Quick Reference

> Condensed from **azure-monitor-opentelemetry-ts**. Full patterns
> (ESM loader, custom span processors, manual exporters, live metrics)
> in the **azure-monitor-opentelemetry-ts** plugin skill if installed.

## Install
npm install @azure/monitor-opentelemetry

## Quick Start
```typescript
import { useAzureMonitor } from "@azure/monitor-opentelemetry";
useAzureMonitor({
  azureMonitorExporterOptions: {
    connectionString: process.env.APPLICATIONINSIGHTS_CONNECTION_STRING
  }
});
```

## Best Practices
- Call useAzureMonitor() first — before importing other modules
- Use ESM loader for ESM projects — `--import @azure/monitor-opentelemetry/loader`
- Enable offline storage for reliable telemetry in disconnected scenarios
- Set sampling ratio for high-traffic applications
- Add custom dimensions — use span processors for enrichment
- Graceful shutdown — call shutdownAzureMonitor() to flush telemetry
