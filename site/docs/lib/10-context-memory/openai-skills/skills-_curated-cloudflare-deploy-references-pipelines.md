---
title: "Cloudflare Pipelines"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/cloudflare-deploy/references/pipelines/README.md"
sourceRel: "skills/.curated/cloudflare-deploy/references/pipelines/README.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/cloudflare-deploy/references/pipelines/README.md"
sourceSha256: "08dc858b6848abbe594e38be62965de409a7769b7f562d17806df9491de36313"
pageSha256: "08dc858b6848abbe594e38be62965de409a7769b7f562d17806df9491de36313"
contentMode: "local-full"
zh: ""
---

# Cloudflare Pipelines

ETL streaming platform for ingesting, transforming, and loading data into R2 with SQL transformations.

## Overview

Pipelines provides:
- **Streams**: Durable event buffers (HTTP/Workers ingestion)
- **Pipelines**: SQL-based transformations
- **Sinks**: R2 destinations (Iceberg tables or Parquet/JSON files)

**Status**: Open beta (Workers Paid plan)  
**Pricing**: No charge beyond standard R2 storage/operations

## Architecture

```
Data Sources → Streams → Pipelines (SQL) → Sinks → R2
                 ↑          ↓                ↓
            HTTP/Workers  Transform     Iceberg/Parquet
```

| Component | Purpose | Key Feature |
|-----------|---------|-------------|
| Streams | Event ingestion | Structured (validated) or unstructured |
| Pipelines | Transform with SQL | Immutable after creation |
| Sinks | Write to R2 | Exactly-once delivery |

## Quick Start

```bash
# Interactive setup (recommended)
npx wrangler pipelines setup
```

**Minimal Worker example:**
```typescript
interface Env {
  STREAM: Pipeline;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const event = { user_id: "123", event_type: "purchase", amount: 29.99 };
    
    // Fire-and-forget pattern
    ctx.waitUntil(env.STREAM.send([event]));
    
    return new Response('OK');
  }
} satisfies ExportedHandler<Env>;
```

## Which Sink Type?

```
Need SQL queries on data?
  → R2 Data Catalog (Iceberg)
    ✅ ACID transactions, time-travel, schema evolution
    ❌ More setup complexity (namespace, table, catalog token)

Just file storage/archival?
  → R2 Storage (Parquet)
    ✅ Simple, direct file access
    ❌ No built-in SQL queries

Using external tools (Spark/Athena)?
  → R2 Storage (Parquet with partitioning)
    ✅ Standard format, partition pruning for performance
    ❌ Must manage schema compatibility yourself
```

## Common Use Cases

- **Analytics pipelines**: Clickstream, telemetry, server logs
- **Data warehousing**: ETL into queryable Iceberg tables
- **Event processing**: Mobile/IoT with enrichment
- **Ecommerce analytics**: User events, purchases, views

## Reading Order

**New to Pipelines?** Start here:
1. [configuration.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-pipelines-configuration) - Setup streams, sinks, pipelines
2. [api.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-pipelines-api) - Send events, TypeScript types, SQL functions
3. [patterns.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-pipelines-patterns) - Best practices, integrations, complete example
4. [gotchas.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-pipelines-gotchas) - Critical warnings, troubleshooting

**Task-based routing:**
- Setup pipeline → [configuration.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-pipelines-configuration)
- Send/query data → [api.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-pipelines-api)
- Implement pattern → [patterns.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-pipelines-patterns)
- Debug issue → [gotchas.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-pipelines-gotchas)

## In This Reference

- [configuration.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-pipelines-configuration) - wrangler.jsonc bindings, schema definition, sink options, CLI commands
- [api.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-pipelines-api) - Pipeline binding interface, send() method, HTTP ingest, SQL function reference
- [patterns.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-pipelines-patterns) - Fire-and-forget, schema validation with Zod, integrations, performance tuning
- [gotchas.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-pipelines-gotchas) - Silent validation failures, immutable pipelines, latency expectations, limits

## See Also

- [r2](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-r2) - R2 storage backend for sinks
- [queues](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-queues) - Compare with Queues for async processing
- [workers](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-workers) - Worker runtime for event ingestion
