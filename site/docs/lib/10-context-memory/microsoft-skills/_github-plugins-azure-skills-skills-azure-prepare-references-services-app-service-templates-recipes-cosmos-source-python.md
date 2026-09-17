---
title: "Cosmos DB Recipe — Python — REFERENCE ONLY"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/services/app-service/templates/recipes/cosmos/source/python.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/services/app-service/templates/recipes/cosmos/source/python.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/services/app-service/templates/recipes/cosmos/source/python.md"
sourceSha256: "d5cb39c4a122cfd3668897e14b3d7381a9df90c203ce143968b64ee768c1449a"
pageSha256: "d5cb39c4a122cfd3668897e14b3d7381a9df90c203ce143968b64ee768c1449a"
contentMode: "local-full"
zh: ""
---

# Cosmos DB Recipe — Python — REFERENCE ONLY

## Cosmos SDK Setup

### Requirements

Add to `requirements.txt`:

```
azure-cosmos>=4.7
azure-identity
```

### Database Module

Create `cosmos_client.py`:

```python
import os
from azure.cosmos import CosmosClient
from azure.identity import DefaultAzureCredential

credential = DefaultAzureCredential()
client = CosmosClient(os.environ["COSMOS_ENDPOINT"], credential)
database = client.get_database_client(os.environ["COSMOS_DATABASE_NAME"])
container = database.get_container_client(os.environ["COSMOS_CONTAINER_NAME"])
```

### CRUD Endpoints

Add to `main.py`:

```python
from cosmos_client import container

@app.get("/api/items")
async def list_items():
    items = list(container.read_all_items())
    return items

@app.post("/api/items", status_code=201)
async def create_item(item: dict):
    return container.create_item(body=item)
```

## Files to Modify

| File | Action |
|------|--------|
| `cosmos_client.py` | Create — Cosmos client + container reference |
| `main.py` | Modify — add CRUD endpoints |
| `requirements.txt` | Modify — add azure-cosmos, azure-identity |
