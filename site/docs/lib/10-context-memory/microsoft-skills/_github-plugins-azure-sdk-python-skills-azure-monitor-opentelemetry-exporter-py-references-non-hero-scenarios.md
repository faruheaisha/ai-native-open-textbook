---
title: "azure-monitor-opentelemetry-exporter-py non-hero scenarios"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/azure-monitor-opentelemetry-exporter-py/references/non-hero-scenarios.md"
sourceRel: ".github/plugins/azure-sdk-python/skills/azure-monitor-opentelemetry-exporter-py/references/non-hero-scenarios.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-python/skills/azure-monitor-opentelemetry-exporter-py/references/non-hero-scenarios.md"
sourceSha256: "fc7c9da2853fc25553349b315730b25f0af29bd7f55d66c0e28a7610947a0f27"
pageSha256: "fc7c9da2853fc25553349b315730b25f0af29bd7f55d66c0e28a7610947a0f27"
contentMode: "local-full"
zh: ""
---

# azure-monitor-opentelemetry-exporter-py non-hero scenarios

These scenarios are intentionally separate from hero flows in `SKILL.md`.
They cover secondary/advanced patterns typically used after the primary end-to-end path is working.

## Azure AD Authentication

```python
from azure.identity import DefaultAzureCredential, ManagedIdentityCredential
from azure.monitor.opentelemetry.exporter import AzureMonitorTraceExporter

# Local dev: DefaultAzureCredential. In production, set AZURE_TOKEN_CREDENTIALS=prod or use a specific credential.
credential = DefaultAzureCredential()
# Or use a specific credential directly in production:
# See https://learn.microsoft.com/python/api/overview/azure/identity-readme?view=azure-python#credential-classes
# credential = ManagedIdentityCredential()

exporter = AzureMonitorTraceExporter(
    credential=credential
)
```

## Sampling

Use `ApplicationInsightsSampler` for consistent sampling:

```python
from opentelemetry import trace
from opentelemetry.sdk.trace import TracerProvider
from azure.monitor.opentelemetry.exporter import ApplicationInsightsSampler

# Sample 10% of traces
sampler = ApplicationInsightsSampler(sampling_ratio=0.1)

trace.set_tracer_provider(TracerProvider(sampler=sampler))
```

## Offline Storage

Configure offline storage for retry:

```python
from azure.identity import DefaultAzureCredential
from azure.monitor.opentelemetry.exporter import AzureMonitorTraceExporter

exporter = AzureMonitorTraceExporter(
    credential=DefaultAzureCredential(),
    storage_directory="/path/to/storage",  # Custom storage path
    disable_offline_storage=False  # Enable retry (default)
)
```

## Disable Offline Storage

```python
exporter = AzureMonitorTraceExporter(
    credential=DefaultAzureCredential(),
    disable_offline_storage=True  # No retry on failure
)
```

## Sovereign Clouds

```python
from azure.identity import AzureAuthorityHosts, DefaultAzureCredential
from azure.monitor.opentelemetry.exporter import AzureMonitorTraceExporter

# Azure Government
credential = DefaultAzureCredential(authority=AzureAuthorityHosts.AZURE_GOVERNMENT)
exporter = AzureMonitorTraceExporter(
    connection_string="InstrumentationKey=xxx;IngestionEndpoint=https://xxx.in.applicationinsights.azure.us/",
    credential=credential
)
```

## Exporter Types

| Exporter | Telemetry Type | Application Insights Table |
|----------|---------------|---------------------------|
| `AzureMonitorTraceExporter` | Traces/Spans | requests, dependencies, exceptions |
| `AzureMonitorMetricExporter` | Metrics | customMetrics, performanceCounters |
| `AzureMonitorLogExporter` | Logs | traces, customEvents |

## Configuration Options

| Parameter | Description | Default |
|-----------|-------------|---------|
| `connection_string` | Application Insights connection string | From env var |
| `credential` | Azure credential for AAD auth | None |
| `disable_offline_storage` | Disable retry storage | False |
| `storage_directory` | Custom storage path | Temp directory |
