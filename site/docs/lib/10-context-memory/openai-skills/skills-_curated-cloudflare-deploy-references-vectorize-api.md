---
title: "Vectorize API Reference"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/cloudflare-deploy/references/vectorize/api.md"
sourceRel: "skills/.curated/cloudflare-deploy/references/vectorize/api.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/cloudflare-deploy/references/vectorize/api.md"
sourceSha256: "c0aab15c2d7fc72b875b26e9a96a32bb2f899bd64ff3db33107208aacbf7347b"
pageSha256: "c0aab15c2d7fc72b875b26e9a96a32bb2f899bd64ff3db33107208aacbf7347b"
contentMode: "local-full"
zh: ""
---

# Vectorize API Reference

## Types

```typescript
interface VectorizeVector {
  id: string;                    // Max 64 bytes
  values: number[];              // Must match index dimensions
  namespace?: string;            // Optional partition (max 64 bytes)
  metadata?: Record<string, any>; // Max 10 KiB
}
```

## Query

```typescript
const matches = await env.VECTORIZE.query(queryVector, {
  topK: 10,                        // Max 100 (or 20 with returnValues/returnMetadata:"all")
  returnMetadata: "indexed",       // "none" | "indexed" | "all"
  returnValues: false,
  namespace: "tenant-123",
  filter: { category: "docs" }
});
// matches.matches[0] = { id, score, metadata? }
```

**returnMetadata:** `"none"` (fastest) → `"indexed"` (recommended) → `"all"` (topK max 20)

**queryById (V2 only):** Search using existing vector as query.
```typescript
await env.VECTORIZE.queryById("doc-123", { topK: 5 });
```

## Insert/Upsert

```typescript
// Insert: ignores duplicates (keeps first)
await env.VECTORIZE.insert([{ id, values, metadata }]);

// Upsert: overwrites duplicates (keeps last)
await env.VECTORIZE.upsert([{ id, values, metadata }]);
```

**Max 500 vectors per call.** Queryable after 5-10 seconds.

## Other Operations

```typescript
// Get by IDs
const vectors = await env.VECTORIZE.getByIds(["id1", "id2"]);

// Delete (max 1000 IDs per call)
await env.VECTORIZE.deleteByIds(["id1", "id2"]);

// Index info
const info = await env.VECTORIZE.describe();
// { dimensions, metric, vectorCount }
```

## Filtering

Requires metadata index. Filter operators:

| Operator | Example |
|----------|---------|
| `$eq` (implicit) | `{ category: "docs" }` |
| `$ne` | `\{ status: \{ $ne: "deleted" } }` |
| `$in` / `$nin` | `{ tag: { $in: ["sale"] \} \}` |
| `$lt`, `$lte`, `$gt`, `$gte` | `\{ price: \{ $lt: 100 } }` |

**Constraints:** Max 2048 bytes, no dots/`$` in keys, values: string/number/boolean/null.

## Performance

| Configuration | topK Limit | Speed |
|--------------|------------|-------|
| No metadata | 100 | Fastest |
| `returnMetadata: "indexed"` | 100 | Fast |
| `returnMetadata: "all"` | 20 | Slower |
| `returnValues: true` | 20 | Slower |

**Batch operations:** Always batch (500/call) for optimal throughput.

```typescript
for (let i = 0; i < vectors.length; i += 500) {
  await env.VECTORIZE.upsert(vectors.slice(i, i + 500));
}
```
