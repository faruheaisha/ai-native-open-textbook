---
title: "Cosmos DB Recipe — Node.js — REFERENCE ONLY"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/services/app-service/templates/recipes/cosmos/source/nodejs.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/services/app-service/templates/recipes/cosmos/source/nodejs.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/services/app-service/templates/recipes/cosmos/source/nodejs.md"
sourceSha256: "3686483a82df65576e630ca6ff9467d0df55ac2c9078213ea188f58f24a98f8c"
pageSha256: "3686483a82df65576e630ca6ff9467d0df55ac2c9078213ea188f58f24a98f8c"
contentMode: "local-full"
zh: ""
---

# Cosmos DB Recipe — Node.js — REFERENCE ONLY

## Cosmos SDK Setup

### npm Packages

```bash
npm install @azure/cosmos @azure/identity
```

### Database Module

Create `src/cosmosClient.js`:

```javascript
const { CosmosClient } = require("@azure/cosmos");
const { DefaultAzureCredential } = require("@azure/identity");

const client = new CosmosClient({
  endpoint: process.env.COSMOS_ENDPOINT,
  aadCredentials: new DefaultAzureCredential(),
});

const container = client
  .database(process.env.COSMOS_DATABASE_NAME)
  .container(process.env.COSMOS_CONTAINER_NAME);

module.exports = { container };
```

### CRUD Endpoints

Add to `src/index.js`:

```javascript
const { container } = require("./cosmosClient");

app.get("/api/items", async (req, res) => {
  const { resources } = await container.items.readAll().fetchAll();
  res.json(resources);
});

app.post("/api/items", async (req, res) => {
  const { resource } = await container.items.create(req.body);
  res.status(201).json(resource);
});
```

## Files to Modify

| File | Action |
|------|--------|
| `src/cosmosClient.js` | Create — Cosmos client + container reference |
| `src/index.js` | Modify — add CRUD endpoints |
| `package.json` | Modify — add @azure/cosmos, @azure/identity |
