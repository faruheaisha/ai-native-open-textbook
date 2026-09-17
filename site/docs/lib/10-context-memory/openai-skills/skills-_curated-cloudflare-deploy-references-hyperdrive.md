---
title: "Hyperdrive"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/cloudflare-deploy/references/hyperdrive/README.md"
sourceRel: "skills/.curated/cloudflare-deploy/references/hyperdrive/README.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/cloudflare-deploy/references/hyperdrive/README.md"
sourceSha256: "4d0e1a0e8366975d6ac0dcfd183e8b0a925f582c35917897aace568addff09f6"
pageSha256: "4d0e1a0e8366975d6ac0dcfd183e8b0a925f582c35917897aace568addff09f6"
contentMode: "local-full"
zh: ""
---

# Hyperdrive

Accelerates database queries from Workers via connection pooling, edge setup, query caching.

## Key Features

- **Connection Pooling**: Persistent connections eliminate TCP/TLS/auth handshakes (~7 round-trips)
- **Edge Setup**: Connection negotiation at edge, pooling near origin
- **Query Caching**: Auto-cache non-mutating queries (default 60s TTL)
- **Support**: PostgreSQL, MySQL + compatibles (CockroachDB, Timescale, PlanetScale, Neon, Supabase)

## Architecture

```
Worker → Edge (setup) → Pool (near DB) → Origin
         ↓ cached reads
         Cache
```

## Quick Start

```bash
# Create config
npx wrangler hyperdrive create my-db \
  --connection-string="postgres://user:pass@host:5432/db"

# wrangler.jsonc
{
  "compatibility_flags": ["nodejs_compat"],
  "hyperdrive": [{"binding": "HYPERDRIVE", "id": "<ID>"}]
}
```

```typescript
import { Client } from "pg";

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const client = new Client({
      connectionString: env.HYPERDRIVE.connectionString,
    });
    await client.connect();
    const result = await client.query("SELECT * FROM users WHERE id = $1", [123]);
    await client.end();
    return Response.json(result.rows);
  },
};
```

## When to Use

✅ Global access to single-region DBs, high read ratios, popular queries, connection-heavy loads
❌ Write-heavy, real-time data (<1s), single-region apps close to DB

**💡 Pair with Smart Placement** for Workers making multiple queries - executes near DB to minimize latency.

## Driver Choice

| Driver | Use When | Notes |
|--------|----------|-------|
| **pg** (recommended) | General use, TypeScript, ecosystem compatibility | Stable, widely used, works with most ORMs |
| **postgres.js** | Advanced features, template literals, streaming | Lighter than pg, `prepare: true` is default |
| **mysql2** | MySQL/MariaDB/PlanetScale | MySQL only, less mature support |

## Reading Order

| New to Hyperdrive | Implementing | Troubleshooting |
|-------------------|--------------|-----------------|
| 1. README (this) | 1. [configuration.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-hyperdrive-configuration) | 1. [gotchas.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-hyperdrive-gotchas) |
| 2. [configuration.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-hyperdrive-configuration) | 2. [api.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-hyperdrive-api) | 2. [patterns.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-hyperdrive-patterns) |
| 3. [api.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-hyperdrive-api) | 3. [patterns.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-hyperdrive-patterns) | 3. [api.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-hyperdrive-api) |

## In This Reference
- [configuration.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-hyperdrive-configuration) - Setup, wrangler config, Smart Placement
- [api.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-hyperdrive-api) - Binding APIs, query patterns, driver usage
- [patterns.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-hyperdrive-patterns) - Use cases, ORMs, multi-query optimization
- [gotchas.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-hyperdrive-gotchas) - Limits, troubleshooting, connection management

## See Also
- [smart-placement](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-smart-placement) - Optimize multi-query Workers near databases
- [d1](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-d1) - Serverless SQLite alternative for edge-native apps
- [workers](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-workers) - Worker runtime with database bindings
