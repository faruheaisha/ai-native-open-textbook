---
title: "Blob Storage — Python SDK Quick Reference"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-storage/references/sdk/azure-storage-blob-py.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-storage/references/sdk/azure-storage-blob-py.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-storage/references/sdk/azure-storage-blob-py.md"
sourceSha256: "afdd86c5b3e59452e36819195f578ee47207c9f4fd639e047675ef95cbd903d8"
pageSha256: "afdd86c5b3e59452e36819195f578ee47207c9f4fd639e047675ef95cbd903d8"
contentMode: "local-full"
zh: ""
---

# Blob Storage — Python SDK Quick Reference

> Condensed from **azure-storage-blob-py**. Full patterns (SAS tokens,
> async client, performance tuning, blob properties/metadata)
> in the **azure-storage-blob-py** plugin skill if installed.

## Install
pip install azure-storage-blob azure-identity

## Quick Start
```python
from azure.storage.blob import BlobServiceClient
from azure.identity import DefaultAzureCredential
blob_service_client = BlobServiceClient("https://<account>.blob.core.windows.net", DefaultAzureCredential())
```

## Best Practices
- Use DefaultAzureCredential for **local development only** — in production, use ManagedIdentityCredential. See [auth-best-practices.md](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-storage/references/auth-best-practices.md)
- Use context managers for async clients
- Set `overwrite=True` explicitly when re-uploading
- Use `max_concurrency` for large file transfers
- Prefer `readinto()` over `readall()` for memory efficiency
- Use `walk_blobs()` for hierarchical listing
- Set appropriate content types for web-served blobs
