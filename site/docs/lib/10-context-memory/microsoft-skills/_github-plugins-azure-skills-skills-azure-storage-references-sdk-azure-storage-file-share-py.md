---
title: "File Shares — Python SDK Quick Reference"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-storage/references/sdk/azure-storage-file-share-py.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-storage/references/sdk/azure-storage-file-share-py.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-storage/references/sdk/azure-storage-file-share-py.md"
sourceSha256: "2ad59e6ec4fff052f565a63c4643fad85cd643e4de288d84ef0fc6249c7a521d"
pageSha256: "2ad59e6ec4fff052f565a63c4643fad85cd643e4de288d84ef0fc6249c7a521d"
contentMode: "local-full"
zh: ""
---

# File Shares — Python SDK Quick Reference

> Condensed from **azure-storage-file-share-py**. Full patterns (async client,
> snapshots, range operations, copy, SAS tokens)
> in the **azure-storage-file-share-py** plugin skill if installed.

## Install
pip install azure-storage-file-share azure-identity

## Quick Start

> **Auth:** `DefaultAzureCredential` is for local development. See [auth-best-practices.md](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-storage/references/auth-best-practices.md) for production patterns.

```python
from azure.storage.fileshare import ShareServiceClient
from azure.identity import DefaultAzureCredential
service = ShareServiceClient("https://<account>.file.core.windows.net", DefaultAzureCredential())
```

## Best Practices
- Use connection string for simplest setup
- Use Entra ID for production with RBAC
- Stream large files using chunks() to avoid memory issues
- Create snapshots before major changes
- Set quotas to prevent unexpected storage costs
- Use ranges for partial file updates
- Close async clients explicitly
