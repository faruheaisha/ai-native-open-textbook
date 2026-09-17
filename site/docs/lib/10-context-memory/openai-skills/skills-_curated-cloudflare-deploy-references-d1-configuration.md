---
title: "D1 Configuration"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/cloudflare-deploy/references/d1/configuration.md"
sourceRel: "skills/.curated/cloudflare-deploy/references/d1/configuration.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/cloudflare-deploy/references/d1/configuration.md"
sourceSha256: "06bc8baec2affc1d2cb12a0e2b3b3ea766527abd97c2ecf05460822f36feed2d"
pageSha256: "06bc8baec2affc1d2cb12a0e2b3b3ea766527abd97c2ecf05460822f36feed2d"
contentMode: "local-full"
zh: ""
---

# D1 Configuration

## wrangler.jsonc Setup

```jsonc
{
  "name": "your-worker-name",
  "main": "src/index.ts",
  "compatibility_date": "2025-01-01", // Use current date for new projects
  "d1_databases": [
    {
      "binding": "DB",                    // Env variable name
      "database_name": "your-db-name",    // Human-readable name
      "database_id": "your-database-id",  // UUID from dashboard/CLI
      "migrations_dir": "migrations"      // Optional: default is "migrations"
    },
    // Read replica (paid plans only)
    {
      "binding": "DB_REPLICA",
      "database_name": "your-db-name",
      "database_id": "your-database-id"   // Same ID, different binding
    },
    // Multiple databases
    {
      "binding": "ANALYTICS_DB",
      "database_name": "analytics-db",
      "database_id": "yyy-yyy-yyy"
    }
  ]
}
```

## TypeScript Types

```typescript
interface Env { DB: D1Database; ANALYTICS_DB?: D1Database; }

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const result = await env.DB.prepare('SELECT * FROM users').all();
    return Response.json(result.results);
  }
}
```

## Migrations

File structure: `migrations/0001_initial_schema.sql`, `0002_add_posts.sql`, etc.

### Example Migration

```sql
-- migrations/0001_initial_schema.sql
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);

CREATE TABLE IF NOT EXISTS posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  published BOOLEAN DEFAULT 0,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_posts_published ON posts(published);
```

### Running Migrations

```bash
# Create new migration file
