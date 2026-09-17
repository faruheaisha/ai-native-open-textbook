---
title: "Cloudflare Durable Objects Storage"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/cloudflare-deploy/references/do-storage/README.md"
sourceRel: "skills/.curated/cloudflare-deploy/references/do-storage/README.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/cloudflare-deploy/references/do-storage/README.md"
sourceSha256: "2dd7fa0efc7db9a4edb0935b77a48973fe79978b693d29385db0403f1792154a"
pageSha256: "2dd7fa0efc7db9a4edb0935b77a48973fe79978b693d29385db0403f1792154a"
contentMode: "local-full"
zh: ""
---

# Cloudflare Durable Objects Storage

Persistent storage API for Durable Objects with SQLite and KV backends, PITR, and automatic concurrency control.

## Overview

DO Storage provides:
- SQLite-backed (recommended) or KV-backed
- SQL API + synchronous/async KV APIs
- Automatic input/output gates (race-free)
- 30-day point-in-time recovery (PITR)
- Transactions and alarms

**Use cases:** Stateful coordination, real-time collaboration, counters, sessions, rate limiters

**Billing:** Charged by request, GB-month storage, and rowsRead/rowsWritten for SQL operations

## Quick Start

```typescript
export class Counter extends DurableObject {
  sql: SqlStorage;
  
  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
    this.sql = ctx.storage.sql;
    this.sql.exec('CREATE TABLE IF NOT EXISTS data(key TEXT PRIMARY KEY, value INTEGER)');
  }
  
  async increment(): Promise<number> {
    const result = this.sql.exec(
      'INSERT INTO data VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = value + 1 RETURNING value',
      'counter', 1
    ).one();
    return result?.value || 1;
  }
}
```

## Storage Backends

| Backend | Create Method | APIs | PITR |
|---------|---------------|------|------|
| SQLite (recommended) | `new_sqlite_classes` | SQL + sync KV + async KV | ✅ |
| KV (legacy) | `new_classes` | async KV only | ❌ |

## Core APIs

- **SQL API** (`ctx.storage.sql`): Full SQLite with extensions (FTS5, JSON, math)
- **Sync KV** (`ctx.storage.kv`): Synchronous key-value (SQLite only)
- **Async KV** (`ctx.storage`): Asynchronous key-value (both backends)
- **Transactions** (`transactionSync()`, `transaction()`)
- **PITR** (`getBookmarkForTime()`, `onNextSessionRestoreBookmark()`)
- **Alarms** (`setAlarm()`, `alarm()` handler)

## Reading Order

**New to DO storage:** configuration.md → api.md → patterns.md → gotchas.md  
**Building features:** patterns.md → api.md → gotchas.md  
**Debugging issues:** gotchas.md → api.md  
**Writing tests:** testing.md

## In This Reference

- [configuration.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-do-storage-configuration) - wrangler.jsonc migrations, SQLite vs KV setup, RPC binding
- [api.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-do-storage-api) - SQL exec/cursors, KV methods, storage options, transactions, alarms, PITR
- [patterns.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-do-storage-patterns) - Schema migrations, caching, rate limiting, batch processing, parent-child coordination
- [gotchas.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-do-storage-gotchas) - Concurrency gates, INTEGER precision, transaction rules, SQL limits
- [testing.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-do-storage-testing) - vitest-pool-workers setup, testing DOs with SQL/alarms/PITR

## See Also

- [durable-objects](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-durable-objects) - DO fundamentals and coordination patterns
- [workers](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-workers) - Worker runtime for DO stubs
- [d1](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-d1) - Shared database alternative to per-DO storage
