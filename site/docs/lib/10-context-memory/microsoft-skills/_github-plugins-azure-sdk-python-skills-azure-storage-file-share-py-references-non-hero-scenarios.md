---
title: "azure-storage-file-share-py non-hero scenarios"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/azure-storage-file-share-py/references/non-hero-scenarios.md"
sourceRel: ".github/plugins/azure-sdk-python/skills/azure-storage-file-share-py/references/non-hero-scenarios.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-python/skills/azure-storage-file-share-py/references/non-hero-scenarios.md"
sourceSha256: "858429a6b5543b6487bc72f633bc080f97d06340c268c3681f5c4e18271ddd03"
pageSha256: "858429a6b5543b6487bc72f633bc080f97d06340c268c3681f5c4e18271ddd03"
contentMode: "local-full"
zh: ""
---

# azure-storage-file-share-py non-hero scenarios

These scenarios are intentionally separate from hero flows in `SKILL.md`.
They cover secondary/advanced patterns typically used after the primary end-to-end path is working.

## Snapshot Operations

### Create Snapshot

```python
snapshot = share_client.create_snapshot()
print(f"Snapshot: {snapshot['snapshot']}")
```

### Access Snapshot

```python
snapshot_client = service.get_share_client(
    "my-share",
    snapshot=snapshot["snapshot"]
)
```

## Async Client

```python
from azure.storage.fileshare.aio import ShareServiceClient
from azure.identity.aio import DefaultAzureCredential

async def upload_file():
    async with DefaultAzureCredential() as credential:
        async with ShareServiceClient(account_url, credential=credential) as service:
            share = service.get_share_client("my-share")
            file_client = share.get_file_client("test.txt")
            
            await file_client.upload_file("Hello!")
```

## Client Types

| Client | Purpose |
|--------|---------|
| `ShareServiceClient` | Account-level operations |
| `ShareClient` | Share operations |
| `ShareDirectoryClient` | Directory operations |
| `ShareFileClient` | File operations |
