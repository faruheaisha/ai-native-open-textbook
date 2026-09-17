---
title: "Azure Monitor OpenTelemetry — Python SDK Quick Reference"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/appinsights-instrumentation/references/sdk/azure-monitor-opentelemetry-py.md"
sourceRel: ".github/plugins/azure-skills/skills/appinsights-instrumentation/references/sdk/azure-monitor-opentelemetry-py.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/appinsights-instrumentation/references/sdk/azure-monitor-opentelemetry-py.md"
sourceSha256: "2d8cab0440063297890e686c2f1cd58c3a21dc291937858abc915fb4a5740977"
pageSha256: "2d8cab0440063297890e686c2f1cd58c3a21dc291937858abc915fb4a5740977"
contentMode: "local-full"
zh: ""
---

# Azure Monitor OpenTelemetry — Python SDK Quick Reference

> Condensed from **azure-monitor-opentelemetry-py**. Full patterns
> (Flask/Django/FastAPI, custom metrics, sampling, live metrics)
> in the **azure-monitor-opentelemetry-py** plugin skill if installed.

## Install
```bash
pip install azure-monitor-opentelemetry
```

## Quick Start
```python
from azure.monitor.opentelemetry import configure_azure_monitor
configure_azure_monitor()
```

## Best Practices
- Call configure_azure_monitor() early — before importing instrumented libraries
- Use environment variables for connection string in production
- Set cloud role name for multi-service Application Map
- Enable sampling in high-traffic applications
- Use structured logging for better log analytics queries
- Add custom attributes to spans for better debugging
- Use AAD authentication for production workloads
