---
title: "Azure Identity SDK Acceptance Criteria"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/tests/scenarios/azure-identity-py/acceptance-criteria.md"
sourceRel: "tests/scenarios/azure-identity-py/acceptance-criteria.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/tests/scenarios/azure-identity-py/acceptance-criteria.md"
sourceSha256: "7df3873d034705a122e34a332b8574ca1bdfa09ce6006e6d68059df6884868e1"
pageSha256: "7df3873d034705a122e34a332b8574ca1bdfa09ce6006e6d68059df6884868e1"
contentMode: "local-full"
zh: ""
---

# Azure Identity SDK Acceptance Criteria

**SDK**: `azure-identity`
**Repository**: https://github.com/Azure/azure-sdk-for-python/tree/main/sdk/identity/azure-identity
**Commit**: `main`
**Purpose**: Skill testing acceptance criteria for validating generated code correctness

---

## 1. Correct Import Patterns

### 1.1 ✅ CORRECT: Sync Credential Imports

```python
from azure.identity import (
    DefaultAzureCredential,
    ManagedIdentityCredential,
    ClientSecretCredential,
    ClientCertificateCredential,
    InteractiveBrowserCredential,
    ChainedTokenCredential,
    TokenCachePersistenceOptions,
    AzureCliCredential,
    WorkloadIdentityCredential,
    DeviceCodeCredential,
)
```

### 1.2 ✅ CORRECT: Async Credential Imports

```python
from azure.identity.aio import (
    DefaultAzureCredential,
    ManagedIdentityCredential,
    ClientSecretCredential,
    ClientCertificateCredential,
    InteractiveBrowserCredential,
    ChainedTokenCredential,
    AzureCliCredential,
    WorkloadIdentityCredential,
)
```

### 1.3 Anti-Patterns (ERRORS)

#### ❌ INCORRECT: Using sync credential in async code

```python
# WRONG - async code must use azure.identity.aio credentials
from azure.identity import DefaultAzureCredential
from azure.storage.blob.aio import BlobServiceClient

credential = DefaultAzureCredential()  # sync credential with async client
async with BlobServiceClient(account_url, credential=credential) as client:
    pass
```

#### ❌ INCORRECT: TokenCachePersistenceOptions is not in azure.identity.aio

```python
# WRONG - token cache options are only in azure.identity (not .aio)
from azure.identity.aio import TokenCachePersistenceOptions
```

---

## 2. DefaultAzureCredential

### 2.1 ✅ CORRECT: Basic DefaultAzureCredential

```python
from azure.identity import DefaultAzureCredential

credential = DefaultAzureCredential()
token = credential.get_token("https://management.azure.com/.default")
print(token.expires_on)
```

### 2.2 ✅ CORRECT: Customize DefaultAzureCredential

```python
from azure.identity import DefaultAzureCredential

credential = DefaultAzureCredential(
    exclude_environment_credential=True,
    exclude_shared_token_cache_credential=True,
    exclude_interactive_browser_credential=False,
