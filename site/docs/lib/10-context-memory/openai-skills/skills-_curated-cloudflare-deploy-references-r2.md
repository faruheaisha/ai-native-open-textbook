---
title: "Cloudflare R2 Object Storage"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/cloudflare-deploy/references/r2/README.md"
sourceRel: "skills/.curated/cloudflare-deploy/references/r2/README.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/cloudflare-deploy/references/r2/README.md"
sourceSha256: "e7d0e772e34c8fd6fb1d2aadb6a2c07a6d30d8e04ea50ce9a2b8c638836a8bf0"
pageSha256: "e7d0e772e34c8fd6fb1d2aadb6a2c07a6d30d8e04ea50ce9a2b8c638836a8bf0"
contentMode: "local-full"
zh: ""
---

# Cloudflare R2 Object Storage

S3-compatible object storage with zero egress fees, optimized for large file storage and delivery.

## Overview

R2 provides:
- S3-compatible API (Workers API + S3 REST)
- Zero egress fees globally
- Strong consistency for writes/deletes
- Storage classes (Standard/Infrequent Access)
- SSE-C encryption support

**Use cases:** Media storage, backups, static assets, user uploads, data lakes

## Quick Start

```bash
wrangler r2 bucket create my-bucket --location=enam
wrangler r2 object put my-bucket/file.txt --file=./local.txt
```

```typescript
// Upload
await env.MY_BUCKET.put(key, data, {
  httpMetadata: { contentType: 'image/jpeg' }
});

// Download
const object = await env.MY_BUCKET.get(key);
if (object) return new Response(object.body);
```

## Core Operations

| Method | Purpose | Returns |
|--------|---------|---------|
| `put(key, value, options?)` | Upload object | `R2Object \| null` |
| `get(key, options?)` | Download object | `R2ObjectBody \| R2Object \| null` |
| `head(key)` | Get metadata only | `R2Object \| null` |
| `delete(keys)` | Delete object(s) | `Promise<void>` |
| `list(options?)` | List objects | `R2Objects` |

## Storage Classes

- **Standard**: Frequent access, low latency reads
- **InfrequentAccess**: 30-day minimum storage, retrieval fees, lower storage cost

## Event Notifications

R2 integrates with Cloudflare Queues for reactive workflows:

```typescript
// wrangler.jsonc
{
  "event_notifications": [{
    "queue": "r2-notifications",
    "actions": ["PutObject", "DeleteObject"]
  }]
}

// Consumer
async queue(batch: MessageBatch, env: Env) {
  for (const message of batch.messages) {
    const event = message.body; // { action, bucket, object, timestamps }
    if (event.action === 'PutObject') {
      // Process upload: thumbnail generation, virus scan, etc.
    }
  }
}
```

## Reading Order

**First-time users:** README → configuration.md → api.md → patterns.md  
**Specific tasks:**
- Setup: configuration.md
- Client uploads: patterns.md (presigned URLs)
- Public static site: patterns.md (public access + custom domain)
- Processing uploads: README (event notifications) + queues reference
- Debugging: gotchas.md

## In This Reference

- [configuration.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-r2-configuration) - Bindings, S3 SDK, CORS, lifecycles, token scopes
- [api.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-r2-api) - Workers API, multipart, conditional requests, presigned URLs
- [patterns.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-r2-patterns) - Streaming, caching, client uploads, public buckets
- [gotchas.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-r2-gotchas) - List truncation, etag format, stream length, S3 SDK region

## See Also

- [workers](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-workers) - Worker runtime and fetch handlers
- [kv](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-kv) - Metadata storage for R2 objects
- [d1](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-d1) - Store R2 URLs in relational database
- [queues](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-queues) - Process R2 uploads asynchronously
