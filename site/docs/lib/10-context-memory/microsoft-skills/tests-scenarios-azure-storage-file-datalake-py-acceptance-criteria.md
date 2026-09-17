---
title: "Azure Storage File Data Lake SDK Acceptance Criteria"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/tests/scenarios/azure-storage-file-datalake-py/acceptance-criteria.md"
sourceRel: "tests/scenarios/azure-storage-file-datalake-py/acceptance-criteria.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/tests/scenarios/azure-storage-file-datalake-py/acceptance-criteria.md"
sourceSha256: "5156ac120e378e6b09f3c2753eabf26bd1b343569b1e352f4ad11a573810d1ef"
pageSha256: "5156ac120e378e6b09f3c2753eabf26bd1b343569b1e352f4ad11a573810d1ef"
contentMode: "local-full"
zh: ""
---

# Azure Storage File Data Lake SDK Acceptance Criteria

**SDK**: `azure-storage-file-datalake`
**Repository**: https://github.com/Azure/azure-sdk-for-python
**Commit**: `main`
**Purpose**: Skill testing acceptance criteria for validating generated code correctness

---

## 1. Correct Import Patterns

### 1.1 Client Imports

#### ✅ CORRECT: Sync Clients
```python
from azure.storage.filedatalake import (
    DataLakeServiceClient,
    FileSystemClient,
    DataLakeDirectoryClient,
    DataLakeFileClient,
)
from azure.identity import DefaultAzureCredential
```

#### ✅ CORRECT: Async Clients
```python
from azure.storage.filedatalake.aio import DataLakeServiceClient
from azure.identity.aio import DefaultAzureCredential
```

### 1.2 Anti-Patterns (ERRORS)

#### ❌ INCORRECT: Importing from Blob SDK
```python
# WRONG - Data Lake Gen2 uses filedatalake, not blob
from azure.storage.blob import BlobServiceClient
```

#### ❌ INCORRECT: Mixing sync and async imports
```python
# WRONG - async client with sync credential
from azure.storage.filedatalake.aio import DataLakeServiceClient
from azure.identity import DefaultAzureCredential
```

---

## 2. Authentication Patterns

### ✅ CORRECT: DefaultAzureCredential with DFS endpoint
```python
import os
from azure.identity import DefaultAzureCredential
from azure.storage.filedatalake import DataLakeServiceClient

account_url = os.environ["AZURE_STORAGE_ACCOUNT_URL"]
credential = DefaultAzureCredential()

service_client = DataLakeServiceClient(
    account_url=account_url,
    credential=credential,
)
```

### ❌ INCORRECT: Hardcoded keys or connection strings
```python
# WRONG - avoid account keys/connection strings in skill guidance
service_client = DataLakeServiceClient(
    account_url="https://myaccount.dfs.core.windows.net",
