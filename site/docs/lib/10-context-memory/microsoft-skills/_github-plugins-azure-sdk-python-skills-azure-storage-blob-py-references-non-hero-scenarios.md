---
title: "azure-storage-blob-py non-hero scenarios"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/azure-storage-blob-py/references/non-hero-scenarios.md"
sourceRel: ".github/plugins/azure-sdk-python/skills/azure-storage-blob-py/references/non-hero-scenarios.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-python/skills/azure-storage-blob-py/references/non-hero-scenarios.md"
sourceSha256: "b0ad5f98350ef38460ebda48b5ae2299b24a7b93dec149610ee5b10911533db6"
pageSha256: "b0ad5f98350ef38460ebda48b5ae2299b24a7b93dec149610ee5b10911533db6"
contentMode: "local-full"
zh: ""
---

# azure-storage-blob-py non-hero scenarios

These scenarios are intentionally separate from hero flows in `SKILL.md`.
They cover secondary/advanced patterns typically used after the primary end-to-end path is working.

## Blob Properties and Metadata

```python
# Get properties
properties = blob_client.get_blob_properties()
print(f"Size: {properties.size}")
print(f"Content-Type: {properties.content_settings.content_type}")
print(f"Last modified: {properties.last_modified}")

# Set metadata
blob_client.set_blob_metadata(metadata={"category": "logs", "year": "2024"})

# Set content type
from azure.storage.blob import ContentSettings
blob_client.set_http_headers(
    content_settings=ContentSettings(content_type="application/json")
)
```

## Async Client

```python
from azure.identity.aio import DefaultAzureCredential
from azure.storage.blob.aio import BlobServiceClient

async def upload_async():
    async with DefaultAzureCredential() as credential:
        async with BlobServiceClient(account_url, credential=credential) as client:
            blob_client = client.get_blob_client("mycontainer", "sample.txt")
            
            with open("./file.txt", "rb") as data:
                await blob_client.upload_blob(data, overwrite=True)

# Download async
async def download_async():
    async with DefaultAzureCredential() as credential:
        async with BlobServiceClient(account_url, credential=credential) as client:
            blob_client = client.get_blob_client("mycontainer", "sample.txt")

            stream = await blob_client.download_blob()
            data = await stream.readall()
```
