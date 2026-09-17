---
title: "azure-keyvault-py non-hero scenarios"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/azure-keyvault-py/references/non-hero-scenarios.md"
sourceRel: ".github/plugins/azure-sdk-python/skills/azure-keyvault-py/references/non-hero-scenarios.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-python/skills/azure-keyvault-py/references/non-hero-scenarios.md"
sourceSha256: "1f2fb0a97eff30cbabe4e5af479e9edba42dc7517480b1a82a147652c3071359"
pageSha256: "1f2fb0a97eff30cbabe4e5af479e9edba42dc7517480b1a82a147652c3071359"
contentMode: "local-full"
zh: ""
---

# azure-keyvault-py non-hero scenarios

These scenarios are intentionally separate from hero flows in `SKILL.md`.
They cover secondary/advanced patterns typically used after the primary end-to-end path is working.

## Async Clients

```python
from azure.identity.aio import DefaultAzureCredential
from azure.keyvault.secrets.aio import SecretClient

async def get_secret():
    async with DefaultAzureCredential() as credential:
        async with SecretClient(vault_url=vault_url, credential=credential) as client:
            secret = await client.get_secret("my-secret")
            print(f"Retrieved secret: {secret.name} (version: {secret.properties.version})")

import asyncio
asyncio.run(get_secret())
```

## Error Handling

```python
from azure.core.exceptions import ResourceNotFoundError, HttpResponseError

try:
    secret = client.get_secret("nonexistent")
except ResourceNotFoundError:
    print("Secret not found")
except HttpResponseError as e:
    if e.status_code == 403:
        print("Access denied - check RBAC permissions")
    raise
```
