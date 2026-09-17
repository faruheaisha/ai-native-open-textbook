---
title: "Azure Monitor OpenTelemetry Exporter — Python SDK Quick Reference"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/appinsights-instrumentation/references/sdk/azure-monitor-opentelemetry-exporter-py.md"
sourceRel: ".github/plugins/azure-skills/skills/appinsights-instrumentation/references/sdk/azure-monitor-opentelemetry-exporter-py.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/appinsights-instrumentation/references/sdk/azure-monitor-opentelemetry-exporter-py.md"
sourceSha256: "4394ed04bcc4c99bc5f584fdccbdd08592c07d14ebebe37dee56488f457cbc1e"
pageSha256: "4394ed04bcc4c99bc5f584fdccbdd08592c07d14ebebe37dee56488f457cbc1e"
contentMode: "local-full"
zh: ""
---

# Azure Monitor OpenTelemetry Exporter — Python SDK Quick Reference

> Condensed from **azure-monitor-opentelemetry-exporter-py**. Full patterns
> (metric exporter, log exporter, offline storage, sovereign clouds)
> in the **azure-monitor-opentelemetry-exporter-py** plugin skill if installed.

## Install
```bash
pip install azure-monitor-opentelemetry-exporter
```

## Quick Start
```python
from azure.monitor.opentelemetry.exporter import AzureMonitorTraceExporter
exporter = AzureMonitorTraceExporter()  # reads APPLICATIONINSIGHTS_CONNECTION_STRING
```

## Best Practices
- Use BatchSpanProcessor for production (not SimpleSpanProcessor)
- Use ApplicationInsightsSampler for consistent sampling across services
- Enable offline storage for reliability in production
- Use AAD authentication instead of instrumentation keys
- Set export intervals appropriate for your workload
- Use the distro (azure-monitor-opentelemetry) unless you need custom pipelines
