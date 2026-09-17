---
title: "SQL Database — Node.js — REFERENCE ONLY"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/services/app-service/templates/recipes/sql/source/nodejs.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/services/app-service/templates/recipes/sql/source/nodejs.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/services/app-service/templates/recipes/sql/source/nodejs.md"
sourceSha256: "a9926c86b69345877111e77de8cb6a472db9ec60457e1f3d6077b92b0d00e69d"
pageSha256: "a9926c86b69345877111e77de8cb6a472db9ec60457e1f3d6077b92b0d00e69d"
contentMode: "local-full"
zh: ""
---

# SQL Database — Node.js — REFERENCE ONLY

## Prisma + Azure SQL Setup

### npm Packages

```bash
npm install prisma @prisma/client mssql
npm install -D prisma
npx prisma init
```

### Prisma Schema

Update `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "sqlserver"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model TodoItem {
  id         Int     @id @default(autoincrement())
  title      String  @db.NVarChar(200)
  isComplete Boolean @default(false)
}
```

### Database Client

Create `src/db.js`:

```javascript
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
module.exports = { prisma };
```

### API Endpoints

Add to `src/index.js`:

```javascript
const { prisma } = require("./db");

app.get("/api/todos", async (req, res) => {
  const todos = await prisma.todoItem.findMany();
  res.json(todos);
});

app.post("/api/todos", async (req, res) => {
  const body = req.body || {};
  const title = typeof body.title === "string" ? body.title.trim() : "";
  if (!title) {
    return res.status(400).json({ error: "title is required and must be a non-empty string" });
  }
  const isComplete = body.isComplete === undefined ? false : body.isComplete;
  if (typeof isComplete !== "boolean") {
    return res.status(400).json({ error: "isComplete must be a boolean" });
  }
  const todo = await prisma.todoItem.create({ data: { title, isComplete } });
  res.status(201).json(todo);
});

app.get("/api/todos/:id", async (req, res) => {
  const todo = await prisma.todoItem.findUnique({
    where: { id: parseInt(req.params.id) },
  });
  if (!todo) return res.status(404).json({ error: "Not found" });
  res.json(todo);
});
```

### Connection String

**Azure (managed identity):**

Set as app setting in Bicep — the format Prisma uses for SQL Server:
```
