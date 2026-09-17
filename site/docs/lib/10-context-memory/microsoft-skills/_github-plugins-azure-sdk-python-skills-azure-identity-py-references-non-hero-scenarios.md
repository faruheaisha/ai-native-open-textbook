---
title: "azure-identity-py non-hero scenarios"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/azure-identity-py/references/non-hero-scenarios.md"
sourceRel: ".github/plugins/azure-sdk-python/skills/azure-identity-py/references/non-hero-scenarios.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-python/skills/azure-identity-py/references/non-hero-scenarios.md"
sourceSha256: "3c3fdd62c8a3bc43e71b7bd4010a51d8d2809b5458eb898426523e28466bbdd1"
pageSha256: "3c3fdd62c8a3bc43e71b7bd4010a51d8d2809b5458eb898426523e28466bbdd1"
contentMode: "local-full"
zh: ""
---

# azure-identity-py non-hero scenarios

These scenarios are intentionally separate from hero flows in `SKILL.md`.
They cover secondary/advanced patterns typically used after the primary end-to-end path is working.

## Async Credentials

Async credentials are in `azure.identity.aio`. Always close them or use `async with`:

```python
from azure.identity.aio import DefaultAzureCredential
from azure.storage.blob.aio import BlobServiceClient

async def main():
    # Preferred: use async context manager for both credential and client
    async with DefaultAzureCredential() as credential:
        async with BlobServiceClient(
            account_url="https://<account>.blob.core.windows.net",
            credential=credential,
        ) as client:
            # ... async operations
            pass
```

> The async `get_bearer_token_provider` is at `azure.identity.aio.get_bearer_token_provider`.

## Sovereign Clouds

Use `AzureAuthorityHosts` or the `AZURE_AUTHORITY_HOST` env var:

```python
from azure.identity import DefaultAzureCredential, AzureAuthorityHosts

# Azure Government
credential = DefaultAzureCredential(authority=AzureAuthorityHosts.AZURE_GOVERNMENT)

# Azure China
credential = DefaultAzureCredential(authority=AzureAuthorityHosts.AZURE_CHINA)
```

| Constant | Authority |
|----------|-----------|
| `AzureAuthorityHosts.AZURE_PUBLIC_CLOUD` | `login.microsoftonline.com` (default) |
| `AzureAuthorityHosts.AZURE_GOVERNMENT` | `login.microsoftonline.us` |
| `AzureAuthorityHosts.AZURE_CHINA` | `login.chinacloudapi.cn` |

## Persistent Token Caching

Opt-in disk-based caching with `TokenCachePersistenceOptions`:

```python
from azure.identity import DefaultAzureCredential, TokenCachePersistenceOptions

credential = DefaultAzureCredential(
    cache_persistence_options=TokenCachePersistenceOptions()
)

# Allow unencrypted fallback (NOT recommended for production)
credential = DefaultAzureCredential(
    cache_persistence_options=TokenCachePersistenceOptions(allow_unencrypted_storage=True)
)
```

Storage: Windows (DPAPI), macOS (Keychain), Linux (Keyring).

## Multi-Tenant Support

Allow token acquisition for additional tenants beyond the configured one:

```python
from azure.identity import ClientSecretCredential

credential = ClientSecretCredential(
