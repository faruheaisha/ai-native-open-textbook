---
title: "Data Lake Storage Gen2 — Python SDK Quick Reference"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-storage/references/sdk/azure-storage-file-datalake-py.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-storage/references/sdk/azure-storage-file-datalake-py.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-storage/references/sdk/azure-storage-file-datalake-py.md"
sourceSha256: "46abbb1effec468c999844cf6e0188691d9fb160da47385a56ed7d1c7d63ca43"
pageSha256: "46abbb1effec468c999844cf6e0188691d9fb160da47385a56ed7d1c7d63ca43"
contentMode: "local-full"
zh: ""
---

# Data Lake Storage Gen2 — Python SDK Quick Reference

> Condensed from **azure-storage-file-datalake-py**. Full patterns (ACL management,
> async client, directory operations, range downloads)
> in the **azure-storage-file-datalake-py** plugin skill if installed.

## Install
pip install azure-storage-file-datalake azure-identity

## Quick Start

> **Auth:** `DefaultAzureCredential` is for local development. See [auth-best-practices.md](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-storage/references/auth-best-practices.md) for production patterns.

```python
from azure.storage.filedatalake import DataLakeServiceClient
from azure.identity import DefaultAzureCredential
service_client = DataLakeServiceClient("https://<account>.dfs.core.windows.net", DefaultAzureCredential())
```

## Best Practices
- Use hierarchical namespace for file system semantics
- Use `append_data` + `flush_data` for large file uploads
- Set ACLs at directory level and inherit to children
- Use async client for high-throughput scenarios
- Use `get_paths` with `recursive=True` for full directory listing
- Set metadata for custom file attributes
- Consider Blob API for simple object storage use cases

## Non-Obvious Patterns
```python
# Large file upload requires append + flush
offset = 0
for chunk in chunks:
	file_client.append_data(data=chunk, offset=offset, length=len(chunk))
	offset += len(chunk)
file_client.flush_data(offset)
```
