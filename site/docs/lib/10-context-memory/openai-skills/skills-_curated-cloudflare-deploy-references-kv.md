---
title: "Cloudflare Workers KV"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/cloudflare-deploy/references/kv/README.md"
sourceRel: "skills/.curated/cloudflare-deploy/references/kv/README.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/cloudflare-deploy/references/kv/README.md"
sourceSha256: "c141ec2f48645a0f0884511baceee0265776075f3073aefbd199f3037b420681"
pageSha256: "c141ec2f48645a0f0884511baceee0265776075f3073aefbd199f3037b420681"
contentMode: "local-full"
zh: ""
---

# Cloudflare Workers KV

Globally-distributed, eventually-consistent key-value store optimized for high read volume and low latency.

## Overview

KV provides:
- Eventual consistency (60s global propagation)
- Read-optimized performance
- 25 MiB value limit per key
- Auto-replication to Cloudflare edge
- Metadata support (1024 bytes)

**Use cases:** Config storage, user sessions, feature flags, caching, A/B testing

## When to Use KV

| Need | Recommendation |
|------|----------------|
| Strong consistency | → [Durable Objects](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-durable-objects) |
| SQL queries | → [D1](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-d1) |
| Object storage (files) | → [R2](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-r2) |
| High read, low write volume | → KV ✅ |
| Sub-10ms global reads | → KV ✅ |

**Quick comparison:**

| Feature | KV | D1 | Durable Objects |
|---------|----|----|-----------------|
| Consistency | Eventual | Strong | Strong |
| Read latency | <10ms | ~50ms | <1ms |
| Write limit | 1/s per key | Unlimited | Unlimited |
| Use case | Config, cache | Relational data | Coordination |

## Quick Start

```bash
wrangler kv namespace create MY_NAMESPACE
# Add binding to wrangler.jsonc
```

```typescript
// Write
await env.MY_KV.put("key", "value", { expirationTtl: 300 });

// Read
const value = await env.MY_KV.get("key");
const json = await env.MY_KV.get<Config>("config", "json");
```

## Core Operations

| Method | Purpose | Returns |
|--------|---------|---------|
| `get(key, type?)` | Single read | `string \| null` |
| `get(keys, type?)` | Bulk read (≤100) | `Map<string, T \| null>` |
| `put(key, value, options?)` | Write | `Promise<void>` |
| `delete(key)` | Delete | `Promise<void>` |
| `list(options?)` | List keys | `\{ keys, list_complete, cursor? \}` |
| `getWithMetadata(key)` | Get + metadata | `\{ value, metadata \}` |

## Consistency Model

- **Write visibility:** Immediate in same location, ≤60s globally
- **Read path:** Eventually consistent
- **Write rate:** 1 write/second per key (429 on exceed)

## Reading Order

| Task | Files to Read |
|------|---------------|
| Quick start | README → configuration.md |
| Implement feature | README → api.md → patterns.md |
| Debug issues | gotchas.md → api.md |
| Batch operations | api.md (bulk section) → patterns.md |
| Performance tuning | gotchas.md (performance) → patterns.md (caching) |

## In This Reference

- [configuration.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-kv-configuration) - wrangler.jsonc setup, namespace creation, TypeScript types
- [api.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-kv-api) - KV methods, bulk operations, cacheTtl, content types
- [patterns.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-kv-patterns) - Caching, sessions, rate limiting, A/B testing
- [gotchas.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-kv-gotchas) - Eventual consistency, concurrent writes, value limits

## See Also

- [workers](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-workers) - Worker runtime for KV access
- [d1](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-d1) - Use D1 for strong consistency needs
- [durable-objects](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-durable-objects) - Strongly consistent alternative
