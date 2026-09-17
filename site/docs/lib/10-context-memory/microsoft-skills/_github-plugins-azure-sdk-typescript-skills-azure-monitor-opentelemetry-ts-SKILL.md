---
title: "Azure Monitor OpenTelemetry SDK for TypeScript"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-typescript/skills/azure-monitor-opentelemetry-ts/SKILL.md"
sourceRel: ".github/plugins/azure-sdk-typescript/skills/azure-monitor-opentelemetry-ts/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-typescript/skills/azure-monitor-opentelemetry-ts/SKILL.md"
sourceSha256: "330aa4ea6110ffca30ef3a8e227d60fe6a3e44ee44b25560b1b5aade427dc476"
pageSha256: "330aa4ea6110ffca30ef3a8e227d60fe6a3e44ee44b25560b1b5aade427dc476"
contentMode: "local-full"
zh: ""
---

# Azure Monitor OpenTelemetry SDK for TypeScript

Auto-instrument Node.js applications with distributed tracing, metrics, and logs.

## Installation

```bash
# Distro (recommended - auto-instrumentation)
npm install @azure/monitor-opentelemetry

# Low-level exporters (custom OpenTelemetry setup)
npm install @azure/monitor-opentelemetry-exporter

# Custom logs ingestion
npm install @azure/monitor-ingestion
```

## Environment Variables

```bash
APPLICATIONINSIGHTS_CONNECTION_STRING=InstrumentationKey=...;IngestionEndpoint=...
AZURE_TOKEN_CREDENTIALS=prod # Required only if DefaultAzureCredential is used in production
```

## Quick Start (Auto-Instrumentation)

**IMPORTANT:** Call `useAzureMonitor()` BEFORE importing other modules.

```typescript
import { useAzureMonitor } from "@azure/monitor-opentelemetry";

useAzureMonitor({
  azureMonitorExporterOptions: {
    connectionString: process.env.APPLICATIONINSIGHTS_CONNECTION_STRING
  }
});

// Now import your application
import express from "express";
const app = express();
```

## ESM Support (Node.js 18.19+)

```bash
node --import @azure/monitor-opentelemetry/loader ./dist/index.js
```

**package.json:**
```json
{
  "scripts": {
    "start": "node --import @azure/monitor-opentelemetry/loader ./dist/index.js"
  }
}
```

## Full Configuration

```typescript
import { useAzureMonitor, AzureMonitorOpenTelemetryOptions } from "@azure/monitor-opentelemetry";
import { resourceFromAttributes } from "@opentelemetry/resources";

const options: AzureMonitorOpenTelemetryOptions = {
  azureMonitorExporterOptions: {
    connectionString: process.env.APPLICATIONINSIGHTS_CONNECTION_STRING,
    storageDirectory: "/path/to/offline/storage",
    disableOfflineStorage: false
  },
  
  // Sampling
  samplingRatio: 1.0,  // 0-1, percentage of traces
  
  // Features
  enableLiveMetrics: true,
  enableStandardMetrics: true,
  enablePerformanceCounters: true,
  
  // Instrumentation libraries
  instrumentationOptions: {
    azureSdk: { enabled: true },
    http: { enabled: true },
    mongoDb: { enabled: true },
    mySql: { enabled: true },
    postgreSql: { enabled: true },
    redis: { enabled: true },
    bunyan: { enabled: false },
    winston: { enabled: false }
  },
  
  // Custom resource
  resource: resourceFromAttributes({ "service.name": "my-service" })
};

useAzureMonitor(options);
```

## Custom Traces

```typescript
import { trace } from "@opentelemetry/api";

const tracer = trace.getTracer("my-tracer");

const span = tracer.startSpan("doWork");
try {
  span.setAttribute("component", "worker");
  span.setAttribute("operation.id", "42");
  span.addEvent("processing started");
  
  // Your work here
  
} catch (error) {
  span.recordException(error as Error);
  span.setStatus({ code: 2, message: (error as Error).message });
} finally {
  span.end();
}
```

## Custom Metrics

```typescript
import { metrics } from "@opentelemetry/api";

const meter = metrics.getMeter("my-meter");

// Counter
const counter = meter.createCounter("requests_total");
counter.add(1, { route: "/api/users", method: "GET" });

// Histogram
const histogram = meter.createHistogram("request_duration_ms");
histogram.record(150, { route: "/api/users" });

// Observable Gauge
const gauge = meter.createObservableGauge("active_connections");
gauge.addCallback((result) => {
  result.observe(getActiveConnections(), { pool: "main" });
});
```

## Manual Exporter Setup

### Trace Exporter

```typescript
import { AzureMonitorTraceExporter } from "@azure/monitor-opentelemetry-exporter";
import { NodeTracerProvider, BatchSpanProcessor } from "@opentelemetry/sdk-trace-node";

const exporter = new AzureMonitorTraceExporter({
  connectionString: process.env.APPLICATIONINSIGHTS_CONNECTION_STRING
});

const provider = new NodeTracerProvider({
  spanProcessors: [new BatchSpanProcessor(exporter)]
});

provider.register();
```

### Metric Exporter

```typescript
import { AzureMonitorMetricExporter } from "@azure/monitor-opentelemetry-exporter";
import { PeriodicExportingMetricReader, MeterProvider } from "@opentelemetry/sdk-metrics";
import { metrics } from "@opentelemetry/api";

const exporter = new AzureMonitorMetricExporter({
  connectionString: process.env.APPLICATIONINSIGHTS_CONNECTION_STRING
});

const meterProvider = new MeterProvider({
  readers: [new PeriodicExportingMetricReader({ exporter })]
});

metrics.setGlobalMeterProvider(meterProvider);
```

### Log Exporter

```typescript
import { AzureMonitorLogExporter } from "@azure/monitor-opentelemetry-exporter";
import { BatchLogRecordProcessor, LoggerProvider } from "@opentelemetry/sdk-logs";
import { logs } from "@opentelemetry/api-logs";

const exporter = new AzureMonitorLogExporter({
  connectionString: process.env.APPLICATIONINSIGHTS_CONNECTION_STRING
});

const loggerProvider = new LoggerProvider();
loggerProvider.addLogRecordProcessor(new BatchLogRecordProcessor(exporter));

logs.setGlobalLoggerProvider(loggerProvider);
```

## Custom Logs Ingestion

```typescript
import { DefaultAzureCredential, ManagedIdentityCredential } from "@azure/identity";
import { LogsIngestionClient, isAggregateLogsUploadError } from "@azure/monitor-ingestion";

const endpoint = "https://<dce>.ingest.monitor.azure.com";
