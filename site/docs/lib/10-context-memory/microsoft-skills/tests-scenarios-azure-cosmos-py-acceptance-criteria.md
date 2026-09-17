---
title: "Azure Cosmos DB SDK Acceptance Criteria"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/tests/scenarios/azure-cosmos-py/acceptance-criteria.md"
sourceRel: "tests/scenarios/azure-cosmos-py/acceptance-criteria.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/tests/scenarios/azure-cosmos-py/acceptance-criteria.md"
sourceSha256: "d46de8a9bea8ad55c269caf6367f3f5914548a479a89d6237ef80c3f69ac9794"
pageSha256: "d46de8a9bea8ad55c269caf6367f3f5914548a479a89d6237ef80c3f69ac9794"
contentMode: "local-full"
zh: ""
---

# Azure Cosmos DB SDK Acceptance Criteria

**SDK**: `azure-cosmos`
**Repository**: https://github.com/Azure/azure-sdk-for-python
**Commit**: `5c5d6eb014da472e71937aceddbf2f19fdb9aa40`
**Purpose**: Skill testing acceptance criteria for validating generated code correctness

---

## 1. Correct Import Patterns

### 1.1 Client Imports

#### ✅ CORRECT: Sync Client
```python
from azure.cosmos import CosmosClient, PartitionKey
from azure.identity import DefaultAzureCredential
```

#### ✅ CORRECT: Async Client
```python
from azure.cosmos.aio import CosmosClient
from azure.identity.aio import DefaultAzureCredential
```

#### ✅ CORRECT: Exceptions (Optional)
```python
from azure.cosmos import exceptions
```

### 1.2 Anti-Patterns (ERRORS)

#### ❌ INCORRECT: Wrong module for identity
```python
# WRONG - DefaultAzureCredential is in azure.identity
from azure.cosmos import DefaultAzureCredential
```

#### ❌ INCORRECT: Wrong module for PartitionKey
```python
# WRONG - PartitionKey is not in azure.cosmos.aio
from azure.cosmos.aio import PartitionKey
```

---

## 2. Authentication Patterns

### 2.1 ✅ CORRECT: DefaultAzureCredential (AAD)
```python
import os
from azure.cosmos import CosmosClient
from azure.identity import DefaultAzureCredential

credential = DefaultAzureCredential()
client = CosmosClient(
    url=os.environ["ACCOUNT_URI"],
    credential=credential,
)
```

### 2.2 ✅ CORRECT: Connection String
```python
import os
from azure.cosmos import CosmosClient

client = CosmosClient.from_connection_string(
    conn_str=os.environ["AZURE_COSMOS_CONNECTIONSTRING"],
)
```

### 2.3 Anti-Patterns (ERRORS)

#### ❌ INCORRECT: Passing connection string as URL
```python
# WRONG - conn string is not the account URL
client = CosmosClient(
    url=os.environ["AZURE_COSMOS_CONNECTIONSTRING"],
    credential=os.environ["ACCOUNT_KEY"],
)
```

#### ❌ INCORRECT: Hardcoded credentials
```python
# WRONG - do not hardcode secrets
client = CosmosClient(
    url="https://my-account.documents.azure.com:443/",
