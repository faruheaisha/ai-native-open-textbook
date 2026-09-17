---
title: "azure-monitor-ingestion-py non-hero scenarios"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/azure-monitor-ingestion-py/references/non-hero-scenarios.md"
sourceRel: ".github/plugins/azure-sdk-python/skills/azure-monitor-ingestion-py/references/non-hero-scenarios.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-python/skills/azure-monitor-ingestion-py/references/non-hero-scenarios.md"
sourceSha256: "6787e17dc0f14a370104bd588dc9158c55d1021070587c2c44ffd0d7eeaee55e"
pageSha256: "6787e17dc0f14a370104bd588dc9158c55d1021070587c2c44ffd0d7eeaee55e"
contentMode: "local-full"
zh: ""
---

# azure-monitor-ingestion-py non-hero scenarios

These scenarios are intentionally separate from hero flows in `SKILL.md`.
They cover secondary/advanced patterns typically used after the primary end-to-end path is working.

## Async Client

```python
import asyncio
from azure.monitor.ingestion.aio import LogsIngestionClient
from azure.identity.aio import DefaultAzureCredential

async def upload_logs():
    async with DefaultAzureCredential() as credential:
        async with LogsIngestionClient(
            endpoint=endpoint,
            credential=credential
        ) as client:
            await client.upload(
                rule_id=rule_id,
                stream_name=stream_name,
                logs=logs
            )

asyncio.run(upload_logs())
```

## Sovereign Clouds

```python
from azure.identity import AzureAuthorityHosts, DefaultAzureCredential
from azure.monitor.ingestion import LogsIngestionClient

# Azure Government
credential = DefaultAzureCredential(authority=AzureAuthorityHosts.AZURE_GOVERNMENT)
with LogsIngestionClient(
    endpoint="https://example.ingest.monitor.azure.us",
    credential=credential,
    credential_scopes=["https://monitor.azure.us/.default"]
) as client:
    # client.upload(...)
    ...
```

## Batching Behavior

The SDK automatically:
- Splits logs into chunks of 1MB or less
- Compresses each chunk with gzip
- Uploads chunks in parallel

No manual batching needed for large log sets.

## Client Types

| Client | Purpose |
|--------|---------|
| `LogsIngestionClient` | Sync client for uploading logs |
| `LogsIngestionClient` (aio) | Async client for uploading logs |

## Key Concepts

| Concept | Description |
|---------|-------------|
| **DCE** | Data Collection Endpoint — ingestion URL |
| **DCR** | Data Collection Rule — defines schema, transformations, destination |
| **Stream** | Named data flow within a DCR |
| **Custom Table** | Target table in Log Analytics (ends with `_CL`) |

## DCR Stream Name Format

Stream names follow patterns:
- `Custom-<TableName>_CL` — For custom tables
- `Microsoft-<TableName>` — For built-in tables
