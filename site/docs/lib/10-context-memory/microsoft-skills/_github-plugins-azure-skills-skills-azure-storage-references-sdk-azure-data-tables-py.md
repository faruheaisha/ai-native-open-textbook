---
title: "Tables — Python SDK Quick Reference"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-storage/references/sdk/azure-data-tables-py.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-storage/references/sdk/azure-data-tables-py.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-storage/references/sdk/azure-data-tables-py.md"
sourceSha256: "1f37fe3ba56ac8c1244461dc725fc1a8bc6d696073ff25cad52933be7be86049"
pageSha256: "1f37fe3ba56ac8c1244461dc725fc1a8bc6d696073ff25cad52933be7be86049"
contentMode: "local-full"
zh: ""
---

# Tables — Python SDK Quick Reference

> Condensed from **azure-data-tables-py**. Full patterns (batch operations,
> async client, typed entities, query parameters)
> in the **azure-data-tables-py** plugin skill if installed.

## Install
pip install azure-data-tables azure-identity

## Quick Start

> **Auth:** `DefaultAzureCredential` is for local development. See [auth-best-practices.md](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-storage/references/auth-best-practices.md) for production patterns.

```python
from azure.data.tables import TableClient
from azure.identity import DefaultAzureCredential
table_client = TableClient("https://<account>.table.core.windows.net", "mytable", DefaultAzureCredential())
```

## Best Practices
- Design partition keys for query patterns and even distribution
- Query within partitions whenever possible (cross-partition is expensive)
- Use batch operations for multiple entities in same partition
- Use `upsert_entity` for idempotent writes
- Use parameterized queries to prevent injection
- Keep entities small — max 1MB per entity
- Use async client for high-throughput scenarios
